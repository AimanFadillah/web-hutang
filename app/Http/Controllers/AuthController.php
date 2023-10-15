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

    public function verifikasi () {
        if(auth()->user()->kelas != "" || auth()->user()->kelas != "" || auth()->user()->divisi != ""){
            return redirect("/");
        }

        return Inertia::render("verifikasi",[
            "name" => session("name"),
        ]);
    }

    public function update (Request $request) {

        $validatedData = $request->validate([
            "name" => "required|unique:users",
            "kelas" => "required|max:10",
            "divisi" => "required|in:Teknologi,Desain",
        ],[
            "name.unique" => "Nama sudah digunakkan",
            "kelas.max" => "Tidak boleh lebih dari 10 baris",
            "divisi.required" => "Pilih antara Teknologi dan Desain"
        ]);

        User::where("id",auth()->user()->id)->update($validatedData);

        return redirect("/");
    }

    public function store (Request $request){
        $userGoogle = Socialite::driver('google')->user();
    
        $user = User::where("email",$userGoogle["email"])->first();

        if($user){
            auth()->login($user,true);
            return redirect()->intended("/");
        }else{
            $newUser = User::create([
                "email" => $userGoogle["email"],
                "password" => bcrypt(bin2hex(random_bytes(15))),
            ]);

            auth()->login($newUser,true);
            return redirect()->intended("/registrasi")->with(["name" => $userGoogle["name"]]);
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
