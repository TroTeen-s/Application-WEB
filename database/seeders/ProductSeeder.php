<?php

namespace Database\Seeders;

use App\Models\Item;
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
            'name' => 'Urban Casque',
            'price' => 45,
            'description' => 'Urban Casque noir avec visière noir mat',
            'image_path' => 'products/casque-kali-city-noir-mat.png',
        ]);

        $casque->save();


        $gant = new Product([
            'name' => 'Gants en cuir',
            'price' => 30,
            'description' => 'Gants cuir noirs doublés',
            'image_path' => 'products/044895.png',
        ]);

        $gant->save();


        $parapluie = new Product([
            'name' => 'Parapluie',
            'price' => 25,
            'description' => 'Parapluie courbe Acacia',
            'image_path' => 'products/parapluie-classic-canes.png',
        ]);

        $parapluie->save();

        Item::factory(10)->create([
            'product_id' => $gant->id,
            'bought' => false,
            'returned' => false
        ]);

        Item::factory(10)->create([
            'product_id' => $casque->id,
            'bought' => false,
            'returned' => false
        ]);

        Item::factory(10)->create([
            'product_id' => $parapluie->id,
            'bought' => false,
            'returned' => false
        ]);

    }
}
