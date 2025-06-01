<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CvSubmissionController;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public Route
|--------------------------------------------------------------------------
*/
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

/*
|--------------------------------------------------------------------------
| CV Submission (Public Access)
|--------------------------------------------------------------------------
*/
Route::get('/ajukan-cv', [CvSubmissionController::class, 'create']);
/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {
    
    // General fallback dashboard route if needed
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Admin Dashboard
    Route::get('/admin/dashboard', function () {
        return Inertia::render('Admin/dashboard');
    })->name('admin.dashboard');

    // User Dashboard
    Route::get('/user/dashboard', function () {
        return Inertia::render('User/dashboard');
    })->name('user.dashboard');
});

/*
|--------------------------------------------------------------------------
| Additional Route Files
|--------------------------------------------------------------------------
*/
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
