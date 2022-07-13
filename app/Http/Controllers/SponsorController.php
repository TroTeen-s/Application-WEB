<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sponsors;
use Illuminate\Http\JsonResponse;



class SponsorController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $sponsors = Sponsors::all();

        if (!$sponsors) {
            return response()->json(array('success' => 'false', 'message' => "Aucun sponsors trouvé"));
        }

        return response()->json(array('success' => 'true', 'message' => "Voici les sponsors", 'data' => $sponsors));
    }


    public function add_sponsor(Request $request): JsonResponse
    {
        $body = json_decode($request->getContent());
        $brand = $body->{ "brand"};
        $description = $body->{ "description"};
        $end = $body->{ "end"};



        $sponsors = new Sponsors(['brand' => $brand, 'description' => $description, 'end' => date('y-m-d H:i:s', strtotime($end))]);
        $sponsors->save();


        if (!$sponsors) {
            return response()->json(array('success' => 'false', 'message' => 'Erreur de valeur'));
        }

        $sponsors = Sponsors::all();

        return response()->json(array('success' => 'true', 'message' => "Voici le code", 'data' => ['sponsor' => $sponsors]));

    }
}
