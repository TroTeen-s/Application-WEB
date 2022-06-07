<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'checkout_id',
        'payment_id',
        'bought',
        'user_id'
    ];

    protected $hidden = [
        'checkout_id',
        'payment_id',
        'user_id',
        'bought',
        'created_at',
        'updated_at'
    ];

    /**
     * Récupérer l'utilisateurde ce panier.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Récupérer tous les objets de ce panier.
     */
    public function cartItems(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }

    public function items(): BelongsToMany
    {
        return $this->belongsToMany(Item::class)->withPivot(
            'item_id',
            'cart_id'
        );
    }

    public function payment(): HasOne
    {
        return $this->hasOne(Payment::class, 'id_stripe', 'payment_id');
    }

    function getPaymentAttribute(): Collection
    {
        return $this->payment()->get();
    }

    function getItemNumberAttribute(): int
    {
        return $this->cartItems()->count();
    }

    function getItemsAttribute(): HasMany
    {
        return $this->cartItems();
    }
}
