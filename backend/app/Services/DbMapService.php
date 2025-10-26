<?php

namespace App\Services;

use Illuminate\Support\Facades\File;

/**
 * DbMapService
 *
 * Purpose: Provides database column mapping from dbmap.json to handle columns with spaces or special characters
 * Inputs: Table name
 * Outputs: Column mappings
 * Env Keys: None
 * How to change: Edit /config/dbmap.json to add/modify column mappings
 */
class DbMapService
{
    private static ?array $map = null;

    /**
     * Load and cache the dbmap.json file
     */
    private static function loadMap(): array
    {
        if (self::$map === null) {
            $path = base_path('../config/dbmap.json');

            if (!File::exists($path)) {
                \Log::warning('dbmap.json not found at: ' . $path);
                return [];
            }

            $content = File::get($path);
            self::$map = json_decode($content, true) ?? [];
        }

        return self::$map;
    }

    /**
     * Get column mapping for a specific table
     *
     * @param string $table The table name (e.g., 'content', 'headers', 'links')
     * @return array The column mappings
     */
    public static function getMap(string $table): array
    {
        $map = self::loadMap();
        return $map[$table] ?? [];
    }

    /**
     * Get the actual database column name from the camelCase key
     *
     * @param string $table The table name
     * @param string $key The camelCase key
     * @return string The actual database column name
     */
    public static function getColumn(string $table, string $key): string
    {
        $map = self::getMap($table);
        return $map[$key] ?? $key;
    }

    /**
     * Get all actual column names for a table
     *
     * @param string $table The table name
     * @return array Array of actual database column names
     */
    public static function getColumns(string $table): array
    {
        return array_values(self::getMap($table));
    }
}
