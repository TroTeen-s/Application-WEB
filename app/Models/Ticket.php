<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ticket extends Model
{
    protected $fillable = [
        'firstname',
        'lastname',
        'email',
        'message',
    ];

    public function tickets(): HasMany
    {
        return $this->hasMany(Ticket::class);
    }


    use HasFactory;
}


