<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductAdminController;
use  App\Http\Controllers\BannerController;
use  App\Http\Controllers\BrandController;
use  App\Http\Controllers\CategoryController;
use  App\Http\Controllers\ConfigController;
use  App\Http\Controllers\ContactController;
use  App\Http\Controllers\MenuController;
use  App\Http\Controllers\OrderController;
use  App\Http\Controllers\PostController;
use  App\Http\Controllers\ProductController;
use  App\Http\Controllers\ProductSaleController;
use  App\Http\Controllers\ProductStoreController;
use  App\Http\Controllers\TopicController;
use  App\Http\Controllers\ProductImageController;
use  App\Http\Controllers\UserController;













/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Dashboard
Route::get('/dashboard', 'App\Http\Controllers\DashboardController@index');

// JWT Authentication
Route::get('/auth', 'App\Http\Controllers\UserController@getAuthenticatedUser');
Route::post('/register', 'App\Http\Controllers\UserController@register');
Route::post('/login', 'App\Http\Controllers\UserController@login');

// Address
Route::get('/user/default-address', 'App\Http\Controllers\UserAddressController@show');
Route::post('/user/create-user-address', 'App\Http\Controllers\UserAddressController@createUser');
Route::post('/user/address', 'App\Http\Controllers\UserAddressController@store');

// Product
Route::get('/products', 'App\Http\Controllers\ProductController@index');
Route::get('/products/{id}', 'App\Http\Controllers\ProductController@show');
Route::get('/product/hot-deal', 'App\Http\Controllers\ProductDealsController@hotDeals');
Route::post('/products', 'App\Http\Controllers\ProductController@store');
Route::delete('/products/{id}', 'App\Http\Controllers\ProductController@destroy');
// Product Orders
Route::post('/stripe', 'App\Http\Controllers\ProductOrdersController@stripePost');
Route::post('/product/orders', 'App\Http\Controllers\ProductOrdersController@store');

// Product Categories
Route::get('/product/categories', 'App\Http\Controllers\CategoryController@index');
Route::get('/product/categories/{id}/top-selling', 'App\Http\Controllers\CategoryController@topSelling');
Route::get('/product/categories/{id}/new', 'App\Http\Controllers\CategoryController@new');

// Product Shopping Cart
Route::get('/product/cart-list/count', 'App\Http\Controllers\ProductShoppingCartController@cartCount');
Route::get('/product/cart-list/', 'App\Http\Controllers\ProductShoppingCartController@index');
Route::post('/product/cart-list', 'App\Http\Controllers\ProductShoppingCartController@store');
Route::post('/product/cart-list/guest', 'App\Http\Controllers\ProductShoppingCartController@guestCart');
Route::put('/product/cart-list/{id}', 'App\Http\Controllers\ProductShoppingCartController@update');
Route::delete('/product/cart-list/{id}', 'App\Http\Controllers\ProductShoppingCartController@destroy');

// Product Wishlist
Route::get('/product/wishlist/count', 'App\Http\Controllers\ProductWishlistController@count');
Route::get('/product/wishlist', 'App\Http\Controllers\ProductWishlistController@index');
Route::post('/product/wishlist', 'App\Http\Controllers\ProductWishlistController@store');
Route::delete('/product/wishlist/{id}', 'App\Http\Controllers\ProductWishlistController@destroy');

// Product Stocks
Route::get('/product/stocks/{id}', 'App\Http\Controllers\StockController@show');

// Newsletter
Route::post('/newsletter', 'App\Http\Controllers\NewsLetterController@store');

// Route::resource('product', ProductAdminController::class);

Route::get('admin/login',[UserController::class, 'login']);
Route::get('admin/forget',[UserController::class, 'getforget']);
Route::post('admin/forget',[UserController::class, 'postforget']);

