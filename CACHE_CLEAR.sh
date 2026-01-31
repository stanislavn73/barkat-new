#!/bin/bash
# Script to clear all build caches and reinstall

echo "🧹 Clearing Next.js cache..."
rm -rf .next

echo "🧹 Clearing node_modules..."
rm -rf node_modules

echo "🧹 Clearing lock files..."
rm -f package-lock.json pnpm-lock.yaml yarn.lock

echo "📦 Reinstalling dependencies..."
npm install

echo "✅ Cache cleared! Now run: npm run build"
