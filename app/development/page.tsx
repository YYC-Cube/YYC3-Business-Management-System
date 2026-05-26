// app/development/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { DataTable } from '@/components/business/data-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code, 
  Terminal, 
  BookOpen, 
  GitBranch,
  Play,
  Square,
  Settings,
  Plus,
  Search,
  FileText,
  Database,
  Server
} from 'lucide-react';

export default function DevelopmentPage() {
  // 模拟API文档数据
  const [apiDocs, setApiDocs] = useState([
    { 
      id: 1, 
      name: '用户管理API', 
      version: 'v1.0',
      method: 'REST',
      status: 'published',
      endpoints: 12,
      lastUpdated: '2023-05-20'
    },
    { 
      id: 2, 
      name: '内容管理API', 
      version: 'v2.1',
      method: 'REST',
      status: 'published',
      endpoints: 18,
      lastUpdated: '2023-05-15'
    },
    { 
      id: 3, 
      name: '数据分析API', 
      version: 'v1.2',
      method: 'GraphQL',
      status: 'draft',
      endpoints: 8,
      lastUpdated: '2023-05-25'
    },
    { 
      id: 4, 
      name: 'AI引擎API', 
      version: 'v0.9',
      method: 'REST',
      status: 'testing',
      endpoints: 15,
      lastUpdated: '2023-06-01'
    }
  ]);

  // API文档表格列
  const apiDocColumns = [
    { key: 'name', title: 'API名称' },
    { key: 'version', title: '版本' },
    { key: 'method', title: '协议' },
    { key: 'endpoints', title: '端点数' },
    { key: 'lastUpdated', title: '最后更新' },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'published': { label: '已发布', color: 'bg-green-100 text-green-800' },
          'draft': { label: '草稿', color: 'bg-yellow-100 text-yellow-800' },
          'testing': { label: '测试中', color: 'bg-blue-100 text-blue-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['draft'];
        return <Badge className={status.color}>{status.label}</Badge>;
      }
    }
  ];

  // 模拟代码片段数据
  const [codeSnippets, setCodeSnippets] = useState([
    { 
      id: 1, 
      title: '用户认证示例', 
      language: 'JavaScript',
      description: '使用JWT进行用户认证的代码示例',
      createdAt: '2023-05-20',
      tags: ['认证', 'JWT', '安全']
    },
    { 
      id: 2, 
      title: '数据查询优化', 
      language: 'SQL',
      description: '优化数据库查询性能的SQL示例',
      createdAt: '2023-05-18',
      tags: ['数据库', '性能', '优化']
    },
    { 
      id: 3, 
      title: 'API请求封装', 
      language: 'TypeScript',
      description: '封装API请求的工具函数',
      createdAt: '2023-05-15',
      tags: ['API', 'TypeScript', '工具']
    },
    { 
      id: 4, 
      title: '文件上传处理', 
      language: 'Python',
      description: '处理文件上传的后端代码',
      createdAt: '2023-05-10',
      tags: ['文件', '上传', 'Python']
    }
  ]);

  // 代码片段表格列
  const codeSnippetColumns = [
    { key: 'title', title: '标题' },
    { key: 'language', title: '语言' },
    { key: 'description', title: '描述' },
    { key: 'createdAt', title: '创建时间' },
    { 
      key: 'tags', 
      title: '标签',
      render: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, 2).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {value.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{value.length - 2}
            </Badge>
          )}
        </div>
      )
    }
  ];

  // 模拟开发环境数据
  const [devEnvironments, setDevEnvironments] = useState([
    { 
      id: 1, 
      name: '开发环境', 
      status: 'running',
      url: 'dev.yanyucloud.com',
      resources: { cpu: 2, memory: 4, storage: 50 },
      lastDeployed: '2023-06-01 10:30'
    },
    { 
      id: 2, 
      name: '测试环境', 
      status: 'running',
      url: 'test.yanyucloud.com',
      resources: { cpu: 2, memory: 4, storage: 50 },
      lastDeployed: '2023-05-30 15:45'
    },
    { 
      id: 3, 
      name: '预发布环境', 
      status: 'stopped',
      url: 'staging.yanyucloud.com',
      resources: { cpu: 4, memory: 8, storage: 100 },
      lastDeployed: '2023-05-25 09:15'
    }
  ]);

  // 获取状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-100 text-green-800';
      case 'stopped':
        return 'bg-red-100 text-red-800';
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'testing':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageTemplate
      title="开发环境"
      description="开发者工具和API文档界面，支持代码片段管理和测试环境配置"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '智能引擎', path: '/ai' },
        { title: '开发环境', path: '/development' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            创建环境
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            环境设置
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* 开发环境列表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Server className="mr-2 h-5 w-5" />
              开发环境
            </CardTitle>
            <CardDescription>系统中的开发环境及其状态</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {devEnvironments.map(env => (
                <div key={env.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-medium">{env.name}</div>
                    <Badge className={getStatusStyle(env.status)}>
                      {env.status === 'running' ? '运行中' : '已停止'}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-500 mb-3">
                    URL: {env.url}
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm mb-3">
                    <div className="text-center">
                      <div className="text-gray-500">CPU</div>
                      <div>{env.resources.cpu}核</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-500">内存</div>
                      <div>{env.resources.memory}GB</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-500">存储</div>
                      <div>{env.resources.storage}GB</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mb-4">
                    最后部署: {env.lastDeployed}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant={env.status === 'running' ? 'outline' : 'default'} 
                      size="sm" 
                      className="flex-1"
                    >
                      {env.status === 'running' ? (
                        <>
                          <Square className="mr-1 h-4 w-4" />
                          停止
                        </>
                      ) : (
                        <>
                          <Play className="mr-1 h-4 w-4" />
                          启动
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Terminal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 开发工具标签页 */}
        <Tabs defaultValue="api" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="api">API文档</TabsTrigger>
            <TabsTrigger value="snippets">代码片段</TabsTrigger>
          </TabsList>
          
          <TabsContent value="api" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索API文档..."
                  className="pl-8"
                />
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                新建API文档
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  API文档列表
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={apiDocs}
                  columns={apiDocColumns}
                  actions={(row) => (
                    <>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        查看文档
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        测试API
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        编辑文档
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 text-red-500">
                        删除文档
                      </button>
                    </>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="snippets" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索代码片段..."
                  className="pl-8"
                />
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                新建代码片段
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="mr-2 h-5 w-5" />
                  代码片段列表
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={codeSnippets}
                  columns={codeSnippetColumns}
                  actions={(row) => (
                    <>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        查看代码
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        复制代码
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        编辑片段
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 text-red-500">
                        删除片段
                      </button>
                    </>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTemplate>
  );
}
