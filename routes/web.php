<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\CvSubmissionController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\DashboardController; // TAMBAHKAN INI
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
| Auth Routes (Login & Register)
|--------------------------------------------------------------------------
*/
Route::middleware('guest')->group(function () {
    Route::get('/login', function () {
        return Inertia::render('Auth/Login');
    })->name('login');

    Route::get('/register', function () {
        return Inertia::render('Auth/Register');
    })->name('register');
});

/*
|--------------------------------------------------------------------------
| CV Submission (Public Access)
|--------------------------------------------------------------------------
*/
Route::get('/ajukan-cv', [CvSubmissionController::class, 'create']);

/*
|--------------------------------------------------------------------------
| Authenticated Routes (User & Admin)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {
    // User Dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('User/dashboard');
    })->name('dashboard');

    // Admin Dashboard - PERBAIKAN: gunakan controller
    Route::get('/admin/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

    // Logout route
    Route::post('/logout', function () {
        Auth::logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();
        return redirect()->route('login');
    })->name('logout');
});

/*
|--------------------------------------------------------------------------
| User Management Routes (Admin)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth'])->group(function () {
    Route::prefix('admin')->group(function () {
        Route::get('/users', [UserController::class, 'index'])->name('admin.users.index');
        Route::post('/users', [UserController::class, 'store'])->name('admin.users.store');
        Route::put('/users/{user}', [UserController::class, 'update'])->name('admin.users.update');
        Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('admin.users.destroy');
        
        // Tambahan route untuk sidebar navigation
        Route::get('/companies', function () {
            return Inertia::render('Admin/Companies');
        })->name('admin.companies');
        
        Route::get('/cv', function () {
            return Inertia::render('Admin/CvManagement');
        })->name('admin.cv');
        
        Route::get('/cv/create', function () {
            return Inertia::render('Admin/AddCvData');
        })->name('admin.cv.create');
        
        Route::get('/cv/verification', function () {
            return Inertia::render('Admin/CvVerification');
        })->name('admin.cv.verification');
    });
});

/*
|--------------------------------------------------------------------------
| Additional Route Files
|--------------------------------------------------------------------------
*/
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
