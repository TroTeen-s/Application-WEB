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
            'price' => 45,
            'description' => 'Un casque généralement utilisé par les personnes de type loli',
            'image_path' => 'images/product/gros_casque_loli.jpg',
        ]);

        $casque->save();

        $gant = new Product([
            'name' => 'Gants en cuir',
            'price' => 20,
            'description' => 'Des gants pour protéger des chutes en trotinettes',
            'image_path' => 'images/product/gant_en_cuir.jpg',
        ]);

        $gant->save();
    }
}
