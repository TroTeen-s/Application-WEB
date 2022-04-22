<?php

namespace Database\Seeders;

use App\Models\Package;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;


class PackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $package = new Package([
            'name' => 'minim',
            'price' => '0.23',
            'is_subscription' => false
        ]);
        $package->save();

        $package = new Package([
            'name' => 'medium',
            'price' => '9.99',
            'is_subscription' => true
        ]);
        $package->save();

        $package = new Package([
            'name' => 'basique',
            'price' => '19.99',
            'max_trips' => '8',
            'is_subscription' => true,
        ]);
        $package->save();

        $package = new Package([
            'name' => 'deluxe',
            'price' => '44.99',
            'max_trips' => '25',
            'is_subscription' => true
        ]);
        $package->save();

        $package = new Package([
            'name' => 'premium',
            'price' => '79.99',
            'max_trips' => '50',
            'is_subscription' => true
        ]);
        $package->save();
    }
}
