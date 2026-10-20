# Portfolio AI Agent Pipeline Flow

The portfolio data is automatically documented and updated through the **TAWAN Ikigai Guild**, specifically focusing on the collaboration between the Project Historian, UX/UI Lead, and Builder agents.

## The Pipeline

1. **Daily Execution & Project Completion**
   - Tawan completes a task, builds a prototype, or learns a new skill.
   - Raw output is stored in `05_PROJECTS` or `01_DAILY`.

2. **Step 1: Documentation (Fumi - Project Historian)**
   - **Trigger:** Tawan signals a project milestone.
   - **Action:** Fumi extracts the tech stack, challenges faced, and core achievements.
   - **Output:** Formats the raw data into structured Markdown (e.g., `Project_Activity_data.md`).

3. **Step 2: UX & Content Review (Aoi - UX/UI Craft Lead)**
   - **Trigger:** Structured project data is ready.
   - **Action:** Aoi reviews the documentation for portfolio-readiness, ensuring it highlights user impact, design decisions, and aesthetic presentation.
   - **Output:** Refined case study copy and layout recommendations.

4. **Step 3: Web Implementation (Kaito - Builder Agent)**
   - **Trigger:** Case study copy is approved.
   - **Action:** Kaito takes the refined data from Aoi and Fumi and integrates it into the `PorfolioWebsite` codebase (React/Next.js/Markdown).
   - **Output:** Live, updated portfolio website.

## Collaboration Map
`Tawan (Creator) -> Fumi (Historian) -> Aoi (UX Designer) -> Kaito (Developer) -> Live Website`

---

## 🛡️ Context & Maintenance Pipelines
To prevent AI Context Bloat and hallucination during long-term projects, TAWAN-OS utilizes three dedicated defense pipelines:
1. **Context Compressor:** `Akari -> Chika -> Shiori` (Compresses massive chats into a single STATE.md file).
2. **Adversarial Check:** `Akari -> Ryuji -> Tetsu -> Shiori` (Red Team attacks ideas to prevent Yes-Man AI behavior).
3. **Garbage Collection:** `Akari -> Kenji -> Tetsu -> Shiori` (Cleans up the workspace to maintain a Blank Slate).
