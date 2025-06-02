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
        $user = $request->user();
        $email = $request->user()?->email ?? $request->query('email');
        $existingSubmission = false;

        if ($email) {
            $existingSubmission = CvSubmission::where('email', $email)->exists();
        }

        return Inertia::render('User/AjukanCv', [
            'existingSubmission' => $existingSubmission,
            'email' => $user ? $user->email : '',
        ]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([

            'name' => 'required|string',
            'position' => 'required|string',
            'cv_file' => 'required|file|mimes:pdf,doc,docx|max:2048',
        ]);

        $path = $request->file('cv_file')->store('cv_files', 'public');

        CvSubmission::create([
            'user_id'  => Auth::id(),
            'name' => $validated['name'],
            'email' => Auth::user()->email,
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
