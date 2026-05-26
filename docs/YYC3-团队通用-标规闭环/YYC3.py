#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@file: YYC3-Document-Template-Engine.py
@description: YYC³文档模版引擎 - 可复用、可迭代、可追溯的文档闭环生成系统
@author: YanYuCloudCube Team
@version: v3.0.0
@created: 2026-05-01
@updated: 2026-05-22
@copyright: Copyright (c) 2026 YYC3
@license: MIT
"""

import os
import sys
import json
import hashlib
import datetime
import argparse
import logging
import uuid
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

try:
    import yaml
except ImportError:
    logger.error("缺少依赖: pyyaml，请执行 pip install pyyaml")
    sys.exit(1)


class DocumentType(Enum):
    MAIN = "main"
    README = "readme"
    ROOT_README = "root_readme"
    RESERVED = "reserved"
    TEMPLATE = "template"


@dataclass
class DocumentMetadata:
    file_name: str
    description: str
    author: str = "YanYuCloudCube Team"
    version: str = "v3.0.0"
    created: str = field(default_factory=lambda: datetime.datetime.now().strftime("%Y-%m-%d"))
    updated: str = field(default_factory=lambda: datetime.datetime.now().strftime("%Y-%m-%d"))
    status: str = "published"
    tags: List[str] = field(default_factory=list)
    checksum: str = ""
    trace_id: str = ""
    parent_doc: str = ""
    related_docs: List[str] = field(default_factory=list)

    def __post_init__(self):
        if not self.trace_id:
            self.trace_id = f"YYC3-{uuid.uuid4().hex[:12].upper()}"


@dataclass
class TemplateConfig:
    template_id: str
    template_name: str
    template_version: str
    template_type: DocumentType
    content_template: str
    variables: Dict[str, Any] = field(default_factory=dict)
    validation_rules: Dict[str, Any] = field(default_factory=dict)


class YYC3TemplateEngine:
    """YYC³文档模版引擎"""

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
        self.templates: Dict[str, TemplateConfig] = {}
        self.document_registry: Dict[str, DocumentMetadata] = {}
        self.traceability_chain: List[Dict] = []
        self._stats = {"dirs_created": 0, "docs_created": 0, "readmes_created": 0, "errors": 0}

    def generate_checksum(self, content: str) -> str:
        return hashlib.sha256(content.encode('utf-8')).hexdigest()[:16]

    def load_template_config(self, config_path: str) -> None:
        try:
            with open(config_path, 'r', encoding='utf-8') as f:
                config_data = yaml.safe_load(f)
                for template_id, config in config_data.get('templates', {}).items():
                    self.templates[template_id] = TemplateConfig(
                        template_id=template_id,
                        template_name=config.get('name', ''),
                        template_version=config.get('version', 'v1.0.0'),
                        template_type=DocumentType(config.get('type', 'main')),
                        content_template=config.get('content', ''),
                        variables=config.get('variables', {}),
                        validation_rules=config.get('validation', {})
                    )
            logger.info(f"已加载 {len(self.templates)} 个模版配置")
        except FileNotFoundError:
            logger.warning(f"模版配置文件未找到: {config_path}")

    def render_template(self, template_id: str, variables: Dict[str, Any]) -> str:
        if template_id not in self.templates:
            raise ValueError(f"模版不存在: {template_id}")
        template = self.templates[template_id]
        content = template.content_template
        merged_vars = {**template.variables, **variables}
        today = datetime.datetime.now().strftime("%Y-%m-%d")
        merged_vars.setdefault("created_date", today)
        merged_vars.setdefault("updated_date", today)
        merged_vars.setdefault("author", "YanYuCloudCube Team")
        merged_vars.setdefault("version", "v3.0.0")
        merged_vars.setdefault("status", "published")
        merged_vars.setdefault("tags", "")
        merged_vars.setdefault("checksum", "")
        merged_vars.setdefault("trace_id", f"YYC3-{uuid.uuid4().hex[:12].upper()}")
        merged_vars.setdefault("related_docs", "无")
        for key, value in merged_vars.items():
            placeholder = f"{{{{{key}}}}}"
            content = content.replace(placeholder, str(value))
        return content

    def generate_main_document(self, metadata: DocumentMetadata, content_sections: Dict[str, str]) -> str:
        tags_str = ','.join(metadata.tags) if metadata.tags else ''
        title = metadata.file_name.replace('.md', '').replace('-', ' ')
        related_str = ', '.join(metadata.related_docs) if metadata.related_docs else '无'

        doc_content = f"""---
