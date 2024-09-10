<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\NewsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ArticleController extends Controller
{
    protected $newsService;

    public function __construct(NewsService $newsService)
    {
        $this->newsService = $newsService;
    }

    public function getArticles(Request $request)
    {
        try {
            $articles = $this->newsService->getArticles($request);
            return response()->json($articles);
        } catch (\Exception $e) {
            Log::error('Error in file ' . $e->getFile() . ' ' . $e->getMessage());
            return response()->json(['error' => 'Something went wrong']);
        }
    }

    public function getData(Request $request)
    {
        try {
            $data = $this->newsService->getData($request);
            return response()->json($data);
        } catch (\Exception $e) {
            Log::error('Error in file ' . $e->getFile() . ' ' . $e->getMessage());
            return response()->json(['error' => 'Something went wrong']);
        }
    }
}
