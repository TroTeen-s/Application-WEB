<?php


namespace App\Http\Controllers;


use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;


class UserController extends Controller
{


    // Invoke = fonction éxécuté de base si tu appelles la classe comme une fonction genre Route::get('/users', UserController::class);
    public function __invoke()
    {
        $users = User::all();

        return response()->json(array('data' => $users));
    }

    public function firstOne(Request $request)
    {
        $params = $request->all();
        $id = $params['id'];
        $user = User::find($id);

        if (!$user) {
            return response()->json(array('success' => 'false', 'message' => "Aucun utilisateur trouvé"), 400);
        }

        return response()->json(array('success' => 'true', 'message' => "Voici l'utilisateur", 'data' => ['user' => $user, 'params' => $params, 'id' => $id]));
    }
}
