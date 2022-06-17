<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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


    use HasFactory;
}
