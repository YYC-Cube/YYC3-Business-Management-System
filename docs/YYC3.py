#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
file YYC3.py
description YYC³ Business Management System 文档模版引擎 - 可复用、可迭代、可追溯的文档闭环生成系统
author YanYuCloudCube Team
version v3.1.0
created 2026-05-01
updated 2026-05-19
copyright Copyright (c) 2026 YYC3
license MIT
"""

import os
import sys
import json
import hashlib
import datetime
import argparse
import logging
from pathlib import Path
from typing import Dict, List, Tuple, Optional, Any
from dataclasses import dataclass, field
from enum import Enum

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger(__name__)

PROJECT_ABBR = "PFO"
PROJECT_NAME = "Portfolio"
PROJECT_NAME_CN = "创意作品集"

TODAY = datetime.datetime.now().strftime("%Y-%m-%d")


class DocumentType(Enum):
    MAIN = "main"
    README = "readme"
    ROOT_README = "root_readme"
    RESERVED = "reserved"
    TEMPLATE = "template"
    ROOT_DOC = "root_doc"


@dataclass
class DocumentMetadata:
    file_name: str
    description: str
    author: str = "YanYuCloudCube Team"
    version: str = "v3.1.0"
    created: str = field(default_factory=lambda: TODAY)
    updated: str = field(default_factory=lambda: TODAY)
    status: str = "published"
    tags: List[str] = field(default_factory=list)
    checksum: str = ""
    parent_doc: str = ""
    related_docs: List[str] = field(default_factory=list)
    category: str = ""
    language: str = "zh-CN"


class YYC3TemplateEngine:
    BRAND_HEADER = """> ***YanYuCloudCube***
> *言启象限 | 语枢未来*
> ***Words Initiate Quadrants, Language Serves as Core for Future***
> *万象归元于云枢 | 深栈智启新纪元*
> ***All things converge in cloud pivot; Deep stacks ignite a new era of intelligence***"""

    BRAND_FOOTER = """<div align="center">

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in cloud pivot; Deep stacks ignite a new era of intelligence***」

**© 2025-2026 YYC³ Team. All Rights Reserved.**
</div>"""

    CORE_PHILOSOPHY = """## 核心理念

**五高架构**：高可用 | 高性能 | 高安全 | 高扩展 | 高智能
**五标体系**：标准化 | 规范化 | 自动化 | 可视化 | 智能化
**五化转型**：流程化 | 数字化 | 生态化 | 工具化 | 服务化
**五维评估**：时间维 | 空间维 | 属性维 | 事件维 | 关联维"""

    def __init__(self, output_dir: str = "docs"):
        self.output_dir = Path(output_dir)
        self.document_registry: Dict[str, DocumentMetadata] = {}
        self.traceability_chain: List[Dict] = []

    def generate_checksum(self, content: str) -> str:
        return hashlib.sha256(content.encode('utf-8')).hexdigest()[:16]

    def _build_frontmatter(self, metadata: DocumentMetadata) -> str:
        tags_str = ','.join(metadata.tags) if metadata.tags else ''
        return f"""---
file: {metadata.file_name}
description: {metadata.description}
author: {metadata.author}
version: {metadata.version}
created: {metadata.created}
updated: {metadata.updated}
status: {metadata.status}
tags: {tags_str}
category: {metadata.category}
language: {metadata.language}
---"""

    def generate_main_document(self, metadata: DocumentMetadata, content_sections: Dict[str, str]) -> str:
        title = metadata.file_name.replace('.md', '').replace('-', ' ')
        sections_content = ""
        for section_name, section_content in content_sections.items():
            sections_content += f"## {section_name}\n\n{section_content}\n\n---\n\n"

        content = f"""{self._build_frontmatter(metadata)}

{self.BRAND_HEADER}

---

# {title}

{self.CORE_PHILOSOPHY}

---

## 文档概述

{metadata.description}

---

{sections_content}
## 文档追溯信息

| 属性 | 值 |
|------|-----|
| 文档版本 | {metadata.version} |
| 创建日期 | {metadata.created} |
| 更新日期 | {metadata.updated} |
| 内容校验 | {metadata.checksum} |
| 关联文档 | {', '.join(metadata.related_docs) if metadata.related_docs else '无'} |

