<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FixingController;
use App\Http\Controllers\MaintenanceController;
use App\Http\Controllers\NeedHelpController;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\ProblemsController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PushNotificationsController;
use App\Http\Controllers\ScooterHistoryController;
use App\Http\Controllers\ScooterProblemController;
use App\Http\Controllers\ScootersController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\SponsorCodeController;
use App\Http\Controllers\SponsorController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WeatherController;
use Illuminate\Support\Facades\Route;


/* |-------------------------------------------------------------------------- | API Routes |-------------------------------------------------------------------------- | | Here is where you can register API routes for your application. These | routes are loaded by the RouteServiceProvider within a group which | is assigned the "api" middleware group. Enjoy building your API! | */

// Route avec une seule action (fonction __invoke(), voir https://laravel.com/docs/9.x/controllers#single-action-controllers)

Route::post('/auth/register', [AuthController::class, 'register']);

Route::post('/support/need', [NeedHelpController::class , 'send']);
Route::get('/support/list', [NeedHelpController::class , 'list']);


Route::post('/auth/update', [AuthController::class , 'update']);

Route::post('/auth/update_password', [AuthController::class , 'update_password']);

Route::post('/auth/delete', [AuthController::class , 'delete']);

Route::get('/weather', [WeatherController::class , 'get_todays_date']);
Route::get('/codes', SponsorCodeController::class);
Route::get('/code/{id}', [SponsorCodeController::class , 'get_free_code'])->where('id', '[0-9]+');
Route::post('/add_code', [SponsorCodeController::class , 'add_code']);

Route::post('/auth/login', [AuthController::class , 'login']);

Route::get('/users', UserController::class)->middleware('auth'); // localhost:8000/api/users/

Route::prefix('stripe')->group(function () {
    Route::post('/webhook', [SubscriptionController::class , 'checkoutWebhook']);
});

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/me', [UserController::class , 'me']);

    Route::post('subscribe', [SubscriptionController::class , 'subscribe']);

    Route::post('checkout-sub', [SubscriptionController::class , 'createSubscriptionCheckout']);

    Route::get('subscription', [SubscriptionController::class , 'getAllSubscriptionsByUser']);

    Route::get('subscription/{id}/invoices', [SubscriptionController::class , 'getInvoicesFromSubscription'])->where('id', '[0-9]+');

    Route::get('subscription/{id}', [SubscriptionController::class , 'getSubscriptionsInfos'])->where('id', '[0-9]+');

    Route::get('/is-auth', [AuthController::class , 'isAuth']); // localhost:8000/api/users/

    Route::get('/users/{id}', [UserController::class , 'firstOne'])->where('id', '[0-9]+'); // ex :localhost:8000/api/users/?id=1
    Route::get('/user/active/{id}', [UserController::class , 'active'])->where('id', '[0-9]+'); // ex :localhost:8000/api/user/?id=1
    Route::post('/user/putadmin/{id}', [UserController::class , 'putAdmin'])->where('id', '[0-9]+');
    Route::post('/user/putuser/{id}', [UserController::class , 'putUser'])->where('id', '[0-9]+');


    Route::get('/user/desactive/{id}', [UserController::class , 'desactive'])->where('id', '[0-9]+'); // ex :localhost:8000/api/user/?id=1

    Route::get('/users', UserController::class); // localhost:8000/api/users/

    Route::post('/auth/logout', [AuthController::class , 'logout']);

    Route::post('/auth/delete', [AuthController::class , 'delete']);

    Route::post('/auth/update', [AuthController::class , 'update']);
    Route::post('/auth/update_password', [AuthController::class , 'update_password']);

    Route::post('/auth/update_password', [AuthController::class , 'update_password']);

    Route::get('/customer-portal', [SubscriptionController::class , 'linkCustomerPortal']);

    Route::post('refund', [ShopController::class , 'initRefund']);
    Route::get('issue-refund/{refund_id}', [ShopController::class , 'issueRefund'])->where('refund_id', '[0-9]+');
    Route::patch('refund/{refund_id}', [ShopController::class , 'updateRefund'])->where('refund_id', '[0-9]+');
    Route::get('refunds', [ShopController::class , 'getAllRefunds']);

    ## ROUTES SCOOTERS

    ## SPONSOR
    Route::get('/initCode/{id}', [SponsorCodeController::class , 'init_free_code'])->where('id', '[0-9]+');
    Route::get('/codes', SponsorCodeController::class);
    Route::get('/code/{id}', [SponsorCodeController::class, 'get_free_code'])->where('id', '[0-9]+');

    ## ROUTES SHOP
    Route::get('/shop/buy-cart', [ShopController::class, 'buyCart']);
    Route::get('/shop/test', [SubscriptionController::class, 'test']);
    Route::get('/carts', [ShopController::class, 'getAllCartsInfo']);
    Route::get('/cart/{id}', [ShopController::class, 'getCartInfo'])->where('id', '[0-9]+');
    Route::get('/my-fidelity', [UserController::class, 'myFidelity']);

    ## ROUTES NOTIFICATIONS PUSH
    Route::post("/notifs/all", [PushNotificationsController::class, "sendNotificationsToAllSubscribedUsers"]);
    Route::get("/notifs/all", [PushNotificationsController::class, "getAllNotifications"]);

});

