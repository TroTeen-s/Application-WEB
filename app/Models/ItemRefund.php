<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemRefund extends Model
{
    protected $table = 'item_refund';

    protected $fillable = [
        'refund_id',
        'item_id'
    ];

    public $timestamps = false;

    use HasFactory;
}
