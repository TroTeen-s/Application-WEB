<?php

namespace App\Http\Controllers;
use Illuminate\{Http\JsonResponse, Support\Facades\Log, Http\Request, Support\Facades\Auth};
use App\Models\Weather;


class WeatherController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request): JsonResponse
    {
        $weather = Weather::all();


        return response()->json(array('data' => $weather));
    }

    public function get_todays_date(Request $request): JsonResponse
    
    {
        $last_dateTime = Weather::orderBy('DateTime', 'desc')->first();
          return response()->json(array('success'=> true, 'data' => $last_dateTime ));
    }

    function list(){

        return Weather::all();

    }
}
