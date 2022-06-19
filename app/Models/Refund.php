<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Refund extends Model
{
    protected $fillable = [
        'reason',
        'cart_id'
    ];

    protected $appends = [
        'user_email',
        'cart'
    ];

    /**
     * Récupérer le produit parent de cet objet.
     */
    public function cart(): BelongsTo
    {
        return $this->belongsTo(Cart::class);
    }

    public function getCartAttribute()
    {
        return $this->cart()->get()->first();
    }

    public function getUserEmailAttribute()
    {
        $user = User::query()->firstWhere(['id' => $this->cart()->get()->first()->user_id])->get()->first();

        return $user->email;
    }

    use HasFactory;
}
