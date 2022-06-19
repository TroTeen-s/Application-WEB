<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MaintenanceCenter extends Model
{

    protected $fillable = [
        'road',
        'city',
        'postal_code',
        'phone_number',
        'last_position_long',
        'last_position_lat',
    ];


    use HasFactory;
}
