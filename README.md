# saneprint

[![npm version](https://img.shields.io/npm/v/saneprint.svg)](https://www.npmjs.com/package/saneprint) [![npm downloads](https://img.shields.io/npm/dm/saneprint.svg)](https://www.npmjs.com/package/saneprint) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE) [![nextjs](https://img.shields.io/badge/Next.js-14+-black.svg)](https://nextjs.org)

**saneprint** is a scaffolding tool that eliminates the constant AI back-and-forth. Start with a production-grade foundation that AI actually understands—ship features faster with zero refactoring tax.

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

## Why saneprint Works

**You stop explaining. AI starts shipping.**

With a solid foundation in place:

- ✅ **Reduced Cognitive Load**: No more "where does this go?" or "how do we handle auth?"
- ✅ **Faster Velocity**: AI references existing patterns instead of inventing new ones—features ship in hours, not days
- ✅ **Less Back-and-Forth**: Point to your auth flow once. AI replicates it perfectly for every new feature.
- ✅ **Quality by Default**: Design system enforcement means zero inconsistencies sneak into production
- ✅ **Lower Maintenance**: When everything follows the same pattern, scaling to 50+ routes is painless

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

**Impact**: No more "fix all the inconsistent buttons" tickets. No designer QA cycles wasted on color mismatches. Your AI assistant becomes a productivity multiplier, not a cleanup job generator.

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

**Impact**: Zero "where should this file go?" questions. You and your AI work 3x faster because the next step is always obvious.

### 3. Production-Ready Auth Flow

Real apps need more than a basic login form. saneprint includes:

- ✅ Multi-step signup with OTP verification
- ✅ Forgot password flow with secure reset
- ✅ Cookie-based auth (HttpOnly, Secure, SameSite)
- ✅ Redux persistence for session state
- ✅ Protected route middleware
- ✅ Complete form validations with Zod

**Impact**: New features inherit production-grade patterns automatically. No "let's add error handling later" tech debt. Ship confidently from commit one.

### 4. Living Styleguide

Every project includes a `/styleguide` route that showcases:

- Color system with semantic roles
- Typography hierarchy
- All form components (Input, Select, OTP, MultiSelect)
- Interactive elements (Buttons, Modals, Tooltips)
- Data visualization (Tables with virtualization)
- Best practices guide

**Impact**: Stop recreating the same component 5 different ways. Your styleguide is a single source of truth that prevents drift before it starts.

### 5. Single Responsibility by Design

Components naturally stay focused and maintainable because the structure enforces separation of concerns:

- **Logic separated from UI**: Complex state management lives in custom hooks
- **Primitives vs Compositions**: Base components (`Button`, `Input`) live in `core/components`, feature-specific compositions stay in their domains
- **No mixed responsibilities**: Each component does one thing well
- **Design tokens, not inline styles**: All styling driven by the theme system

**Impact**: Onboard new developers in hours, not weeks. Every file is scannable. Debugging takes minutes because responsibilities are crystal clear.

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

## What You Save

**Time:**

- No "which folder?" decisions (20+ mins per feature)
- No "let's standardize our buttons" refactors (5-10 hours)
- No "why is this color different?" design QA cycles (2-3 hours per sprint)
- No onboarding maze for new developers (2-3 days → 4 hours)

**Frustration:**

- Zero "AI reinvented the auth flow" rewrites
- Zero "I can't find where login logic lives" treasure hunts
- Zero "our codebase looks like 5 different people built it" embarrassment

**Money:**

- Lower maintenance costs (fewer bug tickets from inconsistent patterns)
- Faster feature delivery (ship 2-3x more with the same team)
- Better retention (developers actually enjoy working in the codebase)

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

**Stop fighting your tools. Start shipping.**

- **Less Explaining, More Building** - AI learns from your code, not from document after document of rules you'll never keep updated.

- **Velocity That Scales** - Your first feature takes 2 hours. Your 50th feature? Still 2 hours. Structure prevents slowdown.

- **Design Systems Without the Overhead** - You get token-based styling and a living styleguide automatically. No design-dev translation layer needed.

- **Quality That Compounds** - Every feature you ship makes the next one easier. Patterns reinforce themselves instead of diverging.

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
