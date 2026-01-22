Product Requirements Document (PRD): SkyDocsProject NameSkyDocs (Clueso Competitor)Version1.0 (Genesis)StatusApproved for DevelopmentTech StackReact (JS), Node.js (API), Python (AI/Video), PostgreSQLObjectiveBuild an AI-powered documentation engine that converts screen recordings into polished videos and step-by-step articles, eventually surpassing Clueso capabilities.1. Executive SummarySkyDocs is an automated documentation platform. It solves the pain of manual editing by using a hybrid backend. Users upload raw screen recordings; our system automatically cleans the audio, adds AI voiceovers, zooms in on mouse clicks, and generates a written article with perfectly synced screenshots.The "Antigravity" Philosophy: We build the Hard Core (Python Video Engine) and the Soft Shell (Node.js/React Dashboard) simultaneously but decoupled, allowing for rapid iteration ("vibe coding") without breaking the production pipeline.2. System Architecture (The Hybrid Model)We will adhere strictly to the "Heavy Core, Light Service" model.A. The Service Layer (Node.js + Express)Role: The Traffic Controller.Responsibilities:Handling User Auth (JWT/OAuth).Project Management (CRUD for folders, videos).Real-time Websockets (notifying frontend when AI processing is done).API Gateway for the Chrome Extension.Database: PostgreSQL (via Prisma or Sequelize).B. The Compute Layer (Python + FastAPI)Role: The Factory.Responsibilities:Worker 1 (Ears): OpenAI Whisper for Speech-to-Text.Worker 2 (Brain): LLM (GPT-4o/Claude) for script rewriting and cleanup.Worker 3 (Eyes): OpenCV for detecting mouse clicks and extracting screenshots.Worker 4 (Voice): TTS (ElevenLabs/Kokoro) for generating professional audio.Worker 5 (Render): FFmpeg for stitching the final MP4 with zooms and pans.3. Development Phases (The Roadmap)We will build this in 4 distinct "Sprints" to ensure we have a working product at every stage.🚩 Phase 1: The "Skeleton" (Weeks 1-2)Goal: A user can upload a video, and it plays back. No AI yet.Frontend:Clueso-style Dashboard (Sidebar, Video Grid).File Upload UI (Drag & Drop) with progress bars.Basic Video Player.Node.js Backend:User Auth (Login/Signup).S3 Presigned URLs (secure upload to storage).PostgreSQL Schema setup (Users, Projects, Videos).Deliverable: A functional "Google Drive" for videos.🚩 Phase 2: The "Brain" (Weeks 3-4)Goal: Transform the video into text (Docs).Python Integration:Set up Redis Message Queue between Node and Python.Job: EXTRACT_TRANSCRIPT.Implement Whisper (STT) to generate subtitles.Implement basic OpenCV logic to detect "Scenes" and take a screenshot every time the screen changes significantly.Frontend:Split-screen view: Video on left, Auto-generated Article on right.Deliverable: A Loom clone that also writes a rough blog post for you.🚩 Phase 3: The "Polish" (Weeks 5-6) – Clueso ParityGoal: AI Editing and Voiceovers.Python Core:Job: GENERATE_VOICEOVER. Replace user audio with AI voice.Job: SMART_ZOOM. Use FFmpeg to crop the video around the mouse cursor automatically.Frontend:Script Editor: User edits the text, and the AI voice updates automatically.Deliverable: A production-ready Clueso alternative.🚩 Phase 4: The "Antigravity" (Week 7+) – Surpassing CluesoGoal: Features Clueso doesn't have (Self-Healing).Advanced Tech:DOM Recording: Chrome extension captures HTML elements, not just video pixels.Self-Healing Docs: If the recorded button color changes in the live app, our system detects it via the extension and flags the doc as "Outdated."Multi-language: One-click translate video and text into Spanish/French.4. Detailed Functional Requirements🎨 Frontend (Client)Framework: React + Vite (Javascript).Styling: Tailwind CSS (configured with Clueso color palette).State Management: React Query (for fetching video lists) + Zustand (for the video editor state).Key Components:DashboardLayout: Sidebar + Header.UploadZone: Handles large file chunks.EditorWorkspace: Complex component with a video player on one side and a rich-text editor (ProseMirror/Tiptap) on the other.🔌 Backend (Node.js Service)Framework: Express.js.Endpoints:POST /upload/init: Request S3 upload permission.POST /project/:id/process: Trigger the Python AI worker.GET /project/:id/status: Poll for completion (or use WebSockets).Queue System: BullMQ (Redis based) to push jobs to Python.🐍 AI Workers (Python Core)Framework: FastAPI (to expose worker endpoints if needed, or just pure Celery consumers).Libraries:ffmpeg-python: For video manipulation.whisper: For transcription.langchain: For cleaning up the messy transcript into a clean "How-to" guide.opencv-python: For detecting UI elements to frame screenshots correctly.5. Success Metrics (KPIs)Processing Speed: A 5-minute video should be fully processed (transcribed + screenshots) in under 3 minutes.Accuracy: The AI-generated article should require less than 2 manual edits from the user.Stability: The Python worker must not crash even if 10 users upload simultaneously (Handled via Queue).6. Next Immediate Step for AntigravityAction: Initialize the Phase 1 Infrastructure.Verify server (Node) connects to MongoDB/Postgres.Verify client (React) can ping the server.Set up the Shared Types/Contracts (even though we are using JS, we need to agree on the JSON structure of a "Project").

