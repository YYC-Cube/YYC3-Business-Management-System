// app/reports/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { DataTable } from '@/components/business/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Download,
  Eye,
  Edit,
  Trash2,
  FileBarChart,
  Calendar,
  Filter,
  Clock
} from 'lucide-react';

export default function ReportsPage() {
  // 模拟报表数据
  const [reports, setReports] = useState([
    { 
      id: 1, 
      name: '月度运营报告', 
      type: '运营',
      category: '定期报告',
      createdAt: '2023-06-01',
      lastModified: '2023-06-05',
      schedule: '每月1日',
      format: 'PDF',
      size: '2.4 MB',
      status: 'active'
    },
    { 
      id: 2, 
      name: '用户增长分析', 
      type: '用户',
      category: '分析报告',
      createdAt: '2023-05-28',
      lastModified: '2023-05-28',
      schedule: '手动',
      format: 'Excel',
      size: '1.8 MB',
      status: 'active'
    },
    { 
      id: 3, 
      name: '销售数据统计', 
      type: '销售',
      category: '数据报告',
      createdAt: '2023-05-20',
      lastModified: '2023-05-25',
      schedule: '每周一',
      format: 'Excel',
      size: '3.2 MB',
      status: 'active'
    },
    { 
      id: 4, 
      name: '系统性能监控', 
      type: '系统',
      category: '监控报告',
      createdAt: '2023-05-15',
      lastModified: '2023-06-01',
      schedule: '每日',
      format: 'PDF',
      size: '1.5 MB',
      status: 'active'
    },
    { 
      id: 5, 
      name: '市场趋势分析', 
      type: '市场',
      category: '分析报告',
      createdAt: '2023-05-10',
      lastModified: '2023-05-10',
      schedule: '手动',
      format: 'PDF',
      size: '4.7 MB',
      status: 'archived'
    }
  ]);

  // 报表表格列
  const reportColumns = [
    { key: 'name', title: '报表名称' },
    { key: 'type', title: '类型' },
    { key: 'category', title: '分类' },
    { key: 'schedule', title: '生成频率' },
    { key: 'format', title: '格式' },
    { key: 'lastModified', title: '最后修改' },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'active': { label: '启用', color: 'bg-green-100 text-green-800' },
          'archived': { label: '已归档', color: 'bg-gray-100 text-gray-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['active'];
        return <Badge className={status.color}>{status.label}</Badge>;
      }
    }
  ];

  // 报表类型
  const reportTypes = ['全部', '运营', '用户', '销售', '系统', '市场'];

  // 报表分类
  const reportCategories = ['全部', '定期报告', '分析报告', '数据报告', '监控报告'];

  // 报表状态
  const reportStatuses = ['全部', '启用', '已归档'];

  return (
    <PageTemplate
      title="报表中心"
      description="自定义报表创建和管理界面，支持数据导出和定时报表发送"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '数据分析', path: '/analytics' },
        { title: '报表中心', path: '/reports' }
      ]}
      actions={
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          创建报表
        </Button>
      }
    >
      <div className="space-y-6">
        {/* 搜索和筛选 */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索报表..."
              className="pl-8"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center">
              <Filter className="mr-2 h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500 mr-2">类型:</span>
            </div>
            {reportTypes.map(type => (
              <Badge 
                key={type} 
                variant={type === '全部' ? 'default' : 'outline'} 
                className="cursor-pointer"
              >
                {type}
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">分类:</span>
            </div>
            {reportCategories.map(category => (
              <Badge 
                key={category} 
                variant={category === '全部' ? 'default' : 'outline'} 
                className="cursor-pointer"
              >
                {category}
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">状态:</span>
            </div>
            {reportStatuses.map(status => (
              <Badge 
                key={status} 
                variant={status === '全部' ? 'default' : 'outline'} 
                className="cursor-pointer"
              >
                {status}
              </Badge>
            ))}
          </div>
        </div>

        {/* 报表列表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileBarChart className="mr-2 h-5 w-5" />
              报表列表
            </CardTitle>
            <CardDescription>系统中的所有报表</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={reports}
              columns={reportColumns}
              actions={(row) => (
                <>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                    <Eye className="inline mr-2 h-4 w-4" />
                    查看报表
                  </button>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                    <Download className="inline mr-2 h-4 w-4" />
                    下载报表
                  </button>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                    <Edit className="inline mr-2 h-4 w-4" />
                    编辑报表
                  </button>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                    <Calendar className="inline mr-2 h-4 w-4" />
                    查看计划
                  </button>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 text-red-500">
                    <Trash2 className="inline mr-2 h-4 w-4" />
                    删除报表
                  </button>
                </>
              )}
            />
          </CardContent>
        </Card>

        {/* 统计信息 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{reports.length}</div>
              <div className="text-sm text-gray-500">总报表数</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                {reports.filter(r => r.status === 'active').length}
              </div>
              <div className="text-sm text-gray-500">启用报表</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                {reports.filter(r => r.schedule !== '手动').length}
              </div>
              <div className="text-sm text-gray-500">定时报表</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                {reports.filter(r => r.format === 'PDF').length}
              </div>
              <div className="text-sm text-gray-500">PDF报表</div>
            </CardContent>
          </Card>
        </div>

        {/* 最近生成的报表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              最近生成的报表
            </CardTitle>
            <CardDescription>最近更新的报表</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports
                .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())
                .slice(0, 5)
                .map(report => (
                  <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <div className="mr-3 p-2 rounded-full bg-blue-100">
                        <FileBarChart className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <div className="font-medium">{report.name}</div>
                        <div className="text-sm text-gray-500">
                          {report.type} · {report.format} · {report.size}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        下载
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              }
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}
