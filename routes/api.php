<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\ScootersController;
use App\Http\Controllers\ProductController;

/* |-------------------------------------------------------------------------- | API Routes |-------------------------------------------------------------------------- | | Here is where you can register API routes for your application. These | routes are loaded by the RouteServiceProvider within a group which | is assigned the "api" middleware group. Enjoy building your API! | */

// Route avec une seule action (fonction __invoke(), voir https://laravel.com/docs/9.x/controllers#single-action-controllers)

Route::post('/auth/register', [AuthController::class , 'register']);

Route::post('/auth/login', [AuthController::class , 'login']);


Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/me', [UserController::class , 'me']);

    Route::get('/is-auth', [AuthController::class , 'isAuth']);

    Route::get('/user/{id}', [UserController::class , 'firstOne'])->where('id', '[0-9]+'); // ex :localhost:8000/api/user/?id=1

    Route::get('/user/active/{id}', [UserController::class , 'active'])->where('id', '[0-9]+'); // ex :localhost:8000/api/user/?id=1

    Route::get('/user/desactive/{id}', [UserController::class , 'desactive'])->where('id', '[0-9]+'); // ex :localhost:8000/api/user/?id=1

    Route::get('/users', UserController::class); // localhost:8000/api/users/

    Route::post('/auth/logout', [AuthController::class , 'logout']);

    Route::post('/auth/delete', [AuthController::class , 'delete']);

    Route::post('/auth/update', [AuthController::class , 'update']);
    Route::post('/auth/update_password', [AuthController::class , 'update_password']);

    Route::post('/auth/update_password', [AuthController::class , 'update_password']);


    ## ROUTES SCOOTERS
    Route::get('/scooters', ScootersController::class);
    Route::post('/scooter/create', [ScootersController::class , 'create']);





});

// For shopAdmin

Route::post('/dashboard/addproduct', [ProductController::class , 'addProduct']);



//PACKAGES

Route::get('/packages', PackageController::class); // ex :localhost:8000/api/packages
