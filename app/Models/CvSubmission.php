<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CvSubmission extends Model
{
    protected $fillable = ['user_id', 'name', 'email', 'position', 'cv_file'];

}
