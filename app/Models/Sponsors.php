<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Sponsors extends Model
{
    use HasFactory;

    protected $fillable = [
        'brand',
        'description',
        'end',

    ];

    public function codes(): HasMany
    {
        return $this->hasMany(SponsorCode::class);
    }
}
