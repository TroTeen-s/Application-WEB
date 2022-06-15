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
            'last_position_lat' => 4.8811,
            'maintenance' => 0,
            'fixing' => 0,
        ]);
        $first->save();

        $second = new Scooters([
            'acquired_at' => Carbon::parse('2000-01-07'),
            'model_serie' => Str::random(20),
            'last_revision' => Carbon::parse('2000-03-01'),
            'mileage' => 50.000,
            'last_position_long' => 45.76502,
            'last_position_lat' => 4.86003,
            'maintenance' => 0,
            'fixing' => 0,
        ]);
        $second->save();

        $three = new Scooters([
            'acquired_at' => Carbon::parse('2000-01-07'),
            'model_serie' => Str::random(20),
            'last_revision' => Carbon::parse('2000-03-01'),
            'mileage' => 50.000,
            'last_position_long' => 45.7637233129722,
            'last_position_lat' => 4.820051394180154,
            'maintenance' => 0,
            'fixing' => 0,
        ]);
        $three->save();

        $four = new Scooters([
            'acquired_at' => Carbon::parse('2005-02-01'),
            'model_serie' => Str::random(20),
            'last_revision' => Carbon::parse('2000-05-07'),
            'mileage' => 288.000,
            'last_position_long' => 45.75334772778774,
            'last_position_lat' => 4.8118531386381615,
            'maintenance' => 0,
            'fixing' => 0,
        ]);
        $four->save();

        $five = new Scooters([
            'acquired_at' => Carbon::parse('2005-02-01'),
            'model_serie' => Str::random(20),
            'last_revision' => Carbon::parse('2000-05-07'),
            'mileage' => 288.000,
            'last_position_long' => 45.778066,
            'last_position_lat' => 4.837561,
            'maintenance' => 0,
            'fixing' => 0,
        ]);
        $five->save();

        $six = new Scooters([
            'acquired_at' => Carbon::parse('2005-02-01'),
            'model_serie' => Str::random(20),
            'last_revision' => Carbon::parse('2000-05-07'),
            'mileage' => 288.000,
            'last_position_long' => 45.761991,
            'last_position_lat' => 4.834233,
            'maintenance' => 0,
            'fixing' => 0,
        ]);
        $six->save();

        $seven = new Scooters([
            'acquired_at' => Carbon::parse('2005-02-01'),
            'model_serie' => Str::random(20),
            'last_revision' => Carbon::parse('2000-05-07'),
            'mileage' => 288.000,
            'last_position_long' => 45.75737777958615,
            'last_position_lat' =>  4.822899978501201,
            'maintenance' => 0,
            'fixing' => 0,
        ]);
        $seven->save();

        $height = new Scooters([
            'acquired_at' => Carbon::parse('2005-02-01'),
            'model_serie' => Str::random(20),
            'last_revision' => Carbon::parse('2000-05-07'),
            'mileage' => 288.000,
            'last_position_long' => 45.77185,
            'last_position_lat' =>  4.833019,
            'maintenance' => 0,
            'fixing' => 0,
        ]);
        $height->save();

        $nine = new Scooters([
            'acquired_at' => Carbon::parse('2005-02-01'),
            'model_serie' => Str::random(20),
            'last_revision' => Carbon::parse('2000-05-07'),
            'mileage' => 288.000,
            'last_position_long' => 45.764185,
            'last_position_lat' =>  4.868213,
            'maintenance' => 0,
            'fixing' => 0,
        ]);
        $nine->save();
  
        $ten = new Scooters([
            'acquired_at' => Carbon::parse('2005-02-01'),
            'model_serie' => Str::random(20),
            'last_revision' => Carbon::parse('2000-05-07'),
            'mileage' => 288.000,
            'last_position_long' => 45.77622,
            'last_position_lat' => 4.821518,
            'maintenance' => 0,
            'fixing' => 0,
        ]);
        $ten->save();

        $onze = new Scooters([
            'acquired_at' => Carbon::parse('2005-02-01'),
            'model_serie' => Str::random(20),
            'last_revision' => Carbon::parse('2000-05-07'),
            'mileage' => 288.000,
            'last_position_long' => 45.7713753,
            'last_position_lat' => 4.775079,
            'maintenance' => 0,
            'fixing' => 0,
        ]);
        $onze->save();

        $douze = new Scooters([
            'acquired_at' => Carbon::parse('2005-02-01'),
            'model_serie' => Str::random(20),
            'last_revision' => Carbon::parse('2000-05-07'),
            'mileage' => 288.000,
            'last_position_long' => 45.76387096271503,
            'last_position_lat' => 4.84918835522405,
            'maintenance' => 0,
            'fixing' => 0,
        ]);
        $douze->save();

        $treize = new Scooters([
            'acquired_at' => Carbon::parse('2005-02-01'),
            'model_serie' => Str::random(20),
            'last_revision' => Carbon::parse('2000-05-07'),
            'mileage' => 288.000,
            'last_position_long' => 45.74614392219225,
            'last_position_lat' => 4.847221011520544,
            'maintenance' => 0,
            'fixing' => 0,
        ]);
        $treize->save();

        }
}
