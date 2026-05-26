// app/api/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { DataTable } from '@/components/business/data-table';
import { StatCard, StatCardGroup } from '@/components/business/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code, 
  Zap, 
  BarChart3, 
  Activity,
  Key,
  Shield,
  Settings,
  Plus,
  Search,
  Play,
  Pause,
  Trash2,
  Copy,
  FileText,
  Database,
  Users,
  AlertTriangle
} from 'lucide-react';

export default function APIPage() {
  // 模拟API统计数据
  const [apiStats, setApiStats] = useState([
    {
      title: 'API总数',
      value: '48',
      change: { value: 5, type: 'increase' as const, text: '较上月' },
      icon: <Code className="h-5 w-5" />,
      description: '系统中的API总数'
    },
    {
      title: '今日调用',
      value: '2.4M',
      change: { value: 12, type: 'increase' as const, text: '较昨日' },
      icon: <Zap className="h-5 w-5" />,
      description: '今日API调用次数'
    },
    {
      title: '平均响应时间',
      value: '125ms',
      change: { value: 8, type: 'decrease' as const, text: '较上周' },
      icon: <Activity className="h-5 w-5" />,
      description: 'API平均响应时间'
    },
    {
      title: '错误率',
      value: '0.8%',
      change: { value: 0.2, type: 'decrease' as const, text: '较上周' },
      icon: <AlertTriangle className="h-5 w-5" />,
      description: 'API调用错误率'
    }
  ]);

  // 模拟API列表数据
  const [apiList, setApiList] = useState([
    { 
      id: 1, 
      name: '用户管理API', 
      version: 'v1.2',
      method: 'REST',
      status: 'published',
      endpoints: 12,
      requests: 456000,
      avgResponseTime: 85,
      errorRate: 0.5,
      lastUpdated: '2023-06-01'
    },
    { 
      id: 2, 
      name: '内容管理API', 
      version: 'v2.1',
      method: 'REST',
      status: 'published',
      endpoints: 18,
      requests: 789000,
      avgResponseTime: 120,
      errorRate: 0.3,
      lastUpdated: '2023-05-28'
    },
    { 
      id: 3, 
      name: '数据分析API', 
      version: 'v1.0',
      method: 'GraphQL',
      status: 'draft',
      endpoints: 8,
      requests: 123000,
      avgResponseTime: 210,
      errorRate: 1.2,
      lastUpdated: '2023-06-05'
    },
    { 
      id: 4, 
      name: 'AI引擎API', 
      version: 'v0.9',
      method: 'REST',
      status: 'testing',
      endpoints: 15,
      requests: 234000,
      avgResponseTime: 350,
      errorRate: 2.1,
      lastUpdated: '2023-06-03'
    }
  ]);

  // API列表表格列
  const apiColumns = [
    { key: 'name', title: 'API名称' },
    { key: 'version', title: '版本' },
    { key: 'method', title: '协议' },
    { key: 'endpoints', title: '端点数' },
    { key: 'requests', title: '请求数', render: (value: number) => value.toLocaleString() },
    { key: 'avgResponseTime', title: '平均响应时间', render: (value: number) => `${value}ms` },
    { key: 'errorRate', title: '错误率', render: (value: number) => `${value}%` },
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

  // 模拟API密钥数据
  const [apiKeys, setApiKeys] = useState([
    { 
      id: 1, 
      name: '生产环境密钥', 
      key: 'ak_1a2b3c4d5e6f7g8h9i0j',
      status: 'active',
      created: '2023-05-01',
      lastUsed: '2023-06-10',
      permissions: ['read', 'write'],
      rateLimit: '1000/min'
    },
    { 
      id: 2, 
      name: '测试环境密钥', 
      key: 'ak_2b3c4d5e6f7g8h9i0j1k',
      status: 'active',
      created: '2023-05-15',
      lastUsed: '2023-06-09',
      permissions: ['read', 'write'],
      rateLimit: '5000/min'
    },
    { 
      id: 3, 
      name: '开发环境密钥', 
      key: 'ak_3c4d5e6f7g8h9i0j1k2l',
      status: 'revoked',
      created: '2023-04-20',
      lastUsed: '2023-05-30',
      permissions: ['read', 'write', 'delete'],
      rateLimit: '10000/min'
    }
  ]);

  // API密钥表格列
  const apiKeyColumns = [
    { key: 'name', title: '密钥名称' },
    { key: 'key', title: '密钥', render: (value: string) => `${value.substring(0, 20)}...` },
    { key: 'status', title: '状态', render: (value: string) => 
      <Badge className={value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
        {value === 'active' ? '活跃' : '已撤销'}
      </Badge>
    },
    { key: 'created', title: '创建时间' },
    { key: 'lastUsed', title: '最后使用' },
    { key: 'rateLimit', title: '速率限制' }
  ];

  // 模拟API调用日志数据
  const [apiLogs, setApiLogs] = useState([
    { 
      id: 1, 
      api: '用户管理API',
      endpoint: '/api/v1/users',
      method: 'GET',
      status: 200,
      responseTime: 85,
      timestamp: '2023-06-10 10:30:25',
      ip: '192.168.1.100',
      userAgent: 'Mozilla/5.0'
    },
    { 
      id: 2, 
      api: '内容管理API',
      endpoint: '/api/v2/content',
      method: 'POST',
      status: 201,
      responseTime: 120,
      timestamp: '2023-06-10 10:29:15',
      ip: '192.168.1.101',
      userAgent: 'curl/7.68.0'
    },
    { 
      id: 3, 
      api: '数据分析API',
      endpoint: '/api/v1/analytics',
      method: 'GET',
      status: 500,
      responseTime: 210,
      timestamp: '2023-06-10 10:28:45',
      ip: '192.168.1.102',
      userAgent: 'PostmanRuntime/7.28.0'
    },
    { 
      id: 4, 
      api: 'AI引擎API',
      endpoint: '/api/v0.9/predict',
      method: 'POST',
      status: 200,
      responseTime: 350,
      timestamp: '2023-06-10 10:27:30',
      ip: '192.168.1.103',
      userAgent: 'Python-requests/2.25.1'
    }
  ]);

  // API调用日志表格列
  const apiLogColumns = [
    { key: 'timestamp', title: '时间' },
    { key: 'api', title: 'API' },
    { key: 'endpoint', title: '端点' },
    { key: 'method', title: '方法' },
    { key: 'status', title: '状态码', render: (value: number) => 
      <Badge className={value >= 200 && value < 300 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
        {value}
      </Badge>
    },
    { key: 'responseTime', title: '响应时间', render: (value: number) => `${value}ms` },
    { key: 'ip', title: 'IP地址' }
  ];

  // 获取状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'revoked':
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
      title="API管理"
      description="API接口管理和监控界面，包含API文档、密钥管理和调用日志"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '商务功能', path: '/business' },
        { title: 'API管理', path: '/api' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            创建API
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            API设置
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* API统计卡片 */}
        <StatCardGroup>
          {apiStats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              description={stat.description}
            />
          ))}
        </StatCardGroup>

        {/* API管理标签页 */}
        <Tabs defaultValue="apis" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="apis">API列表</TabsTrigger>
            <TabsTrigger value="keys">API密钥</TabsTrigger>
            <TabsTrigger value="logs">调用日志</TabsTrigger>
          </TabsList>
          
          <TabsContent value="apis" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索API..."
                  className="pl-8"
                />
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="mr-2 h-5 w-5" />
                  API列表
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={apiList}
                  columns={apiColumns}
                  actions={(row) => (
                    <>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        <FileText className="inline mr-2 h-4 w-4" />
                        查看文档
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        <Play className="inline mr-2 h-4 w-4" />
                        测试API
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        <BarChart3 className="inline mr-2 h-4 w-4" />
                        查看统计
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        编辑API
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 text-red-500">
                        <Trash2 className="inline mr-2 h-4 w-4" />
                        删除API
                      </button>
                    </>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="keys" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索密钥..."
                  className="pl-8"
                />
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                生成密钥
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="mr-2 h-5 w-5" />
                  API密钥
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={apiKeys}
                  columns={apiKeyColumns}
                  actions={(row) => (
                    <>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        <Copy className="inline mr-2 h-4 w-4" />
                        复制密钥
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        <Shield className="inline mr-2 h-4 w-4" />
                        管理权限
                      </button>
                      {row.status === 'active' ? (
                        <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                          <Pause className="inline mr-2 h-4 w-4" />
                          撤销密钥
                        </button>
                      ) : (
                        <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                          <Play className="inline mr-2 h-4 w-4" />
                          重新激活
                        </button>
                      )}
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 text-red-500">
                        <Trash2 className="inline mr-2 h-4 w-4" />
                        删除密钥
                      </button>
                    </>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="logs" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索日志..."
                  className="pl-8"
                />
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5" />
                  API调用日志
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={apiLogs}
                  columns={apiLogColumns}
                  actions={(row) => (
                    <>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        查看详情
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        查看请求
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        查看响应
                      </button>
                    </>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* API性能监控 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              API性能监控
            </CardTitle>
            <CardDescription>API响应时间和错误率趋势</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-medium mb-2">响应时间趋势 (ms)</div>
                <div className="h-48 flex items-end space-x-1">
                  {Array.from({ length: 24 }, (_, i) => {
                    const height = 30 + Math.random() * 70;
                    return (
                      <div 
                        key={i} 
                        className="flex-1 bg-blue-500 rounded-t"
                        style={{ height: `${height}%` }}
                      ></div>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>24小时前</span>
                  <span>12小时前</span>
                  <span>现在</span>
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-2">错误率趋势 (%)</div>
                <div className="h-48 flex items-end space-x-1">
                  {Array.from({ length: 24 }, (_, i) => {
                    const height = 10 + Math.random() * 20;
                    return (
                      <div 
                        key={i} 
                        className="flex-1 bg-red-500 rounded-t"
                        style={{ height: `${height}%` }}
                      ></div>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>24小时前</span>
                  <span>12小时前</span>
                  <span>现在</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}
