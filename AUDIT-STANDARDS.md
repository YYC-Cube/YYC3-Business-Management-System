# YYC³ Business Management System — Global Audit Standards

> **Standard Version**: 1.0.0 | **Last Updated**: 2026-05-26 | **Governance**: YYC³ Team

## Audit Framework

This document defines the quality gates, coding standards, and review criteria for all contributions to the YYC³ Business Management System.

---

## 1. Code Quality Standards

### 1.1 TypeScript

| Rule | Standard | Severity |
|------|----------|----------|
| Strict mode enabled | `tsconfig.json`: `"strict": true` | 🔴 Blocking |
| No `any` types | Use `unknown` + type narrowing | 🔴 Blocking |
| Explicit return types | Required for exported functions | 🟡 Warning |
| Interface for props | `interface` over `type` for object shapes | 🟢 Info |
| No unused imports | ESLint rule `no-unused-vars` | 🔴 Blocking |
| No `@ts-ignore` | Use proper type narrowing | 🔴 Blocking |

### 1.2 Component Standards

| Rule | Standard | Severity |
|------|----------|----------|
| Single Responsibility | One component per file, one purpose | 🟡 Warning |
| Props interface | Must be defined above component | 🔴 Blocking |
| Default exports | Use named exports; default only for pages | 🟡 Warning |
| `"use client"` | Only when using hooks/browser APIs | 🔴 Blocking |
| File naming | `kebab-case.tsx` for files, `PascalCase` for exports | 🔴 Blocking |
| Component size | < 200 lines; extract sub-components if larger | 🟡 Warning |

### 1.3 Import Standards

```typescript
// Layer 1: Framework
import { useState } from "react"
import Image from "next/image"

// Layer 2: External libraries
import { Users } from "lucide-react"

// Layer 3: UI primitives (@/components/ui/)
import { Button } from "@/components/ui/button"

// Layer 4: Feature components
import { EnhancedCard } from "@/components/design-system/enhanced-card-system"

// Layer 5: Hooks & utilities
import { cn } from "@/lib/utils"
```

### 1.4 Styling Standards

| Rule | Standard | Severity |
|------|----------|----------|
| Tailwind only | No inline styles unless dynamic | 🔴 Blocking |
| CSS variables | Use design tokens from `globals.css` | 🟡 Warning |
| `cn()` utility | Required for conditional classes | 🔴 Blocking |
| No `!important` | Use specificity instead | 🔴 Blocking |
| Responsive design | Must support mobile (sm), tablet (md), desktop (lg) | 🟡 Warning |

---

## 2. Architecture Standards

### 2.1 Directory Structure

| Path | Purpose | Rule |
|------|---------|------|
| `app/*/page.tsx` | Route pages | Only page-level components |
| `components/ui/` | shadcn/ui components | **Do not modify** — use `pnpx shadcn add` |
| `components/design-system/` | Brand design system | Requires design review |
| `components/<feature>/` | Feature modules | Grouped by business domain |
| `docs/*.tsx` | Interactive documentation | TSX format with tab navigation |
| `lib/` | Shared utilities | Pure functions only |
| `hooks/` | Custom React hooks | Must include TypeScript generics |

### 2.2 Route Standards

| Rule | Standard | Severity |
|------|----------|----------|
| Route directory | `kebab-case`: `project-execution/` | 🔴 Blocking |
| Page file | Must export default function | 🔴 Blocking |
| Layout nesting | Use route groups `(group)/` for shared layouts | 🟡 Warning |
| Metadata | Every page must export `metadata` or `generateMetadata` | 🟡 Warning |
| Loading states | Add `loading.tsx` for data-heavy pages | 🟢 Info |

---

## 3. Security Standards

### 3.1 Mandatory Checks

| Check | Criteria | Severity |
|-------|----------|----------|
| Dependency audit | `pnpm audit` must pass with 0 critical/high | 🔴 Blocking |
| No hardcoded secrets | No API keys, tokens, or passwords in source | 🔴 Blocking |
| Environment variables | All secrets via `.env` + `NEXT_PUBLIC_` prefix | 🔴 Blocking |
| Input sanitization | All user inputs validated with Zod schemas | 🔴 Blocking |
| XSS prevention | No `dangerouslySetInnerHTML` without sanitization | 🔴 Blocking |

