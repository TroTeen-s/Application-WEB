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
        Schema::create('trips', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->boolean("finished");
            $table->boolean("bought");
            $table->float("distance", 6,4);
            $table->date("date");


            $table->unsignedBigInteger('package_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('scooter_id');

            $table->foreign('package_id')->references('id')->on('packages');
            $table->foreign('user_id')->references('id')->on('users');
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
        Schema::dropIfExists('trips');
    }
};
