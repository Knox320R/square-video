# Phase 1: Data Layer & API - COMPLETE ✅

## Overview
Phase 1 implements a read-only data layer with RESTful API endpoints for content, headers, and links from the MySQL database.

## Architecture

### Services (`backend/app/Services/`)
Business logic layer that interfaces with the database using Laravel Query Builder with special handling for columns containing spaces.

#### DbMapService
**Purpose:** Centralized column mapping service
**Input:** Table name
**Output:** Column mapping array
**Env Keys:** None
**How to change:** Edit `/config/dbmap.json`

**Key Methods:**
- `getMap(string $table)` - Get all mappings for a table
- `getColumn(string $table, string $key)` - Get specific column mapping

#### ContentService
**Purpose:** Read-only content operations with geo-filtering support
**Input:** Pagination params (limit, offset), optional country code
**Output:** Content data arrays
**Env Keys:** `ACTIVE_DOMAIN_COLUMN`, `GEO_ENABLED`
**How to change:** Modify query logic, update `/config/dbmap.json`

**Key Methods:**
- `getContent(int $limit, int $offset, ?string $country)` - Paginated content list
- `getContentById(int $id)` - Single content item
- `getAdjacentContent(int $id)` - Previous/next navigation
- `searchContent(string $query, int $limit, int $offset)` - Search by title/description

**Special Handling:**
- Uses `whereRaw()` instead of `where()` to handle columns with spaces (e.g., "display order")
- Properly quotes identifiers with backticks
- Filters by `public='Y'` and active domain column

#### HeaderService
**Purpose:** SEO meta tag retrieval
**Input:** None
**Output:** Key-value array of headers
**Env Keys:** None
**How to change:** Modify default headers in `getDefaultHeaders()`

**Key Methods:**
- `getHeaders()` - All headers as associative array
- `getHeader(string $name)` - Single header value

#### LinkService
**Purpose:** Menu navigation links filtered by domain
**Input:** None (uses `ACTIVE_DOMAIN_COLUMN` from config)
**Output:** Array of link objects
**Env Keys:** `ACTIVE_DOMAIN_COLUMN`
**How to change:** Update domain column in `.env`

**Key Methods:**
- `getLinks()` - All active links for configured domain
- `getLinksByPosition(int $min, int $max)` - Links within position range

### Controllers (`backend/app/Http/Controllers/Api/`)

#### ContentController
- `index(Request)` - GET /api/content?limit=&offset=&country=
- `show(int $id)` - GET /api/content/{id} (includes prev/next)
- `search(Request)` - GET /api/content/search?q=&limit=&offset=

#### HeaderController
- `index()` - GET /api/headers

#### LinkController
- `index()` - GET /api/links

#### TelemetryController
- `store(Request)` - POST /api/telemetry

### Resources (`backend/app/Http/Resources/`)

#### ContentResource
Transforms service data to JSON API format. Handles both array and object responses.

## API Endpoints

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-10-25T17:45:49+00:00",
  "service": "SquarePixel API"
}
```

### GET /api/content
Get paginated content list.

**Query Parameters:**
- `limit` (int, default: 50, max: 100) - Number of items
- `offset` (int, default: 0) - Starting offset
- `country` (string, optional) - Country code for geo-filtering (requires `GEO_ENABLED=true`)

**Response:**
```json
{
  "data": [
    {
      "id": 131,
      "type": "video",
      "ratio": "16:9",
      "title": "Chickens 1",
      "description": "A bunch of chickens waking up and having breakfast",
      "filenameRoot": "chickens1",
      "parts": 5,
      "hasPreview": "Y",
      "uploadDate": "2016-01-01 00:00:00",
      "displayOrder": 19,
      "level": 2,
      "public": "Y",
      "sp": "Y"
    }
  ],
  "meta": {
    "limit": 50,
    "offset": 0,
    "count": 25
  }
}
```

### GET /api/content/{id}
Get single content item with adjacent items for navigation.

**Response:**
```json
{
  "data": { /* content item */ },
  "adjacent": {
    "prev": { /* previous item */ },
    "next": { /* next item */ }
  }
}
```

### GET /api/content/search
Search content by title and description.

**Query Parameters:**
- `q` (string, required) - Search query
- `limit` (int, default: 50, max: 100)
- `offset` (int, default: 0)

**Response:**
```json
{
  "data": [ /* matching items */ ],
  "meta": {
    "query": "cat",
    "limit": 50,
    "offset": 0,
    "count": 8
  }
}
```

### GET /api/headers
Get SEO meta tags.

**Response:**
```json
{
  "data": {
    "title": "SquarePixel",
    "description": "SquarePixel",
    "keywords": "SquarePixel"
  }
}
```

### GET /api/links
Get menu links for active domain.

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "position": 25,
      "text": "Rien Olten",
      "url": "http://www.rienolten.com",
      "squarepixelCom": 5,
      "rieCom": 0
    }
  ]
}
```

