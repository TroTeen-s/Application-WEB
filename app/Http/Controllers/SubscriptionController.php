<?php

namespace App\Http\Controllers;

use App\Models\Package;
use App\Models\PackageUser;
use App\Models\User;
use App\Traits\ApiResponse;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Stripe;
use Stripe\StripeClient;

class SubscriptionController extends Controller
{
    use ApiResponse;

    public function subscribe(Request $request): JsonResponse
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

    public function createSubscriptionCheckout(Request $request): JsonResponse
    {
        $params = $request->all();

        $YOUR_DOMAIN = getenv('APP_URL');

        if (isset($params['name'])) {
            $package = Package::query()->firstWhere('name', $params['name']);
            $user = auth()->user();

            try {
                $stripe = new StripeClient(getenv('STRIPE_PRIVATE'));

                $checkout_session = $stripe->checkout->sessions->create(array_filter([
                    'line_items' => [[
                        'price' => $package->id_stripe,
                        'quantity' => 1,
                    ]],
                    'mode' => 'subscription',
                    'success_url' => $YOUR_DOMAIN . '?success=true&session_id={CHECKOUT_SESSION_ID}',
                    'cancel_url' => $YOUR_DOMAIN . '?canceled=true',
                    'customer' => $user->id_stripe ?? '',
                    //                    'cancel_at' => Carbon::now()->addYear(),
                    'subscription_data' => [
                        'metadata' => [
                            'cancel_at' => Carbon::now()->addYear()
                        ]
                    ]

                ]));

                return $this->success('redirection', ['redirect' => $checkout_session->url]);
            } catch (Stripe\Exception\ApiErrorException $e) {
                return $this->fail('erreur', $e->getMessage());
            }
        } else {
            return $this->fail("Nom du package manquant", ["params" => $params]);
        }

    }

    public function checkoutWebhook(Request $request)
    {
        $params = $request->all();
        ob_start();
        var_dump($params);
        $event = Stripe\Event::constructFrom($params);
        var_dump($params);
        error_log(ob_get_clean(), 4);
        /*        Log::channel('stripe')->info('event type: ' . $event->type);
                Log::channel('stripe')->info($event->data->object);*/


        switch ($event->type) {
            case 'customer.subscription.created':
                $this->createSubscription($event);
                break;
            case 'customer.subscription.updated':
                $this->updateSubscription($event);
                break;
            default:
                break;
        }

        $this->success('webhook treadted by LOLIS');

    }

    public function createSubscription(Stripe\Event $event)
    {

        try {
            $subscription = $event->data->object;

            $customerID = $subscription->customer;
            $user = User::query()->where('id_stripe', $customerID)->first();

            $package = $subscription->items->data[0]->plan->id;
            $package = Package::query()->where('id_stripe', $package)->first();


            $user->subscriptions()->attach($package, [
                'id_stripe' => $subscription->id,
                'active' => ($subscription->active === 'active'),
                'created_at' => Carbon::createFromTimestamp($subscription->billing_cycle_anchor),
            ]);

        } catch (Exception $e) {
            Log::channel('errors')->info($e->getMessage());

        }
    }

    public function updateSubscription(Stripe\Event $event)
    {

        try {
            $subscription = $event->data->object;
            $subscriptionInDB = PackageUser::query()->firstWhere('id_stripe', $subscription->id);

            if (!$subscriptionInDB->active && ($subscription->status == 'active')) {
                $subscriptionInDB->active = true;
            }

            $subscriptionInDB->current_period_start = Carbon::createFromTimestamp($subscription->current_period_start);
            $subscriptionInDB->current_period_end = Carbon::createFromTimestamp($subscription->current_period_end);
            $subscriptionInDB->created_at = Carbon::createFromTimestamp($subscription->created);
            $subscriptionInDB->cancel_at = $subscription->cancel_at ? Carbon::createFromTimestamp($subscription->cancel_at) : null;
            $subscriptionInDB->save();

        } catch (Exception $e) {
            Log::channel('errors')->info($e->getMessage());

        }
    }
}
