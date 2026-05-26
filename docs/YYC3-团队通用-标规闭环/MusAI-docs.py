#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
file: YYC3-Music-Docs.py
description: YYC³ Music-player 文档架构闭环生成引擎 v3.1.0 — 基于五维驱动五高架构理念，实现项目文档全生命周期管理
author: YanYuCloudCube Team <admin@0379.email>
version: v3.1.0
created: 2026-02-18
updated: 2026-05-25
status: stable
tags: [文档引擎],[闭环管理],[五高五标五化],[D-Music-99]

brief: 自动生成符合YYC³团队标准的完整文档架构，支持分端文档生成、闭环追溯与版本管理

details:
- 基于 YYC3-团队文档-引擎模版.py v3.1.0 标准重构
- 融入 ISO/IEC 18019、IEEE 1063、SemVer 2.0.0 等行业标准
- 支持前端/后端/移动端分端文档架构生成
- 集成 DXJ-02.png Logo 与技术栈徽章系统
- 实现文档注册表、校验和、历史归档等闭环机制
- 遵循团队文档闭环建标准规范

dependencies: Python 3.8+, pathlib, hashlib, datetime, json, logging, shutil, difflib
"""

import os
import sys
import argparse
import re
import datetime
import json
import logging
import hashlib
import shutil
import difflib
from pathlib import Path
from typing import Dict, List, Tuple, Optional, Any
from dataclasses import dataclass, field, asdict
from enum import Enum

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger(__name__)

# ===================== 核心配置区 =====================
DOCUMENT_ROOT = "docs"
CREATION_DATE = datetime.datetime.now().strftime("%Y-%m-%d")
VERSION = "v3.1.0"
STATUS = "stable"
ENCODING = "utf-8"
PROJECT_NAME = "D-Music-99"
PROJECT_CODE = "YYC3-Music-player"

# ===================== 品牌与理念标准区 =====================
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

# ===================== 文档元数据标准 (符合团队规范) =====================
@dataclass
class DocumentMetadata:
    file_name: str
    description: str
    author: str = "YanYuCloudCube Team <admin@0379.email>"
    version: str = "v3.1.0"
    created: str = ""
    updated: str = ""
    status: str = "stable"
    tags: List[str] = field(default_factory=list)
    checksum: str = ""
    trace_id: str = ""
    parent_doc: str = ""
    related_docs: List[str] = field(default_factory=list)
    category: str = ""
    language: str = "zh-CN"
    audience: str = "developers,managers,stakeholders"
    complexity: str = "intermediate"

    def __post_init__(self):
        now = datetime.datetime.now().strftime("%Y-%m-%d")
        if not self.created:
            self.created = now
        if not self.updated:
            self.updated = now
        if not self.trace_id:
            self.trace_id = self._generate_trace_id()

    def _generate_trace_id(self) -> str:
        raw = f"{self.file_name}:{self.version}:{datetime.datetime.now().isoformat()}"
        return f"TRC-{hashlib.sha256(raw.encode('utf-8')).hexdigest()[:12].upper()}"

    def to_yaml_front_matter(self) -> str:
        tags_str = ','.join(self.tags) if isinstance(self.tags, list) else self.tags
        related_str = ','.join(self.related_docs) if isinstance(self.related_docs, list) else self.related_docs
        return f"""---
