<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PackageController;

/* |-------------------------------------------------------------------------- | API Routes |-------------------------------------------------------------------------- | | Here is where you can register API routes for your application. These | routes are loaded by the RouteServiceProvider within a group which | is assigned the "api" middleware group. Enjoy building your API! | */

// Route avec une seule action (fonction __invoke(), voir https://laravel.com/docs/9.x/controllers#single-action-controllers)

Route::post('/auth/register', [AuthController::class , 'register']);

Route::post('/auth/update', [AuthController::class , 'update']);


Route::post('/auth/login', [AuthController::class , 'login']);

Route::get('/users', UserController::class)->middleware('auth'); // localhost:8000/api/users/


Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/me', [UserController::class , 'me']);

    Route::get('/is-auth', [AuthController::class , 'isAuth']); // localhost:8000/api/users/

    Route::get('/users/{id}', [UserController::class , 'firstOne'])->where('id', '[0-9]+'); // ex :localhost:8000/api/users/?id=1

    Route::post('/auth/logout', [AuthController::class , 'logout']);
});


//PACKAGES

Route::get('/packages', PackageController::class); // ex :localhost:8000/api/packages
