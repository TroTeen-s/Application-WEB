<?php

namespace Database\Seeders;

use App\Models\Package;
use Illuminate\Database\Seeder;
use Stripe\Exception\ApiErrorException;
use Stripe\StripeClient;


class PackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     * @throws ApiErrorException
     */
    public function run(): void
    {
        $stripe = new StripeClient(getenv('STRIPE_PRIVATE'));
        $stripeSubscriptions = $stripe->products->create([
            'name' => 'Abonnements Troteen\'s',
        ]);

        $basique = $stripe->prices->create([
            'unit_amount' => 1999,
            'currency' => 'eur',
            'recurring' => ['interval' => 'month'],
            'product' => $stripeSubscriptions->id,
            'nickname' => 'Basique'
        ]);

        $deluxe = $stripe->prices->create([
            'unit_amount' => 4499,
            'currency' => 'eur',
            'recurring' => ['interval' => 'month'],
            'product' => $stripeSubscriptions->id,
            'nickname' => 'Deluxe'
        ]);

        $premium = $stripe->prices->create([
            'unit_amount' => 7999,
            'currency' => 'eur',
            'recurring' => ['interval' => 'month'],
            'product' => $stripeSubscriptions->id,
            'nickname' => 'Prenium'
        ]);

        $package = new Package([
            'id_stripe' => $basique->id,
            'name' => 'basique',
            'price' => '19.99',
            'max_trips' => '8',
            'is_subscription' => true,
        ]);
        $package->save();

        $package = new Package([
            'id_stripe' => $deluxe->id,
            'name' => 'deluxe',
            'price' => '44.99',
            'max_trips' => '25',
            'is_subscription' => true
        ]);
        $package->save();

        $package = new Package([
            'id_stripe' => $premium->id,
            'name' => 'premium',
            'price' => '79.99',
            'max_trips' => '50',
            'is_subscription' => true
        ]);
        $package->save();
    }
}
