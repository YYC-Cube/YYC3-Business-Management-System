// app/mobile/page.tsx
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
  Smartphone, 
  Download, 
  Users, 
  Star,
  BarChart3,
  Activity,
  Settings,
  Plus,
  Search,
  Upload,
  Code,
  Bug,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

export default function MobilePage() {
  // 模拟移动应用统计数据
  const [mobileStats, setMobileStats] = useState([
    {
      title: '应用总数',
      value: '6',
      change: { value: 1, type: 'increase' as const, text: '较上月' },
      icon: <Smartphone className="h-5 w-5" />,
      description: '平台中的移动应用总数'
    },
    {
      title: '总下载量',
      value: '125.6K',
      change: { value: 18, type: 'increase' as const, text: '较上月' },
      icon: <Download className="h-5 w-5" />,
      description: '应用总下载量'
    },
    {
      title: '活跃用户',
      value: '45.2K',
      change: { value: 12, type: 'increase' as const, text: '较上月' },
      icon: <Users className="h-5 w-5" />,
      description: '移动应用活跃用户数'
    },
    {
      title: '平均评分',
      value: '4.6',
      change: { value: 0.2, type: 'increase' as const, text: '较上月' },
      icon: <Star className="h-5 w-5" />,
      description: '应用平均评分'
    }
  ]);

  // 模拟应用列表数据
  const [appList, setAppList] = useState([
    { 
      id: 1, 
      name: 'YYC³ 移动版', 
      platform: 'iOS, Android',
      version: '2.1.0',
      status: 'published',
      downloads: 45600,
      rating: 4.8,
      size: '45 MB',
      lastUpdated: '2023-06-01'
    },
    { 
      id: 2, 
      name: 'YanYu 数据分析', 
      platform: 'Android',
      version: '1.5.2',
      status: 'published',
      downloads: 32500,
      rating: 4.5,
      size: '32 MB',
      lastUpdated: '2023-05-28'
    },
    { 
      id: 3, 
      name: 'YanYu AI助手', 
      platform: 'iOS',
      version: '0.9.5',
      status: 'testing',
      downloads: 12500,
      rating: 4.2,
      size: '28 MB',
      lastUpdated: '2023-06-05'
    },
    { 
      id: 4, 
      name: 'YanYu 项目管理', 
      platform: 'iOS, Android',
      version: '1.2.0',
      status: 'development',
      downloads: 0,
      rating: 0,
      size: '38 MB',
      lastUpdated: '2023-06-03'
    }
  ]);

  // 应用列表表格列
  const appColumns = [
    { key: 'name', title: '应用名称' },
    { key: 'platform', title: '平台' },
    { key: 'version', title: '版本' },
    { key: 'downloads', title: '下载量', render: (value: number) => value.toLocaleString() },
    { key: 'rating', title: '评分', render: (value: number) => value > 0 ? `${value} ★` : '-' },
    { key: 'size', title: '大小' },
    { key: 'lastUpdated', title: '最后更新' },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'published': { label: '已发布', color: 'bg-green-100 text-green-800' },
          'testing': { label: '测试中', color: 'bg-yellow-100 text-yellow-800' },
          'development': { label: '开发中', color: 'bg-blue-100 text-blue-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['development'];
        return <Badge className={status.color}>{status.label}</Badge>;
      }
    }
  ];

  // 模拟应用版本数据
  const [appVersions, setAppVersions] = useState([
    { 
      id: 1, 
      appId: 1,
      appName: 'YYC³ 移动版',
      version: '2.1.0',
      buildNumber: '20230601',
      status: 'published',
      releaseDate: '2023-06-01',
      changes: '修复已知问题，优化用户体验',
      downloads: 5600,
      crashRate: 0.2
    },
    { 
      id: 2, 
      appId: 1,
      appName: 'YYC³ 移动版',
      version: '2.0.5',
      buildNumber: '20230520',
      status: 'archived',
      releaseDate: '2023-05-20',
      changes: '新增数据同步功能',
      downloads: 12500,
      crashRate: 0.3
    },
    { 
      id: 3, 
      appId: 2,
      appName: 'YanYu 数据分析',
      version: '1.5.2',
      buildNumber: '20230528',
      status: 'published',
      releaseDate: '2023-05-28',
      changes: '优化图表加载速度',
      downloads: 3200,
      crashRate: 0.1
    },
    { 
      id: 4, 
      appId: 3,
      appName: 'YanYu AI助手',
      version: '0.9.5',
      buildNumber: '20230605',
      status: 'testing',
      releaseDate: '2023-06-05',
      changes: '新增语音识别功能',
      downloads: 800,
      crashRate: 1.2
    }
  ]);

  // 应用版本表格列
  const appVersionColumns = [
    { key: 'appName', title: '应用名称' },
    { key: 'version', title: '版本' },
    { key: 'buildNumber', title: '构建号' },
    { key: 'releaseDate', title: '发布日期' },
    { key: 'downloads', title: '下载量', render: (value: number) => value.toLocaleString() },
    { key: 'crashRate', title: '崩溃率', render: (value: number) => `${value}%` },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'published': { label: '已发布', color: 'bg-green-100 text-green-800' },
          'testing': { label: '测试中', color: 'bg-yellow-100 text-yellow-800' },
          'archived': { label: '已归档', color: 'bg-gray-100 text-gray-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['testing'];
        return <Badge className={status.color}>{status.label}</Badge>;
      }
    }
  ];

  // 模拟应用崩溃报告数据
  const [crashReports, setCrashReports] = useState([
    { 
      id: 1, 
      appName: 'YYC³ 移动版',
      version: '2.1.0',
      device: 'iPhone 13 Pro',
      os: 'iOS 16.5',
      error: 'NSInvalidArgumentException',
      occurrences: 125,
      date: '2023-06-10',
      status: 'resolved'
    },
    { 
      id: 2, 
      appName: 'YanYu AI助手',
      version: '0.9.5',
      device: 'Samsung Galaxy S22',
      os: 'Android 13',
      error: 'NullPointerException',
      occurrences: 89,
      date: '2023-06-09',
      status: 'investigating'
    },
    { 
      id: 3, 
      appName: 'YanYu 数据分析',
      version: '1.5.2',
      device: 'Google Pixel 6',
      os: 'Android 13',
      error: 'NetworkOnMainThreadException',
      occurrences: 45,
      date: '2023-06-08',
      status: 'resolved'
    },
    { 
      id: 4, 
      appName: 'YYC³ 移动版',
      version: '2.0.5',
      device: 'iPhone 12',
      os: 'iOS 16.4',
      error: 'SIGSEGV',
      occurrences: 32,
      date: '2023-06-07',
      status: 'open'
    }
  ]);

  // 应用崩溃报告表格列
  const crashReportColumns = [
    { key: 'appName', title: '应用名称' },
    { key: 'version', title: '版本' },
    { key: 'device', title: '设备' },
    { key: 'os', title: '操作系统' },
    { key: 'error', title: '错误类型' },
    { key: 'occurrences', title: '发生次数' },
    { key: 'date', title: '日期' },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'resolved': { label: '已解决', color: 'bg-green-100 text-green-800' },
          'investigating': { label: '调查中', color: 'bg-yellow-100 text-yellow-800' },
          'open': { label: '未处理', color: 'bg-red-100 text-red-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['open'];
        return <Badge className={status.color}>{status.label}</Badge>;
      }
    }
  ];

  // 获取状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'testing':
        return 'bg-yellow-100 text-yellow-800';
      case 'development':
        return 'bg-blue-100 text-blue-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'investigating':
        return 'bg-yellow-100 text-yellow-800';
      case 'open':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 获取状态图标
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'testing':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'development':
        return <Code className="h-5 w-5 text-blue-500" />;
      case 'archived':
        return <div className="h-5 w-5 rounded-full bg-gray-500"></div>;
      default:
        return <div className="h-5 w-5 rounded-full bg-gray-300"></div>;
    }
  };

  return (
    <PageTemplate
      title="移动应用"
      description="移动应用管理和监控界面，包含应用发布、版本控制和崩溃报告"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '商务功能', path: '/business' },
        { title: '移动应用', path: '/mobile' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            创建应用
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            应用设置
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* 移动应用统计卡片 */}
        <StatCardGroup>
          {mobileStats.map((stat, index) => (
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

        {/* 移动应用管理标签页 */}
        <Tabs defaultValue="apps" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="apps">应用列表</TabsTrigger>
            <TabsTrigger value="versions">版本管理</TabsTrigger>
            <TabsTrigger value="crashes">崩溃报告</TabsTrigger>
          </TabsList>
          
          <TabsContent value="apps" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索应用..."
                  className="pl-8"
                />
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="mr-2 h-5 w-5" />
                  应用列表
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={appList}
                  columns={appColumns}
                  actions={(row) => (
                    <>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        查看详情
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        <BarChart3 className="inline mr-2 h-4 w-4" />
                        查看统计
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        <Upload className="inline mr-2 h-4 w-4" />
                        上传新版本
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        编辑应用
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 text-red-500">
                        删除应用
                      </button>
                    </>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="versions" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索版本..."
                  className="pl-8"
                />
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="mr-2 h-5 w-5" />
                  版本管理
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={appVersions}
                  columns={appVersionColumns}
                  actions={(row) => (
                    <>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        查看详情
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        下载版本
                      </button>
                      {row.status === 'published' ? (
                        <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                          归档版本
                        </button>
                      ) : (
                        <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                          发布版本
                        </button>
                      )}
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 text-red-500">
                        删除版本
                      </button>
                    </>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="crashes" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索崩溃报告..."
                  className="pl-8"
                />
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bug className="mr-2 h-5 w-5" />
                  崩溃报告
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={crashReports}
                  columns={crashReportColumns}
                  actions={(row) => (
                    <>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        查看详情
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        查看堆栈
                      </button>
                      {row.status === 'open' ? (
                        <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                          标记为调查中
                        </button>
                      ) : row.status === 'investigating' ? (
                        <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                          标记为已解决
                        </button>
                      ) : null}
                    </>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 应用性能监控 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              应用性能监控
            </CardTitle>
            <CardDescription>应用性能指标和用户行为分析</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-medium mb-2">日活跃用户</div>
                <div className="h-48 flex items-end space-x-1">
                  {Array.from({ length: 7 }, (_, i) => {
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
                  <span>7天前</span>
                  <span>3天前</span>
                  <span>今天</span>
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-2">应用崩溃率 (%)</div>
                <div className="h-48 flex items-end space-x-1">
                  {Array.from({ length: 7 }, (_, i) => {
                    const height = 5 + Math.random() * 15;
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
                  <span>7天前</span>
                  <span>3天前</span>
                  <span>今天</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}
