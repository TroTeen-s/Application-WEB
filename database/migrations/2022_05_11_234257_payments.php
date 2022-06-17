<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('Payments', function (Blueprint $table) {
            $table->id();
            $table->float('amount')->nullable();
            $table->dateTime('payment_date')->nullable();
            $table->string('billing_address_city')->nullable();
            $table->string('billing_address_line')->nullable();
            $table->string('billing_address_postal_code')->nullable();
            $table->string('card_number')->nullable();
            $table->string('id_stripe')->nullable();
            $table->string('id_invoice_stripe')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
