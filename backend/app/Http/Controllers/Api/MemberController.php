<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class MemberController extends Controller
{
    public function personalizePlayback(Request $request): JsonResponse
    {
        $contentId = $request->input('content_id');
        $userId = $request->input('user_id', 'stub_user');

        return response()->json([
            'status' => 'success',
            'playback_url' => "/media/personalized_{$userId}_{$contentId}.mp4",
            'note' => 'Placeholder for external ffmpeg personalization hook'
        ]);
    }
}
