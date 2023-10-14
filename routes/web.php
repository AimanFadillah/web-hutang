<?php

use App\Http\Controllers\AuthController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware("auth")->group(function () {
   Route::get("/",function () {
      return Inertia::render("Welcome",["dataUser" => User::latest()->paginate(10)]);
   });
   Route::get("/logout",[AuthController::class,"logout"]);
});

Route::middleware("guest")->group(function () {
   Route::get("/google",[AuthController::class,"store"]);
   Route::get("/register",[AuthController::class,"google"]);
   Route::get("/login",[AuthController::class,"index"])->name("login");
});