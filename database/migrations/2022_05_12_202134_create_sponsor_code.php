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
    public function up()
    {
        Schema::create('sponsor_codes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('code');

            $table->dateTime('assigned_at')->nullable();

            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('sponsor_id');

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('sponsor_id')->references('id')->on('sponsors')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sponsor_codes');
    }
};
