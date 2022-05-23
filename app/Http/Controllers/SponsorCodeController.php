<?php

namespace App\Http\Controllers;
use Illuminate\{Http\JsonResponse, Support\Facades\Log, Http\Request, Support\Facades\Auth};
use App\Models\SponsorCodes;




class SponsorCodeController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $code = SponsorCodes::all();


        return response()->json(array('data' => $code));
    }

    public function get_free_code(Request $request, $id): JsonResponse
    {
        $code = SponsorCodes::where('sponsor_id', $id)->where('user_id', null)->first();



        if (!$code) {
            
            return response()->json(array('success' => 'false', 'message' => "Aucun code trouvé"));

        }

        $user_id = auth()->user()->id;
            SponsorCodes::where('sponsor_id', $id)->where('user_id', null)->update([
                'user_id' => $user_id
            ]);

        return response()->json(array('success' => 'true', 'data' => ['code' => $code, 'id' => $id]));

    }

    public function init_free_code(Request $request, $id): JsonResponse
    {
        $user_id = auth()->user()->id;
        $code = SponsorCodes::where('sponsor_id', $id)->where('user_id', $user_id)->first();



        if (!$code) {
            return response()->json(array('success' => 'false', 'message' => "Aucun code trouvé"));
        }

        return response()->json(array('success' => 'true', 'message' => "Voici le code", 'data' => ['code' => $code, 'id' => $id]));

    }
}
