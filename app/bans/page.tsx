// app/bans/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { DataTable } from '@/components/business/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  UserX, 
  Calendar, 
  MoreHorizontal, 
  CheckCircle,
  XCircle,
  Clock,
  Search
} from 'lucide-react';

export default function BansPage() {
  // 模拟封禁用户数据
  const [bannedUsers, setBannedUsers] = useState([
    { 
      id: 1, 
      name: '钱七', 
      email: 'qianqi@example.com', 
      reason: '发布违规内容',
      bannedBy: '管理员',
      banDate: '2023-05-20',
      expiryDate: '2023-06-20',
      status: 'active'
    },
    { 
      id: 2, 
      name: '孙八', 
      email: 'sunba@example.com', 
      reason: '多次恶意评论',
      bannedBy: '内容管理员',
      banDate: '2023-05-25',
      expiryDate: '2023-06-25',
      status: 'active'
    },
    { 
      id: 3, 
      name: '周九', 
      email: 'zhoujiu@example.com', 
      reason: '滥用系统功能',
      bannedBy: '管理员',
      banDate: '2023-04-10',
      expiryDate: '2023-05-10',
      status: 'expired'
    },
    { 
      id: 4, 
      name: '吴十', 
      email: 'wushi@example.com', 
      reason: '尝试攻击系统',
      bannedBy: '管理员',
      banDate: '2023-03-15',
      expiryDate: '永久',
      status: 'active'
    }
  ]);

  // 封禁用户表格列
  const banColumns = [
    { key: 'name', title: '用户名' },
    { key: 'email', title: '邮箱' },
    { key: 'reason', title: '封禁原因' },
    { key: 'bannedBy', title: '操作人' },
    { key: 'banDate', title: '封禁日期' },
    { key: 'expiryDate', title: '到期日期' },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'active': { label: '生效中', color: 'bg-red-100 text-red-800' },
          'expired': { label: '已过期', color: 'bg-gray-100 text-gray-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['expired'];
        return <Badge className={status.color}>{status.label}</Badge>;
      }
    }
  ];

  // 解封用户
  const unbanUser = (userId: number) => {
    setBannedUsers(bannedUsers.map(user => 
      user.id === userId ? { ...user, status: 'expired' } : user
    ));
  };

  return (
    <PageTemplate
      title="封禁管理"
      description="管理被封禁用户的列表，显示封禁原因、封禁时间和操作记录"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '用户管理', path: '/users' },
        { title: '封禁管理', path: '/bans' }
      ]}
    >
      <div className="space-y-6">
        {/* 搜索和筛选 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索用户..."
              className="pl-8"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer">全部</Badge>
            <Badge variant="secondary" className="cursor-pointer">生效中</Badge>
            <Badge variant="secondary" className="cursor-pointer">已过期</Badge>
          </div>
        </div>

        {/* 封禁用户表格 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserX className="mr-2 h-5 w-5" />
              封禁用户列表
            </CardTitle>
            <CardDescription>当前被封禁的用户及其封禁信息</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={bannedUsers}
              columns={banColumns}
              actions={(row) => (
                <>
                  {row.status === 'active' && (
                    <button 
                      className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 text-green-600"
                      onClick={() => unbanUser(row.id)}
                    >
                      <CheckCircle className="inline mr-2 h-4 w-4" />
                      解封用户
                    </button>
                  )}
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                    查看详情
                  </button>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                    延长封禁
                  </button>
                </>
              )}
            />
          </CardContent>
        </Card>

        {/* 统计信息 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-red-100 mr-3">
                  <XCircle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {bannedUsers.filter(u => u.status === 'active').length}
                  </div>
                  <div className="text-sm text-gray-500">生效中封禁</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-gray-100 mr-3">
                  <Clock className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {bannedUsers.filter(u => u.status === 'expired').length}
                  </div>
                  <div className="text-sm text-gray-500">已过期封禁</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-blue-100 mr-3">
                  <Calendar className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{bannedUsers.length}</div>
                  <div className="text-sm text-gray-500">总封禁数</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTemplate>
  );
}
