# SquarePixel Setup Guide

## Phase 0 - COMPLETED ✓

### Prerequisites
- PHP 8.2+ ✓
- Composer ✓
- Node.js 18+ (22.20.0 installed) ✓
- MySQL 5.7+/8 (XAMPP) ✓

### What's Been Built

#### Backend (Laravel 10)
- ✓ Laravel 10 installed at `/backend`
- ✓ Health endpoint at `http://localhost:8000/api/health`
- ✓ Database configured for `square_data`
- ✓ Environment variables configured in `.env`
- ✓ Server running on port 8000

#### Frontend (React + Vite)
- ✓ React 18 with Vite installed at `/frontend`
- ✓ Tailwind CSS configured
- ✓ Redux Toolkit set up with cookie and content slices
- ✓ React Router configured
- ✓ Cookie Gate modal component created
- ✓ Health page at `http://localhost:5173/health`
- ✓ Server running on port 5173

#### Configuration
- ✓ `/config/dbmap.json` - Database column mapping
- ✓ Root `.env.example` - Environment template
- ✓ Backend `.env` configured
- ✓ Frontend `.env` configured

### Running the Application

**Start Backend:**
```bash
cd backend
php artisan serve --port=8000
```

**Start Frontend:**
```bash
cd frontend
npm run dev
```

**Access Points:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/api
- Health Check: http://localhost:5173/health

### Database Setup

1. Ensure MySQL is running (XAMPP)
2. Import the database:
```bash
mysql -u root -p square_data < overview/square_data.sql
```

3. Verify connection in `backend/.env`:
```
DB_DATABASE=square_data
DB_USERNAME=root
DB_PASSWORD=
```

## Phase 1 - IN PROGRESS

### Completed
- ✓ DbMapService created
- ✓ ContentService created with full CRUD operations
- Services support columns with spaces using quoted identifiers

### Next Steps
1. Create HeaderService
2. Create LinkService
3. Build API controllers
4. Create API resources/DTOs
5. Add OpenAPI documentation

## Environment Variables

### Backend (.env)
```
APP_NAME=SquarePixel
APP_URL=http://localhost:8000
DB_DATABASE=square_data
PUBLIC_BASE_URL=http://localhost:5173
MEMBER_BASE_URL=http://localhost:5173/member
ACTIVE_DOMAIN_COLUMN=squarepixel.com
COOKIE_PERMISSION_TTL_MIN=10
COOKIE_DECLINE_REDIRECT=https://example.com
GEO_ENABLED=false
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000/api
VITE_COOKIE_PERMISSION_TTL_MIN=10
VITE_COOKIE_DECLINE_REDIRECT=https://example.com
```

## Directory Structure

```
/
├── backend/                 # Laravel 10 API
│   ├── app/
│   │   └── Services/       # Business logic services
│   ├── routes/api.php      # API routes
│   └── .env                # Backend config
├── frontend/               # React + Vite
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── features/       # Redux slices
│   │   ├── pages/          # Page components
│   │   ├── store/          # Redux store
│   │   └── services/       # API services
│   └── .env                # Frontend config
├── config/
│   └── dbmap.json          # Database column mappings
├── docs/                   # Documentation
├── overview/               # Project specs & SQL
└── .env.example            # Root environment template
```

## Troubleshooting

### Backend Issues
- **Composer not found**: Ensure composer is in PATH or use `/c/composer/composer`
- **Database connection**: Verify XAMPP MySQL is running
- **Port 8000 in use**: Change port in `php artisan serve --port=XXXX`

### Frontend Issues
- **Module errors**: Run `npm install` in frontend directory
- **Tailwind not working**: Verify `tailwind.config.js` and `postcss.config.js` exist
- **API connection**: Check `VITE_API_URL` in frontend/.env

## Next Development Steps

See the active TODO list and continue with Phase 1:
1. Complete data layer services (Header, Link)
2. Build API controllers and resources
3. Test API endpoints
4. Move to Phase 2 (Cookie Gate backend)
