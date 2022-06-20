<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Fidelity extends Model
{
    protected $table = 'fidelity_history';

    protected $fillable = [
        'amount',
        'date',
        'reason',
        'payment_id'
    ];

    public function payment(): BelongsTo
    {
        return $this->belongsTo(Payment::class, 'payment_id', 'id_stripe');
    }

    public $timestamps = false;

    use HasFactory;
}
