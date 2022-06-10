<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use App\Models\Scooters;
use Illuminate\Support\Facades\DB;

class ScootersController extends Controller
{

 /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request
     * @return \Illuminate\Http\Response
     */

    public function __invoke(): JsonResponse
    {
        $scooter = Scooters::all();


        return response()->json(array('data' => $scooter));
    }

    public function create(Request $request): JsonResponse
    {

        $attr = $request->validate([
            'model-serie' => 'required|string|min:6'

        ]);

        $scooter =
            new Scooters([
            'acquired_at' => date_create('now'),
            'model_serie' => $attr['model-serie'],
            'last_revision' => date_create('now'),
            'mileage' => 0.0,
            'last_position_long' => 0.0,
            'last_position_lat' => 0.0,
            'available' => true,
            'in_revision' => false
        ]);
        $scooter->save();


        return response()->json(array('data' => $scooter));
    }

    public function active(Request $request): JsonResponse
    {

        $attr = $request->validate([
            'id' => 'required',
            'available' => 'required'

        ]);

        $scooter =
            Scooters::where('id', $attr['id'])
            ->update([
            'available' => !$attr['available'],
        ]);

        $scooter = Scooters::where('id', $attr['id'])->get();

        if (!$scooter) {
            return response()->json(array('success' => 'false', 'message' => "Aucun scooter trouvé"), 400);
        }

        return response()->json(array('success' => 'true', 'data' => ['scooter' => $scooter]));
    }

    public function get_maintenance_scoot(Request $request)
    {

        $specific_boolean = 1;
        return Scooters::find($specific_boolean);

    }
}
