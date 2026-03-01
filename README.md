# saneprint

[![npm version](https://img.shields.io/npm/v/saneprint.svg)](https://www.npmjs.com/package/saneprint) [![npm downloads](https://img.shields.io/npm/dm/saneprint.svg)](https://www.npmjs.com/package/saneprint) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE) [![nextjs](https://img.shields.io/badge/Next.js-14+-black.svg)](https://nextjs.org)

**saneprint** is a scaffolding tool that gives you a production-grade Next.js foundation so good that AI naturally follows your patterns.

---

## The Problem with "Vibe Coding"

You've probably been there: You ask your AI assistant (Cursor, Claude, Copilot) to "build a signup form" or "create a dashboard layout." The AI generates code that _looks_ right: nice indentation, modern syntax, the works.

But then reality hits:

- **Inconsistent Units**: One component uses `px`, another uses `rem`, another hardcodes pixel values
- **No Design System**: Colors are hardcoded HEX values (`#3b82f6`) scattered everywhere
- **Architectural Chaos**: AI invents new folder structures for every feature because there's no clear pattern to follow
- **Component Bloat**: 800-line "God Components" that mix logic, UI, and side effects
- **Copy-Paste Hell**: The same button styled 5 different ways across your app

This is **"Vibe Coding"**: code that feels correct but accumulates **massive technical debt from Day 1**.

Without a solid foundation, you're constantly fighting AI's tendency to hallucinate new patterns instead of following existing ones.

---

## Why saneprint Is Different

**Good structure beats documentation.**

Instead of writing rules _about_ best practices, saneprint gives you a codebase that _embodies_ best practices. When AI sees:

- ✅ A complete, production-ready auth flow
- ✅ A design system with semantic color roles (`brand`, `accent`, `danger`)
- ✅ Organized features with clear boundaries (`src/features/auth`, `src/features/core`)
- ✅ Reusable form components already integrated with validation
- ✅ A living styleguide showcasing every component

...it **naturally follows these patterns**. The structure guides AI to make consistent, predictable decisions.

---

## What You Get Out of the Box

### 1. Design System Pipeline (JSON → Code)

Without a design system, it's easy to fall into the trap: copy-paste Tailwind classes, use `bg-blue-500` here and `bg-blue-600` there, hope it all looks consistent in the end.

saneprint **forces** a design system:

```bash
npx saneprint
# Choose: Custom Design System
# Define your colors, spacing, typography
```

The CLI automatically:

- ✅ Converts all `px` values to `rem` (responsive by default)
- ✅ Generates CSS custom properties mapped to Tailwind
- ✅ Creates semantic color roles (`--color-brand`, `--color-accent`)
- ✅ Injects theme into your entire UI system

**Result**: When AI generates a button, it uses `bg-brand` instead of `bg-blue-500`. When it creates spacing, it uses your scale instead of random pixel values.

### 2. Feature-Based Architecture

No more "components folder soup." Every feature is self-contained:

```
src/features/
├── core/          # Reusable UI (buttons, inputs, modals)
├── auth/          # Complete auth flow (login, signup, OTP)
└── protected/     # Domain features (dashboard, users, etc.)
```

Each feature has its own:

- `components/` - Feature-specific UI
- `hooks/` - Business logic extraction
- `pages/` - Page-level compositions
- `schemas/` - Zod validation schemas
- `index.ts` - Public API exports

**Result**: AI knows _exactly_ where to put new code. No hallucinated folder structures.

### 3. Production-Ready Auth Flow

Real apps need more than a basic login form. saneprint includes:

- ✅ Multi-step signup with OTP verification
- ✅ Forgot password flow with secure reset
- ✅ Cookie-based auth (HttpOnly, Secure, SameSite)
- ✅ Redux persistence for session state
- ✅ Protected route middleware
- ✅ Complete form validations with Zod

**Result**: AI sees _how_ to build features properly: with validation, error handling, loading states, and security best practices baked in.

### 4. Living Styleguide

Every project includes a `/styleguide` route that showcases:

- Color system with semantic roles
- Typography hierarchy
- All form components (Input, Select, OTP, MultiSelect)
- Interactive elements (Buttons, Modals, Tooltips)
- Data visualization (Tables with virtualization)
- Best practices guide

**Result**: Zero guesswork. You and your AI can see exactly which components exist and how to use them.

### 5. Single Responsibility by Design

Components naturally stay focused and maintainable because the structure enforces separation of concerns:

- **Logic separated from UI**: Complex state management lives in custom hooks
- **Primitives vs Compositions**: Base components (`Button`, `Input`) live in `core/components`, feature-specific compositions stay in their domains
- **No mixed responsibilities**: Each component does one thing well
- **Design tokens, not inline styles**: All styling driven by the theme system

**Result**: No bloated "God Components" mixing business logic, UI, and side effects. Each file has a clear, single purpose that both humans and AI can understand at a glance.

---

## Real-World Workflow

```bash
npx saneprint
cd my-project
pnpm install
pnpm dev
```

When you prompt your AI:

> "Create a user management feature in `src/features/users`. Include a `UserListPage` that fetches data with TanStack Query, a `UserCard` component, and Zod schemas for validation. Follow the same structure as the auth feature."

AI has a clear reference to follow - it sees how auth is organized and replicates that pattern for users.

---

## Quickstart

```bash
npx saneprint
```

Follow the prompts to choose:

- Project type (Next.js)
- Design system (default or custom)
- Project name

**Then:**

```bash
cd your-project-name
pnpm install
pnpm dev
```

Visit `http://localhost:3000/styleguide` to see your design system in action.

---

## The Stack

**Opinionated and Modern:**

- **Framework**: Next.js 14+ (App Router, Server Components)
- **Styling**: Tailwind CSS v4 (driven by design tokens)
- **Validation**: Zod (type-safe runtime validation)
- **Forms**: React Hook Form (performance-optimized)
- **State**: Redux Toolkit + TanStack Query (persistent + server state)
- **Icons**: Phosphor Icons (one library, consistent style)
- **Color System**: OKLCH (perceptually uniform colors)

---

## What Makes This "Production-Grade"?

❌ **NOT** a tutorial project  
❌ **NOT** a minimal starter  
✅ **IS** a foundation you'd actually use in production

- HttpOnly cookie authentication (not localStorage JWT)
- Middleware-based route protection (Edge-optimized)
- Comprehensive error boundaries
- SEO metadata helpers
- Accessibility standards (ARIA labels, keyboard navigation)
- Performance optimizations (virtualized tables, debounced search)
- Type-safe API layer with environment guards

---

## Philosophy

**Code as Documentation** - The best way to teach AI (and developers) is through exemplary code, not lengthy rules.

**Structure as Guardrails** - When the folder structure makes the right thing easy and the wrong thing hard, you write better code by default.

**Design Systems for Humans** - Most developers skip design systems because they're "too much work." We make it automatic.

**Scale from Day 1** - Start with patterns that work for 1 feature or 50 features. No "refactor phase" needed later.

---

## Who This Is For

- **Solo Devs** shipping fast with AI assistance
- **Freelancers** delivering maintainable codebases to clients
- **Product Engineers** focused on features, not infrastructure
- **Designers who code** wanting a solid foundation that respects design systems and enforces their tokens from day one
- **Tech Leads** standardizing team output
- **Founders** who need quality code without a senior engineer (yet)

---

## Author

Built by **Karishma Garg**, Product Engineer

- GitHub: [@karishma-dev](https://github.com/karishma-dev)
- Portfolio: [karishma.dev](https://karishma.dev)

---

## License

MIT - Build something great.
