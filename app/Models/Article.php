<?php


namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $table = "articles";

    protected $fillable = ['title', 'urlToImage', 'author_id', 'category_id', 'source_id', 'description', 'publishedAt', 'url', 'content'];

    /**
     * Get the category.
     */
    public function Category()
    {
        return $this->belongsTo(Category::class);
    }
    /**
     * Get the source.
     */
    public function Source()
    {
        return $this->belongsTo(Source::class);
    }
    /**
     * Get the author.
     */
    public function Author()
    {
        return $this->belongsTo(Author::class);
    }
}