---

{self.BRAND_FOOTER}
"""
        return content

    def generate_readme_document(self, dir_name: str, dir_description: str, doc_list: List[Dict]) -> str:
        doc_table = "| 序号 | 文档名称 | 描述 | 标签 |\n|------|----------|------|------|\n"
        for idx, doc in enumerate(doc_list, 1):
            doc_table += f"| {idx} | [{doc['name']}]({doc['name']}) | {doc['description']} | {doc.get('tags', '-')} |\n"

        return f"""---
file: README.md
description: {dir_name} 目录文档索引
author: YanYuCloudCube Team
version: v3.1.0
created: {TODAY}
updated: {TODAY}
status: published
tags: [文档索引],[README],[{PROJECT_ABBR}]
category: {dir_name}
language: zh-CN
---

{self.BRAND_HEADER}

---

# {dir_name}

{self.CORE_PHILOSOPHY}

---

## 目录概述

{dir_description}

---

## 文档索引

{doc_table}

---

## 文档规范

- **命名规范**：`{{编号}}-{PROJECT_ABBR}-{{阶段}}-{{模块}}-{{文档名称}}.md`
- **版本规范**：主版本.次版本.修订版本 (如 v3.1.0)
- **标签规范**：使用方括号包裹，如 `[标签1],[标签2]`

---

