# easyinventory
This is full stack web application for product management which is simple, intuitive and user-friendly.

# Tech stacks
1. API: NestJS (TypeScript)
2. Frontend: React with TypeScript + Vite
3. Database: PostgreSQL 15
4. ORM: MikroORM

# Api Setup

1. **Environment variables**
   ```bash
   DB_HOST=localhost
   DB_PORT=5433
   DB_USERNAME=postgres
   DB_PASSWORD=P@ssw0rd
   DB_NAME=easyinvetory
   JWT_SECRET=f8e9a4b7c2d1e5f6g3h8i9j0k1l2m3n4o5p6q7r8s9t0
   ```
2. **Installing dependencies**
   ```bash
   cd api
   npm install
   ```
3. **Start the Api Development Server**
   ```bash
   npm run start:dev
   ```
The API will be available at `http://localhost:3000`

# Storefront Setup

1. **Installing dependencies**
   ```bash
   cd storefront
   npm install
   ```
2. **Start the Storefront Development Server**
   ```bash
   npm run dev
   ```
The API will be available at `http://localhost:5173`

# Database Setup

This directory contains the database schema and setup files for Easy Inventory App. The database will be available at `http://localhost:5433`.

## Quick Setup

1. **Create Database:**
   ```bash
   createdb -h localhost -p 5433 -U root easyinvetory
   ```

2. **Run the schema:**
   ```bash
   psql -h localhost -p 5433 -U root -d easyinvetory -f easyinvetory.sql
   ```

