<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScooterHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'scooter_id',
        'model_serie',
        'history_status'
    ];
}
