<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use App\Models\Scooters;

class ScootersController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $users = Scooters::all();


        return response()->json(array('data' => $users));
    }
}
