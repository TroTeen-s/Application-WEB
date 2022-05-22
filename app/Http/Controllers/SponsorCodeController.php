<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\SponsorCodes;
use Illuminate\Http\JsonResponse;

class SponsorCodeController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $code = SponsorCodes::all();


        return response()->json(array('data' => $code));
    }

    public function get_free_code(Request $request, $id): JsonResponse
    {
        $code = SponsorCodes::where('id', $id)->where('user_id', null)->get();



        if (!$code) {
            return response()->json(array('success' => 'false', 'message' => "Aucun code trouvé"), 400);
        }

        return response()->json(array('success' => 'true', 'message' => "Voici le code", 'data' => ['code' => $code, 'id' => $id]));

    }
}
