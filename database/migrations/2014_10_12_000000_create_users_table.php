<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('id_stripe')->nullable();
            $table->string('firstname');
            $table->string('lastname');
            $table->string('username');
            $table->string('email', 254)->unique();
            $table->string('phone_number', 10);
            $table->boolean('email_configured')->default(false);
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->dateTime('registered_at')->default(DB::raw('now()'));
            $table->integer('fidelity_points')->default(0);
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
};
