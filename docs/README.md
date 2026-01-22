# SkyDocs

AI-powered documentation platform that converts screen recordings into polished videos and step-by-step articles.

## Quick Start

### Prerequisites
- Node.js 20+
- Python 3.11+ (for AI services)
- Docker (optional, for containerized setup)

### Start the API Server
```bash
cd server
npm install
npm run dev
```
Server runs at http://localhost:3000

### Start the Frontend
```bash
cd client
npm install
npm run dev
```
Frontend runs at http://localhost:5173

### Start AI Services (Optional)
```bash
# Audio Service
cd ai-audio-service
pip install -r requirements.txt
uvicorn app.main:app --port 8001

# Video Service
cd ai-video-service
pip install -r requirements.txt
uvicorn app.main:app --port 8002

# Text Service
cd ai-text-service
pip install -r requirements.txt
uvicorn app.main:app --port 8003
```

### Docker (All Services)
```bash
cd infra/docker
docker-compose up -d
```

## Project Structure
```
/Skydocs
├── /client          # React frontend
├── /server          # Node.js API (Express + Sequelize)
├── /ai-audio-service  # Python FastAPI (Whisper, audio)
├── /ai-video-service  # Python FastAPI (FFmpeg, video)
├── /ai-text-service   # Python FastAPI (LLM, text)
├── /packages          # Shared code
└── /infra             # Docker & deployment
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Projects
- `GET /api/projects` - List projects
- `POST /api/projects` - Create project
- `GET /api/projects/:id` - Get project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Videos
- `GET /api/videos/project/:projectId` - List videos
- `POST /api/videos/project/:projectId` - Upload video
- `GET /api/videos/:id` - Get video
- `DELETE /api/videos/:id` - Delete video

## Environment Variables

See `/server/.env` for API server configuration.

## License
MIT
