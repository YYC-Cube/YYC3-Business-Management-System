# Changelog

All notable changes to the YYC³ Business Management System will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-05-26

### Added

- **50+ page routes** covering dashboard, analytics, AI engine, business, content, CRM, ERP, DevOps, user management, system settings, and documentation center
- **Design System** with 14 custom components: animation system, seasonal themes, sound effects, responsive layout, brand colors, enhanced cards/buttons, logo system
- **48 shadcn/ui base components** (New York style) with Radix UI primitives
- **AI Engine** module: AI assistant, intelligent analysis, recommendation engine
- **Data Center** module: dynamic data center, collaboration engine, WeChat integration
- **Project Management** module: agile workflow, development execution tracking
- **DevOps** module: CI/CD pipeline dashboard
- **User Management** module: user list with role-based permissions
- **Full-platform logo assets** for Web, Android, iOS, macOS, and watchOS
- **PWA support** with complete icon sets and manifest
- **Docker deployment** configuration with dev/prod compose files
- **CI/CD pipeline** via GitHub Actions
- **Interactive developer documentation** (TSX-based): development roadmap, technical specifications, current status analysis, development analysis report
- **Documentation center** with 6 sub-pages: API reference, architecture, components, design system, development guide

### Changed

- **Brand unified** to `YYC³ Business Management System` across all 60+ source files
- **Logo replaced** from `/logo.png` to `/yyc3-icons/` multi-platform assets
- **Next.js upgraded** from 15.2.4 to 15.3.6 (fixes CVE-2025-66478)
- **React upgraded** from 19.1.1 to 19.2.6 (fixes CVE-2025-55182)
- **Tailwind CSS upgraded** from 4.1.9 to 4.3.0
- **TypeScript upgraded** from 5.x to 5.9.3
- **All Radix UI dependencies** pinned from `"latest"` to explicit semver ranges
- **Dev port fixed** to 3144
- **Package name** changed from `my-v0-project` to `yyc3-business-management`

### Removed

- **`util` package** (Node.js built-in, unnecessary in browser context)
- **`autoprefixer` dependency** (built into Tailwind CSS v4)
- **Stale `/logo.png` references** across all source files

### Security

- Patched **CVE-2025-66478** (Next.js RCE vulnerability, CVSS 10.0)
- Patched **CVE-2025-55182** (React Server Components vulnerability)
- Removed all `"latest"` version specifiers to ensure reproducible builds
