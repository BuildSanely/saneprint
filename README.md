# saneprint

[![npm version](https://img.shields.io/npm/v/saneprint.svg)](https://www.npmjs.com/package/saneprint) [![npm downloads](https://img.shields.io/npm/dm/saneprint.svg)](https://www.npmjs.com/package/saneprint) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE) [![nextjs](https://img.shields.io/badge/Next.js-14+-black.svg)](https://nextjs.org)

**saneprint** is a scaffolding tool that eliminates the constant AI back-and-forth. Start with a production-grade foundation that AI actually understands - ship features faster with zero refactoring tax.

---

## The Problem with "Vibe Coding"

AI generates code that looks right but accumulates debt: inconsistent units (`px` vs `rem`), hardcoded colors (`#3b82f6`), 800-line "God Components", invented folder structures. Every feature becomes a different pattern.

Without structure, you're constantly correcting AI instead of building.

---

## Why saneprint Works

- ✅ **Reduced Cognitive Load**: Clear patterns. "Where does this go?" is never a question.
- ✅ **Faster Velocity**: Features ship in hours because AI references existing code, not inventing new architectures
- ✅ **Less Back-and-Forth**: Point to your auth flow once. AI replicates it for every feature.
- ✅ **Lower Maintenance**: Consistent patterns mean scaling to 50+ routes stays easy

---

## What You Get Out of the Box

### 1. Design System Pipeline

Automatic theme generation from JSON:

- Converts `px` to `rem`
- Creates semantic tokens (`--color-brand`, `--color-accent`)
- Syncs to Tailwind CSS variables

**Impact**: No "fix inconsistent colors" tickets. AI uses `bg-brand` instead of `bg-blue-500`.

### 2. Feature-Based Architecture

```
src/features/
├── core/      # Reusable UI
├── auth/      # Complete auth flow
└── protected/ # Domain features
```

Each feature: `components/`, `hooks/`, `pages/`, `schemas/`, `index.ts`

**Impact**: Zero "where should this file go?" questions. Work 3x faster.

### 3. Production-Ready Auth

Multi-step signup with OTP, forgot password, cookie-based sessions (HttpOnly), Redux persistence, protected routes, Zod validation.

**Impact**: Ship with security and validation from commit one. No tech debt.

### 4. Living Styleguide

Visit `/styleguide` to see all components: forms, buttons, modals, tooltips, data tables, colors, typography.

**Impact**: Single source of truth. Stop recreating components.

### 5. Single Responsibility

Logic in hooks. Primitives in `@core`. Compositions in features. Styling via tokens.

**Impact**: Onboard in hours, not weeks. Debug in minutes.

---

## Quickstart

```bash
npx saneprint
cd my-project
pnpm install
pnpm dev
```

Visit `http://localhost:3000/styleguide` to see your design system in action.

**Example prompt for AI:**

> "Create `src/features/users` following the auth pattern. Include UserListPage with TanStack Query, UserCard component, and Zod schemas."

---

## The Stack

Next.js 14+ • Tailwind v4 • Zod • React Hook Form • Redux Toolkit • TanStack Query • Phosphor Icons • OKLCH colors

---

## Production-Grade Features

HttpOnly auth • Edge middleware • Error boundaries • SEO helpers • ARIA labels • Virtualized tables • Type-safe APIs

---

## What You Save

20 mins per feature • 5-10 hours on refactors • 2-3 hours per sprint on QA • 2 days → 4 hours onboarding

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

MIT. See [LICENSE](./LICENSE) for details.
