<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $casque = new Product([
            'name' => 'Gros Casque de Loli',
            'price' => 19.35,
            'description' => 'Un casque généralement utilisé par les personnes de type loli',
            'image_path' => 'images/product/gros_casque_loli.jpg',
        ]);

        $casque->save();
    }
}
