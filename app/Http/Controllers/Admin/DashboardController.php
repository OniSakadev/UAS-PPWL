<?php
// app/Http/Controllers/Admin/DashboardController.php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\ActivityLog;
use App\Traits\LogsActivity;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    use LogsActivity;

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

        // HAPUS logging untuk dashboard view
        // $this->logActivity(...) // Hapus baris ini

        $stats = [
            'totalUsers' => User::count(),
            'totalCompanies' => 0,
            'adminAccounts' => User::where('role', 'admin')->count(),
            'newThisMonth' => User::whereMonth('created_at', Carbon::now()->month)
                                ->whereYear('created_at', Carbon::now()->year)
                                ->count(),
        ];

        // Ambil aktivitas real-time HANYA untuk Created, Updated, Deleted
        $recentActivities = ActivityLog::with('user')
            ->whereIn('action', ['Created', 'Updated', 'Deleted']) // Filter hanya CUD operations
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($log) {
                return [
                    'id' => $log->id,
                    'action' => $log->action . ' ' . class_basename($log->model_type),
                    'description' => $log->description,
                    'time' => $log->time_ago,
                    'type' => strtolower(class_basename($log->model_type)),
                    'user_name' => $log->user->name ?? 'Unknown',
                ];
            });

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentActivities' => $recentActivities,
        ]);
    }
}
