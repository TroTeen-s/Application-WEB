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
        Schema::create('fixing_centers', function (Blueprint $table) {
            $table->id();
            $table->string('road', 200);
            $table->string('city', 100);
            $table->string('postal_code', 5);
            $table->string('phone_number', 10);
            $table->float("last_position_long");
            $table->float("last_position_lat"); 
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
        Schema::dropIfExists('fixing_centers');
    }
};
