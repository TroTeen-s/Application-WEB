<?php

namespace App\Http\Controllers;


use App\Models\FixingCenter;
use Illuminate\Http\Request;


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
        if (auth()->user()->role !== "admin") {
            return $this->fail("Non authorisé.");
        }

        $FC = FixingCenter::all();

        return response()->json(array('data' => $FC));
    }
}
