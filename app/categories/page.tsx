// app/categories/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { DataTable } from '@/components/business/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit,
  Trash2,
  FolderOpen,
  Tag,
  GripVertical,
  FileText
} from 'lucide-react';

export default function CategoriesPage() {
  // 模拟分类数据
  const [categories, setCategories] = useState([
    { 
      id: 1, 
      name: '产品动态', 
      description: '产品更新和新功能发布',
      parent: null,
      articleCount: 12,
      order: 1
    },
    { 
      id: 2, 
      name: '使用指南', 
      description: '平台功能使用教程和指南',
      parent: null,
      articleCount: 24,
      order: 2
    },
    { 
      id: 3, 
      name: '公告', 
      description: '系统公告和重要通知',
      parent: null,
      articleCount: 8,
      order: 3
    },
    { 
      id: 4, 
      name: '技术分享', 
      description: '技术文章和开发经验分享',
      parent: null,
      articleCount: 15,
      order: 4
    },
    { 
      id: 5, 
      name: '基础教程', 
      description: '平台基础功能教程',
      parent: 2,
      articleCount: 10,
      order: 1
    },
    { 
      id: 6, 
      name: '高级技巧', 
      description: '平台高级功能使用技巧',
      parent: 2,
      articleCount: 8,
      order: 2
    },
    { 
      id: 7, 
      name: '案例分析', 
      description: '实际应用案例分析',
      parent: 2,
      articleCount: 6,
      order: 3
    }
  ]);

  // 分类表格列
  const categoryColumns = [
    { key: 'name', title: '分类名称' },
    { key: 'description', title: '描述' },
    { 
      key: 'parent', 
      title: '父分类',
      render: (value: number | null) => {
        if (value === null) return <span className="text-gray-500">无</span>;
        const parentCategory = categories.find(c => c.id === value);
        return parentCategory ? parentCategory.name : '未知';
      }
    },
    { 
      key: 'articleCount', 
      title: '文章数',
      render: (value: number) => (
        <div className="flex items-center">
          <FileText className="mr-1 h-4 w-4 text-gray-500" />
          {value}
        </div>
      )
    },
    { key: 'order', title: '排序' }
  ];

  // 获取顶级分类
  const topLevelCategories = categories.filter(c => c.parent === null);

  // 获取子分类
  const getSubCategories = (parentId: number) => {
    return categories.filter(c => c.parent === parentId);
  };

  return (
    <PageTemplate
      title="分类管理"
      description="内容分类层级管理，支持拖拽调整顺序和设置分类属性"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '内容管理', path: '/content' },
        { title: '分类管理', path: '/categories' }
      ]}
      actions={
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          新建分类
        </Button>
      }
    >
      <div className="space-y-6">
        {/* 搜索 */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索分类..."
            className="pl-8"
          />
        </div>

        {/* 分类层级视图 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FolderOpen className="mr-2 h-5 w-5" />
              分类层级
            </CardTitle>
            <CardDescription>分类的层级结构</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topLevelCategories.map(category => (
                <div key={category.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <GripVertical className="mr-2 h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium flex items-center">
                          {category.name}
                          <Badge variant="outline" className="ml-2">
                            {category.articleCount} 篇
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-500">{category.description}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* 子分类 */}
                  {getSubCategories(category.id).length > 0 && (
                    <div className="mt-3 ml-6 space-y-3">
                      {getSubCategories(category.id).map(subCategory => (
                        <div key={subCategory.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center">
                            <GripVertical className="mr-2 h-5 w-5 text-gray-400" />
                            <div>
                              <div className="font-medium flex items-center">
                                {subCategory.name}
                                <Badge variant="outline" className="ml-2">
                                  {subCategory.articleCount} 篇
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-500">{subCategory.description}</div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 分类列表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Tag className="mr-2 h-5 w-5" />
              所有分类
            </CardTitle>
            <CardDescription>系统中的所有分类</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={categories}
              columns={categoryColumns}
              actions={(row) => (
                <>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                    <Edit className="inline mr-2 h-4 w-4" />
                    编辑分类
                  </button>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                    查看文章
                  </button>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 text-red-500">
                    <Trash2 className="inline mr-2 h-4 w-4" />
                    删除分类
                  </button>
                </>
              )}
            />
          </CardContent>
        </Card>

        {/* 统计信息 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{categories.length}</div>
              <div className="text-sm text-gray-500">总分类数</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                {categories.filter(c => c.parent === null).length}
              </div>
              <div className="text-sm text-gray-500">顶级分类</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                {categories.reduce((sum, category) => sum + category.articleCount, 0)}
              </div>
              <div className="text-sm text-gray-500">总文章数</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTemplate>
  );
}
