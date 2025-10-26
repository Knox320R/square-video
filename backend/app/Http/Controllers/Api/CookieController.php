<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CookieController extends Controller
{
    public function accept(Request $request): JsonResponse
    {
        $ttl = config('app.cookie_permission_ttl_min', 10);
        $expires = now()->addMinutes($ttl);

        return response()->json([
            'status' => 'accepted',
            'expires' => $expires->toIso8601String(),
        ])->cookie('squarepixel_consent', 'accepted', $ttl);
    }

    public function decline(Request $request): JsonResponse
    {
        return response()->json([
            'status' => 'declined',
            'redirect' => config('app.cookie_decline_redirect', 'https://example.com'),
        ]);
    }
}
