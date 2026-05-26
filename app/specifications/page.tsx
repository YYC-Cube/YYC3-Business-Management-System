// app/specifications/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Search, 
  Download, 
  Eye,
  Plus,
  Filter,
  Calendar,
  User,
  Tag,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

export default function SpecificationsPage() {
  // 规格文档数据
  const [specifications, setSpecifications] = useState([
    { 
      id: 1, 
      title: 'YYC³ 系统架构规格书', 
      type: '架构',
      version: 'v2.1',
      status: 'approved',
      author: '张三',
      lastUpdated: '2023-06-05',
      tags: ['架构', '系统', '核心'],
      size: '2.4 MB'
    },
    { 
      id: 2, 
      title: 'API接口规格说明', 
      type: 'API',
      version: 'v3.2',
      status: 'approved',
      author: '李四',
      lastUpdated: '2023-06-01',
      tags: ['API', '接口', '开发'],
      size: '1.8 MB'
    },
    { 
      id: 3, 
      title: '数据库设计规格书', 
      type: '数据库',
      version: 'v1.5',
      status: 'draft',
      author: '王五',
      lastUpdated: '2023-06-10',
      tags: ['数据库', '设计', '存储'],
      size: '3.2 MB'
    },
    { 
      id: 4, 
      title: '安全规格说明', 
      type: '安全',
      version: 'v1.2',
      status: 'review',
      author: '赵六',
      lastUpdated: '2023-06-08',
      tags: ['安全', '认证', '权限'],
      size: '1.5 MB'
    }
  ]);

  // 规格类型数据
  const [specTypes, setSpecTypes] = useState([
    { id: 'architecture', name: '架构', count: 12 },
    { id: 'api', name: 'API', count: 8 },
    { id: 'database', name: '数据库', count: 6 },
    { id: 'security', name: '安全', count: 4 },
    { id: 'ui', name: '界面', count: 10 },
    { id: 'business', name: '业务', count: 8 }
  ]);

  // 规格状态数据
  const [specStatuses, setSpecStatuses] = useState([
    { id: 'approved', name: '已批准', count: 18 },
    { id: 'draft', name: '草稿', count: 8 },
    { id: 'review', name: '审核中', count: 6 },
    { id: 'archived', name: '已归档', count: 4 }
  ]);

  // 获取状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'review':
        return 'bg-blue-100 text-blue-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageTemplate
      title="规格说明"
      description="系统规格说明文档管理界面"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '项目管理', path: '/project' },
        { title: '规格说明', path: '/specifications' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新建规格
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            筛选
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索规格文档..."
              className="pl-8"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">类型:</span>
            </div>
            {specTypes.map(type => (
              <Badge key={type.id} variant="outline" className="cursor-pointer">
                {type.name} ({type.count})
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">状态:</span>
            </div>
            {specStatuses.map(status => (
              <Badge key={status.id} variant="outline" className="cursor-pointer">
                {status.name} ({status.count})
              </Badge>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              规格文档列表
            </CardTitle>
            <CardDescription>系统中的所有规格说明文档</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {specifications.map(spec => (
                <div key={spec.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{spec.title}</div>
                    <Badge className={getStatusStyle(spec.status)}>
                      {spec.status === 'approved' ? '已批准' :
                       spec.status === 'draft' ? '草稿' :
                       spec.status === 'review' ? '审核中' : '已归档'}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <div className="text-sm text-gray-500">类型</div>
                      <div>{spec.type}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">版本</div>
                      <div>{spec.version}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">大小</div>
                      <div>{spec.size}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-sm text-gray-500">作者</div>
                      <div>{spec.author}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">最后更新</div>
                      <div>{spec.lastUpdated}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {spec.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-1 h-4 w-4" />
                        查看
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-1 h-4 w-4" />
                        下载
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 规格类型统计 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Tag className="mr-2 h-5 w-5" />
                规格类型分布
              </CardTitle>
              <CardDescription>各类型规格文档数量</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {specTypes.map(type => (
                  <div key={type.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <span className="font-medium">{type.name}</span>
                    <Badge variant="outline">
                      {type.count}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 规格状态统计 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5" />
                规格状态分布
              </CardTitle>
              <CardDescription>各状态规格文档数量</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {specStatuses.map(status => (
                  <div key={status.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <span className="font-medium">{status.name}</span>
                    <Badge variant="outline">
                      {status.count}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 最近更新 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              最近更新
            </CardTitle>
            <CardDescription>最近更新的规格文档</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {specifications
                .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
                .slice(0, 3)
                .map(spec => (
                  <div key={spec.id} className="flex items-start p-3 border rounded-lg">
                    <div className="mr-3 p-2 rounded-full bg-blue-100">
                      <FileText className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{spec.title}</div>
                      <div className="text-sm text-gray-500">
                        <span className="flex items-center">
                          <User className="mr-1 h-3 w-3 text-gray-500" />
                          <span>{spec.author}</span>
                        </span>
                        <span className="mx-2">·</span>
                        <span className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3 text-gray-500" />
                          <span>{spec.lastUpdated}</span>
                        </span>
                      </div>
                    </div>
                    <Badge className={getStatusStyle(spec.status)}>
                      {spec.status === 'approved' ? '已批准' :
                       spec.status === 'draft' ? '草稿' :
                       spec.status === 'review' ? '审核中' : '已归档'}
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}