file: {self.file_name}
description: {self.description}
author: {self.author}
version: {self.version}
created: {self.created}
updated: {self.updated}
status: {self.status}
tags: {tags_str}
checksum: {self.checksum}
trace_id: {self.trace_id}
category: {self.category}
language: {self.language}
audience: {self.audience}
complexity: {self.complexity}
related_docs: {related_str if related_str else '无'}
---"""


# ===================== 文档类型枚举 =====================
class DocumentType(Enum):
    MAIN = "main"
    README = "readme"
    ROOT_README = "root_readme"
    RESERVED = "reserved"
    FRONTEND = "frontend"
    BACKEND = "backend"
    MOBILE = "mobile"
    API = "api"
    ARCHITECTURE = "architecture"
    CHANGELOG = "changelog"


# ===================== 追溯记录 =====================
@dataclass
class TraceRecord:
    timestamp: str
    document: str
    action: str
    version: str
    checksum: str
    author: str
    trace_id: str
    diff_summary: str = ""


# ===================== 文档引擎核心类 =====================
class YYC3MusicDocumentEngine:

    def __init__(self, output_dir: str = "docs", project_root: str = "."):
        self.output_dir = Path(output_dir)
        self.project_root = Path(project_root)
        self.document_registry: Dict[str, DocumentMetadata] = {}
        self.traceability_chain: List[Dict] = []
        self.history_dir = self.output_dir / ".history"
        self.registry_path = self.output_dir / ".registry.json"

        if self.registry_path.exists():
            self._load_registry()

    def generate_checksum(self, content: str) -> str:
        return hashlib.sha256(content.encode('utf-8')).hexdigest()[:16]

    def _load_registry(self) -> None:
        try:
            with open(self.registry_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            self.traceability_chain = data.get('traceability_chain', [])
            for doc_id, doc_data in data.get('documents', {}).items():
                meta = DocumentMetadata(
                    file_name=doc_data.get('file_name', ''),
                    description=doc_data.get('description', ''),
                    version=doc_data.get('version', VERSION),
                    checksum=doc_data.get('checksum', ''),
                    trace_id=doc_data.get('trace_id', doc_id),
                    tags=doc_data.get('tags', []),
                    related_docs=doc_data.get('related_docs', []),
                )
                self.document_registry[doc_id] = meta
        except Exception as e:
            logger.warning(f"加载注册表失败: {e}")

    def _persist_registry(self) -> None:
        trace_chain: List[Dict] = []
        for r in self.traceability_chain:
            if hasattr(r, '__dataclass_fields__'):
                trace_chain.append(asdict(r))  # type: ignore[arg-type]
            else:
                trace_chain.append(dict(r))
        data = {
            "export_time": datetime.datetime.now().isoformat(),
            "total_documents": len(self.document_registry),
            "documents": {},
            "traceability_chain": trace_chain
        }
        for doc_id, meta in self.document_registry.items():
            data["documents"][doc_id] = {
                "file_name": meta.file_name,
                "description": meta.description,
                "version": meta.version,
                "checksum": meta.checksum,
                "trace_id": meta.trace_id,
                "tags": meta.tags,
                "related_docs": meta.related_docs,
                "updated": meta.updated,
            }
        self.output_dir.mkdir(parents=True, exist_ok=True)
        with open(self.registry_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

    def register_document(self, metadata: DocumentMetadata) -> None:
        self.document_registry[metadata.trace_id] = metadata
        self._persist_registry()

    def add_trace_record(self, metadata: DocumentMetadata, action: str, diff_summary: str = "") -> None:
        record = TraceRecord(
            timestamp=datetime.datetime.now().isoformat(),
            document=metadata.file_name,
            action=action,
            version=metadata.version,
            checksum=metadata.checksum,
            author=metadata.author,
            trace_id=metadata.trace_id,
            diff_summary=diff_summary,
        )
        self.traceability_chain.append(asdict(record))
        self._persist_registry()

    def _compute_diff(self, old_content: str, new_content: str) -> str:
        diff = difflib.unified_diff(
            old_content.splitlines(keepends=True),
            new_content.splitlines(keepends=True),
            fromfile='before', tofile='after', n=1
        )
        lines = list(diff)
        if not lines:
            return "无变更"
        added = sum(1 for l in lines if l.startswith('+') and not l.startswith('+++'))
        removed = sum(1 for l in lines if l.startswith('-') and not l.startswith('---'))
        return f"+{added}/-{removed} 行变更"

    def _archive_version(self, file_path: Path, metadata: DocumentMetadata) -> None:
        if not self.history_dir.exists():
            self.history_dir.mkdir(parents=True, exist_ok=True)
        ts = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
        archive_name = f"{file_path.stem}__{metadata.version}__{ts}{file_path.suffix}"
        shutil.copy2(file_path, self.history_dir / archive_name)
        logger.info(f"历史版本已归档: {archive_name}")

    def save_document(self, content: str, output_path: str, metadata: Optional[DocumentMetadata] = None) -> bool:
        try:
            path = Path(output_path)
            path.parent.mkdir(parents=True, exist_ok=True)

            diff_summary = ""
            if path.exists() and metadata:
                old_content = path.read_text(encoding='utf-8')
                diff_summary = self._compute_diff(old_content, content)
                if old_content == content:
                    logger.info(f"文档无变更，跳过: {output_path}")
                    return True
                self._archive_version(path, metadata)

            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)

            if metadata:
                metadata.checksum = self.generate_checksum(content)
                self.register_document(metadata)
                action = "update" if diff_summary else "create"
                self.add_trace_record(metadata, action, diff_summary)

            logger.info(f"✅ 文档已保存: {output_path}")
            return True
        except Exception as e:
            logger.error(f"❌ 保存文档失败: {e}")
            return False

    def validate_document(self, content: str) -> Tuple[bool, List[str]]:
        errors = []

        if not content.startswith('---'):
            errors.append("缺少 YAML Front Matter 元数据块")

        required_fields = ['file:', 'description:', 'author:', 'version:', 'created:', 'updated:', 'status:', 'tags:']
        for field in required_fields:
            if field not in content:
                errors.append(f"缺少必需字段: {field}")

        if 'YanYuCloudCube' not in content:
            errors.append("缺少品牌标识头")

        if 'admin@0379.email' not in content:
            errors.append("缺少品牌标识尾")

        if '五高架构' not in content or '五标体系' not in content or '五化转型' not in content:
            errors.append("缺少核心理念块（五高五标五化）")

        if len(content) < 500:
            errors.append(f"文档长度不足: {len(content)} < 500")

        return len(errors) == 0, errors

    def validate_file(self, file_path: str) -> Tuple[bool, List[str]]:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            return self.validate_document(content)
        except Exception as e:
            return False, [f"读取文件失败: {e}"]

    def batch_validate(self, directory: str) -> Dict[str, Tuple[bool, List[str]]]:
        results = {}
        target = Path(directory)
        for md_file in sorted(target.rglob("*.md")):
            ok, errs = self.validate_file(str(md_file))
            results[str(md_file)] = (ok, errs)
        return results


# ===================== 分端文档架构定义 =====================
# 前端文档架构
FRONTEND_DOC_STRUCT = {
    "00-前端-项目总览索引": [
        ("001", "前端项目总览", "前端项目整体架构、技术栈与开发规范概述", "[前端],[总览],[项目索引]"),
        ("002", "前端快速开始指南", "前端环境搭建、依赖安装与开发服务器启动", "[前端],[快速开始],[指南]"),
        ("003", "前端核心概念词典", "前端领域术语、组件命名与状态管理概念", "[前端],[概念],[词典]"),
        ("004", "前端版本更新日志", "前端版本迭代记录与变更说明", "[前端],[版本],[日志]"),
    ],
    "01-前端-架构设计": [
        ("001", "前端系统架构总览", "React + Vite + Tailwind CSS + shadcn/ui 架构设计", "[前端],[架构],[系统设计]"),
        ("002", "前端组件架构设计", "原子化组件设计、shadcn/ui 集成与自定义扩展", "[前端],[组件],[架构]"),
        ("003", "前端状态管理设计", "Zustand 状态管理、持久化与跨组件通信", "[前端],[状态管理],[Zustand]"),
        ("004", "前端路由架构设计", "React Router 路由配置、懒加载与权限控制", "[前端],[路由],[ReactRouter]"),
        ("005", "前端构建优化设计", "Vite 构建配置、代码分割、Tree Shaking 与性能优化", "[前端],[构建],[Vite]"),
    ],
    "02-前端-开发规范": [
        ("001", "前端代码规范", "TypeScript 严格模式、ESLint Flat Config 与命名规范", "[前端],[规范],[代码标准]"),
        ("002", "前端组件开发规范", "组件目录结构、Props 定义、事件处理与样式规范", "[前端],[组件],[开发规范]"),
        ("003", "前端 API 层规范", "Axios 封装、请求拦截、错误处理与类型定义", "[前端],[API],[规范]"),
        ("004", "前端样式规范", "Tailwind CSS 使用规范、主题配置与响应式设计", "[前端],[样式],[Tailwind]"),
        ("005", "前端测试规范", "Vitest 单元测试、React Testing Library 与覆盖率要求", "[前端],[测试],[规范]"),
    ],
    "03-前端-功能模块": [
        ("001", "用户认证模块", "登录、注册、JWT 双令牌、密码修改与权限控制", "[前端],[认证],[用户]"),
        ("002", "音乐播放模块", "音频播放、播放列表、进度控制与歌词显示", "[前端],[播放器],[音乐]"),
        ("003", "发现推荐模块", "歌曲推荐、排行榜、分类浏览与搜索功能", "[前端],[发现],[推荐]"),
        ("004", "社交互动模块", "关注、点赞、评论、分享与消息通知", "[前端],[社交],[互动]"),
        ("005", "个人中心模块", "用户信息、播放历史、收藏管理与设置", "[前端],[个人中心],[用户]"),
    ],
    "04-前端-部署运维": [
        ("001", "前端部署指南", "Vite 生产构建、静态资源部署与 CDN 配置", "[前端],[部署],[指南]"),
        ("002", "前端性能监控", "Lighthouse 评分、Core Web Vitals 与性能优化", "[前端],[性能],[监控]"),
        ("003", "前端错误监控", "Sentry 集成、错误上报与日志分析", "[前端],[错误],[监控]"),
    ],
}

# 后端文档架构
BACKEND_DOC_STRUCT = {
    "00-后端-项目总览索引": [
        ("001", "后端项目总览", "后端项目整体架构、技术栈与开发规范概述", "[后端],[总览],[项目索引]"),
        ("002", "后端快速开始指南", "后端环境搭建、数据库配置与开发服务器启动", "[后端],[快速开始],[指南]"),
        ("003", "后端核心概念词典", "后端领域术语、分层架构与数据库设计概念", "[后端],[概念],[词典]"),
        ("004", "后端版本更新日志", "后端版本迭代记录与变更说明", "[后端],[版本],[日志]"),
    ],
    "01-后端-架构设计": [
        ("001", "后端系统架构总览", "Express + TypeScript + Sequelize 分层架构设计", "[后端],[架构],[系统设计]"),
        ("002", "后端数据库架构设计", "MySQL 数据模型、索引优化、连接池与读写分离", "[后端],[数据库],[架构]"),
        ("003", "后端缓存架构设计", "Redis 缓存策略、会话存储、分布式锁与限流", "[后端],[缓存],[Redis]"),
        ("004", "后端 API 架构设计", "RESTful API 设计规范、版本控制与文档生成", "[后端],[API],[架构]"),
        ("005", "后端安全架构设计", "JWT 双令牌、bcrypt 加密、Helmet 与限流防护", "[后端],[安全],[架构]"),
        ("006", "后端实时通信设计", "Socket.IO 事件设计、房间管理与消息推送", "[后端],[实时通信],[SocketIO]"),
    ],
    "02-后端-开发规范": [
        ("001", "后端代码规范", "TypeScript 严格模式、ESLint 配置与命名规范", "[后端],[规范],[代码标准]"),
        ("002", "后端分层架构规范", "Controller-Service-Model 分层、依赖注入与接口定义", "[后端],[分层],[规范]"),
        ("003", "后端数据库操作规范", "Sequelize ORM 使用、迁移脚本与事务管理", "[后端],[数据库],[规范]"),
        ("004", "后端日志规范", "Winston 日志配置、结构化日志与日志分析", "[后端],[日志],[规范]"),
        ("005", "后端测试规范", "Jest 单元测试、集成测试与覆盖率要求", "[后端],[测试],[规范]"),
    ],
    "03-后端-功能模块": [
        ("001", "用户认证模块", "注册、登录、JWT 签发、令牌刷新与密码修改", "[后端],[认证],[用户]"),
        ("002", "音乐资源模块", "歌曲 CRUD、文件上传、音频转码与元数据管理", "[后端],[音乐],[资源]"),
        ("003", "推荐系统模块", "协同过滤、内容推荐、推荐策略与 A/B 测试", "[后端],[推荐],[算法]"),
        ("004", "社交互动模块", "关注关系、点赞评论、消息通知与动态流", "[后端],[社交],[互动]"),
        ("005", "搜索服务模块", "全文搜索、Elasticsearch 集成与搜索优化", "[后端],[搜索],[Elasticsearch]"),
    ],
    "04-后端-部署运维": [
        ("001", "后端部署指南", "Docker 容器化、PM2 进程管理与生产环境配置", "[后端],[部署],[指南]"),
        ("002", "后端监控告警", "Prometheus 指标、Grafana 大盘与告警规则", "[后端],[监控],[告警]"),
        ("003", "后端数据库运维", "备份策略、主从同步、慢查询优化与扩容方案", "[后端],[数据库],[运维]"),
        ("004", "后端安全运维", "漏洞扫描、入侵检测、安全审计与应急响应", "[后端],[安全],[运维]"),
    ],
}

# 移动端文档架构
MOBILE_DOC_STRUCT = {
    "00-移动端-项目总览索引": [
        ("001", "移动端项目总览", "移动端项目整体架构、技术栈与开发规范概述", "[移动端],[总览],[项目索引]"),
        ("002", "移动端快速开始指南", "Expo 环境搭建、模拟器配置与真机调试", "[移动端],[快速开始],[指南]"),
        ("003", "移动端核心概念词典", "移动端领域术语、组件命名与导航概念", "[移动端],[概念],[词典]"),
        ("004", "移动端版本更新日志", "移动端版本迭代记录与变更说明", "[移动端],[版本],[日志]"),
    ],
    "01-移动端-架构设计": [
        ("001", "移动端系统架构总览", "React Native + Expo + TypeScript 跨平台架构设计", "[移动端],[架构],[系统设计]"),
        ("002", "移动端导航架构设计", "React Navigation 配置、栈导航与标签导航", "[移动端],[导航],[架构]"),
        ("003", "移动端状态管理设计", "Zustand 状态管理、持久化与离线支持", "[移动端],[状态管理],[Zustand]"),
        ("004", "移动端原生模块设计", "Expo Modules、原生能力调用与桥接通信", "[移动端],[原生模块],[Expo]"),
        ("005", "移动端性能优化设计", "启动优化、内存管理、列表虚拟化与图片缓存", "[移动端],[性能],[优化]"),
    ],
    "02-移动端-开发规范": [
        ("001", "移动端代码规范", "TypeScript 严格模式、ESLint 配置与命名规范", "[移动端],[规范],[代码标准]"),
        ("002", "移动端组件开发规范", "Screen 组件、自定义 Hooks 与样式规范", "[移动端],[组件],[开发规范]"),
        ("003", "移动端 API 层规范", "Axios 封装、请求拦截、Token 刷新与错误处理", "[移动端],[API],[规范]"),
        ("004", "移动端安全规范", "SecureStore 存储、证书固定与生物识别", "[移动端],[安全],[规范]"),
        ("005", "移动端测试规范", "Jest 单元测试、Detox E2E 测试与覆盖率要求", "[移动端],[测试],[规范]"),
    ],
    "03-移动端-功能模块": [
        ("001", "用户认证模块", "登录、注册、生物识别登录与密码修改", "[移动端],[认证],[用户]"),
        ("002", "音乐播放模块", "后台播放、锁屏控制、离线播放与音质选择", "[移动端],[播放器],[音乐]"),
        ("003", "发现推荐模块", "歌曲推荐、排行榜、分类浏览与搜索功能", "[移动端],[发现],[推荐]"),
        ("004", "社交互动模块", "关注、点赞、评论、分享与消息通知", "[移动端],[社交],[互动]"),
        ("005", "个人中心模块", "用户信息、播放历史、下载管理与设置", "[移动端],[个人中心],[用户]"),
    ],
    "04-移动端-构建发布": [
        ("001", "移动端构建指南", "Expo Build、EAS 构建与本地打包", "[移动端],[构建],[指南]"),
        ("002", "移动端发布指南", "应用商店发布、TestFlight 与 Google Play 上架", "[移动端],[发布],[指南]"),
        ("003", "移动端热更新", "Expo Updates 配置、OTA 更新与回滚策略", "[移动端],[热更新],[OTA]"),
        ("004", "移动端崩溃监控", "Sentry 集成、崩溃上报与性能追踪", "[移动端],[崩溃],[监控]"),
    ],
}

# 项目级文档架构（根目录 docs）
PROJECT_DOC_STRUCT = {
    "00-YYC3-Music-player-项目总览索引": [
        ("001", "项目总览手册", "项目立项核心依据，明确项目目标、范围、权责与立项审批标准", "[项目总览],[项目立项],[权责划分]"),
        ("002", "文档架构导航", "文档体系导航与索引，快速定位各类文档", "[项目总览],[文档导航],[索引]"),
        ("003", "快速开始指南", "项目快速启动与使用指南", "[项目总览],[快速开始],[使用指南]"),
        ("004", "核心概念词典", "项目核心概念与术语定义", "[项目总览],[核心概念],[术语词典]"),
        ("005", "版本更新日志", "项目版本迭代与变更记录", "[项目总览],[版本管理],[更新日志]"),
    ],
    "01-YYC3-Music-player-启动规划阶段": {
        "0101-Music-player-项目规划": [
            ("001", "项目章程与愿景", "项目立项核心依据，明确项目目标、范围、权责与立项审批标准", "[项目规划],[项目立项],[权责划分]"),
            ("002", "项目范围说明书", "明确项目范围、边界、交付物与验收标准", "[项目规划],[范围管理],[边界定义]"),
            ("003", "项目里程碑计划", "项目各阶段里程碑与任务拆解，明确各节点交付物与责任人", "[项目规划],[进度管理],[里程碑]"),
            ("004", "项目资源规划", "人力、物力、技术资源的统筹分配，保障项目各阶段资源充足", "[项目规划],[资源管理],[人力配置]"),
            ("005", "干系人管理计划", "识别项目所有相关方，分析各方需求与诉求，制定沟通与协调策略", "[项目规划],[干系人管理],[需求分析]"),
        ],
        "0102-Music-player-需求规划": [
            ("001", "业务需求分析", "全项目核心业务需求梳理，明确功能边界、用户场景与核心业务规则", "[需求规划],[需求梳理],[业务边界]"),
            ("002", "用户需求调研报告", "用户需求调研结果分析，明确用户痛点与期望", "[需求规划],[用户调研],[需求分析]"),
            ("003", "产品需求文档(PRD)", "产品功能需求详细定义，包含功能规格、交互逻辑与验收标准", "[需求规划],[PRD],[功能规格]"),
            ("004", "需求优先级矩阵", "需求优先级评估与排序，指导开发迭代计划", "[需求规划],[优先级],[迭代规划]"),
        ],
        "0103-Music-player-可行性分析": [
            ("001", "技术可行性分析", "从技术角度评估项目可行性，识别技术风险与解决方案", "[可行性分析],[技术评估],[风险识别]"),
            ("002", "经济可行性分析", "从经济角度评估项目可行性，分析成本效益与投资回报", "[可行性分析],[经济评估],[成本效益]"),
            ("003", "市场可行性分析", "从市场角度评估项目可行性，分析市场前景与竞争态势", "[可行性分析],[市场评估],[竞争分析]"),
            ("004", "操作可行性分析", "从操作角度评估项目可行性，分析实施难度与运营风险", "[可行性分析],[操作评估],[实施风险]"),
        ],
        "0104-Music-player-风险管理": [
            ("001", "项目初期风险评估", "识别项目全周期风险，制定风险应对策略与应急预案", "[风险管理],[风险识别],[应急预案]"),
            ("002", "风险应对预案", "针对识别的风险制定详细的应对预案与缓解措施", "[风险管理],[风险应对],[缓解措施]"),
            ("003", "项目预算与成本控制", "项目预算编制与成本控制策略，保障项目在预算范围内完成", "[风险管理],[预算管理],[成本控制]"),
            ("004", "项目成功标准定义", "明确项目成功的标准与度量指标，为项目验收提供依据", "[风险管理],[成功标准],[度量指标]"),
        ],
    },
    "02-YYC3-Music-player-项目设计阶段": {
        "0201-Music-player-架构设计": [
            ("001", "系统架构总览图", "全系统整体架构设计，包含分层、分模块、部署架构的核心设计方案", "[架构设计],[系统架构],[整体设计]"),
            ("002", "九层功能架构设计", "YYC³ 九层功能架构设计，包含用户交互层、业务逻辑层、智能引擎层等", "[架构设计],[九层架构],[功能分层]"),
            ("003", "技术选型论证报告", "全栈技术栈选型依据与对比分析，匹配五高五标五化的核心设计原则", "[架构设计],[技术选型],[技术评估]"),
            ("004", "微服务架构设计", "微服务模块拆分原则与边界定义，明确服务间通信与协作规则", "[架构设计],[微服务],[服务拆分]"),
            ("005", "网络拓扑图", "系统网络拓扑结构设计，包含内外网、防火墙、负载均衡等", "[架构设计],[网络设计],[拓扑结构]"),
            ("006", "高可用设计", "系统高可用架构设计，包含容灾、备份、故障转移等", "[架构设计],[高可用],[容灾备份]"),
        ],
        "0202-Music-player-详细设计": {
            "0202-01-前端架构设计": [
                ("001", "前端技术栈选型", "React 18 + Vite + Tailwind CSS v4 + shadcn/ui 技术选型论证", "[详细设计],[前端],[技术选型]"),
                ("002", "前端组件架构", "shadcn/ui 原子组件、业务组件与布局组件分层设计", "[详细设计],[前端],[组件架构]"),
                ("003", "前端状态管理", "Zustand 全局状态、持久化方案与跨组件通信", "[详细设计],[前端],[状态管理]"),
                ("004", "前端路由设计", "React Router 路由表、懒加载与权限守卫", "[详细设计],[前端],[路由设计]"),
                ("005", "前端构建优化", "Vite 代码分割、Tree Shaking、压缩与缓存策略", "[详细设计],[前端],[构建优化]"),
            ],
            "0202-02-后端架构设计": [
                ("001", "后端技术栈选型", "Express + TypeScript + Sequelize + MySQL + Redis 技术选型论证", "[详细设计],[后端],[技术选型]"),
                ("002", "后端分层架构", "Controller-Service-Model 分层、中间件链与错误处理", "[详细设计],[后端],[分层架构]"),
                ("003", "后端数据库设计", "MySQL 数据模型、索引策略、连接池与读写分离", "[详细设计],[后端],[数据库设计]"),
                ("004", "后端缓存设计", "Redis 缓存策略、会话存储、分布式锁与限流", "[详细设计],[后端],[缓存设计]"),
                ("005", "后端安全设计", "JWT 双令牌、bcrypt、Helmet、CORS 与限流", "[详细设计],[后端],[安全设计]"),
                ("006", "后端实时通信", "Socket.IO 事件设计、房间管理与消息推送", "[详细设计],[后端],[实时通信]"),
            ],
            "0202-03-移动端架构设计": [
                ("001", "移动端技术栈选型", "React Native + Expo + TypeScript 跨平台技术选型论证", "[详细设计],[移动端],[技术选型]"),
                ("002", "移动端导航架构", "React Navigation 栈导航、标签导航与抽屉导航", "[详细设计],[移动端],[导航架构]"),
                ("003", "移动端状态管理", "Zustand 全局状态、SecureStore 持久化与离线支持", "[详细设计],[移动端],[状态管理]"),
                ("004", "移动端原生能力", "Expo Modules、音频播放、后台任务与推送通知", "[详细设计],[移动端],[原生能力]"),
                ("005", "移动端性能优化", "启动优化、内存管理、图片缓存与列表虚拟化", "[详细设计],[移动端],[性能优化]"),
            ],
            "0202-04-数据存储层": [
                ("001", "关系型数据库设计", "MySQL 数据库设计、表结构、索引与优化", "[详细设计],[数据存储],[关系型数据库]"),
                ("002", "缓存数据库设计", "Redis 缓存设计、会话存储与分布式锁", "[详细设计],[数据存储],[缓存数据库]"),
                ("003", "对象存储设计", "MinIO 文件存储、图片存储与 CDN 加速", "[详细设计],[数据存储],[对象存储]"),
                ("004", "数据同步服务", "主从同步、数据备份与恢复策略", "[详细设计],[数据存储],[数据同步]"),
            ],
            "0202-05-核心服务层": [
                ("001", "API网关设计", "统一API入口、认证中间件、限流熔断与路由分发", "[详细设计],[核心服务],[API网关]"),
                ("002", "身份认证服务", "JWT认证、OAuth、多因素认证与会话管理", "[详细设计],[核心服务],[身份认证]"),
                ("003", "权限管理服务", "RBAC权限控制、角色管理与资源访问控制", "[详细设计],[核心服务],[权限管理]"),
                ("004", "消息队列服务", "任务队列、发布订阅、延迟任务与死信队列", "[详细设计],[核心服务],[消息队列]"),
                ("005", "日志服务", "结构化日志、日志收集、存储与分析", "[详细设计],[核心服务],[日志服务]"),
                ("006", "监控服务", "指标收集、性能监控、健康检查与告警", "[详细设计],[核心服务],[监控服务]"),
            ],
        },
        "0203-Music-player-数据库设计": [
            ("001", "数据库ER图", "全系统实体关系图，包含用户、歌曲、播放列表等核心实体", "[数据库设计],[ER图],[实体关系]"),
            ("002", "数据字典", "全系统数据字段定义、类型、约束与说明", "[数据库设计],[数据字典],[字段定义]"),
            ("003", "数据库迁移规范", "Sequelize 迁移脚本规范、版本控制与回滚策略", "[数据库设计],[迁移],[规范]"),
            ("004", "数据库索引优化", "索引设计原则、慢查询优化与性能调优", "[数据库设计],[索引],[优化]"),
            ("005", "数据库备份恢复", "备份策略、恢复流程与灾难恢复计划", "[数据库设计],[备份],[恢复]"),
        ],
        "0204-Music-player-接口设计": [
            ("001", "API接口总览", "全系统RESTful API接口清单、版本规划与认证方式", "[接口设计],[API],[总览]"),
            ("002", "认证接口设计", "注册、登录、令牌刷新、登出等认证接口详细设计", "[接口设计],[认证],[API]"),
            ("003", "音乐接口设计", "歌曲CRUD、搜索、推荐等音乐相关接口设计", "[接口设计],[音乐],[API]"),
            ("004", "社交接口设计", "关注、点赞、评论、分享等社交接口设计", "[接口设计],[社交],[API]"),
            ("005", "WebSocket事件设计", "实时通信事件定义、消息格式与连接管理", "[接口设计],[WebSocket],[实时通信]"),
            ("006", "接口版本管理", "API版本策略、兼容性保证与废弃流程", "[接口设计],[版本管理],[API]"),
        ],
    },
    "03-YYC3-Music-player-开发实施阶段": {
        "0301-Music-player-开发规范": [
            ("001", "前端开发规范", "React组件规范、Hooks规范、TypeScript规范与ESLint配置", "[开发规范],[前端],[代码标准]"),
            ("002", "后端开发规范", "Express分层规范、Sequelize规范、日志规范与测试规范", "[开发规范],[后端],[代码标准]"),
            ("003", "移动端开发规范", "React Native组件规范、导航规范、安全规范与测试规范", "[开发规范],[移动端],[代码标准]"),
            ("004", "Git工作流规范", "分支策略、提交规范、代码审查与合并流程", "[开发规范],[Git],[工作流]"),
            ("005", "Monorepo管理规范", "pnpm workspace配置、依赖管理、脚本规范与构建流程", "[开发规范],[Monorepo],[pnpm]"),
        ],
        "0302-Music-player-技术文档": [
            ("001", "前端技术文档", "Vite配置、Tailwind主题、shadcn/ui组件库使用指南", "[技术文档],[前端],[开发指南]"),
            ("002", "后端技术文档", "Express中间件、Sequelize模型、Redis操作与日志配置", "[技术文档],[后端],[开发指南]"),
            ("003", "移动端技术文档", "Expo配置、React Navigation、SecureStore与音频播放", "[技术文档],[移动端],[开发指南]"),
            ("004", "部署技术文档", "Docker配置、CI/CD流水线、环境变量与生产部署", "[技术文档],[部署],[运维指南]"),
        ],
        "0303-Music-player-API文档": [
            ("001", "认证API文档", "注册、登录、令牌刷新、用户信息等API详细文档", "[API文档],[认证],[接口文档]"),
            ("002", "音乐API文档", "歌曲列表、详情、搜索、推荐等API详细文档", "[API文档],[音乐],[接口文档]"),
            ("003", "社交API文档", "关注、点赞、评论、分享等API详细文档", "[API文档],[社交],[接口文档]"),
            ("004", "用户API文档", "用户信息、播放历史、收藏、设置等API详细文档", "[API文档],[用户],[接口文档]"),
            ("005", "WebSocket文档", "实时通信事件、消息格式、连接管理详细文档", "[API文档],[WebSocket],[实时通信]"),
        ],
    },
    "04-YYC3-Music-player-测试审核阶段": {
        "0401-Music-player-测试策略": [
            ("001", "测试总览", "全系统测试策略、测试金字塔与质量门禁", "[测试策略],[测试总览],[质量保障]"),
            ("002", "前端测试策略", "Vitest单元测试、React Testing Library、E2E测试与覆盖率目标", "[测试策略],[前端],[测试规划]"),
            ("003", "后端测试策略", "Jest单元测试、集成测试、API测试与覆盖率目标", "[测试策略],[后端],[测试规划]"),
            ("004", "移动端测试策略", "Jest单元测试、Detox E2E测试、性能测试与覆盖率目标", "[测试策略],[移动端],[测试规划]"),
            ("005", "安全测试策略", "渗透测试、漏洞扫描、代码审计与安全基线", "[测试策略],[安全],[测试规划]"),
        ],
        "0402-Music-player-测试用例": [
            ("001", "认证模块测试用例", "注册、登录、密码修改、令牌刷新等测试用例", "[测试用例],[认证],[功能测试]"),
            ("002", "音乐模块测试用例", "播放、搜索、推荐、收藏等测试用例", "[测试用例],[音乐],[功能测试]"),
            ("003", "社交模块测试用例", "关注、点赞、评论、分享等测试用例", "[测试用例],[社交],[功能测试]"),
            ("004", "性能测试用例", "负载测试、压力测试、并发测试与稳定性测试", "[测试用例],[性能],[压力测试]"),
            ("005", "兼容性测试用例", "浏览器兼容、设备兼容、系统兼容测试", "[测试用例],[兼容性],[跨平台测试]"),
        ],
        "0403-Music-player-测试报告": [
            ("001", "单元测试报告", "各端单元测试执行结果、覆盖率与缺陷统计", "[测试报告],[单元测试],[覆盖率]"),
            ("002", "集成测试报告", "系统集成测试执行结果、接口连通性与数据一致性", "[测试报告],[集成测试],[系统测试]"),
            ("003", "性能测试报告", "性能基准、瓶颈分析、优化建议与验收结论", "[测试报告],[性能测试],[基准测试]"),
            ("004", "安全测试报告", "漏洞清单、风险评级、修复建议与复测结果", "[测试报告],[安全测试],[漏洞扫描]"),
            ("005", "验收测试报告", "用户验收测试场景、执行结果与上线审批", "[测试报告],[验收测试],[上线审批]"),
        ],
    },
    "05-YYC3-Music-player-交付部署阶段": {
        "0501-Music-player-部署准备": [
            ("001", "部署环境准备", "服务器配置、域名解析、SSL证书与基础环境安装", "[部署准备],[环境],[服务器]"),
            ("002", "Docker镜像构建", "前端、后端、移动端Dockerfile编写与镜像优化", "[部署准备],[Docker],[镜像构建]"),
            ("003", "数据库迁移准备", "生产数据库初始化、迁移脚本执行与数据验证", "[部署准备],[数据库],[迁移]"),
            ("004", "配置管理", "环境变量、配置文件、密钥管理与版本控制", "[部署准备],[配置],[密钥管理]"),
        ],
        "0502-Music-player-部署手册": [
            ("001", "前端部署手册", "Vite生产构建、静态资源部署、CDN配置与缓存策略", "[部署手册],[前端],[部署指南]"),
            ("002", "后端部署手册", "Node.js服务部署、PM2配置、Nginx反向代理与负载均衡", "[部署手册],[后端],[部署指南]"),
            ("003", "数据库部署手册", "MySQL主从配置、Redis集群部署、备份策略与监控", "[部署手册],[数据库],[部署指南]"),
            ("004", "移动端发布手册", "Expo构建、应用商店上架、TestFlight与Google Play发布", "[部署手册],[移动端],[发布指南]"),
            ("005", "CI/CD流水线手册", "GitHub Actions配置、自动化测试、构建与部署流程", "[部署手册],[CI/CD],[自动化]"),
        ],
        "0503-Music-player-发布流程": [
            ("001", "版本发布流程", "版本号规范、发布检查清单、灰度发布与全量发布", "[发布流程],[版本发布],[灰度发布]"),
            ("002", "回滚流程", "紧急回滚策略、数据回滚、服务回滚与验证流程", "[发布流程],[回滚],[应急响应]"),
            ("003", "发布验证", "功能验证、性能验证、安全验证与监控验证", "[发布流程],[验证],[质量门禁]"),
        ],
    },
    "06-YYC3-Music-player-运营维护阶段": {
        "0601-Music-player-监控告警": [
            ("001", "系统监控方案", "服务器监控、应用监控、数据库监控与网络监控", "[监控告警],[系统监控],[基础设施]"),
            ("002", "业务监控方案", "用户行为监控、业务指标监控、转化漏斗与留存分析", "[监控告警],[业务监控],[数据分析]"),
            ("003", "告警规则配置", "告警阈值、通知渠道、告警分级与升级策略", "[监控告警],[告警规则],[通知]"),
            ("004", "日志管理方案", "日志收集、存储、检索与分析，ELK/Loki架构", "[监控告警],[日志],[ELK]"),
        ],
        "0602-Music-player-运维手册": [
            ("001", "日常运维手册", "巡检清单、常规维护、备份验证与容量规划", "[运维手册],[日常运维],[巡检]"),
            ("002", "故障处理手册", "故障分级、应急响应、排查流程与恢复操作", "[运维手册],[故障处理],[应急响应]"),
            ("003", "数据库运维手册", "备份恢复、性能调优、索引重建与数据清理", "[运维手册],[数据库],[运维]"),
            ("004", "安全运维手册", "漏洞修复、补丁管理、安全审计与合规检查", "[运维手册],[安全],[运维]"),
        ],
        "0603-Music-player-问题管理": [
            ("001", "问题追踪流程", "问题报告、分类、分配、解决与关闭流程", "[问题管理],[问题追踪],[流程]"),
            ("002", "缺陷管理规范", "缺陷分级、优先级、生命周期与度量指标", "[问题管理],[缺陷],[规范]"),
            ("003", "知识库管理", "常见问题、解决方案、技术文章与最佳实践", "[问题管理],[知识库],[最佳实践]"),
        ],
    },
    "07-YYC3-Music-player-合规安全保障": {
        "0701-Music-player-合规管理": [
            ("001", "数据隐私合规", "GDPR、个人信息保护法合规要求与实施方案", "[合规管理],[数据隐私],[GDPR]"),
            ("002", "内容合规管理", "音乐版权、UGC内容审核与合规策略", "[合规管理],[内容合规],[版权]"),
            ("003", "审计与日志", "操作审计、访问日志、合规报告与证据留存", "[合规管理],[审计],[日志]"),
        ],
        "0702-Music-player-安全管理": [
            ("001", "安全基线配置", "服务器安全、应用安全、数据库安全基线", "[安全管理],[安全基线],[配置]"),
            ("002", "漏洞管理", "漏洞扫描、渗透测试、修复验证与漏洞库管理", "[安全管理],[漏洞],[扫描]"),
            ("003", "应急响应预案", "安全事件分级、响应流程、取证分析与恢复", "[安全管理],[应急响应],[预案]"),
            ("004", "安全培训", "安全意识培训、代码安全培训与运维安全培训", "[安全管理],[培训],[意识]"),
        ],
        "0703-Music-player-权限管理": [
            ("001", "RBAC权限模型", "角色定义、权限分配、资源访问控制与审计", "[权限管理],[RBAC],[角色]"),
            ("002", "API权限控制", "接口鉴权、权限校验、速率限制与防刷", "[权限管理],[API],[鉴权]"),
            ("003", "数据权限管理", "数据隔离、字段级权限、脱敏规则与导出控制", "[权限管理],[数据],[隔离]"),
        ],
    },
    "08-YYC3-Music-player-资产知识管理": {
        "0801-Music-player-技术资产": [
            ("001", "代码资产管理", "代码库管理、版本控制、分支策略与代码审查", "[技术资产],[代码],[版本控制]"),
            ("002", "文档资产管理", "文档版本、文档索引、文档质量与文档生命周期", "[技术资产],[文档],[管理]"),
            ("003", "配置资产管理", "环境配置、基础设施即代码、配置漂移检测", "[技术资产],[配置],[IaC]"),
        ],
        "0802-Music-player-知识产权": [
            ("001", "开源合规", "开源许可证管理、SBOM生成、合规扫描与风险管控", "[知识产权],[开源],[许可证]"),
            ("002", "专利与商标", "技术专利、商标注册、知识产权保护策略", "[知识产权],[专利],[商标]"),
            ("003", "商业秘密", "核心算法、业务数据、客户信息保护措施", "[知识产权],[商业秘密],[保护]"),
        ],
        "0803-Music-player-知识库": [
            ("001", "技术知识库", "架构文档、技术方案、故障案例与最佳实践", "[知识库],[技术],[文档]"),
            ("002", "业务知识库", "业务流程、运营策略、市场分析与用户画像", "[知识库],[业务],[运营]"),
            ("003", "培训知识库", "新人培训、技术培训、管理培训与考核体系", "[知识库],[培训],[学习]"),
        ],
    },
    "09-YYC3-Music-player-智能演进优化": {
        "0901-Music-player-智能演进": [
            ("001", "AI能力演进", "AI歌词生成、作曲助手、情感分析等能力迭代规划", "[智能演进],[AI],[能力迭代]"),
            ("002", "推荐算法优化", "协同过滤、深度学习推荐、冷启动与多样性优化", "[智能演进],[推荐],[算法]"),
            ("003", "智能运维", "AIOps、异常检测、根因分析与自动化修复", "[智能演进],[AIOps],[智能运维]"),
        ],
        "0902-Music-player-功能演进": [
            ("001", "功能迭代规划", "新功能规划、用户反馈收集、优先级排序与路线图", "[功能演进],[迭代],[规划]"),
            ("002", "用户体验优化", "交互优化、性能优化、无障碍优化与国际化", "[功能演进],[UX],[优化]"),
            ("003", "商业模式演进", "付费策略、会员体系、广告策略与生态合作", "[功能演进],[商业],[模式]"),
        ],
        "0903-Music-player-架构演进": [
            ("001", "微服务拆分", "单体到微服务演进、服务治理、链路追踪与熔断降级", "[架构演进],[微服务],[拆分]"),
            ("002", "云原生演进", "容器化、Kubernetes、服务网格与Serverless", "[架构演进],[云原生],[K8s]"),
            ("003", "数据架构演进", "数据湖、实时计算、数据仓库与BI分析", "[架构演进],[数据],[实时计算]"),
        ],
        "0904-Music-player-质量提升": [
            ("001", "代码质量提升", "静态分析、代码审查、技术债务清理与重构", "[质量提升],[代码质量],[重构]"),
            ("002", "测试质量提升", "测试覆盖率、自动化率、缺陷预防与质量门禁", "[质量提升],[测试],[覆盖率]"),
            ("003", "文档质量提升", "文档完整性、准确性、及时性与可读性提升", "[质量提升],[文档],[质量]"),
        ],
        "0905-Music-player-团队成长": [
            ("001", "技术能力提升", "技术培训、技术分享、代码评审与导师制度", "[团队成长],[技术],[培训]"),
            ("002", "工程文化", "DevOps文化、质量文化、创新文化与协作文化", "[团队成长],[文化],[DevOps]"),
            ("003", "人才梯队", "招聘标准、晋升通道、绩效评估与激励机制", "[团队成长],[人才],[梯队]"),
        ],
    },
}


# ===================== 文档内容生成器 =====================
class DocumentContentGenerator:

    def __init__(self, engine: YYC3MusicDocumentEngine):
        self.engine = engine

    def generate_main_document(self, metadata: DocumentMetadata, doc_category: str, doc_name: str) -> str:
        metadata.checksum = metadata.checksum or self.engine.generate_checksum(metadata.description)

        doc_content = f"""{metadata.to_yaml_front_matter()}

