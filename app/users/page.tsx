// app/users/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { DataTable } from '@/components/business/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  UserCheck, 
  UserX, 
  Mail,
  Calendar,
  Shield
} from 'lucide-react';

export default function UsersPage() {
  // 模拟用户数据
  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: '张三', 
      email: 'zhangsan@example.com', 
      role: '管理员', 
      status: 'active',
      registrationDate: '2023-01-15',
      lastLogin: '2023-06-10'
    },
    { 
      id: 2, 
      name: '李四', 
      email: 'lisi@example.com', 
      role: '编辑', 
      status: 'active',
      registrationDate: '2023-02-20',
      lastLogin: '2023-06-09'
    },
    { 
      id: 3, 
      name: '王五', 
      email: 'wangwu@example.com', 
      role: '用户', 
      status: 'inactive',
      registrationDate: '2023-03-05',
      lastLogin: '2023-05-20'
    },
    { 
      id: 4, 
      name: '赵六', 
      email: 'zhaoliu@example.com', 
      role: '编辑', 
      status: 'active',
      registrationDate: '2023-04-12',
      lastLogin: '2023-06-08'
    },
    { 
      id: 5, 
      name: '钱七', 
      email: 'qianqi@example.com', 
      role: '用户', 
      status: 'banned',
      registrationDate: '2023-05-01',
      lastLogin: '2023-05-15'
    }
  ]);

  // 用户表格列
  const userColumns = [
    { key: 'name', title: '姓名' },
    { key: 'email', title: '邮箱' },
    { key: 'role', title: '角色' },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'active': { label: '活跃', color: 'bg-green-100 text-green-800' },
          'inactive': { label: '未激活', color: 'bg-gray-100 text-gray-800' },
          'banned': { label: '已封禁', color: 'bg-red-100 text-red-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['inactive'];
        return <Badge className={status.color}>{status.label}</Badge>;
      }
    },
    { key: 'registrationDate', title: '注册日期' },
    { key: 'lastLogin', title: '最后登录' }
  ];

  return (
    <PageTemplate
      title="用户管理"
      description="统一管理平台用户、角色和权限的模块"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '用户管理', path: '/users' }
      ]}
      actions={
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          添加用户
        </Button>
      }
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
            <Badge variant="secondary" className="cursor-pointer">管理员</Badge>
            <Badge variant="secondary" className="cursor-pointer">编辑</Badge>
            <Badge variant="secondary" className="cursor-pointer">用户</Badge>
          </div>
        </div>

        {/* 用户表格 */}
        <DataTable
          data={users}
          columns={userColumns}
          actions={(row) => (
            <>
              <DropdownMenuItem onClick={() => console.log('查看用户', row.id)}>
                <UserCheck className="mr-2 h-4 w-4" />
                查看详情
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log('编辑用户', row.id)}>
                <Shield className="mr-2 h-4 w-4" />
                编辑权限
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log('发送邮件', row.id)}>
                <Mail className="mr-2 h-4 w-4" />
                发送邮件
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => {
                  const updatedUsers = users.map(user => 
                    user.id === row.id 
                      ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } 
                      : user
                  );
                  setUsers(updatedUsers);
                }}
              >
                {row.status === 'active' ? (
                  <>
                    <UserX className="mr-2 h-4 w-4" />
                    禁用账户
                  </>
                ) : (
                  <>
                    <UserCheck className="mr-2 h-4 w-4" />
                    启用账户
                  </>
                )}
              </DropdownMenuItem>
            </>
          )}
        />

        {/* 统计信息 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold">{users.length}</div>
            <div className="text-sm text-gray-500">总用户数</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold">
              {users.filter(u => u.status === 'active').length}
            </div>
            <div className="text-sm text-gray-500">活跃用户</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold">
              {users.filter(u => u.role === '管理员').length}
            </div>
            <div className="text-sm text-gray-500">管理员</div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
