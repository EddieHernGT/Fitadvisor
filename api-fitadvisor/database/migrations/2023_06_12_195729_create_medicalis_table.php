<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('medicalis', function (Blueprint $table) {
            $table->increments('id')->unique();
            $table->float('weight');
            $table->float('height');
            $table->json('allergies')->default('"N/A"');
            $table->json('chronic_conditions')->default('"N/A"');
            $table->json('medications')->default('"N/A"');
            $table->integer('person_id')->unsigned()->nullable(false);
            $table->foreign('person_id')->references('id')->on('people')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medicalis');
    }
};
