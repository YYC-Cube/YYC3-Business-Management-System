# Contributing to YYC³ Business Management System

Thank you for your interest in contributing! This guide outlines the development standards and workflows for this project.

## Development Setup

### Prerequisites

- Node.js >= 18.17
- pnpm >= 8.0
- Git

### Getting Started

```bash
# Fork and clone the repository
git clone <your-fork-url>
cd yyc3-business-management

# Install dependencies
pnpm install

# Start development server (port 3144)
pnpm dev
```

## Project Architecture

```
app/              → Next.js App Router pages (50+ routes)
components/ui/    → shadcn/ui base components (do not modify directly)
components/*/     → Feature modules (ai-engine, data-center, etc.)
components/design-system/ → Brand design system
docs/             → Interactive TSX developer documentation
public/yyc3-icons/ → Multi-platform logo assets
```

## Code Standards

### TypeScript

- **Strict mode** is enabled (`tsconfig.json`: `"strict": true`)
- All components must have complete type definitions
- Use `interface` for object types, `type` for unions/intersections
- Avoid `any`; use `unknown` when type is truly unknown

### Component Conventions

- **PascalCase** for component files and names: `UserList.tsx`
- **camelCase** for functions, hooks, and variables: `useSeasonalTheme`
- **kebab-case** for route directories: `project-execution/`
- Each component file exports one primary named export
- Use `"use client"` directive only when component uses client-side features

### Styling

- **Tailwind CSS v4** with `@import "tailwindcss"` in `globals.css`
- Use design tokens defined in CSS variables (`:root` block)
- Follow shadcn/ui patterns for component styling
- Use `cn()` utility from `@/lib/utils` for conditional classes

### Import Order

```typescript
// 1. React / Next.js
import { useState } from "react"
import Image from "next/image"

// 2. External libraries
import { Users, Settings } from "lucide-react"

// 3. UI components (shadcn/ui)
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// 4. Feature components
import { EnhancedCard } from "@/components/design-system/enhanced-card-system"

// 5. Hooks and utilities
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
```

## Git Workflow

### Branch Naming

```
feat/<feature-name>      # New features
fix/<bug-name>           # Bug fixes
docs/<doc-name>          # Documentation
refactor/<scope>         # Code refactoring
style/<scope>            # Styling changes
chore/<scope>            # Build/tooling changes
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add user export functionality
fix: resolve sidebar collapse animation flicker
docs: update API reference documentation
refactor: extract shared card logic into base component
style: align button spacing in settings page
chore: upgrade Next.js to 15.3.6
```

### Pull Request Process

1. Create a feature branch from `main`
2. Make your changes with clear, atomic commits
3. Ensure `pnpm lint` passes with no errors
4. Verify TypeScript compilation: `npx tsc --noEmit`
5. Test the full application: `pnpm dev` → verify on `http://localhost:3144`
6. Submit PR with a clear description of changes

## Component Development

### Creating a New Page

```bash
# Create route directory
mkdir -p app/<route-name>

# Create page file
touch app/<route-name>/page.tsx
```

### Creating a New Component

```bash
# Add shadcn/ui component (if available)
pnpx shadcn@latest add <component-name>

# Or create custom component
touch components/<module>/<component-name>.tsx
```

### Component Template

```typescript
"use client"

import { cn } from "@/lib/utils"

interface MyComponentProps {
  className?: string
  title: string
}

export function MyComponent({ className, title }: MyComponentProps) {
  return (
    <div className={cn("p-4", className)}>
      <h2>{title}</h2>
    </div>
  )
}
```

## Design System

### Brand Colors

Defined in `app/globals.css` as CSS variables:

| Token | Purpose |
|-------|---------|
| `--primary-*` | Primary brand blue (50-900) |
| `--secondary-*` | Neutral grays (50-900) |
| `--accent-*` | Accent purple (50-900) |
| `--traditional-*` | Chinese traditional colors |

### Logo Usage

```typescript
import { Logo } from "@/components/design-system/logo"
import { LogoEnhanced } from "@/components/design-system/logo-enhanced"

// Basic logo
<Logo size="md" variant="full" animated />

// Enhanced with layout options
<LogoEnhanced size="sm" variant="full" layout="vertical" animated />
```

## Testing

```bash
# Lint check
pnpm lint

# Type check
npx tsc --noEmit

# Build verification
pnpm build
```

## Reporting Issues

When filing an issue, please include:

1. **Environment**: Node.js version, pnpm version, OS
2. **Steps to reproduce**: Clear, minimal reproduction steps
3. **Expected behavior**: What should happen
4. **Actual behavior**: What actually happens
5. **Screenshots**: If applicable
