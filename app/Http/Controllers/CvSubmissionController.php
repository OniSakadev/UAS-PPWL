<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CvSubmission;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class CvSubmissionController extends Controller
{
    public function create(Request $request)
{
    $email = $request->user()?->email ?? $request->query('email');
    $existingSubmission = false;

    if ($email) {
        $existingSubmission = CvSubmission::where('email', $email)->exists();
    }

    return Inertia::render('User/AjukanCv', [
        'existingSubmission' => $existingSubmission,
    ]);
}


public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email',
        'position' => 'required|string|max:255',
        'cv_file' => 'required|file|mimes:pdf|max:2048', // validasi file PDF maksimal 2MB
    ]);

    // ✅ Simpan file dan ambil path-nya
    $path = $request->file('cv_file')->store('cv_files', 'public');

    // ✅ Simpan ke database
    CvSubmission::create([
        'user_id' => Auth::id(),
        'name' => $validated['name'],
        'email' => $validated['email'],
        'position' => $validated['position'],
        'cv_file' => $path,
    ]);

    return redirect()->route('status-lamaran')->with('success', 'CV berhasil diajukan!');
}
    public function index(Request $request)
    {
        $submissions = CvSubmission::where('email', $request->user()->email)->get();

        return Inertia::render('UserStatusLamaran', [
            'submissions' => $submissions,
            'success' => session('success')
        ]);
    }
}
