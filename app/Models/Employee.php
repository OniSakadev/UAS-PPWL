<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Employee extends Model
{

    protected $fillable = [
        'name',
        'position',
        'company_id',
        'bio',
        'linkedin',
        'photo'
    ];

    // Relasi ke perusahaan tempat bekerja
    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    // Relasi ke banyak skill (many to many)
    public function skills()
    {
        return $this->belongsToMany(Skill::class)->withTimestamps();
    }
}
