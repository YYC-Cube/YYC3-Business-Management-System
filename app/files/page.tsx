// app/files/page.tsx
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
  Upload,
  FolderOpen,
  File,
  Image,
  FileVideo,
  FileText,
  Download,
  Trash2,
  MoreHorizontal,
  Grid,
  List,
  Share,
  Edit,
  Copy,
  Move
} from 'lucide-react';

export default function FilesPage() {
  // 模拟文件和文件夹数据
  const [items, setItems] = useState([
    { 
      id: 1, 
      name: '项目文档', 
      type: 'folder',
      size: '-',
      modified: '2023-06-01',
      items: 12,
      path: '/project-docs'
    },
    { 
      id: 2, 
      name: '设计资源', 
      type: 'folder',
      size: '-',
      modified: '2023-05-28',
      items: 24,
      path: '/design-assets'
    },
    { 
      id: 3, 
      name: '平台架构图.png', 
      type: 'image',
      size: '2.4 MB',
      modified: '2023-06-05',
      path: '/project-docs/architecture.png'
    },
    { 
      id: 4, 
      name: '产品介绍视频.mp4', 
      type: 'video',
      size: '125 MB',
      modified: '2023-06-03',
      path: '/design-assets/intro.mp4'
    },
    { 
      id: 5, 
      name: '技术白皮书.pdf', 
      type: 'document',
      size: '5.6 MB',
      modified: '2023-05-30',
      path: '/project-docs/whitepaper.pdf'
    },
    { 
      id: 6, 
      name: '用户手册.docx', 
      type: 'document',
      size: '1.2 MB',
      modified: '2023-05-25',
      path: '/project-docs/manual.docx'
    }
  ]);

  // 文件和文件夹表格列
  const itemColumns = [
    { key: 'name', title: '名称' },
    { key: 'size', title: '大小' },
    { key: 'modified', title: '修改时间' },
    { 
      key: 'type', 
      title: '类型',
      render: (value: string) => {
        const typeMap = {
          'folder': { label: '文件夹', color: 'bg-blue-100 text-blue-800' },
          'image': { label: '图片', color: 'bg-green-100 text-green-800' },
          'video': { label: '视频', color: 'bg-purple-100 text-purple-800' },
          'document': { label: '文档', color: 'bg-yellow-100 text-yellow-800' }
        };
        const type = typeMap[value as keyof typeof typeMap] || typeMap['document'];
        return <Badge className={type.color}>{type.label}</Badge>;
      }
    }
  ];

  // 视图模式
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  // 当前路径
  const [currentPath, setCurrentPath] = useState('/');

  // 获取文件图标
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'folder':
        return <FolderOpen className="h-8 w-8 text-blue-500" />;
      case 'image':
        return <Image className="h-8 w-8 text-green-500" />;
      case 'video':
        return <FileVideo className="h-8 w-8 text-purple-500" />;
      case 'document':
        return <FileText className="h-8 w-8 text-yellow-500" />;
      default:
        return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  // 导航到文件夹
  const navigateToFolder = (path: string) => {
    setCurrentPath(path);
  };

  // 返回上一级
  const navigateUp = () => {
    const pathParts = currentPath.split('/').filter(p => p);
    if (pathParts.length > 0) {
      pathParts.pop();
      setCurrentPath(pathParts.length > 0 ? `/${pathParts.join('/')}` : '/');
    }
  };

  return (
    <PageTemplate
      title="文件管理"
      description="文件系统管理界面，支持目录结构创建、文件上传下载和权限设置"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '智能引擎', path: '/ai' },
        { title: '文件管理', path: '/files' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            上传文件
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新建文件夹
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* 路径导航 */}
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={navigateUp} disabled={currentPath === '/'}>
            返回上一级
          </Button>
          <div className="ml-2 text-sm text-gray-500">
            当前路径: {currentPath || '/'}
          </div>
        </div>

        {/* 搜索和工具栏 */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索文件和文件夹..."
              className="pl-8"
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant={viewMode === 'list' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === 'grid' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 文件和文件夹列表 */}
        {viewMode === 'list' && (
          <Card>
            <CardHeader>
              <CardTitle>文件和文件夹</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                data={items}
                columns={itemColumns}
                actions={(row) => (
                  <>
                    {row.type === 'folder' ? (
                      <button 
                        className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100"
                        onClick={() => navigateToFolder(row.path)}
                      >
                        打开文件夹
                      </button>
                    ) : (
                      <>
                        <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                          <Download className="inline mr-2 h-4 w-4" />
                          下载
                        </button>
                        <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                          <Share className="inline mr-2 h-4 w-4" />
                          分享
                        </button>
                      </>
                    )}
                    <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                      <Edit className="inline mr-2 h-4 w-4" />
                      重命名
                    </button>
                    <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                      <Copy className="inline mr-2 h-4 w-4" />
                      复制
                    </button>
                    <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                      <Move className="inline mr-2 h-4 w-4" />
                      移动
                    </button>
                    <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 text-red-500">
                      <Trash2 className="inline mr-2 h-4 w-4" />
                      删除
                    </button>
                  </>
                )}
              />
            </CardContent>
          </Card>
        )}

        {/* 文件和文件夹网格视图 */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map(item => (
              <Card key={item.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gray-50 flex items-center justify-center">
                  {getFileIcon(item.type)}
                </div>
                <CardContent className="p-3">
                  <div className="font-medium text-sm truncate">{item.name}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {item.size !== '-' ? item.size : `${item.items} 项`}
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.modified}
                  </div>
                  <div className="flex justify-end mt-2">
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* 存储统计 */}
        <Card>
          <CardHeader>
            <CardTitle>存储统计</CardTitle>
            <CardDescription>文件系统存储使用情况</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">已用空间</span>
                  <span className="text-sm text-gray-500">45.2 GB / 100 GB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45.2%' }}></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-3">
                  <div className="text-lg font-bold">24</div>
                  <div className="text-sm text-gray-500">文件夹</div>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="text-lg font-bold">156</div>
                  <div className="text-sm text-gray-500">文件</div>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="text-lg font-bold">8</div>
                  <div className="text-sm text-gray-500">共享</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}
