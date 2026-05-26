// app/sync/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BarChart2, PieChart, Cloud, Server, Database, RefreshCw, Settings, Plus, Trash2, Edit, Play, Pause, AlertCircle, CheckCircle2, File, Folder, Share2, Users, Calendar, Clock, Filter, Search, ExternalLink, ChevronDown, ChevronRight, Info, Lock, Unlock, Eye, EyeOff, Download, Upload, Zap, GitBranch, GitPullRequest, Code, Layers, FileText, Network, Wifi } from 'lucide-react';

export default function SyncPage() {
  // 同步状态
  const [syncStatus, setSyncStatus] = useState({
    isRunning: true,
    lastSyncTime: '2023-06-15 14:30:25',
    nextSyncTime: '2023-06-15 18:30:00',
    totalItems: 1258,
    syncedItems: 1258,
    failedItems: 0,
    syncPercentage: 100,
    syncSpeed: '2.5 MB/s',
    status: 'completed'
  });

  // 同步任务列表
  const [syncTasks, setSyncTasks] = useState([
    {
      id: 1,
      name: '每日数据备份',
      source: '数据库服务器',
      destination: '云存储',
      frequency: '每日',
      lastRun: '今天 00:30',
      status: 'completed',
      nextRun: '明天 00:30',
      items: 512,
      size: '12.5 GB',
      duration: '35分钟',
      isActive: true,
      type: 'database'
    },
    {
      id: 2,
      name: '用户文件同步',
      source: '文件服务器',
      destination: '云存储',
      frequency: '每小时',
      lastRun: '今天 14:30',
      status: 'completed',
      nextRun: '今天 15:30',
      items: 324,
      size: '5.8 GB',
      duration: '12分钟',
      isActive: true,
      type: 'files'
    },
    {
      id: 3,
      name: '营销数据同步',
      source: '营销系统',
      destination: '数据仓库',
      frequency: '每2小时',
      lastRun: '今天 13:00',
      status: 'completed',
      nextRun: '今天 15:00',
      items: 156,
      size: '3.2 GB',
      duration: '8分钟',
      isActive: true,
      type: 'marketing'
    },
    {
      id: 4,
      name: '客户关系数据同步',
      source: 'CRM系统',
      destination: '数据仓库',
      frequency: '每4小时',
      lastRun: '今天 12:00',
      status: 'completed',
      nextRun: '今天 16:00',
      items: 203,
      size: '8.7 GB',
      duration: '25分钟',
      isActive: true,
      type: 'crm'
    },
    {
      id: 5,
      name: '系统日志同步',
      source: '应用服务器',
      destination: '日志服务器',
      frequency: '每30分钟',
      lastRun: '今天 14:00',
      status: 'completed',
      nextRun: '今天 14:30',
      items: 63,
      size: '1.5 GB',
      duration: '5分钟',
      isActive: true,
      type: 'logs'
    },
    {
      id: 6,
      name: '旧数据迁移',
      source: '旧服务器',
      destination: '新服务器',
      frequency: '一次性',
      lastRun: '2023-06-10',
      status: 'failed',
      nextRun: '无',
      items: 45,
      size: '3.8 GB',
      duration: '22分钟',
      isActive: false,
      type: 'migration'
    }
  ]);

  // 同步历史记录
  const [syncHistory, setSyncHistory] = useState([
    {
      id: 1,
      taskName: '每日数据备份',
      startTime: '2023-06-15 00:30:00',
      endTime: '2023-06-15 01:05:23',
      duration: '35分钟23秒',
      status: 'completed',
      items: 512,
      synced: 512,
      failed: 0,
      size: '12.5 GB',
      speed: '5.8 MB/s'
    },
    {
      id: 2,
      taskName: '用户文件同步',
      startTime: '2023-06-15 14:30:00',
      endTime: '2023-06-15 14:42:15',
      duration: '12分钟15秒',
      status: 'completed',
      items: 324,
      synced: 324,
      failed: 0,
      size: '5.8 GB',
      speed: '7.9 MB/s'
    },
    {
      id: 3,
      taskName: '营销数据同步',
      startTime: '2023-06-15 13:00:00',
      endTime: '2023-06-15 13:08:47',
      duration: '8分钟47秒',
      status: 'completed',
      items: 156,
      synced: 156,
      failed: 0,
      size: '3.2 GB',
      speed: '6.0 MB/s'
    },
    {
      id: 4,
      taskName: '客户关系数据同步',
      startTime: '2023-06-15 12:00:00',
      endTime: '2023-06-15 12:25:12',
      duration: '25分钟12秒',
      status: 'completed',
      items: 203,
      synced: 203,
      failed: 0,
      size: '8.7 GB',
      speed: '5.8 MB/s'
    },
    {
      id: 5,
      taskName: '系统日志同步',
      startTime: '2023-06-15 14:00:00',
      endTime: '2023-06-15 14:05:36',
      duration: '5分钟36秒',
      status: 'completed',
      items: 63,
      synced: 63,
      failed: 0,
      size: '1.5 GB',
      speed: '4.5 MB/s'
    },
    {
      id: 6,
      taskName: '旧数据迁移',
      startTime: '2023-06-10 10:00:00',
      endTime: '2023-06-10 10:22:08',
      duration: '22分钟08秒',
      status: 'failed',
      items: 45,
      synced: 23,
      failed: 22,
      size: '3.8 GB',
      speed: '2.9 MB/s'
    }
  ]);

  // 同步目标配置
  const [syncDestinations, setSyncDestinations] = useState([
    {
      id: 1,
      name: '阿里云OSS',
      type: 'cloud',
      status: 'connected',
      lastConnected: '今天 09:15',
      totalSpace: '1000 GB',
      usedSpace: '456 GB',
      connectionStatus: true,
      encryptionStatus: true,
      endpoint: 'oss-cn-hangzhou.aliyuncs.com'
    },
    {
      id: 2,
      name: '本地数据中心',
      type: 'local',
      status: 'connected',
      lastConnected: '今天 08:30',
      totalSpace: '2000 GB',
      usedSpace: '1245 GB',
      connectionStatus: true,
      encryptionStatus: false,
      endpoint: '192.168.1.100'
    },
    {
      id: 3,
      name: 'Amazon S3',
      type: 'cloud',
      status: 'disconnected',
      lastConnected: '昨天 16:45',
      totalSpace: '500 GB',
      usedSpace: '234 GB',
      connectionStatus: false,
      encryptionStatus: true,
      endpoint: 's3.amazonaws.com'
    },
    {
      id: 4,
      name: '数据仓库',
      type: 'database',
      status: 'connected',
      lastConnected: '今天 10:00',
      totalSpace: '5000 GB',
      usedSpace: '3789 GB',
      connectionStatus: true,
      encryptionStatus: true,
      endpoint: 'dw.company.com'
    }
  ]);

  // 同步统计信息
  const [syncStats, setSyncStats] = useState({
    todaySyncs: 12,
    thisWeekSyncs: 85,
    thisMonthSyncs: 356,
    totalSuccessfulSyncs: 12589,
    totalFailedSyncs: 432,
    totalDataSynced: '12.5 TB',
    averageSyncSpeed: '4.8 MB/s'
  });

  // 渲染任务类型图标
  const renderTaskTypeIcon = (type: string) => {
    switch(type) {
      case 'database':
        return <Database className="h-5 w-5 text-blue-500" />;
      case 'files':
        return <File className="h-5 w-5 text-green-500" />;
      case 'marketing':
        return <BarChart2 className="h-5 w-5 text-purple-500" />;
      case 'crm':
        return <Users className="h-5 w-5 text-amber-500" />;
      case 'logs':
        return <FileText className="h-5 w-5 text-gray-500" />;
      case 'migration':
        return <GitBranch className="h-5 w-5 text-red-500" />;
      default:
        return <RefreshCw className="h-5 w-5 text-indigo-500" />;
    }
  };

  // 渲染同步状态徽章
  const renderSyncStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">已完成</Badge>;
      case 'running':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">运行中</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">失败</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">待处理</Badge>;
      case 'paused':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">已暂停</Badge>;
      default:
        return <Badge variant="outline">未知状态</Badge>;
    }
  };

  // 渲染连接状态图标
  const renderConnectionStatusIcon = (status: boolean) => {
    return status ? (
      <div className="flex items-center text-green-600">
        <CheckCircle2 className="h-4 w-4 mr-1" />
        <span className="text-sm">已连接</span>
      </div>
    ) : (
      <div className="flex items-center text-red-600">
        <AlertCircle className="h-4 w-4 mr-1" />
        <span className="text-sm">未连接</span>
      </div>
    );
  };

  // 渲染加密状态图标
  const renderEncryptionStatusIcon = (status: boolean) => {
    return status ? (
      <div className="flex items-center text-green-600">
        <Lock className="h-4 w-4 mr-1" />
        <span className="text-sm">已加密</span>
      </div>
    ) : (
      <div className="flex items-center text-amber-600">
        <Unlock className="h-4 w-4 mr-1" />
        <span className="text-sm">未加密</span>
      </div>
    );
  };

  // 切换同步状态
  const toggleSyncStatus = () => {
    setSyncStatus(prev => ({
      ...prev,
      isRunning: !prev.isRunning,
      status: !prev.isRunning ? 'running' : 'paused'
    }));
  };

  // 切换任务激活状态
  const toggleTaskActive = (taskId: number) => {
    setSyncTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, isActive: !task.isActive } : task
    ));
  };

  // 运行同步任务
  const runSyncTask = (taskId: number) => {
    // 模拟运行同步任务
    setSyncTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: 'running', lastRun: '正在运行' } : task
    ));
  };

  // 暂停同步任务
  const pauseSyncTask = (taskId: number) => {
    // 模拟暂停同步任务
    setSyncTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: 'paused' } : task
    ));
  };

  return (
    <PageTemplate
      title="同步管理"
      description="管理系统数据同步任务和历史记录"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '同步管理', path: '/sync' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">
            <RefreshCw className="mr-1 h-4 w-4" />
            刷新
          </Button>
          <Button variant="secondary" size="sm">
            <Filter className="mr-1 h-4 w-4" />
            筛选
          </Button>
          <Button>
            <Plus className="mr-1 h-4 w-4" />
            新建同步任务
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* 搜索栏 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="搜索同步任务..."
            className="pl-10 h-14 text-lg"
          />
        </div>

        {/* 同步概览 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <RefreshCw className="mr-2 h-5 w-5" />
                同步状态
              </CardTitle>
              <CardDescription>当前系统同步状态</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">同步状态</span>
                  <div className="flex items-center gap-2">
                    {syncStatus.isRunning ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">运行中</Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">已暂停</Badge>
                    )}
                    <Switch checked={syncStatus.isRunning} onCheckedChange={toggleSyncStatus} />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">上次同步时间</span>
                  <span className="text-sm font-medium">{syncStatus.lastSyncTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">下次同步时间</span>
                  <span className="text-sm font-medium">{syncStatus.nextSyncTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">同步进度</span>
                  <span className="text-sm font-medium">{syncStatus.syncPercentage}%</span>
                </div>
                <Progress value={syncStatus.syncPercentage} className="h-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm">总项目数</span>
                  <span className="text-sm font-medium">{syncStatus.totalItems}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">已同步项目</span>
                  <span className="text-sm font-medium text-green-600">{syncStatus.syncedItems}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">失败项目</span>
                  <span className="text-sm font-medium text-red-600">{syncStatus.failedItems}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">同步速度</span>
                  <span className="text-sm font-medium">{syncStatus.syncSpeed}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="secondary" size="sm">
                <Settings className="mr-1 h-4 w-4" />
                同步设置
              </Button>
              {syncStatus.isRunning ? (
                <Button variant="secondary" size="sm" onClick={toggleSyncStatus}>
                  <Pause className="mr-1 h-4 w-4" />
                  暂停同步
                </Button>
              ) : (
                <Button size="sm" onClick={toggleSyncStatus}>
                  <Play className="mr-1 h-4 w-4" />
                  开始同步
                </Button>
              )}
            </CardFooter>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart2 className="mr-2 h-5 w-5" />
                同步统计
              </CardTitle>
              <CardDescription>同步任务执行统计信息</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">今日同步次数</div>
                  <div className="text-2xl font-bold text-blue-600">{syncStats.todaySyncs}</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">本周同步次数</div>
                  <div className="text-2xl font-bold text-purple-600">{syncStats.thisWeekSyncs}</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">本月同步次数</div>
                  <div className="text-2xl font-bold text-green-600">{syncStats.thisMonthSyncs}</div>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">总成功同步</div>
                  <div className="text-2xl font-bold text-amber-600">{syncStats.totalSuccessfulSyncs.toLocaleString()}</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">总失败同步</div>
                  <div className="text-2xl font-bold text-red-600">{syncStats.totalFailedSyncs}</div>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">总同步数据</div>
                  <div className="text-2xl font-bold text-indigo-600">{syncStats.totalDataSynced}</div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="h-64 bg-white rounded-lg border flex items-center justify-center">
                  <BarChart2 className="h-12 w-12 text-gray-300" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 主内容标签页 */}
        <Tabs defaultValue="syncTasks" className="w-full">
          <TabsList>
            <TabsTrigger value="syncTasks">同步任务</TabsTrigger>
            <TabsTrigger value="syncHistory">同步历史</TabsTrigger>
            <TabsTrigger value="syncDestinations">同步目标</TabsTrigger>
            <TabsTrigger value="syncAnalytics">同步分析</TabsTrigger>
          </TabsList>

          {/* 同步任务标签页 */}
          <TabsContent value="syncTasks" className="pt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <RefreshCw className="mr-2 h-5 w-5" />
                    同步任务管理
                  </CardTitle>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="任务类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部类型</SelectItem>
                        <SelectItem value="database">数据库同步</SelectItem>
                        <SelectItem value="files">文件同步</SelectItem>
                        <SelectItem value="marketing">营销数据同步</SelectItem>
                        <SelectItem value="crm">客户数据同步</SelectItem>
                        <SelectItem value="logs">日志同步</SelectItem>
                        <SelectItem value="migration">数据迁移</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="任务状态" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部状态</SelectItem>
                        <SelectItem value="completed">已完成</SelectItem>
                        <SelectItem value="running">运行中</SelectItem>
                        <SelectItem value="failed">失败</SelectItem>
                        <SelectItem value="pending">待处理</SelectItem>
                        <SelectItem value="paused">已暂停</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="频率" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部频率</SelectItem>
                        <SelectItem value="一次性">一次性</SelectItem>
                        <SelectItem value="每30分钟">每30分钟</SelectItem>
                        <SelectItem value="每小时">每小时</SelectItem>
                        <SelectItem value="每2小时">每2小时</SelectItem>
                        <SelectItem value="每4小时">每4小时</SelectItem>
                        <SelectItem value="每日">每日</SelectItem>
                        <SelectItem value="每周">每周</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <CardDescription>管理和配置系统同步任务</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>任务名称</TableHead>
                        <TableHead>类型</TableHead>
                        <TableHead>源</TableHead>
                        <TableHead>目标</TableHead>
                        <TableHead>频率</TableHead>
                        <TableHead>上次运行</TableHead>
                        <TableHead>下次运行</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead>项目数</TableHead>
                        <TableHead>大小</TableHead>
                        <TableHead>持续时间</TableHead>
                        <TableHead>启用状态</TableHead>
                        <TableHead className="text-right">操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {syncTasks.map((task) => (
                        <TableRow key={task.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              {renderTaskTypeIcon(task.type)}
                              {task.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {task.type === 'database' ? '数据库' :
                               task.type === 'files' ? '文件' :
                               task.type === 'marketing' ? '营销' :
                               task.type === 'crm' ? '客户' :
                               task.type === 'logs' ? '日志' :
                               task.type === 'migration' ? '迁移' : '其他'}
                            </Badge>
                          </TableCell>
                          <TableCell>{task.source}</TableCell>
                          <TableCell>{task.destination}</TableCell>
                          <TableCell>{task.frequency}</TableCell>
                          <TableCell>{task.lastRun}</TableCell>
                          <TableCell>{task.nextRun}</TableCell>
                          <TableCell>{renderSyncStatusBadge(task.status)}</TableCell>
                          <TableCell>{task.items}</TableCell>
                          <TableCell>{task.size}</TableCell>
                          <TableCell>{task.duration}</TableCell>
                          <TableCell>
                            <Switch checked={task.isActive} onCheckedChange={() => toggleTaskActive(task.id)} />
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="sm" disabled={!task.isActive}>
                                {task.status === 'running' ? (
                                  <Pause className="h-4 w-4" />
                                ) : (
                                  <Play className="h-4 w-4" />
                                )}
                              </Button>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>编辑同步任务</DialogTitle>
                                    <DialogDescription>
                                      编辑 "{task.name}" 同步任务的配置
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <label htmlFor="taskName" className="text-right text-sm font-medium">
                                        任务名称
                                      </label>
                                      <Input id="taskName" value={task.name} className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <label htmlFor="source" className="text-right text-sm font-medium">
                                        源
                                      </label>
                                      <Input id="source" value={task.source} className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <label htmlFor="destination" className="text-right text-sm font-medium">
                                        目标
                                      </label>
                                      <Input id="destination" value={task.destination} className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <label htmlFor="frequency" className="text-right text-sm font-medium">
                                        频率
                                      </label>
                                      <Select defaultValue={task.frequency}>
                                        <SelectTrigger className="col-span-3">
                                          <SelectValue placeholder="选择频率" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="一次性">一次性</SelectItem>
                                          <SelectItem value="每30分钟">每30分钟</SelectItem>
                                          <SelectItem value="每小时">每小时</SelectItem>
                                          <SelectItem value="每2小时">每2小时</SelectItem>
                                          <SelectItem value="每4小时">每4小时</SelectItem>
                                          <SelectItem value="每日">每日</SelectItem>
                                          <SelectItem value="每周">每周</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <label htmlFor="enabled" className="text-right text-sm font-medium">
                                        启用任务
                                      </label>
                                      <Switch id="enabled" checked={task.isActive} />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button variant="ghost">取消</Button>
                                    <Button>保存更改</Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              <Button variant="ghost" size="sm" className="text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 同步历史标签页 */}
          <TabsContent value="syncHistory" className="pt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    同步历史记录
                  </CardTitle>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="任务名称" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">所有任务</SelectItem>
                        {syncTasks.map(task => (
                          <SelectItem key={task.id} value={task.id.toString()}>{task.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="同步状态" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">所有状态</SelectItem>
                        <SelectItem value="completed">已完成</SelectItem>
                        <SelectItem value="failed">失败</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="30days">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="时间范围" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">今天</SelectItem>
                        <SelectItem value="7days">最近7天</SelectItem>
                        <SelectItem value="30days">最近30天</SelectItem>
                        <SelectItem value="90days">最近90天</SelectItem>
                        <SelectItem value="all">所有时间</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <CardDescription>查看和分析历史同步记录</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>任务名称</TableHead>
                        <TableHead>开始时间</TableHead>
                        <TableHead>结束时间</TableHead>
                        <TableHead>持续时间</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead>总项目</TableHead>
                        <TableHead>成功</TableHead>
                        <TableHead>失败</TableHead>
                        <TableHead>数据大小</TableHead>
                        <TableHead>同步速度</TableHead>
                        <TableHead className="text-right">操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {syncHistory.map((history) => (
                        <TableRow key={history.id}>
                          <TableCell className="font-medium">{history.taskName}</TableCell>
                          <TableCell>{history.startTime}</TableCell>
                          <TableCell>{history.endTime}</TableCell>
                          <TableCell>{history.duration}</TableCell>
                          <TableCell>{renderSyncStatusBadge(history.status)}</TableCell>
                          <TableCell>{history.items}</TableCell>
                          <TableCell className="text-green-600">{history.synced}</TableCell>
                          <TableCell className={history.failed > 0 ? 'text-red-600' : ''}>{history.failed}</TableCell>
                          <TableCell>{history.size}</TableCell>
                          <TableCell>{history.speed}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Info className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 同步目标标签页 */}
          <TabsContent value="syncDestinations" className="pt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <Cloud className="mr-2 h-5 w-5" />
                    同步目标配置
                  </CardTitle>
                  <Button>
                    <Plus className="mr-1 h-4 w-4" />
                    添加同步目标
                  </Button>
                </div>
                <CardDescription>管理和配置同步目标存储</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {syncDestinations.map((destination) => (
                    <Card key={destination.id} className={`border ${destination.connectionStatus ? 'border-green-100 bg-green-50' : 'border-red-100 bg-red-50'}`}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">{destination.name}</CardTitle>
                          <Badge className={`${destination.connectionStatus ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} hover:${destination.connectionStatus ? 'bg-green-100' : 'bg-red-100'}`}>
                            {destination.connectionStatus ? '已连接' : '未连接'}
                          </Badge>
                        </div>
                        <CardDescription>
                          {destination.type === 'cloud' ? (
                            <Cloud className="inline-block h-4 w-4 mr-1" />
                          ) : destination.type === 'local' ? (
                            <Server className="inline-block h-4 w-4 mr-1" />
                          ) : (
                            <Database className="inline-block h-4 w-4 mr-1" />
                          )}
                          {destination.type === 'cloud' ? '云存储' : destination.type === 'local' ? '本地存储' : '数据库'}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-xs text-gray-500 mb-1">连接状态</div>
                            {renderConnectionStatusIcon(destination.connectionStatus)}
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">加密状态</div>
                            {renderEncryptionStatusIcon(destination.encryptionStatus)}
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">端点</div>
                            <div className="text-sm font-medium">{destination.endpoint}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">上次连接</div>
                            <div className="text-sm font-medium">{destination.lastConnected}</div>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">存储空间使用</div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">已用空间</span>
                            <span className="text-sm font-medium">{destination.usedSpace} / {destination.totalSpace}</span>
                          </div>
                          <Progress 
                            value={parseInt(destination.usedSpace) / parseInt(destination.totalSpace.replace(' GB', '')) * 100} 
                            className="h-2" 
                          />
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="secondary" size="sm">
                          <Settings className="mr-1 h-4 w-4" />
                          配置
                        </Button>
                        <Button variant="secondary" size="sm">
                          <RefreshCw className="mr-1 h-4 w-4" />
                          {destination.connectionStatus ? '断开连接' : '连接'}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 同步分析标签页 */}
          <TabsContent value="syncAnalytics" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart2 className="mr-2 h-5 w-5" />
                    同步成功率趋势
                  </CardTitle>
                  <CardDescription>过去30天的同步成功率趋势</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-white rounded-lg border flex items-center justify-center">
                    <BarChart2 className="h-12 w-12 text-gray-300" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="mr-2 h-5 w-5" />
                    同步任务类型分布
                  </CardTitle>
                  <CardDescription>各类同步任务数量分布</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-white rounded-lg border flex items-center justify-center">
                    <PieChart className="h-12 w-12 text-gray-300" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart2 className="mr-2 h-5 w-5" />
                    同步数据量趋势
                  </CardTitle>
                  <CardDescription>过去6个月的同步数据量趋势</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-white rounded-lg border flex items-center justify-center">
                    <BarChart2 className="h-12 w-12 text-gray-300" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart2 className="mr-2 h-5 w-5" />
                    同步速度趋势
                  </CardTitle>
                  <CardDescription>过去30天的同步速度趋势</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-white rounded-lg border flex items-center justify-center">
                    <BarChart2 className="h-12 w-12 text-gray-300" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* 快速操作 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="mr-2 h-5 w-5" />
              同步管理快速操作
            </CardTitle>
            <CardDescription>快速访问常用同步功能</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="border rounded-lg p-4 bg-blue-50 border-blue-100 text-center">
                <Play className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-medium text-sm mb-1">立即同步</h4>
                <Button variant="secondary" size="sm" className="w-full">开始同步</Button>
              </div>
              <div className="border rounded-lg p-4 bg-purple-50 border-purple-100 text-center">
                <Settings className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-medium text-sm mb-1">同步设置</h4>
                <Button variant="secondary" size="sm" className="w-full">配置</Button>
              </div>
              <div className="border rounded-lg p-4 bg-green-50 border-green-100 text-center">
                <Plus className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-medium text-sm mb-1">新建任务</h4>
                <Button variant="secondary" size="sm" className="w-full">创建</Button>
              </div>
              <div className="border rounded-lg p-4 bg-amber-50 border-amber-100 text-center">
                <AlertCircle className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                <h4 className="font-medium text-sm mb-1">同步告警</h4>
                <Button variant="secondary" size="sm" className="w-full">查看</Button>
              </div>
              <div className="border rounded-lg p-4 bg-red-50 border-red-100 text-center">
                <Database className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <h4 className="font-medium text-sm mb-1">数据库同步</h4>
                <Button variant="secondary" size="sm" className="w-full">管理</Button>
              </div>
              <div className="border rounded-lg p-4 bg-indigo-50 border-indigo-100 text-center">
                <Cloud className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                <h4 className="font-medium text-sm mb-1">云同步</h4>
                <Button variant="secondary" size="sm" className="w-full">配置</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}