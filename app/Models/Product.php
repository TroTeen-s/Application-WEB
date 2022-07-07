<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'name',
        'price',
        'description',
        'image_path',
        'active'
    ];


    /**
     * Récupérer tous les objets (produits de ce type en entrepôt) associés.
     */
    public function items(): HasMany
    {
        return $this->hasMany(Item::class);
    }

    public function getOneAvailableForPurchase(): Model|HasMany
    {
        return $this->items()->firstWhere('available', true);
    }


    /**
     * Renvoie lles objets associés qui sont disponibles à la vente
     *
     * @return int
     */
    protected function getinStockAvailableAttribute(): int
    {
        return $this->items()->where(['available' => true, 'bought' => false])->count();
    }


    /**
     * Les différentes propriétés que l'on veut rajouter à l'entité quand on la renvoie en JSON
     *
     * ici sous la forme snake_case, l'accessor sous la forme getCamelCase()
     * propriété : in_stock_available, accessor : getinStockAvailableAttribute()
     */
    protected $appends = ['in_stock_available'];


    use HasFactory;
}
