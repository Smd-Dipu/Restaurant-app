@echo off
echo Starting backend JSON server...
start cmd /k "npm run server"

echo Starting frontend Vite server...
start cmd /k "npm run dev"

echo Both servers are starting. The frontend should open in your browser shortly based on Vite configuration, or you can go to http://localhost:5173
