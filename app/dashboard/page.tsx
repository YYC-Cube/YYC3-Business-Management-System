// app/dashboard/page.tsx
'use client';

import React from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { StatCard, StatCardGroup } from '@/components/business/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  FileText, 
  BarChart3, 
  Brain, 
  Activity,
  TrendingUp,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import { DataTable } from '@/components/business/data-table';

export default function DashboardPage() {
  // 模拟统计数据
  const stats = [
    {
      title: '总用户数',
      value: '12,361',
      change: { value: 12, type: 'increase' as const, text: '较上月' },
      icon: <Users className="h-5 w-5" />,
      description: '平台注册用户总数'
    },
    {
      title: '内容数量',
      value: '2,456',
      change: { value: 8, type: 'increase' as const, text: '较上月' },
      icon: <FileText className="h-5 w-5" />,
      description: '平台发布内容总数'
    },
    {
      title: '数据分析',
      value: '892',
      change: { value: 15, type: 'increase' as const, text: '较上月' },
      icon: <BarChart3 className="h-5 w-5" />,
      description: '数据分析报告总数'
    },
    {
      title: 'AI任务',
      value: '124',
      change: { value: 3, type: 'increase' as const, text: '较上月' },
      icon: <Brain className="h-5 w-5" />,
      description: 'AI处理任务总数'
    }
  ];

  // 模拟待办任务数据
  const tasks = [
    { id: 1, title: '审核新用户注册申请', status: 'pending', priority: 'high', dueDate: '2023-06-15' },
    { id: 2, title: '更新系统安全策略', status: 'in-progress', priority: 'medium', dueDate: '2023-06-20' },
    { id: 3, title: '优化数据库查询性能', status: 'completed', priority: 'high', dueDate: '2023-06-10' },
    { id: 4, title: '准备月度运营报告', status: 'pending', priority: 'low', dueDate: '2023-06-30' }
  ];

  // 任务表格列
  const taskColumns = [
    { key: 'title', title: '任务标题' },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'pending': { label: '待处理', color: 'bg-yellow-100 text-yellow-800' },
          'in-progress': { label: '进行中', color: 'bg-blue-100 text-blue-800' },
          'completed': { label: '已完成', color: 'bg-green-100 text-green-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['pending'];
        return <span className={`px-2 py-1 rounded-full text-xs ${status.color}`}>{status.label}</span>;
      }
    },
    { 
      key: 'priority', 
      title: '优先级',
      render: (value: string) => {
        const priorityMap = {
          'high': { label: '高', color: 'text-red-500' },
          'medium': { label: '中', color: 'text-yellow-500' },
          'low': { label: '低', color: 'text-green-500' }
        };
        const priority = priorityMap[value as keyof typeof priorityMap] || priorityMap['medium'];
        return <span className={`font-medium ${priority.color}`}>{priority.label}</span>;
      }
    },
    { key: 'dueDate', title: '截止日期' }
  ];

  // 模拟系统状态数据
  const systemStatus = [
    { name: 'CPU使用率', value: 45, status: 'normal' },
    { name: '内存使用率', value: 62, status: 'normal' },
    { name: '磁盘使用率', value: 78, status: 'warning' },
    { name: '网络延迟', value: 32, status: 'normal' }
  ];

  return (
    <PageTemplate
      title="数据中心"
      description="系统概览页面，包含核心数据看板、关键指标统计图表、待办任务列表和系统状态卡片"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' }
      ]}
      actions={
        <Button>
          <TrendingUp className="mr-2 h-4 w-4" />
          生成报告
        </Button>
      }
    >
      <div className="space-y-8">
        {/* 统计卡片 */}
        <StatCardGroup>
          {stats.map((stat, index) => (
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
          {/* 待办任务 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                待办任务
              </CardTitle>
              <CardDescription>需要处理的任务列表</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={tasks}
                columns={taskColumns}
                pagination={false}
                actions={(row) => (
                  <>
                    <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                      查看详情
                    </button>
                    <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                      标记完成
                    </button>
                  </>
                )}
              />
            </CardContent>
          </Card>

          {/* 系统状态 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5" />
                系统状态
              </CardTitle>
              <CardDescription>当前系统运行状态</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemStatus.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-sm">{item.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          item.status === 'normal' ? 'bg-green-500' : 
                          item.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 最近活动 */}
        <Card>
          <CardHeader>
            <CardTitle>最近活动</CardTitle>
            <CardDescription>平台最新活动记录</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 1, user: '张三', action: '创建了新文章', time: '2分钟前', icon: <FileText className="h-5 w-5 text-blue-500" /> },
                { id: 2, user: '李四', action: '完成了数据分析任务', time: '15分钟前', icon: <BarChart3 className="h-5 w-5 text-green-500" /> },
                { id: 3, user: '王五', action: '更新了用户权限', time: '1小时前', icon: <Users className="h-5 w-5 text-purple-500" /> },
                { id: 4, user: '赵六', action: '上传了新文件', time: '2小时前', icon: <Brain className="h-5 w-5 text-amber-500" /> }
              ].map((activity) => (
                <div key={activity.id} className="flex items-center">
                  <div className="mr-3 p-2 rounded-full bg-gray-100">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.user} {activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}
