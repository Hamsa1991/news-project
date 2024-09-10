<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArticlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title');
//            $table->string('author')->nullable();
            $table->text('urlToImage')->nullable();
            $table->text('url');
            $table->text('description')->nullable();
            $table->text('content')->nullable();
            $table->foreignId('source_id')->nullable()->references('id')->on('sources')->onDelete('cascade');
            $table->foreignId('category_id')->nullable()->references('id')->on('categories')->onDelete('cascade');
            $table->foreignId('author_id')->nullable()->references('id')->on('authors')->onDelete('cascade');
//            $table->string('category')->nullable();
//            $table->string('sourceName')->nullable();
            $table->dateTime('publishedAt');
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
        Schema::dropIfExists('articles');
    }
}
