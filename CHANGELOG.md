# Changelog

All notable changes to saneprint will be documented here.

---

## [1.0.0] - 2026-03-02

### Added

- **Core CLI**: Interactive scaffolding tool with project type and design system selection
- **Design System Pipeline**: Automatic JSON → Code transformation
  - Converts `px` to `rem` for responsive scaling
  - Generates semantic color tokens (`--color-brand`, `--color-accent`)
  - Syncs design tokens to Tailwind CSS variables
- **Feature-Based Architecture**: Domain-driven folder structure
  - `src/features/core` for reusable UI components
  - `src/features/auth` complete authentication flow
  - Clear separation: components, hooks, pages, schemas, redux
- **Production-Ready Auth**: Multi-step signup with OTP, forgot password, cookie-based sessions, protected routes
- **Living Styleguide**: `/styleguide` route showcasing all components, colors, typography, and patterns
- **AI Optimization Files**:
  - `AGENTS.md` - Comprehensive guide for working with AI assistants
  - `.cursorrules` - Focused rules preventing hallucination and tech debt
  - `.clauderules` - Claude-optimized variant
  - Staff-level engineer persona for better AI decision-making
- **Component Library**: 20+ production-ready components
  - Forms: Input, TextArea, Select, MultiSelect, Checkbox, RadioGroup, OTPInput, SearchBar
  - Interactive: Button, IconButton, Modal, Tooltip, DropdownMenu
  - Data: DataTable with virtualization, sorting, filtering
  - Feedback: Toast, Skeleton, ErrorBoundary, LoadingIndicator
- **Tech Stack**: Next.js 14+, Tailwind v4, Zod, React Hook Form, Redux Toolkit, TanStack Query, Phosphor Icons
- **DX Features**:
  - Absolute imports with path aliases (`@core`, `@auth`, `@store`, `@utils`)
  - Type-safe API layer with environment guards
  - SEO metadata helpers
  - Accessibility standards (ARIA labels, keyboard navigation)
  - Performance optimizations (virtualized tables, debounced search)
