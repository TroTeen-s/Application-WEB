<?php

namespace App\Models;

use Carbon\Traits\Date;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
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


    protected $casts = [
        'active' => 'boolean'
    ];

    protected $visible = [
        'id',
        'created_at',
        'canceled_at',
        'current_period_start',
        'current_period_end',
        'active',
        'trip_number',
        'last_payment',
        'invoices',
        'package_name',
        'max_trips'
    ];

    protected function getlastPaymentAttribute(): string
    {
        return $this->payment_status_stripe;
    }

    protected function getPackageNameAttribute(): string
    {
        return $this->package->name;
    }

    protected function getMaxTripsAttribute(): string
    {
        return $this->package->max_trips;
    }

    /**
     * Récupère l'abonnement type asssocié.
     */
    public function package(): BelongsTo
    {
        return $this->belongsTo(Package::class);
    }

    /**
     * Récupère les factures associées.
     */
    public function invoices(): HasMany
    {
        //        return Invoice::query()->where('id_subscription', $this->id_stripe)->get();
        return $this->HasMany(Invoice::class, 'id_subscription', 'id_stripe');
    }

    protected function getInvoicesAttribute(): Collection
    {
        return $this->invoices()->get();
    }

    /**
     * Récupère l'utilisateur client de cet abonnement.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public $timestamps = false;
}
