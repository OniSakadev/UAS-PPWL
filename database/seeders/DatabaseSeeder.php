<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeders.
     */
    public function run(): void
    {
        // Clear existing users
        DB::table('users')->truncate();

        // Create Admin User
        DB::table('users')->insert([
            'name' => 'Admin User',
            'email' => 'admin@gmail.com',
            'email_verified_at' => null,
            'password' => Hash::make('admin1234'),
            'remember_token' => null,
            'created_at' => now(),
            'updated_at' => now(),
            'role' => 'admin',
        ]);

        // Create Regular User
        DB::table('users')->insert([
            'name' => 'Regular User',
            'email' => 'user@gmail.com',
            'email_verified_at' => null,
            'password' => Hash::make('user1234'),
            'remember_token' => null,
            'created_at' => now(),
            'updated_at' => now(),
            'role' => 'user',
        ]);
    }
}
