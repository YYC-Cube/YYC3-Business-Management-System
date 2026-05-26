// app/analytics/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { StatCard, StatCardGroup } from '@/components/business/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Users, 
  FileText,
  Download,
  Calendar,
  RefreshCw
} from 'lucide-react';

export default function AnalyticsPage() {
  // 模拟统计数据
  const stats = [
    {
      title: '总访问量',
      value: '124,560',
      change: { value: 12, type: 'increase' as const, text: '较上月' },
      icon: <BarChart3 className="h-5 w-5" />,
      description: '平台总访问次数'
    },
    {
      title: '独立访客',
      value: '32,890',
      change: { value: 8, type: 'increase' as const, text: '较上月' },
      icon: <Users className="h-5 w-5" />,
      description: '独立访问用户数'
    },
    {
      title: '页面浏览量',
      value: '456,780',
      change: { value: 15, type: 'increase' as const, text: '较上月' },
      icon: <FileText className="h-5 w-5" />,
      description: '页面总浏览次数'
    },
    {
      title: '平均停留时间',
      value: '3:45',
      change: { value: 5, type: 'increase' as const, text: '较上月' },
      icon: <TrendingUp className="h-5 w-5" />,
      description: '用户平均停留时间'
    }
  ];

  // 模拟流量来源数据
  const trafficSources = [
    { source: '直接访问', visitors: 12450, percentage: 38, change: 5 },
    { source: '搜索引擎', visitors: 9850, percentage: 30, change: 8 },
    { source: '社交媒体', visitors: 5420, percentage: 16, change: 12 },
    { source: '外部链接', visitors: 3280, percentage: 10, change: -3 },
    { source: '邮件营销', visitors: 1890, percentage: 6, change: 2 }
  ];

  // 模拟热门页面数据
  const popularPages = [
    { page: '/dashboard', views: 12560, percentage: 28, change: 5 },
    { page: '/articles', views: 8950, percentage: 20, change: 12 },
    { page: '/ai', views: 6780, percentage: 15, change: 8 },
    { page: '/users', views: 5420, percentage: 12, change: 3 },
    { page: '/analytics', views: 4320, percentage: 10, change: -2 }
  ];

  // 模拟用户地域分布数据
  const userRegions = [
    { region: '华东地区', users: 12560, percentage: 38 },
    { region: '华南地区', users: 8950, percentage: 27 },
    { region: '华北地区', users: 5420, percentage: 16 },
    { region: '西南地区', users: 3280, percentage: 10 },
    { region: '其他地区', users: 1890, percentage: 9 }
  ];

  // 模拟设备类型数据
  const deviceTypes = [
    { type: '桌面端', users: 18950, percentage: 58 },
    { type: '移动端', users: 11370, percentage: 34 },
    { type: '平板端', users: 2480, percentage: 8 }
  ];

  return (
    <PageTemplate
      title="数据概览"
      description="综合数据分析仪表板，包含多种关键指标图表、趋势图和数据卡片"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '数据分析', path: '/analytics' },
        { title: '数据概览', path: '/analytics' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            选择日期
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            导出报告
          </Button>
        </div>
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
          {/* 流量来源 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="mr-2 h-5 w-5" />
                流量来源
              </CardTitle>
              <CardDescription>用户访问来源分布</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trafficSources.map((source, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{source.source}</span>
                      <div className="flex items-center">
                        <span className="mr-2">{source.percentage}%</span>
                        <span className={`text-sm ${source.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {source.change > 0 ? '+' : ''}{source.change}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: `${source.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {source.visitors.toLocaleString()} 访客
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 热门页面 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                热门页面
              </CardTitle>
              <CardDescription>访问量最高的页面</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularPages.map((page, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{page.page}</span>
                      <div className="flex items-center">
                        <span className="mr-2">{page.percentage}%</span>
                        <span className={`text-sm ${page.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {page.change > 0 ? '+' : ''}{page.change}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-green-500"
                        style={{ width: `${page.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {page.views.toLocaleString()} 浏览量
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 用户地域分布 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                用户地域分布
              </CardTitle>
              <CardDescription>用户所在地区分布</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userRegions.map((region, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{region.region}</span>
                      <span>{region.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-purple-500"
                        style={{ width: `${region.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {region.users.toLocaleString()} 用户
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 设备类型 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <RefreshCw className="mr-2 h-5 w-5" />
                设备类型
              </CardTitle>
              <CardDescription>用户使用设备类型分布</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deviceTypes.map((device, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{device.type}</span>
                      <span>{device.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-amber-500"
                        style={{ width: `${device.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {device.users.toLocaleString()} 用户
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 趋势图表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              访问趋势
            </CardTitle>
            <CardDescription>最近30天访问量变化趋势</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end space-x-1">
              {Array.from({ length: 30 }, (_, i) => {
                const height = 40 + Math.random() * 160;
                return (
                  <div 
                    key={i} 
                    className="flex-1 bg-blue-500 rounded-t"
                    style={{ height: `${height}px` }}
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
