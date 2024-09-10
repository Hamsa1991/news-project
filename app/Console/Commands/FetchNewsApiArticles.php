<?php

namespace App\Console\Commands;

use App\Models\Author;
use App\Models\Category;
use App\Models\Source;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\Article;
use Illuminate\Support\Facades\Log;

class FetchArticles extends Command
{
    protected $signature = 'fetch:articles';
    protected $description = 'Fetch articles from the News API and store them in the database';

    public function handle()
    {
//        $sources = [
//            'source1' => 'https://newsapi.org/v2/top-headlines?category=Business&apiKey=9cd080ab99794b019511f8b63dd672c9',
//            'source2' => 'https://content.guardianapis.com/search?api-key=98dcfdc3-7b93-455c-8cbb-ea361fcfe4c5',
//            'source3' => 'https://newsdata.io/api/1/latest?apikey=pub_529805766d4765ed4acad045120f3429aa53f&country=us',
//        ];
        $categories = ['Business', 'Technology', 'Sports', 'Entertainment', 'General', 'Health', 'Science'];
        foreach ($categories as $category) {
            $response = Http::get('https://newsapi.org/v2/top-headlines?category=' . $category . '&apiKey=9cd080ab99794b019511f8b63dd672c9');

            if ($response->successful()) {
                $data = $response->json();
                $articles = $data['articles'] ?? $data['response']['results'] ?? $data['results'];

                $category = Category::updateOrCreate(['name' => $category], ['status' => 1]);

                foreach ($articles as $articleData) {

                    $author = isset($articleData['author']) ? Author::updateOrCreate(['name' => $articleData['author']], ['status' => 1]) : null;
                    $source = isset($articleData['source']['name']) ? Source::updateOrCreate(['name' => $articleData['source']['name']], ['status' => 1]) : null;
                    $article = Article::updateOrCreate(
                        ['url' => $articleData['url'] ?? $articleData['webUrl'] ?? $articleData['link']],
                        [
                            'title' => $articleData['title'] ?? $articleData['webTitle'],
                            'urlToImage' => $articleData['urlToImage'] ?? $articleData['image_url'] ?? null,
//                            'author' => $articleData['author'] ?? null,// isset($articleData['creator'])? json_encode($articleData['creator']) : null,
//                           'category' => $articleData['sectionName'] ?? null,// isset($articleData['category'])? json_encode($articleData['category']) : null,
//                            'sourceName' => $articleData['source']['name'] ?? $articleData['source_name'] ?? $articleData['pillarName'] ?? null,
                            'author_id' => $author?->id,
                            'source_id' => $source?->id,
                            'category_id' => $category?->id,
                            'description' => $articleData['description'] ?? null,
                            'publishedAt' => Carbon::parse($articleData['publishedAt'] ?? $articleData['webPublicationDate'] ?? $articleData['pubDate']),
                            'content' => $articleData['content'] ?? null,
                        ]
                    );
                }

                $this->info('Articles fetched and stored successfully!');
            } else {
                $this->error('Failed to fetch articles from the API.');
            }
        }
    }
}
