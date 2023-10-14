<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    public function index () {
        return Inertia::render("login");
    }

    public function google () {
        return Socialite::driver("google")->redirect();
    }

    public function store (Request $request){
        $userGoogle = Socialite::driver('google')->user();
    
        $user = User::where("email",$userGoogle["email"])->first();

        if($user){
            auth()->login($user,true);
            return redirect()->intended("/");
        }else{
            $newUser = User::create([
                "name" => $userGoogle["name"],
                "email" => $userGoogle["email"],
                "password" => bcrypt(bin2hex(random_bytes(15))) ,
                "is_admin" => 0
            ]);

            auth()->login($newUser,true);
            return redirect()->intended("/");
        }

        return back();
    }

    public function logout (Request $request) {
        $user = Auth::User();
        
        if ($user->remember_token) {
            $user->remember_token = null;
            $update = ["remember_token" => "",];
            User::where("id",$user->id)->update($update);
            Cookie::forget('remember_me');
        }

        Auth::logout();
        
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        
        return redirect("/login");
    }

}
