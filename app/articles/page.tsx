// app/articles/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { DataTable } from '@/components/business/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Search,
  Filter,
  Calendar,
  FileText,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';

export default function ArticlesPage() {
  // 模拟文章数据
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: '企业数字化转型指南',
      author: '张三',
      category: '技术文章',
      status: 'published',
      views: 1250,
      publishDate: '2023-06-10',
      lastUpdate: '2023-06-10'
    },
    {
      id: 2,
      title: '人工智能在商业中的应用案例',
      author: '李四',
      category: '技术文章',
      status: 'published',
      views: 890,
      publishDate: '2023-06-08',
      lastUpdate: '2023-06-08'
    },
    {
      id: 3,
      title: '2023年市场趋势分析',
      author: '王五',
      category: '市场分析',
      status: 'pending',
      views: 0,
      publishDate: null,
      lastUpdate: '2023-06-05'
    },
    {
      id: 4,
      title: '产品更新公告：新功能介绍',
      author: '赵六',
      category: '公告',
      status: 'published',
      views: 2560,
      publishDate: '2023-06-01',
      lastUpdate: '2023-06-01'
    },
    {
      id: 5,
      title: '用户体验优化实践',
      author: '孙七',
      category: '设计',
      status: 'draft',
      views: 0,
      publishDate: null,
      lastUpdate: '2023-05-28'
    }
  ]);

  // 文章表格列
  const articleColumns = [
    { key: 'title', title: '标题' },
    { key: 'author', title: '作者' },
    { key: 'category', title: '分类' },
    {
      key: 'status',
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'published': { label: '已发布', color: 'bg-green-100 text-green-800' },
          'pending': { label: '待审核', color: 'bg-yellow-100 text-yellow-800' },
          'draft': { label: '草稿', color: 'bg-gray-100 text-gray-800' },
          'rejected': { label: '已拒绝', color: 'bg-red-100 text-red-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['draft'];
        return <Badge className={status.color}>{status.label}</Badge>;
      }
    },
    {
      key: 'views',
      title: '浏览量',
      render: (value: number) => (
        <div className="flex items-center">
          <Eye className="mr-1 h-4 w-4 text-gray-500" />
          {value}
        </div>
      )
    },
    { key: 'publishDate', title: '发布日期' },
    { key: 'lastUpdate', title: '最后更新' }
  ];

  // 模拟文章分类统计
  const categoryStats = [
    { category: '技术文章', count: 12, published: 10, pending: 2 },
    { category: '市场分析', count: 8, published: 6, pending: 2 },
    { category: '公告', count: 5, published: 5, pending: 0 },
    { category: '设计', count: 7, published: 4, pending: 3 }
  ];

  return (
    <PageTemplate
      title="文章管理"
      description="管理平台所有文章内容、编辑、发布和统计"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '内容管理', path: '/articles' }
      ]}
      actions={
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          新建文章
        </Button>
      }
    >
      <div className="space-y-8">
        {/* 搜索和筛选 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索文章..."
              className="pl-8"
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">
              <Filter className="mr-1 h-4 w-4" />
              筛选
            </Button>
            <Button variant="secondary" size="sm">
              <Calendar className="mr-1 h-4 w-4" />
              日期
            </Button>
          </div>
        </div>

        {/* 文章分类统计 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categoryStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{stat.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.count}</div>
                <div className="text-xs text-gray-500 mt-1">
                  已发布: {stat.published} | 待审核: {stat.pending}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 文章列表表格 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              文章列表
            </CardTitle>
            <CardDescription>平台所有文章的详细信息</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={articles}
              columns={articleColumns}
              actions={(row) => (
                <>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                    <Eye className="inline mr-2 h-4 w-4" />
                    查看
                  </button>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                    <Edit className="inline mr-2 h-4 w-4" />
                    编辑
                  </button>
                  {row.status !== 'published' && (
                    <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 text-green-500">
                      <CheckCircle className="inline mr-2 h-4 w-4" />
                      发布
                    </button>
                  )}
                  {row.status === 'published' && (
                    <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 text-amber-500">
                      <AlertCircle className="inline mr-2 h-4 w-4" />
                      下架
                    </button>
                  )}
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 text-red-500">
                    <Trash2 className="inline mr-2 h-4 w-4" />
                    删除
                  </button>
                </>
              )}
            />
          </CardContent>
        </Card>

        {/* 最近更新 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              最近更新
            </CardTitle>
            <CardDescription>最近编辑或更新的文章</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {articles
                .sort((a, b) => new Date(b.lastUpdate!).getTime() - new Date(a.lastUpdate!).getTime())
                .slice(0, 4)
                .map(article => (
                  <div key={article.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">{article.title}</span>
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {article.status === 'published' ? '已发布' : article.status === 'pending' ? '待审核' : '草稿'}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500">
                      {article.lastUpdate}
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}