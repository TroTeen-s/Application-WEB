<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route avec une seule action (fonction __invoke(), voir https://laravel.com/docs/9.x/controllers#single-action-controllers)
Route::get('/usera', [UserController::class, 'firstOne'])->where('id', '[0-9]+'); // ex :localhost:8000/api/users/?id=1

// Route::get('/users', UserController::class); // localhost:8000/api/users/?id=1


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
