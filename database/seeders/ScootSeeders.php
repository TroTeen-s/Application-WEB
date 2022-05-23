<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Scooters;
use Carbon\Carbon;
use Illuminate\Support\Str;


class ScootSeeders extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //

        $first = new Scooters([
            'acquired_at' => Carbon::parse('2000-01-01'),
            'model_serie' => Str::random(20),
            'last_revision' => Carbon::parse('2000-01-01'),
            'mileage' => 350.000,
            'last_position_long' => 45.7568,
            'last_position_lat' => 4.8511,
            'available' => 1,
            'in_revision' => 0,
        ]);
        $first->save();

        $second = new Scooters([
            'acquired_at' => Carbon::parse('2000-01-07'),
            'model_serie' => Str::random(20),
            'last_revision' => Carbon::parse('2000-03-01'),
            'mileage' => 50.000,
            'last_position_long' => 45.76502,
            'last_position_lat' => 4.82003,
            'available' => 1,
            'in_revision' => 0,
        ]);
        $second->save();

        $three = new Scooters([
            'acquired_at' => Carbon::parse('2005-02-01'),
            'model_serie' => Str::random(20),
            'last_revision' => Carbon::parse('2000-05-07'),
            'mileage' => 288.000,
            'last_position_long' => 45.75156,
            'last_position_lat' => 4.82513,
            'available' => 1,
            'in_revision' => 0,
        ]);
        $three->save();
    }
}
