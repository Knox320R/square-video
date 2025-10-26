# SquarePixel Project Progress

## ✅ COMPLETED

### Phase 0 - Local Setup (100%)
- ✅ Monorepo structure created
- ✅ Laravel 10 backend installed
- ✅ React 18 + Vite frontend installed
- ✅ Tailwind CSS configured (@tailwindcss/postcss)
- ✅ Redux Toolkit with cookie & content slices
- ✅ React Router configured
- ✅ Database imported (square_data with 25 content items)
- ✅ Both servers running (8000, 5173)

### Phase 1 - Data Layer (95%)
- ✅ DbMapService created - handles columns with spaces
- ✅ ContentService created - full CRUD with quoted identifiers
- ✅ HeaderService created - SEO meta tags
- ✅ LinkService created - menu navigation
- ✅ API Controllers created (Content, Header, Link, Telemetry)
- ✅ API Resources created
- ✅ API Routes configured
- ✅ CORS enabled
- ✅ Config values registered in app.php
- 🔄 **ISSUE TO FIX**: Double-quoting in SQL queries (```public``` instead of `public`)

## 🔄 IN PROGRESS

### Fix ContentService Query Issue
The SQL queries are using triple backticks due to double-quoting. Need to:
1. Remove quoteIdentifier() calls in where clauses when using Laravel query builder
2. OR use DB::raw() for the column names
3. Test all endpoints after fix

**Current Error:**
```sql
WHERE ```public``` = Y  -- Should be: WHERE `public` = Y
```

**Fix Location:** `backend/app/Services/ContentService.php` lines 40-41, 121-122, 129-130, 163-164

## 📋 REMAINING WORK

### Phase 1 - Complete API Testing (5%)
- [ ] Fix double-quoting issue in ContentService
- [ ] Test GET /api/content
- [ ] Test GET /api/content/{id}
- [ ] Test GET /api/content/search
- [ ] Test GET /api/headers
- [ ] Test GET /api/links
- [ ] Test POST /api/telemetry

### Phase 2 - Cookie Gate Backend (0%)
- [ ] Create CookieConsentMiddleware
- [ ] Add cookie setting endpoint
- [ ] Wire middleware to routes
- [ ] Test cookie flow

### Phase 3 - Public Index Page (0%)
- [ ] Create ContentGrid component
- [ ] Create ContentTile component (4:3 forced aspect)
- [ ] Create LeftMenu component
- [ ] Create BottomMenu component
- [ ] Wire Redux to fetch content
- [ ] Implement responsive breakpoints
- [ ] Route to /watch/:id

### Phase 4 - Viewing Page (0%)
- [ ] Create VideoPlayer component with aspect ratio wrapper
- [ ] Support all ratios: 16:9, 9:16, 4:3, 3:4, 3:2, 2:3, 1:1
- [ ] Create MetadataBox component
- [ ] Create Prev/Next navigation
- [ ] Create RightSidebar with content list
- [ ] Add keyboard navigation (←/→)

### Phase 5 - SEO + Search (0%)
- [ ] Create SEO component for meta injection
- [ ] Wire headers API to SEO component
- [ ] Create SearchBar component
- [ ] Wire search API
- [ ] Add pagination

### Phase 6 - Member Area (0%)
- [ ] Create auth stub (simple login)
- [ ] Mirror public pages under /member
- [ ] Create personalize-playback hook endpoint
- [ ] Protected routes

### Phase 7 - Tests + Docs (0%)
- [ ] Unit tests for services
- [ ] Unit tests for Redux slices
- [ ] E2E test: index → view
- [ ] Module documentation
- [ ] Daily report template

## 🚀 QUICK FIX TO GET API WORKING

Replace the where clauses in ContentService to avoid double-quoting:

```php
// Instead of:
->where($this->quoteIdentifier($map['public'] ?? 'public'), '=', 'Y')

// Use:
->whereRaw('`' . ($map['public'] ?? 'public') . '` = ?', ['Y'])
```

## 📁 KEY FILES

**Backend:**
- Services: `backend/app/Services/*Service.php`
- Controllers: `backend/app/Http/Controllers/Api/*Controller.php`
- Routes: `backend/routes/api.php`
- Config: `backend/config/app.php`, `backend/.env`

**Frontend:**
- Store: `frontend/src/store/index.js`
- Slices: `frontend/src/features/*/`
- Components: `frontend/src/components/`
- Pages: `frontend/src/pages/`

**Config:**
- DB Mapping: `config/dbmap.json`
- Root ENV: `.env.example`

## 🌐 SERVERS

- Backend API: http://localhost:8000/api
- Frontend App: http://localhost:5173
- Health: http://localhost:5173/health

## 📊 OVERALL PROGRESS: ~25%

Phase 0: ████████████████████ 100%
Phase 1: ███████████████████░  95%
Phase 2: ░░░░░░░░░░░░░░░░░░░░   0%
Phase 3: ░░░░░░░░░░░░░░░░░░░░   0%
Phase 4: ░░░░░░░░░░░░░░░░░░░░   0%
Phase 5: ░░░░░░░░░░░░░░░░░░░░   0%
Phase 6: ░░░░░░░░░░░░░░░░░░░░   0%
Phase 7: ░░░░░░░░░░░░░░░░░░░░   0%
