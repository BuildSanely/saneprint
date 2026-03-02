# Changelog

All notable changes to saneprint will be documented here.

---

## [1.0.1] - 2026-03-02

### Changed

- **README Improvements**: Refocused messaging on outcomes over technical details
  - Emphasized velocity gains, reduced cognitive load, and faster feature delivery
  - Added concrete time savings metrics (20 mins per feature, 5-10 hours on refactors, 2-3 days → 4 hours onboarding)
  - Condensed from ~258 lines to ~140 lines for better scannability
  - Replaced technical jargon with impact statements ("Work 3x faster", "Ship confidently from commit one")
  - Added "What You Save" section with tangible benefits
  - Improved "Why saneprint Works" section focusing on AI effectiveness and less back-and-forth
  - Streamlined feature descriptions while maintaining key selling points
  - Better example prompts for working with AI assistants

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
