<?php


namespace App\Http\Controllers;


use App\Models\Package;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Collection;


class PackageController extends Controller
{


    // Invoke = fonction éxécuté de base si tu appelles la classe comme une fonction genre Route::get('/users', UserController::class);
    public function __invoke()
    {
        $packages = Package::all();

        return response()->json(array('data' => $packages));
    }



}
