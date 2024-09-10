<?php


namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Models\Author;
use App\Models\Category;
use App\Models\User;
use App\Models\UserSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UserSettingsController extends Controller
{
    public function Store(Request $request){
        try {
            $request->validate([
                'categories' => 'array',
                'sources' => 'array',
                'authors' => 'array',
            ]);
            /* @var User $user */
            $user = $request->user();
            if (!$user) {
                return response()->json(['error' => 'User not authenticated'], 401);
            }

                DB::beginTransaction();
                UserSetting::query()->where('user_id', '=', $user->id)->delete();

                // Prepare an array to hold user settings
                $userSettings = [];

                // Loop through categories
                if (isset($request->categories)) {
                    foreach ($request->categories as $categoryId) {
                        $userSettings[] = [
                            'user_id' => $user->id,
                            'preference_id' => $categoryId,
                            'preference_type' => 'category',
                        ];
                    }
                }

                // Loop through sources
                if (isset($request->sources)) {
                    foreach ($request->sources as $sourceId) {
                        $userSettings[] = [
                            'user_id' => $user->id,
                            'preference_id' => $sourceId,
                            'preference_type' => 'source',
                        ];
                    }
                }

                // Loop through authors
                if (isset($request->authors)) {
                    foreach ($request->authors as $authorId) {
                        $userSettings[] = [
                            'user_id' => $user->id,
                            'preference_id' => $authorId,
                            'preference_type' => 'author',
                        ];
                    }
                }
                Log::info($userSettings);
                // Insert all user settings in one go
                UserSetting::insert($userSettings);

                DB::commit();
                return response()->json(['message' => 'User preferences saved successfully!'], 201);


        }catch (\Exception $e){
            DB::rollBack();
            Log::error($e->getMessage());
            return response()->json(['error' => 'Something went wrong']);
        }
    }
    public function getPreferences(Request $request){
        try{
            /* @var User $user */
            $user = $request->user();
            if (!$user) {
                return response()->json(['error' => 'User not authenticated'], 401);
            }

            $userPreferences = UserSetting::query()->where('user_id', '=', $user->id)->get();

            $categories = $userPreferences->filter(function ($preference) {
                return $preference->preference_type === 'category';
            });

            $categoryIds = $categories->pluck('preference_id');

            $sources = $userPreferences->filter(function ($preference) {
                return $preference->preference_type === 'source';
            });

            $sourceIds = $sources->pluck('preference_id');

            $authors = $userPreferences->filter(function ($preference) {
                return $preference->preference_type === 'author';
            });

            $authorIds = $authors->pluck('preference_id');
            $preferences['categories'] = Category::with(['articles' => function($query) {
                $query->latest()->limit(4);
            }])->whereIn('id', $categoryIds)->get();
            $preferences['authors'] = Author::with(['articles' => function($query) {
                $query->latest()->limit(4);
            }])->whereIn('id', $authorIds)->get();
            $preferences['sources'] = Category::with(['articles' => function($query) {
                $query->latest()->limit(4);
            }])->whereIn('id', $sourceIds)->get();

            return response()->json($preferences);
        }catch (\Exception $e){
            Log::error($e->getMessage());
            return response()->json(['error' => 'Something went wrong']);
        }
    }
}