{BRAND_HEADER}

---

# {doc_name}

{CORE_PHILOSOPHY}

---

## 文档概述

{metadata.description}

---

## {doc_name}详细内容

本文档详细描述 {PROJECT_CODE} {doc_category}-{doc_name} 相关内容，确保项目按照 YYC³ 标准规范进行开发和实施。

### 文档目标

- 规范 {doc_name} 相关的业务标准与技术落地要求
- 为项目相关人员提供清晰的参考依据
- 保障相关模块开发、实施、运维的一致性与规范性

### 内容框架

#### 1. 背景与目标

#### 2. 范围与边界

#### 3. 关键概念与术语

#### 4. 详细设计/规范

#### 5. 实施指南

#### 6. 验收标准

#### 7. 相关文档

---

## 文档追溯信息

| 属性 | 值 |
|------|-----|
| 文档版本 | {metadata.version} |
| 创建日期 | {metadata.created} |
| 更新日期 | {metadata.updated} |
| 内容校验 | {metadata.checksum} |
| 追溯ID | {metadata.trace_id} |
| 关联文档 | {', '.join(metadata.related_docs) if metadata.related_docs else '无'} |

---

## 变更历史

| 版本 | 日期 | 变更内容 | 作者 |
|------|------|----------|------|
| {metadata.version} | {metadata.created} | 初始版本 | {metadata.author} |

