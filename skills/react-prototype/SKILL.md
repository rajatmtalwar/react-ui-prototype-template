---
name: react-prototype
description: >-
  Build features into the React prototype this repo already is — one slice at a
  time. This skill ships inside a prototype cloned from the team template (Vite +
  React + TypeScript + Tailwind v4 + shadcn/ui + react-router-dom + Zustand) and
  already knows the project's conventions. Use it WHENEVER the user asks to add,
  build, wire up, or extend a screen/page/feature/flow in the prototype — e.g.
  "add a settings page", "build the checkout flow", "make a dashboard tab", "add
  a feature to do X", "create a screen for Y" — even when they don't name a file
  or say the word "prototype". It keeps routing, navigation, and persisted state
  consistent and avoids disturbing existing screens.
---

# React Prototype

You are working **inside an existing prototype** cloned from the team template.
All tooling is already set up — there is nothing to scaffold or copy. Your job is
to **add features progressively**: each request becomes one self-contained slice
(a screen plus its route, nav entry, and any state it needs) layered onto what's
already there, without breaking existing screens.

These are **visual mockups first** — prioritize layout, polish, and realistic
content. Add real state only where the feature needs to remember something.

## The stack you're in

- **Vite + React + TypeScript** — `npm run dev` serves it with HMR.
- **Tailwind v4** (`@tailwindcss/vite`) — utility classes, theme tokens in `index.css`.
- **shadcn/ui** — pre-themed components in `src/components/ui/`; add more with the CLI.
- **react-router-dom** — routes in `src/App.tsx`, nested under the app-shell layout.
- **Zustand + persist** — stores in `src/stores/`, auto-saved to localStorage.
- App-shell layout with sidebar nav + dark-mode toggle already wired.

## Project map (where things go)

```
src/
├── App.tsx               # <Routes> — register every new route here
├── layouts/AppLayout.tsx # sidebar + topbar; add nav links here
├── pages/                # one file per screen (your main work)
├── components/           # shared hand-written components
│   └── ui/               # shadcn (generated — don't hand-edit)
├── stores/               # Zustand persisted stores
└── lib/utils.ts          # cn() helper
```

Before adding anything, glance at `src/App.tsx` and `src/layouts/AppLayout.tsx`
to match the existing route + nav patterns exactly — the user may have evolved
them since the template was created.

## Workflow: add one feature

Work in this loop for each feature request. Keep the slice small and complete.

1. **Scope it briefly.** Restate the feature in one line and note the route,
   what's on the screen, and whether it needs to persist anything. Ask only if
   genuinely ambiguous; otherwise proceed and state your assumptions.
2. **Make sure the dev server is running** (`npm run dev`) so you can verify.
3. **Add any shadcn components** the screen needs:
   ```bash
   npx shadcn@latest add table dialog select switch -y
   ```
4. **Create the page** at `src/pages/<Name>.tsx` (default export). Build the UI
   from shadcn primitives + Tailwind. Use realistic placeholder data.
5. **Register the route** in `src/App.tsx`, nested under the layout route:
   ```tsx
   import Settings from "@/pages/Settings"
   // inside the layout's <Route> children:
   <Route path="settings" element={<Settings />} />
   ```
6. **Add the nav link** in `src/layouts/AppLayout.tsx` (the `nav` array) with a
   lucide icon so the screen is reachable.
7. **Add a persisted store** only if the feature must remember state — see below.
8. **Verify** (next section), then tell the user the route, what they can click,
   and what persists.
9. **Commit the slice** so features stay reviewable and revertible:
   ```bash
   git add -A && git commit -m "feat: settings page"
   ```

## Progressive principles

- **One feature per pass.** Don't bundle unrelated screens into one change.
- **Reuse, don't duplicate.** Prefer existing shared components and stores; lift
  something into `components/` only when a second screen needs it.
- **Match the established look.** Reuse the page header pattern, spacing, and
  `text-muted-foreground` conventions already in the prototype.
- **Don't refactor unrelated screens.** Touch only what the feature needs. If a
  refactor is genuinely required, call it out first.
- **Keep routes and nav in sync.** Every new page gets both a route and a nav
  entry — a page with no link is effectively invisible in a mockup.

## Persisted state (Zustand + localStorage)

Reach for this only when a feature must survive a reload (toggles, an editable
list, a cart). Pure display screens are fine with `useState` or hardcoded data.

```tsx
// src/stores/useSettings.ts
import { create } from "zustand"
import { persist } from "zustand/middleware"

type SettingsState = {
  notifications: boolean
  toggleNotifications: () => void
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      notifications: true,
      toggleNotifications: () =>
        set((s) => ({ notifications: !s.notifications })),
    }),
    { name: "settings" } // localStorage key — keep unique per store
  )
)
```

Use it anywhere: `const { notifications, toggleNotifications } = useSettings()`.
**localStorage is the right default for ~99% of mockups.** Only consider IndexedDB
(via Dexie) for large datasets, files, or images — and flag that to the user
rather than switching silently.

## Design guidance (make the mockup look real)

If a `frontend-design` skill is available, consult it. Otherwise:

- **Realistic content**, not lorem ipsum — plausible names, numbers, dates, statuses.
- **Generous, consistent spacing**; clear hierarchy (one page title, muted
  secondary text, sized section headers).
- **Compose shadcn primitives** (Card, Table, Tabs, Badge, Avatar, Separator,
  Sonner toasts) instead of rebuilding them — they're already themed for light/dark.
- **Responsive**, and include **empty/loading states** where they make the screen
  feel finished.
- Vary the layout to fit the actual product — avoid generic dashboard sameness.

## Verify before handing off

Catch type/route errors before declaring done:

```bash
npx tsc --noEmit      # type-check
npm run build         # or a full build if the change is larger
```

Then open the dev URL, click into the new route from the sidebar, and confirm any
persisted state survives a refresh.

## Worked example

> "Add a settings page with a notifications toggle that persists."

1. Route `/settings`; one screen with a toggle; needs persistence → use a store.
2. `npx shadcn@latest add switch label card -y`
3. Create `src/pages/Settings.tsx` with a Card containing a labeled `Switch`.
4. Add `<Route path="settings" element={<Settings />} />` in `App.tsx`.
5. Add a `Settings` nav entry (lucide `Settings` icon) in `AppLayout.tsx`.
6. Create `src/stores/useSettings.ts` (persisted) and wire the Switch to it.
7. `npx tsc --noEmit`, click Settings in the sidebar, toggle, refresh → still on.
8. `git commit -m "feat: settings page"`.

---

## Installing this skill in the template (one-time)

This skill lives at `.claude/skills/react-prototype/SKILL.md` inside the template
repo and is committed to git. Because it's project-scoped, every clone of the
template carries it automatically — no per-prototype install. To update the
skill for all future prototypes, edit it here in the template and push.