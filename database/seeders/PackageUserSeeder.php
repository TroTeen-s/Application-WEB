<?php

namespace Database\Seeders;

use App\Models\Package;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PackageUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::query()->firstWhere('firstname', 'lola');
        $package = Package::query()->firstWhere('name', 'basique');
        $user->subscriptions()->attach($package);
    }
}
