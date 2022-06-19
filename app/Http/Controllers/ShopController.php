<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\ItemRefund;
use App\Models\Product;
use App\Models\Refund;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Stripe\Exception\ApiErrorException;
use Stripe\StripeClient;

class ShopController extends Controller
{
    use ApiResponse;

    public function productList(): JsonResponse
    {
        $products = Product::all();

        if ($products) {
            return $this->success("Liste des produits", $products);
        }

        return $this->fail("Erreur de traitement");
    }

    public function productInfo(int $productId): JsonResponse
    {
        $product = Product::query()->firstWhere(['id' => $productId]);

        if ($product) {
            return $this->success("Infos du produit $productId", $product);
        }

        return $this->fail("Erreur de traitement");
    }

    public function getProductById(Request $request): JsonResponse
    {
        if (!$request->has('productIDs')) {
            return $this->fail('paramètre productIDs manquant');
        }

        $productIDs = $request->input("productIDs");
        $products = Product::query()->findMany($productIDs);

        foreach ($products as $product) {
            $product->setHidden(['created_at', 'updated_at']);
        }

        return $this->success("voici les infos des produits demandés", $products);
    }

    public function buyCart(Request $request): JsonResponse
    {
        $user = auth()->user();
        if (!$request->has('productIDs')) {
            return $this->fail('paramètre productIDs manquant');
        }

        $productIDs = $request->input("productIDs");
        $products = Product::query()->findMany($productIDs);

        $price = 0;
        $cart = new Cart(['user_id' => $user->id]);
        $cart->save();

        foreach ($products as $product) {
            $item = $product->getOneAvailableForPurchase();
            if (empty($item)) {
                return $this->fail("erreur dans la récupération d'un item pour " . $product->name);
            }
            $cart->items()->attach($item, ['item_price' => $product->price]);
            $price += $product->price;
        }

        $cart->save();

        $stripe = new StripeClient(getenv('STRIPE_PRIVATE'));

        try {
            $checkout_session = $stripe->checkout->sessions->create(array_filter([
                'mode' => 'payment',
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price_data' => [
                        'currency' => 'eur',
                        'product_data' => [
                            'name' => 'Panier',
                        ],
                        'unit_amount' => $price * 100,
                    ],
                    'quantity' => 1,
                ]],
                "billing_address_collection" => "required",

                'success_url' => getenv('APP_URL') . '?success=true&session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => getenv('APP_URL') . '?canceled=true',
                'customer' => $user->id_stripe ?? '',
            ]));

            $cart->checkout_id = $checkout_session->id;
            $cart->save();

        } catch (ApiErrorException $e) {
            return $this->fail('erreur', $e->getMessage());
        }


        return $this->success('redirection', ['redirect' => $checkout_session->url]);
    }

    public function getAllCartsInfo(): JsonResponse
    {
        $carts = Cart::query()
            ->where(['bought' => true, 'user_id' => auth()->id()])
            ->get();

        if (empty($carts)) {
            return $this->fail('aucun panier correspondant');
        }

        $carts->each(function ($cart) {
            $cart->setAppends(['payment', 'itemNumber']);
        });

        return $this->success('alors', $carts);

    }

    public function getCartInfo($id): JsonResponse
    {
        $cart = Cart::query()->firstWhere('id', $id);

        if (empty($cart)) {
            return $this->fail('aucun panier correspondant', ['id' => $id]);
        }

        return $this->success('informations sur l\'achat', $cart->setAppends(['payment', 'itemNumber', 'items']));

    }

    public function initRefund(Request $request): JsonResponse
    {
        //        return $this->success('loli', $request->all());
        if (!$request->has(['item_ids', 'cart_id'])) {
            return $this->fail("item ids missing", [$request->all()]);
        }

        $itemIds = $request->input('item_ids');
        $cartID = $request->input('cart_id');

        $cart = Cart::query()->find($cartID);
        $cartUser = $cart->user;

        if ($cartUser->id !== auth()->id()) {
            return $this->fail('not your purchase !');
        }

        $refund = new Refund([
            'reason' => $request->input('reason') ?? 'not specified',
            'cart_id' => $cartID,
            'amount' => 0.00
        ]);

        $total = 0;

        if ($refund->save()) {
            foreach ($itemIds as $itemID) {
                $item = CartItem::query()->firstWhere([
                    'cart_id' => $cartID,
                    'item_id' => $itemID
                ]);

                $total += $item->item_price;

                $refundItem = new ItemRefund([
                    'refund_id' => $refund->id,
                    'item_id' => $itemID
                ]);

                $refundItem->save();
            }
            $refund->amount = $total;
            $refund->save();
            return $this->success('refund created');
        }

        return $this->fail('refund creation failed');
    }

    public function getAllRefunds(): JsonResponse
    {
        $refunds = Refund::all();
        return $this->success('les retours demandés', $refunds);
    }

    /**
     * @throws ApiErrorException
     */
    public function issueRefund(int $refund_id): JsonResponse
    {
        if (empty($refund_id) && $refund_id !== 1) {
            return $this->fail('need refund id');
        }

        $refund = Refund::query()->where('id', $refund_id)->first();
        $cart = $refund->cart()->get()->first();
        $payment = $cart->payment()->get()->first();

        $stripe = new StripeClient(getenv('STRIPE_PRIVATE'));

        try {
            $refundRequest = $stripe->refunds->create(
                ['payment_intent' => $payment->id_stripe, 'amount' => $refund->amount * 100]
            );
        } catch (ApiErrorException $e) {
            return $this->fail('erreur stripe: ', [$e->getMessage(), $refund]);
        }

        $refund->refunded = true;
        $refund->status = 'closed';
        $refund->save();

        return $this->success('les infos', [$refund, $cart, $payment, $refundRequest]);

    }

    public function updateRefund(Request $request, int $refund_id): JsonResponse
    {
        $refundParams = $request->all();

        $refundParams['status'] = $refundParams['validated'] ? 'validated' : 'refused';


        $refund = Refund::query()->where('id', $refund_id)->update($refundParams);

        if ($refund) {
            return $this->success('updated successfully', $refund);
        } else {
            return $this->fail('update failed');
        }
    }
}
