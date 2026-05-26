// app/notifications/page.tsx
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
  Bell, 
  Mail, 
  Smartphone, 
  Settings,
  Save,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

export default function NotificationsPage() {
  // 邮件通知设置
  const [emailNotifications, setEmailNotifications] = useState({
    systemUpdates: true,
    securityAlerts: true,
    accountActivity: true,
    marketingEmails: false,
    productUpdates: true,
    communityUpdates: false
  });

  // 推送通知设置
  const [pushNotifications, setPushNotifications] = useState({
    systemUpdates: true,
    securityAlerts: true,
    accountActivity: true,
    mentions: true,
    comments: true,
    likes: false
  });

  // 短信通知设置
  const [smsNotifications, setSmsNotifications] = useState({
    securityAlerts: true,
    accountActivity: false,
    criticalSystemAlerts: true
  });

  // 通知频率设置
  const [notificationFrequency, setNotificationFrequency] = useState({
    digestEmail: 'daily',
    pushFrequency: 'immediate',
    quietHours: {
      enabled: true,
      start: '22:00',
      end: '08:00'
    }
  });

  // 保存设置
  const saveSettings = () => {
    // 这里应该调用API保存设置
    alert('通知设置已保存');
  };

  // 重置设置
  const resetSettings = () => {
    // 这里应该重置为默认值
    alert('通知设置已重置');
  };

  return (
    <PageTemplate
      title="通知设置"
      description="配置系统通知和提醒方式"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '系统设置', path: '/settings' },
        { title: '通知设置', path: '/settings/notifications' }
      ]}
    >
      <div className="space-y-6">
        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="email">邮件通知</TabsTrigger>
            <TabsTrigger value="push">推送通知</TabsTrigger>
            <TabsTrigger value="sms">短信通知</TabsTrigger>
          </TabsList>
          
          <TabsContent value="email" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="mr-2 h-5 w-5" />
                  邮件通知设置
                </CardTitle>
                <CardDescription>配置您希望接收的邮件通知类型</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>系统更新</Label>
                    <p className="text-sm text-gray-500">接收系统更新和维护通知</p>
                  </div>
                  <Switch
                    checked={emailNotifications.systemUpdates}
                    onCheckedChange={(checked) => setEmailNotifications({...emailNotifications, systemUpdates: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>安全警报</Label>
                    <p className="text-sm text-gray-500">接收账户安全相关警报</p>
                  </div>
                  <Switch
                    checked={emailNotifications.securityAlerts}
                    onCheckedChange={(checked) => setEmailNotifications({...emailNotifications, securityAlerts: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>账户活动</Label>
                    <p className="text-sm text-gray-500">接收账户登录和活动通知</p>
                  </div>
                  <Switch
                    checked={emailNotifications.accountActivity}
                    onCheckedChange={(checked) => setEmailNotifications({...emailNotifications, accountActivity: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>营销邮件</Label>
                    <p className="text-sm text-gray-500">接收产品推广和营销邮件</p>
                  </div>
                  <Switch
                    checked={emailNotifications.marketingEmails}
                    onCheckedChange={(checked) => setEmailNotifications({...emailNotifications, marketingEmails: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>产品更新</Label>
                    <p className="text-sm text-gray-500">接收新功能和产品更新通知</p>
                  </div>
                  <Switch
                    checked={emailNotifications.productUpdates}
                    onCheckedChange={(checked) => setEmailNotifications({...emailNotifications, productUpdates: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>社区更新</Label>
                    <p className="text-sm text-gray-500">接收社区活动和讨论通知</p>
                  </div>
                  <Switch
                    checked={emailNotifications.communityUpdates}
                    onCheckedChange={(checked) => setEmailNotifications({...emailNotifications, communityUpdates: checked})}
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
          
          <TabsContent value="push" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="mr-2 h-5 w-5" />
                  推送通知设置
                </CardTitle>
                <CardDescription>配置您希望接收的推送通知类型</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>系统更新</Label>
                    <p className="text-sm text-gray-500">接收系统更新和维护通知</p>
                  </div>
                  <Switch
                    checked={pushNotifications.systemUpdates}
                    onCheckedChange={(checked) => setPushNotifications({...pushNotifications, systemUpdates: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>安全警报</Label>
                    <p className="text-sm text-gray-500">接收账户安全相关警报</p>
                  </div>
                  <Switch
                    checked={pushNotifications.securityAlerts}
                    onCheckedChange={(checked) => setPushNotifications({...pushNotifications, securityAlerts: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>账户活动</Label>
                    <p className="text-sm text-gray-500">接收账户登录和活动通知</p>
                  </div>
                  <Switch
                    checked={pushNotifications.accountActivity}
                    onCheckedChange={(checked) => setPushNotifications({...pushNotifications, accountActivity: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>提及通知</Label>
                    <p className="text-sm text-gray-500">当有人提及您时接收通知</p>
                  </div>
                  <Switch
                    checked={pushNotifications.mentions}
                    onCheckedChange={(checked) => setPushNotifications({...pushNotifications, mentions: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>评论通知</Label>
                    <p className="text-sm text-gray-500">当有人评论您的内容时接收通知</p>
                  </div>
                  <Switch
                    checked={pushNotifications.comments}
                    onCheckedChange={(checked) => setPushNotifications({...pushNotifications, comments: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>点赞通知</Label>
                    <p className="text-sm text-gray-500">当有人点赞您的内容时接收通知</p>
                  </div>
                  <Switch
                    checked={pushNotifications.likes}
                    onCheckedChange={(checked) => setPushNotifications({...pushNotifications, likes: checked})}
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
          
          <TabsContent value="sms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="mr-2 h-5 w-5" />
                  短信通知设置
                </CardTitle>
                <CardDescription>配置您希望接收的短信通知类型</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>安全警报</Label>
                    <p className="text-sm text-gray-500">接收账户安全相关警报</p>
                  </div>
                  <Switch
                    checked={smsNotifications.securityAlerts}
                    onCheckedChange={(checked) => setSmsNotifications({...smsNotifications, securityAlerts: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>账户活动</Label>
                    <p className="text-sm text-gray-500">接收账户登录和活动通知</p>
                  </div>
                  <Switch
                    checked={smsNotifications.accountActivity}
                    onCheckedChange={(checked) => setSmsNotifications({...smsNotifications, accountActivity: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>关键系统警报</Label>
                    <p className="text-sm text-gray-500">接收关键系统故障和警报</p>
                  </div>
                  <Switch
                    checked={smsNotifications.criticalSystemAlerts}
                    onCheckedChange={(checked) => setSmsNotifications({...smsNotifications, criticalSystemAlerts: checked})}
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
        
        {/* 通知频率设置 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              通知频率设置
            </CardTitle>
            <CardDescription>配置通知的发送频率和时间</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="digestEmail">邮件摘要频率</Label>
              <select
                id="digestEmail"
                className="w-full p-2 border rounded-md"
                value={notificationFrequency.digestEmail}
                onChange={(e) => setNotificationFrequency({...notificationFrequency, digestEmail: e.target.value})}
              >
                <option value="realtime">实时</option>
                <option value="hourly">每小时</option>
                <option value="daily">每天</option>
                <option value="weekly">每周</option>
                <option value="never">从不</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="pushFrequency">推送通知频率</Label>
              <select
                id="pushFrequency"
                className="w-full p-2 border rounded-md"
                value={notificationFrequency.pushFrequency}
                onChange={(e) => setNotificationFrequency({...notificationFrequency, pushFrequency: e.target.value})}
              >
                <option value="immediate">立即</option>
                <option value="hourly">每小时</option>
                <option value="daily">每天</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>免打扰时间</Label>
                <p className="text-sm text-gray-500">在指定时间内不接收通知</p>
              </div>
              <Switch
                checked={notificationFrequency.quietHours.enabled}
                onCheckedChange={(checked) => setNotificationFrequency({
                  ...notificationFrequency, 
                  quietHours: {...notificationFrequency.quietHours, enabled: checked}
                })}
              />
            </div>
            
            {notificationFrequency.quietHours.enabled && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quietStart">开始时间</Label>
                  <Input
                    id="quietStart"
                    type="time"
                    value={notificationFrequency.quietHours.start}
                    onChange={(e) => setNotificationFrequency({
                      ...notificationFrequency, 
                      quietHours: {...notificationFrequency.quietHours, start: e.target.value}
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="quietEnd">结束时间</Label>
                  <Input
                    id="quietEnd"
                    type="time"
                    value={notificationFrequency.quietHours.end}
                    onChange={(e) => setNotificationFrequency({
                      ...notificationFrequency, 
                      quietHours: {...notificationFrequency.quietHours, end: e.target.value}
                    })}
                  />
                </div>
              </div>
            )}
            
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
      </div>
    </PageTemplate>
  );
}