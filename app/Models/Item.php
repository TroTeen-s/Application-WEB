<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Item extends Model
{
    protected $fillable = [
        'product_id',
        'bought',
        'returned',
    ];

    protected $hidden = [
        'bought',
        'returned',
        'available',
        "created_at",
        "updated_at",
    ];

    protected $appends = [
        'image_path'
    ];

    /**
     * Récupérer le produit parent de cet objet.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function getImagePathAttribute()
    {
        return $this->product->image_path;
    }

    /**
     * The users that belong to the role.
     */
    public function carts(): BelongsToMany
    {
        return $this->belongsToMany(Cart::class)->using(CartItem::class);
    }


    use HasFactory;
}
