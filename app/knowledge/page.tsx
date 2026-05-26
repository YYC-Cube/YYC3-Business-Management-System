// app/knowledge/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { DataTable } from '@/components/business/data-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, 
  Search, 
  Plus, 
  FileText,
  Calendar,
  User,
  Eye,
  Edit,
  Tag,
  FolderOpen,
  Star,
  Filter
} from 'lucide-react';

export default function KnowledgePage() {
  // 模拟知识文档数据
  const [knowledgeDocs, setKnowledgeDocs] = useState([
    { 
      id: 1, 
      title: 'YYC³ 平台架构设计', 
      category: '架构设计',
      author: '张三',
      status: 'published',
      version: '1.2',
      createdAt: '2023-05-20',
      updatedAt: '2023-06-01',
      views: 1250,
      tags: ['架构', '设计', '平台'],
      isStarred: true
    },
    { 
      id: 2, 
      title: '微服务开发最佳实践', 
      category: '开发指南',
      author: '李四',
      status: 'published',
      version: '2.0',
      createdAt: '2023-05-15',
      updatedAt: '2023-05-28',
      views: 890,
      tags: ['微服务', '开发', '最佳实践'],
      isStarred: false
    },
    { 
      id: 3, 
      title: '数据库性能优化策略', 
      category: '数据库',
      author: '王五',
      status: 'draft',
      version: '0.8',
      createdAt: '2023-05-10',
      updatedAt: '2023-05-25',
      views: 560,
      tags: ['数据库', '性能', '优化'],
      isStarred: true
    },
    { 
      id: 4, 
      title: '前端开发规范', 
      category: '前端开发',
      author: '赵六',
      status: 'published',
      version: '1.5',
      createdAt: '2023-05-05',
      updatedAt: '2023-05-20',
      views: 1100,
      tags: ['前端', '规范', '开发'],
      isStarred: false
    },
    { 
      id: 5, 
      title: '安全编码指南', 
      category: '安全',
      author: '钱七',
      status: 'published',
      version: '1.0',
      createdAt: '2023-05-01',
      updatedAt: '2023-05-15',
      views: 780,
      tags: ['安全', '编码', '指南'],
      isStarred: true
    }
  ]);

  // 知识文档表格列
  const knowledgeDocColumns = [
    { key: 'title', title: '标题' },
    { key: 'category', title: '分类' },
    { key: 'author', title: '作者' },
    { key: 'version', title: '版本' },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'published': { label: '已发布', color: 'bg-green-100 text-green-800' },
          'draft': { label: '草稿', color: 'bg-yellow-100 text-yellow-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['draft'];
        return <Badge className={status.color}>{status.label}</Badge>;
      }
    },
    { key: 'updatedAt', title: '更新时间' },
    { 
      key: 'views', 
      title: '浏览量',
      render: (value: number) => (
        <div className="flex items-center">
          <Eye className="mr-1 h-4 w-4 text-gray-500" />
          {value}
        </div>
      )
    }
  ];

  // 知识分类数据
  const [categories, setCategories] = useState([
    { id: 1, name: '架构设计', count: 12 },
    { id: 2, name: '开发指南', count: 24 },
    { id: 3, name: '数据库', count: 8 },
    { id: 4, name: '前端开发', count: 15 },
    { id: 5, name: '安全', count: 6 },
    { id: 6, name: '运维', count: 10 },
    { id: 7, name: '测试', count: 9 }
  ]);

  // 热门标签数据
  const [popularTags, setPopularTags] = useState([
    { name: '架构', count: 15 },
    { name: '开发', count: 28 },
    { name: '数据库', count: 12 },
    { name: '前端', count: 18 },
    { name: '安全', count: 9 },
    { name: '微服务', count: 14 },
    { name: '性能', count: 11 },
    { name: '最佳实践', count: 16 }
  ]);

  // 收藏/取消收藏文档
  const toggleStar = (docId: number) => {
    setKnowledgeDocs(knowledgeDocs.map(doc => 
      doc.id === docId ? { ...doc, isStarred: !doc.isStarred } : doc
    ));
  };

  return (
    <PageTemplate
      title="知识智库"
      description="知识库管理系统，支持文档分类、搜索和版本控制"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '智能引擎', path: '/ai' },
        { title: '知识智库', path: '/knowledge' }
      ]}
      actions={
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          新建文档
        </Button>
      }
    >
      <div className="space-y-6">
        {/* 搜索和筛选 */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索文档..."
              className="pl-8"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center">
              <Filter className="mr-2 h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500 mr-2">分类:</span>
            </div>
            <Badge variant="outline" className="cursor-pointer">全部</Badge>
            {categories.slice(0, 3).map(category => (
              <Badge key={category.id} variant="outline" className="cursor-pointer">
                {category.name}
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">状态:</span>
            </div>
            <Badge variant="outline" className="cursor-pointer">全部</Badge>
            <Badge variant="outline" className="cursor-pointer">已发布</Badge>
            <Badge variant="outline" className="cursor-pointer">草稿</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 侧边栏 */}
          <div className="lg:col-span-1 space-y-6">
            {/* 分类 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-base">
                  <FolderOpen className="mr-2 h-4 w-4" />
                  文档分类
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <span>{category.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {category.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 热门标签 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-base">
                  <Tag className="mr-2 h-4 w-4" />
                  热门标签
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="cursor-pointer">
                      {tag.name} ({tag.count})
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 收藏文档 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-base">
                  <Star className="mr-2 h-4 w-4" />
                  收藏文档
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {knowledgeDocs
                    .filter(doc => doc.isStarred)
                    .slice(0, 3)
                    .map(doc => (
                      <div key={doc.id} className="p-2 hover:bg-gray-50 rounded cursor-pointer">
                        <div className="font-medium text-sm truncate">{doc.title}</div>
                        <div className="text-xs text-gray-500">{doc.author}</div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 主内容区 */}
          <div className="lg:col-span-3">
            {/* 文档列表 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  知识文档
                </CardTitle>
                <CardDescription>系统中的所有知识文档</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={knowledgeDocs}
                  columns={knowledgeDocColumns}
                  actions={(row) => (
                    <>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        <Eye className="inline mr-2 h-4 w-4" />
                        查看文档
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        <Edit className="inline mr-2 h-4 w-4" />
                        编辑文档
                      </button>
                      <button 
                        className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100"
                        onClick={() => toggleStar(row.id)}
                      >
                        <Star className={`inline mr-2 h-4 w-4 ${row.isStarred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                        {row.isStarred ? '取消收藏' : '收藏'}
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        查看历史版本
                      </button>
                    </>
                  )}
                />
              </CardContent>
            </Card>

            {/* 最近更新 */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  最近更新
                </CardTitle>
                <CardDescription>最近更新的知识文档</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {knowledgeDocs
                    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                    .slice(0, 3)
                    .map(doc => (
                      <div key={doc.id} className="flex items-start p-3 border rounded-lg">
                        <div className="mr-3 p-2 rounded-full bg-blue-100">
                          <FileText className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{doc.title}</div>
                          <div className="text-sm text-gray-500">
                            <span className="flex items-center">
                              <User className="mr-1 h-3 w-3" />
                              {doc.author}
                            </span>
                            <span className="mx-2">·</span>
                            <span className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3" />
                              {doc.updatedAt}
                            </span>
                          </div>
                        </div>
                        <Badge className={doc.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {doc.status === 'published' ? '已发布' : '草稿'}
                        </Badge>
                      </div>
                    ))
                  }
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
