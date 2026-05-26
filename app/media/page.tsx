// app/media/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Plus, 
  Search, 
  Upload,
  Image as ImageIcon,
  FileVideo,
  File,
  Filter,
  Grid,
  List,
  Download,
  Trash2
} from 'lucide-react';

export default function MediaPage() {
  // 模拟媒体文件数据
  const [mediaFiles, setMediaFiles] = useState([
    { 
      id: 1, 
      name: 'YYC³ Logo.png', 
      type: 'image', 
      size: '245 KB',
      uploadDate: '2023-05-20',
      category: '品牌',
      url: '/yyc3-icons/Web App/android-chrome-512.png'
    },
    { 
      id: 2, 
      name: '产品介绍视频.mp4', 
      type: 'video', 
      size: '12.4 MB',
      uploadDate: '2023-05-18',
      category: '产品',
      url: '/videos/intro.mp4'
    },
    { 
      id: 3, 
      name: '用户手册.pdf', 
      type: 'document', 
      size: '3.2 MB',
      uploadDate: '2023-05-15',
      category: '文档',
      url: '/docs/manual.pdf'
    },
    { 
      id: 4, 
      name: '团队合影.jpg', 
      type: 'image', 
      size: '1.8 MB',
      uploadDate: '2023-05-10',
      category: '团队',
      url: '/images/team.jpg'
    },
    { 
      id: 5, 
      name: '功能演示视频.mp4', 
      type: 'video', 
      size: '24.7 MB',
      uploadDate: '2023-05-05',
      category: '产品',
      url: '/videos/demo.mp4'
    },
    { 
      id: 6, 
      name: '技术白皮书.pdf', 
      type: 'document', 
      size: '5.6 MB',
      uploadDate: '2023-05-01',
      category: '文档',
      url: '/docs/whitepaper.pdf'
    }
  ]);

  // 文件类型
  const fileTypes = ['全部', '图片', '视频', '文档'];

  // 文件分类
  const categories = ['全部', '品牌', '产品', '文档', '团队'];

  // 视图模式
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // 获取文件图标
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="h-8 w-8 text-blue-500" />;
      case 'video':
        return <FileVideo className="h-8 w-8 text-red-500" />;
      case 'document':
        return <File className="h-8 w-8 text-gray-500" />;
      default:
        return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <PageTemplate
      title="自媒体库"
      description="媒体文件上传、存储和管理界面，支持文件分类、预览和批量操作"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '内容管理', path: '/content' },
        { title: '自媒体库', path: '/media' }
      ]}
      actions={
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          上传文件
        </Button>
      }
    >
      <div className="space-y-6">
        {/* 搜索和筛选 */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索文件..."
              className="pl-8"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center">
              <Filter className="mr-2 h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500 mr-2">类型:</span>
            </div>
            {fileTypes.map(type => (
              <Badge 
                key={type} 
                variant={type === '全部' ? 'default' : 'outline'} 
                className="cursor-pointer"
              >
                {type}
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">分类:</span>
            </div>
            {categories.map(category => (
              <Badge 
                key={category} 
                variant={category === '全部' ? 'default' : 'outline'} 
                className="cursor-pointer"
              >
                {category}
              </Badge>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant={viewMode === 'grid' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 媒体文件网格视图 */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mediaFiles.map(file => (
              <Card key={file.id} className="overflow-hidden">
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  {file.type === 'image' ? (
                    <div className="text-center">
                      <ImageIcon className="h-12 w-12 text-blue-500 mx-auto" />
                      <div className="text-xs mt-2 text-gray-500">{file.name}</div>
                    </div>
                  ) : (
                    <div className="text-center">
                      {getFileIcon(file.type)}
                      <div className="text-xs mt-2 text-gray-500">{file.name}</div>
                    </div>
                  )}
                </div>
                <CardContent className="p-3">
                  <div className="font-medium text-sm truncate">{file.name}</div>
                  <div className="flex justify-between items-center mt-2">
                    <Badge variant="outline" className="text-xs">
                      {file.category}
                    </Badge>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {file.size} · {file.uploadDate}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* 媒体文件列表视图 */}
        {viewMode === 'list' && (
          <Card>
            <CardHeader>
              <CardTitle>媒体文件列表</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mediaFiles.map(file => (
                  <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <div className="mr-3">
                        {getFileIcon(file.type)}
                      </div>
                      <div>
                        <div className="font-medium">{file.name}</div>
                        <div className="text-sm text-gray-500">
                          {file.size} · {file.uploadDate} · {file.category}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        下载
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 存储统计 */}
        <Card>
          <CardHeader>
            <CardTitle>存储统计</CardTitle>
            <CardDescription>媒体库存储使用情况</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">已用空间</span>
                  <span className="text-sm text-gray-500">45.2 MB / 100 MB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45.2%' }}></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-3">
                  <div className="text-lg font-bold">24</div>
                  <div className="text-sm text-gray-500">图片文件</div>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="text-lg font-bold">8</div>
                  <div className="text-sm text-gray-500">视频文件</div>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="text-lg font-bold">12</div>
                  <div className="text-sm text-gray-500">文档文件</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}
