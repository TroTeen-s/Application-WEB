<?php

namespace App\Http\Controllers;


use App\Models\FixingCenter;
use Illuminate\Http\Request;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use App\Models\Problems;
use App\Models\MaintenanceCenter;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ProblemsController extends Controller
{
    use ApiResponse;

 /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request
     * @return \Illuminate\Http\Response
     */


    public function __invoke(Request $request): JsonResponse
    {
        try{

            $problemes = Problems::all();

            if (!$problemes) {
                return response()->json(array('success' => 'false', 'message' => "Aucun problème trouvé"), 400);
            }
            
            return response()->json(array('success' => 'true', 'data' => $problemes));

        }catch(Exception $e){
            return $this->fail('erreur', $e->getMessage());
        }

    }

}
