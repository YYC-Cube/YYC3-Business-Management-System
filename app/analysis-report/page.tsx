// app/analysis-report/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatCard, StatCardGroup } from '@/components/business/stat-card';
import { 
  BarChart3, 
  FileText, 
  Download, 
  Calendar,
  Filter,
  RefreshCw,
  TrendingUp,
  Users,
  Zap,
  Target,
  CheckCircle,
  Clock
} from 'lucide-react';

export default function AnalysisReportPage() {
  // 报告统计数据
  const [reportStats, setReportStats] = useState([
    {
      title: '总报告数',
      value: '48',
      change: { value: 6, type: 'increase' as const, text: '较上月' },
      icon: <FileText className="h-5 w-5" />,
      description: '系统中的分析报告总数'
    },
    {
      title: '本月生成',
      value: '12',
      change: { value: 3, type: 'increase' as const, text: '较上月' },
      icon: <Calendar className="h-5 w-5" />,
      description: '本月生成的报告数'
    },
    {
      title: '自动报告',
      value: '32',
      change: { value: 4, type: 'increase' as const, text: '较上月' },
      icon: <Zap className="h-5 w-5" />,
      description: '自动生成的报告数'
    },
    {
      title: '平均生成时间',
      value: '5.2分钟',
      change: { value: 1.8, type: 'decrease' as const, text: '较上月' },
      icon: <Clock className="h-5 w-5" />,
      description: '报告平均生成时间'
    }
  ]);

  // 报告列表数据
  const [reports, setReports] = useState([
    { 
      id: 1, 
      title: '月度运营分析报告', 
      type: '运营',
      category: '定期报告',
      status: 'completed',
      generatedDate: '2023-06-10',
      size: '2.4 MB',
      format: 'PDF',
      auto: true
    },
    { 
      id: 2, 
      title: '用户行为分析报告', 
      type: '用户',
      category: '分析报告',
      status: 'completed',
      generatedDate: '2023-06-08',
      size: '3.8 MB',
      format: 'PDF',
      auto: true
    },
    { 
      id: 3, 
      title: '系统性能分析报告', 
      type: '系统',
      category: '技术报告',
      status: 'processing',
      generatedDate: '2023-06-10',
      size: '1.2 MB',
      format: 'HTML',
      auto: false
    },
    { 
      id: 4, 
      title: '销售数据分析报告', 
      type: '销售',
      category: '业务报告',
      status: 'scheduled',
      generatedDate: '2023-06-12',
      size: '0 MB',
      format: 'Excel',
      auto: true
    }
  ]);

  // 报告类型数据
  const [reportTypes, setReportTypes] = useState([
    { id: 'operation', name: '运营', count: 15 },
    { id: 'user', name: '用户', count: 12 },
    { id: 'system', name: '系统', count: 8 },
    { id: 'sales', name: '销售', count: 10 },
    { id: 'finance', name: '财务', count: 3 }
  ]);

  // 报告模板数据
  const [reportTemplates, setReportTemplates] = useState([
    { 
      id: 1, 
      name: '月度运营报告模板', 
      type: 'operation',
      description: '包含用户活跃度、内容分析等关键指标',
      usage: 125
    },
    { 
      id: 2, 
      name: '用户行为分析模板', 
      type: 'user',
      description: '分析用户行为路径和转化漏斗',
      usage: 89
    },
    { 
      id: 3, 
      name: '系统性能报告模板', 
      type: 'system',
      description: '监控系统性能和资源使用情况',
      usage: 64
    },
    { 
      id: 4, 
      name: '销售数据分析模板', 
      type: 'sales',
      description: '分析销售趋势和客户转化',
      usage: 76
    }
  ]);

  // 获取状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageTemplate
      title="分析报告"
      description="数据分析报告生成和管理界面"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '数据分析', path: '/analytics' },
        { title: '分析报告', path: '/analysis-report' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            生成报告
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            筛选
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* 报告统计卡片 */}
        <StatCardGroup>
          {reportStats.map((stat, index) => (
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

        <Tabs defaultValue="reports" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reports">报告列表</TabsTrigger>
            <TabsTrigger value="templates">报告模板</TabsTrigger>
            <TabsTrigger value="schedule">定时报告</TabsTrigger>
          </TabsList>
          
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  报告列表
                </CardTitle>
                <CardDescription>系统中的所有分析报告</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.map(report => (
                    <div key={report.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{report.title}</div>
                        <Badge className={getStatusStyle(report.status)}>
                          {report.status === 'completed' ? '已完成' :
                           report.status === 'processing' ? '生成中' :
                           report.status === 'scheduled' ? '计划中' : '失败'}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div>
                          <div className="text-sm text-gray-500">类型</div>
                          <div>{report.type}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">生成日期</div>
                          <div>{report.generatedDate}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">大小</div>
                          <div>{report.size}</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">分类</div>
                          <div>{report.category}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">格式</div>
                          <div>{report.format}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">生成方式</div>
                          <div>{report.auto ? '自动' : '手动'}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <FileText className="mr-1 h-4 w-4" />
                            查看
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="mr-1 h-4 w-4" />
                            下载
                          </Button>
                        </div>
                        {report.status === 'processing' && (
                          <Button variant="outline" size="sm">
                            取消生成
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  报告模板
                </CardTitle>
                <CardDescription>可用的报告模板</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportTemplates.map(template => (
                    <div key={template.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{template.name}</div>
                        <Badge variant="outline">
                          {template.type}
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-3">
                        {template.description}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          使用次数: {template.usage}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            预览
                          </Button>
                          <Button size="sm">
                            使用模板
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  定时报告
                </CardTitle>
                <CardDescription>定时生成的报告配置</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.filter(r => r.auto).map(report => (
                    <div key={report.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{report.title}</div>
                        <Badge className={getStatusStyle(report.status)}>
                          {report.status === 'completed' ? '已完成' :
                           report.status === 'processing' ? '生成中' :
                           report.status === 'scheduled' ? '计划中' : '失败'}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <div className="text-sm text-gray-500">生成频率</div>
                          <div>每月</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">下次生成</div>
                          <div>{report.generatedDate}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          格式: {report.format}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            编辑计划
                          </Button>
                          <Button variant="outline" size="sm">
                            立即生成
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* 报告生成趋势图表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              报告生成趋势
            </CardTitle>
            <CardDescription>最近30天报告生成数量趋势</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end space-x-1">
              {Array.from({ length: 30 }, (_, i) => {
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