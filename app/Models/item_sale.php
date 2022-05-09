<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class item_sale extends Model
{
    protected $fillable = [
        'item_id',
        'sale_id'
    ];

    use HasFactory;
}
