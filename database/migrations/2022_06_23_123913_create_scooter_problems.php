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
        Schema::create('scooter_problems', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('description')->nullable();
            $table->string('reporter_email')->nullable();
            $table->boolean('resolved')->default(false);


            $table->unsignedBigInteger('scooter_id');

            $table->foreign('scooter_id')->references('id')->on('scooters');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('scooter_problems');
    }
};
