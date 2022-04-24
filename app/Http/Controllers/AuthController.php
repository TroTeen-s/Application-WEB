<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    use ApiResponse;

    public function register(Request $request): JsonResponse
    {


        $attr = $request->validate([
            'username' => 'required|string|max:255',
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users,email|max:254',
            'password' => 'required|string|min:6|confirmed',
            'phone_number' => 'required|string|max:10|min:10',
        ]);

        $user = User::create([
            'firstname' => $attr['firstname'],
            'lastname' => $attr['lastname'],
            'phone_number' => $attr['phone_number'],
            'username' => $attr['username'],
            'password' => bcrypt($attr['password']),
            'email' => $attr['email']
        ]);

        return $this->success("Voici votre token d'authentification", [
            'token' => $user->createToken('API Token')->plainTextToken
        ]);
    }

    public function login(Request $request): JsonResponse
    {
        try {
            $attr = $request->validate([
                'email' => 'required|string|email|',
                'password' => 'required|string|min:6'
            ]);
        } catch (\Throwable $th) {
            $this->fail($th->getMessage());
        }

        $attr = $request->validate([
            'email' => 'required|string|email|',
            'password' => 'required|string|min:6'
        ]);

        if (!Auth::attempt($attr)) {
            return $this->fail('Mauvais mot de passe');
        }

        return $this->success("Voici votre token d'authentification", [
            'token' => auth()->user()->createToken('API Token')->plainTextToken
        ]);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'Tokens Revoked'
        ];
    }

    public function isAuth(): JsonResponse
    {
        if (auth()->user()) {
            // The user is logged in...
            return $this->success("VOus êtes connecté", ['username' => auth()->user()->username]);
        } else {
            return $this->fail("VOus n'êtes pas connecté");
        }
    }
}
