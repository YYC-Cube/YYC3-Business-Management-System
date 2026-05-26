// app/platform/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { DataTable } from '@/components/business/data-table';
import { StatCard, StatCardGroup } from '@/components/business/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Server, 
  Users, 
  Activity, 
  AlertTriangle,
  CheckCircle,
  Settings,
  Plus,
  Search,
  RefreshCw,
  Globe,
  Database,
  Zap,
  HardDrive
} from 'lucide-react';

export default function PlatformPage() {
  // 模拟平台统计数据
  const [platformStats, setPlatformStats] = useState([
    {
      title: '服务实例',
      value: '42',
      change: { value: 3, type: 'increase' as const, text: '较上月' },
      icon: <Server className="h-5 w-5" />,
      description: '运行中的服务实例数'
    },
    {
      title: '活跃用户',
      value: '12,560',
      change: { value: 8, type: 'increase' as const, text: '较上月' },
      icon: <Users className="h-5 w-5" />,
      description: '平台活跃用户数'
    },
    {
      title: 'API调用',
      value: '4.5M',
      change: { value: 12, type: 'increase' as const, text: '较上月' },
      icon: <Activity className="h-5 w-5" />,
      description: '本月API调用次数'
    },
    {
      title: '系统负载',
      value: '68%',
      change: { value: 5, type: 'decrease' as const, text: '较上月' },
      icon: <Zap className="h-5 w-5" />,
      description: '当前系统负载'
    }
  ]);

  // 模拟服务实例数据
  const [serviceInstances, setServiceInstances] = useState([
    { 
      id: 1, 
      name: 'Web服务', 
      type: '前端',
      status: 'running',
      version: 'v2.1.0',
      cpu: 25,
      memory: 512,
      requests: 12560,
      uptime: '15天',
      lastDeployed: '2023-06-01'
    },
    { 
      id: 2, 
      name: 'API服务', 
      type: '后端',
      status: 'running',
      version: 'v3.2.1',
      cpu: 45,
      memory: 1024,
      requests: 45680,
      uptime: '20天',
      lastDeployed: '2023-05-28'
    },
    { 
      id: 3, 
      name: '数据库服务', 
      type: '数据',
      status: 'running',
      version: 'v5.7.0',
      cpu: 35,
      memory: 2048,
      requests: 0,
      uptime: '30天',
      lastDeployed: '2023-05-20'
    },
    { 
      id: 4, 
      name: '缓存服务', 
      type: '缓存',
      status: 'warning',
      version: 'v6.0.2',
      cpu: 15,
      memory: 768,
      requests: 32560,
      uptime: '10天',
      lastDeployed: '2023-06-05'
    }
  ]);

  // 服务实例表格列
  const serviceInstanceColumns = [
    { key: 'name', title: '服务名称' },
    { key: 'type', title: '类型' },
    { key: 'version', title: '版本' },
    { key: 'cpu', title: 'CPU使用率', render: (value: number) => `${value}%` },
    { key: 'memory', title: '内存使用', render: (value: number) => `${value}MB` },
    { key: 'requests', title: '请求数', render: (value: number) => value.toLocaleString() },
    { key: 'uptime', title: '运行时间' },
    { key: 'lastDeployed', title: '最后部署' },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'running': { label: '运行中', color: 'bg-green-100 text-green-800' },
          'stopped': { label: '已停止', color: 'bg-red-100 text-red-800' },
          'warning': { label: '警告', color: 'bg-yellow-100 text-yellow-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['stopped'];
        return <Badge className={status.color}>{status.label}</Badge>;
      }
    }
  ];

  // 模拟平台事件数据
  const [platformEvents, setPlatformEvents] = useState([
    { 
      id: 1, 
      type: 'deployment', 
      service: 'Web服务',
      message: '成功部署到生产环境',
      status: 'success',
      time: '2023-06-01 10:30',
      user: '张三'
    },
    { 
      id: 2, 
      type: 'error', 
      service: '缓存服务',
      message: '内存使用率超过90%',
      status: 'warning',
      time: '2023-06-05 14:20',
      user: '系统'
    },
    { 
      id: 3, 
      type: 'scaling', 
      service: 'API服务',
      message: '自动扩容至3个实例',
      status: 'info',
      time: '2023-06-03 09:15',
      user: '系统'
    },
    { 
      id: 4, 
      type: 'update', 
      service: '数据库服务',
      message: '安全补丁已应用',
      status: 'success',
      time: '2023-05-28 16:45',
      user: '李四'
    }
  ]);

  // 平台事件表格列
  const platformEventColumns = [
    { key: 'time', title: '时间' },
    { key: 'type', title: '类型' },
    { key: 'service', title: '服务' },
    { key: 'message', title: '消息' },
    { key: 'user', title: '用户' },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'success': { label: '成功', color: 'bg-green-100 text-green-800' },
          'warning': { label: '警告', color: 'bg-yellow-100 text-yellow-800' },
          'error': { label: '错误', color: 'bg-red-100 text-red-800' },
          'info': { label: '信息', color: 'bg-blue-100 text-blue-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['info'];
        return <Badge className={status.color}>{status.label}</Badge>;
      }
    }
  ];

  // 获取状态图标
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'stopped':
        return <div className="h-5 w-5 rounded-full bg-red-500"></div>;
      default:
        return <div className="h-5 w-5 rounded-full bg-gray-300"></div>;
    }
  };

  return (
    <PageTemplate
      title="平台管理"
      description="平台服务管理和监控界面，显示服务状态和系统资源使用情况"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '商务功能', path: '/business' },
        { title: '平台管理', path: '/platform' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            部署服务
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            平台设置
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* 平台统计卡片 */}
        <StatCardGroup>
          {platformStats.map((stat, index) => (
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 服务实例 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="mr-2 h-5 w-5" />
                服务实例
              </CardTitle>
              <CardDescription>平台中的服务实例</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceInstances.map(instance => (
                  <div key={instance.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{instance.name}</div>
                      <div className="flex items-center">
                        {getStatusIcon(instance.status)}
                        <Badge className={`ml-2 ${
                          instance.status === 'running' ? 'bg-green-100 text-green-800' :
                          instance.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {instance.status === 'running' ? '运行中' :
                           instance.status === 'warning' ? '警告' : '已停止'}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-gray-500">类型</div>
                        <div>{instance.type}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">版本</div>
                        <div>{instance.version}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">CPU</div>
                        <div>{instance.cpu}%</div>
                      </div>
                      <div>
                        <div className="text-gray-500">内存</div>
                        <div>{instance.memory}MB</div>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Activity className="mr-1 h-3 w-3 text-gray-500" />
                        <span>请求数: {instance.requests.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <RefreshCw className="mr-1 h-3 w-3 text-gray-500" />
                        <span>运行时间: {instance.uptime}</span>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      最后部署: {instance.lastDeployed}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 平台事件 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5" />
                平台事件
              </CardTitle>
              <CardDescription>最近的平台事件</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {platformEvents.map(event => (
                  <div key={event.id} className="p-3 border rounded-lg">
                    <div className="flex items-start">
                      <div className={`mr-3 p-1 rounded-full ${
                        event.status === 'success' ? 'bg-green-100' :
                        event.status === 'warning' ? 'bg-yellow-100' :
                        event.status === 'error' ? 'bg-red-100' : 'bg-blue-100'
                      }`}>
                        {event.status === 'success' ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : event.status === 'warning' ? (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        ) : event.status === 'error' ? (
                          <div className="h-4 w-4 rounded-full bg-red-500"></div>
                        ) : (
                          <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{event.message}</div>
                        <div className="text-sm text-gray-500">
                          {event.service} · {event.user} · {event.time}
                        </div>
                      </div>
                      <Badge className={
                        event.status === 'success' ? 'bg-green-100 text-green-800' :
                        event.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        event.status === 'error' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }>
                        {event.status === 'success' ? '成功' :
                         event.status === 'warning' ? '警告' :
                         event.status === 'error' ? '错误' : '信息'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 系统资源监控 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <HardDrive className="mr-2 h-5 w-5" />
              系统资源监控
            </CardTitle>
            <CardDescription>平台系统资源使用情况</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">CPU使用率</div>
                  <span className="text-lg font-bold">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-blue-500" style={{ width: '45%' }}></div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">内存使用率</div>
                  <span className="text-lg font-bold">62%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: '62%' }}></div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">磁盘使用率</div>
                  <span className="text-lg font-bold">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-yellow-500" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="text-sm font-medium mb-2">网络流量</div>
              <div className="h-32 flex items-end space-x-1">
                {Array.from({ length: 24 }, (_, i) => {
                  const height = 20 + Math.random() * 80;
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
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}
