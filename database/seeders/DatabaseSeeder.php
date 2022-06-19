<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            PackageSeeder::class,
            ProductSeeder::class,
            ItemSeeder::class,
            SponsorSeeder::class,
            ScootSeeders::class,
            WeatherSeeder::class,
            MaintenanceCenterSeeder::class,
            FixingCenterSeeder::class,
        ]);
    }
}
