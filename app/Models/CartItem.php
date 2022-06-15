<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class CartItem extends Pivot
{
    use HasFactory;

    protected $fillable = [
        'item_id',
        'cart_id',
        'item_price'
    ];

    protected $hidden = [
        'item_id',
        'cart_id',
    ];

    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }

    public function cart(): BelongsTo
    {
        return $this->belongsTo(Cart::class);
    }

    public $timestamps = false;

}
