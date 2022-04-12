<?php

namespace App\Models;


class Package
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
