// app/reports/page.tsx
'use client';

import { PageTemplate } from '@/components/layout/page-template';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable, DataTableBody, DataTableCell, DataTableHead, DataTableHeader, DataTableRow } from '@/components/ui/data-table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Download,
  FileText,
  LineChart,
  MoreHorizontal,
  PieChart,
  Plus,
  RefreshCw,
  Search,
  Share2,
  X
} from 'lucide-react';
import { useState } from 'react';

export default function ReportsPage() {
  // 模拟报表数据
  const [reports, setReports] = useState([
    {
      id: 1,
      name: '每周销售报告',
      type: '销售',
      frequency: '每周',
      lastGenerated: '2023-11-10 09:30',
      status: '已生成',
      recipients: ['销售团队', '管理层'],
      views: 48,
      downloads: 15
    },
    {
      id: 2,
      name: '月度财务汇总',
      type: '财务',
      frequency: '每月',
      lastGenerated: '2023-11-01 10:00',
      status: '已生成',
      recipients: ['财务部门', '管理层'],
      views: 36,
      downloads: 24
    },
    {
      id: 3,
      name: '季度市场分析',
      type: '市场',
      frequency: '季度',
      lastGenerated: '2023-10-15 14:20',
      status: '已生成',
      recipients: ['市场团队', '产品团队'],
      views: 28,
      downloads: 9
    },
    {
      id: 4,
      name: '库存周转率报告',
      type: '库存',
      frequency: '每两周',
      lastGenerated: '2023-11-08 11:15',
      status: '已生成',
      recipients: ['仓储部门', '采购部门'],
      views: 22,
      downloads: 11
    },
    {
      id: 5,
      name: '客户满意度调查',
      type: '客户',
      frequency: '每月',
      lastGenerated: '2023-11-05 16:45',
      status: '已生成',
      recipients: ['客服团队', '产品团队'],
      views: 42,
      downloads: 18
    },
    {
      id: 6,
      name: '运营效率分析',
      type: '运营',
      frequency: '每周',
      lastGenerated: '2023-11-10 13:30',
      status: '生成中',
      recipients: ['运营团队', '管理层'],
      views: 0,
      downloads: 0
    },
    {
      id: 7,
      name: '员工绩效评估',
      type: 'HR',
      frequency: '季度',
      lastGenerated: '2023-10-20 15:10',
      status: '已生成',
      recipients: ['HR部门', '各部门主管'],
      views: 32,
      downloads: 21
    },
    {
      id: 8,
      name: '产品质量监控',
      type: '质量',
      frequency: '每周',
      lastGenerated: '2023-11-09 10:30',
      status: '已生成',
      recipients: ['质检部门', '生产部门'],
      views: 18,
      downloads: 12
    }
  ]);

  // 模拟报表模板数据
  const [templates, setTemplates] = useState([
    { id: 1, name: '销售报告模板', description: '标准销售数据分析报告模板', usedBy: 15, modifiedAt: '2023-10-25' },
    { id: 2, name: '财务汇总模板', description: '月度、季度财务数据汇总模板', usedBy: 12, modifiedAt: '2023-10-20' },
    { id: 3, name: '市场分析模板', description: '市场趋势和竞争分析报告模板', usedBy: 8, modifiedAt: '2023-10-15' },
    { id: 4, name: '自定义报告模板', description: '可灵活配置的自定义报告模板', usedBy: 20, modifiedAt: '2023-10-10' }
  ]);

  // 模拟最近生成的报表数据
  const [recentReports, setRecentReports] = useState([
    { id: 1, name: '销售日报', date: '2023-11-10', by: '系统自动生成', status: '已完成', size: '2.5MB' },
    { id: 2, name: '库存周报表', date: '2023-11-09', by: '系统自动生成', status: '已完成', size: '1.8MB' },
    { id: 3, name: '客户流失分析', date: '2023-11-08', by: '数据分析部门', status: '已完成', size: '3.2MB' },
    { id: 4, name: '营销活动效果', date: '2023-11-07', by: '市场部门', status: '已完成', size: '2.8MB' },
    { id: 5, name: '产品退货统计', date: '2023-11-06', by: '客服部门', status: '已完成', size: '1.5MB' },
    { id: 6, name: '财务审计报告', date: '2023-11-05', by: '财务部门', status: '已完成', size: '4.2MB' }
  ]);

  // 筛选状态
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    frequency: 'all'
  });

  // 搜索状态
  const [searchTerm, setSearchTerm] = useState('');

  // 处理筛选变化
  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // 处理搜索
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  // 渲染报表状态
  const renderStatus = (status: string) => {
    switch (status) {
      case '已生成':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">已生成</Badge>;
      case '生成中':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">生成中</Badge>;
      case '失败':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">失败</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <PageTemplate
      title="报表管理"
      description="创建、管理和查看系统中的各类报表"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '报表管理', path: '/reports' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">
            <Download className="mr-1 h-4 w-4" />
            导出选中
          </Button>
          <Button variant="secondary" size="sm">
            <RefreshCw className="mr-1 h-4 w-4" />
            刷新
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新建报表
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* 筛选和搜索 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <Select value={filters.type} onValueChange={(value) => handleFilterChange('type', value)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="报表类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部类型</SelectItem>
                <SelectItem value="销售">销售</SelectItem>
                <SelectItem value="财务">财务</SelectItem>
                <SelectItem value="市场">市场</SelectItem>
                <SelectItem value="库存">库存</SelectItem>
                <SelectItem value="客户">客户</SelectItem>
                <SelectItem value="运营">运营</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="报表状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="已生成">已生成</SelectItem>
                <SelectItem value="生成中">生成中</SelectItem>
                <SelectItem value="失败">失败</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.frequency} onValueChange={(value) => handleFilterChange('frequency', value)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="生成频率" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部频率</SelectItem>
                <SelectItem value="每天">每天</SelectItem>
                <SelectItem value="每周">每周</SelectItem>
                <SelectItem value="每两周">每两周</SelectItem>
                <SelectItem value="每月">每月</SelectItem>
                <SelectItem value="季度">季度</SelectItem>
                <SelectItem value="年度">年度</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="搜索报表名称..."
              className="pl-9 w-full sm:w-[300px]"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="总报表数" value="258" icon={<FileText className="h-5 w-5 text-blue-500" />} />
          <StatCard title="今日生成" value="12" icon={<CheckCircle2 className="h-5 w-5 text-green-500" />} />
          <StatCard title="进行中" value="3" icon={<RefreshCw className="h-5 w-5 text-amber-500" />} />
          <StatCard title="生成失败" value="1" icon={<AlertCircle className="h-5 w-5 text-red-500" />} />
        </div>

        {/* 报表管理标签页 */}
        <Tabs defaultValue="reports">
          <TabsList>
            <TabsTrigger value="reports">报表列表</TabsTrigger>
            <TabsTrigger value="templates">报表模板</TabsTrigger>
            <TabsTrigger value="recent">最近生成</TabsTrigger>
            <TabsTrigger value="analytics">报表分析</TabsTrigger>
          </TabsList>

          {/* 报表列表标签页 */}
          <TabsContent value="reports" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle>报表列表</CardTitle>
                <CardDescription>管理和查看系统中的所有报表</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable>
                  <DataTableHeader>
                    <DataTableRow>
                      <DataTableHead className="w-[250px]">报表名称</DataTableHead>
                      <DataTableHead>类型</DataTableHead>
                      <DataTableHead>生成频率</DataTableHead>
                      <DataTableHead>最后生成时间</DataTableHead>
                      <DataTableHead>状态</DataTableHead>
                      <DataTableHead>查看次数</DataTableHead>
                      <DataTableHead>下载次数</DataTableHead>
                      <DataTableHead className="text-right">操作</DataTableHead>
                    </DataTableRow>
                  </DataTableHeader>
                  <DataTableBody>
                    {reports.map((report) => (
                      <DataTableRow key={report.id}>
                        <DataTableCell className="font-medium">{report.name}</DataTableCell>
                        <DataTableCell>
                          <Badge variant="outline">{report.type}</Badge>
                        </DataTableCell>
                        <DataTableCell>{report.frequency}</DataTableCell>
                        <DataTableCell>{report.lastGenerated}</DataTableCell>
                        <DataTableCell>{renderStatus(report.status)}</DataTableCell>
                        <DataTableCell>{report.views}</DataTableCell>
                        <DataTableCell>{report.downloads}</DataTableCell>
                        <DataTableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="sm">查看</Button>
                            <Button variant="ghost" size="sm">编辑</Button>
                            <Button variant="ghost" size="sm" className="text-red-500">删除</Button>
                          </div>
                        </DataTableCell>
                      </DataTableRow>
                    ))}
                  </DataTableBody>
                </DataTable>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 报表模板标签页 */}
          <TabsContent value="templates" className="pt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>报表模板</CardTitle>
                    <CardDescription>管理和使用报表模板</CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="mr-1 h-4 w-4" />
                    新建模板
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {templates.map((template) => (
                    <Card key={template.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base">{template.name}</CardTitle>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                        <CardDescription>{template.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between text-sm text-gray-500 mb-3">
                          <span>使用人数: {template.usedBy}</span>
                          <span>最后修改: {template.modifiedAt}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <FileText className="mr-1 h-4 w-4" />
                            使用模板
                          </Button>
                          <Button variant="secondary" size="sm">
                            预览
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 最近生成标签页 */}
          <TabsContent value="recent" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle>最近生成的报表</CardTitle>
                <CardDescription>查看最近生成的报表记录</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable>
                  <DataTableHeader>
                    <DataTableRow>
                      <DataTableHead className="w-[250px]">报表名称</DataTableHead>
                      <DataTableHead>生成日期</DataTableHead>
                      <DataTableHead>生成人</DataTableHead>
                      <DataTableHead>状态</DataTableHead>
                      <DataTableHead>文件大小</DataTableHead>
                      <DataTableHead className="text-right">操作</DataTableHead>
                    </DataTableRow>
                  </DataTableHeader>
                  <DataTableBody>
                    {recentReports.map((report) => (
                      <DataTableRow key={report.id}>
                        <DataTableCell className="font-medium">{report.name}</DataTableCell>
                        <DataTableCell>{report.date}</DataTableCell>
                        <DataTableCell>{report.by}</DataTableCell>
                        <DataTableCell>
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">
                            {report.status}
                          </Badge>
                        </DataTableCell>
                        <DataTableCell>{report.size}</DataTableCell>
                        <DataTableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="sm">查看</Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </DataTableCell>
                      </DataTableRow>
                    ))}
                  </DataTableBody>
                </DataTable>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 报表分析标签页 */}
          <TabsContent value="analytics" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle>报表使用分析</CardTitle>
                <CardDescription>分析报表的使用情况和趋势</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* 报表类型分布 */}
                  <div>
                    <h4 className="font-medium mb-3">报表类型分布</h4>
                    <div className="h-64 bg-white rounded-lg border flex items-center justify-center">
                      <PieChart className="h-12 w-12 text-gray-300" />
                    </div>
                  </div>

                  {/* 报表使用趋势 */}
                  <div>
                    <h4 className="font-medium mb-3">报表使用趋势</h4>
                    <div className="h-64 bg-white rounded-lg border flex items-center justify-center">
                      <LineChart className="h-12 w-12 text-gray-300" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 即将生成的报表 */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>即将生成的报表</CardTitle>
                <CardDescription>查看下一批计划生成的报表</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                查看全部
                <ChevronDown className="h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <div className="font-medium">{item === 1 ? '销售日报' : item === 2 ? '库存周报表' : '客户活跃度报告'}</div>
                      <div className="text-xs text-gray-500">
                        下次生成时间: {item === 1 ? '今天 18:00' : item === 2 ? '明天 08:30' : '11月15日 10:00'}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">查看详情</Button>
                    <Button variant="ghost" size="sm" className="text-red-500">
                      <X className="h-4 w-4" />
                    </Button>
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

// 统计卡片组件
function StatCard({ title, value, icon }: { title: string; value: string | number; icon: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          {icon}
          <span className="ml-2">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs mt-1 text-gray-500">
          查看详情
          <ArrowUpRight className="ml-1 h-3 w-3" />
        </div>
      </CardContent>
    </Card>
  );
}
