<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScooterProblem extends Model
{
    use HasFactory;

    protected $fillable = [
        'description',
        'reporter_email',
        'scooter_id',
        'resolved'
    ];
}
