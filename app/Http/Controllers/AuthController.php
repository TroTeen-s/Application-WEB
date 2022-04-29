<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Stripe\Exception\ApiErrorException;
use Stripe\StripeClient;

class AuthController extends Controller
{

    use ApiResponse;

    /**
     * @throws \Stripe\Exception\ApiErrorException
     */
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

        $error = '';

        $stripe = new StripeClient(
            'sk_test_51Kq2nZHBffQ89MBqZrwLuVSiiStGVcppEsCg9ZX96b1YLgobtlCjAF2etfUPpyl7Pww2jITNpfl34f4hhkXk0UyB004riglWOf'
        );
        $stripeResponse = [];
        try {
            $stripeResponse = $stripe->customers->create([
                'description' => 'My First Test Customer (created for API docs)',
                'email' => $user->email,
                'phone' => $user->phone_number,
                'name' => $user->firstname . ' ' . $user->lastname
            ]);

            if (isset($stripeResponse->id)){
                $user->id_stripe = $stripeResponse->id;
                $user->save();
            }

            Log::Debug($stripeResponse);
        } catch (ApiErrorException $e) {
            $error = $e->getMessage();
        }

        return $this->success("Voici votre token d'authentification", [
            'token' => $user->createToken('API Token')->plainTextToken,
            'error' => $error
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

    public function update(Request $request): JsonResponse
    {


        $attr = $request->validate([
            'username' => 'required|string|max:255',
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'phone_number' => 'required|string|max:10|min:10',
            'email' => 'required|string|email|max:254',
        ]);

        $user = User::where('email', $attr['email'])
            ->update([
                'firstname' => $attr['firstname'],
                'lastname' => $attr['lastname'],
                'phone_number' => $attr['phone_number'],
                'username' => $attr['username'],


            ]);

        return $this->success("user bien mis à jour");
    }

    public function update_password(Request $request): JsonResponse
    {

        $attr = $request->validate([
            'password' => 'required|string|min:6|confirmed',
            'email' => 'required|string|email|max:254',
        ]);

        $user = User::where('email', $attr['email'])
            ->update([
                'password' => $attr['password'],


            ]);

        return $this->success("user bien mis à jour");
    }


    public function delete(Request $request): JsonResponse
    {
        auth()->user()->tokens()->delete();

        $attr = $request->validate([
            'email' => 'required|string|email|max:254',
        ]);

        User::where('email', $attr['email'])->delete();

        return $this->success("user bien supprimer");
    }

    public function logout()
    {
        $logoutSucceed = auth()->user()->tokens()->delete();

        if ($logoutSucceed) {
            // The user is logged in...
            return $this->success("Vous vous êtes déconnecté", [$logoutSucceed], 204);
        } else {
            return $this->fail("Erreur dans la deconnexion", [$logoutSucceed]);
        }
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
