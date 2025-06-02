<?php
// database/migrations/xxxx_create_activity_logs_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('activity_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); // Admin yang melakukan aksi
            $table->string('action'); // Jenis aksi (Created, Updated, Deleted)
            $table->string('model_type'); // Model yang diakses (User, Company, etc)
            $table->unsignedBigInteger('model_id')->nullable(); // ID record yang diakses
            $table->text('description'); // Deskripsi aktivitas
            $table->json('old_values')->nullable(); // Data lama (untuk update/delete)
            $table->json('new_values')->nullable(); // Data baru (untuk create/update)
            $table->string('ip_address')->nullable(); // IP address
            $table->string('user_agent')->nullable(); // Browser info
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->index(['user_id', 'created_at']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('activity_logs');
    }
};
