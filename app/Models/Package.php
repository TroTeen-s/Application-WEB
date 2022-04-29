<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;


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

    public function clients(): BelongsToMany
    {
        return $this->belongsToMany(User::class)->withPivot('active', 'trip_number', 'id_stripe', 'id_session_stripe', 'payment_status_stripe');
    }
}