### 3.2 Version Management

| Rule | Standard | Severity |
|------|----------|----------|
| No `"latest"` | All dependencies must use explicit semver | 🔴 Blocking |
| CVE patches | Critical CVEs must be patched within 48h | 🔴 Blocking |
| Lock file | `pnpm-lock.yaml` must be committed | 🔴 Blocking |
| Peer dependencies | Must be resolved before merge | 🟡 Warning |

---

## 4. Performance Standards

### 4.1 Bundle Budget

| Metric | Threshold | Severity |
|--------|-----------|----------|
| First Load JS | < 200KB per route | 🟡 Warning |
| CSS per route | < 50KB | 🟡 Warning |
| Image optimization | Use `next/image` with proper sizing | 🔴 Blocking |
| Font loading | Use `next/font` (no external CSS) | 🟡 Warning |
| Dynamic imports | Required for components > 10KB | 🟡 Warning |

### 4.2 Rendering Standards

| Rule | Standard | Severity |
|------|----------|----------|
| Server Components | Default; use `"use client"` only when necessary | 🟡 Warning |
| Suspense boundaries | Required for async data loading | 🟡 Warning |
| Loading states | `loading.tsx` for every route with data fetching | 🟢 Info |
| Error boundaries | `error.tsx` for every route group | 🟢 Info |

---

## 5. Accessibility Standards

| Rule | Standard | Severity |
|------|----------|----------|
| Semantic HTML | Use proper HTML elements (`<nav>`, `<main>`, `<section>`) | 🔴 Blocking |
| ARIA labels | Required for interactive elements | 🔴 Blocking |
| Keyboard navigation | All interactive elements must be focusable | 🔴 Blocking |
| Color contrast | WCAG AA minimum (4.5:1 for text) | 🟡 Warning |
| Alt text | All `<img>` and `next/image` must have `alt` | 🔴 Blocking |
| Radix primitives | Use Radix UI primitives for complex interactions | 🟡 Warning |

---

## 6. Git & PR Standards

### 6.1 Commit Messages

```
type(scope): description

feat(ai-engine): add streaming response support
fix(design-system): resolve seasonal theme flicker on Safari
docs(readme): update architecture diagram
refactor(components): extract shared card logic
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`

### 6.2 Pull Request Checklist

- [ ] `pnpm lint` passes with zero errors
- [ ] `npx tsc --noEmit` passes with zero errors
- [ ] No `"latest"` in dependency versions
- [ ] New components follow naming conventions
- [ ] Responsive design verified (mobile + desktop)
- [ ] No console.log or debug code left in source
- [ ] Brand references use `YYC³` (not legacy names)
- [ ] Logo assets use `yyc3-icons/` paths (not `/logo.png`)

### 6.3 Review Requirements

| Change Type | Reviewers Required | Criteria |
|-------------|-------------------|----------|
| Feature | 1 | Code quality + functionality |
| Design System | 2 | Design consistency + accessibility |
| Security | 2 | Security review + dependency audit |
| Infrastructure | 1 | Build + deployment verification |

---

## 7. Documentation Standards

| Rule | Standard | Severity |
|------|----------|----------|
| README accuracy | Must reflect current tech stack versions | 🟡 Warning |
| CHANGELOG update | Required for every version bump | 🔴 Blocking |
| Component docs | Complex components need JSDoc comments | 🟢 Info |
| API documentation | New API routes must be documented | 🟡 Warning |

---

## 8. Audit Scoring

### Score Calculation

```
Blocking (🔴) violations × 10  = Critical points
Warning  (🟡) violations × 3   = Warning points
Info     (🟢) violations × 1   = Info points

Score = 100 - (Critical + Warning + Info)
```

### Quality Gates

| Score | Grade | Action |
|-------|-------|--------|
| 90-100 | A (Excellent) | Approve |
| 80-89 | B (Good) | Approve with minor notes |
| 70-79 | C (Acceptable) | Request changes for blocking items |
| 60-69 | D (Needs Work) | Request significant changes |
| < 60 | F (Reject) | Full rewrite required |
