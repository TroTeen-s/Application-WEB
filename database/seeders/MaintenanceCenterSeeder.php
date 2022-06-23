<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\MaintenanceCenter;

class MaintenanceCenterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $lyon = new MaintenanceCenter([
            'road'=>'20 rue de la comédie musicale',
            'city'=>'Lyon',
            'postal_code'=>'69000',
            'phone_number'=>'0699501030',
            'last_position_long'=> 45.764297344111355,
            'last_position_lat'=> 4.904424687488169,
         ]);

         $lyon->save();

         $lyon2= new MaintenanceCenter([
            'road'=>'25 rue du pompidou',
            'city'=>'Lyon',
            'postal_code'=>'69000',
            'phone_number'=>'0699501030',
            'last_position_long'=> 45.7433843302127,
            'last_position_lat'=> 4.785449023215502,
         ]);

         $lyon2->save();

         $lyon3= new MaintenanceCenter([
            'road'=>'20 rue benit',
            'city'=>'Lyon',
            'postal_code'=>'69000',
            'phone_number'=>'0699501030',
            'last_position_long'=> 45.706700335546316,
            'last_position_lat'=> 4.8172792047485835,
         ]);

         $lyon3->save();
    }
}
