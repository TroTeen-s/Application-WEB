<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use App\Models\MaintenanceCenter;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Support\Str;
use Carbon\Carbon;


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
        $MC = MaintenanceCenter::all();

        return response()->json(array('data' => $MC));
    }
}
