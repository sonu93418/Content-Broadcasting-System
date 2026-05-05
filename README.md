# ContentCast — Content Broadcasting System

A modern educational content broadcasting platform built with Next.js, Tailwind CSS, and React.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-blue)
![React](https://img.shields.io/badge/React-19-61DAFB)

## Features

- **Authentication** — Role-based login for teachers and principals
- **Teacher Dashboard** — Upload content, track submission status
- **Principal Dashboard** — Review, approve, or reject content with reasons
- **Live Broadcasting** — Public page for students to view active content
- **File Upload** — Drag-and-drop with preview, validation (JPG/PNG/GIF, 10MB max)
- **Search & Filter** — Search by title/subject/teacher, filter by status
- **Responsive Design** — Mobile-first with sidebar navigation
- **Skeleton Loaders** — Premium loading states throughout
- **Dark Theme** — Glassmorphism design with gradient accents

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** JavaScript (ES6+)
- **Styling:** Tailwind CSS 4
- **Forms:** React Hook Form + Zod validation
- **State:** React Context + Custom Hooks
- **Icons:** React Icons (Heroicons)

## Setup & Run

```bash
# Clone the repository
git clone <repository-url>
cd content_broadcasting

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Teacher | teacher@school.com | teacher123 |
| Principal | principal@school.com | principal123 |

## Project Structure

```
src/
├── app/            # Pages (App Router)
├── components/     # Reusable UI & layout components
├── context/        # Auth context provider
├── hooks/          # Custom data hooks
├── services/       # API service layer
└── utils/          # Constants & helpers
```

## Key Design Decisions

1. **Service Layer Pattern** — All API calls isolated in service files, easily replaceable
2. **Mock Data Layer** — Simulates backend with realistic delays; swap for real API by updating service files
3. **Custom Hooks** — `useContent`, `useLiveContent`, `useUpload` encapsulate data logic
4. **Protected Routes** — HOC-based auth guard with role enforcement
5. **Component Memoization** — React.memo on UI components to optimize re-renders

## License

MIT
