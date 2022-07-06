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
            $table->float("mileage");
            $table->decimal("last_position_long",15, 10);
            $table->decimal("last_position_lat",15, 10);
            $table->boolean("maintenance");
            $table->boolean("fixing");
            $table->string("commentary",200)->nullable();
        });

        
        Schema::table('scooters', function($table) {
            $table->unsignedBigInteger('maintenance_center_id')->nullable();
            $table->foreign('maintenance_center_id')->references('id')->on('maintenance_centers')->onDelete('cascade');;
        });

        Schema::table('scooters', function($table) {
            $table->unsignedBigInteger('fixing_center_id')->nullable();
            $table->foreign('fixing_center_id')->references('id')->on('fixing_centers')->onDelete('cascade');;
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
