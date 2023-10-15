<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrangController extends Controller
{
    public function index () {
        return Inertia::render("orang",[ 
            "dataOrang" => User::where("name","!=",auth()->user()->name)->where("name","!=","")->orderBy("name","asc")->get(),
        ]);
    }

    public function destroy (User $User) {
        User::destroy($User->id);
        return back();
    }
}
