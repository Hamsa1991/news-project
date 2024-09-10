<?php

namespace App\Services;

use App\Models\Article;
use App\Models\Author;
use App\Models\Category;
use App\Models\Source;
use App\Models\UserSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class NewsService
{

    public function getArticles(Request $request)
    {
        try {
            $keyword = $request->keyword ?? null;
            $category = $request->category ?? null;
            $source = $request->source ?? null;
            $startDate = $request->startDate ?? null;

            //get articles filtered by category, keyword , published date or source

            return Article::with('category')
                ->when($keyword, function ($query) use ($keyword) {
                    return $query->where('title', 'like', '%' . $keyword . '%')
                        ->orWhere('description', 'like', '%' . $keyword . '%')
                        ->orWhere('content', 'like', '%' . $keyword . '%');
                })
                ->when($category, function ($query) use ($category) {
                    return $query->where('category_id', '=', $category);
                })
                ->when($source, function ($query) use ($source) {
                    return $query->where('source_id', '=', $source);
                })
                ->when($startDate, function ($query) use ($startDate) {
                    return $query->where('publishedAt', '>=', $startDate);
                })
                ->paginate(8);
        } catch (\Exception $e) {
            Log::error('Error in file ' . $e->getFile() . ' ' . $e->getMessage());
        }
    }

    public function getData()
    {
        try {

            $data['categories'] = Category::query()->where(['status' => 1])->get();
            $data['sources'] = Source::query()->where(['status' => 1])->get();
            $data['authors'] = Author::query()->where(['status' => 1])->get();

            return $data;
        } catch (\Exception $e) {
            Log::error('Error in file ' . $e->getFile() . ' ' . $e->getMessage());
        }

    }
}
