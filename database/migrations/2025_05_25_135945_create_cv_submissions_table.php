<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
    Schema::create('cv_submissions', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('email');
        $table->string('position');
        $table->string('cv_file'); // path file CV
        $table->timestamps();
    });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cv_submissions');
    }
};
