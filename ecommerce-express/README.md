# E-commerce Express Scaffold

## Setup
1. Copy `.env.example` to `.env` and edit `MONGO_URI` if needed.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Seed sample data:
   ```bash
   npm run seed
   ```
4. Start server:
   ```bash
   npm start
   ```
5. Open http://localhost:3000/products and http://localhost:3000/admin/products

## Features implemented
- Express with EJS templating
- Mongoose connection and Product model
- Product listing with pagination and filters (category, price range, search)
- Admin panel with separate layout and full CRUD for products
