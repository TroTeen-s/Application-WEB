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
        error_log("test");

        return response()->json(array('data' => $users));
    }

    public function firstOne(Request $request, $id): JsonResponse
    {

        $user = User::find($id);

        error_log("test");

        if (!$user) {
            return response()->json(array('success' => 'false', 'message' => "Aucun utilisateur trouvé"), 400);
        }

        return response()->json(array('success' => 'true', 'message' => "Voici l'utilisateur", 'data' => ['user' => $user, 'id' => $id]));
    }

    public function active(Request $request, $id): JsonResponse
    {

        $user = User::where('id', $id)
            ->update([
            'active' => true,
        ]);



        if (!$user) {
            return response()->json(array('success' => 'false', 'message' => "Aucun utilisateur trouvé"), 400);
        }

        return response()->json(array('success' => 'true', 'message' => "Voici l'utilisateur", 'data' => ['user' => $user, 'id' => $id]));
    }

    public function desactive(Request $request, $id): JsonResponse
    {

        $user = User::where('id', $id)
            ->update([
            'active' => false,
        ]);

        if (!$user) {
            return response()->json(array('success' => 'false', 'message' => "Aucun utilisateur trouvé"), 400);
        }

        return response()->json(array('success' => 'true', 'message' => "Voici l'utilisateur", 'data' => ['user' => $user, 'id' => $id]));
    }

    public function me(Request $request)
    {
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
                'subscribed' => $user->subscribed
            ];
            return $this->success("VOus êtes connecté", $userInfo);
        }
        else {
            return $this->fail("VOus n'êtes pas connecté");
        }
    }
}