{self.BRAND_FOOTER}
"""

    def generate_traceability_record(self, doc_metadata: DocumentMetadata, action: str) -> Dict:
        return {
            "timestamp": datetime.datetime.now().isoformat(),
            "document": doc_metadata.file_name,
            "action": action,
            "version": doc_metadata.version,
            "checksum": doc_metadata.checksum,
            "author": doc_metadata.author
        }

    def save_document(self, content: str, output_path: str) -> bool:
        try:
            path = Path(output_path)
            path.parent.mkdir(parents=True, exist_ok=True)
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
            logger.info(f"文档已保存: {output_path}")
            return True
        except Exception as e:
            logger.error(f"保存文档失败: {e}")
            return False

    def validate_document(self, content: str, rules: Dict[str, Any]) -> Tuple[bool, List[str]]:
        errors = []
        if rules.get('require_brand_header', True):
            if 'YanYuCloudCube' not in content:
                errors.append("缺少品牌标识头")
        if rules.get('require_brand_footer', True):
            if 'admin@0379.email' not in content:
                errors.append("缺少品牌标识尾")
        if rules.get('require_metadata', True):
            if not content.startswith('---'):
                errors.append("缺少元数据块")
        if rules.get('min_length', 0) > 0:
            if len(content) < rules['min_length']:
                errors.append(f"文档长度不足: {len(content)} < {rules['min_length']}")
        return len(errors) == 0, errors

    def export_registry(self, output_path: str) -> None:
        registry_data = {
            "export_time": datetime.datetime.now().isoformat(),
            "project": PROJECT_NAME,
            "total_documents": len(self.document_registry),
            "documents": {
                doc_id: {
                    "file_name": meta.file_name,
                    "description": meta.description,
                    "version": meta.version,
                    "checksum": meta.checksum,
                    "tags": meta.tags,
                    "related_docs": meta.related_docs
                }
                for doc_id, meta in self.document_registry.items()
            },
            "traceability_chain": self.traceability_chain
        }
        path = Path(output_path)
        path.parent.mkdir(parents=True, exist_ok=True)
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(registry_data, f, ensure_ascii=False, indent=2)
        logger.info(f"文档注册表已导出: {output_path}")


class BrainComputerSystemProject:
    PROJECT_STRUCTURE = {
        f"00-{PROJECT_ABBR}-项目总览索引": {
            "description": f"YYC³ {PROJECT_NAME} 项目全局视图与导航",
            "documents": [
                {"id": "001", "name": f"001-{PROJECT_ABBR}-项目总览索引-项目总览手册.md", "desc": "项目立项核心依据与目标范围", "tags": "[总览],[项目]"},
                {"id": "002", "name": f"002-{PROJECT_ABBR}-项目总览索引-文档架构导航.md", "desc": "文档体系导航与索引", "tags": "[导航],[文档]"},
                {"id": "003", "name": f"003-{PROJECT_ABBR}-项目总览索引-快速开始指南.md", "desc": "项目快速启动与使用指南", "tags": "[指南],[快速开始]"},
                {"id": "004", "name": f"004-{PROJECT_ABBR}-项目总览索引-核心概念词典.md", "desc": "项目核心概念与术语定义", "tags": "[概念],[术语]"},
                {"id": "005", "name": f"005-{PROJECT_ABBR}-项目总览索引-版本更新日志.md", "desc": "项目版本迭代与变更记录", "tags": "[版本],[日志]"},
            ]
        },
        f"01-{PROJECT_ABBR}-启动规划阶段": {
            "description": "项目启动与规划管理",
            "subcategories": {
                f"0101-{PROJECT_ABBR}-项目规划": {
                    "documents": [
                        {"id": "001", "name": f"001-{PROJECT_ABBR}-项目规划-项目章程与愿景.md", "desc": "项目立项核心依据", "tags": "[规划],[章程]"},
                        {"id": "002", "name": f"002-{PROJECT_ABBR}-项目规划-项目范围说明书.md", "desc": "项目范围边界定义", "tags": "[范围],[规划]"},
                        {"id": "003", "name": f"003-{PROJECT_ABBR}-项目规划-项目里程碑计划.md", "desc": "阶段里程碑与任务拆解", "tags": "[里程碑],[规划]"},
                    ]
                },
                f"0102-{PROJECT_ABBR}-需求规划": {
                    "documents": [
                        {"id": "001", "name": f"001-{PROJECT_ABBR}-需求规划-业务需求分析.md", "desc": f"{PROJECT_NAME_CN}核心业务需求梳理", "tags": "[需求],[业务]"},
                        {"id": "002", "name": f"002-{PROJECT_ABBR}-需求规划-产品需求文档.md", "desc": "功能规格与验收标准", "tags": "[需求],[PRD]"},
                    ]
                },
                f"0103-{PROJECT_ABBR}-可行性分析": {
                    "documents": [
                        {"id": "001", "name": f"001-{PROJECT_ABBR}-可行性分析-技术可行性分析.md", "desc": "技术风险评估", "tags": "[可行性],[技术]"},
                    ]
                },
                f"0104-{PROJECT_ABBR}-风险管理": {
                    "documents": [
                        {"id": "001", "name": f"001-{PROJECT_ABBR}-风险管理-项目风险评估.md", "desc": "全周期风险识别", "tags": "[风险],[评估]"},
                    ]
                }
            }
        },
        f"02-{PROJECT_ABBR}-项目设计阶段": {
            "description": "系统架构与详细设计",
            "subcategories": {
                f"0201-{PROJECT_ABBR}-架构设计": {
                    "documents": [
                        {"id": "001", "name": f"001-{PROJECT_ABBR}-架构设计-系统架构总览图.md", "desc": f"{PROJECT_NAME_CN}整体架构视图", "tags": "[架构],[设计]"},
                        {"id": "002", "name": f"002-{PROJECT_ABBR}-架构设计-组件架构设计.md", "desc": "组件分层架构设计", "tags": "[架构],[分层]"},
                        {"id": "003", "name": f"003-{PROJECT_ABBR}-架构设计-技术选型论证报告.md", "desc": "Next.js+React+TailwindCSS技术栈选型依据", "tags": "[技术选型],[论证]"},
                    ]
                },
                f"0202-{PROJECT_ABBR}-详细设计": {
                    "documents": [
                        {"id": "001", "name": f"001-{PROJECT_ABBR}-详细设计-页面组件设计.md", "desc": "页面组件体系设计", "tags": "[组件],[UI]"},
                        {"id": "002", "name": f"002-{PROJECT_ABBR}-详细设计-主题系统设计.md", "desc": "自定义主题系统设计", "tags": "[主题],[设计]"},
                        {"id": "003", "name": f"003-{PROJECT_ABBR}-详细设计-动画交互设计.md", "desc": "Framer Motion动画交互设计", "tags": "[动画],[交互]"},
                    ]
                }
            }
        },
        f"03-{PROJECT_ABBR}-开发实施阶段": {
            "description": "代码开发与实施",
            "subcategories": {
                f"0301-{PROJECT_ABBR}-开发环境": {
                    "documents": [
                        {"id": "001", "name": f"001-{PROJECT_ABBR}-开发环境-开发环境搭建指南.md", "desc": "Next.js+pnpm环境配置说明", "tags": "[环境],[搭建]"},
                    ]
                },
                f"0302-{PROJECT_ABBR}-开发规范": {
                    "documents": [
                        {"id": "001", "name": f"001-{PROJECT_ABBR}-开发规范-Git工作流规范.md", "desc": "分支管理策略", "tags": "[Git],[规范]"},
                        {"id": "002", "name": f"002-{PROJECT_ABBR}-开发规范-代码提交规范.md", "desc": "Conventional Commits提交信息格式", "tags": "[提交],[规范]"},
                    ]
                }
            }
        },
        f"04-{PROJECT_ABBR}-测试审核阶段": {
            "description": "质量保障与审核",
            "subcategories": {
                f"0401-{PROJECT_ABBR}-测试策略": {
                    "documents": [
                        {"id": "001", "name": f"001-{PROJECT_ABBR}-测试策略-测试策略总纲.md", "desc": "Jest+React Testing Library测试方案", "tags": "[测试],[策略]"},
                    ]
                },
                f"0402-{PROJECT_ABBR}-质量审核": {
                    "documents": [
                        {"id": "001", "name": f"001-{PROJECT_ABBR}-质量审核-代码质量审核标准.md", "desc": "ESLint+TypeScript Strict质量度量", "tags": "[质量],[审核]"},
                    ]
                }
            }
        },
        f"05-{PROJECT_ABBR}-交付部署阶段": {
            "description": "项目交付与部署",
            "subcategories": {
                f"0501-{PROJECT_ABBR}-交付物管理": {
                    "documents": [
                        {"id": "001", "name": f"001-{PROJECT_ABBR}-交付物管理-交付物清单.md", "desc": "交付物列表", "tags": "[交付],[清单]"},
                    ]
                }
            }
        },
        f"06-{PROJECT_ABBR}-运维保障阶段": {
            "description": "系统运维与保障",
            "subcategories": {
                f"0601-{PROJECT_ABBR}-运维策略": {
                    "documents": [
                        {"id": "001", "name": f"001-{PROJECT_ABBR}-运维策略-运维策略总纲.md", "desc": "Vercel部署运维方案", "tags": "[运维],[策略]"},
                    ]
                }
            }
        },
        f"07-{PROJECT_ABBR}-合规安全保障": {
            "description": "安全与合规管理",
            "subcategories": {
                f"0701-{PROJECT_ABBR}-安全管理": {
                    "documents": [
                        {"id": "001", "name": f"001-{PROJECT_ABBR}-安全管理-安全开发规范.md", "desc": "安全编码标准", "tags": "[安全],[规范]"},
                    ]
                }
            }
        },
        f"08-{PROJECT_ABBR}-资产知识管理": {
            "description": "资产与知识管理",
            "subcategories": {
                f"0801-{PROJECT_ABBR}-资产管理": {
                    "documents": [
                        {"id": "001", "name": f"001-{PROJECT_ABBR}-资产管理-资产清单.md", "desc": "项目资产列表", "tags": "[资产],[清单]"},
                    ]
                }
            }
        },
        f"09-{PROJECT_ABBR}-智能演进优化": {
            "description": "持续演进与优化",
            "subcategories": {
                f"0901-{PROJECT_ABBR}-质量提升": {
                    "documents": [
                        {"id": "001", "name": f"001-{PROJECT_ABBR}-质量提升-持续改进计划.md", "desc": "优化改进方案", "tags": "[改进],[优化]"},
                    ]
                }
            }
        }
    }


def generate_root_readme(engine: YYC3TemplateEngine, project_root: Path) -> bool:
    content = f"""---
