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
        Schema::create('reparations', function (Blueprint $table) {
            $table->id();
            $table->boolean('finished')->default(false);
            $table->dateTime('ended_at')->nullable();

            $table->unsignedBigInteger('scooter_id');
            $table->unsignedBigInteger('repair_center_id');

            $table->foreign('scooter_id')->references('id')->on('scooters');
            $table->foreign('repair_center_id')->references('id')->on('repair_centers');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reparations');
    }
};
