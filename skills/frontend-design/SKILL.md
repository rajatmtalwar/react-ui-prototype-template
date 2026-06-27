---
name: frontend-design
description: >-
  Apply a clean, modern, Linear-inspired sensibility to React UI — restraint, sharp
  hierarchy, precise spacing, hairline separation, one quiet accent, and fast subtle
  motion. This is a STYLE LAYER, not a theme: it works on top of the shadcn/ui theme
  the project already has, using existing semantic tokens (it never prescribes or
  changes colors). Use it WHENEVER building or restyling product UI in a
  React/Tailwind/shadcn prototype (pages, dashboards, forms, tables, settings, app
  chrome), or whenever the user asks for a "clean", "minimal", "modern", "polished",
  "aesthetic", or "Linear / Vercel / Raycast / Stripe-like" look — even if they don't
  name this skill. It's the right default for app/dashboard screens. For a bespoke,
  one-off marketing identity meant to look unlike anything else, prefer the general
  `frontend-design` skill instead.
---

# Linear UI

The soul of tools like Linear, Vercel, Raycast, and Stripe's dashboard: **quiet
confidence**. Restraint, sharp typography, and precise spacing do the work; color
and motion are seasoning. This skill is about *how you compose* — which token you
reach for, how much air, how loud the accent — not what colors exist.

**Works with the theme you already have.** Build only from the project's shadcn
semantic tokens — `background`, `card`, `muted`, `accent`, `border`, `primary`,
`foreground`, `muted-foreground` — so everything adapts to the configured palette
and dark mode automatically. Don't hardcode hex values or redefine theme tokens.
Whatever `--primary` is, treat it as *the* accent.

## Principles

### Color discipline
- **Near-monochrome by default.** Most of any screen is `bg-background`/`bg-card`,
  `border-border`, and text. Neutrals carry the structure.
- **One accent, used sparingly.** `primary` is for the single main action, active
  nav, links, focus rings, and selected states — never large fills or competing
  accents. Accent everywhere reads cheap; accent in one place reads designed.
- **Three text levels:** `text-foreground` (primary), `text-muted-foreground`
  (secondary, labels, metadata), and an even fainter use of it for the quietest
  details. Don't invent gray values — lean on these two tokens.

### Typography
- **Sizes:** body and most UI at `text-sm` (14px); dense chrome/labels at
  `text-[13px]`; page titles `text-xl`/`text-2xl` with `tracking-tight`.
- **Weight is restraint:** 400 body, 500 emphasis/labels, 600 titles. Avoid 700+
  except a true display moment.
- **Tighten headings** with `tracking-tight`. **Sentence case everywhere** — "New
  issue", not "New Issue".
- **Tabular numerals** (`tabular-nums`) for metrics, tables, timestamps, money, so
  columns align and digits don't jitter.
- A clean grotesk suits this best — Inter or Geist if the project hasn't chosen a UI
  font yet. Otherwise just apply the treatment above to the existing font.

### Spacing & layout
- **4 / 8px rhythm.** Pick from Tailwind's scale; don't freehand odd values.
- **Compact controls, breathable content.** Buttons/inputs/rows stay short
  (`h-8`/`h-9`); sections get room (`space-y-6`, `gap-4`). Density where users scan,
  air where they read.
- **Align to a left edge and a max width** (`max-w-5xl` dashboards, `max-w-xl`
  forms). Whitespace is the layout, not a decorative afterthought.

### Surfaces & elevation
- **Borders, not shadows.** Separate surfaces with a 1px `border-border` hairline
  plus a small lightness step (`bg-card` over `bg-background`). At most a faint
  `shadow-sm`. Stacked drop shadows are the #1 generic-UI tell.
- **Consistent radius** from the theme's `--radius` (`rounded-lg` cards,
  `rounded-md` controls). Don't mix pill, sharp, and round in one view.

### Motion
- **Fast and subtle:** `transition-colors duration-150`, `ease-out`. State changes
  animate; nothing bounces or lingers.
- One ambient touch max per screen (e.g. a quiet mount fade). Respect
  `prefers-reduced-motion`.

## Component cookbook (Tailwind + shadcn semantic tokens)

```tsx
// Page header — the repeatable top of every screen
<div className="space-y-1">
  <h1 className="text-xl font-semibold tracking-tight">Issues</h1>
  <p className="text-sm text-muted-foreground">Track and triage work.</p>
</div>

// Primary action — compact, accent, one per view
<Button size="sm" className="h-8">New issue</Button>
// Secondary / quiet
<Button size="sm" variant="outline" className="h-8">Filter</Button>
<Button size="sm" variant="ghost" className="h-8">Cancel</Button>

// Card — hairline + faint elevation, never shadow-heavy
<div className="rounded-lg border bg-card p-5 shadow-sm">…</div>

// List row — the Linear staple: dense, hover-highlighted, hairline-divided
<div className="flex items-center gap-3 rounded-md px-3 h-10 text-sm
                hover:bg-accent transition-colors">
  <span className="flex-1 truncate">Fix flaky auth test</span>
  <span className="text-xs text-muted-foreground tabular-nums">2d</span>
</div>

// Status badge — tinted from the accent, not a solid fill
<span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
  In progress
</span>
// Neutral badge
<span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">Backlog</span>

// Active nav item (in the layout's nav map)
isActive
  ? "bg-accent text-foreground"
  : "text-muted-foreground hover:bg-accent hover:text-foreground"
```

Icons: **lucide-react at 16px** (`size-4`), muted by default, `text-foreground` or
accent when active. Consistent stroke; no emoji in chrome.

## Anti-patterns (remove on sight)
- Heavy/multiple drop shadows; "floating card soup".
- Accent used for large fills, or more than one accent color in play.
- Hardcoded grays/hex instead of `text-muted-foreground` / theme tokens.
- Pure `#000`/`#fff` text; Title Case UI copy; ALL-CAPS labels everywhere.
- Big border-radius pills on everything; mismatched radii in one view.
- Gratuitous gradients and glows (a single faint background wash is the ceiling).
- Cramped, unaligned spacing; freehand pixel values off the 4/8 grid.
- Emoji or clipart icons in product chrome; inconsistent icon sizes.

## Before you call it done
- One clear primary action per screen; accent appears in just a few places.
- Text uses the three levels; secondary text is muted, not gray-on-gray mush.
- Separation is hairline borders; elevation comes from lightness, not shadow.
- Numbers are tabular; copy is sentence case and plain.
- Hover/focus states exist and are visible; dark mode looks intentional.
- Spacing is consistent and the layout aligns to a max width.