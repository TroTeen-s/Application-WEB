<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\FixingCenter;

class FixingCenterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $lyon = new FixingCenter([
            'road'=>'46 rue de la réparation',
            'city'=>'Lyon',
            'postal_code'=>'69000',
            'phone_number'=>'0654143254',
            'last_position_long'=> 45.73002440618869,
            'last_position_lat'=> 4.864591217041014,
         ]);

         $lyon->save();
    }
}
