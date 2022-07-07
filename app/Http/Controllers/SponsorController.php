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
}
