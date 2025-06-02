<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Traits\ActivityLog;


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
    
        // AMBIL DATA RECENT ACTIVITY DARI TABLE
        $recentActivities = [];
        if (class_exists(\App\Models\ActivityLog::class)) {
            $recentActivities = \App\Models\ActivityLog::with('user')
                ->whereIn('action', ['Created', 'Updated', 'Deleted'])
                ->orderBy('created_at', 'desc')
                ->limit(10)
                ->get()
                ->map(function ($log) {
                    return [
                        'id' => $log->id,
                        'action' => $log->action,
                        'description' => $log->description,
                        'time' => $log->created_at->diffForHumans(),
                        'type' => strtolower(class_basename($log->model_type)),
                        'user_name' => $log->user->name ?? 'Unknown',
                    ];
                });
        }
    
        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentActivities' => $recentActivities,
        ]);
    }    
}