Route::get('/sponsors', SponsorController::class);

Route::get('/dashboard/scooters/list', ScootersController::class);
Route::post('/scooter/create', [ScootersController::class, 'create']);
Route::get('/scooters', ScootersController::class);
Route::post('/scooter/create', [ScootersController::class, 'create']);

Route::get('/dashboard/MaintenanceCenter/list', MaintenanceController::class);
Route::get('/dashboard/FixingCenter/list', FixingController::class);


Route::get('/dashboard/subscriptions', [SubscriptionController::class, "getAllSubscriptionsForDashboard"]);
Route::post('/dashboard/subscriptions', [SubscriptionController::class, "addSubscription"]);
Route::patch('/dashboard/subscriptions/{id}', [SubscriptionController::class, "update"])->where('id', '[0-9]+');


Route::post('/dashboard/users/delete/{id}', [UserController::class, 'deleteUser'])->where('id', '[0-9]+');


// For Admin

Route::post('/dashboard/addproduct', [ProductController::class, 'addProduct']);
Route::patch('/dashboard/products/{id}', [ProductController::class, 'update'])->where('id', '[0-9]+');
Route::get('/dashboard/products', [ProductController::class, 'list']);
Route::get('/dashboard/api/weather/list', [WeatherController::class , 'list']);

// problemes

Route::get('/problems/list', ProblemsController::class);

Route::get('/dashboard/api/scooters/maintenance/list', [ScootersController::class , 'get_maintenance_scoot']);
Route::get('/dashboard/api/scooters/fixing/list', [ScootersController::class , 'get_fixing_scoot']);

Route::post('/scooter_probleme/add', [ScooterProblemController::class , 'add_scooter_problem']);
Route::get('/scooter_probleme', ScooterProblemController::class);



Route::get('/dashboard/api/scooters/maintenance/list', [ScootersController::class , 'ListMaintenance']);
Route::get('/dashboard/api/scooters/fixing/list', [ScootersController::class , 'ListFixing']);


Route::post('/dashboard/api/scooters/maintenance/newstatus', [ScootersController::class , 'MaintenanceStatus'])->where('id', '[0-9]+');
Route::post('/dashboard/api/scooters/fixing/newstatus', [ScootersController::class , 'FixingStatus'])->where('id', '[0-9]+');;
Route::post('/dashboard/api/scooters/service/newstatus', [ScootersController::class , 'ServiceStatus'])->where('id', '[0-9]+');;

Route::get('/dashboard/api/scooters/add', [ScootersController::class , 'addScoot']);

Route::get('/dashboard/api/dashboard/api/scooters/delete/{id}', [ScootersController::class , 'deleteFromID'])->where('id', '[0-9]+');

// History

Route::post('/dashboard/api/dashboard/api/scooters/history/maintenance',[ScooterHistoryController::class, 'HistoryMaintenance'])->where('id', '[0-9]+');
Route::post('/dashboard/api/dashboard/api/scooters/history/fixing',[ScooterHistoryController::class, 'HistoryFixing'])->where('id', '[0-9]+');
Route::post('/dashboard/api/dashboard/api/scooters/history/service',[ScooterHistoryController::class, 'HistoryService'])->where('id', '[0-9]+');
Route::post('/dashboard/api/dashboard/api/scooters/history/add',[ScooterHistoryController::class, 'HistoryAdd'])->where('id', '[0-9]+');
Route::post('/dashboard/api/dashboard/api/scooters/history/delete',[ScooterHistoryController::class, 'HistoryDelete'])->where('id', '[0-9]+');


Route::get('/dashboard/api/dashboard/api/scooters/history/list',[ScooterHistoryController::class, 'List']);




Route::get('/product-list', [ShopController::class , 'productList']);
Route::get('/products', [ShopController::class , 'getProductById']);
Route::get('/product/{productID}', [ShopController::class , 'productInfo'])->where('productID', '[0-9]+');














//PACKAGES

Route::get('/packages', PackageController::class); // ex :localhost:8000/api/packages
