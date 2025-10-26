<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\LinkService;
use Illuminate\Http\JsonResponse;

class LinkController extends Controller
{
    private LinkService $linkService;

    public function __construct(LinkService $linkService)
    {
        $this->linkService = $linkService;
    }

    /**
     * Get all active links for configured domain
     */
    public function index(): JsonResponse
    {
        $links = $this->linkService->getLinks();

        return response()->json([
            'data' => $links,
        ]);
    }
}