@file: {metadata.file_name}
@description: {metadata.description}
@author: {metadata.author}
@version: {metadata.version}
@created: {metadata.created}
@updated: {metadata.updated}
@status: {metadata.status}
@tags: [{tags_str}]
@checksum: {metadata.checksum}
@trace_id: {metadata.trace_id}
---

{self.BRAND_HEADER}

---

# {title}

{self.CORE_PHILOSOPHY}

---

## 文档概述

{metadata.description}

---

"""
        for section_name, section_content in content_sections.items():
            doc_content += f"## {section_name}\n\n{section_content}\n\n---\n\n"

        doc_content += f"""
## 文档追溯信息

| 属性 | 值 |
|------|-----|
| 文档版本 | {metadata.version} |
| 创建日期 | {metadata.created} |
| 更新日期 | {metadata.updated} |
| 内容校验 | {metadata.checksum} |
| 追溯ID | {metadata.trace_id} |
| 关联文档 | {related_str} |

---

{self.BRAND_FOOTER}
"""
        return doc_content

    def generate_readme_document(self, dir_name: str, dir_description: str, doc_list: List[Dict]) -> str:
        doc_table = "| 序号 | 文档名称 | 描述 | 标签 |\n|------|----------|------|------|\n"
        for idx, doc in enumerate(doc_list, 1):
            name = doc.get('name', '')
            desc = doc.get('description', doc.get('desc', ''))
            tags = doc.get('tags', '')
            doc_table += f"| {idx} | [{name}]({name}) | {desc} | {tags} |\n"

        today = datetime.datetime.now().strftime("%Y-%m-%d")
        return f"""---
@file: README.md
@description: {dir_name} 目录文档索引
@author: YanYuCloudCube Team
@version: v3.0.0
@created: {today}
@updated: {today}
@status: published
@tags: [文档索引],[README]
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

- **命名规范**：`{{编号}}-{{阶段}}-{{模块}}-{{文档名称}}.md`
- **版本规范**：主版本.次版本.修订版本 (如 v3.0.0)
- **标签规范**：使用方括号包裹，如 `[标签1],[标签2]`

---

{self.BRAND_FOOTER}
"""

    def generate_reserved_document(self, dir_name: str, category: str) -> str:
        today = datetime.datetime.now().strftime("%Y-%m-%d")
        return f"""---
@file: RES-DOC-001.md
@description: 预留文档，用于记录未来可能添加的内容
@author: YanYuCloudCube Team
@version: v3.0.0
@created: {today}
@updated: {today}
@status: reserved
@tags: [{category}],[预留文档]
---

{self.BRAND_HEADER}

---

# 预留文档

## 说明

本文档为预留文档，用于记录未来可能添加的内容。

