<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SponsorCode;
use App\Models\Sponsors;
use Illuminate\Support\Str;

class SponsorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $pathe = new Sponsors([
            'brand' => 'Pathé',
            'description' => 'Moins 20% sur les deux prochaine scéance',
            'end' => date_create('2022-10-10'),


        ]);
        $pathe->save();

        $louvre = new Sponsors([
            'brand' => 'Le Louvre',
            'description' => 'Moins 15€ sur votre prochaine visite',
            'end' => date_create('2022-11-11'),

        ]);
        $louvre->save();

        for ($i = 1; $i <= 10; $i++) {
            $code = new SponsorCode([
                'sponsor_id' => 1,
                'code' => Str::random(10) . '-' . Str::random(10) . '-' . Str::random(10),
            ]);
            $code->save();
        }

        for ($i = 1; $i <= 15; $i++) {
            $code = new SponsorCode([
                'sponsor_id' => 2,
                'code' => Str::random(10) . '-' . Str::random(10) . '-' . Str::random(10),
            ]);
            $code->save();
        }
    }
}
