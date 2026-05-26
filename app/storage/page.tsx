// app/storage/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { StatCard, StatCardGroup } from '@/components/business/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Database, 
  HardDrive, 
  Cloud, 
  Server,
  Activity,
  AlertTriangle,
  Settings,
  RefreshCw,
  TrendingUp,
  BarChart3
} from 'lucide-react';

export default function StoragePage() {
  // 模拟存储数据
  const [storageData, setStorageData] = useState({
    total: 1024, // GB
    used: 785,   // GB
    available: 239, // GB
    usagePercentage: 76.7
  });

  // 模拟存储节点数据
  const [storageNodes, setStorageNodes] = useState([
    { 
      id: 1, 
      name: '主存储节点', 
      type: 'SSD',
      status: 'online',
      capacity: 512,
      used: 389,
      performance: 98,
      location: '北京机房'
    },
    { 
      id: 2, 
      name: '备份存储节点', 
      type: 'HDD',
      status: 'online',
      capacity: 1024,
      used: 396,
      performance: 85,
      location: '上海机房'
    },
    { 
      id: 3, 
      name: '归档存储节点', 
      type: 'Tape',
      status: 'online',
      capacity: 2048,
      used: 0,
      performance: 45,
      location: '深圳机房'
    },
    { 
      id: 4, 
      name: '缓存存储节点', 
      type: 'NVMe',
      status: 'warning',
      capacity: 256,
      used: 245,
      performance: 92,
      location: '北京机房'
    }
  ]);

  // 模拟存储性能数据
  const [storagePerformance, setStoragePerformance] = useState({
    readSpeed: 1250, // MB/s
    writeSpeed: 980,  // MB/s
    iops: 45000,     // I/O operations per second
    latency: 0.8     // ms
  });

  // 模拟存储活动数据
  const [storageActivities, setStorageActivities] = useState([
    { id: 1, action: '数据备份', size: '2.4 GB', status: 'completed', time: '10分钟前' },
    { id: 2, action: '数据迁移', size: '15.6 GB', status: 'running', progress: 65, time: '25分钟前' },
    { id: 3, action: '存储扩容', size: '100 GB', status: 'completed', time: '2小时前' },
    { id: 4, action: '数据清理', size: '3.2 GB', status: 'pending', time: '3小时前' }
  ]);

  // 获取状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'offline':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'running':
        return 'bg-purple-100 text-purple-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageTemplate
      title="存储管理"
      description="数据存储配置和资源管理界面，显示存储使用率和性能监控图表"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '智能引擎', path: '/ai' },
        { title: '存储管理', path: '/storage' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            刷新数据
          </Button>
          <Button>
            <Settings className="mr-2 h-4 w-4" />
            存储设置
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* 存储统计卡片 */}
        <StatCardGroup>
          <StatCard
            title="总存储容量"
            value={`${storageData.total} GB`}
            icon={<Database className="h-5 w-5" />}
            description="系统总存储容量"
          />
          <StatCard
            title="已用存储"
            value={`${storageData.used} GB`}
            change={{ value: 5, type: 'increase', text: '较上月' }}
            icon={<HardDrive className="h-5 w-5" />}
            description="已使用的存储空间"
          />
          <StatCard
            title="可用存储"
            value={`${storageData.available} GB`}
            icon={<Cloud className="h-5 w-5" />}
            description="剩余可用存储空间"
          />
          <StatCard
            title="存储使用率"
            value={`${storageData.usagePercentage}%`}
            change={{ value: 2, type: 'increase', text: '较上月' }}
            icon={<Activity className="h-5 w-5" />}
            description="存储空间使用率"
          />
        </StatCardGroup>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 存储节点 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="mr-2 h-5 w-5" />
                存储节点
              </CardTitle>
              <CardDescription>系统中的存储节点及其状态</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {storageNodes.map(node => (
                  <div key={node.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{node.name}</div>
                      <Badge className={getStatusStyle(node.status)}>
                        {node.status === 'online' ? '在线' :
                         node.status === 'warning' ? '警告' :
                         node.status === 'offline' ? '离线' : node.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-gray-500">类型</div>
                        <div>{node.type}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">位置</div>
                        <div>{node.location}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">容量</div>
                        <div>{node.capacity} GB</div>
                      </div>
                      <div>
                        <div className="text-gray-500">已用</div>
                        <div>{node.used} GB</div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>使用率</span>
                        <span>{Math.round((node.used / node.capacity) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            (node.used / node.capacity) > 0.9 ? 'bg-red-500' :
                            (node.used / node.capacity) > 0.7 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${(node.used / node.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="text-gray-500">性能: </span>
                      <span className={node.performance > 90 ? 'text-green-600' : node.performance > 70 ? 'text-yellow-600' : 'text-red-600'}>
                        {node.performance}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 存储性能 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                存储性能
              </CardTitle>
              <CardDescription>存储系统性能指标</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="text-sm text-gray-500 mb-1">读取速度</div>
                    <div className="text-2xl font-bold">{storagePerformance.readSpeed} MB/s</div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="text-sm text-gray-500 mb-1">写入速度</div>
                    <div className="text-2xl font-bold">{storagePerformance.writeSpeed} MB/s</div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="text-sm text-gray-500 mb-1">IOPS</div>
                    <div className="text-2xl font-bold">{storagePerformance.iops.toLocaleString()}</div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="text-sm text-gray-500 mb-1">延迟</div>
                    <div className="text-2xl font-bold">{storagePerformance.latency} ms</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium mb-2">性能趋势</div>
                  <div className="h-32 flex items-end space-x-1">
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
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 存储活动 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              存储活动
            </CardTitle>
            <CardDescription>最近的存储操作和活动</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {storageActivities.map(activity => (
                <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <div className="mr-3 p-2 rounded-full bg-blue-100">
                      <Database className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <div className="font-medium">{activity.action}</div>
                      <div className="text-sm text-gray-500">
                        大小: {activity.size} · 时间: {activity.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Badge className={getStatusStyle(activity.status)}>
                      {activity.status === 'completed' ? '已完成' :
                       activity.status === 'running' ? '进行中' :
                       activity.status === 'pending' ? '等待中' : activity.status}
                    </Badge>
                    {activity.status === 'running' && (
                      <div className="ml-3 w-16">
                        <div className="text-xs text-gray-500 mb-1">{activity.progress}%</div>
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div 
                            className="h-1 rounded-full bg-blue-500"
                            style={{ width: `${activity.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 存储警告 */}
        {storageNodes.some(node => node.status === 'warning') && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-800">
                <AlertTriangle className="mr-2 h-5 w-5" />
                存储警告
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-yellow-700">
                以下存储节点需要关注：
                <ul className="list-disc pl-5 mt-2">
                  {storageNodes
                    .filter(node => node.status === 'warning')
                    .map(node => (
                      <li key={node.id}>
                        {node.name} - 使用率 {Math.round((node.used / node.capacity) * 100)}%
                      </li>
                    ))
                  }
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageTemplate>
  );
}
