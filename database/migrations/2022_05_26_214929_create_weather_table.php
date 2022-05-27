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
        Schema::create('weather', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('description')->nullable();
            $table->integer("temp")->nullable();
            $table->integer("feel_like")->nullable();
            $table->integer("temp_min")->nullable();
            $table->integer("temp_max")->nullable();
            $table->integer("pressure")->nullable();
            $table->integer("humidity")->nullable();
            $table->string('city')->nullable();
            $table->string('country')->nullable();
            $table->timestamp('DateTime')->useCurrent();



        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('weather');
    }
};
