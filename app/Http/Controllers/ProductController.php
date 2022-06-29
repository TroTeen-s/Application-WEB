<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Product;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    use ApiResponse;

    public function update(Request $request, int $id): JsonResponse
    {
        if (empty($request->all())) {
            return $this->fail("pas d'option envoyées");
        }

        $produit = Product::query()->find($id);

        if (empty($produit)) {
            return $this->fail("Objet pas trouvé");
        }

        $success = $produit->update($request->all());
        if (!$success) {
            return $this->fail("Erreur");
        } else {
            return $this->success("objet mis à jour avec succès", $success);
        }
    }

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

        $product->refresh();

        return $this->success("Produit ajouté avec succès", $product);
    }

    function list(): JsonResponse
    {

        return $this->success("voici la liste des produits", Product::all());
    }
}
