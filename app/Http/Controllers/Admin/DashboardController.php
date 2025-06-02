<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    private function checkAdmin()
    {
        $user = auth()->user();     
        if (!$user || $user->role !== 'admin') {
            abort(403, 'Unauthorized access - Admin only');
        }
    }

    public function index()
    {
        $this->checkAdmin();

        $stats = [
            'totalUsers' => User::count(),
            'totalCompanies' => 0,
            'adminAccounts' => User::where('role', 'admin')->count(),
            'newThisMonth' => User::whereMonth('created_at', Carbon::now()->month)
                                ->whereYear('created_at', Carbon::now()->year)
                                ->count(),
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentActivities' => [],
        ]);
    }
}
