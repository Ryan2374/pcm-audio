#!/bin/bash

echo "Starting PCM Audio Streaming Solution..."

# Start Backend
echo "Starting backend server..."
cd backend
npm install
node server.js &

# Start Web App
echo "Starting web application..."
cd ../web
npm install
npm start &

echo "To start the mobile app, run it via the emulator or physical device."
