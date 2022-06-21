<?php


namespace App\Http\Controllers;


use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;


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

    public function firstOne($id): JsonResponse
    {

        $user = User::find($id);

        error_log("test");

        if (!$user) {
            return response()->json(array('success' => 'false', 'message' => "Aucun utilisateur trouvé"), 400);
        }

        return response()->json(array('success' => 'true', 'message' => "Voici l'utilisateur", 'data' => ['user' => $user, 'id' => $id]));
    }

    public function active($id): JsonResponse
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

    public function desactive($id): JsonResponse
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

    public function me(): JsonResponse
    {
        if (auth()->user()) {
            // The user is logged in...
            $user = auth()->user();
            return $this->success("VOus êtes connecté", $user);
        } else {
            return $this->fail("VOus n'êtes pas connecté");
        }
    }

    public function myFidelity(): JsonResponse
    {
        if (auth()->user()) {
            // The user is logged in...
            $user = auth()->user();
        } else {
            return $this->fail("VOus n'êtes pas connecté");
        }

        $user->setHidden([
            'id',
            'id_stripe',
            "email_configured",
            "email_verified_at",
            "password",
            "role",
            "active",
            "remember_token",
            "created_at",
            "updated_at",
            'firstname',
            'lastname',
            'username',
            'email',
            'phone_number',
            'registered_at',
            'subscribed',
        ]);

        $user->setAppends(['fidelity', 'fidelityTotal']);

        return $this->success('voici votre historique de fidélité', $user);

    }
}
