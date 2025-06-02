<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CvSubmission;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

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
            'name' => 'required|string',
            'email' => 'required|email',
            'position' => 'required|string',
            'cv_file' => 'required|file|mimes:pdf,doc,docx|max:2048',
        ]);

        $existing = CvSubmission::where('email', $validated['email'])->first();
        if ($existing) {
            return back()->withErrors(['email' => 'Anda sudah mengirimkan lamaran.']);
        }

        $path = $request->file('cv_file')->store('cv_files', 'public');

        CvSubmission::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'position' => $validated['position'],
            'cv_file' => $path,
        ]);

        return redirect()->route('status-lamaran')->with('success', 'CV berhasil dikirim.');
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
