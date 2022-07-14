<?php

namespace App\Http\Controllers;


use App\Models\MaintenanceCenter;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;


class MaintenanceController extends Controller
{

    use ApiResponse;

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */


    public function __invoke(): JsonResponse
    {
        if (auth()->user()->role !== "admin") {
            return $this->fail("Non authorisé.");
        }

        $MC = MaintenanceCenter::all();

        return response()->json(array('data' => $MC));
    }
}
