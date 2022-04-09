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
        Schema::create('scooters', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->date('acquired_at');
            $table->string("model_serie", 50);
            $table->date("last_revision");
            $table->float("mileage",6,4);
            $table->float("last_position_long", 10,9);
            $table->float("last_position_lat", 10,9);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('scooters');
    }
};
