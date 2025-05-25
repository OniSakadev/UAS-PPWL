<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Company extends Model
{
    protected $fillable = [
        'name',
        'industry',
        'website',
        'description',
        'logo'
    ];

    public function employees()
    {
        return $this->hasMany(Employee::class);
    }
}
