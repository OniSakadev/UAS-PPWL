<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CvSubmission extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'position',
        'cv_file',
    ];
}
