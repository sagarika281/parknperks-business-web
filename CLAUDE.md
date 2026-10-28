# CLAUDE.md — ParkNPerks Business

Website (Vite React) layout. Takes colocation ideas from `parknperks-mobile`, but uses web naming (`pages`, not `screens` / `features`).

**App:** ParkNPerks Business (Vite, React 19, TypeScript)  
**Imports:** `@/*` → `src/*` (`tsconfig.app.json` + `vite.config.ts`)

---

## Repo layout

```
parknperks-business/
├── src/
│   ├── assets/             # images, icons
│   ├── pages/              # route pages (one folder per page)
│   ├── shared/             # reusable UI, constants, utils
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
└── CLAUDE.md
```

---

## `src/pages/` — one folder per page

```
pages/<PageName>/
  <PageName>Page.tsx   # page owns composition + modal state
  components/          # UI used only by this page (panels, widgets, modals)
  types/ · constants/ · hooks/ · utils/   # as needed
  index.ts             # public export
```

| Page | Role |
|------|------|
| `Login` | Business login — entry screen; Create new account → Register |
| `Register` | Create account — then continues into Home |
| `Home` | Lock-screen hub — left/center/right panels, PIN + idle lock |
| `Verified` | Full-screen PIN success — then continues to Welcome |
| `Welcome` | Full-screen post-PIN welcome (shift overview) — not nested under Home |
| `Dashboard` | Full-screen business dashboard (metrics + widgets + right sidebar) |
| `Jules` | Jules AI panel + workspace (modals opened from sidebar; not a route) |

From mobile: keep page-owned components colocated under the page. Do **not** nest page modals inside a panel component — the page composes them.

---

## Conventions

1. Page-specific UI → `pages/<Page>/components/`; cross-page UI → `shared/`.
2. Pages own modal/open state and wire callbacks into panels.
3. Commit / push / sync only when the user asks.