---

{BRAND_FOOTER}
"""
        return doc_content

    def generate_readme_document(self, dir_name: str, dir_description: str, doc_list: List[Dict]) -> str:
        now = datetime.datetime.now().strftime("%Y-%m-%d")
        doc_table = "| 序号 | 文档名称 | 描述 | 标签 |\n|------|----------|------|------|\n"
        for idx, doc in enumerate(doc_list, 1):
            name = doc.get('name', '')
            desc = doc.get('description', doc.get('desc', ''))
            tags = doc.get('tags', '')
            doc_table += f"| {idx} | [{name}]({name}) | {desc} | {tags} |\n"

        metadata = DocumentMetadata(
            file_name="README.md",
            description=f"{dir_name} 目录文档索引",
            created=now,
            updated=now,
            tags=["文档索引", "README"],
            category="index"
        )

        return f"""{metadata.to_yaml_front_matter()}

{BRAND_HEADER}

---

# {dir_name}

{CORE_PHILOSOPHY}

---

## 目录概述

{dir_description}

---

## 文档索引

{doc_table}
---

## 文档规范

- **命名规范**：`{{编号}}-{{阶段}}-{{模块}}-{{文档名称}}.md`
- **版本规范**：主版本.次版本.修订版本 (如 v3.1.0)
- **标签规范**：使用方括号包裹，如 `[标签1],[标签2]`

