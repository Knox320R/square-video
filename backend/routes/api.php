<?php

use App\Http\Controllers\Api\ContentController;
use App\Http\Controllers\Api\CookieController;
use App\Http\Controllers\Api\HeaderController;
use App\Http\Controllers\Api\LinkController;
use App\Http\Controllers\Api\TelemetryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Health check
Route::get('/health', function () {
    return response()->json([
        'status' => 'OK',
        'timestamp' => now()->toIso8601String(),
        'service' => 'SquarePixel API'
    ]);
});

// Cookie consent
Route::post('/cookie/accept', [CookieController::class, 'accept']);
Route::post('/cookie/decline', [CookieController::class, 'decline']);

// Public API routes
Route::get('/content', [ContentController::class, 'index']);
Route::get('/content/search', [ContentController::class, 'search']);
Route::get('/content/{id}', [ContentController::class, 'show']);
Route::get('/headers', [HeaderController::class, 'index']);
Route::get('/links', [LinkController::class, 'index']);
Route::post('/telemetry', [TelemetryController::class, 'store']);

// Protected routes
Route::post('/member/personalize-playback', [App\Http\Controllers\Api\MemberController::class, 'personalizePlayback']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
