<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\CvSubmission;

class LamaranController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $submissions = CvSubmission::where('user_id', $user->id)->get();

        return Inertia::render('User/StatusLamaran', [
            'submissions' => $submissions,
            'success' => session('success'),
        ]);
    }
}
