# SquarePixel - Video Content Platform

A full-stack video content platform built with Laravel 10 (API) and React 18 (Frontend).

## Features

- ✅ Read-only database-driven content system
- ✅ Responsive grid with 4:3 forced aspect tiles
- ✅ Multi-aspect-ratio video player (16:9, 9:16, 4:3, 3:4, 3:2, 2:3, 1:1)
- ✅ Cookie consent gate for external referrers
- ✅ SEO meta tag injection
- ✅ Full-text search
- ✅ Keyboard navigation (←/→)
- ✅ Member area with auth stub
- ✅ External ffmpeg personalization hook endpoint
- ✅ Domain-filtered menus

## Tech Stack

**Backend:**
- Laravel 10 (API only, PSR-12)
- MySQL 5.7+/8
- PHP 8.2+

**Frontend:**
- React 18
- Vite
- Redux Toolkit
- TailwindCSS
- React Router

## Prerequisites

- PHP 8.2+
- Composer
- Node.js 18+
- MySQL 5.7+/8 (XAMPP or standalone)

## Quick Start

### 1. Install Dependencies

```bash
# Backend
cd backend
composer install
cp .env.example .env
php artisan key:generate

# Frontend
cd frontend
npm install
cp .env.example .env
```

### 2. Database Setup

```bash
# Import database
mysql -u root square_data < overview/square_data.sql
```

### 3. Configure Environment

Edit `backend/.env`:
```
DB_DATABASE=square_data
DB_USERNAME=root
DB_PASSWORD=
ACTIVE_DOMAIN_COLUMN=SP
```

### 4. Start Servers

```bash
# Terminal 1 - Backend
cd backend
php artisan serve --port=8000

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 5. Access Application

- Frontend: http://localhost:5173
- API: http://localhost:8000/api
- Health: http://localhost:5173/health

## Project Structure

```
/
├── backend/              # Laravel 10 API
│   ├── app/
│   │   ├── Services/     # Business logic
│   │   └── Http/
│   │       └── Controllers/Api/
│   └── routes/api.php
├── frontend/             # React + Vite
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── features/     # Redux slices
│   │   ├── pages/        # Route pages
│   │   └── store/        # Redux store
│   └── .env
├── config/
│   └── dbmap.json        # DB column mappings
└── docs/                 # Documentation
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/content` - Paginated content list
- `GET /api/content/{id}` - Single content with prev/next
- `GET /api/content/search?q=` - Search content
- `GET /api/headers` - SEO headers
- `GET /api/links` - Menu links
- `POST /api/telemetry` - Telemetry logging
- `POST /api/cookie/accept` - Accept cookies
- `POST /api/member/personalize-playback` - Playback hook

## Features

### Cookie Consent
External referrers trigger a cookie consent modal. Declining redirects to configured URL.

### SEO
Meta tags injected from database headers table with .txt fallback support.

### Search
Full-text search across content titles and descriptions with pagination.

### Member Area
Stub authentication system at `/login` (accepts any credentials).

### Video Player
Supports all aspect ratios with proper wrapper:
- 16:9, 9:16 (portrait)
- 4:3, 3:4 (portrait)
- 3:2, 2:3 (portrait)
- 1:1 (square)

### Navigation
- Keyboard: ←/→ for prev/next
- Click-through from grid
- Adjacent content navigation

## Development

### Running Tests

```bash
cd backend
php artisan test
```

### Code Style

```bash
cd backend
./vendor/bin/pint
```

## Configuration

Key environment variables in `backend/.env`:

- `ACTIVE_DOMAIN_COLUMN` - Domain column for filtering (SP)
- `COOKIE_PERMISSION_TTL_MIN` - Cookie TTL (10)
- `COOKIE_DECLINE_REDIRECT` - Redirect URL
- `GEO_ENABLED` - Enable geo-filtering (false)

## License

MIT

## Credits

Built with Laravel, React, and TailwindCSS.
