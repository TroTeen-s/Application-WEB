<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;


class PackageUser extends Pivot
{
    use HasFactory;

    protected $fillable = [
        'id_stripe',
        'id_session_stripe',
        'payment_status_stripe',
        'active',
        'trip_number',
        'user_id',
        'package_id'
    ];
}
