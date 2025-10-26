<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * HeaderService
 *
 * Purpose: Read-only access to headers table for SEO meta tags
 * Inputs: None (returns all headers)
 * Outputs: Array of header key-value pairs
 * Env Keys: None
 * How to change: Modify query logic here, update column mappings in /config/dbmap.json
 */
class HeaderService
{
    /**
     * Get all headers for SEO meta tags
     *
     * @return array Associative array [name => text]
     */
    public function getHeaders(): array
    {
        $map = DbMapService::getMap('headers');

        try {
            $sortCol = $map['sort'] ?? 'sort';

            $results = DB::table('headers')
                ->whereRaw($this->quoteIdentifier($sortCol) . ' = ?', ['header'])
                ->get();

            $headers = [];
            foreach ($results as $row) {
                $name = $row->{$map['name'] ?? 'name'} ?? null;
                $text = $row->{$map['text'] ?? 'text'} ?? null;

                if ($name) {
                    $headers[$name] = $text;
                }
            }

            if (empty($headers)) {
                Log::warning('No headers found in database');
                return $this->getDefaultHeaders();
            }

            return $headers;

        } catch (\Exception $e) {
            Log::error('HeaderService::getHeaders error: ' . $e->getMessage());
            return $this->getDefaultHeaders();
        }
    }

    /**
     * Get a specific header by name
     *
     * @param string $name Header name (title, description, keywords)
     * @return string|null
     */
    public function getHeader(string $name): ?string
    {
        $headers = $this->getHeaders();
        return $headers[$name] ?? null;
    }

    /**
     * Get default headers as fallback
     *
     * @return array
     */
    private function getDefaultHeaders(): array
    {
        return [
            'title' => config('app.name', 'SquarePixel'),
            'description' => config('app.name', 'SquarePixel'),
            'keywords' => config('app.name', 'SquarePixel'),
        ];
    }

    /**
     * Quote a column identifier to handle spaces and special characters
     *
     * @param string $identifier
     * @return string
     */
    private function quoteIdentifier(string $identifier): string
    {
        return '`' . str_replace('`', '``', $identifier) . '`';
    }
}
