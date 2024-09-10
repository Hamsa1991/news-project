<?php

namespace App\Console\Commands;

use App\Models\Article;
use App\Models\Author;
use App\Models\Category;
use App\Models\Source;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class FetchNewsIOArticles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fetch:newsArticles';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $index = 0;
        $nextPage = null;
        $url = $basic_url = 'https://newsdata.io/api/1/latest?apikey=pub_529805766d4765ed4acad045120f3429aa53f&country=us';
        do{
            $index++;
            $response = Http::get($url);

            if ($response->successful()) {
                $data = $response->json();
                $articles = $data['results'];
                $nextPage = $data['nextPage'];
                if($nextPage){
                    $url = $basic_url . '&page=' . $nextPage;
                }

                foreach ($articles as $articleData) {

                    $category = isset($articleData['category'][0]) ? Category::updateOrCreate(['name' => $articleData['category'][0]], ['status' => 1]) : null;
                    $author = isset($articleData['creator'][0]) ? Author::updateOrCreate(['name' => $articleData['creator'][0]], ['status' => 1]) : null;
                    $source = isset($articleData['source_name']) ? Source::updateOrCreate(['name' => $articleData['source_name']], ['status' => 1]) : null;

                    Article::updateOrCreate(
                        ['url' => $articleData['link']],
                        [
                            'title' => $articleData['title'],
                            'urlToImage' => $articleData['image_url'] ?? null,
                            'author_id' => $author ?->id,
                        'source_id' => $source ?->id,
                        'category_id' => $category ?->id,
                        'description' => $articleData['description'] ?? null,
                        'publishedAt' => Carbon::parse($articleData['pubDate']),
                        'content' => $articleData['content'] ?? null,
                        ]
                    );
                }

                $this->info('Articles fetched and stored successfully!');
            } else {
                $this->error('Failed to fetch articles from the API.');
            }
        }while ($index <= 50);

    }
}