---

## 变更历史

| 版本 | 日期 | 变更内容 | 作者 |
|------|------|----------|------|
| v3.1.0 | {now} | 初始版本 | YanYuCloudCube Team |

---

{BRAND_FOOTER}
"""

    def generate_reserved_document(self, category: str) -> str:
        now = datetime.datetime.now().strftime("%Y-%m-%d")
        metadata = DocumentMetadata(
            file_name="RES-DOC-001.md",
            description="预留文档，用于记录未来可能添加的内容",
            created=now,
            updated=now,
            status="reserved",
            tags=[category, "预留文档"],
            category="reserved"
        )

        return f"""{metadata.to_yaml_front_matter()}

{BRAND_HEADER}

---

# 预留文档

{CORE_PHILOSOPHY}

---

## 说明

本文档为预留文档，用于记录未来可能添加的内容。

当有新的文档需求时，可以基于本模版进行扩展。

---

{BRAND_FOOTER}
"""

    def generate_root_readme(self, document_root: str) -> str:
        now = datetime.datetime.now().strftime("%Y-%m-%d")

        # 构建文档树
        doc_tree = []
        for category in sorted(PROJECT_DOC_STRUCT.keys()):
            category_path = os.path.join(document_root, category)
            if os.path.exists(category_path):
                subdirs = []
                files = []
                for item in sorted(os.listdir(category_path)):
                    item_path = os.path.join(category_path, item)
                    if os.path.isdir(item_path):
                        subdirs.append(item)
                    elif os.path.isfile(item_path) and item.endswith('.md') and item != 'README.md':
                        files.append(item)

                category_section = f"### {category}\n\n"
                if subdirs:
                    category_section += "**子目录：**\n\n"
                    for subdir in subdirs:
                        category_section += f"- [{subdir}]({category}/{subdir}/README.md)\n"
                    category_section += "\n"
                if files:
                    category_section += "**文档：**\n\n"
                    for file in files:
                        file_path = os.path.join(category_path, file)
                        description = ""
                        try:
                            with open(file_path, 'r', encoding='utf-8') as f:
                                content = f.read()
                                desc_match = re.search(r'description:\s*(.+)', content)
                                if desc_match:
                                    description = desc_match.group(1).strip()
                        except:
                            pass
                        category_section += f"- [{file}]({category}/{file}) - {description}\n"
                doc_tree.append(category_section)

        doc_tree_str = "\n".join(doc_tree)

        function_overview = """## 主要目录功能概述

