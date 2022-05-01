<?php

namespace App\Models;

use Carbon\Traits\Date;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * @property int id_stripe
 * @property int id_session_stripe
 * @property Date current_period_start
 * @property Date current_period_end
 * @property Date created_at
 * @property Date canceled_at
 * @property Date cancel_at
 * @property string payment_status_stripe
 * @property int active
 * @property int trip_number
 * @property int user_id
 * @property int package_id
 */
class PackageUser extends Pivot
{
    use HasFactory;

    protected $fillable = [
        'id_stripe',
        'id_session_stripe',
        'payment_status_stripe',
        'current_period_start',
        'current_period_end',
        'created_at',
        'canceled_at',
        'cancel_at',
        'active',
        'trip_number',
        'user_id',
        'package_id'
    ];

    public $timestamps = false;
}
