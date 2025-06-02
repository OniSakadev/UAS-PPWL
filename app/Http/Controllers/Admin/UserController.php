<?php
// app/Http/Controllers/Admin/UserController.php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Traits\LogsActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
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
        
        // HAPUS logging untuk view
        // $this->logActivity(...) // Hapus baris ini
        
        $users = User::orderBy('created_at', 'desc')->get();
        
        return Inertia::render('Admin/UserManagement', [
            'users' => $users
        ]);
    }

    public function store(Request $request)
    {
        $this->checkAdmin();
        
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|in:user,admin',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        // Log aktivitas create - TETAP ADA
        $this->logActivity(
            'Created',
            'User',
            $user->id,
            "Created new user: {$user->name} ({$user->email})",
            [],
            $user->only(['name', 'email', 'role'])
        );

        return redirect()->back()->with('success', 'User created successfully!');
    }

    public function update(Request $request, User $user)
    {
        $this->checkAdmin();
        
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8',
            'role' => 'required|in:user,admin',
        ]);

        $oldValues = $user->only(['name', 'email', 'role']);

        $updateData = [
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
        ];

        if ($request->password) {
            $updateData['password'] = Hash::make($request->password);
        }

        $user->update($updateData);

        // Log aktivitas update - TETAP ADA
        $this->logActivity(
            'Updated',
            'User',
            $user->id,
            "Updated user: {$user->name} ({$user->email})",
            $oldValues,
            $user->only(['name', 'email', 'role'])
        );

        return redirect()->back()->with('success', 'User updated successfully!');
    }

    public function destroy(User $user)
    {
        $this->checkAdmin();
        
        $userData = $user->only(['name', 'email', 'role']);
        
        $user->delete();

        // Log aktivitas delete - TETAP ADA
        $this->logActivity(
            'Deleted',
            'User',
            $user->id,
            "Deleted user: {$userData['name']} ({$userData['email']})",
            $userData,
            []
        );

        return redirect()->back()->with('success', 'User deleted successfully!');
    }
}
