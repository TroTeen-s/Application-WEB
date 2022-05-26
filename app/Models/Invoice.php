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
        'id',
        'id_sale',
        'id_subscription',
        'id_package',
        'total_price',
        'date',
        'bulling_address',
        'id_stripe'
    ];

    protected $visible = [
        'id',
        'total_price',
        'date',
        'billing_address_city',
        'billing_address_line',
        'billing_address_postal_code',
        'card_number',
        'amount'


    ];

    protected $appends = [
        'amount',
        'billing_address_city',
        'billing_address_line',
        'billing_address_postal_code',
        'card_number',
    ];


    protected function getbillingAddressCityAttribute()
    {
        $payment = $this->payment();
        return (!empty($payment->billing_address_city)) ? $payment->billing_address_city : null;

    }

    protected function getbillingAddressLineAttribute()
    {
        $payment = $this->payment();
        return (!empty($payment->billing_address_line)) ? $payment->billing_address_line : null;
    }

    protected function getbillingAddressPostalCodeAttribute()
    {
        $payment = $this->payment();
        return (!empty($payment->billing_address_postal_code)) ? $payment->billing_address_postal_code : null;
    }

    protected function getcardNumberAttribute()
    {
        $payment = $this->payment();
        return (!empty($payment->card_number)) ? $payment->card_number : null;

    }

    protected function getAmountAttribute()
    {
        $payment = $this->payment();
        return (!empty($payment->amount)) ? $payment->amount : null;
    }

    public function payment()
    {
        return Payment::query()->where('id_invoice_stripe', $this->id_stripe)->first();
    }

    public $timestamps = false;

}
