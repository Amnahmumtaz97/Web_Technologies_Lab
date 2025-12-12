/**
 * Run with: node seed.js
 * Ensure MONGO_URI is set in env or default will be used.
 */
const mongoose = require('mongoose');
const Product = require('./models/Product');
const connectDB = require('./config/db');

async function seed() {
  await connectDB();
  await Product.deleteMany({});
  const sample = [
    { name: 'Blue T‑shirt', price: 19.99, category: 'Clothing', image:'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80', description: 'Comfortable cotton tee.' },
    { name: 'Red Mug', price: 9.50, category: 'Kitchen', image:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', description: 'Ceramic mug.' },
    { name: 'Running Shoes', price: 69.99, category: 'Shoes', image:'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80', description: 'Lightweight running shoes.' },
    { name: 'Wireless Headphones', price: 129.00, category: 'Electronics', image:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80', description: 'Noise cancelling.' },
    { name: 'Notebook', price: 4.99, category: 'Stationery', image:'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80', description: 'Lined notebook.' },
    { name: 'Desk Lamp', price: 24.99, category: 'Home', image:'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', description: 'LED desk lamp.' },
    { name: 'Backpack', price: 39.99, category: 'Accessories', image:'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', description: 'Durable travel backpack.' },
    { name: 'Coffee Maker', price: 59.99, category: 'Kitchen', image:'https://images.unsplash.com/photo-1504674900247-ec6b0b1b798e?auto=format&fit=crop&w=400&q=80', description: 'Automatic coffee maker.' },
    { name: 'Yoga Mat', price: 15.99, category: 'Fitness', image:'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80', description: 'Non-slip yoga mat.' },
    { name: 'Sunglasses', price: 29.99, category: 'Accessories', image:'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', description: 'UV protection sunglasses.' },
    { name: 'Bluetooth Speaker', price: 49.99, category: 'Electronics', image:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80', description: 'Portable speaker.' },
    { name: 'Water Bottle', price: 12.99, category: 'Fitness', image:'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', description: 'Stainless steel bottle.' },
    { name: 'Gaming Mouse', price: 59.99, category: 'Electronics', image:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80', description: 'High precision mouse.' },
    { name: 'Cookbook', price: 18.99, category: 'Books', image:'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80', description: 'Healthy recipes.' },
    { name: 'Throw Pillow', price: 14.99, category: 'Home', image:'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', description: 'Decorative pillow.' },
    { name: 'Wireless Charger', price: 22.99, category: 'Electronics', image:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80', description: 'Fast charging pad.' },
    { name: 'Travel Mug', price: 11.99, category: 'Kitchen', image:'https://images.unsplash.com/photo-1504674900247-ec6b0b1b798e?auto=format&fit=crop&w=400&q=80', description: 'Insulated mug.' },
    { name: 'Desk Organizer', price: 16.99, category: 'Office', image:'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', description: 'Keep your desk tidy.' },
    { name: 'Fitness Tracker', price: 79.99, category: 'Fitness', image:'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80', description: 'Track your activity.' },
    { name: 'Wall Clock', price: 21.99, category: 'Home', image:'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', description: 'Modern wall clock.' }
  ];
  await Product.insertMany(sample);
  console.log('Seeded', sample.length, 'products');
  process.exit(0);
}

seed().catch(err=>{ console.error(err); process.exit(1) });
