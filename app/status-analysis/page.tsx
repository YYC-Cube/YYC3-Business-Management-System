// app/status-analysis/page.tsx
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
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Activity,
  Zap,
  Target,
  Calendar,
  RefreshCw,
  Filter,
  Download
} from 'lucide-react';

export default function StatusAnalysisPage() {
  // 状态分析统计数据
  const [analysisStats, setAnalysisStats] = useState([
    {
      title: '总项目数',
      value: '24',
      change: { value: 3, type: 'increase' as const, text: '较上月' },
      icon: <Target className="h-5 w-5" />,
      description: '系统中的项目总数'
    },
    {
      title: '健康项目',
      value: '18',
      change: { value: 2, type: 'increase' as const, text: '较上月' },
      icon: <CheckCircle className="h-5 w-5" />,
      description: '状态健康的项目数'
    },
    {
      title: '警告项目',
      value: '4',
      change: { value: 1, type: 'decrease' as const, text: '较上月' },
      icon: <AlertTriangle className="h-5 w-5" />,
      description: '需要关注的项目数'
    },
    {
      title: '风险项目',
      value: '2',
      change: { value: 0, type: 'stable' as const, text: '较上月' },
      icon: <Activity className="h-5 w-5" />,
      description: '存在风险的项目数'
    }
  ]);

  // 项目状态数据
  const [projectStatus, setProjectStatus] = useState([
    { 
      id: 1, 
      name: 'YYC³ 平台升级', 
      status: 'healthy',
      progress: 75,
      health: 95,
      risks: ['预算超支'],
      lastUpdated: '2023-06-10'
    },
    { 
      id: 2, 
      name: '移动应用开发', 
      status: 'healthy',
      progress: 45,
      health: 88,
      risks: [],
      lastUpdated: '2023-06-09'
    },
    { 
      id: 3, 
      name: '数据分析系统', 
      status: 'warning',
      progress: 100,
      health: 72,
      risks: ['性能问题', '用户反馈'],
      lastUpdated: '2023-06-08'
    },
    { 
      id: 4, 
      name: '安全系统升级', 
      status: 'at-risk',
      progress: 30,
      health: 45,
      risks: ['进度延迟', '资源不足'],
      lastUpdated: '2023-06-07'
    }
  ]);

  // 健康指标数据
  const [healthMetrics, setHealthMetrics] = useState([
    { 
      id: 1, 
      name: '进度健康度', 
      value: 78,
      target: 80,
      status: 'warning',
      description: '项目整体进度略低于目标'
    },
    { 
      id: 2, 
      name: '预算健康度', 
      value: 85,
      target: 90,
      status: 'warning',
      description: '部分项目预算超支'
    },
    { 
      id: 3, 
      name: '资源健康度', 
      value: 92,
      target: 85,
      status: 'healthy',
      description: '资源分配合理'
    },
    { 
      id: 4, 
      name: '质量健康度', 
      value: 88,
      target: 90,
      status: 'warning',
      description: '部分项目质量问题'
    }
  ]);

  // 风险分析数据
  const [riskAnalysis, setRiskAnalysis] = useState([
    { 
      id: 1, 
      category: '进度风险', 
      count: 3,
      severity: 'medium',
      projects: ['安全系统升级', 'API服务优化'],
      description: '项目进度落后于计划'
    },
    { 
      id: 2, 
      category: '预算风险', 
      count: 2,
      severity: 'high',
      projects: ['YYC³ 平台升级'],
      description: '项目预算可能超支'
    },
    { 
      id: 3, 
      category: '资源风险', 
      count: 2,
      severity: 'medium',
      projects: ['安全系统升级'],
      description: '项目资源不足'
    },
    { 
      id: 4, 
      category: '质量风险', 
      count: 1,
      severity: 'low',
      projects: ['数据分析系统'],
      description: '项目存在质量问题'
    }
  ]);

  // 获取状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'at-risk':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 获取严重程度样式
  const getSeverityStyle = (severity: string) => {
    switch (severity) {
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

  // 获取健康状态样式
  const getHealthStatusStyle = (health: number) => {
    if (health >= 90) return 'bg-green-100 text-green-800';
    if (health >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <PageTemplate
      title="状态分析"
      description="项目状态分析和健康度评估界面"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '项目管理', path: '/project' },
        { title: '状态分析', path: '/status-analysis' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            刷新数据
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            导出报告
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* 状态分析统计卡片 */}
        <StatCardGroup>
          {analysisStats.map((stat, index) => (
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

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">项目概览</TabsTrigger>
            <TabsTrigger value="health">健康指标</TabsTrigger>
            <TabsTrigger value="risks">风险分析</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  项目状态概览
                </CardTitle>
                <CardDescription>所有项目的当前状态</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectStatus.map(project => (
                    <div key={project.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{project.name}</div>
                        <Badge className={getStatusStyle(project.status)}>
                          {project.status === 'healthy' ? '健康' :
                           project.status === 'warning' ? '警告' :
                           project.status === 'at-risk' ? '风险' : project.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">进度</div>
                          <div className="flex items-center">
                            <span className="mr-2">{project.progress}%</span>
                            <Progress value={project.progress} className="flex-1 h-2" />
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">健康度</div>
                          <div className="flex items-center">
                            <span className="mr-2">{project.health}%</span>
                            <div className={`w-2 h-2 rounded-full ${
                              project.health >= 90 ? 'bg-green-500' :
                              project.health >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}></div>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">最后更新</div>
                          <div>{project.lastUpdated}</div>
                        </div>
                      </div>
                      
                      {project.risks.length > 0 && (
                        <div>
                          <div className="text-sm text-gray-500 mb-1">风险</div>
                          <div className="flex flex-wrap gap-1">
                            {project.risks.map((risk, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {risk}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="health" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  健康指标分析
                </CardTitle>
                <CardDescription>项目健康度各项指标分析</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {healthMetrics.map(metric => (
                    <div key={metric.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{metric.name}</div>
                        <Badge className={getHealthStatusStyle(metric.value)}>
                          {metric.value >= 90 ? '优秀' :
                           metric.value >= 70 ? '良好' : '需改进'}
                        </Badge>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>当前值</span>
                          <span>目标值</span>
                        </div>
                        <div className="flex items-center">
                          <div className="flex-1">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  metric.value >= 90 ? 'bg-green-500' :
                                  metric.value >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${metric.value}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm">{metric.value}%</span>
                          </div>
                          <div className="mx-4 text-gray-400">→</div>
                          <div className="flex-1">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="h-2 rounded-full bg-blue-500"
                                style={{ width: `${metric.target}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm">{metric.target}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        {metric.description}
                      </div>
                      
                      <div className={`text-sm font-medium ${
                        metric.status === 'healthy' ? 'text-green-600' :
                        metric.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {metric.status === 'healthy' ? '指标正常' :
                         metric.status === 'warning' ? '需要关注' : '需要改进'}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="risks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  风险分析
                </CardTitle>
                <CardDescription>项目风险分类和分析</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riskAnalysis.map(risk => (
                    <div key={risk.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{risk.category}</div>
                        <Badge className={getSeverityStyle(risk.severity)}>
                          {risk.severity === 'high' ? '高风险' :
                           risk.severity === 'medium' ? '中风险' : '低风险'}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">影响项目数</div>
                          <div>{risk.count}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">涉及项目</div>
                          <div>{risk.projects.join(', ')}</div>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        {risk.description}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* 健康度趋势图表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              健康度趋势
            </CardTitle>
            <CardDescription>最近30天项目健康度变化趋势</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end space-x-1">
              {Array.from({ length: 30 }, (_, i) => {
                const height = 70 + Math.random() * 25;
                return (
                  <div 
                    key={i} 
                    className="flex-1 bg-green-500 rounded-t"
                    style={{ height: `${height}%` }}
                  ></div>
                );
              })}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>30天前</span>
              <span>15天前</span>
              <span>今天</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}