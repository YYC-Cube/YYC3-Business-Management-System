// app/project-execution/page.tsx
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
  Calendar, 
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
  Zap
} from 'lucide-react';

export default function ProjectExecutionPage() {
  // 项目统计数据
  const [projectStats, setProjectStats] = useState([
    {
      title: '总项目数',
      value: '24',
      change: { value: 3, type: 'increase' as const, text: '较上月' },
      icon: <Target className="h-5 w-5" />,
      description: '系统中的项目总数'
    },
    {
      title: '进行中项目',
      value: '12',
      change: { value: 2, type: 'increase' as const, text: '较上月' },
      icon: <Zap className="h-5 w-5" />,
      description: '正在执行的项目数'
    },
    {
      title: '已完成项目',
      value: '8',
      change: { value: 1, type: 'increase' as const, text: '较上月' },
      icon: <CheckCircle className="h-5 w-5" />,
      description: '已完成的项目数'
    },
    {
      title: '项目延期率',
      value: '12.5%',
      change: { value: 2, type: 'decrease' as const, text: '较上月' },
      icon: <AlertTriangle className="h-5 w-5" />,
      description: '延期项目比例'
    }
  ]);

  // 项目列表数据
  const [projects, setProjects] = useState([
    { 
      id: 1, 
      name: 'YYC³ 平台升级', 
      status: 'active',
      progress: 75,
      startDate: '2023-03-01',
      endDate: '2023-07-15',
      manager: '张三',
      team: 8,
      budget: 850000,
      spent: 620000
    },
    { 
      id: 2, 
      name: '移动应用开发', 
      status: 'active',
      progress: 45,
      startDate: '2023-04-10',
      endDate: '2023-08-30',
      manager: '李四',
      team: 5,
      budget: 450000,
      spent: 180000
    },
    { 
      id: 3, 
      name: '数据分析系统', 
      status: 'completed',
      progress: 100,
      startDate: '2023-01-15',
      endDate: '2023-05-20',
      manager: '王五',
      team: 6,
      budget: 620000,
      spent: 590000
    },
    { 
      id: 4, 
      name: '安全系统升级', 
      status: 'delayed',
      progress: 30,
      startDate: '2023-02-20',
      endDate: '2023-06-10',
      manager: '赵六',
      team: 4,
      budget: 380000,
      spent: 150000
    }
  ]);

  // 项目任务数据
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      projectId: 1,
      title: '前端界面重构', 
      status: 'in-progress',
      priority: 'high',
      assignee: '张三',
      dueDate: '2023-06-20',
      progress: 65
    },
    { 
      id: 2, 
      projectId: 1,
      title: 'API接口优化', 
      status: 'todo',
      priority: 'medium',
      assignee: '李四',
      dueDate: '2023-06-25',
      progress: 0
    },
    { 
      id: 3, 
      projectId: 2,
      title: '用户认证模块', 
      status: 'in-progress',
      priority: 'high',
      assignee: '王五',
      dueDate: '2023-06-15',
      progress: 80
    },
    { 
      id: 4, 
      projectId: 3,
      title: '数据迁移', 
      status: 'completed',
      priority: 'high',
      assignee: '赵六',
      dueDate: '2023-05-10',
      progress: 100
    }
  ]);

  // 项目里程碑数据
  const [milestones, setMilestones] = useState([
    { 
      id: 1, 
      projectId: 1,
      title: '需求分析完成', 
      status: 'completed',
      date: '2023-03-20',
      description: '完成所有需求分析和文档'
    },
    { 
      id: 2, 
      projectId: 1,
      title: '原型设计完成', 
      status: 'completed',
      date: '2023-04-15',
      description: '完成系统原型设计和评审'
    },
    { 
      id: 3, 
      projectId: 1,
      title: '开发阶段完成', 
      status: 'in-progress',
      date: '2023-06-30',
      description: '完成所有功能模块开发'
    },
    { 
      id: 4, 
      projectId: 1,
      title: '系统上线', 
      status: 'upcoming',
      date: '2023-07-15',
      description: '系统正式上线运行'
    }
  ]);

  // 获取状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'delayed':
        return 'bg-red-100 text-red-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'todo':
        return 'bg-gray-100 text-gray-800';
      case 'upcoming':
        return 'bg-purple-100 text-purple-800';
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
      title="项目执行"
      description="项目执行和管理界面，包含项目进度跟踪和任务分配"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '项目管理', path: '/project' },
        { title: '项目执行', path: '/project-execution' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新建项目
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            筛选
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* 项目统计卡片 */}
        <StatCardGroup>
          {projectStats.map((stat, index) => (
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

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="projects">项目列表</TabsTrigger>
            <TabsTrigger value="tasks">任务管理</TabsTrigger>
            <TabsTrigger value="milestones">里程碑</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  项目列表
                </CardTitle>
                <CardDescription>系统中的所有项目</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.map(project => (
                    <div key={project.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{project.name}</div>
                        <Badge className={getStatusStyle(project.status)}>
                          {project.status === 'active' ? '进行中' :
                           project.status === 'completed' ? '已完成' :
                           project.status === 'delayed' ? '延期' : project.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">项目经理</div>
                          <div>{project.manager}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">团队规模</div>
                          <div>{project.team}人</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">开始日期</div>
                          <div>{project.startDate}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">结束日期</div>
                          <div>{project.endDate}</div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>项目进度</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">预算</div>
                          <div>¥{project.budget.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">已花费</div>
                          <div>¥{project.spent.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tasks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  任务管理
                </CardTitle>
                <CardDescription>项目任务列表和分配</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.map(task => (
                    <div key={task.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{task.title}</div>
                        <div className="flex gap-2">
                          <Badge className={getStatusStyle(task.status)}>
                            {task.status === 'in-progress' ? '进行中' :
                             task.status === 'todo' ? '待办' :
                             task.status === 'completed' ? '已完成' : task.status}
                          </Badge>
                          <Badge className={getPriorityStyle(task.priority)}>
                            {task.priority === 'high' ? '高优先级' :
                             task.priority === 'medium' ? '中优先级' : '低优先级'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">负责人</div>
                          <div>{task.assignee}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">截止日期</div>
                          <div>{task.dueDate}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">项目ID</div>
                          <div>#{task.projectId}</div>
                        </div>
                      </div>
                      
                      {task.status !== 'todo' && (
                        <div className="mb-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span>任务进度</span>
                            <span>{task.progress}%</span>
                          </div>
                          <Progress value={task.progress} className="h-2" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="milestones" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  项目里程碑
                </CardTitle>
                <CardDescription>项目关键里程碑和节点</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {milestones.map(milestone => (
                    <div key={milestone.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{milestone.title}</div>
                        <Badge className={getStatusStyle(milestone.status)}>
                          {milestone.status === 'completed' ? '已完成' :
                           milestone.status === 'in-progress' ? '进行中' :
                           milestone.status === 'upcoming' ? '即将开始' : milestone.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                        <div>
                          <div className="text-sm text-gray-500">日期</div>
                          <div>{milestone.date}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">项目ID</div>
                          <div>#{milestone.projectId}</div>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        {milestone.description}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* 项目进度图表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              项目进度分析
            </CardTitle>
            <CardDescription>各项目进度和状态分析</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {projects.map(project => (
                <div key={project.id} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{project.name}</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>预算: ¥{project.budget.toLocaleString()}</span>
                    <span>已花费: ¥{project.spent.toLocaleString()}</span>
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