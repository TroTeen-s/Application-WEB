<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sponsors;
use Illuminate\Http\JsonResponse;



class SponsorController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $sponsors = Sponsors::all();


        return response()->json(array('data' => $sponsors));
    }
}
