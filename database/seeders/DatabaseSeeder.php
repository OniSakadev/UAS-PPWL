<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Disable foreign key constraints
        Schema::disableForeignKeyConstraints();

        // Clear existing data
        DB::table('activity_logs')->truncate(); // Truncate child table first
        DB::table('users')->truncate(); // Then parent table

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

        // Re-enable foreign key constraints
        Schema::enableForeignKeyConstraints();
    }
}
