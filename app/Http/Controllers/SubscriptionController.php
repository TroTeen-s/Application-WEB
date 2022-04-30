<?php

namespace App\Http\Controllers;

use App\Models\Package;
use App\Models\PackageUser;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Stripe;
use Stripe\StripeClient;

class SubscriptionController extends Controller
{
    use ApiResponse;

    public function subscribe(Request $request): \Illuminate\Http\JsonResponse
    {
        $params = $request->all();
        $idPackage = $params['id_package'];
        $user = auth()->user();

        $package = Package::query()->find($idPackage);

        $user->subscriptions()->attach($package, ['active' => false, 'trip_number' => 0, 'payment_status_stripe' => false]);

        $user = auth()->user();

        $subscription = PackageUser::query()->where('user_id', $user->id)->get();

        return $this->success('ok ?', $subscription);

    }

    public function createSubscriptionCheckout(Request $request)
    {
        $params = $request->all();

        $YOUR_DOMAIN = getenv('APP_URL');

        $package = [];
        if (isset($params['name'])) {
            $package = Package::query()->firstWhere('name', $params['name']);
            $user = auth()->user();

            try {
                $stripe = new \Stripe\StripeClient(
                    'sk_test_51Kq2nZHBffQ89MBqZrwLuVSiiStGVcppEsCg9ZX96b1YLgobtlCjAF2etfUPpyl7Pww2jITNpfl34f4hhkXk0UyB004riglWOf'
                );
                $checkout_session = $stripe->checkout->sessions->create(array_filter([
                    'line_items' => [[
                        'price' => $package->id_stripe,
                        'quantity' => 1,
                    ]],
                    'mode' => 'subscription',
                    'success_url' => $YOUR_DOMAIN . '?success=true&session_id={CHECKOUT_SESSION_ID}',
                    'cancel_url' => $YOUR_DOMAIN . '?canceled=true',
                    'customer' => $user->id_stripe??''

                ]));

                $user->subscriptions()->attach($package, ['id_session_stripe' => $checkout_session->id]);

                return $this->success('redirection', ['redirect' => $checkout_session->url]);
            } catch (Stripe\Exception\ApiErrorException $e) {
                $params['error'] = $e->getMessage();
                return $this->fail('erreur', $e->getMessage());
            }
        } else {
            return $this->fail("Nom du package manquant", ["params" => $params]);
        }


        return $this->success('voici les params', [$package, $params]);

    }

    public function confirmSubscriptionCheckout(Request $request)
    {
        $params = $request->all();
        $idSessionStripe = $params['session_id'];

        $subscription = PackageUser::query()->firstWhere('id_session_stripe', $idSessionStripe);

        $subscription->active = true;
        $subscription->save();


    }

    public function checkoutWebhook(Request $request)
    {
        $params = $request->all();
        ob_start();
        var_dump($params);
        $event = Stripe\Event::constructFrom($params);
        var_dump($params);
        error_log(ob_get_clean(), 4);
        Log::debug($event->type);
        Log::debug($event->data->object);

        echo json_encode(['statyus ' => "success"]);

        $this->success('loli', $params);

    }
}
