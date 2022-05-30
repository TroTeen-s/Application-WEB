<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Weather extends Model
{
    use HasFactory;

    protected $fillable = [
        'temp',
        'description',
        'feel_like',
        'temp_min',
        'temp_max',
        'pressure',
        'humidity',
        'city',
        'country',
        'DateTime'



    ];
}