Route::get('config',[ConfigController::class, 'index']);
Route::post('config/update/{id}',[ConfigController::class, 'update']);
// UC 22: Quản lý banner
Route::prefix('banner')->group(function(){
	Route::get('/',[BannerController::class, 'index']);
	Route::get('/trash',[BannerController::class, 'trash']);
	Route::get('/show/{id}',[BannerController::class, 'show']);
    Route::post('/store',[BannerController::class, 'store']);
	Route::post('/update/{id}',[BannerController::class, 'update']);
    Route::get('/status/{id}',[BannerController::class, 'status']);
    Route::get('/delete/{id}',[BannerController::class, 'delete']);
    Route::get('/restore/{id}',[BannerController::class, 'restore']);
	Route::delete('/destroy/{id}',[BannerController::class, 'destroy']);
	
});
Route::prefix('brand')->group(function(){
	Route::get('/',[BrandController::class, 'index']);
	Route::get('/trash',[BrandController::class, 'trash']);
	Route::get('/show/{id}',[BrandController::class, 'show']);
	Route::post('/store',[BrandController::class, 'store']);
	Route::post('/update/{id}',[BrandController::class, 'update']);
	Route::get('/status/{id}',[BrandController::class, 'status']);
	Route::get('/delete/{id}',[BrandController::class, 'delete']);
	Route::get('/restore/{id}',[BrandController::class, 'restore']);
	Route::delete('/destroy/{id}',[BrandController::class, 'destroy']);
});

Route::prefix('category')->group(function(){
	Route::get('/',[CategoryController::class, 'index']);
	Route::get('/trash',[CategoryController::class, 'trash']);
	Route::get('/show/{id}',[CategoryController::class, 'show']);
	Route::post('/store',[CategoryController::class, 'store']);
	Route::post('/update/{id}',[CategoryController::class, 'update']);
	Route::get('/status/{id}',[CategoryController::class, 'status']);
	Route::get('/delete/{id}',[CategoryController::class, 'delete']);
	Route::get('/restore/{id}',[CategoryController::class, 'restore']);
	Route::delete('/destroy/{id}',[CategoryController::class, 'destroy']);
});


Route::prefix('menu')->group(function(){
	Route::get('/',[MenuController::class, 'index']);
	Route::get('/trash',[MenuController::class, 'trash']);
	Route::get('/show/{id}',[MenuController::class, 'show']);
	Route::post('/store',[MenuController::class, 'store']);
	Route::post('/update/{id}',[MenuController::class, 'update']);
	Route::get('/status/{id}',[MenuController::class, 'status']);
	Route::get('/delete/{id}',[MenuController::class, 'delete']);
	Route::get('/restore/{id}',[MenuController::class, 'restore']);
	Route::delete('/destroy/{id}',[MenuController::class, 'destroy']);
});

Route::prefix('contact')->group(function(){
	Route::get('/',[ContactController::class, 'index']);
	Route::get('/trash',[ContactController::class, 'trash']);
	Route::get('/show/{id}',[ContactController::class, 'show']);
	Route::post('/reply/{id}',[ContactController::class, 'reply']);
	Route::get('/status/{id}',[ContactController::class, 'status']);
	Route::get('/delete/{id}',[ContactController::class, 'delete']);
	Route::get('/restore/{id}',[ContactController::class, 'restore']);
	Route::delete('/destroy/{id}',[ContactController::class, 'destroy']);
});
Route::prefix('post')->group(function(){
	Route::get('/',[PostController::class, 'index']);
	Route::get('/trash',[PostController::class, 'trash']);
	Route::get('/show/{id}',[PostController::class, 'show']);
	Route::post('/store',[PostController::class, 'store']);
	Route::post('/update/{id}',[PostController::class, 'update']);
	Route::get('/status/{id}',[PostController::class, 'status']);
	Route::get('/delete/{id}',[PostController::class, 'delete']);
	Route::get('/restore/{id}',[PostController::class, 'restore']);
	Route::delete('/destroy/{id}',[PostController::class, 'destroy']);
});

Route::prefix('topic')->group(function(){
	Route::get('/',[TopicController::class, 'index']);
	Route::get('/trash',[TopicController::class, 'trash']);
	Route::get('/show/{id}',[TopicController::class, 'show']);
	Route::post('/store',[TopicController::class, 'store']);
	Route::post('/update/{id}',[TopicController::class, 'update']);
	Route::get('/status/{id}',[TopicController::class, 'status']);
	Route::get('/delete/{id}',[TopicController::class, 'delete']);
	Route::get('/restore/{id}',[TopicController::class, 'restore']);
	Route::delete('/destroy/{id}',[TopicController::class, 'destroy']);
});

