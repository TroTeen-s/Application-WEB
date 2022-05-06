<?php

namespace App\Models;

use Carbon\Traits\Date;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int id_sale
 * @property int id_subscription
 * @property float total_price
 * @property Date date
 * @property string billing_address
 * @property string id_stripe
 */
class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_sale',
        'id_package',
        'total_price',
        'date',
        'bulling_address',
        'id_stripe'
    ];

    public $timestamps = false;

}
