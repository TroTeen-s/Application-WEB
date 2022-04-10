<?php


namespace App\Http\Controllers;


use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;


class UserController extends Controller
{


    public function index()
    {
        $users = DB::table('users')->get();

        return view('user.index', ['users' => $users]);
    }

    public function insert()
    {
        DB::table('users')->insert([
            'email' => 'kayla@example.com',
            'firstname' => 'Lux',
            'lastname' => 'Crownguard',
            'phone' => '0697847356',
            'password' => 'azerty',
            'registered_at' => time(),
            'fidelity_points' => 0
        ]);
    }
}