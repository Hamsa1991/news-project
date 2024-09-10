<?php

use Illuminate\Support\Facades\Route;

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

Route::get('/', function () {
    return view('welcome');
});
Route::get("/item/create", [\App\Http\Controllers\ItemController::class, 'create']);
Route::get("/item/index", [\App\Http\Controllers\ItemController::class, 'index']);
Route::post("/item/store", [\App\Http\Controllers\ItemController::class, 'store']);

Route::get("/store-types", [\App\Http\Controllers\StoreTypeController::class, 'index']);
Route::get("/store-types/create", [\App\Http\Controllers\StoreTypeController::class, 'create']);
Route::post("/store-types/store", [\App\Http\Controllers\StoreTypeController::class, 'store']);
Route::get("/store-types/edit/{storeType}", [\App\Http\Controllers\StoreTypeController::class, 'edit']);
Route::post("/store-types/update/{storeType}", [\App\Http\Controllers\StoreTypeController::class, 'update']);


Route::get("/stores", [\App\Http\Controllers\StoreController::class, 'index']);
