<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CookieConsentMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if request is from external referrer
        $referer = $request->header('referer');
        $isExternal = $referer && !str_contains($referer, $request->getHost());

        // If external and no consent cookie, signal frontend
        if ($isExternal && !$request->cookie('squarepixel_consent')) {
            $response = $next($request);
            $response->header('X-Cookie-Consent-Required', 'true');
            return $response;
        }

        return $next($request);
    }
}
