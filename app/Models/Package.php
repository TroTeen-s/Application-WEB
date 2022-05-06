<?php

namespace App\Models;

use Barryvdh\LaravelIdeHelper\Eloquent;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @mixin Eloquent
 */
class Package extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'id_stripe',
        'price',
        'max_trips',
        'is_subscription'
    ];

    /**
     * Tous les clients ayant cet abonnement
     */
    public function clients(): BelongsToMany
    {
        return $this->belongsToMany(User::class)->withPivot('id_stripe',
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
            'package_id');
    }
}