# Product Requirements Document (PRD): SkyDocs
**Version:** 1.1 (The "Descript-Killer" Update)
**Status:** Approved for Development
**Author:** Team Antigravity

---

## 1. Executive Summary
**SkyDocs** is an AI-first media platform that unifies video creation and documentation. It solves the fragmentation between screen recording tools (Loom), video editors (Premiere), and documentation builders (Notion).
**Core Value Prop:** "Edit video like a doc, generate docs from video."

## 2. Product Vision
* **For Creators:** A video editor where you delete text to cut the video (Descript style).
* **For Teams:** A documentation engine that turns those videos into step-by-step articles (Clueso style).
* **For Developers:** A "Self-Healing" documentation system that detects when UI changes make videos obsolete.

## 3. Key User Flows
1.  **The "Descript" Flow:** User records screen -> AI Transcribes -> User deletes "umms" from text -> Video automatically cuts those sections.
2.  **The "Clueso" Flow:** User finalizes video -> AI detects clicks -> Generates an HTML article with screenshots -> Exports to Notion/Zendesk.
3.  **The "Overdub" Flow:** User types new text into the transcript -> AI generates voiceover in the user's voice to fill the gap.

## 4. Functional Requirements (MVP)

### 4.1 Frontend (The Editor)
* **Transcript-First Interface:** The video player is secondary to the text editor.
* **Timeline Visualization:** A visual timeline that syncs strictly to the text word timestamps.
* **Real-Time Collaboration:** Multi-cursor editing (WebSocket) allows teams to edit scripts together.

### 4.2 AI Audio Engine
* **Transcription:** Word-level timestamps using OpenAI Whisper.
* **Studio Sound:** Noise cancellation and echo removal using spectral gating.
* **Speaker Diarization:** Auto-tagging "Speaker A" and "Speaker B."

### 4.3 AI Video Engine
* **Smart Zoom:** Auto-zoom into mouse clicks without manual keyframing.
* **Background Removal:** Green screen effect without a green screen.
* **DOM Recording:** (Advanced) Capturing HTML events alongside video pixels for future "self-healing" docs.

### 4.4 Documentation Engine
* **Screenshot Extraction:** Intelligent extraction of frames where significant UI changes occur.
* **Article Generation:** LLM (GPT-4o) summarizes the transcript into instructional text (e.g., "Step 1: Click on Settings").

## 5. Non-Functional Requirements
* **Latency:** Text edits must update the video preview in < 200ms.
* **Scalability:** Support for 1 hour+ long video rendering.
* **Security:** SOC2-ready architecture (Encrypted S3 buckets, Signed URLs).

## 6. Phasing
* **Phase 1 (The Shell):** Auth, Upload, Basic Video Player, Dashboard UI.
* **Phase 2 (The Brain):** Transcription pipeline, Text-to-Video sync, Article generation.
* **Phase 3 (The Polish):** Studio Sound, Overdub, Magic Zoom.