当有新的文档需求时，可以基于本模版进行扩展。

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
            "trace_id": doc_metadata.trace_id,
            "author": doc_metadata.author
        }

    def save_document(self, content: str, output_path: str) -> bool:
        try:
            path = Path(output_path)
            path.parent.mkdir(parents=True, exist_ok=True)
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        except Exception as e:
            logger.error(f"保存文档失败: {e}")
            return False

    def validate_document(self, content: str, rules: Optional[Dict[str, Any]] = None) -> Tuple[bool, List[str]]:
        if rules is None:
            rules = {}
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
        if rules.get('require_core_philosophy', True):
            if '五高架构' not in content:
                errors.append("缺少核心理念块")
        min_len = rules.get('min_length', 0)
        if min_len > 0 and len(content) < min_len:
            errors.append(f"文档长度不足: {len(content)} < {min_len}")
        return len(errors) == 0, errors

    def register_document(self, doc_path: str, metadata: DocumentMetadata) -> None:
        self.document_registry[doc_path] = metadata
        record = self.generate_traceability_record(metadata, "created")
        self.traceability_chain.append(record)

    def export_registry(self, output_path: str) -> None:
        registry_data = {
            "export_time": datetime.datetime.now().isoformat(),
            "engine_version": "v3.0.0",
            "total_documents": len(self.document_registry),
            "documents": {
                doc_id: {
                    "file_name": meta.file_name,
                    "description": meta.description,
                    "version": meta.version,
                    "checksum": meta.checksum,
                    "trace_id": meta.trace_id,
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

    def _build_doc_filename(self, parent_prefix: str, sub_key: str, doc_entry: Dict) -> str:
        doc_id = doc_entry.get('id', '001')
        name = doc_entry.get('name', '未命名')
        safe_name = name.replace(' ', '-').replace('(', '').replace(')', '')
        return f"{parent_prefix}-{sub_key.split('-')[-1]}-{doc_id}-{safe_name}.md"

    def _sanitize_filename(self, name: str) -> str:
        return name.replace(' ', '-').replace('(', '').replace(')', '')

    def generate_all(self, project_structure: Dict) -> Dict:
        logger.info("=" * 60)
        logger.info("YYC³ 文档架构生成引擎启动")
        logger.info(f"输出目录: {self.output_dir.resolve()}")
        logger.info("=" * 60)

        self.output_dir.mkdir(parents=True, exist_ok=True)

        all_doc_list_for_root = []

        for phase_key, phase_config in project_structure.items():
            phase_dir = self.output_dir / phase_key
            phase_dir.mkdir(parents=True, exist_ok=True)
            self._stats["dirs_created"] += 1
            logger.info(f"\n{'─' * 40}")
            logger.info(f"[阶段] {phase_key}")
            logger.info(f"{'─' * 40}")

            phase_description = phase_config.get('description', '')
            phase_docs = phase_config.get('documents', [])
            phase_subs = phase_config.get('subcategories', {})

            phase_readme_docs = []

            if phase_docs:
                for doc_entry in phase_docs:
                    doc_id = doc_entry.get('id', '001')
                    doc_name = doc_entry.get('name', '未命名')
                    doc_desc = doc_entry.get('desc', '')
                    doc_tags = doc_entry.get('tags', phase_key)
                    safe_name = self._sanitize_filename(doc_name)
                    file_name = f"{phase_key}-{doc_id}-{safe_name}.md"
                    file_path = phase_dir / file_name

                    metadata = DocumentMetadata(
                        file_name=file_name,
                        description=doc_desc,
                        tags=[doc_tags, doc_name]
                    )

                    content_sections = {
                        "详细内容": f"> 本文档待填充: {doc_desc}"
                    }

                    doc_content = self.generate_main_document(metadata, content_sections)
                    metadata.checksum = self.generate_checksum(doc_content)

                    if self.save_document(doc_content, str(file_path)):
                        self.register_document(str(file_path), metadata)
                        self._stats["docs_created"] += 1
                        logger.info(f"  [文档] {file_name}")

                    phase_readme_docs.append({
                        "name": file_name,
                        "description": doc_desc,
                        "tags": doc_tags
                    })

            for sub_key, sub_config in phase_subs.items():
                sub_dir = phase_dir / sub_key
                sub_dir.mkdir(parents=True, exist_ok=True)
                self._stats["dirs_created"] += 1
                logger.info(f"  [子目录] {sub_key}")

                sub_docs = sub_config.get('documents', [])
                sub_subs = sub_config.get('subcategories', {})
                sub_readme_docs = []

                for doc_entry in sub_docs:
                    doc_id = doc_entry.get('id', '001')
                    doc_name = doc_entry.get('name', '未命名')
                    doc_desc = doc_entry.get('desc', '')
                    doc_tags = doc_entry.get('tags', sub_key)
                    safe_name = self._sanitize_filename(doc_name)
                    file_name = f"{sub_key}-{doc_id}-{safe_name}.md"
                    file_path = sub_dir / file_name

                    metadata = DocumentMetadata(
                        file_name=file_name,
                        description=doc_desc,
                        tags=[doc_tags, doc_name]
                    )

                    content_sections = {
                        "详细内容": f"> 本文档待填充: {doc_desc}"
                    }

                    doc_content = self.generate_main_document(metadata, content_sections)
                    metadata.checksum = self.generate_checksum(doc_content)

                    if self.save_document(doc_content, str(file_path)):
                        self.register_document(str(file_path), metadata)
                        self._stats["docs_created"] += 1
                        logger.info(f"    [文档] {file_name}")

                    sub_readme_docs.append({
                        "name": file_name,
                        "description": doc_desc,
                        "tags": doc_tags
                    })

                for deep_key, deep_config in sub_subs.items():
                    deep_dir = sub_dir / deep_key
                    deep_dir.mkdir(parents=True, exist_ok=True)
                    self._stats["dirs_created"] += 1
                    logger.info(f"    [深层目录] {deep_key}")

                    deep_docs = deep_config.get('documents', [])
                    deep_readme_docs = []

                    if deep_docs:
                        for doc_entry in deep_docs:
                            doc_id = doc_entry.get('id', '001')
                            doc_name = doc_entry.get('name', '未命名')
                            doc_desc = doc_entry.get('desc', '')
                            doc_tags = doc_entry.get('tags', deep_key)
                            safe_name = self._sanitize_filename(doc_name)
                            file_name = f"{deep_key}-{doc_id}-{safe_name}.md"
                            file_path = deep_dir / file_name

                            metadata = DocumentMetadata(
                                file_name=file_name,
                                description=doc_desc,
                                tags=[doc_tags, doc_name]
                            )

                            content_sections = {
                                "详细内容": f"> 本文档待填充: {doc_desc}"
                            }

                            doc_content = self.generate_main_document(metadata, content_sections)
                            metadata.checksum = self.generate_checksum(doc_content)

                            if self.save_document(doc_content, str(file_path)):
                                self.register_document(str(file_path), metadata)
                                self._stats["docs_created"] += 1
                                logger.info(f"      [文档] {file_name}")

                            deep_readme_docs.append({
                                "name": file_name,
                                "description": doc_desc,
                                "tags": doc_tags
                            })
                    else:
                        res_content = self.generate_reserved_document(deep_key, deep_key)
                        res_path = deep_dir / "RES-DOC-001.md"
                        if self.save_document(res_content, str(res_path)):
                            self._stats["docs_created"] += 1
                            logger.info(f"      [预留] RES-DOC-001.md")
                        deep_readme_docs.append({
                            "name": "RES-DOC-001.md",
                            "description": "预留文档",
                            "tags": deep_key
                        })

                    deep_readme = self.generate_readme_document(deep_key, f"{deep_key} 相关文档", deep_readme_docs)
                    deep_readme_path = deep_dir / "README.md"
                    self.save_document(deep_readme, str(deep_readme_path))
                    self._stats["readmes_created"] += 1

                sub_description = sub_config.get('description', f"{sub_key} 相关文档")
                sub_readme = self.generate_readme_document(sub_key, sub_description, sub_readme_docs)
                sub_readme_path = sub_dir / "README.md"
                self.save_document(sub_readme, str(sub_readme_path))
                self._stats["readmes_created"] += 1

                phase_readme_docs.extend(sub_readme_docs)

            phase_readme = self.generate_readme_document(phase_key, phase_description, phase_readme_docs)
            phase_readme_path = phase_dir / "README.md"
            self.save_document(phase_readme, str(phase_readme_path))
            self._stats["readmes_created"] += 1

            all_doc_list_for_root.append({
                "name": phase_key,
                "description": phase_description,
                "tags": "阶段索引"
            })

        root_readme_content = self.generate_readme_document(
            "YYC³ 项目文档体系",
            "YYC³ (YanYuCloudCube) 项目全生命周期文档体系，遵循「五高五标五化五维」标准体系。",
            all_doc_list_for_root
        )
        root_readme_path = self.output_dir / "README.md"
        self.save_document(root_readme_content, str(root_readme_path))
        self._stats["readmes_created"] += 1

        registry_path = self.output_dir / "document_registry.json"
        self.export_registry(str(registry_path))

        self._print_stats()
        return self._stats

    def _print_stats(self):
        logger.info("\n" + "=" * 60)
        logger.info("YYC³ 文档架构生成完成")
        logger.info("=" * 60)
        logger.info(f"  目录创建数: {self._stats['dirs_created']}")
        logger.info(f"  文档创建数: {self._stats['docs_created']}")
        logger.info(f"  README创建: {self._stats['readmes_created']}")
        logger.info(f"  注册文档数: {len(self.document_registry)}")
        logger.info(f"  追溯记录数: {len(self.traceability_chain)}")
        logger.info(f"  错误数:     {self._stats['errors']}")
        logger.info("=" * 60)


PROJECT_STRUCTURE = {
    "00-项目总览索引": {
        "description": "项目全局视图与导航",
        "documents": [
            {"id": "001", "name": "项目总览手册", "desc": "项目立项核心依据与目标范围"},
            {"id": "002", "name": "文档架构导航", "desc": "文档体系导航与索引"},
            {"id": "003", "name": "快速开始指南", "desc": "项目快速启动与使用指南"},
            {"id": "004", "name": "核心概念词典", "desc": "项目核心概念与术语定义"},
            {"id": "005", "name": "版本更新日志", "desc": "项目版本迭代与变更记录"},
        ]
    },
    "01-启动规划阶段": {
        "description": "项目启动与规划管理",
        "subcategories": {
            "0101-项目规划": {
                "description": "项目规划核心文档",
                "documents": [
                    {"id": "001", "name": "项目章程与愿景", "desc": "项目立项核心依据"},
                    {"id": "002", "name": "项目范围说明书", "desc": "项目范围边界定义"},
                    {"id": "003", "name": "项目里程碑计划", "desc": "阶段里程碑与任务拆解"},
                    {"id": "004", "name": "项目资源规划", "desc": "资源统筹分配"},
                    {"id": "005", "name": "干系人管理计划", "desc": "相关方识别与沟通策略"},
                ]
            },
            "0102-需求规划": {
                "description": "需求分析与规划",
                "documents": [
                    {"id": "001", "name": "业务需求分析", "desc": "核心业务需求梳理"},
                    {"id": "002", "name": "用户需求调研报告", "desc": "用户痛点与期望分析"},
                    {"id": "003", "name": "产品需求文档-PRD", "desc": "功能规格与验收标准"},
                    {"id": "004", "name": "需求优先级矩阵", "desc": "需求优先级评估排序"},
                ]
            },
            "0103-可行性分析": {
                "description": "可行性评估与分析",
                "documents": [
                    {"id": "001", "name": "技术可行性分析", "desc": "技术风险评估"},
                    {"id": "002", "name": "经济可行性分析", "desc": "成本效益分析"},
                    {"id": "003", "name": "市场可行性分析", "desc": "市场前景与竞争分析"},
                    {"id": "004", "name": "操作可行性分析", "desc": "实施难度与运营风险"},
                ]
            },
            "0104-风险管理": {
                "description": "风险识别与应对",
                "documents": [
                    {"id": "001", "name": "项目初期风险评估", "desc": "全周期风险识别"},
                    {"id": "002", "name": "风险应对预案", "desc": "风险应对策略"},
                    {"id": "003", "name": "项目预算与成本控制", "desc": "预算编制与控制"},
                    {"id": "004", "name": "项目成功标准定义", "desc": "成功度量指标"},
                ]
            }
        }
    },
    "02-项目设计阶段": {
        "description": "系统架构与详细设计",
        "subcategories": {
            "0201-架构设计": {
                "description": "系统架构设计",
                "documents": [
                    {"id": "001", "name": "系统架构总览图", "desc": "整体架构视图"},
                    {"id": "002", "name": "九层功能架构设计", "desc": "分层架构设计"},
                    {"id": "003", "name": "技术选型论证报告", "desc": "技术栈选型依据"},
                    {"id": "004", "name": "微服务架构设计", "desc": "服务拆分与治理"},
                    {"id": "005", "name": "网络拓扑图", "desc": "网络架构设计"},
                    {"id": "006", "name": "高可用设计", "desc": "容灾与高可用方案"},
                ]
            },
            "0202-详细设计": {
                "description": "各层详细设计文档",
                "subcategories": {
                    "基础设施层": {
                        "description": "基础设施层设计",
                        "documents": [
                            {"id": "001", "name": "基础设施层设计", "desc": "云基础设施与部署架构"},
                        ]
                    },
                    "数据存储层": {
                        "description": "数据存储层设计",
                        "documents": [
                            {"id": "001", "name": "数据存储层设计", "desc": "数据模型与存储方案"},
                        ]
                    },
                    "核心服务层": {
                        "description": "核心服务层设计",
                        "documents": [
                            {"id": "001", "name": "核心服务层设计", "desc": "核心业务服务架构"},
                        ]
                    },
                    "AI智能层": {
                        "description": "AI智能层设计",
                        "documents": [
                            {"id": "001", "name": "AI智能层设计", "desc": "AI模型与智能服务架构"},
                        ]
                    },
                    "业务逻辑层": {
                        "description": "业务逻辑层设计",
                        "documents": [
                            {"id": "001", "name": "业务逻辑层设计", "desc": "业务逻辑与流程设计"},
                        ]
                    },
                    "应用表现层": {
                        "description": "应用表现层设计",
                        "documents": [
                            {"id": "001", "name": "应用表现层设计", "desc": "前端应用与UI架构"},
                        ]
                    },
                    "用户交互层": {
                        "description": "用户交互层设计",
                        "documents": [
                            {"id": "001", "name": "用户交互层设计", "desc": "用户体验与交互设计"},
                        ]
                    },
                }
            }
        }
    },
    "03-开发实施阶段": {
        "description": "代码开发与实施",
        "subcategories": {
            "0301-开发环境": {
                "description": "开发环境配置",
                "documents": [
                    {"id": "001", "name": "开发环境搭建指南", "desc": "环境配置说明"},
                    {"id": "002", "name": "多环境配置规范", "desc": "环境隔离策略"},
                ]
            },
            "0302-开发规范": {
                "description": "开发规范与标准",
                "documents": [
                    {"id": "001", "name": "Git工作流规范", "desc": "分支管理策略"},
                    {"id": "002", "name": "代码提交规范", "desc": "提交信息格式"},
                    {"id": "003", "name": "代码注释规范", "desc": "注释标准格式"},
                ]
            }
        }
    },
    "04-测试审核阶段": {
        "description": "质量保障与审核",
        "subcategories": {
            "0401-测试策略": {
                "description": "测试策略与方案",
                "documents": [
                    {"id": "001", "name": "测试策略总纲", "desc": "整体测试方案"},
                    {"id": "002", "name": "测试环境管理规范", "desc": "测试环境配置"},
                ]
            },
            "0406-质量审核": {
                "description": "质量审核与门禁",
                "documents": [
                    {"id": "001", "name": "代码质量审核标准", "desc": "代码质量度量"},
                    {"id": "002", "name": "质量门禁标准", "desc": "质量准入准出标准"},
                ]
            }
        }
    },
    "05-交付部署阶段": {
        "description": "项目交付与部署",
        "subcategories": {
            "0507-交付物管理": {
                "description": "交付物管理",
                "documents": [
                    {"id": "001", "name": "交付物清单", "desc": "交付物列表"},
                    {"id": "002", "name": "交付验收标准", "desc": "验收标准定义"},
                ]
            }
        }
    },
    "06-运维保障阶段": {
        "description": "系统运维与保障",
        "subcategories": {
            "0601-运维策略": {
                "description": "运维策略与方案",
                "documents": [
                    {"id": "001", "name": "运维策略总纲", "desc": "运维整体方案"},
                ]
            }
        }
    },
    "07-合规安全保障": {
        "description": "安全与合规管理",
        "subcategories": {
            "0702-安全管理": {
                "description": "安全管理规范",
                "documents": [
                    {"id": "001", "name": "安全开发规范", "desc": "安全编码标准"},
                    {"id": "002", "name": "安全运维规范", "desc": "安全运维流程"},
                ]
            }
        }
    },
    "08-资产知识管理": {
        "description": "资产与知识管理",
        "subcategories": {
            "0801-资产管理": {
                "description": "资产管理文档",
                "documents": [
                    {"id": "001", "name": "资产清单", "desc": "项目资产列表"},
                ]
            }
        }
    },
    "09-智能演进优化": {
        "description": "持续演进与优化",
        "subcategories": {
            "0907-质量提升": {
                "description": "质量提升计划",
                "documents": [
                    {"id": "001", "name": "持续改进计划", "desc": "优化改进方案"},
                ]
            }
        }
    }
}


def main():
    parser = argparse.ArgumentParser(description='YYC³文档模版引擎 - 可复用、可迭代、可追溯的文档闭环生成系统')
    parser.add_argument('--output', '-o', default=None, help='输出目录 (默认: 脚本所在目录)')
    parser.add_argument('--config', '-c', default=None, help='模版配置文件路径')
    parser.add_argument('--validate', '-v', action='store_true', help='生成后验证所有文档')
    parser.add_argument('--export-registry', '-e', action='store_true', help='导出文档注册表')
    parser.add_argument('--dry-run', '-d', action='store_true', help='试运行，仅输出日志不写文件')

    args = parser.parse_args()

    script_dir = Path(__file__).parent.resolve()
    if args.output:
        output_dir = Path(args.output)
    else:
        output_dir = script_dir

    config_path = args.config or str(script_dir / "template_config.yaml")

    engine = YYC3TemplateEngine(str(output_dir))

    if os.path.exists(config_path):
        engine.load_template_config(config_path)
        logger.info(f"模版配置已加载: {config_path}")
    else:
        logger.warning(f"模版配置文件未找到: {config_path}，将使用内置模版")

    logger.info("开始生成文档架构...")
    stats = engine.generate_all(PROJECT_STRUCTURE)

    if args.validate:
        logger.info("\n开始验证文档...")
        validation_rules = {
            'require_brand_header': True,
            'require_brand_footer': True,
            'require_metadata': True,
            'require_core_philosophy': True,
            'min_length': 200
        }
        valid_count = 0
        invalid_count = 0
        for doc_path, metadata in engine.document_registry.items():
            try:
                with open(doc_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                is_valid, errors = engine.validate_document(content, validation_rules)
                if is_valid:
                    valid_count += 1
                else:
                    invalid_count += 1
                    logger.warning(f"验证失败 [{metadata.file_name}]: {errors}")
            except Exception as e:
                invalid_count += 1
                logger.error(f"读取失败 [{doc_path}]: {e}")
        logger.info(f"验证完成: 通过 {valid_count}, 失败 {invalid_count}")

    if args.export_registry:
        registry_path = os.path.join(str(output_dir), "document_registry.json")
        engine.export_registry(registry_path)

    logger.info("\nYYC³ 文档模版引擎执行完成 ✓")


if __name__ == "__main__":
    main()
