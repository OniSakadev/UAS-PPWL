<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CvSubmission;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class CvAdminController extends Controller
{
    public function index()
    {
        $cvSubmissions = CvSubmission::latest()->get();

        Log::debug("ares",$cvSubmissions->toArray());

        return Inertia::render('Admin/CvManagement', [
            'cvSubmissions' => $cvSubmissions
        ]);
    }

    public function download(CvSubmission $cvSubmission)
    {
        return Storage::disk('public')->download($cvSubmission->cv_file);
    }

    public function destroy(CvSubmission $cvSubmission)
    {
        Storage::disk('public')->delete($cvSubmission->cv_file);
        $cvSubmission->delete();

        return redirect()->route('admin.cv.index')->with('success', 'CV berhasil dihapus.');
    }
}
