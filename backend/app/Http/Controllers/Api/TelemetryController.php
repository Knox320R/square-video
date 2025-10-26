<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class TelemetryController extends Controller
{
    /**
     * Store telemetry data
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->all();

        // Log telemetry data
        Log::info('Telemetry received', [
            'data' => $data,
            'ip' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'status' => 'received',
            'timestamp' => now()->toIso8601String(),
        ]);
    }
}
