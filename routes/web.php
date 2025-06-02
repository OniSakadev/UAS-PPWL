<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\CvSubmissionController;
use App\Http\Controllers\Admin\CvAdminController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\LamaranController;
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
| Dashboard Route dengan Logic Pembedaan Role
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {
    // PERBAIKAN: Dashboard utama dengan logic role
    Route::get('/dashboard', function () {
        $user = Auth::user();

        if ($user && $user->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }

        return Inertia::render('User/dashboard');
    })->name('dashboard');

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
| User Routes (Auth Required)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth'])->group(function () {
    // CV Submission
    Route::get('/ajukan-cv', [CvSubmissionController::class, 'create'])->name('ajukan.cv');
    Route::post('/ajukan-cv', [CvSubmissionController::class, 'store'])->name('ajukan.cv.store');

    // Status lamaran
    Route::get('/status-lamaran', [LamaranController::class, 'index'])->name('status-lamaran');
});
/*
|--------------------------------------------------------------------------
| CV Management Routes (Admin)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/cv-management', [CvAdminController::class, 'index'])->name('cv.index');
    Route::get('/cv-management/{cvSubmission}/download', [CvAdminController::class, 'download'])->name('cv.download');
    Route::delete('/cv-management/{cvSubmission}', [CvAdminController::class, 'destroy'])->name('cv.destroy');
});
/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    // Admin Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

    // User Management
    Route::get('/users', [UserController::class, 'index'])->name('admin.users.index');
    Route::post('/users', [UserController::class, 'store'])->name('admin.users.store');
    Route::put('/users/{user}', [UserController::class, 'update'])->name('admin.users.update');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('admin.users.destroy');

    // Other Admin Features
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

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
