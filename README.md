# Markoub Jobs – Technical Assignment

A simple job platform built as part of the Markoub take-home assignment.

The application allows candidates to browse open positions, apply for a specific role or submit a spontaneous application, and provides a minimal admin interface to manage positions and review applications.

---

## Tech Stack

- **Frontend / Backend:** TanStack Start (React, TypeScript)
- **Database:** PostgreSQL
- **ORM:** Drizzle ORM
- **UI:** Tailwind CSS + shadcn/ui
- **Tooling:** Vite, Docker (Postgres only)

---

## Setup & Run

### Prerequisites

- Node.js 18+
- Docker & Docker Compose

0. **Create env file**

   ```
   cp .env.example .env
   ```
2. **Start PostgreSQL**

   ```bash
   docker compose up -d
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Setup database**

   ```bash
   npm run db:migrate
   npm run db:seed
   ```

5. **Run the app**

   ```bash
   npm run dev
   ```

   App will be available at http://localhost:3000.

---

## Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run lint       # Run ESLint
npm run format     # Format code with Prettier

npm run db:migrate # Run database migrations
npm run db:seed    # Seed database
npm run db:studio  # Drizzle Studio
```

---

## Application Routes

### Public

- `/` — Open positions
- `/positions/:id` — Position details & application
- `/application-success` — Submission confirmation

### Admin (no auth)

- `/admin` — Admin dashboard
- `/admin/positions` — Manage positions
- `/admin/positions/:id` — View and edit a position
- `/admin/positions/new` — Create a new position
- `/admin/applications` — Review applications
- `/admin/applications/:id` — Review application details and actions

---

## Key Architecture Decisions

- **Single app architecture:** Frontend and backend share the same codebase using TanStack Start server functions.
- **Postgres via Docker only:** Database is containerized to ensure consistent setup; the app runs locally for simplicity.
- **Strict separation of concerns:**
  - `server/api` → request handling
  - `server/repos` → data access
  - `server/services` → side effects (file upload)
- **Minimal error handling:** User-friendly messages for expected errors, generic fallback for unexpected failures.
- **No authentication:** Admin access is intentionally left open as per assignment scope.

---

## Notes

- Resume uploads are stored locally under `/uploads`.
- Only PDF files are accepted (max 2 MB).
- Migrations are committed to ensure reproducible database state.

---

## Author

Built by Hisham Ouberkni as part of the Markoub senior full-stack assignment.