file: README.md
description: YYC³ Portfolio — 言启象限创意作品集
author: YanYuCloudCube Team
version: v1.0.0
created: 2026-05-19
updated: {TODAY}
status: active
tags: [project],[readme],[{PROJECT_ABBR}],[portfolio]
category: general
language: zh-CN
---

{engine.BRAND_HEADER}

---

# YYC³ Portfolio

> **言启象限创意作品集 — 基于「五高五标五化五维」核心架构**

{engine.CORE_PHILOSOPHY}

---

## 项目简介

YYC³ Portfolio 是一个基于 Next.js 14 + React 19 + TypeScript + TailwindCSS 3 的创意作品集网站，融合极简设计与智能美学，展示团队创意作品与服务能力。

## 技术栈

| 层级 | 技术 | 版本 |
|------|------|------|
| 框架 | Next.js | 14.2.25 |
| 语言 | TypeScript | ^5 |
| UI库 | React | ^19 |
| CSS | TailwindCSS | ^3.4.17 |
| 组件库 | Radix UI + shadcn/ui | - |
| 动画 | Framer Motion | latest |
| 表单 | react-hook-form + zod | latest |
| 主题 | next-themes | latest |
| 图标 | Lucide React + Heroicons | latest |
| 包管理 | pnpm | - |

