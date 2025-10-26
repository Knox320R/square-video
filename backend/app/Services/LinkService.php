<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * LinkService
 *
 * Purpose: Read-only access to links table for menu navigation
 * Inputs: None (uses ACTIVE_DOMAIN_COLUMN from env)
 * Outputs: Array of link objects
 * Env Keys: ACTIVE_DOMAIN_COLUMN
 * How to change: Modify query logic here, update column mappings in /config/dbmap.json
 */
class LinkService
{
    /**
     * Get all active links for the configured domain
     *
     * @return array
     */
    public function getLinks(): array
    {
        $map = DbMapService::getMap('links');
        $activeDomainCol = config('app.active_domain_column', 'squarepixel.com');

        try {
            // Get the domain column mapping
            $domainDbCol = $map['squarepixelCom'] ?? 'squarepixel.com';

            // If the active domain is different, find its mapping
            if ($activeDomainCol !== 'squarepixel.com') {
                // Look for the column in the map
                foreach ($map as $key => $dbCol) {
                    if ($dbCol === $activeDomainCol) {
                        $domainDbCol = $dbCol;
                        break;
                    }
                }
            }

            $positionCol = $map['position'] ?? 'position';

            $results = DB::table('links')
                ->selectRaw($this->buildSelectRaw($map))
                ->whereRaw($this->quoteIdentifier($domainDbCol) . ' > ?', [0])
                ->orderByRaw($this->quoteIdentifier($positionCol) . ' DESC')
                ->get();

            return $results->map(function ($item) use ($map) {
                return $this->transformLinkItem($item, $map);
            })->toArray();

        } catch (\Exception $e) {
            Log::error('LinkService::getLinks error: ' . $e->getMessage());
            return [];
        }
    }

    /**
     * Get links grouped by position range (for different menu placements)
     *
     * @param int $minPosition Minimum position value
     * @param int $maxPosition Maximum position value
     * @return array
     */
    public function getLinksByPosition(int $minPosition, int $maxPosition): array
    {
        $allLinks = $this->getLinks();

        return array_filter($allLinks, function ($link) use ($minPosition, $maxPosition) {
            $position = $link['position'] ?? 0;
            return $position >= $minPosition && $position <= $maxPosition;
        });
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
    private function transformLinkItem(object $item, array $map): array
    {
        $data = [];
        foreach ($map as $key => $dbCol) {
            $data[$key] = $item->{$key} ?? null;
        }
        return $data;
    }
}
