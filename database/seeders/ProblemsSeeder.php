<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Problems;
use Carbon\Carbon;
use Illuminate\Support\Str;

class ProblemsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $first = new Problems([
            'description' => "Trot tombé à l'equal"
        ]);
        $first->save();
    }
}
