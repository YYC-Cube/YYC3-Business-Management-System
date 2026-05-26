// app/profile/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  Settings,
  Shield,
  Bell,
  Save,
  Upload,
  Camera,
  Lock,
  Globe,
  Briefcase,
  Award,
  Star
} from 'lucide-react';

export default function ProfilePage() {
  // 用户基本信息
  const [userInfo, setUserInfo] = useState({
    name: '张三',
    email: 'zhangsan@yanyucloud.com',
    phone: '13800138000',
    location: '北京市',
    bio: 'YYC³ 平台产品经理，负责产品规划和用户体验设计。',
    joinDate: '2022-03-15',
    lastLogin: '2023-06-10 10:30'
  });

  // 账户设置
  const [accountSettings, setAccountSettings] = useState({
    language: 'zh-CN',
    timezone: 'Asia/Shanghai',
    theme: 'light',
    notifications: {
      email: true,
      push: true,
      sms: false
    }
  });

  // 隐私设置
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'all',
    activityVisibility: 'connections',
    showEmail: false,
    showPhone: false,
    allowSearch: true
  });

  // 安全设置
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    loginAlerts: true,
    sessionTimeout: 30,
    passwordLastChanged: '2023-05-10'
  });

  // 成就徽章
  const [badges, setBadges] = useState([
    { id: 1, name: '早期用户', description: '2022年3月加入', icon: '🏆' },
    { id: 2, name: '活跃贡献者', description: '积极参与社区讨论', icon: '⭐' },
    { id: 3, name: '产品专家', description: '产品规划核心成员', icon: '🎯' }
  ]);

  // 保存设置
  const saveSettings = () => {
    // 这里应该调用API保存设置
    alert('个人资料已更新');
  };

  return (
    <PageTemplate
      title="个人资料"
      description="用户个人资料和账户设置界面"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '个人资料', path: '/profile' }
      ]}
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* 左侧个人信息卡片 */}
          <div className="md:w-1/3">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="/placeholder-user.jpg" alt={userInfo.name} />
                      <AvatarFallback>{userInfo.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Button variant="ghost" size="sm" className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <h2 className="text-xl font-bold">{userInfo.name}</h2>
                  <p className="text-gray-500">{userInfo.email}</p>
                  
                  <div className="mt-4 w-full">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-500">加入时间</span>
                      <span>{userInfo.joinDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">最后登录</span>
                      <span>{userInfo.lastLogin}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button variant="outline" className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      上传头像
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* 成就徽章 */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  成就徽章
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {badges.map(badge => (
                    <div key={badge.id} className="flex items-center p-2 border rounded-lg">
                      <div className="text-2xl mr-3">{badge.icon}</div>
                      <div>
                        <div className="font-medium">{badge.name}</div>
                        <div className="text-sm text-gray-500">{badge.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* 右侧设置区域 */}
          <div className="md:w-2/3">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">个人资料</TabsTrigger>
                <TabsTrigger value="account">账户</TabsTrigger>
                <TabsTrigger value="privacy">隐私</TabsTrigger>
                <TabsTrigger value="security">安全</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="mr-2 h-5 w-5" />
                      个人信息
                    </CardTitle>
                    <CardDescription>更新您的个人资料和联系信息</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">姓名</Label>
                        <Input
                          id="name"
                          value={userInfo.name}
                          onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">邮箱</Label>
                        <Input
                          id="email"
                          type="email"
                          value={userInfo.email}
                          onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">电话</Label>
                        <Input
                          id="phone"
                          value={userInfo.phone}
                          onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">位置</Label>
                        <Input
                          id="location"
                          value={userInfo.location}
                          onChange={(e) => setUserInfo({...userInfo, location: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="bio">个人简介</Label>
                      <textarea
                        id="bio"
                        className="w-full min-h-[100px] p-2 border rounded-md"
                        value={userInfo.bio}
                        onChange={(e) => setUserInfo({...userInfo, bio: e.target.value})}
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button onClick={saveSettings}>
                        <Save className="mr-2 h-4 w-4" />
                        保存更改
                      </Button>
                      <Button variant="outline">取消</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="account" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="mr-2 h-5 w-5" />
                      账户设置
                    </CardTitle>
                    <CardDescription>管理您的账户偏好设置</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="language">语言</Label>
                      <select
                        id="language"
                        className="w-full p-2 border rounded-md"
                        value={accountSettings.language}
                        onChange={(e) => setAccountSettings({...accountSettings, language: e.target.value})}
                      >
                        <option value="zh-CN">简体中文</option>
                        <option value="en-US">English</option>
                        <option value="ja-JP">日本語</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="timezone">时区</Label>
                      <select
                        id="timezone"
                        className="w-full p-2 border rounded-md"
                        value={accountSettings.timezone}
                        onChange={(e) => setAccountSettings({...accountSettings, timezone: e.target.value})}
                      >
                        <option value="Asia/Shanghai">北京时间 (UTC+8)</option>
                        <option value="America/New_York">纽约时间 (UTC-5)</option>
                        <option value="Europe/London">伦敦时间 (UTC+0)</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label>主题</Label>
                      <div className="flex gap-4 mt-2">
                        <button
                          className={`p-4 border rounded-lg flex flex-col items-center ${
                            accountSettings.theme === 'light' ? 'border-blue-500 bg-blue-50' : ''
                          }`}
                          onClick={() => setAccountSettings({...accountSettings, theme: 'light'})}
                        >
                          <div className="w-10 h-10 bg-white border rounded mb-2"></div>
                          <span>浅色</span>
                        </button>
                        <button
                          className={`p-4 border rounded-lg flex flex-col items-center ${
                            accountSettings.theme === 'dark' ? 'border-blue-500 bg-blue-50' : ''
                          }`}
                          onClick={() => setAccountSettings({...accountSettings, theme: 'dark'})}
                        >
                          <div className="w-10 h-10 bg-gray-800 border rounded mb-2"></div>
                          <span>深色</span>
                        </button>
                        <button
                          className={`p-4 border rounded-lg flex flex-col items-center ${
                            accountSettings.theme === 'system' ? 'border-blue-500 bg-blue-50' : ''
                          }`}
                          onClick={() => setAccountSettings({...accountSettings, theme: 'system'})}
                        >
                          <div className="w-10 h-10 bg-gradient-to-r from-white to-gray-800 border rounded mb-2"></div>
                          <span>跟随系统</span>
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <Label>通知设置</Label>
                      <div className="space-y-3 mt-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">邮件通知</div>
                            <div className="text-sm text-gray-500">接收邮件通知</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={accountSettings.notifications.email}
                            onChange={(e) => setAccountSettings({
                              ...accountSettings, 
                              notifications: {...accountSettings.notifications, email: e.target.checked}
                            })}
                            className="h-4 w-4"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">推送通知</div>
                            <div className="text-sm text-gray-500">接收浏览器推送通知</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={accountSettings.notifications.push}
                            onChange={(e) => setAccountSettings({
                              ...accountSettings, 
                              notifications: {...accountSettings.notifications, push: e.target.checked}
                            })}
                            className="h-4 w-4"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">短信通知</div>
                            <div className="text-sm text-gray-500">接收短信通知</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={accountSettings.notifications.sms}
                            onChange={(e) => setAccountSettings({
                              ...accountSettings, 
                              notifications: {...accountSettings.notifications, sms: e.target.checked}
                            })}
                            className="h-4 w-4"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button onClick={saveSettings}>
                        <Save className="mr-2 h-4 w-4" />
                        保存设置
                      </Button>
                      <Button variant="outline">取消</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="privacy" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="mr-2 h-5 w-5" />
                      隐私设置
                    </CardTitle>
                    <CardDescription>管理您的隐私和可见性设置</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>个人资料可见性</Label>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={privacySettings.profileVisibility}
                        onChange={(e) => setPrivacySettings({...privacySettings, profileVisibility: e.target.value})}
                      >
                        <option value="all">所有人可见</option>
                        <option value="connections">仅联系人可见</option>
                        <option value="only-me">仅自己可见</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label>活动可见性</Label>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={privacySettings.activityVisibility}
                        onChange={(e) => setPrivacySettings({...privacySettings, activityVisibility: e.target.value})}
                      >
                        <option value="all">所有人可见</option>
                        <option value="connections">仅联系人可见</option>
                        <option value="only-me">仅自己可见</option>
                      </select>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">显示邮箱</div>
                          <div className="text-sm text-gray-500">在个人资料中显示邮箱地址</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={privacySettings.showEmail}
                          onChange={(e) => setPrivacySettings({...privacySettings, showEmail: e.target.checked})}
                          className="h-4 w-4"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">显示电话</div>
                          <div className="text-sm text-gray-500">在个人资料中显示电话号码</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={privacySettings.showPhone}
                          onChange={(e) => setPrivacySettings({...privacySettings, showPhone: e.target.checked})}
                          className="h-4 w-4"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">允许搜索</div>
                        <div className="text-sm text-gray-500">允许其他用户通过姓名或邮箱搜索到您</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={privacySettings.allowSearch}
                        onChange={(e) => setPrivacySettings({...privacySettings, allowSearch: e.target.checked})}
                        className="h-4 w-4"
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button onClick={saveSettings}>
                        <Save className="mr-2 h-4 w-4" />
                        保存设置
                      </Button>
                      <Button variant="outline">取消</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lock className="mr-2 h-5 w-5" />
                      安全设置
                    </CardTitle>
                    <CardDescription>管理您的账户安全设置</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">两步验证</div>
                        <div className="text-sm text-gray-500">为您的账户添加额外的安全保护</div>
                      </div>
                      <div className="flex items-center">
                        <Badge className={securitySettings.twoFactorAuth ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {securitySettings.twoFactorAuth ? '已启用' : '未启用'}
                        </Badge>
                        <Button variant="outline" size="sm">
                          {securitySettings.twoFactorAuth ? '管理' : '启用'}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">登录警报</div>
                        <div className="text-sm text-gray-500">当有新登录时发送通知</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={securitySettings.loginAlerts}
                        onChange={(e) => setSecuritySettings({...securitySettings, loginAlerts: e.target.checked})}
                        className="h-4 w-4"
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-medium">会话超时</div>
                          <div className="text-sm text-gray-500">自动退出登录的时间</div>
                        </div>
                        <span>{securitySettings.sessionTimeout} 分钟</span>
                      </div>
                      <input
                        type="range"
                        min="15"
                        max="120"
                        step="15"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">密码最后更改</div>
                          <div className="text-sm text-gray-500">上次更改密码的时间</div>
                        </div>
                        <span>{securitySettings.passwordLastChanged}</span>
                      </div>
                      <Button variant="outline" className="w-full mt-2">
                        更改密码
                      </Button>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button onClick={saveSettings}>
                        <Save className="mr-2 h-4 w-4" />
                        保存设置
                      </Button>
                      <Button variant="outline">取消</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}