### POST /api/telemetry
Log telemetry data.

**Request Body:** Any JSON
**Response:**
```json
{
  "status": "received",
  "timestamp": "2025-10-25T17:45:49+00:00"
}
```

## Configuration

### Database Column Mapping (`/config/dbmap.json`)
Maps camelCase API keys to actual database columns, including those with spaces.

```json
{
  "content": {
    "displayOrder": "display order",
    "filenameRoot": "filename_root",
    ...
  }
}
```

### Environment Variables

**Required:**
- `DB_HOST` - MySQL host
- `DB_PORT` - MySQL port
- `DB_DATABASE` - Database name (square_data)
- `DB_USERNAME` - MySQL user
- `DB_PASSWORD` - MySQL password
- `ACTIVE_DOMAIN_COLUMN` - Column for domain filtering (SP for content, squarepixel.com for links)

**Optional:**
- `GEO_ENABLED` - Enable geo-filtering (default: false)

## Testing

**Test All Endpoints:**
```bash
# Health
curl http://localhost:8000/api/health

# Content list
curl "http://localhost:8000/api/content?limit=5"

# Single content
curl http://localhost:8000/api/content/131

# Search
curl "http://localhost:8000/api/content/search?q=cat&limit=10"

# Headers
curl http://localhost:8000/api/headers

# Links
curl http://localhost:8000/api/links

# Telemetry
curl -X POST http://localhost:8000/api/telemetry \
  -H "Content-Type: application/json" \
  -d '{"event":"test"}'
```

## Technical Notes

### Handling Columns with Spaces
The database contains columns like "display order" which require special handling:

1. **Use `whereRaw()` instead of `where()`:**
   ```php
   // ❌ Wrong - causes double-quoting
   ->where($this->quoteIdentifier('display order'), '=', 10)

   // ✅ Correct
   ->whereRaw($this->quoteIdentifier('display order') . ' = ?', [10])
   ```

2. **The `quoteIdentifier()` method:**
   ```php
   private function quoteIdentifier(string $identifier): string
   {
       return '`' . str_replace('`', '``', $identifier) . '`';
   }
   ```

### CORS
CORS is enabled for all origins in development. Update `backend/config/cors.php` for production.

### Performance
- Max limit enforced: 100 items per request
- Database indexes on: id, public, display order, SP
- No N+1 queries - all data fetched in single queries

## Acceptance Criteria ✅

- [x] DbMapService reads `/config/dbmap.json` correctly
- [x] ContentService returns data with proper column mapping
- [x] Columns with spaces ("display order") handled correctly
- [x] GET /api/content returns paginated content
- [x] GET /api/content/{id} returns single item with prev/next
- [x] GET /api/content/search returns filtered results
- [x] GET /api/headers returns SEO meta tags
- [x] GET /api/links returns filtered links by domain
- [x] POST /api/telemetry logs data
- [x] All responses match database data exactly
- [x] CORS enabled for frontend access
- [x] No SQL errors in logs
- [x] Proper PSR-12 code formatting

## Next Steps

Phase 1 complete! Ready for:
- **Phase 2:** Cookie gate backend middleware
- **Phase 3:** Public index UI implementation
