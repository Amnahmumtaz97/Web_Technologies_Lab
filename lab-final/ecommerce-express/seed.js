const mongoose = require("mongoose");
const Product = require("./models/Product");
const connectDB = require("./config/db");

async function seed() {
  await connectDB();
  await Product.deleteMany({});

  const sample = [
    {
      name: "Blue T-shirt",
      price: 19.99,
      category: "Clothing",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
      description: "Comfortable cotton tee.",
    },
    {
      name: "Red Mug",
      price: 9.5,
      category: "Kitchen",
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80",
      description: "Ceramic mug.",
    },
    {
      name: "Running Shoes",
      price: 69.99,
      category: "Shoes",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
      description: "Lightweight running shoes.",
    },
    {
      name: "Wireless Headphones",
      price: 129.0,
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1518441902110-1e7d5cbe8a95?w=400&q=80",
      description: "Noise cancelling.",
    },
    {
      name: "Notebook",
      price: 4.99,
      category: "Stationery",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&q=80",
      description: "Lined notebook.",
    },
    {
      name: "Desk Lamp",
      price: 24.99,
      category: "Home",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80",
      description: "LED desk lamp.",
    },
    {
      name: "Backpack",
      price: 39.99,
      category: "Accessories",
      image: "https://images.unsplash.com/photo-1509762774605-f07235a08f1f?w=400&q=80",
      description: "Durable travel backpack.",
    },
    {
      name: "Coffee Maker",
      price: 59.99,
      category: "Kitchen",
      image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&q=80",
      description: "Automatic coffee maker.",
    },
    {
      name: "Yoga Mat",
      price: 15.99,
      category: "Fitness",
      image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf0b1f?w=400&q=80",
      description: "Non-slip yoga mat.",
    },
    {
      name: "Sunglasses",
      price: 29.99,
      category: "Accessories",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80",
      description: "UV protection sunglasses.",
    },
    {
      name: "Bluetooth Speaker",
      price: 49.99,
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1585386959984-a41552231693?w=400&q=80",
      description: "Portable speaker.",
    },
    {
      name: "Water Bottle",
      price: 12.99,
      category: "Fitness",
      image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&q=80",
      description: "Stainless steel bottle.",
    },
    {
      name: "Gaming Mouse",
      price: 59.99,
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1615750185825-fc85c6aba0f8?w=400&q=80",
      description: "High precision mouse.",
    },
    {
      name: "Cookbook",
      price: 18.99,
      category: "Books",
      image: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=400&q=80",
      description: "Healthy recipes.",
    },
    {
      name: "Throw Pillow",
      price: 14.99,
      category: "Home",
      image: "https://images.unsplash.com/photo-1582582494700-6f8d6dc8e6c3?w=400&q=80",
      description: "Decorative pillow.",
    },
    {
      name: "Travel Mug",
      price: 11.99,
      category: "Kitchen",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80",
      description: "Insulated mug.",
    },
    {
      name: "Desk Organizer",
      price: 16.99,
      category: "Office",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80",
      description: "Keep your desk tidy.",
    },
    {
      name: "Fitness Tracker",
      price: 79.99,
      category: "Fitness",
      image: "https://images.unsplash.com/photo-1557935728-e6d1eaabe558?w=400&q=80",
      description: "Track your activity.",
    },
    {
      name: "Flowers",
      price: 21.99,
      category: "Home",
      image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400&q=80",
      description: "Fresh flowers for decor.",
    },
  ];

  await Product.insertMany(sample);
  console.log("Seeded", sample.length, "products");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
