<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    use ApiResponse;

    public function register(Request $request): JsonResponse
    {


        $attr = $request->validate([
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed'
        ]);

        $user = User::create([
            'firstname' => 'Aurélien',
            'lastname' => 'La Loli',
            'phone_number' => Str::random(10),
            'username' => $attr['username'],
            'password' => bcrypt($attr['password']),
            'email' => $attr['email']
        ]);

        return response()->json([
            'token' => $user->createToken('API Token')->plainTextToken
        ]);
    }

    public function login(Request $request)
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
}