## 功能模块

- **Hero** — 全屏首屏动画展示
- **WearYourStory** — 品牌故事区
- **FeatureCarousel** — 特色功能轮播
- **PortfolioGrid** — 作品展示网格(含分类筛选)
- **Timeline** — 时间线展示
- **Marquee** — 滚动信息展示
- **ContactForm** — 智能表单(zod验证)
- **NewsletterSubscribe** — 邮件订阅
- **主题切换** — 亮色/暗色模式

## 项目结构

```
yyc3-portfolio/
├── app/
│   ├── components/          # 页面组件
│   │   ├── Header.tsx       # 导航栏+主题切换
│   │   ├── Hero.tsx         # 首屏展示
│   │   ├── Footer.tsx       # 页脚
│   │   ├── FeatureCarousel.tsx
│   │   ├── PortfolioGrid.tsx
│   │   ├── ContactForm.tsx
│   │   └── ...              # 其他组件
│   ├── globals.css          # 全局样式+主题变量
│   ├── layout.tsx           # 根布局
│   └── page.tsx             # 首页
├── components/ui/           # 52个shadcn/ui组件
├── lib/utils.ts             # 工具函数
├── hooks/                   # 自定义hooks
├── Public/                  # 静态资源
├── YYC3-团队通用-标准规范/   # 团队规范文档
├── docs/                    # 十阶段文档体系
├── package.json
├── next.config.mjs
├── tailwind.config.js
└── tsconfig.json
```

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 代码检查
pnpm lint
```

## 开发规范

本项目严格遵循 YYC³ 团队开发标准，详见 `YYC3-团队通用-标准规范/` 目录。

## 文档体系

完整文档体系遵循「十阶段文档架构」，详见 `docs/` 目录。

---

{engine.BRAND_FOOTER}
"""
    return engine.save_document(content, str(project_root / "README.md"))


def generate_changelog(engine: YYC3TemplateEngine, project_root: Path) -> bool:
    content = f"""---
file: CHANGELOG.md
description: YYC³ Brain Computer System 版本变更日志
author: YanYuCloudCube Team
version: v3.1.0
created: 2026-05-19
updated: {TODAY}
status: active
tags: [changelog],[version],[{PROJECT_ABBR}]
category: general
language: zh-CN
---

{engine.BRAND_HEADER}

---

# 变更日志

{engine.CORE_PHILOSOPHY}

---

所有重要变更均记录在此文件中。格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/)，版本号遵循 [SemVer 2.0.0](https://semver.org/lang/zh-CN/)。

---

## [v3.1.0] - {TODAY}

### 新增
- 全局首次详细全链路深度分析审核报告
- 建议规划实施方案（四阶段）
- YYC3.py 修复与适配 Brain Computer System 项目
- 根目录开发文档五件套 (README/CHANGELOG/CONTRIBUTING/.env.example/LICENSE)
- 十阶段文档架构目录结构
- tsconfig.json / .gitignore / index.html 基础设施文件

### 变更
- YYC3.py: 修复 DocumentMetadata 字段名Bug（移除 FAMILY 前缀）
- YYC3.py: 修复 generate_main_document 属性引用错误
- YYC3.py: 适配 Brain Computer System 项目结构
- YYC3.py: 统一 frontmatter 格式（符合团队规范）

---

## [v3.0.0] - 2026-05-01

### 新增
- DevOps Phase 6.2: 历史对比 + 告警阈值配置
- DevOps Phase 6.1: 跨端对比仪表板
- DevOps Phase 5: 主题定制系统
- DevOps Phase 3: CLI终端 / IDE视图 / 脚本操作
- DevOps Phase 2: AI决策面板 / 本地文件管理
- DevOps Phase 1: 操作中心 / 巡查模式 / 一键跟进
- DevOps Phase 0: 设备管理 / 数据监控 / 操作审计 / 权限管理
- 8层API架构 (client/config/types/endpoints/hooks/mock/websocket/endpoints-config)
- 自定义主题系统 v2 (6个预设主题 + CSS变量联动)
- 中英双语国际化
- 全局命令面板 (Cmd+K)
- AI模型设置面板 (Cmd+Shift+M)
- 50+ shadcn/ui 组件库
- 18个视觉/交互组件 (粒子/全息/霓虹等)

---

## [v1.0.0] - 2026-02-26

### 新增
- 项目初始化 (React + Vite + TypeScript + TailwindCSS)
- 7个脑机系统核心模块
- 侧边栏导航 + 响应式布局
- WebSocket 管理器
- Mock 数据体系

---

{engine.BRAND_FOOTER}
"""
    return engine.save_document(content, str(project_root / "CHANGELOG.md"))


def generate_contributing(engine: YYC3TemplateEngine, project_root: Path) -> bool:
    content = f"""---
file: CONTRIBUTING.md
description: YYC³ Portfolio 贡献指南
author: YanYuCloudCube Team
version: v1.0.0
created: 2026-05-19
updated: {TODAY}
status: active
tags: [contributing],[guide],[{PROJECT_ABBR}]
category: guide
language: zh-CN
---

{engine.BRAND_HEADER}

---

# 贡献指南

{engine.CORE_PHILOSOPHY}

---

## 参与贡献

感谢您对 YYC³ Portfolio 项目的关注！请遵循以下规范参与贡献。

## 开发环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Git >= 2.40

## 开发流程

### 1. Fork & Clone

```bash
git clone <repository-url>
cd yyc3-portfolio
pnpm install
```

### 2. 分支规范

遵循 Git Flow 工作流：

| 分支类型 | 命名格式 | 示例 |
|----------|----------|------|
| 功能分支 | `feature/{{描述}}` | `feature/portfolio-filter` |
| 修复分支 | `bugfix/{{描述}}` | `bugfix/fix-header-theme` |
| 重构分支 | `refactor/{{描述}}` | `refactor/api-layer` |

### 3. 提交规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/)：

```
<type>(<scope>): <subject>

