#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting Revision App - Spaced Repetition Learning${NC}"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed. Please install npm first.${NC}"
    exit 1
fi

# Function to check if dependencies are installed
check_dependencies() {
    local dir=$1
    local name=$2
    
    if [ ! -d "$dir/node_modules" ]; then
        echo -e "${YELLOW}⚠️ Dependencies not found for $name. Installing...${NC}"
        cd "$dir"
        npm install
        if [ $? -ne 0 ]; then
            echo -e "${RED}❌ Failed to install dependencies for $name${NC}"
            exit 1
        fi
        cd ..
        echo -e "${GREEN}✅ Dependencies installed for $name${NC}"
    else
        echo -e "${GREEN}✅ Dependencies already installed for $name${NC}"
    fi
}

# Check and install dependencies
echo -e "${BLUE}📦 Checking dependencies...${NC}"
check_dependencies "server" "Backend"
check_dependencies "client" "Frontend"

# Function to kill processes on ports (cleanup)
cleanup() {
    echo -e "\n${YELLOW}🛑 Shutting down servers...${NC}"
    
    # Kill processes on port 5000 (backend)
    lsof -ti:5000 | xargs kill -9 2>/dev/null
    
    # Kill processes on port 5173 (frontend)
    lsof -ti:5173 | xargs kill -9 2>/dev/null
    
    echo -e "${GREEN}✅ Servers stopped${NC}"
    exit 0
}

# Set up signal handlers for cleanup
trap cleanup SIGINT SIGTERM

# Check if .env file exists and has the MongoDB password
if [ ! -f ".env" ]; then
    echo -e "${RED}❌ .env file not found. Creating template...${NC}"
    echo "MONGODB_URI=mongodb+srv://loiceuloge:<db_password>@myprojects.1aliwui.mongodb.net/revision-app?retryWrites=true&w=majority&appName=MyProjects" > .env
    echo "PORT=5000" >> .env
    echo -e "${YELLOW}⚠️ Please update the .env file with your MongoDB password${NC}"
    exit 1
fi

# Check if MongoDB password is set
if grep -q "<db_password>" .env; then
    echo -e "${RED}❌ Please replace <db_password> in .env file with your actual MongoDB password${NC}"
    exit 1
fi

echo -e "${BLUE}🔧 Starting services...${NC}"

# Start backend server
echo -e "${YELLOW}🔙 Starting backend server on port 5000...${NC}"
cd server
npm run dev &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Check if backend started successfully
if ! lsof -i:5000 &> /dev/null; then
    echo -e "${RED}❌ Backend failed to start on port 5000${NC}"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

echo -e "${GREEN}✅ Backend server started successfully${NC}"

# Start frontend server
echo -e "${YELLOW}🎨 Starting frontend server on port 5173...${NC}"
cd client
npm run dev &
FRONTEND_PID=$!
cd ..

# Wait a moment for frontend to start
sleep 3

# Check if frontend started successfully
if ! lsof -i:5173 &> /dev/null; then
    echo -e "${RED}❌ Frontend failed to start on port 5173${NC}"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 1
fi

echo -e "${GREEN}✅ Frontend server started successfully${NC}"

echo ""
echo "=================================================="
echo -e "${GREEN}🎉 Application is now running!${NC}"
echo ""
echo -e "${BLUE}📱 Frontend:${NC} http://localhost:5173"
echo -e "${BLUE}🔧 Backend API:${NC} http://localhost:5000"
echo -e "${BLUE}🏥 Health Check:${NC} http://localhost:5000/api/health"
echo ""
echo -e "${YELLOW}💡 Tips:${NC}"
echo "   • Add learning items in the 'Items du Jour' tab"
echo "   • Review items in the 'Révisions du Jour' tab"
echo "   • Check your progress in the 'Statistiques' tab"
echo ""
echo -e "${RED}⚠️ Press Ctrl+C to stop both servers${NC}"
echo "=================================================="

# Wait for user interrupt
wait