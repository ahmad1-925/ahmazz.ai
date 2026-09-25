# AHMAZZ AI — One AI. Every Task.

An all-in-one AI assistant platform: chat, voice, image generation and editing, video studio, website builder, coding studio, document AI, research with citations, translation, writing, study help, presentations and a multi-step agent. The user just says what they want, and a router picks the right workflow.

Built with **Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS**. The server layer is provider-agnostic, so you can plug in AI vendors without touching the UI.

---

## Quick start

```bash
npm install
cp .env.example .env.local     # optional: add API keys
npm run dev                    # http://localhost:3000
```

With **no keys**, the app runs in **Demo mode**. Every screen works, and all sample output is labelled **Demo**. Some parts do real work even without keys:

| Works for real without keys | How |
|---|---|
| Voice input and spoken replies | Browser Web Speech API |
| Research with real citations | Wikipedia search API |
| Document reading and Q&A retrieval | PDF/DOCX/PPTX/XLSX extraction + BM25 passage search |
| Extractive summaries and keywords | Local algorithms (marked "not AI-written") |
| Website builder with chat edits | Template engine (colours, gallery, dark mode, sections…) |
| Photo adjustments, crop, resize, background removal (plain backgrounds) | Canvas image processing (marked "Demo approximation") |
| Running JavaScript / Python / HTML | Sandboxed iframe / Pyodide |
| PowerPoint export | pptxgenjs |
| Translation fallback | MyMemory free public API (quality varies) |

## Turning on real AI

Add any of these to `.env.local` and restart. Keys are **server-only** and never reach the browser.

| Variable | Enables |
|---|---|
| `OPENAI_API_KEY` | Text, vision, images (generate and edit), text-to-speech, speech-to-text |
| `OPENAI_BASE_URL` | Any OpenAI-compatible API (OpenRouter, Groq, Together, local Ollama) |
| `ANTHROPIC_API_KEY` | Claude for text, code and vision |
| `GEMINI_API_KEY` | Gemini for text, code and vision |
| `TAVILY_API_KEY` | Full web search for Research and Agent |
| `REMOVE_BG_API_KEY` | Professional background removal |
| `VIDEO_PROVIDER`, `VIDEO_API_URL`, `VIDEO_API_KEY` | Real video rendering (see `lib/ai/providers/video-http.ts`) |

`TEXT_PROVIDER=openai|anthropic|gemini` sets the default model. Users can also choose a model in **Settings → AI models & API**.

## Scripts

`npm run dev` · `npm run build` · `npm start` · `npm run typecheck` · `npm run db:push` (Prisma, when you enable the database)

## Project map

```
app/
  (marketing)/      Landing, pricing, about/transparency, privacy, terms, security, help, contact
  (auth)/           Login, signup, forgot/reset password
  (workspace)/      Dashboard, chat, voice, create, images, image-editor, videos, websites,
                    code, documents, research, translate, write, study, presentations,
                    agent, projects, history, settings
  api/              chat · text · images · images/edit · research · documents/extract ·
                    website · video · presentation · translate · tts · stt · health · report
lib/
  shared/           capabilities, intent router, retrieval, plans (shared by client and server)
  ai/               provider registry, providers/*, prompts, demo engine, research, documents
  client/           local store, API client, speech helpers
components/         shell (sidebar, topbar, search), chat, orb, logo, UI kit
prisma/schema.prisma  PostgreSQL schema (users, projects, chats, messages, generations, memory, usage, teams, Auth.js)
docs/ARCHITECTURE.md  How it all fits together + production checklist
```

See **docs/ARCHITECTURE.md** for the routing model, how to add a provider or tool, and the steps to take this to production (database, Auth.js, storage, billing).

> AHMAZZ AI can make mistakes. Please verify important information.
