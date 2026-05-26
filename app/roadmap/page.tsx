// app/roadmap/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatCard, StatCardGroup } from '@/components/business/stat-card';
import { 
  Map, 
  Calendar, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  Plus,
  Filter,
  BarChart3,
  Target,
  Zap,
  Users,
  Star
} from 'lucide-react';

export default function RoadmapPage() {
  // 路线图统计数据
  const [roadmapStats, setRoadmapStats] = useState([
    {
      title: '总功能数',
      value: '48',
      change: { value: 6, type: 'increase' as const, text: '较上季度' },
      icon: <Target className="h-5 w-5" />,
      description: '路线图中的功能总数'
    },
    {
      title: '已完成功能',
      value: '32',
      change: { value: 8, type: 'increase' as const, text: '较上季度' },
      icon: <CheckCircle className="h-5 w-5" />,
      description: '已实现的功能数'
    },
    {
      title: '进行中功能',
      value: '10',
      change: { value: 2, type: 'increase' as const, text: '较上季度' },
      icon: <Zap className="h-5 w-5" />,
      description: '正在开发的功能数'
    },
    {
      title: '计划功能',
      value: '6',
      change: { value: 4, type: 'decrease' as const, text: '较上季度' },
      icon: <Clock className="h-5 w-5" />,
      description: '计划中的功能数'
    }
  ]);

  // 路线图数据
  const [roadmapData, setRoadmapData] = useState([
    {
      id: 1,
      quarter: '2023 Q2',
      status: 'active',
      progress: 75,
      features: [
        { id: 1, name: '用户管理优化', status: 'completed', priority: 'high', votes: 45 },
        { id: 2, name: 'API性能提升', status: 'completed', priority: 'high', votes: 38 },
        { id: 3, name: '移动端开发', status: 'in-progress', priority: 'high', votes: 52 },
        { id: 4, name: '数据分析功能', status: 'in-progress', priority: 'medium', votes: 28 }
      ]
    },
    {
      id: 2,
      quarter: '2023 Q3',
      status: 'upcoming',
      progress: 0,
      features: [
        { id: 5, name: 'AI助手集成', status: 'planned', priority: 'high', votes: 65 },
        { id: 6, name: '实时协作功能', status: 'planned', priority: 'medium', votes: 32 },
        { id: 7, name: '高级报表功能', status: 'planned', priority: 'medium', votes: 24 },
        { id: 8, name: '多语言支持', status: 'planned', priority: 'low', votes: 18 }
      ]
    },
    {
      id: 3,
      quarter: '2023 Q4',
      status: 'upcoming',
      progress: 0,
      features: [
        { id: 9, name: '企业级安全功能', status: 'planned', priority: 'high', votes: 42 },
        { id: 10, name: '工作流自动化', status: 'planned', priority: 'medium', votes: 35 },
        { id: 11, name: '第三方集成', status: 'planned', priority: 'medium', votes: 28 },
        { id: 12, name: '自定义主题', status: 'planned', priority: 'low', votes: 15 }
      ]
    }
  ]);

  // 功能请求数据
  const [featureRequests, setFeatureRequests] = useState([
    { 
      id: 1, 
      title: '暗色主题支持', 
      description: '希望系统支持暗色主题，减少眼部疲劳',
      status: 'approved',
      priority: 'medium',
      votes: 125,
      requestedBy: '张三',
      requestedDate: '2023-05-15'
    },
    { 
      id: 2, 
      title: '批量操作功能', 
      description: '需要能够批量处理数据和文件',
      status: 'planned',
      priority: 'high',
      votes: 89,
      requestedBy: '李四',
      requestedDate: '2023-05-20'
    },
    { 
      id: 3, 
      title: '导出PDF报告', 
      description: '希望能够将分析报告导出为PDF格式',
      status: 'approved',
      priority: 'medium',
      votes: 76,
      requestedBy: '王五',
      requestedDate: '2023-05-10'
    },
    { 
      id: 4, 
      title: '移动端离线模式', 
      description: '移动端需要支持离线访问功能',
      status: 'under-review',
      priority: 'high',
      votes: 64,
      requestedBy: '赵六',
      requestedDate: '2023-05-25'
    }
  ]);

  // 获取状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'planned':
        return 'bg-purple-100 text-purple-800';
      case 'upcoming':
        return 'bg-gray-100 text-gray-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'under-review':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 获取优先级样式
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageTemplate
      title="产品路线图"
      description="产品功能规划和路线图管理界面"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '项目管理', path: '/project' },
        { title: '产品路线图', path: '/roadmap' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            添加功能
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            筛选
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* 路线图统计卡片 */}
        <StatCardGroup>
          {roadmapStats.map((stat, index) => (
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

        <Tabs defaultValue="roadmap" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="roadmap">路线图</TabsTrigger>
            <TabsTrigger value="requests">功能请求</TabsTrigger>
          </TabsList>
          
          <TabsContent value="roadmap" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Map className="mr-2 h-5 w-5" />
                  产品路线图
                </CardTitle>
                <CardDescription>产品功能规划和时间线</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {roadmapData.map(quarter => (
                    <div key={quarter.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-lg font-semibold">{quarter.quarter}</div>
                        <Badge className={getStatusStyle(quarter.status)}>
                          {quarter.status === 'active' ? '进行中' :
                           quarter.status === 'upcoming' ? '计划中' : quarter.status}
                        </Badge>
                      </div>
                      
                      {quarter.progress > 0 && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>季度进度</span>
                            <span>{quarter.progress}%</span>
                          </div>
                          <Progress value={quarter.progress} className="h-2" />
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {quarter.features.map(feature => (
                          <div key={feature.id} className="border rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-medium">{feature.name}</div>
                              <div className="flex gap-1">
                                <Badge className={getStatusStyle(feature.status)}>
                                  {feature.status === 'completed' ? '已完成' :
                                   feature.status === 'in-progress' ? '进行中' :
                                   feature.status === 'planned' ? '计划中' : feature.status}
                                </Badge>
                                <Badge className={getPriorityStyle(feature.priority)}>
                                  {feature.priority === 'high' ? '高优先级' :
                                   feature.priority === 'medium' ? '中优先级' : '低优先级'}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center">
                                <Star className="mr-1 h-4 w-4 text-yellow-400" />
                                <span>{feature.votes}</span>
                              </div>
                              <Button variant="ghost" size="sm">
                                投票
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  功能请求
                </CardTitle>
                <CardDescription>用户提交的功能请求和建议</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {featureRequests.map(request => (
                    <div key={request.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{request.title}</div>
                        <div className="flex gap-2">
                          <Badge className={getStatusStyle(request.status)}>
                            {request.status === 'approved' ? '已批准' :
                             request.status === 'planned' ? '已计划' :
                             request.status === 'under-review' ? '审核中' : request.status}
                          </Badge>
                          <Badge className={getPriorityStyle(request.priority)}>
                            {request.priority === 'high' ? '高优先级' :
                             request.priority === 'medium' ? '中优先级' : '低优先级'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-3">
                        {request.description}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">请求者</div>
                          <div>{request.requestedBy}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">请求日期</div>
                          <div>{request.requestedDate}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">投票数</div>
                          <div className="flex items-center">
                            <Star className="mr-1 h-4 w-4 text-yellow-400" />
                            <span>{request.votes}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            详情
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Star className="mr-1 h-4 w-4" />
                            投票
                          </Button>
                        </div>
                        <Button variant="outline" size="sm">
                          评论
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* 功能分布图表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              功能分布分析
            </CardTitle>
            <CardDescription>各季度功能分布和完成情况</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {roadmapData.map(quarter => (
                <div key={quarter.id} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{quarter.quarter}</span>
                    <span>{quarter.progress}% 完成</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${quarter.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {quarter.features.filter(f => f.status === 'completed').length} 已完成, 
                    {quarter.features.filter(f => f.status === 'in-progress').length} 进行中, 
                    {quarter.features.filter(f => f.status === 'planned').length} 计划中
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}