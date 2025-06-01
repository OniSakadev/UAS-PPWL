<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CvSubmission;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class CvSubmissionController extends Controller
{
    public function create()
    {
        return Inertia::render('AjukanCv');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'position' => 'required|string',
            'cv_file' => 'required|file|mimes:pdf,doc,docx|max:2048',
        ]);

        $path = $request->file('cv_file')->store('cv_files', 'public');

        CvSubmission::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'position' => $validated['position'],
            'cv_file' => $path,
        ]);

        return redirect()->route('ajukan.cv')->with('success', 'CV berhasil diajukan!');
    }
}

