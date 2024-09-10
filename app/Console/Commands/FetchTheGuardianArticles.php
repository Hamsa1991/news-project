<?php

namespace App\Console\Commands;

use App\Models\Article;
use App\Models\Author;
use App\Models\Category;
use App\Models\Source;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class FetchTheGuardianArticles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fetch:guardian';

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
        for ($page = 1; $page <= 50; $page++) {
            $response = Http::get('https://content.guardianapis.com/search?api-key=98dcfdc3-7b93-455c-8cbb-ea361fcfe4c5&page=' . $page);

            if ($response->successful()) {
                $data = $response->json();
                $articles = $data['response']['results'];

                foreach ($articles as $articleData) {

                    $category = isset($articleData['sectionName']) ? Category::updateOrCreate(['name' => $articleData['sectionName']], ['status' => 1]) : null;

                    Article::updateOrCreate(
                        ['url' => $articleData['webUrl']],
                        [
                            'title' => $articleData['webTitle'],
                            'category_id' => $category ?->id,
                            'description' => $articleData['description'] ?? null,
                            'publishedAt' => Carbon::parse($articleData['webPublicationDate']),
                            'content' => $articleData['content'] ?? null
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
