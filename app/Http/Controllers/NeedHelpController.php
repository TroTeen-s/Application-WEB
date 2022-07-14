<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Traits\ApiResponse;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NeedHelpController extends Controller
{

    use ApiResponse;

    public function send(Request $request): JsonResponse
    {
        $post = new Ticket;
        $post->firstname = $request->input('firstname');
        $post->lastname = $request->input('lastname');
        $post->email = $request->input('email');
        $post->message = $request->input('message');

        $success = $post->save();

        if ($success) {
            return $this->success("Message envoyé avec succès", $post);
        } else {
            return $this->fail("Problème dans l'envoi de ticket. Veuillez réessayer");
        }
    }

    function list(): Collection
    {

        return Ticket::all();
    }
}
