<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Skill extends Model
{

    protected $fillable = ['name'];

    // Relasi: skill bisa dimiliki oleh banyak employee
    public function employees()
    {
        return $this->belongsToMany(Employee::class)->withTimestamps();
    }
}