| 目录 | 功能描述 |
|------|----------|
| 00-YYC3-Music-player-项目总览索引 | 项目总览和导航，提供项目整体视角 |
| 01-YYC3-Music-player-启动规划阶段 | 项目启动和规划阶段，包含项目规划、需求规划、可行性分析等 |
| 02-YYC3-Music-player-项目设计阶段 | 系统设计阶段，包含架构设计、详细设计、数据库设计等 |
| 03-YYC3-Music-player-开发实施阶段 | 开发实施阶段，包含开发规范、技术文档、API文档等 |
| 04-YYC3-Music-player-测试审核阶段 | 测试与审核阶段，包含测试策略、测试用例、测试报告等 |
| 05-YYC3-Music-player-交付部署阶段 | 交付与部署阶段，包含部署准备、部署手册、发布流程等 |
| 06-YYC3-Music-player-运营维护阶段 | 运营与维护阶段，包含监控告警、运维手册、问题管理等 |
| 07-YYC3-Music-player-合规安全保障 | 合规与安全管理，包含合规管理、安全管理、权限管理等 |
| 08-YYC3-Music-player-资产知识管理 | 资产与知识管理，包含技术资产、知识产权、知识库等 |
| 09-YYC3-Music-player-智能演进优化 | 演进与优化，包含智能演进、功能演进、架构演进等 |

