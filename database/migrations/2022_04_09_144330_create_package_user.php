<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('package_user', function (Blueprint $table) {
            $table->id();
            $table->string('id_stripe')->nullable();
            $table->string('payment_status_stripe')->nullable();
            $table->dateTime('current_period_start')->nullable();
            $table->dateTime('current_period_end')->nullable();
            $table->dateTime('created_at')->nullable();
            $table->dateTime('canceled_at')->nullable();
            $table->dateTime('cancel_at')->nullable();
            $table->boolean("active")->default(false);
            $table->integer("trip_number")->default(0);
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('package_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('package_id')->references('id')->on('packages');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('package_user');
    }
};
