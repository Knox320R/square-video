<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * ContentService
 *
 * Purpose: Read-only access to content table with support for special column names
 * Inputs: Query parameters (limit, offset, country filters)
 * Outputs: Content data arrays/objects
 * Env Keys: ACTIVE_DOMAIN_COLUMN, GEO_ENABLED
 * How to change: Modify query logic here, update column mappings in /config/dbmap.json
 */
class ContentService
{
    private const MAX_LIMIT = 100;
    private const DEFAULT_LIMIT = 50;

    /**
     * Get paginated content list with optional country filtering
     *
     * @param int $limit Number of items to return
     * @param int $offset Starting offset
     * @param string|null $country Country code for geo-filtering
     * @return array
     */
    public function getContent(int $limit = self::DEFAULT_LIMIT, int $offset = 0, ?string $country = null): array
    {
        $limit = min($limit, self::MAX_LIMIT);
        $map = DbMapService::getMap('content');

        $activeDomainCol = config('app.active_domain_column', 'squarepixel.com');

        try {
            $publicCol = $map['public'] ?? 'public';
            $displayOrderCol = $map['displayOrder'] ?? 'display order';

            $query = DB::table('content')
                ->selectRaw($this->buildSelectRaw($map))
                ->whereRaw($this->quoteIdentifier($publicCol) . ' = ?', ['Y'])
                ->whereRaw($this->quoteIdentifier($activeDomainCol) . ' = ?', ['Y'])
                ->orderByRaw($this->quoteIdentifier($displayOrderCol) . ' DESC')
                ->offset($offset)
                ->limit($limit);

            // Apply geo-filtering if enabled and country provided
            if (config('app.geo_enabled', false) && $country) {
                $countryCol = $map[strtolower($country)] ?? strtoupper($country);
                $query->where(function ($q) use ($countryCol) {
                    $q->whereRaw($this->quoteIdentifier($countryCol) . ' IS NULL')
                      ->orWhereRaw($this->quoteIdentifier($countryCol) . ' != ?', ['N']);
                });
            }

            $results = $query->get();

            return $results->map(function ($item) use ($map) {
                return $this->transformContentItem($item, $map);
            })->toArray();

        } catch (\Exception $e) {
            Log::error('ContentService::getContent error: ' . $e->getMessage());
            return [];
        }
    }

    /**
     * Get a single content item by ID
     *
     * @param int $id Content ID
     * @return array|null
     */
    public function getContentById(int $id): ?array
    {
        $map = DbMapService::getMap('content');

        try {
            $result = DB::table('content')
                ->selectRaw($this->buildSelectRaw($map))
                ->where($map['id'] ?? 'id', '=', $id)
                ->first();

            if (!$result) {
                Log::warning("Content not found: ID {$id}");
                return null;
            }

            return $this->transformContentItem($result, $map);

        } catch (\Exception $e) {
            Log::error('ContentService::getContentById error: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Get previous and next content items based on display order
     *
     * @param int $currentId Current content ID
     * @return array ['prev' => array|null, 'next' => array|null]
     */
    public function getAdjacentContent(int $currentId): array
    {
        $map = DbMapService::getMap('content');
        $activeDomainCol = config('app.active_domain_column', 'squarepixel.com');

        try {
            $current = DB::table('content')
                ->where($map['id'] ?? 'id', '=', $currentId)
                ->first();

            if (!$current) {
                return ['prev' => null, 'next' => null];
            }

            $displayOrderCol = $map['displayOrder'] ?? 'display order';
            $currentOrder = $current->{$displayOrderCol} ?? 0;

            $publicCol = $map['public'] ?? 'public';

            $prev = DB::table('content')
                ->selectRaw($this->buildSelectRaw($map))
                ->whereRaw($this->quoteIdentifier($publicCol) . ' = ?', ['Y'])
                ->whereRaw($this->quoteIdentifier($activeDomainCol) . ' = ?', ['Y'])
                ->whereRaw($this->quoteIdentifier($displayOrderCol) . ' < ?', [$currentOrder])
                ->orderByRaw($this->quoteIdentifier($displayOrderCol) . ' DESC')
                ->first();

            $next = DB::table('content')
                ->selectRaw($this->buildSelectRaw($map))
                ->whereRaw($this->quoteIdentifier($publicCol) . ' = ?', ['Y'])
                ->whereRaw($this->quoteIdentifier($activeDomainCol) . ' = ?', ['Y'])
                ->whereRaw($this->quoteIdentifier($displayOrderCol) . ' > ?', [$currentOrder])
                ->orderByRaw($this->quoteIdentifier($displayOrderCol) . ' ASC')
                ->first();

            return [
                'prev' => $prev ? $this->transformContentItem($prev, $map) : null,
                'next' => $next ? $this->transformContentItem($next, $map) : null,
            ];

        } catch (\Exception $e) {
            Log::error('ContentService::getAdjacentContent error: ' . $e->getMessage());
            return ['prev' => null, 'next' => null];
        }
    }

    /**
     * Search content by title and description
     *
     * @param string $query Search query
     * @param int $limit Results limit
     * @param int $offset Results offset
     * @return array
     */
    public function searchContent(string $query, int $limit = self::DEFAULT_LIMIT, int $offset = 0): array
    {
        $limit = min($limit, self::MAX_LIMIT);
        $map = DbMapService::getMap('content');
        $activeDomainCol = config('app.active_domain_column', 'squarepixel.com');

        try {
            $publicCol = $map['public'] ?? 'public';
            $titleCol = $map['title'] ?? 'title';
            $descCol = $map['description'] ?? 'description';
            $displayOrderCol = $map['displayOrder'] ?? 'display order';

            $results = DB::table('content')
                ->selectRaw($this->buildSelectRaw($map))
                ->whereRaw($this->quoteIdentifier($publicCol) . ' = ?', ['Y'])
                ->whereRaw($this->quoteIdentifier($activeDomainCol) . ' = ?', ['Y'])
                ->where(function ($q) use ($titleCol, $descCol, $query) {
                    $q->whereRaw($this->quoteIdentifier($titleCol) . ' LIKE ?', ["%{$query}%"])
                      ->orWhereRaw($this->quoteIdentifier($descCol) . ' LIKE ?', ["%{$query}%"]);
                })
                ->orderByRaw($this->quoteIdentifier($displayOrderCol) . ' DESC')
                ->offset($offset)
                ->limit($limit)
                ->get();

            return $results->map(function ($item) use ($map) {
                return $this->transformContentItem($item, $map);
            })->toArray();

        } catch (\Exception $e) {
            Log::error('ContentService::searchContent error: ' . $e->getMessage());
            return [];
        }
    }

    /**
     * Build SELECT clause with quoted identifiers for all columns
     *
     * @param array $map Column mappings
     * @return string
     */
    private function buildSelectRaw(array $map): string
    {
        $selects = [];
        foreach ($map as $key => $dbCol) {
            $quoted = $this->quoteIdentifier($dbCol);
            $selects[] = "{$quoted} as `{$key}`";
        }
        return implode(', ', $selects);
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

    /**
     * Transform database result to API-friendly format
     *
     * @param object $item Database result object
     * @param array $map Column mappings
     * @return array
     */
    private function transformContentItem(object $item, array $map): array
    {
        $data = [];
        foreach ($map as $key => $dbCol) {
            $data[$key] = $item->{$key} ?? null;
        }
        return $data;
    }
}
