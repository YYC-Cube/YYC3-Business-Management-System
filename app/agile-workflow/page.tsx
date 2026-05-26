// app/agile-workflow/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { StatCard, StatCardGroup } from '@/components/business/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  GitBranch, 
  Users, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  Plus,
  Filter,
  Search,
  MoreHorizontal,
  BarChart3,
  Target,
  Zap,
  Calendar,
  MessageSquare
} from 'lucide-react';

export default function AgileWorkflowPage() {
  // 敏捷统计数据
  const [agileStats, setAgileStats] = useState([
    {
      title: '活跃冲刺',
      value: '6',
      change: { value: 1, type: 'increase' as const, text: '较上周' },
      icon: <Zap className="h-5 w-5" />,
      description: '当前活跃的冲刺数'
    },
    {
      title: '团队速度',
      value: '42',
      change: { value: 3, type: 'increase' as const, text: '较上周' },
      icon: <Target className="h-5 w-5" />,
      description: '团队平均故事点/冲刺'
    },
    {
      title: '完成故事',
      value: '128',
      change: { value: 12, type: 'increase' as const, text: '较上周' },
      icon: <CheckCircle className="h-5 w-5" />,
      description: '本周完成的故事数'
    },
    {
      title: '冲刺延期率',
      value: '8.3%',
      change: { value: 2, type: 'decrease' as const, text: '较上周' },
      icon: <AlertTriangle className="h-5 w-5" />,
      description: '延期冲刺比例'
    }
  ]);

  // 冲刺列表数据
  const [sprints, setSprints] = useState([
    { 
      id: 1, 
      name: 'Sprint 12 - 用户管理优化', 
      status: 'active',
      startDate: '2023-05-29',
      endDate: '2023-06-12',
      goal: '优化用户管理模块的性能和体验',
      velocity: 45,
      completed: 32,
      team: '产品团队'
    },
    { 
      id: 2, 
      name: 'Sprint 11 - API性能提升', 
      status: 'completed',
      startDate: '2023-05-15',
      endDate: '2023-05-29',
      goal: '提升API响应速度和稳定性',
      velocity: 38,
      completed: 38,
      team: '技术团队'
    },
    { 
      id: 3, 
      name: 'Sprint 10 - 移动端开发', 
      status: 'completed',
      startDate: '2023-05-01',
      endDate: '2023-05-15',
      goal: '完成移动端核心功能开发',
      velocity: 42,
      completed: 40,
      team: '移动团队'
    },
    { 
      id: 4, 
      name: 'Sprint 13 - 数据分析功能', 
      status: 'planned',
      startDate: '2023-06-12',
      endDate: '2023-06-26',
      goal: '开发数据分析和可视化功能',
      velocity: 40,
      completed: 0,
      team: '数据团队'
    }
  ]);

  // 用户故事数据
  const [userStories, setUserStories] = useState([
    { 
      id: 1, 
      sprintId: 1,
      title: '用户密码重置功能优化', 
      status: 'in-progress',
      priority: 'high',
      points: 5,
      assignee: '张三',
      dueDate: '2023-06-10',
      description: '作为用户，我希望能够更方便地重置密码，以便在忘记密码时快速恢复访问。'
    },
    { 
      id: 2, 
      sprintId: 1,
      title: '用户个人资料编辑功能', 
      status: 'todo',
      priority: 'medium',
      points: 3,
      assignee: '李四',
      dueDate: '2023-06-12',
      description: '作为用户，我希望能够编辑我的个人资料，包括头像、姓名和联系方式。'
    },
    { 
      id: 3, 
      sprintId: 2,
      title: 'API响应时间优化', 
      status: 'completed',
      priority: 'high',
      points: 8,
      assignee: '王五',
      dueDate: '2023-05-25',
      description: '作为系统管理员，我希望API响应时间能够优化到200ms以内，以提升用户体验。'
    },
    { 
      id: 4, 
      sprintId: 3,
      title: '移动端登录功能', 
      status: 'completed',
      priority: 'high',
      points: 5,
      assignee: '赵六',
      dueDate: '2023-05-10',
      description: '作为移动端用户，我希望能够通过手机号和验证码快速登录系统。'
    }
  ]);

  // 看板数据
  const [kanbanData, setKanbanData] = useState({
    todo: [
      { id: 5, title: '用户权限管理功能', points: 5, assignee: '张三' },
      { id: 6, title: '数据导出功能', points: 3, assignee: '李四' }
    ],
    inProgress: [
      { id: 1, title: '用户密码重置功能优化', points: 5, assignee: '张三' },
      { id: 7, title: '系统性能监控', points: 8, assignee: '王五' }
    ],
    testing: [
      { id: 3, title: 'API响应时间优化', points: 8, assignee: '王五' }
    ],
    done: [
      { id: 4, title: '移动端登录功能', points: 5, assignee: '赵六' },
      { id: 8, title: '用户注册流程优化', points: 3, assignee: '李四' }
    ]
  });

  // 获取状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'planned':
        return 'bg-purple-100 text-purple-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'todo':
        return 'bg-gray-100 text-gray-800';
      case 'testing':
        return 'bg-orange-100 text-orange-800';
      case 'done':
        return 'bg-green-100 text-green-800';
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
      title="敏捷工作流"
      description="敏捷开发工作流管理界面，包含冲刺规划和看板管理"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '项目管理', path: '/project' },
        { title: '敏捷工作流', path: '/agile-workflow' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新建冲刺
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            筛选
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* 敏捷统计卡片 */}
        <StatCardGroup>
          {agileStats.map((stat, index) => (
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

        <Tabs defaultValue="sprints" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sprints">冲刺管理</TabsTrigger>
            <TabsTrigger value="stories">用户故事</TabsTrigger>
            <TabsTrigger value="kanban">看板</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sprints" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GitBranch className="mr-2 h-5 w-5" />
                  冲刺管理
                </CardTitle>
                <CardDescription>敏捷开发冲刺列表和规划</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sprints.map(sprint => (
                    <div key={sprint.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{sprint.name}</div>
                        <Badge className={getStatusStyle(sprint.status)}>
                          {sprint.status === 'active' ? '进行中' :
                           sprint.status === 'completed' ? '已完成' :
                           sprint.status === 'planned' ? '计划中' : sprint.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">开始日期</div>
                          <div>{sprint.startDate}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">结束日期</div>
                          <div>{sprint.endDate}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">团队</div>
                          <div>{sprint.team}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">速度</div>
                          <div>{sprint.velocity} 点</div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-sm text-gray-500 mb-1">冲刺目标</div>
                        <div>{sprint.goal}</div>
                      </div>
                      
                      <div className="mb-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>完成进度</span>
                          <span>{Math.round((sprint.completed / sprint.velocity) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-blue-500"
                            style={{ width: `${(sprint.completed / sprint.velocity) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>{sprint.completed} / {sprint.velocity} 点</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="stories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  用户故事
                </CardTitle>
                <CardDescription>敏捷开发用户故事列表</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userStories.map(story => (
                    <div key={story.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{story.title}</div>
                        <div className="flex gap-2">
                          <Badge className={getStatusStyle(story.status)}>
                            {story.status === 'in-progress' ? '进行中' :
                             story.status === 'todo' ? '待办' :
                             story.status === 'completed' ? '已完成' : story.status}
                          </Badge>
                          <Badge className={getPriorityStyle(story.priority)}>
                            {story.priority === 'high' ? '高优先级' :
                             story.priority === 'medium' ? '中优先级' : '低优先级'}
                          </Badge>
                          <Badge variant="outline">
                            {story.points} 点
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">负责人</div>
                          <div>{story.assignee}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">截止日期</div>
                          <div>{story.dueDate}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">冲刺ID</div>
                          <div>Sprint {story.sprintId}</div>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        {story.description}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="kanban" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  看板
                </CardTitle>
                <CardDescription>敏捷开发看板管理</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <div className="bg-gray-100 p-3 rounded-t-lg">
                      <div className="font-medium">待办</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-b-lg min-h-[400px]">
                      {kanbanData.todo.map(item => (
                        <div key={item.id} className="mb-3 p-3 bg-white border rounded-lg shadow-sm">
                          <div className="font-medium mb-1">{item.title}</div>
                          <div className="flex justify-between text-sm">
                            <span>{item.points} 点</span>
                            <span>{item.assignee}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-yellow-100 p-3 rounded-t-lg">
                      <div className="font-medium">进行中</div>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-b-lg min-h-[400px]">
                      {kanbanData.inProgress.map(item => (
                        <div key={item.id} className="mb-3 p-3 bg-white border rounded-lg shadow-sm">
                          <div className="font-medium mb-1">{item.title}</div>
                          <div className="flex justify-between text-sm">
                            <span>{item.points} 点</span>
                            <span>{item.assignee}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-orange-100 p-3 rounded-t-lg">
                      <div className="font-medium">测试中</div>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-b-lg min-h-[400px]">
                      {kanbanData.testing.map(item => (
                        <div key={item.id} className="mb-3 p-3 bg-white border rounded-lg shadow-sm">
                          <div className="font-medium mb-1">{item.title}</div>
                          <div className="flex justify-between text-sm">
                            <span>{item.points} 点</span>
                            <span>{item.assignee}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-green-100 p-3 rounded-t-lg">
                      <div className="font-medium">已完成</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-b-lg min-h-[400px]">
                      {kanbanData.done.map(item => (
                        <div key={item.id} className="mb-3 p-3 bg-white border rounded-lg shadow-sm">
                          <div className="font-medium mb-1">{item.title}</div>
                          <div className="flex justify-between text-sm">
                            <span>{item.points} 点</span>
                            <span>{item.assignee}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* 冲刺燃尽图 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              冲刺燃尽图
            </CardTitle>
            <CardDescription>当前冲刺的燃尽图和进度跟踪</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end space-x-1">
              {Array.from({ length: 14 }, (_, i) => {
                const height = 100 - (i * 7);
                return (
                  <div 
                    key={i} 
                    className="flex-1 bg-blue-500 rounded-t"
                    style={{ height: `${height}%` }}
                  ></div>
                );
              })}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>冲刺开始</span>
              <span>冲刺中</span>
              <span>冲刺结束</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}