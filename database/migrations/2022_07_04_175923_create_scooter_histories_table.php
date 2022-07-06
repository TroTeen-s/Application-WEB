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
        Schema::create('scooter_histories', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("model_serie", 50);
            $table->string('history_status')->nullable();
            $table->string('history_problems')->nullable();
            $table->date("last_revision")->nullable();

            $table->unsignedBigInteger('scooter_id')->nullable();
            $table->foreign('scooter_id')->references('id')->on('scooters')->onDelete('cascade');;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('scooter_histories');
    }
};
