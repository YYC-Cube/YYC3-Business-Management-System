// app/business/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { StatCard, StatCardGroup } from '@/components/business/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  ShoppingCart,
  Briefcase,
  BarChart3,
  FileText,
  Settings,
  Plus,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export default function BusinessPage() {
  // 模拟商务统计数据
  const [businessStats, setBusinessStats] = useState([
    {
      title: '总销售额',
      value: '¥1,245,600',
      change: { value: 12, type: 'increase' as const, text: '较上月' },
      icon: <DollarSign className="h-5 w-5" />,
      description: '本月总销售额'
    },
    {
      title: '新客户',
      value: '328',
      change: { value: 8, type: 'increase' as const, text: '较上月' },
      icon: <Users className="h-5 w-5" />,
      description: '本月新增客户数'
    },
    {
      title: '订单数',
      value: '1,256',
      change: { value: 5, type: 'increase' as const, text: '较上月' },
      icon: <ShoppingCart className="h-5 w-5" />,
      description: '本月订单总数'
    },
    {
      title: '转化率',
      value: '18.5%',
      change: { value: 3, type: 'increase' as const, text: '较上月' },
      icon: <TrendingUp className="h-5 w-5" />,
      description: '销售转化率'
    }
  ]);

  // 模拟销售数据
  const [salesData, setSalesData] = useState([
    { month: '1月', sales: 850000, target: 800000 },
    { month: '2月', sales: 920000, target: 850000 },
    { month: '3月', sales: 780000, target: 900000 },
    { month: '4月', sales: 1050000, target: 950000 },
    { month: '5月', sales: 1120000, target: 1000000 },
    { month: '6月', sales: 1245600, target: 1100000 }
  ]);

  // 模拟产品销售数据
  const [productSales, setProductSales] = useState([
    { name: '企业版', sales: 568000, percentage: 45.6, change: 12 },
    { name: '专业版', sales: 356000, percentage: 28.6, change: 8 },
    { name: '标准版', sales: 198000, percentage: 15.9, change: -3 },
    { name: '基础版', sales: 123600, percentage: 9.9, change: 5 }
  ]);

  // 模拟客户数据
  const [customerData, setCustomerData] = useState([
    { type: '新客户', count: 328, percentage: 35, change: 8 },
    { type: '回头客', count: 412, percentage: 44, change: 12 },
    { type: 'VIP客户', count: 156, percentage: 17, change: 5 },
    { type: '流失客户', count: 42, percentage: 4, change: -2 }
  ]);

  // 模拟销售活动数据
  const [salesActivities, setSalesActivities] = useState([
    { id: 1, title: '夏季促销活动', status: 'active', startDate: '2023-06-01', endDate: '2023-06-30', budget: 50000, spent: 32000, roi: 0.25 },
    { id: 2, title: '新产品发布会', status: 'completed', startDate: '2023-05-20', endDate: '2023-05-25', budget: 80000, spent: 75000, roi: 0.42 },
    { id: 3, title: '客户答谢会', status: 'planned', startDate: '2023-07-15', endDate: '2023-07-15', budget: 30000, spent: 0, roi: 0 },
    { id: 4, title: '行业展会', status: 'active', startDate: '2023-06-10', endDate: '2023-06-12', budget: 120000, spent: 95000, roi: 0.18 }
  ]);

  // 获取状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'planned':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageTemplate
      title="商务功能"
      description="商务数据统计和分析界面，包含销售趋势图表和客户转化漏斗"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '商务功能', path: '/business' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            选择日期
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            创建活动
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* 商务统计卡片 */}
        <StatCardGroup>
          {businessStats.map((stat, index) => (
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
          {/* 销售趋势 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                销售趋势
              </CardTitle>
              <CardDescription>最近6个月销售数据与目标对比</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salesData.map((data, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{data.month}</span>
                      <div className="flex items-center">
                        <span className="mr-2">¥{(data.sales / 10000).toFixed(1)}万</span>
                        <span className={`text-sm ${data.sales >= data.target ? 'text-green-600' : 'text-red-600'}`}>
                          {data.sales >= data.target ? (
                            <ArrowUpRight className="inline h-4 w-4" />
                          ) : (
                            <ArrowDownRight className="inline h-4 w-4" />
                          )}
                          {Math.abs(((data.sales - data.target) / data.target) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${data.sales >= data.target ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{ width: `${Math.min(100, (data.sales / data.target) * 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-500">
                      目标: ¥{(data.target / 10000).toFixed(1)}万
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 产品销售分布 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="mr-2 h-5 w-5" />
                产品销售分布
              </CardTitle>
              <CardDescription>各产品线销售占比</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {productSales.map((product, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{product.name}</span>
                      <div className="flex items-center">
                        <span className="mr-2">{product.percentage}%</span>
                        <span className={`text-sm ${product.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {product.change > 0 ? '+' : ''}{product.change}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: `${product.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-500">
                      销售额: ¥{(product.sales / 10000).toFixed(1)}万
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 客户分析 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                客户分析
              </CardTitle>
              <CardDescription>客户类型分布及变化</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customerData.map((customer, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{customer.type}</span>
                      <div className="flex items-center">
                        <span className="mr-2">{customer.percentage}%</span>
                        <span className={`text-sm ${customer.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {customer.change > 0 ? '+' : ''}{customer.change}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          customer.type === '新客户' ? 'bg-green-500' :
                          customer.type === '回头客' ? 'bg-blue-500' :
                          customer.type === 'VIP客户' ? 'bg-purple-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${customer.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-500">
                      数量: {customer.count}人
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 销售活动 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                销售活动
              </CardTitle>
              <CardDescription>当前进行中的销售活动</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salesActivities.map(activity => (
                  <div key={activity.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{activity.title}</div>
                      <Badge className={getStatusStyle(activity.status)}>
                        {activity.status === 'active' ? '进行中' :
                         activity.status === 'completed' ? '已完成' :
                         activity.status === 'planned' ? '计划中' : activity.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-gray-500">开始日期</div>
                        <div>{activity.startDate}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">结束日期</div>
                        <div>{activity.endDate}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">预算</div>
                        <div>¥{activity.budget.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">已花费</div>
                        <div>¥{activity.spent.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="text-gray-500">ROI: </span>
                      <span className={activity.roi > 0 ? 'text-green-600' : 'text-red-600'}>
                        {(activity.roi * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTemplate>
  );
}