类型: feat | fix | docs | style | refactor | test | chore
```

**示例**：
```
feat(ui): 新增作品分类筛选功能
fix(theme): 修复暗色模式切换异常
docs(readme): 更新项目技术栈说明
```

### 4. 代码规范

- **文件标头**: 所有代码文件必须包含 JSDoc 标头注释
- **命名规范**: 组件 PascalCase / Hook camelCase / 样式 kebab-case
- **类型安全**: TypeScript Strict Mode，禁止 `any`
- **样式规范**: 使用 TailwindCSS，遵循 shadcn/ui 约定

### 5. 代码标头格式

```typescript
/**
 * file: ComponentName.tsx
 * description: 组件功能描述
 * author: Your Name
 * version: v1.0.0
 * created: YYYY-MM-DD
 * updated: YYYY-MM-DD
 * status: active
 * tags: [component],[module]
 */
```

## 文档规范

所有文档必须包含 YAML Front Matter 标头：

```yaml
---
file: filename.md
description: 文档描述
author: 作者
version: v1.0.0
created: YYYY-MM-DD
updated: YYYY-MM-DD
status: active
tags: [标签1],[标签2]
category: category
language: zh-CN
---
```

## 审核流程

1. 提交 Pull Request
2. 代码审核（代码质量 + 规范符合度）
3. 功能验证（构建通过 + 功能正常）
4. 合并至 develop 分支

---

{engine.BRAND_FOOTER}
"""
    return engine.save_document(content, str(project_root / "CONTRIBUTING.md"))


def generate_env_example(engine: YYC3TemplateEngine, project_root: Path) -> bool:
    content = f"""# YYC³ Portfolio 环境变量配置
# 复制此文件为 .env.local 并填写实际值

# 应用配置
NEXT_PUBLIC_APP_TITLE=YYC³ Portfolio
NEXT_PUBLIC_APP_VERSION=v1.0.0
NEXT_PUBLIC_APP_DESCRIPTION=言启象限创意作品集

# 站点配置
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# 联系表单API (如使用外部服务)
NEXT_PUBLIC_CONTACT_API_URL=

# 分析工具 (可选)
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_VERCEL_ANALYTICS=true
"""
    return engine.save_document(content, str(project_root / ".env.example"))


def generate_license(engine: YYC3TemplateEngine, project_root: Path) -> bool:
    content = f"""MIT License

Copyright (c) 2025-2026 YanYuCloudCube Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
"""
    return engine.save_document(content, str(project_root / "LICENSE"))


def generate_gitignore(project_root: Path) -> bool:
    content = """# Dependencies
node_modules/
.pnp
.pnp.js

# Build
dist/
build/
*.local

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Cache
.cache/
.eslintcache
*.tsbuildinfo

# Python
__pycache__/
*.py[cod]
*.egg-info/
.venv/
venv/

# Coverage
coverage/

# Misc
*.bak
*.tmp
"""
    try:
        path = project_root / ".gitignore"
        path.parent.mkdir(parents=True, exist_ok=True)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        logger.info(f"文件已保存: {path}")
        return True
    except Exception as e:
        logger.error(f"保存文件失败: {e}")
        return False


def generate_tsconfig(project_root: Path) -> bool:
    content = """{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src", "vite-env.d.ts"]
}
"""
    try:
        path = project_root / "tsconfig.json"
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        logger.info(f"文件已保存: {path}")
        return True
    except Exception as e:
        logger.error(f"保存文件失败: {e}")
        return False


def generate_index_html(project_root: Path) -> bool:
    content = """<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>YYC³ Brain Computer System</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/app/main.tsx"></script>
  </body>
</html>
"""
    try:
        path = project_root / "index.html"
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        logger.info(f"文件已保存: {path}")
        return True
    except Exception as e:
        logger.error(f"保存文件失败: {e}")
        return False


def generate_docs_structure(engine: YYC3TemplateEngine, project_root: Path) -> int:
    project = BrainComputerSystemProject()
    docs_dir = project_root / "docs"
    generated = 0

    for stage_key, stage_config in project.PROJECT_STRUCTURE.items():
        stage_dir = docs_dir / stage_key
        stage_dir.mkdir(parents=True, exist_ok=True)

        doc_list = []

        if "documents" in stage_config:
            for doc in stage_config["documents"]:
                doc_list.append({
                    "name": doc["name"],
                    "description": doc["desc"],
                    "tags": doc.get("tags", "-")
                })

        if "subcategories" in stage_config:
            for sub_key, sub_config in stage_config["subcategories"].items():
                sub_dir = stage_dir / sub_key
                sub_dir.mkdir(parents=True, exist_ok=True)

                sub_doc_list = []
                if "documents" in sub_config:
                    for doc in sub_config["documents"]:
                        sub_doc_list.append({
                            "name": doc["name"],
                            "description": doc["desc"],
                            "tags": doc.get("tags", "-")
                        })
                        meta = DocumentMetadata(
                            file_name=doc["name"],
                            description=doc["desc"],
                            tags=[t.strip('[]') for t in doc.get("tags", "").split(",") if t],
                            category=sub_key,
                            related_docs=[]
                        )
                        content = engine.generate_main_document(meta, {
                            "详细内容": f"> 本文档为 {doc['desc']}，待填充详细内容。"
                        })
                        meta.checksum = engine.generate_checksum(content)
                        if engine.save_document(content, str(sub_dir / doc["name"])):
                            generated += 1
                            engine.document_registry[doc["name"]] = meta
                            engine.traceability_chain.append(
                                engine.generate_traceability_record(meta, "create")
                            )

                if sub_doc_list:
                    readme_content = engine.generate_readme_document(
                        sub_key,
                        sub_config.get("description", sub_key),
                        sub_doc_list
                    )
                    engine.save_document(readme_content, str(sub_dir / "README.md"))
                    generated += 1

                doc_list.extend(sub_doc_list)

        if doc_list:
            readme_content = engine.generate_readme_document(
                stage_key,
                stage_config.get("description", stage_key),
                doc_list
            )
            engine.save_document(readme_content, str(stage_dir / "README.md"))
            generated += 1

    root_readme_docs = []
    for stage_key in project.PROJECT_STRUCTURE:
        root_readme_docs.append({
            "name": f"{stage_key}/README.md",
            "description": project.PROJECT_STRUCTURE[stage_key].get("description", stage_key),
            "tags": "[索引]"
        })

    root_readme = engine.generate_readme_document(
        f"YYC³ {PROJECT_ABBR} 文档体系",
        f"YYC³ Brain Computer System 完整文档体系，遵循十阶段文档架构标准。",
        root_readme_docs
    )
    engine.save_document(root_readme, str(docs_dir / "README.md"))
    generated += 1

    return generated


def main():
    parser = argparse.ArgumentParser(description=f'YYC³ {PROJECT_NAME} 文档模版引擎')
    parser.add_argument('--output', '-o', default='docs', help='输出目录')
    parser.add_argument('--root', '-r', default='.', help='项目根目录')
    parser.add_argument('--generate-docs', '-g', action='store_true', help='生成十阶段文档体系')
    parser.add_argument('--generate-root', action='store_true', help='生成根目录文档五件套')
    parser.add_argument('--generate-infra', action='store_true', help='生成基础设施文件')
    parser.add_argument('--all', '-a', action='store_true', help='执行全部生成任务')
    parser.add_argument('--export-registry', '-e', action='store_true', help='导出注册表')
    parser.add_argument('--validate', '-v', action='store_true', help='验证模式')

    args = parser.parse_args()

    project_root = Path(args.root).resolve()
    engine = YYC3TemplateEngine(args.output)

    logger.info(f"=== YYC³ {PROJECT_NAME} 文档模版引擎 v3.1.0 ===")
    logger.info(f"项目根目录: {project_root}")

    if args.all:
        args.generate_docs = True
        args.generate_root = True
        args.generate_infra = True
        args.export_registry = True

    if args.generate_infra:
        logger.info("--- 生成基础设施文件 ---")
        generate_gitignore(project_root)
        generate_tsconfig(project_root)
        generate_index_html(project_root)

    if args.generate_root:
        logger.info("--- 生成根目录文档五件套 ---")
        generate_root_readme(engine, project_root)
        generate_changelog(engine, project_root)
        generate_contributing(engine, project_root)
        generate_env_example(engine, project_root)
        generate_license(engine, project_root)

    if args.generate_docs:
        logger.info("--- 生成十阶段文档体系 ---")
        count = generate_docs_structure(engine, project_root)
        logger.info(f"已生成 {count} 个文档")

    if args.validate:
        logger.info("--- 验证文档 ---")
        docs_dir = project_root / args.output
        if docs_dir.exists():
            md_files = list(docs_dir.rglob("*.md"))
            total = len(md_files)
            valid = 0
            for md_file in md_files:
                with open(md_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                is_valid, errors = engine.validate_document(content, {
                    'require_brand_header': True,
                    'require_brand_footer': True,
                    'require_metadata': True,
                    'min_length': 100
                })
                if is_valid:
                    valid += 1
                else:
                    logger.warning(f"验证失败: {md_file.name} - {errors}")
            logger.info(f"验证完成: {valid}/{total} 通过")
        else:
            logger.warning(f"文档目录不存在: {docs_dir}")

    if args.export_registry:
        registry_path = str(project_root / args.output / "document_registry.json")
        engine.export_registry(registry_path)

    logger.info(f"=== YYC³ {PROJECT_NAME} 文档模版引擎执行完成 ===")


if __name__ == "__main__":
    main()
