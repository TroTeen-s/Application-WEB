<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * @property int id
 * @property string firstname
 * @property string lastname
 * @property string id_stripe
 * @property string username
 * @property string email
 * @property string phone_number
 * @property string fidelity_points
 * @property string role
 * @property boolean active
 * @property Collection subscriptions
 * @property Collection packages
 * @method static create(array $array)
 */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasApiTokens;

    protected $fillable = [
        'firstname',
        'id_stripe',
        'lastname',
        'username',
        'email',
        'phone_number',
        'password',
        'active',
        'role',
        'registered_at',
        'fidelity_points',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    /**
     * @see PackageUser
     * Les abonnements de l'utilisateurs. Crée une colonne dans la table de pivot PackageUser
     */
    public function packages(): BelongsToMany
    {
        return $this->belongsToMany(Package::class)->withPivot(
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
        );
    }

    /**
     * Récupérer tous les objets (produits de ce type en entrepôt) associés.
     */
    public function subscriptions(): HasMany
    {
        return $this->hasMany(PackageUser::class);
    }

    public function carts(): HasMany
    {
        return $this->hasMany(Cart::class);
    }
}
