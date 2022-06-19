<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use App\Models\FixingCenter;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Support\Str;
use Carbon\Carbon;


class FixingController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $FC = FixingCenter::all();

        return response()->json(array('data' => $FC));
    }
}
