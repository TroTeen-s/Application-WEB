<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SponsorCode extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'user_id',
        'sponsor_id'
    ];
}
