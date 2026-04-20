# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Next.js dev server on http://localhost:3000
- `npm run build` — production build (Next.js 16, Turbopack by default)
- `npm run start` — run the production build
- `npm run lint` — ESLint (flat config, extends `eslint-config-next`)

There is no test suite configured. A `Makefile` offers `make install`, `make run`, `make build` as thin aliases.

## Required environment

A `.env.local` at the project root must define both of these — services and the WebSocket provider throw / log loudly if either is missing:

```
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1/
NEXT_PUBLIC_WEBSOCKETS_URL=http://localhost:8080/ws-pulse
```

This frontend is useless without the backend running — it is one piece of a three-repo system: **system-pulse** (Spring Boot API) and **Go-MetricsAgent** (host-side collector) are the other two. Metrics flow: agent → Spring → STOMP topic → this dashboard.

## Architecture

**Next.js 16 App Router, React 19, Tailwind v4, shadcn/ui (New York style, `@/*` → `src/*`).** UI strings are in Portuguese (pt-BR); keep new copy consistent.

### Hybrid data model: REST for snapshots, WebSocket for live updates

Every screen that shows server state combines two sources. Understanding this split is the main thing to get right when editing:

1. **Initial data** comes from REST (`src/services/server-service.ts`) — `getServers`, `getServerById`, `createServer`, `updateServer`, `deleteServer`. All use `fetch` with `cache: "no-store"` and swallow errors into `[]` / `null` on reads, rethrow on writes. The list page (`src/app/servers/page.tsx`) is a **Server Component** that awaits `getServers()` and passes the result as `initialData` props.

2. **Live overlays** come from a single STOMP/SockJS connection managed by `WebSocketProvider` (`src/context/WebSocketContext.tsx`). It subscribes to `/topic/status` and stores a `Record<number, ServerStatusUpdate>` keyed by server id. Components call `useWebSocket()` and merge: live values take precedence, REST snapshot is the fallback (see the `getServerData` pattern in `ServersList.tsx` and the `counts` memo in `DashboardCards.tsx`).

When adding a new live-metric view, follow that same merge pattern — don't refetch on every update, and don't create a second WebSocket client. The provider is mounted **once per route group** in `src/app/dashboard/layout.tsx` and `src/app/servers/layout.tsx`; both layouts also mount `SidebarProvider` + `AppSidebar`. The root `src/app/layout.tsx` deliberately does NOT wrap the whole app, so the landing page at `/` is plain.

### Route groups

- `/` — placeholder landing page (`src/app/page.tsx`)
- `/dashboard` — overview cards + charts (client component, fetches in `useEffect`)
- `/servers` — list (Server Component, fetches server-side)
- `/servers/new` — create form (react-hook-form + Zod)
- `/servers/[id]` — edit/delete form (same schema, reads via `getServerById`)

The create/edit forms share a Zod schema inline (name ≥ 2, description 10–500 chars). If you change validation rules, update both files.

### Types

`src/types/server.ts` mirrors the Java DTO. The `Server.status` field is `"ONLINE" | "OFFLINE" | "MAINTENANCE" | "UNKNOWN"`, but the WebSocket payload (`ServerStatusUpdate` in `WebSocketContext.tsx`) only carries the first three — `UNKNOWN` exists only for servers that never checked in. Keep those unions in sync if the backend adds a state.

### Components layout

- `src/components/ui/*` — shadcn primitives; regenerate via `npx shadcn@latest add <name>` (config in `components.json`)
- `src/components/dashboard/*` — dashboard widgets (cards, charts)
- `src/components/servers/*` — list table, forms
- Top-level `src/components/*` contains sidebar/nav pieces from the shadcn dashboard template; some (`data-table.tsx`, `chart-area-interactive.tsx`, `nav-documents.tsx`, etc.) are scaffolding not yet wired into the active routes — check imports before treating them as live code.

### Styling

Tailwind v4 via `@tailwindcss/postcss`; tokens live in `src/app/globals.css` (CSS variables, neutral base color). `cn()` from `src/lib/utils.ts` is the only class-merging helper — use it for conditional classes instead of template strings.
