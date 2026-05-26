<p align="center">
  <img src="public/yyc3-Family.png" alt="YYC³ Business Management System" width="640" />
</p>

<h1 align="center">YYC³ Business Management System</h1>

<p align="center">
  <strong>万象归元于云枢，深栈智启新纪元</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15.3.6-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2.6-61DAFB?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/shadcn/ui-New_York-000000?logo=shadcnui" alt="shadcn/ui" />
  <img src="https://img.shields.io/badge/pnpm-10.x-F69220?logo=pnpm" alt="pnpm" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License" />
  <img src="https://img.shields.io/badge/Node.js-%3E%3D18.17-339933?logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen" alt="PRs Welcome" />
  <img src="https://img.shields.io/badge/Version-1.0.0-blue" alt="Version" />
</p>

---

## Overview

YYC³ Business Management System 是基于 **Next.js 15 + React 19 + shadcn/ui + Tailwind CSS v4** 构建的企业级智能商务管理系统。采用模块化架构设计，提供 50+ 页面路由和完整的组件体系，覆盖数据中心、AI 引擎、项目管理、DevOps 等核心业务场景。

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    YYC³ Business Management System              │
├─────────────┬─────────────┬─────────────┬──────────────────────┤
│   App Router│   Design    │  Business   │     Developer        │
│   (50+ 路由)│   System    │  Modules    │     Toolchain        │
├─────────────┼─────────────┼─────────────┼──────────────────────┤
│ ○ dashboard │ ◆ 动画系统  │ ◆ AI 引擎   │ Next.js 15.3 (App)   │
│ ○ analytics │ ◆ 季节主题  │ ◆ 数据中心  │ React 19.2 (RSC)     │
│ ○ users     │ ◆ 响应式    │ ○ 协作引擎  │ TypeScript 5.9       │
│ ○ ai        │ ◆ 音效系统  │ ○ 微信集成  │ Tailwind CSS 4.3     │
│ ○ reports   │ ◆ 品牌色彩  │ ○ 项目管理  │ shadcn/ui (NY)       │
│ ○ settings  │ ◆ 增强卡片  │ ○ DevOps    │ Radix UI (28 组件)   │
│ ○ ...       │ ◆ 增强按钮  │ ○ 用户管理  │ pnpm 10.x            │
├─────────────┴─────────────┴─────────────┴──────────────────────┤
│                        Infrastructure                           │
├────────────────┬────────────────┬───────────────────────────────┤
│  Docker        │  CI/CD         │  PWA                          │
│  Containerized │  GitHub Actions│  iOS / Android / Web / macOS  │
└────────────────┴────────────────┴───────────────────────────────┘
```

## Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Framework | Next.js (App Router + RSC) | 15.3.6 |
| UI Library | React | 19.2.6 |
| Language | TypeScript | 5.9.3 |
| CSS Engine | Tailwind CSS v4 | 4.3.0 |
| UI Components | shadcn/ui (New York) + Radix UI | 28 components |
| Charts | Recharts | 2.15.4 |
| Forms | React Hook Form + Zod | 7.62 / 3.25 |
| Package Manager | pnpm | 10.x |
| Runtime | Node.js | >= 18.17 |
| Container | Docker + Docker Compose | Latest |
| CI/CD | GitHub Actions | - |

## Directory Structure

```
yyc3-business-management/
├── app/                          # Next.js App Router 页面
│   ├── layout.tsx                # 根布局
│   ├── page.tsx                  # 首页入口
│   ├── globals.css               # 全局样式 + CSS 变量
│   ├── ai/                       # AI 智能模块
│   ├── analytics/                # 数据分析模块
│   ├── business/                 # 商务管理模块
│   ├── chat/                     # 实时通讯模块
│   ├── crm/                      # CRM 客户管理
│   ├── dashboard/                # 数据中心
│   ├── docs/                     # 文档中心 (6 子页面)
│   ├── erp/                      # ERP 系统
│   ├── settings/                 # 系统设置 (4 子页面)
│   └── users/                    # 用户管理
├── components/
│   ├── ui/                       # shadcn/ui 基础组件 (48 个)
│   ├── design-system/            # 设计系统 (品牌/动画/主题/音效)
│   ├── ai-engine/                # AI 引擎组件
│   ├── data-center/              # 数据中心组件
│   ├── devops/                   # DevOps 组件
│   ├── project-management/       # 项目管理组件
│   └── user-management/          # 用户管理组件
├── docs/                         # 开发者文档 (TSX 交互式)
│   ├── current-status-analysis.tsx
│   ├── development-analysis-report.tsx
│   ├── development-roadmap.tsx
│   └── technical-specifications.tsx
├── public/
│   └── yyc3-icons/               # 全端 Logo 资源
│       ├── Android/              # mdpi → xxxhdpi + Play Store
│       ├── iOS/                  # Notification → App Store
│       ├── macOS/                # 16px → 1024px
│       ├── Web App/              # favicon + chrome + apple-touch
│       └── watchOS/              # Home Screen + Notification
├── hooks/                        # 自定义 React Hooks
├── lib/                          # 工具函数库
├── scripts/                      # 部署脚本 + CI/CD
└── styles/                       # 全局样式备份
```

## Quick Start

### Prerequisites

- Node.js >= 18.17
- pnpm >= 8.0

### Install & Run

```bash
# 克隆项目
git clone <repository-url>
cd yyc3-business-management

