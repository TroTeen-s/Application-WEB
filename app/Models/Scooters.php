<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Scooters extends Model
{
    use HasFactory;

    protected $fillable = [
        'acquired_at',
        'model_serie',
        'last_revision',
        'mileage',
        'last_position_long',
        'last_position_lat',
        'maintenance',
        'fixing',
        'maintenance_center_id',
        'fixing_center_id'

    ];

    public function items(): HasMany
    {
        return $this->hasMany(Item::class);
    }

    // protected function getMaintenanceScoot(): int
    // {
    //     return $this->items()->where('maintenance', 1)->get();
    // }




}
