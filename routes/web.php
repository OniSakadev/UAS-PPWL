<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CvSubmissionController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/ajukan-cv', [CvSubmissionController::class, 'create']);
Route::post('/ajukan-cv', [CvSubmissionController::class, 'store'])->name('cv.store');


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
