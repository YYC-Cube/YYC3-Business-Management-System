// app/marketing/page.tsx
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
  Edit,
  Trash2,
  TrendingUp,
  Calendar,
  DollarSign,
  Users,
  BarChart3
} from 'lucide-react';

export default function MarketingPage() {
  // 模拟营销活动数据
  const [campaigns, setCampaigns] = useState([
    { 
      id: 1, 
      name: '夏季促销活动', 
      type: '促销',
      status: 'active',
      startDate: '2023-06-01',
      endDate: '2023-06-30',
      budget: 50000,
      spent: 32000,
      clicks: 12500,
      conversions: 320,
      roi: 0.25
    },
    { 
      id: 2, 
      name: '新产品发布', 
      type: '发布',
      status: 'active',
      startDate: '2023-05-20',
      endDate: '2023-06-20',
      budget: 80000,
      spent: 65000,
      clicks: 21000,
      conversions: 580,
      roi: 0.42
    },
    { 
      id: 3, 
      name: '品牌推广', 
      type: '品牌',
      status: 'completed',
      startDate: '2023-04-01',
      endDate: '2023-04-30',
      budget: 100000,
      spent: 95000,
      clicks: 35000,
      conversions: 420,
      roi: 0.18
    },
    { 
      id: 4, 
      name: '用户增长计划', 
      type: '增长',
      status: 'draft',
      startDate: '2023-07-01',
      endDate: '2023-07-31',
      budget: 60000,
      spent: 0,
      clicks: 0,
      conversions: 0,
      roi: 0
    }
  ]);

  // 营销活动表格列
  const campaignColumns = [
    { key: 'name', title: '活动名称' },
    { key: 'type', title: '类型' },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'active': { label: '进行中', color: 'bg-green-100 text-green-800' },
          'completed': { label: '已完成', color: 'bg-blue-100 text-blue-800' },
          'draft': { label: '草稿', color: 'bg-yellow-100 text-yellow-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['draft'];
        return <Badge className={status.color}>{status.label}</Badge>;
      }
    },
    { key: 'startDate', title: '开始日期' },
    { key: 'endDate', title: '结束日期' },
    { 
      key: 'budget', 
      title: '预算',
      render: (value: number) => `¥${value.toLocaleString()}`
    },
    { 
      key: 'spent', 
      title: '已花费',
      render: (value: number) => `¥${value.toLocaleString()}`
    },
    { 
      key: 'roi', 
      title: 'ROI',
      render: (value: number) => (
        <div className="flex items-center">
          <span className={value > 0 ? 'text-green-600' : 'text-red-600'}>
            {value > 0 ? '+' : ''}{(value * 100).toFixed(1)}%
          </span>
        </div>
      )
    }
  ];

  // 活动类型
  const campaignTypes = ['全部', '促销', '发布', '品牌', '增长'];

  // 活动状态
  const campaignStatuses = ['全部', '进行中', '已完成', '草稿'];

  return (
    <PageTemplate
      title="推广营销"
      description="营销活动创建与管理界面，包含活动效果分析图表和预算使用情况"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '内容管理', path: '/content' },
        { title: '推广营销', path: '/marketing' }
      ]}
      actions={
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          创建活动
        </Button>
      }
    >
      <div className="space-y-6">
        {/* 搜索和筛选 */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索活动..."
              className="pl-8"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">类型:</span>
            </div>
            {campaignTypes.map(type => (
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
              <span className="text-sm text-gray-500 mr-2">状态:</span>
            </div>
            {campaignStatuses.map(status => (
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

        {/* 营销活动表格 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              营销活动列表
            </CardTitle>
            <CardDescription>所有营销活动及其效果数据</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={campaigns}
              columns={campaignColumns}
              actions={(row) => (
                <>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                    <BarChart3 className="inline mr-2 h-4 w-4" />
                    查看分析
                  </button>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                    <Edit className="inline mr-2 h-4 w-4" />
                    编辑活动
                  </button>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                    <Calendar className="inline mr-2 h-4 w-4" />
                    查看日程
                  </button>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 text-red-500">
                    <Trash2 className="inline mr-2 h-4 w-4" />
                    删除活动
                  </button>
                </>
              )}
            />
          </CardContent>
        </Card>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-blue-100 mr-3">
                  <DollarSign className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    ¥{campaigns.reduce((sum, campaign) => sum + campaign.budget, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">总预算</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-green-100 mr-3">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {campaigns.reduce((sum, campaign) => sum + campaign.spent, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">已花费</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-purple-100 mr-3">
                  <Users className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {campaigns.reduce((sum, campaign) => sum + campaign.clicks, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">总点击量</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-amber-100 mr-3">
                  <BarChart3 className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {campaigns.reduce((sum, campaign) => sum + campaign.conversions, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">总转化数</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 活动效果图表 */}
        <Card>
          <CardHeader>
            <CardTitle>活动效果分析</CardTitle>
            <CardDescription>各营销活动的效果对比</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaigns
                .filter(c => c.status === 'active' || c.status === 'completed')
                .sort((a, b) => b.roi - a.roi)
                .map(campaign => (
                  <div key={campaign.id} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{campaign.name}</span>
                      <span className={campaign.roi > 0 ? 'text-green-600' : 'text-red-600'}>
                        ROI: {(campaign.roi * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${campaign.roi > 0 ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{ width: `${Math.min(Math.abs(campaign.roi) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>预算: ¥{campaign.budget.toLocaleString()}</span>
                      <span>花费: ¥{campaign.spent.toLocaleString()}</span>
                      <span>转化: {campaign.conversions}</span>
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
