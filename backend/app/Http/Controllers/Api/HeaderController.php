<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\HeaderService;
use Illuminate\Http\JsonResponse;

class HeaderController extends Controller
{
    private HeaderService $headerService;

    public function __construct(HeaderService $headerService)
    {
        $this->headerService = $headerService;
    }

    /**
     * Get all SEO headers
     */
    public function index(): JsonResponse
    {
        $headers = $this->headerService->getHeaders();

        return response()->json([
            'data' => $headers,
        ]);
    }
}