Route::prefix('productimage')->group(function(){
	Route::get('/',[ProductImageController::class, 'index']);
	Route::get('/trash',[ProductImageController::class, 'trash']);
	Route::get('/show/{id}',[ProductImageController::class, 'show']);
	Route::post('/store',[ProductImageController::class, 'store']);
	Route::post('/update/{id}',[ProductImageController::class, 'update']);
	Route::get('/status/{id}',[ProductImageController::class, 'status']);
	Route::get('/delete/{id}',[ProductImageController::class, 'delete']);
	Route::get('/restore/{id}',[ProductImageController::class, 'restore']);
	Route::delete('/destroy/{id}',[ProductImageController::class, 'destroy']);
});

Route::prefix('user')->group(function(){
	Route::get('/',[UserController::class, 'index']);
	Route::get('/trash',[UserController::class, 'trash']);
	Route::get('/show/{id}',[UserController::class, 'show']);
	Route::post('/store',[UserController::class, 'store']);
	Route::post('/update/{id}',[UserController::class, 'update']);
	Route::get('/status/{id}',[UserController::class, 'status']);
	Route::get('/delete/{id}',[UserController::class, 'delete']);
	Route::get('/restore/{id}',[UserController::class, 'restore']);
	Route::delete('/destroy/{id}',[UserController::class, 'destroy']);
});

Route::prefix('order')->group(function(){
	Route::get('/',[OrderController::class, 'index']);
	Route::get('/trash',[OrderController::class, 'trash']);
	Route::get('/show/{id}',[OrderController::class, 'show']);
    Route::get('/status/{id}',[OrderController::class, 'status']);
	Route::delete('/destroy/{id}',[OrderController::class, 'destroy']);
});

Route::prefix('product')->group(function(){
	Route::get('/',[ProductController::class, 'index']);
	Route::get('/trash',[ProductController::class, 'trash']);
	Route::get('/show/{id}',[ProductController::class, 'show']);
    Route::post('/store',[ProductController::class, 'store']);
	Route::post('/update/{id}',[ProductController::class, 'update']);
    Route::get('/status/{id}',[ProductController::class, 'status']);
    Route::get('/delete/{id}',[ProductController::class, 'delete']);
    Route::get('/restore/{id}',[ProductController::class, 'restore']);
	Route::delete('/destroy/{id}',[ProductController::class, 'destroy']);
});

Route::prefix('productsale')->group(function(){
	Route::get('/',[ProductSaleController::class, 'index']);
	Route::get('/trash',[ProductSaleController::class, 'trash']);
	Route::get('/show/{id}',[ProductSaleController::class, 'show']);
    Route::post('/store',[ProductSaleController::class, 'store']);
	Route::post('/update/{id}',[ProductSaleController::class, 'update']);
    Route::get('/status/{id}',[ProductSaleController::class, 'status']);
    Route::get('/delete/{id}',[ProductSaleController::class, 'delete']);
    Route::get('/restore/{id}',[ProductSaleController::class, 'restore']);
	Route::delete('/destroy/{id}',[ProductSaleController::class, 'destroy']);
});

Route::prefix('productstore')->group(function(){
	Route::get('/',[ProductStoreController::class, 'index']);
	Route::get('/trash',[ProductStoreController::class, 'trash']);
	Route::get('/show/{id}',[ProductStoreController::class, 'show']);
	Route::post('/store',[ProductStoreController::class, 'store']);
	Route::post('/update/{id}',[ProductStoreController::class, 'update']);
	Route::get('/status/{id}',[ProductStoreController::class, 'status']);
	Route::get('/delete/{id}',[ProductStoreController::class, 'delete']);
	Route::get('/restore/{id}',[ProductStoreController::class, 'restore']);
	Route::delete('/destroy/{id}',[ProductStoreController::class, 'destroy']);
});