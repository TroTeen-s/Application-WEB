<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Product;
use App\Traits\ApiResponse;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    use ApiResponse;

    function addProduct(Request $req): JsonResponse
    {

        $product = new Product;
        $product->name = $req->input('name');
        $product->price = $req->input('price');
        $product->description = $req->input('description');
        $product->image_path = $req->file('file')->store('products');
        if ($product->save() === true) {
            $quantity = $req->input('quantity');
            Item::factory()->count($quantity)->create([
                'available' => true,
                'bought' => false,
                'returned' => false,
                'product_id' => $product->id
            ]);

        }
        return $this->success("Produit ajouté avec succès", $product);
    }

    function list(): Collection
    {

        return Product::all();
    }
}
