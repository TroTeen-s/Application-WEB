<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Sale extends Model
{
    protected $fillable = [
        'price',
        'id_item',
        'id_user',
        'sale_date'
    ];
    use HasFactory;

    /**
     * @see PackageUser
     * Les abonnements de l'utilisateurs. Crée une colonne dans la table de pivot PackageUser
     */
    public function itemList(): BelongsToMany
    {
        return $this->belongsToMany(item_sale::class)->withPivot(
            'item_id',
            'sale_id'
        );
    }

}
