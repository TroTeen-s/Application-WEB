<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'amount',
        'date',
        'billing_address_city',
        'billing_address_line',
        'billing_address_postal_code',
        'card_number',
        'id_stripe',
        'id_invoice_stripe'
    ];

    protected $hidden = [
        'id_stripe',
        'id_invoice_stripe',
        'user_id',
        'bought',
        'id'
    ];


    public $timestamps = false;

    use HasFactory;
}
