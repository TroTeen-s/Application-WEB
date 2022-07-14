<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Stripe\Exception\ApiErrorException;
use Stripe\StripeClient;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $loli = new User([
            'firstname' => 'lola',
            'role' => 'admin',
            'username' => 'lola',
            'lastname' => 'lola',
            'phone_number' => Str::random(10),
            'email' => 'lola@lola.com',
            'password' => Hash::make('lolalola'),
        ]);
        $loli->save();

        $stripe = new StripeClient(getenv('STRIPE_PRIVATE'));
        try {
            $stripeResponse = $stripe->customers->create([
                'description' => 'lola',
                'email' => $loli->email,
                'phone' => $loli->phone_number,
                'name' => $loli->firstname . ' ' . $loli->lastname
            ]);

            if (isset($stripeResponse->id)) {
                $loli->id_stripe = $stripeResponse->id;
                $loli->save();
            }
        } catch (ApiErrorException $e) {
            $error = $e->getMessage();
        }

        $adminMatthias = new User([
            'firstname' => 'Matthias',
            'username' => 'Adib',
            'lastname' => 'Hamchi',
            'phone_number' => Str::random(10),
            'email' => 'matthias@gmail.com',
            'password' => Hash::make('admincheck'),
        ]);
        $adminMatthias->save();

        $adminAurel = new User([
            'firstname' => 'Aurélien',
            'username' => 'Prumme',
            'lastname' => 'Prudhomme',
            'phone_number' => Str::random(10),
            'email' => 'aurelien23.p@gmail.com',
            'password' => Hash::make('aurelAD'),
            'role' => 'admin'
        ]);
        $adminAurel->save();

        $adminLyes = new User([
            'firstname' => 'Lyès',
            'username' => 'BigOtter',
            'lastname' => 'Rolland-Monnet',
            'phone_number' => Str::random(10),
            'email' => 'lyes@admin.com',
            'password' => Hash::make('lyesadmin'),
            'role' => 'admin'
        ]);
        $adminLyes->save();
    }
}