"""

        reading_guide = """## 文档查阅指南

### 快速导航
- **项目总览**：从 [00-YYC3-Music-player-项目总览索引](00-YYC3-Music-player-项目总览索引/README.md) 开始了解项目整体情况
- **按阶段查阅**：根据项目所处阶段，选择对应的目录进行深入阅读
- **按主题查阅**：使用搜索功能快速定位相关主题文档

### 文档结构说明
- **一级目录**：按项目阶段划分（如启动规划、设计、开发等）
- **二级目录**：按功能模块划分（如项目规划、需求规划等）
- **三级目录**：按技术层次划分（如前端/后端/移动端架构）
- **预留文档**：每个目录都包含预留文档，用于记录未来可能添加的内容

### 自动同步机制
- 所有目录的 README.md 文件会自动同步显示当前目录下的所有文档
- 根目录的 README.md 会自动同步显示所有子目录的结构
- 每次运行脚本时，README 文件会自动更新以反映最新的文档结构

"""

        metadata = DocumentMetadata(
            file_name="README.md",
            description="YYC3-Music-player 文档架构总索引",
            created=now,
            updated=now,
            tags=["文档索引", "总览"],
            category="index"
        )

        return f"""{metadata.to_yaml_front_matter()}

{BRAND_HEADER}

---

# YYC3-Music-player 文档架构总索引

{CORE_PHILOSOPHY}

---

## 概述

YYC³（YanYuCloudCube）Music-player 是一个现代化的音乐创作与分享平台，集成了 AI 创作工具、社交互动、时空喊话等创新功能。

{function_overview}

## 文档架构

{doc_tree_str}

{reading_guide}

---

## 变更历史

| 版本 | 日期 | 变更内容 | 作者 |
|------|------|----------|------|
| v3.1.0 | {now} | 重构文档引擎，融入团队标准与行业规范 | YanYuCloudCube Team |

---

