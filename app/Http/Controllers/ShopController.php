<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
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
}
