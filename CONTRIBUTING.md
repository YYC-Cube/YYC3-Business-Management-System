# Contributing to YYC³ Business Management System

首先，感谢你考虑为 YYC³ 做贡献！正是像你这样的人让 YYC³ 成为一个优秀的开源工具。

> **_YanYuCloudCube_** — 言启千行代码，语枢万物智能

## 📜 Code of Conduct

本项目采用开放、友善的社区准则。参与贡献即表示你同意尊重每一位社区成员。

## 🔧 Development Setup

### Prerequisites

- Node.js >= 18.17
- pnpm >= 8.0
- Git

### Getting Started

```bash
# 1. Fork 并克隆仓库
git clone https://github.com/<your-username>/YYC3-Business-Management-System.git
cd YYC3-Business-Management-System

# 2. 安装依赖
pnpm install

# 3. 启动开发服务器 (端口 3144)
pnpm dev

# 4. 浏览器访问
open http://localhost:3144
```

## 🏗️ Project Architecture

```
app/                          → Next.js App Router 页面 (50+ 路由)
components/ui/                → shadcn/ui 基础组件 (pnpx shadcn add 管理)
components/design-system/     → 品牌设计系统 (需设计审核)
components/<feature>/         → 功能模块组件
docs/                         → 交互式 TSX 开发者文档
public/yyc3-icons/            → 全端 Logo 资源
hooks/                        → 自定义 React Hooks
lib/                          → 工具函数库 (纯函数)
```

## 📐 Code Standards

### TypeScript

- **Strict mode** 已启用 (`tsconfig.json`: `"strict": true`)
- 所有组件必须具备完整的类型定义
- 对象类型使用 `interface`，联合/交叉类型使用 `type`
- 禁止使用 `any`；类型未知时使用 `unknown`

### Component Conventions

- 组件文件和名称使用 **PascalCase**: `UserList.tsx`
- 函数、Hook、变量使用 **camelCase**: `useSeasonalTheme`
- 路由目录使用 **kebab-case**: `project-execution/`
- 每个组件文件导出一个主命名导出
- 仅在需要客户端功能时使用 `"use client"` 指令

### Styling

- 使用 **Tailwind CSS v4**，在 `globals.css` 中 `@import "tailwindcss"`
- 使用 CSS 变量中定义的设计令牌 (`:root` 块)
- 遵循 shadcn/ui 组件样式模式
- 使用 `@/lib/utils` 中的 `cn()` 工具函数处理条件类名

### Import Order

```typescript
// 1. React / Next.js
import { useState } from "react"
import Image from "next/image"

// 2. 外部库
import { Users, Settings } from "lucide-react"

// 3. UI 组件 (shadcn/ui)
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// 4. 功能组件
import { EnhancedCard } from "@/components/design-system/enhanced-card-system"

// 5. Hooks 和工具函数
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
```

## 🌿 Git Workflow

### Branch Naming

```
feat/<feature-name>      # 新功能
fix/<bug-name>           # Bug 修复
docs/<doc-name>          # 文档更新
refactor/<scope>         # 代码重构
style/<scope>            # 样式调整
chore/<scope>            # 构建/工具变更
```

### Commit Messages

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
feat: add user export functionality
fix: resolve sidebar collapse animation flicker
docs: update API reference documentation
refactor: extract shared card logic into base component
style: align button spacing in settings page
chore: upgrade Next.js to 15.3.6
```

### Pull Request Process

1. 从 `main` 创建功能分支
2. 使用清晰、原子性的 commit 提交变更
3. 确保 `pnpm lint` 零错误通过
4. 验证 TypeScript 编译: `npx tsc --noEmit`
5. 全量测试: `pnpm dev` → 在 `http://localhost:3144` 验证
6. 提交 PR 并附上清晰的变更描述

## 🧩 Component Development

### Creating a New Page

```bash
# 创建路由目录
mkdir -p app/<route-name>

# 创建页面文件
touch app/<route-name>/page.tsx
```

### Creating a New Component

```bash
# 添加 shadcn/ui 组件 (如有)
pnpx shadcn@latest add <component-name>

# 或创建自定义组件
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

## 🎨 Design System

### Brand Colors

在 `app/globals.css` 中定义为 CSS 变量：

| Token | Purpose |
|-------|---------|
| `--primary-*` | 主品牌蓝色 (50-900) |
| `--secondary-*` | 中性灰色 (50-900) |
| `--accent-*` | 强调紫色 (50-900) |
| `--traditional-*` | 中国传统色彩 |

### Logo Usage

```typescript
import { Logo } from "@/components/design-system/logo"
import { LogoEnhanced } from "@/components/design-system/logo-enhanced"

// 基础 Logo
<Logo size="md" variant="full" animated />

// 增强版（含布局选项）
<LogoEnhanced size="sm" variant="full" layout="vertical" animated />
```

## ✅ Quality Checklist

提交 PR 前请确认：

- [ ] `pnpm lint` 零错误
- [ ] `npx tsc --noEmit` 零错误
- [ ] 无 `"latest"` 依赖版本
- [ ] 新组件遵循命名规范
- [ ] 响应式设计验证 (移动端 + 桌面端)
- [ ] 无遗留 `console.log` 或调试代码
- [ ] 品牌引用使用 `YYC³` (非旧名称)
- [ ] Logo 资源使用 `yyc3-icons/` 路径

## 📋 Testing

```bash
# Lint 检查
pnpm lint

# 类型检查
npx tsc --noEmit

# 构建验证
pnpm build
```

## 🏷️ Version & Release

本项目遵循 [Semantic Versioning](https://semver.org/)：

- **PATCH**: Bug 修复、内容修正 → `v1.0.0` → `v1.0.1`
- **MINOR**: 新增功能、向下兼容 → `v1.0.0` → `v1.1.0`
- **MAJOR**: 不兼容变更、架构重组 → `v1.0.0` → `v2.0.0`

## 📄 License

通过向本项目贡献代码，你同意你的贡献将在 **MIT License** 下授权。

---

<div align="center">

*言启千行代码，语枢万物智能*

**YanYuCloudCube Team** · [GitHub](https://github.com/YYC-Cube)

</div>
