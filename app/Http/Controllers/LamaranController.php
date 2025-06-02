<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\CvSubmission;

class LamaranController extends Controller
{
    public function index()
{
    try {
        $user = Auth::user();
        Log::info('User accessing status lamaran', ['user_id' => $user->id ?? null]);

        $submissions = CvSubmission::where('user_id', $user->id)->get();

        // Log jumlah data yang didapat
        Log::debug('Jumlah submission ditemukan', ['count' => $submissions->count()]);

        return Inertia::render('User/StatusLamaran', [
            'submissions' => $submissions,
            'success' => session('success'),
        ]);
    } catch (\Exception $e) {
        // Log error detail
        Log::error('Error pada index LamaranController', [
            'message' => $e->getMessage(),
            'trace' => $e->getTraceAsString(),
        ]);
        // Anda bisa redirect ke halaman error atau tampilkan pesan error
        return back()->withErrors(['msg' => 'Terjadi kesalahan saat mengambil data lamaran.']);
    }
}

}
