<?php

namespace Database\Seeders;

use App\Models\Weather;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WeatherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $meteo = new Weather([
            'description' => 'light rain',
            'temp' => 25,
            'feels_like' => 15,
            'temp_min' => 10,
            'temp_max' => 32,
            'pressure' => 20,
            'humidity' => 92,
            'city' => 'Lyon',
            'country' => 'FR',
        ]);

        $meteo -> save();
        //
    }
}
