// app/monitoring/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { StatCard, StatCardGroup } from '@/components/business/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Cpu, 
  HardDrive, 
  Wifi, 
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Server,
  Database,
  Zap
} from 'lucide-react';

export default function MonitoringPage() {
  // 模拟系统资源数据
  const [systemResources, setSystemResources] = useState({
    cpu: { usage: 45, status: 'normal' },
    memory: { usage: 62, status: 'normal' },
    disk: { usage: 78, status: 'warning' },
    network: { usage: 32, status: 'normal' }
  });

  // 模拟服务状态数据
  const [services, setServices] = useState([
    { id: 1, name: 'Web服务器', status: 'running', uptime: '15天', cpu: 12, memory: 256 },
    { id: 2, name: '数据库', status: 'running', uptime: '30天', cpu: 25, memory: 1024 },
    { id: 3, name: '缓存服务', status: 'running', uptime: '20天', cpu: 8, memory: 512 },
    { id: 4, name: '消息队列', status: 'warning', uptime: '5天', cpu: 15, memory: 384 },
    { id: 5, name: '文件存储', status: 'running', uptime: '25天', cpu: 5, memory: 128 }
  ]);

  // 模拟告警数据
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning', message: '磁盘空间使用率超过80%', source: '文件存储', time: '10分钟前', resolved: false },
    { id: 2, type: 'error', message: '数据库连接超时', source: '数据库', time: '25分钟前', resolved: true },
    { id: 3, type: 'info', message: '系统更新完成', source: '系统', time: '1小时前', resolved: true },
    { id: 4, type: 'warning', message: '内存使用率较高', source: 'Web服务器', time: '2小时前', resolved: false }
  ]);

  // 模拟实时数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      // 更新系统资源数据
      setSystemResources(prev => ({
        cpu: { 
          usage: Math.min(100, Math.max(0, prev.cpu.usage + (Math.random() - 0.5) * 5)), 
          status: 'normal' 
        },
        memory: { 
          usage: Math.min(100, Math.max(0, prev.memory.usage + (Math.random() - 0.5) * 3)), 
          status: 'normal' 
        },
        disk: { 
          usage: Math.min(100, Math.max(0, prev.disk.usage + (Math.random() - 0.5) * 1)), 
          status: prev.disk.usage > 80 ? 'warning' : 'normal' 
        },
        network: { 
          usage: Math.min(100, Math.max(0, prev.network.usage + (Math.random() - 0.5) * 10)), 
          status: 'normal' 
        }
      }));

      // 随机更新服务状态
      setServices(prev => prev.map(service => {
        if (service.id === 4 && Math.random() > 0.7) {
          return { ...service, status: 'running' };
        }
        return service;
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // 获取状态图标
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <div className="h-5 w-5 rounded-full bg-gray-300"></div>;
    }
  };

  // 获取告警类型样式
  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'info':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageTemplate
      title="实时监控"
      description="系统资源和用户行为实时监控界面，包含实时数据流图表和异常告警"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '数据分析', path: '/analytics' },
        { title: '实时监控', path: '/monitoring' }
      ]}
      actions={
        <Button>
          <RefreshCw className="mr-2 h-4 w-4" />
          刷新数据
        </Button>
      }
    >
      <div className="space-y-8">
        {/* 系统资源监控 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              系统资源监控
            </CardTitle>
            <CardDescription>实时系统资源使用情况</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Cpu className="mr-2 h-5 w-5 text-blue-500" />
                    <span className="font-medium">CPU使用率</span>
                  </div>
                  <span className="text-lg font-bold">{systemResources.cpu.usage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      systemResources.cpu.status === 'normal' ? 'bg-green-500' : 
                      systemResources.cpu.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${systemResources.cpu.usage}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <HardDrive className="mr-2 h-5 w-5 text-purple-500" />
                    <span className="font-medium">内存使用率</span>
                  </div>
                  <span className="text-lg font-bold">{systemResources.memory.usage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      systemResources.memory.status === 'normal' ? 'bg-green-500' : 
                      systemResources.memory.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${systemResources.memory.usage}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Database className="mr-2 h-5 w-5 text-amber-500" />
                    <span className="font-medium">磁盘使用率</span>
                  </div>
                  <span className="text-lg font-bold">{systemResources.disk.usage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      systemResources.disk.status === 'normal' ? 'bg-green-500' : 
                      systemResources.disk.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${systemResources.disk.usage}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Wifi className="mr-2 h-5 w-5 text-green-500" />
                    <span className="font-medium">网络使用率</span>
                  </div>
                  <span className="text-lg font-bold">{systemResources.network.usage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      systemResources.network.status === 'normal' ? 'bg-green-500' : 
                      systemResources.network.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${systemResources.network.usage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 服务状态 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="mr-2 h-5 w-5" />
                服务状态
              </CardTitle>
              <CardDescription>系统服务运行状态</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map(service => (
                  <div key={service.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      {getStatusIcon(service.status)}
                      <div className="ml-3">
                        <div className="font-medium">{service.name}</div>
                        <div className="text-sm text-gray-500">
                          运行时间: {service.uptime} · CPU: {service.cpu}% · 内存: {service.memory}MB
                        </div>
                      </div>
                    </div>
                    <Badge 
                      className={
                        service.status === 'running' ? 'bg-green-100 text-green-800' :
                        service.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }
                    >
                      {service.status === 'running' ? '运行中' :
                       service.status === 'warning' ? '警告' : '错误'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 告警信息 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                告警信息
              </CardTitle>
              <CardDescription>系统告警和异常信息</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map(alert => (
                  <div key={alert.id} className="p-3 border rounded-lg">
                    <div className="flex items-start">
                      <div className={`px-2 py-1 rounded text-xs ${getAlertStyle(alert.type)} mr-3`}>
                        {alert.type === 'error' ? '错误' :
                         alert.type === 'warning' ? '警告' : '信息'}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{alert.message}</div>
                        <div className="text-sm text-gray-500">
                          来源: {alert.source} · 时间: {alert.time}
                        </div>
                      </div>
                      {alert.resolved ? (
                        <Badge className="bg-green-100 text-green-800">已解决</Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800">未解决</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 实时流量图表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="mr-2 h-5 w-5" />
              实时流量
            </CardTitle>
            <CardDescription>系统实时流量监控</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end space-x-1">
              {Array.from({ length: 60 }, (_, i) => {
                const height = 20 + Math.random() * 180;
                return (
                  <div 
                    key={i} 
                    className="flex-1 bg-blue-500 rounded-t"
                    style={{ height: `${height}px` }}
                  ></div>
                );
              })}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>60秒前</span>
              <span>30秒前</span>
              <span>现在</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}
