<?php

namespace App\Http\Controllers;

use App\Models\CvSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CvSubmissionController extends Controller
{
    public function create()
    {
        return Inertia::render('AjukanCv');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'position' => 'required|string|max:255',
            'cv_file' => 'required|mimes:pdf,doc,docx|max:2048',
        ]);

        $path = $request->file('cv_file')->store('cv_files', 'public');

        CvSubmission::create([
            'name' => $request->name,
            'email' => $request->email,
            'position' => $request->position,
            'cv_file' => $path,
        ]);

        return redirect()->back()->with('success', 'CV berhasil dikirim!');
    }
}
