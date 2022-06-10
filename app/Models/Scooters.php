<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Scooters extends Model
{
    use HasFactory;

    protected $fillable = [
        'acquired_at',
        'model_serie',
        'last_revision',
        'mileage',
        'last_position_long',
        'last_position_lat',
        'maintenance',
        'fixing'

    ];




}
