<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class AuthController extends Controller
{
    public function login(LoginRequest $request){
        $credentials = $request->validated();
        if(!Auth::attempt($credentials)){
            return response(['message' => 'Email or password is not correct']);
        }
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function signup(SignupRequest $request){
        $data = $request->validated();
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);
        $token = '';
        if($user){
            $token = $user->createToken('main')->plainTextToken;
        }
        return response(compact('user', 'token'));
    }

    public function logout(Request $request){
        if($request){
            /* @var User $user*/
            $user = $request->user();
            $user->currentAccessToken()->delete();
            return response('', 204);//succeeded but nothing to return
        }
    }
}
