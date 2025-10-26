#!/bin/bash

echo "SquarePixel Setup Script"
echo "========================"

# Backend setup
echo "Setting up backend..."
cd backend
composer install
cp .env.example .env
php artisan key:generate
echo "Backend setup complete!"

# Frontend setup
echo "Setting up frontend..."
cd ../frontend
npm install
cp .env.example .env
echo "Frontend setup complete!"

# Database setup
echo ""
echo "Database setup:"
echo "1. Ensure MySQL is running"
echo "2. Import database: mysql -u root square_data < overview/square_data.sql"
echo ""
echo "To start servers:"
echo "  Backend:  cd backend && php artisan serve --port=8000"
echo "  Frontend: cd frontend && npm run dev"
