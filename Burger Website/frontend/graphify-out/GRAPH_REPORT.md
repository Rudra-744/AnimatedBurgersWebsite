# Graph Report - .  (2026-08-07)

## Corpus Check
- 43 files · ~117,859 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 124 nodes · 120 edges · 17 communities (12 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Next.js & Dependencies
- Dev Dependencies
- TS Compiler Options
- Pages & Components
- TS Config Settings
- App Metadata Config
- Package Scripts
- Layout & Fonts
- Not Found Route
- ESLint Configuration
- Next Config
- PostCSS Config

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `include` - 7 edges
3. `SITE_CONFIG` - 5 edges
4. `scripts` - 5 edges
5. `lib` - 4 edges
6. `modak` - 2 edges
7. `mouseMemoirs` - 2 edges
8. `spaceGrotesk` - 2 edges
9. `@gsap/react` - 2 edges
10. `@next/third-parties` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (17 total, 5 thin omitted)

### Community 0 - "Next.js & Dependencies"
Cohesion: 0.10
Nodes (21): clsx, framer-motion, gsap, @gsap/react, next, @next/third-parties, dependencies, clsx (+13 more)

### Community 1 - "Dev Dependencies"
Cohesion: 0.11
Nodes (19): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, schema-dts, tailwindcss, @tailwindcss/postcss (+11 more)

### Community 2 - "TS Compiler Options"
Cohesion: 0.11
Nodes (19): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+11 more)

### Community 3 - "Pages & Components"
Cohesion: 0.24
Nodes (5): BurgersPage(), MENU_ITEMS, MenuItem, SLOT_REELS, HomePage()

### Community 4 - "TS Config Settings"
Cohesion: 0.20
Nodes (9): **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude (+1 more)

### Community 6 - "Package Scripts"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, lint, start, version

### Community 7 - "Layout & Fonts"
Cohesion: 0.36
Nodes (5): metadata, viewport, modak, mouseMemoirs, spaceGrotesk

## Knowledge Gaps
- **60 isolated node(s):** `metadata`, `viewport`, `metadata`, `eslintConfig`, `SiteConfig` (+55 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Next.js & Dependencies` to `Package Scripts`?**
  _High betweenness centrality (0.099) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Dev Dependencies` to `Package Scripts`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Why does `compilerOptions` connect `TS Compiler Options` to `TS Config Settings`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **What connects `metadata`, `viewport`, `metadata` to the rest of the system?**
  _60 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Next.js & Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `Dev Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `TS Compiler Options` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._