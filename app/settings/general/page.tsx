// app/settings/general/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Save, 
  RefreshCw,
  Globe,
  Mail,
  Bell,
  Shield,
  Palette,
  Database,
  Users
} from 'lucide-react';

export default function GeneralSettingsPage() {
  // 系统基本信息
  const [systemInfo, setSystemInfo] = useState({
    siteName: 'YYC³',
    siteUrl: 'https://yanyucloud.com',
    adminEmail: 'admin@yanyucloud.com',
    timezone: 'Asia/Shanghai',
    language: 'zh-CN',
    description: 'YYC³ - 企业级云平台解决方案'
  });

  // 系统设置
  const [systemSettings, setSystemSettings] = useState({
    allowRegistration: true,
    emailVerification: true,
    defaultUserRole: 'user',
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    requireSpecialChars: true
  });

  // 邮件设置
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.yanyucloud.com',
    smtpPort: 587,
    smtpUsername: 'noreply@yanyucloud.com',
    smtpPassword: '********',
    encryption: 'tls',
    fromName: 'YYC³',
    fromEmail: 'noreply@yanyucloud.com'
  });

  // 通知设置
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    systemAlerts: true,
    securityAlerts: true,
    updateNotifications: true,
    marketingEmails: false
  });

  // 保存设置
  const saveSettings = () => {
    // 这里应该调用API保存设置
    alert('设置已保存');
  };

  // 重置设置
  const resetSettings = () => {
    // 这里应该重置为默认值
    alert('设置已重置');
  };

  return (
    <PageTemplate
      title="常规设置"
      description="系统常规设置界面，包含站点信息、系统配置和邮件设置"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '系统设置', path: '/settings' },
        { title: '常规设置', path: '/settings/general' }
      ]}
    >
      <div className="space-y-6">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">常规</TabsTrigger>
            <TabsTrigger value="system">系统</TabsTrigger>
            <TabsTrigger value="email">邮件</TabsTrigger>
            <TabsTrigger value="notifications">通知</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="mr-2 h-5 w-5" />
                  站点信息
                </CardTitle>
                <CardDescription>配置站点的基本信息</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="siteName">站点名称</Label>
                    <Input
                      id="siteName"
                      value={systemInfo.siteName}
                      onChange={(e) => setSystemInfo({...systemInfo, siteName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="siteUrl">站点URL</Label>
                    <Input
                      id="siteUrl"
                      value={systemInfo.siteUrl}
                      onChange={(e) => setSystemInfo({...systemInfo, siteUrl: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="adminEmail">管理员邮箱</Label>
                    <Input
                      id="adminEmail"
                      type="email"
                      value={systemInfo.adminEmail}
                      onChange={(e) => setSystemInfo({...systemInfo, adminEmail: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="timezone">时区</Label>
                    <Input
                      id="timezone"
                      value={systemInfo.timezone}
                      onChange={(e) => setSystemInfo({...systemInfo, timezone: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="language">默认语言</Label>
                    <Input
                      id="language"
                      value={systemInfo.language}
                      onChange={(e) => setSystemInfo({...systemInfo, language: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">站点描述</Label>
                  <Input
                    id="description"
                    value={systemInfo.description}
                    onChange={(e) => setSystemInfo({...systemInfo, description: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  系统配置
                </CardTitle>
                <CardDescription>配置系统的基本设置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>允许用户注册</Label>
                    <p className="text-sm text-gray-500">允许新用户自行注册账户</p>
                  </div>
                  <Switch
                    checked={systemSettings.allowRegistration}
                    onCheckedChange={(checked) => setSystemSettings({...systemSettings, allowRegistration: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>邮箱验证</Label>
                    <p className="text-sm text-gray-500">新用户注册后需要验证邮箱</p>
                  </div>
                  <Switch
                    checked={systemSettings.emailVerification}
                    onCheckedChange={(checked) => setSystemSettings({...systemSettings, emailVerification: checked})}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="defaultUserRole">默认用户角色</Label>
                    <Input
                      id="defaultUserRole"
                      value={systemSettings.defaultUserRole}
                      onChange={(e) => setSystemSettings({...systemSettings, defaultUserRole: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sessionTimeout">会话超时（分钟）</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={systemSettings.sessionTimeout}
                      onChange={(e) => setSystemSettings({...systemSettings, sessionTimeout: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxLoginAttempts">最大登录尝试次数</Label>
                    <Input
                      id="maxLoginAttempts"
                      type="number"
                      value={systemSettings.maxLoginAttempts}
                      onChange={(e) => setSystemSettings({...systemSettings, maxLoginAttempts: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="passwordMinLength">密码最小长度</Label>
                    <Input
                      id="passwordMinLength"
                      type="number"
                      value={systemSettings.passwordMinLength}
                      onChange={(e) => setSystemSettings({...systemSettings, passwordMinLength: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>密码必须包含特殊字符</Label>
                    <p className="text-sm text-gray-500">要求用户密码包含特殊字符</p>
                  </div>
                  <Switch
                    checked={systemSettings.requireSpecialChars}
                    onCheckedChange={(checked) => setSystemSettings({...systemSettings, requireSpecialChars: checked})}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="email" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="mr-2 h-5 w-5" />
                  邮件设置
                </CardTitle>
                <CardDescription>配置系统的邮件发送设置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="smtpHost">SMTP服务器</Label>
                    <Input
                      id="smtpHost"
                      value={emailSettings.smtpHost}
                      onChange={(e) => setEmailSettings({...emailSettings, smtpHost: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtpPort">SMTP端口</Label>
                    <Input
                      id="smtpPort"
                      type="number"
                      value={emailSettings.smtpPort}
                      onChange={(e) => setEmailSettings({...emailSettings, smtpPort: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtpUsername">SMTP用户名</Label>
                    <Input
                      id="smtpUsername"
                      value={emailSettings.smtpUsername}
                      onChange={(e) => setEmailSettings({...emailSettings, smtpUsername: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtpPassword">SMTP密码</Label>
                    <Input
                      id="smtpPassword"
                      type="password"
                      value={emailSettings.smtpPassword}
                      onChange={(e) => setEmailSettings({...emailSettings, smtpPassword: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="encryption">加密方式</Label>
                    <Input
                      id="encryption"
                      value={emailSettings.encryption}
                      onChange={(e) => setEmailSettings({...emailSettings, encryption: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fromName">发件人名称</Label>
                    <Input
                      id="fromName"
                      value={emailSettings.fromName}
                      onChange={(e) => setEmailSettings({...emailSettings, fromName: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="fromEmail">发件人邮箱</Label>
                  <Input
                    id="fromEmail"
                    type="email"
                    value={emailSettings.fromEmail}
                    onChange={(e) => setEmailSettings({...emailSettings, fromEmail: e.target.value})}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={saveSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    保存设置
                  </Button>
                  <Button variant="outline" onClick={resetSettings}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    重置设置
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="mr-2 h-5 w-5" />
                  通知设置
                </CardTitle>
                <CardDescription>配置系统通知和提醒</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>邮件通知</Label>
                    <p className="text-sm text-gray-500">通过邮件发送系统通知</p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>推送通知</Label>
                    <p className="text-sm text-gray-500">通过浏览器推送通知</p>
                  </div>
                  <Switch
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, pushNotifications: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>系统警报</Label>
                    <p className="text-sm text-gray-500">接收系统错误和警报通知</p>
                  </div>
                  <Switch
                    checked={notificationSettings.systemAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, systemAlerts: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>安全警报</Label>
                    <p className="text-sm text-gray-500">接收安全相关警报</p>
                  </div>
                  <Switch
                    checked={notificationSettings.securityAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, securityAlerts: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>更新通知</Label>
                    <p className="text-sm text-gray-500">接收系统更新通知</p>
                  </div>
                  <Switch
                    checked={notificationSettings.updateNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, updateNotifications: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>营销邮件</Label>
                    <p className="text-sm text-gray-500">接收产品更新和营销信息</p>
                  </div>
                  <Switch
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, marketingEmails: checked})}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={saveSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    保存设置
                  </Button>
                  <Button variant="outline" onClick={resetSettings}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    重置设置
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTemplate>
  );
}
