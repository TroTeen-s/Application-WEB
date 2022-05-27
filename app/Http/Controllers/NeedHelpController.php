<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ticket;

class NeedHelpController extends Controller
{

    public function send(Request $request)
    {
        $post = new Ticket;
        $post->firstname = $request->input('firstname');
        $post->lastname = $request->input('lastname');
        $post->email = $request->input('email');
        $post->message = $request->input('message');

        $post->save();

        return $post;
        // return redirect('add-blog-post-form')->with('status', 'Help Post Form Data Has Been inserted');
    }

    function list(){
        
        return Ticket::all();
    }
}
