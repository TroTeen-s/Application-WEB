<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SponsorCodes;
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
            'description' => 'Moins 20% sur les deux prochaines scéances',
            'end' => date_create('2022-10-10'),


        ]);
        $pathe->save();

        $ugc = new Sponsors([
            'brand' => 'UGC',
            'description' => 'Moins 15% sur les deux prochains films d\'horreur',
            'end' => date_create('2022-11-10'),


        ]);
        $ugc->save();

        $monnaie = new Sponsors([
            'brand' => 'La monnaie de Paris',
            'description' => 'Moins -20€ sur votre premiere visite',
            'end' => date_create('2022-11-12'),


        ]);
        $monnaie->save();

        $louvre = new Sponsors([
            'brand' => 'Le Louvre',
            'description' => 'Moins 15€ sur votre prochaine visite',
            'end' => date_create('2022-11-11'),

        ]);
        $louvre->save();

        for ($i = 1; $i <= 10; $i++) {
            $code = new SponsorCodes([
                'sponsor_id' => 1,
                'code' => Str::random(3) . '-' . Str::random(3) . '-' . Str::random(3),
            ]);
            $code->save();
        }

        for ($i = 1; $i <= 15; $i++) {
            $code = new SponsorCodes([
                'sponsor_id' => 2,
                'code' => Str::random(3) . '-' . Str::random(3) . '-' . Str::random(3),
            ]);
            $code->save();
        }
    }
}
