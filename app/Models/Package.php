<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;


class Package extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'price',
        'username',
        'max_trips',
        'is_subscription'
    ];
}
