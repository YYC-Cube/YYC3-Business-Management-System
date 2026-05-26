// app/crm/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { DataTable } from '@/components/business/data-table';
import { StatCard, StatCardGroup } from '@/components/business/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Phone,
  Mail,
  Calendar,
  MapPin,
  Star,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  User,
  Building,
  Activity
} from 'lucide-react';

export default function CRMPage() {
  // 模拟CRM统计数据
  const [crmStats, setCrmStats] = useState([
    {
      title: '总客户数',
      value: '1,256',
      change: { value: 8, type: 'increase' as const, text: '较上月' },
      icon: <Users className="h-5 w-5" />,
      description: '系统中的客户总数'
    },
    {
      title: '潜在客户',
      value: '428',
      change: { value: 12, type: 'increase' as const, text: '较上月' },
      icon: <User className="h-5 w-5" />,
      description: '潜在客户数量'
    },
    {
      title: '销售线索',
      value: '856',
      change: { value: 5, type: 'increase' as const, text: '较上月' },
      icon: <Activity className="h-5 w-5" />,
      description: '销售线索总数'
    },
    {
      title: '客户转化率',
      value: '24.5%',
      change: { value: 3, type: 'increase' as const, text: '较上月' },
      icon: <TrendingUp className="h-5 w-5" />,
      description: '客户转化率'
    }
  ]);

  // 模拟客户数据
  const [customers, setCustomers] = useState([
    { 
      id: 1, 
      name: '北京科技有限公司', 
      type: '企业客户',
      industry: '信息技术',
      contact: '张经理',
      phone: '13800138000',
      email: 'zhang@bjtech.com',
      status: 'active',
      value: 1250000,
      lastContact: '2023-06-05',
      nextFollowUp: '2023-06-15',
      location: '北京市',
      rating: 4
    },
    { 
      id: 2, 
      name: '上海网络有限公司', 
      type: '企业客户',
      industry: '网络服务',
      contact: '李总',
      phone: '13900139000',
      email: 'li@shnet.com',
      status: 'active',
      value: 860000,
      lastContact: '2023-06-03',
      nextFollowUp: '2023-06-12',
      location: '上海市',
      rating: 5
    },
    { 
      id: 3, 
      name: '深圳软件开发商', 
      type: '企业客户',
      industry: '软件开发',
      contact: '王总监',
      phone: '13700137000',
      email: 'wang@szsoft.com',
      status: 'prospect',
      value: 0,
      lastContact: '2023-06-01',
      nextFollowUp: '2023-06-10',
      location: '深圳市',
      rating: 3
    },
    { 
      id: 4, 
      name: '广州系统集成商', 
      type: '企业客户',
      industry: '系统集成',
      contact: '陈经理',
      phone: '13600136000',
      email: 'chen@gzsys.com',
      status: 'inactive',
      value: 450000,
      lastContact: '2023-05-20',
      nextFollowUp: '2023-06-20',
      location: '广州市',
      rating: 2
    }
  ]);

  // 客户表格列
  const customerColumns = [
    { key: 'name', title: '客户名称' },
    { key: 'type', title: '客户类型' },
    { key: 'industry', title: '行业' },
    { key: 'contact', title: '联系人' },
    { key: 'phone', title: '电话' },
    { key: 'email', title: '邮箱' },
    { key: 'location', title: '地区' },
    { key: 'lastContact', title: '最后联系' },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'active': { label: '活跃', color: 'bg-green-100 text-green-800' },
          'prospect': { label: '潜在', color: 'bg-yellow-100 text-yellow-800' },
          'inactive': { label: '不活跃', color: 'bg-gray-100 text-gray-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['inactive'];
        return <Badge className={status.color}>{status.label}</Badge>;
      }
    },
    { 
      key: 'value', 
      title: '客户价值',
      render: (value: number) => value > 0 ? `¥${value.toLocaleString()}` : '-'
    }
  ];

  // 模拟销售线索数据
  const [leads, setLeads] = useState([
    { 
      id: 1, 
      title: '企业云平台需求', 
      source: '网站咨询',
      status: 'qualified',
      contact: '赵经理',
      company: '杭州数据公司',
      phone: '13500135000',
      email: 'zhao@hzdata.com',
      assignedTo: '销售团队A',
      createdDate: '2023-06-01',
      estimatedValue: 580000
    },
    { 
      id: 2, 
      title: 'AI解决方案咨询', 
      source: '展会',
      status: 'contacted',
      contact: '钱总监',
      company: '南京智能科技',
      phone: '13400134000',
      email: 'qian@njai.com',
      assignedTo: '销售团队B',
      createdDate: '2023-05-28',
      estimatedValue: 750000
    },
    { 
      id: 3, 
      title: '数据分析平台', 
      source: '推荐',
      status: 'new',
      contact: '孙总',
      company: '成都大数据公司',
      phone: '13300133000',
      email: 'sun@cddata.com',
      assignedTo: '销售团队A',
      createdDate: '2023-05-25',
      estimatedValue: 420000
    },
    { 
      id: 4, 
      title: '移动应用开发', 
      source: '电话咨询',
      status: 'converted',
      contact: '周经理',
      company: '武汉移动科技',
      phone: '13200132000',
      email: 'zhou@whmobile.com',
      assignedTo: '销售团队C',
      createdDate: '2023-05-20',
      estimatedValue: 350000
    }
  ]);

  // 销售线索表格列
  const leadColumns = [
    { key: 'title', title: '线索标题' },
    { key: 'source', title: '来源' },
    { key: 'contact', title: '联系人' },
    { key: 'company', title: '公司' },
    { key: 'assignedTo', title: '负责人' },
    { key: 'createdDate', title: '创建日期' },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'new': { label: '新线索', color: 'bg-blue-100 text-blue-800' },
          'contacted': { label: '已联系', color: 'bg-yellow-100 text-yellow-800' },
          'qualified': { label: '已确认', color: 'bg-purple-100 text-purple-800' },
          'converted': { label: '已转化', color: 'bg-green-100 text-green-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['new'];
        return <Badge className={status.color}>{status.label}</Badge>;
      }
    },
    { 
      key: 'estimatedValue', 
      title: '预计价值',
      render: (value: number) => `¥${value.toLocaleString()}`
    }
  ];

  // 获取星级评分
  const getStarRating = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            className={`h-4 w-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <PageTemplate
      title="CRM管理"
      description="客户关系管理界面，包含客户信息管理、销售线索跟踪和客户价值分析"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '商务功能', path: '/business' },
        { title: 'CRM管理', path: '/crm' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新建客户
          </Button>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            新建线索
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* CRM统计卡片 */}
        <StatCardGroup>
          {crmStats.map((stat, index) => (
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
          {/* 客户管理 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                客户管理
              </CardTitle>
              <CardDescription>系统中的客户信息</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customers.map(customer => (
                  <div key={customer.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{customer.name}</div>
                      <div className="flex items-center">
                        <Badge className={
                          customer.status === 'active' ? 'bg-green-100 text-green-800' :
                          customer.status === 'prospect' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {customer.status === 'active' ? '活跃' :
                           customer.status === 'prospect' ? '潜在' : '不活跃'}
                        </Badge>
                        {getStarRating(customer.rating)}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center">
                        <Building className="mr-1 h-3 w-3 text-gray-500" />
                        <span>{customer.industry}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-3 w-3 text-gray-500" />
                        <span>{customer.location}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="mr-1 h-3 w-3 text-gray-500" />
                        <span>{customer.contact}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="mr-1 h-3 w-3 text-gray-500" />
                        <span>{customer.phone}</span>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Mail className="mr-1 h-3 w-3 text-gray-500" />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Calendar className="mr-1 h-3 w-3 text-gray-500" />
                        <span>下次跟进: {customer.nextFollowUp}</span>
                      </div>
                    </div>
                    {customer.value > 0 && (
                      <div className="mt-2 text-sm">
                        <span className="text-gray-500">客户价值: </span>
                        <span className="font-medium">¥{customer.value.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 销售线索 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5" />
                销售线索
              </CardTitle>
              <CardDescription>当前销售线索</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leads.map(lead => (
                  <div key={lead.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{lead.title}</div>
                      <Badge className={
                        lead.status === 'new' ? 'bg-blue-100 text-blue-800' :
                        lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                        lead.status === 'qualified' ? 'bg-purple-100 text-purple-800' :
                        'bg-green-100 text-green-800'
                      }>
                        {lead.status === 'new' ? '新线索' :
                         lead.status === 'contacted' ? '已联系' :
                         lead.status === 'qualified' ? '已确认' : '已转化'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-gray-500">来源</div>
                        <div>{lead.source}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">负责人</div>
                        <div>{lead.assignedTo}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">联系人</div>
                        <div>{lead.contact}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">公司</div>
                        <div>{lead.company}</div>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3 text-gray-500" />
                        <span>创建日期: {lead.createdDate}</span>
                      </div>
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="text-gray-500">预计价值: </span>
                      <span className="font-medium">¥{lead.estimatedValue.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 客户分布 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              客户地域分布
            </CardTitle>
            <CardDescription>客户所在地区分布</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { region: '华北地区', customers: 356, percentage: 28.3 },
                { region: '华东地区', customers: 425, percentage: 33.8 },
                { region: '华南地区', customers: 268, percentage: 21.3 },
                { region: '西南地区', customers: 125, percentage: 10.0 },
                { region: '其他地区', customers: 82, percentage: 6.5 }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{item.region}</span>
                    <div className="flex items-center">
                      <span className="mr-2">{item.percentage}%</span>
                      <span>{item.customers}家</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
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
