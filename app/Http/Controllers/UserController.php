<?php


namespace App\Http\Controllers;


use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;


class UserController extends Controller
{
    use ApiResponse;

    // Invoke = fonction éxécuté de base si tu appelles la classe comme une fonction genre Route::get('/users', UserController::class);
    public function __invoke(): JsonResponse
    {
        $users = User::all();

        return response()->json(array('data' => $users));
    }

    public function firstOne(Request $request): JsonResponse
    {
        $params = $request->all();
        $id = $params['id'];
        $user = User::find($id);

        if (!$user) {
            return response()->json(array('success' => 'false', 'message' => "Aucun utilisateur trouvé"), 400);
        }

        return response()->json(array('success' => 'true', 'message' => "Voici l'utilisateur", 'data' => ['user' => $user, 'params' => $params, 'id' => $id]));
    }

    public function me(Request $request){
        if (auth()->user()) {
            // The user is logged in...
            $user = auth()->user();
            $userInfo = [
                'username' => $user->username,
                'firstname' => $user->firstname,
                'lastname' => $user->lastname,
                'email' => $user->email,
                'phone_number' => $user->phone_number,
                'fidelity_points' => $user->phone_number,
            ];
            return $this->success("VOus êtes connecté", $userInfo);
        } else {
            return $this->fail("VOus n'êtes pas connecté");
        }
    }
}
