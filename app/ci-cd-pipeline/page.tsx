// app/ci-cd-pipeline/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { StatCard, StatCardGroup } from '@/components/business/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  GitBranch, 
  Zap, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  Plus,
  Play,
  Pause,
  RefreshCw,
  BarChart3,
  Settings,
  Calendar,
  Server,
  Code
} from 'lucide-react';

export default function CICDPipelinePage() {
  // CI/CD统计数据
  const [cicdStats, setCicdStats] = useState([
    {
      title: '流水线总数',
      value: '18',
      change: { value: 2, type: 'increase' as const, text: '较上月' },
      icon: <GitBranch className="h-5 w-5" />,
      description: '系统中的CI/CD流水线总数'
    },
    {
      title: '今日构建',
      value: '42',
      change: { value: 8, type: 'increase' as const, text: '较昨日' },
      icon: <Zap className="h-5 w-5" />,
      description: '今日构建次数'
    },
    {
      title: '平均构建时间',
      value: '8.5分钟',
      change: { value: 1.2, type: 'decrease' as const, text: '较上周' },
      icon: <Clock className="h-5 w-5" />,
      description: '平均构建时间'
    },
    {
      title: '构建成功率',
      value: '96.8%',
      change: { value: 1.5, type: 'increase' as const, text: '较上周' },
      icon: <CheckCircle className="h-5 w-5" />,
      description: '构建成功率'
    }
  ]);

  // 流水线列表数据
  const [pipelines, setPipelines] = useState([
    { 
      id: 1, 
      name: '主应用构建流水线', 
      status: 'running',
      lastRun: '2023-06-10 10:30',
      duration: '8分25秒',
      successRate: 98.5,
      trigger: '代码提交',
      environment: 'production'
    },
    { 
      id: 2, 
      name: '测试环境部署流水线', 
      status: 'success',
      lastRun: '2023-06-10 09:45',
      duration: '5分12秒',
      successRate: 96.2,
      trigger: '手动触发',
      environment: 'testing'
    },
    { 
      id: 3, 
      name: '移动应用构建流水线', 
      status: 'failed',
      lastRun: '2023-06-09 16:20',
      duration: '12分45秒',
      successRate: 92.8,
      trigger: '定时触发',
      environment: 'staging'
    },
    { 
      id: 4, 
      name: 'API服务构建流水线', 
      status: 'idle',
      lastRun: '2023-06-08 14:15',
      duration: '6分30秒',
      successRate: 97.5,
      trigger: '代码提交',
      environment: 'production'
    }
  ]);

  // 构建历史数据
  const [buildHistory, setBuildHistory] = useState([
    { 
      id: 1, 
      pipelineId: 1,
      pipelineName: '主应用构建流水线',
      status: 'running',
      number: '#1245',
      commit: 'a1b2c3d',
      branch: 'main',
      startTime: '2023-06-10 10:30',
      duration: '8分25秒',
      progress: 65
    },
    { 
      id: 2, 
      pipelineId: 2,
      pipelineName: '测试环境部署流水线',
      status: 'success',
      number: '#856',
      commit: 'e4f5g6h',
      branch: 'develop',
      startTime: '2023-06-10 09:45',
      duration: '5分12秒',
      progress: 100
    },
    { 
      id: 3, 
      pipelineId: 3,
      pipelineName: '移动应用构建流水线',
      status: 'failed',
      number: '#432',
      commit: 'i7j8k9l',
      branch: 'feature/mobile',
      startTime: '2023-06-09 16:20',
      duration: '12分45秒',
      progress: 100
    },
    { 
      id: 4, 
      pipelineId: 4,
      pipelineName: 'API服务构建流水线',
      status: 'success',
      number: '#321',
      commit: 'm0n1o2p',
      branch: 'main',
      startTime: '2023-06-08 14:15',
      duration: '6分30秒',
      progress: 100
    }
  ]);

  // 部署环境数据
  const [environments, setEnvironments] = useState([
    { 
      id: 1, 
      name: '生产环境', 
      status: 'active',
      lastDeployed: '2023-06-10 10:30',
      version: 'v2.1.0',
      url: 'https://app.yanyucloud.com',
      health: 'healthy'
    },
    { 
      id: 2, 
      name: '测试环境', 
      status: 'active',
      lastDeployed: '2023-06-10 09:45',
      version: 'v2.1.0-rc1',
      url: 'https://test.yanyucloud.com',
      health: 'healthy'
    },
    { 
      id: 3, 
      name: '预发布环境', 
      status: 'active',
      lastDeployed: '2023-06-08 16:20',
      version: 'v2.0.5',
      url: 'https://staging.yanyucloud.com',
      health: 'warning'
    },
    { 
      id: 4, 
      name: '开发环境', 
      status: 'active',
      lastDeployed: '2023-06-07 14:15',
      version: 'v2.0.5-dev',
      url: 'https://dev.yanyucloud.com',
      health: 'healthy'
    }
  ]);

  // 获取状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-blue-100 text-blue-800';
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'idle':
        return 'bg-gray-100 text-gray-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 获取健康状态样式
  const getHealthStyle = (health: string) => {
    switch (health) {
      case 'healthy':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'unhealthy':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageTemplate
      title="CI/CD流水线"
      description="持续集成和持续部署流水线管理界面"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '项目管理', path: '/project' },
        { title: 'CI/CD流水线', path: '/ci-cd-pipeline' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新建流水线
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            配置
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* CI/CD统计卡片 */}
        <StatCardGroup>
          {cicdStats.map((stat, index) => (
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

        <Tabs defaultValue="pipelines" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pipelines">流水线</TabsTrigger>
            <TabsTrigger value="builds">构建历史</TabsTrigger>
            <TabsTrigger value="environments">部署环境</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pipelines" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GitBranch className="mr-2 h-5 w-5" />
                  流水线列表
                </CardTitle>
                <CardDescription>系统中的CI/CD流水线</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pipelines.map(pipeline => (
                    <div key={pipeline.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{pipeline.name}</div>
                        <Badge className={getStatusStyle(pipeline.status)}>
                          {pipeline.status === 'running' ? '运行中' :
                           pipeline.status === 'success' ? '成功' :
                           pipeline.status === 'failed' ? '失败' : '空闲'}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">最后运行</div>
                          <div>{pipeline.lastRun}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">持续时间</div>
                          <div>{pipeline.duration}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">成功率</div>
                          <div>{pipeline.successRate}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">触发方式</div>
                          <div>{pipeline.trigger}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-500">环境</div>
                          <div>{pipeline.environment}</div>
                        </div>
                        <div className="flex gap-2">
                          {pipeline.status === 'running' ? (
                            <Button variant="outline" size="sm">
                              <Pause className="mr-1 h-4 w-4" />
                              暂停
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm">
                              <Play className="mr-1 h-4 w-4" />
                              运行
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <RefreshCw className="mr-1 h-4 w-4" />
                            重新运行
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="builds" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 h-5 w-5" />
                  构建历史
                </CardTitle>
                <CardDescription>最近的构建记录</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {buildHistory.map(build => (
                    <div key={build.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{build.pipelineName} - {build.number}</div>
                        <Badge className={getStatusStyle(build.status)}>
                          {build.status === 'running' ? '运行中' :
                           build.status === 'success' ? '成功' :
                           build.status === 'failed' ? '失败' : build.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">提交</div>
                          <div>{build.commit}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">分支</div>
                          <div>{build.branch}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">开始时间</div>
                          <div>{build.startTime}</div>
                        </div>
                      </div>
                      
                      {build.status === 'running' && (
                        <div className="mb-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span>构建进度</span>
                            <span>{build.progress}%</span>
                          </div>
                          <Progress value={build.progress} className="h-2" />
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-500">持续时间</div>
                          <div>{build.duration}</div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            查看日志
                          </Button>
                          <Button variant="outline" size="sm">
                            下载构建
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="environments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Server className="mr-2 h-5 w-5" />
                  部署环境
                </CardTitle>
                <CardDescription>系统部署环境状态</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {environments.map(env => (
                    <div key={env.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{env.name}</div>
                        <div className="flex gap-2">
                          <Badge className={getStatusStyle(env.status)}>
                            {env.status === 'active' ? '活跃' : env.status}
                          </Badge>
                          <Badge className={getHealthStyle(env.health)}>
                            {env.health === 'healthy' ? '健康' :
                             env.health === 'warning' ? '警告' : '不健康'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">最后部署</div>
                          <div>{env.lastDeployed}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">版本</div>
                          <div>{env.version}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">URL</div>
                          <div>{env.url}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            查看日志
                          </Button>
                          <Button variant="outline" size="sm">
                            访问环境
                          </Button>
                        </div>
                        <Button>
                          部署新版本
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* 构建趋势图表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              构建趋势分析
            </CardTitle>
            <CardDescription>最近7天的构建次数和成功率趋势</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-medium mb-2">构建次数</div>
                <div className="h-48 flex items-end space-x-1">
                  {Array.from({ length: 7 }, (_, i) => {
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
                  <span>7天前</span>
                  <span>3天前</span>
                  <span>今天</span>
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-2">构建成功率</div>
                <div className="h-48 flex items-end space-x-1">
                  {Array.from({ length: 7 }, (_, i) => {
                    const height = 85 + Math.random() * 15;
                    return (
                      <div 
                        key={i} 
                        className="flex-1 bg-green-500 rounded-t"
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