# 安装依赖
pnpm install

# 启动开发服务器 (端口 3144)
pnpm dev

# 浏览器访问
open http://localhost:3144
```

### Build & Deploy

```bash
# 生产构建
pnpm build

# 启动生产服务器
pnpm start

# Docker 部署
cd scripts
docker-compose -f docker-compose.prod.yml up -d
```

### Code Quality

```bash
# ESLint 检查
pnpm lint

# TypeScript 类型检查
npx tsc --noEmit
```

## Feature Modules

| Module                 | Description　　　　　　　　　　　　　　　| Pages         |
| ------------------------| ------------------------------------------| ---------------|
| **AI Engine**          | AI 助手、智能分析、推荐引擎　　　　　　　| 3 components  |
| **Data Center**        | 动态数据中心、协作引擎、微信集成　　　　 | 3 components  |
| **Design System**      | 动画、季节主题、音效、响应式布局　　　　 | 14 components |
| **DevOps**             | CI/CD 看板　　　　　　　　　　　　　　　 | 1 component   |
| **Project Management** | 敏捷工作流、开发执行　　　　　　　　　　 | 2 components  |
| **User Management**    | 用户列表与权限　　　　　　　　　　　　　 | 1 component   |
| **Business**           | ERP、CRM、API 管理、移动应用　　　　　　 | 7 pages       |
| **Analytics**          | 数据概览、报表、实时监控　　　　　　　　 | 3 pages       |
| **Content**            | 文章、自媒体、分类、营销　　　　　　　　 | 4 pages       |
| **System**             | 常规/安全/通知/外观设置　　　　　　　　　| 4 pages       |
| **Docs**               | API 参考、架构、组件、设计系统、开发指南 | 6 pages       |

## Brand Assets

Logo 资源位于 `public/yyc3-icons/`，已全端适配：

| Platform | Path | Sizes |
|----------|------|-------|
| Web | `yyc3-icons/Web App/` | favicon-16/32, apple-touch-icon, chrome-192/512 |
| Android | `yyc3-icons/Android/` | mdpi → xxxhdpi + Play Store |
| iOS | `yyc3-icons/iOS/` | Notification → App Store (全尺寸) |
| macOS | `yyc3-icons/macOS/` | 16px → 1024px |
| watchOS | `yyc3-icons/watchOS/` | Notification, Home Screen, Short Look |

## Documentation

| Document                                 | Description　　　　　　　　　　　 |
| ------------------------------------------| -----------------------------------|
| [CHANGELOG.md](CHANGELOG.md)             | 版本变更日志　　　　　　　　　　　|
| [CONTRIBUTING.md](CONTRIBUTING.md)       | 贡献指南与开发规范　　　　　　　　|
| [ANALYSIS.md](ANALYSIS.md)               | 全局技术分析报告　　　　　　　　　|
| [AUDIT-STANDARDS.md](AUDIT-STANDARDS.md) | 全局审核标准　　　　　　　　　　　|
| `/docs/*.tsx`                            | 交互式开发文档 (路线图/规范/分析) |

## License

[MIT](LICENSE)

---

<p align="center">
  <sub>Built with ♥ by <strong>YYC³ Team</strong></sub>
</p>
