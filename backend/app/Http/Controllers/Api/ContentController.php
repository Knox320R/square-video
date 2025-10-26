<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContentResource;
use App\Services\ContentService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ContentController extends Controller
{
    private ContentService $contentService;

    public function __construct(ContentService $contentService)
    {
        $this->contentService = $contentService;
    }

    /**
     * Get paginated content list
     */
    public function index(Request $request): JsonResponse
    {
        $limit = (int) $request->query('limit', 50);
        $offset = (int) $request->query('offset', 0);
        $country = $request->query('country', null);

        $content = $this->contentService->getContent($limit, $offset, $country);

        return response()->json([
            'data' => ContentResource::collection(collect($content)),
            'meta' => [
                'limit' => $limit,
                'offset' => $offset,
                'count' => count($content),
            ],
        ]);
    }

    /**
     * Get a single content item
     */
    public function show(int $id): JsonResponse
    {
        $content = $this->contentService->getContentById($id);

        if (!$content) {
            return response()->json(['error' => 'Content not found'], 404);
        }

        $adjacent = $this->contentService->getAdjacentContent($id);

        return response()->json([
            'data' => new ContentResource($content),
            'adjacent' => [
                'prev' => $adjacent['prev'] ? new ContentResource($adjacent['prev']) : null,
                'next' => $adjacent['next'] ? new ContentResource($adjacent['next']) : null,
            ],
        ]);
    }

    /**
     * Search content
     */
    public function search(Request $request): JsonResponse
    {
        $query = $request->query('q', '');
        $limit = (int) $request->query('limit', 50);
        $offset = (int) $request->query('offset', 0);

        if (empty($query)) {
            return response()->json(['error' => 'Search query is required'], 400);
        }

        $results = $this->contentService->searchContent($query, $limit, $offset);

        return response()->json([
            'data' => ContentResource::collection(collect($results)),
            'meta' => [
                'query' => $query,
                'limit' => $limit,
                'offset' => $offset,
                'count' => count($results),
            ],
        ]);
    }
}