{BRAND_FOOTER}
"""


# ===================== 目录结构创建器 =====================
def create_directory_structure(base_path: str, struct: dict) -> List[Dict]:
    docs = []
    for category, content in struct.items():
        category_path = os.path.join(base_path, category)
        os.makedirs(category_path, exist_ok=True)

        docs.append({
            'type': 'readme',
            'path': os.path.join(category_path, "README.md"),
            'category': category,
            'description': f"{category} 目录文档索引"
        })

        if isinstance(content, list):
            docs.append({
                'type': 'reserved',
                'path': os.path.join(category_path, "RES-DOC-001.md"),
                'category': category,
                'tags': f"[{category}],[预留文档]"
            })
            for doc_id, doc_name, doc_desc, tags in content:
                file_name = f"{doc_id}-{PROJECT_CODE}-{category.split('-')[-1]}-{doc_name}.md"
                docs.append({
                    'type': 'document',
                    'path': os.path.join(category_path, file_name),
                    'category': category,
                    'doc_id': doc_id,
                    'doc_name': doc_name,
                    'doc_desc': doc_desc,
                    'tags': tags
                })
        elif isinstance(content, dict):
            for subcategory, docs_or_sub in content.items():
                subcategory_path = os.path.join(category_path, subcategory)
                os.makedirs(subcategory_path, exist_ok=True)

                docs.append({
                    'type': 'readme',
                    'path': os.path.join(subcategory_path, "README.md"),
                    'category': category,
                    'subcategory': subcategory,
                    'description': f"{category}/{subcategory} 目录文档索引"
                })

                if isinstance(docs_or_sub, list):
                    docs.append({
                        'type': 'reserved',
                        'path': os.path.join(subcategory_path, "RES-DOC-001.md"),
                        'category': category,
                        'subcategory': subcategory,
                        'tags': f"[{category}],[{subcategory}],[预留文档]"
                    })
                    for doc_id, doc_name, doc_desc, tags in docs_or_sub:
                        file_name = f"{doc_id}-{PROJECT_CODE}-{category.split('-')[-1]}-{doc_name}.md"
                        docs.append({
                            'type': 'document',
                            'path': os.path.join(subcategory_path, file_name),
                            'category': category,
                            'subcategory': subcategory,
                            'doc_id': doc_id,
                            'doc_name': doc_name,
                            'doc_desc': doc_desc,
                            'tags': tags
                        })
                elif isinstance(docs_or_sub, dict):
                    for third_level, third_docs in docs_or_sub.items():
                        third_level_path = os.path.join(subcategory_path, third_level)
                        os.makedirs(third_level_path, exist_ok=True)

                        docs.append({
                            'type': 'readme',
                            'path': os.path.join(third_level_path, "README.md"),
                            'category': category,
                            'subcategory': subcategory,
                            'third_level': third_level,
                            'description': f"{category}/{subcategory}/{third_level} 目录文档索引"
                        })

                        docs.append({
                            'type': 'reserved',
                            'path': os.path.join(third_level_path, "RES-DOC-001.md"),
                            'category': category,
                            'subcategory': subcategory,
                            'third_level': third_level,
                            'tags': f"[{category}],[{subcategory}],[{third_level}],[预留文档]"
                        })

                        for doc_id, doc_name, doc_desc, tags in third_docs:
                            file_name = f"{doc_id}-{PROJECT_CODE}-{category.split('-')[-1]}-{doc_name}.md"
                            docs.append({
                                'type': 'document',
                                'path': os.path.join(third_level_path, file_name),
                                'category': category,
                                'subcategory': subcategory,
                                'third_level': third_level,
                                'doc_id': doc_id,
                                'doc_name': doc_name,
                                'doc_desc': doc_desc,
                                'tags': tags
                            })
    return docs


def generate_documents(docs_config: List[Dict], engine: YYC3MusicDocumentEngine, generator: DocumentContentGenerator) -> None:
    for doc in docs_config:
        doc_type = doc.get('type', 'document')
        path = doc.get('path', '')
        category = doc.get('category', '')
        subcategory = doc.get('subcategory', '')
        third_level = doc.get('third_level', '')
        doc_name = doc.get('doc_name', '')
        doc_desc = doc.get('doc_desc', '')
        tags = doc.get('tags', '')

        if doc_type == 'readme':
            dir_name = category
            if subcategory:
                dir_name = subcategory
            if third_level:
                dir_name = third_level
            dir_description = doc.get('description', f"{dir_name} 目录文档索引")

            doc_list = []
            for d in docs_config:
                if d.get('type') == 'document':
                    d_cat = d.get('category', '')
                    d_sub = d.get('subcategory', '')
                    d_third = d.get('third_level', '')
                    if d_cat == category:
                        if subcategory and d_sub != subcategory:
                            continue
                        if third_level and d_third != third_level:
                            continue
                        if not subcategory and d_sub:
                            continue
                        if not third_level and d_third:
                            continue
                        doc_list.append({
                            'name': d.get('doc_name', ''),
                            'description': d.get('doc_desc', ''),
                            'tags': d.get('tags', '')
                        })

            content = generator.generate_readme_document(dir_name, dir_description, doc_list)
            metadata = DocumentMetadata(
                file_name="README.md",
                description=dir_description,
                tags=["文档索引", "README"],
                category=category
            )
            engine.save_document(content, path, metadata)

        elif doc_type == 'reserved':
            content = generator.generate_reserved_document(category)
            metadata = DocumentMetadata(
                file_name="RES-DOC-001.md",
                description="预留文档，用于记录未来可能添加的内容",
                status="reserved",
                tags=[category, "预留文档"],
                category="reserved"
            )
            engine.save_document(content, path, metadata)

        elif doc_type == 'document':
            metadata = DocumentMetadata(
                file_name=os.path.basename(path),
                description=doc_desc,
                tags=tags.strip('[]').split('],[') if tags else [],
                category=category
            )
            content = generator.generate_main_document(metadata, category, doc_name)
            engine.save_document(content, path, metadata)


def generate_root_readme(document_root: str, engine: YYC3MusicDocumentEngine, generator: DocumentContentGenerator) -> None:
    root_readme_path = os.path.join(document_root, "README.md")
    content = generator.generate_root_readme(document_root)
    metadata = DocumentMetadata(
        file_name="README.md",
        description="YYC3-Music-player 文档架构总索引",
        tags=["文档索引", "总览"],
        category="index"
    )
    engine.save_document(content, root_readme_path, metadata)


def generate_frontend_docs(document_root: str, engine: YYC3MusicDocumentEngine, generator: DocumentContentGenerator) -> None:
    frontend_path = os.path.join(document_root, "frontend")
    os.makedirs(frontend_path, exist_ok=True)
    docs_config = create_directory_structure(frontend_path, FRONTEND_DOC_STRUCT)
    generate_documents(docs_config, engine, generator)


def generate_backend_docs(document_root: str, engine: YYC3MusicDocumentEngine, generator: DocumentContentGenerator) -> None:
    backend_path = os.path.join(document_root, "backend")
    os.makedirs(backend_path, exist_ok=True)
    docs_config = create_directory_structure(backend_path, BACKEND_DOC_STRUCT)
    generate_documents(docs_config, engine, generator)


def generate_mobile_docs(document_root: str, engine: YYC3MusicDocumentEngine, generator: DocumentContentGenerator) -> None:
    mobile_path = os.path.join(document_root, "mobile")
    os.makedirs(mobile_path, exist_ok=True)
    docs_config = create_directory_structure(mobile_path, MOBILE_DOC_STRUCT)
    generate_documents(docs_config, engine, generator)


def generate_project_docs(document_root: str, engine: YYC3MusicDocumentEngine, generator: DocumentContentGenerator) -> None:
    os.makedirs(document_root, exist_ok=True)
    docs_config = create_directory_structure(document_root, PROJECT_DOC_STRUCT)
    generate_documents(docs_config, engine, generator)
    generate_root_readme(document_root, engine, generator)


def main():
    parser = argparse.ArgumentParser(
        description="YYC³ Music-player 文档架构闭环生成引擎 v3.1.0",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
示例:
  python YYC3-Music-Docs.py --output docs
  python YYC3-Music-Docs.py --output docs --frontend-only
  python YYC3-Music-Docs.py --output docs --validate
        """
    )
    parser.add_argument(
        '--output', '-o',
        default='docs',
        help='文档输出目录 (默认: docs)'
    )
    parser.add_argument(
        '--project-root', '-p',
        default='.',
        help='项目根目录 (默认: 当前目录)'
    )
    parser.add_argument(
        '--frontend-only',
        action='store_true',
        help='仅生成前端文档'
    )
    parser.add_argument(
        '--backend-only',
        action='store_true',
        help='仅生成后端文档'
    )
    parser.add_argument(
        '--mobile-only',
        action='store_true',
        help='仅生成移动端文档'
    )
    parser.add_argument(
        '--validate', '-v',
        action='store_true',
        help='验证现有文档是否符合规范'
    )
    parser.add_argument(
        '--clean', '-c',
        action='store_true',
        help='清理并重新生成所有文档'
    )

    args = parser.parse_args()

    if args.clean and os.path.exists(args.output):
        shutil.rmtree(args.output)
        logger.info(f"已清理文档目录: {args.output}")

    engine = YYC3MusicDocumentEngine(output_dir=args.output, project_root=args.project_root)
    generator = DocumentContentGenerator(engine)

    if args.validate:
        results = engine.batch_validate(args.output)
        total = len(results)
        passed = sum(1 for ok, _ in results.values() if ok)
        failed = total - passed
        logger.info(f"验证完成: 总计 {total} 个文档, 通过 {passed} 个, 失败 {failed} 个")
        for file_path, (ok, errors) in results.items():
            status = "✅ 通过" if ok else "❌ 失败"
            logger.info(f"{status}: {file_path}")
            if not ok:
                for err in errors:
                    logger.warning(f"  - {err}")
        return

    document_root = args.output

    if args.frontend_only:
        generate_frontend_docs(document_root, engine, generator)
    elif args.backend_only:
        generate_backend_docs(document_root, engine, generator)
    elif args.mobile_only:
        generate_mobile_docs(document_root, engine, generator)
    else:
        generate_project_docs(document_root, engine, generator)
        generate_frontend_docs(document_root, engine, generator)
        generate_backend_docs(document_root, engine, generator)
        generate_mobile_docs(document_root, engine, generator)

    logger.info("=" * 60)
    logger.info("文档架构生成完成")
    logger.info(f"输出目录: {os.path.abspath(args.output)}")
    logger.info(f"文档总数: {len(engine.document_registry)}")
    logger.info("=" * 60)

    results = engine.batch_validate(args.output)
    total = len(results)
    passed = sum(1 for ok, _ in results.values() if ok)
    failed = total - passed
    logger.info(f"文档验证: 总计 {total} 个文档, 通过 {passed} 个, 失败 {failed} 个")

    if failed > 0:
        for file_path, (ok, errors) in results.items():
            if not ok:
                logger.warning(f"❌ 验证失败: {file_path}")
                for err in errors:
                    logger.warning(f"  - {err}")


if __name__ == "__main__":
    main()
