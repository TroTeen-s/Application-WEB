<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ShopController extends Controller
{
    use ApiResponse;

    public function productList(): JsonResponse
    {
        $products = Product::all();

        if ($products) {
            return $this->success("Liste des produits", $products);
        }

        return $this->fail("Erreur de traitement");
    }

    public function productInfo(int $productId): JsonResponse
    {
        $product = Product::query()->firstWhere(['id' => $productId]);

        if ($product) {
            return $this->success("Infos du produit $productId", $product);
        }

        return $this->fail("Erreur de traitement");
    }

    public function getProductById(Request $request): JsonResponse
    {
        if (!$request->has('productIDs')) {
            return $this->fail('paramètre productIDs manquant');
        };

        $productIDs = $request->input("productIDs");
        $products = Product::query()->findMany($productIDs);

        foreach ($products as $product) {
            $product->setHidden(['created_at', 'updated_at']);
        }

        return $this->success("voici les infos des produits demandés", $products);
    }
}
