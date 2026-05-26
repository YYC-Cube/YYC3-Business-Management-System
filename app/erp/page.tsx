// app/erp/page.tsx
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
  Package, 
  ShoppingCart, 
  Truck, 
  FileText,
  BarChart3,
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  Search,
  Settings,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Clock
} from 'lucide-react';

export default function ERPPage() {
  // 模拟ERP统计数据
  const [erpStats, setErpStats] = useState([
    {
      title: '库存总值',
      value: '¥2,456,800',
      change: { value: 3, type: 'decrease' as const, text: '较上月' },
      icon: <Package className="h-5 w-5" />,
      description: '当前库存总价值'
    },
    {
      title: '采购订单',
      value: '128',
      change: { value: 12, type: 'increase' as const, text: '较上月' },
      icon: <ShoppingCart className="h-5 w-5" />,
      description: '本月采购订单数'
    },
    {
      title: '供应商',
      value: '86',
      change: { value: 5, type: 'increase' as const, text: '较上月' },
      icon: <Users className="h-5 w-5" />,
      description: '活跃供应商数量'
    },
    {
      title: '交付准时率',
      value: '94.5%',
      change: { value: 2, type: 'increase' as const, text: '较上月' },
      icon: <Truck className="h-5 w-5" />,
      description: '供应商交付准时率'
    }
  ]);

  // 模拟库存数据
  const [inventoryData, setInventoryData] = useState([
    { 
      id: 1, 
      name: '服务器硬件', 
      category: '硬件设备',
      sku: 'HW-SRV-001',
      quantity: 45,
      unit: '台',
      value: 675000,
      status: 'normal',
      location: '北京仓库',
      lastUpdated: '2023-06-05'
    },
    { 
      id: 2, 
      name: '网络交换机', 
      category: '网络设备',
      sku: 'NT-SW-002',
      quantity: 120,
      unit: '台',
      value: 360000,
      status: 'normal',
      location: '上海仓库',
      lastUpdated: '2023-06-03'
    },
    { 
      id: 3, 
      name: '软件许可证', 
      category: '软件产品',
      sku: 'SW-LIC-003',
      quantity: 250,
      unit: '个',
      value: 1250000,
      status: 'low',
      location: '虚拟库存',
      lastUpdated: '2023-06-01'
    },
    { 
      id: 4, 
      name: '存储设备', 
      category: '存储设备',
      sku: 'ST-DEV-004',
      quantity: 15,
      unit: '台',
      value: 450000,
      status: 'low',
      location: '深圳仓库',
      lastUpdated: '2023-05-28'
    }
  ]);

  // 库存表格列
  const inventoryColumns = [
    { key: 'name', title: '产品名称' },
    { key: 'category', title: '分类' },
    { key: 'sku', title: 'SKU' },
    { key: 'quantity', title: '数量' },
    { key: 'unit', title: '单位' },
    { key: 'value', title: '价值', render: (value: number) => `¥${value.toLocaleString()}` },
    { key: 'location', title: '位置' },
    { key: 'lastUpdated', title: '最后更新' },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'normal': { label: '正常', color: 'bg-green-100 text-green-800' },
          'low': { label: '库存不足', color: 'bg-yellow-100 text-yellow-800' },
          'excess': { label: '库存过剩', color: 'bg-blue-100 text-blue-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['normal'];
        return <Badge className={status.color}>{status.label}</Badge>;
      }
    }
  ];

  // 模拟采购订单数据
  const [purchaseOrders, setPurchaseOrders] = useState([
    { 
      id: 1, 
      orderNumber: 'PO-202306-001',
      supplier: '北京科技有限公司',
      status: 'pending',
      orderDate: '2023-06-01',
      expectedDate: '2023-06-15',
      totalAmount: 125000,
      items: 5
    },
    { 
      id: 2, 
      orderNumber: 'PO-202306-002',
      supplier: '上海网络设备公司',
      status: 'approved',
      orderDate: '2023-06-02',
      expectedDate: '2023-06-20',
      totalAmount: 86000,
      items: 3
    },
    { 
      id: 3, 
      orderNumber: 'PO-202305-003',
      supplier: '深圳软件供应商',
      status: 'delivered',
      orderDate: '2023-05-25',
      expectedDate: '2023-06-05',
      totalAmount: 450000,
      items: 8
    },
    { 
      id: 4, 
      orderNumber: 'PO-202305-004',
      supplier: '广州硬件制造商',
      status: 'cancelled',
      orderDate: '2023-05-20',
      expectedDate: '2023-06-10',
      totalAmount: 320000,
      items: 6
    }
  ]);

  // 采购订单表格列
  const purchaseOrderColumns = [
    { key: 'orderNumber', title: '订单号' },
    { key: 'supplier', title: '供应商' },
    { key: 'orderDate', title: '下单日期' },
    { key: 'expectedDate', title: '预计交付' },
    { key: 'totalAmount', title: '总金额', render: (value: number) => `¥${value.toLocaleString()}` },
    { key: 'items', title: '项目数' },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'pending': { label: '待审批', color: 'bg-yellow-100 text-yellow-800' },
          'approved': { label: '已批准', color: 'bg-blue-100 text-blue-800' },
          'delivered': { label: '已交付', color: 'bg-green-100 text-green-800' },
          'cancelled': { label: '已取消', color: 'bg-red-100 text-red-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['pending'];
        return <Badge className={status.color}>{status.label}</Badge>;
      }
    }
  ];

  // 获取状态图标
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'low':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'excess':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <PageTemplate
      title="ERP管理"
      description="企业资源计划管理界面，包含库存管理、采购订单和供应商管理"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '商务功能', path: '/business' },
        { title: 'ERP管理', path: '/erp' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新建采购订单
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            系统设置
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* ERP统计卡片 */}
        <StatCardGroup>
          {erpStats.map((stat, index) => (
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
          {/* 库存管理 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="mr-2 h-5 w-5" />
                库存管理
              </CardTitle>
              <CardDescription>当前库存状态</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventoryData.map(item => (
                  <div key={item.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{item.name}</div>
                      <div className="flex items-center">
                        {getStatusIcon(item.status)}
                        <Badge className={`ml-2 ${
                          item.status === 'normal' ? 'bg-green-100 text-green-800' :
                          item.status === 'low' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {item.status === 'normal' ? '正常' :
                           item.status === 'low' ? '库存不足' : '库存过剩'}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-gray-500">分类</div>
                        <div>{item.category}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">SKU</div>
                        <div>{item.sku}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">数量</div>
                        <div>{item.quantity} {item.unit}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">价值</div>
                        <div>¥{item.value.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      位置: {item.location} · 最后更新: {item.lastUpdated}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 采购订单 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5" />
                采购订单
              </CardTitle>
              <CardDescription>最近的采购订单</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {purchaseOrders.map(order => (
                  <div key={order.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{order.orderNumber}</div>
                      <Badge className={
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {order.status === 'pending' ? '待审批' :
                         order.status === 'approved' ? '已批准' :
                         order.status === 'delivered' ? '已交付' : '已取消'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-gray-500">供应商</div>
                        <div>{order.supplier}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">下单日期</div>
                        <div>{order.orderDate}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">预计交付</div>
                        <div>{order.expectedDate}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">总金额</div>
                        <div>¥{order.totalAmount.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      项目数: {order.items}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 库存预警 */}
        {inventoryData.some(item => item.status === 'low') && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-800">
                <AlertTriangle className="mr-2 h-5 w-5" />
                库存预警
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-yellow-700">
                以下产品库存不足，请及时补充：
                <ul className="list-disc pl-5 mt-2">
                  {inventoryData
                    .filter(item => item.status === 'low')
                    .map(item => (
                      <li key={item.id}>
                        {item.name} - 剩余 {item.quantity} {item.unit}
                      </li>
                    ))
                  }
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 库存价值分布 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              库存价值分布
            </CardTitle>
            <CardDescription>各分类库存价值占比</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { category: '硬件设备', value: 1125000, percentage: 45.8 },
                { category: '网络设备', value: 360000, percentage: 14.7 },
                { category: '软件产品', value: 1250000, percentage: 50.9 },
                { category: '存储设备', value: 450000, percentage: 18.3 }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{item.category}</span>
                    <div className="flex items-center">
                      <span className="mr-2">{item.percentage}%</span>
                      <span>¥{(item.value / 10000).toFixed(1)}万</span>
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
