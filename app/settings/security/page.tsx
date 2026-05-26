// app/settings/security/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Key, 
  UserCheck, 
  Fingerprint,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  EyeOff
} from 'lucide-react';

export default function SecuritySettingsPage() {
  // 密码策略
  const [passwordPolicy, setPasswordPolicy] = useState({
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    expireDays: 90,
    preventReuse: 5,
    lockoutThreshold: 5,
    lockoutDuration: 15
  });

  // 两步验证
  const [twoFactorAuth, setTwoFactorAuth] = useState({
    enabled: true,
    requiredForAdmins: true,
    requiredForUsers: false,
    methods: ['app', 'sms', 'email']
  });

  // 登录安全
  const [loginSecurity, setLoginSecurity] = useState({
    sessionTimeout: 30,
    concurrentSessions: 3,
    rememberMeDays: 7,
    loginAttempts: 5,
    lockoutDuration: 15,
    ipWhitelist: '',
    ipBlacklist: ''
  });

  // API安全
  const [apiSecurity, setApiSecurity] = useState({
    rateLimit: 1000,
    rateLimitWindow: 'minute',
    apiKeyExpiration: 365,
    requireHttps: true,
    corsOrigins: '',
    allowedMethods: ['GET', 'POST', 'PUT', 'DELETE']
  });

  // 安全日志
  const [securityLogs, setSecurityLogs] = useState([
    { 
      id: 1, 
      type: 'login', 
      user: 'admin', 
      ip: '192.168.1.100', 
      status: 'success', 
      time: '2023-06-10 10:30:25',
      details: '成功登录'
    },
    { 
      id: 2, 
      type: 'login', 
      user: 'user1', 
      ip: '192.168.1.101', 
      status: 'failed', 
      time: '2023-06-10 10:25:18',
      details: '密码错误'
    },
    { 
      id: 3, 
      type: 'password_change', 
      user: 'admin', 
      ip: '192.168.1.100', 
      status: 'success', 
      time: '2023-06-09 15:45:32',
      details: '密码已更改'
    },
    { 
      id: 4, 
      type: 'api_access', 
      user: 'api_user', 
      ip: '192.168.1.102', 
      status: 'success', 
      time: '2023-06-09 14:20:15',
      details: 'API访问成功'
    }
  ]);

  // 保存设置
  const saveSettings = () => {
    // 这里应该调用API保存设置
    alert('安全设置已保存');
  };

  // 重置设置
  const resetSettings = () => {
    // 这里应该重置为默认值
    alert('安全设置已重置');
  };

  // 获取状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 获取状态图标
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <PageTemplate
      title="安全设置"
      description="系统安全配置界面，包含密码策略、两步验证和访问控制"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '系统设置', path: '/settings' },
        { title: '安全设置', path: '/settings/security' }
      ]}
    >
      <div className="space-y-6">
        <Tabs defaultValue="password" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="password">密码策略</TabsTrigger>
            <TabsTrigger value="twofactor">两步验证</TabsTrigger>
            <TabsTrigger value="login">登录安全</TabsTrigger>
            <TabsTrigger value="api">API安全</TabsTrigger>
          </TabsList>
          
          <TabsContent value="password" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="mr-2 h-5 w-5" />
                  密码策略
                </CardTitle>
                <CardDescription>配置系统的密码安全策略</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="minLength">最小长度</Label>
                    <Input
                      id="minLength"
                      type="number"
                      value={passwordPolicy.minLength}
                      onChange={(e) => setPasswordPolicy({...passwordPolicy, minLength: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="expireDays">密码过期天数</Label>
                    <Input
                      id="expireDays"
                      type="number"
                      value={passwordPolicy.expireDays}
                      onChange={(e) => setPasswordPolicy({...passwordPolicy, expireDays: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="preventReuse">防止重复使用次数</Label>
                    <Input
                      id="preventReuse"
                      type="number"
                      value={passwordPolicy.preventReuse}
                      onChange={(e) => setPasswordPolicy({...passwordPolicy, preventReuse: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lockoutThreshold">账户锁定阈值</Label>
                    <Input
                      id="lockoutThreshold"
                      type="number"
                      value={passwordPolicy.lockoutThreshold}
                      onChange={(e) => setPasswordPolicy({...passwordPolicy, lockoutThreshold: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lockoutDuration">锁定持续时间（分钟）</Label>
                    <Input
                      id="lockoutDuration"
                      type="number"
                      value={passwordPolicy.lockoutDuration}
                      onChange={(e) => setPasswordPolicy({...passwordPolicy, lockoutDuration: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>要求大写字母</Label>
                    <p className="text-sm text-gray-500">密码必须包含大写字母</p>
                  </div>
                  <Switch
                    checked={passwordPolicy.requireUppercase}
                    onCheckedChange={(checked) => setPasswordPolicy({...passwordPolicy, requireUppercase: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>要求小写字母</Label>
                    <p className="text-sm text-gray-500">密码必须包含小写字母</p>
                  </div>
                  <Switch
                    checked={passwordPolicy.requireLowercase}
                    onCheckedChange={(checked) => setPasswordPolicy({...passwordPolicy, requireLowercase: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>要求数字</Label>
                    <p className="text-sm text-gray-500">密码必须包含数字</p>
                  </div>
                  <Switch
                    checked={passwordPolicy.requireNumbers}
                    onCheckedChange={(checked) => setPasswordPolicy({...passwordPolicy, requireNumbers: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>要求特殊字符</Label>
                    <p className="text-sm text-gray-500">密码必须包含特殊字符</p>
                  </div>
                  <Switch
                    checked={passwordPolicy.requireSpecialChars}
                    onCheckedChange={(checked) => setPasswordPolicy({...passwordPolicy, requireSpecialChars: checked})}
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
          
          <TabsContent value="twofactor" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserCheck className="mr-2 h-5 w-5" />
                  两步验证
                </CardTitle>
                <CardDescription>配置系统的两步验证设置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>启用两步验证</Label>
                    <p className="text-sm text-gray-500">允许用户使用两步验证</p>
                  </div>
                  <Switch
                    checked={twoFactorAuth.enabled}
                    onCheckedChange={(checked) => setTwoFactorAuth({...twoFactorAuth, enabled: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>管理员必须使用两步验证</Label>
                    <p className="text-sm text-gray-500">要求管理员账户必须使用两步验证</p>
                  </div>
                  <Switch
                    checked={twoFactorAuth.requiredForAdmins}
                    onCheckedChange={(checked) => setTwoFactorAuth({...twoFactorAuth, requiredForAdmins: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>普通用户必须使用两步验证</Label>
                    <p className="text-sm text-gray-500">要求普通用户账户必须使用两步验证</p>
                  </div>
                  <Switch
                    checked={twoFactorAuth.requiredForUsers}
                    onCheckedChange={(checked) => setTwoFactorAuth({...twoFactorAuth, requiredForUsers: checked})}
                  />
                </div>
                
                <div>
                  <Label>验证方法</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="method-app"
                        checked={twoFactorAuth.methods.includes('app')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setTwoFactorAuth({...twoFactorAuth, methods: [...twoFactorAuth.methods, 'app']});
                          } else {
                            setTwoFactorAuth({...twoFactorAuth, methods: twoFactorAuth.methods.filter(m => m !== 'app')});
                          }
                        }}
                        className="mr-2"
                      />
                      <label htmlFor="method-app">认证器应用</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="method-sms"
                        checked={twoFactorAuth.methods.includes('sms')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setTwoFactorAuth({...twoFactorAuth, methods: [...twoFactorAuth.methods, 'sms']});
                          } else {
                            setTwoFactorAuth({...twoFactorAuth, methods: twoFactorAuth.methods.filter(m => m !== 'sms')});
                          }
                        }}
                        className="mr-2"
                      />
                      <label htmlFor="method-sms">短信验证</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="method-email"
                        checked={twoFactorAuth.methods.includes('email')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setTwoFactorAuth({...twoFactorAuth, methods: [...twoFactorAuth.methods, 'email']});
                          } else {
                            setTwoFactorAuth({...twoFactorAuth, methods: twoFactorAuth.methods.filter(m => m !== 'email')});
                          }
                        }}
                        className="mr-2"
                      />
                      <label htmlFor="method-email">邮箱验证</label>
                    </div>
                  </div>
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
          
          <TabsContent value="login" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Fingerprint className="mr-2 h-5 w-5" />
                  登录安全
                </CardTitle>
                <CardDescription>配置系统的登录安全设置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sessionTimeout">会话超时（分钟）</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={loginSecurity.sessionTimeout}
                      onChange={(e) => setLoginSecurity({...loginSecurity, sessionTimeout: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="concurrentSessions">并发会话数</Label>
                    <Input
                      id="concurrentSessions"
                      type="number"
                      value={loginSecurity.concurrentSessions}
                      onChange={(e) => setLoginSecurity({...loginSecurity, concurrentSessions: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rememberMeDays">记住登录天数</Label>
                    <Input
                      id="rememberMeDays"
                      type="number"
                      value={loginSecurity.rememberMeDays}
                      onChange={(e) => setLoginSecurity({...loginSecurity, rememberMeDays: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="loginAttempts">登录尝试次数</Label>
                    <Input
                      id="loginAttempts"
                      type="number"
                      value={loginSecurity.loginAttempts}
                      onChange={(e) => setLoginSecurity({...loginSecurity, loginAttempts: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lockoutDuration">锁定持续时间（分钟）</Label>
                    <Input
                      id="lockoutDuration"
                      type="number"
                      value={loginSecurity.lockoutDuration}
                      onChange={(e) => setLoginSecurity({...loginSecurity, lockoutDuration: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="ipWhitelist">IP白名单（每行一个）</Label>
                  <textarea
                    id="ipWhitelist"
                    className="w-full min-h-[100px] p-2 border rounded-md"
                    value={loginSecurity.ipWhitelist}
                    onChange={(e) => setLoginSecurity({...loginSecurity, ipWhitelist: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="ipBlacklist">IP黑名单（每行一个）</Label>
                  <textarea
                    id="ipBlacklist"
                    className="w-full min-h-[100px] p-2 border rounded-md"
                    value={loginSecurity.ipBlacklist}
                    onChange={(e) => setLoginSecurity({...loginSecurity, ipBlacklist: e.target.value})}
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
          
          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  API安全
                </CardTitle>
                <CardDescription>配置系统的API安全设置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rateLimit">速率限制</Label>
                    <Input
                      id="rateLimit"
                      type="number"
                      value={apiSecurity.rateLimit}
                      onChange={(e) => setApiSecurity({...apiSecurity, rateLimit: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rateLimitWindow">速率限制窗口</Label>
                    <Input
                      id="rateLimitWindow"
                      value={apiSecurity.rateLimitWindow}
                      onChange={(e) => setApiSecurity({...apiSecurity, rateLimitWindow: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="apiKeyExpiration">API密钥过期天数</Label>
                    <Input
                      id="apiKeyExpiration"
                      type="number"
                      value={apiSecurity.apiKeyExpiration}
                      onChange={(e) => setApiSecurity({...apiSecurity, apiKeyExpiration: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>要求HTTPS</Label>
                    <p className="text-sm text-gray-500">API访问必须使用HTTPS</p>
                  </div>
                  <Switch
                    checked={apiSecurity.requireHttps}
                    onCheckedChange={(checked) => setApiSecurity({...apiSecurity, requireHttps: checked})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="corsOrigins">CORS允许的源（每行一个）</Label>
                  <textarea
                    id="corsOrigins"
                    className="w-full min-h-[100px] p-2 border rounded-md"
                    value={apiSecurity.corsOrigins}
                    onChange={(e) => setApiSecurity({...apiSecurity, corsOrigins: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label>允许的HTTP方法</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="method-get"
                        checked={apiSecurity.allowedMethods.includes('GET')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setApiSecurity({...apiSecurity, allowedMethods: [...apiSecurity.allowedMethods, 'GET']});
                          } else {
                            setApiSecurity({...apiSecurity, allowedMethods: apiSecurity.allowedMethods.filter(m => m !== 'GET')});
                          }
                        }}
                        className="mr-2"
                      />
                      <label htmlFor="method-get">GET</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="method-post"
                        checked={apiSecurity.allowedMethods.includes('POST')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setApiSecurity({...apiSecurity, allowedMethods: [...apiSecurity.allowedMethods, 'POST']});
                          } else {
                            setApiSecurity({...apiSecurity, allowedMethods: apiSecurity.allowedMethods.filter(m => m !== 'POST')});
                          }
                        }}
                        className="mr-2"
                      />
                      <label htmlFor="method-post">POST</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="method-put"
                        checked={apiSecurity.allowedMethods.includes('PUT')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setApiSecurity({...apiSecurity, allowedMethods: [...apiSecurity.allowedMethods, 'PUT']});
                          } else {
                            setApiSecurity({...apiSecurity, allowedMethods: apiSecurity.allowedMethods.filter(m => m !== 'PUT')});
                          }
                        }}
                        className="mr-2"
                      />
                      <label htmlFor="method-put">PUT</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="method-delete"
                        checked={apiSecurity.allowedMethods.includes('DELETE')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setApiSecurity({...apiSecurity, allowedMethods: [...apiSecurity.allowedMethods, 'DELETE']});
                          } else {
                            setApiSecurity({...apiSecurity, allowedMethods: apiSecurity.allowedMethods.filter(m => m !== 'DELETE')});
                          }
                        }}
                        className="mr-2"
                      />
                      <label htmlFor="method-delete">DELETE</label>
                    </div>
                  </div>
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
        
        {/* 安全日志 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              安全日志
            </CardTitle>
            <CardDescription>最近的安全事件日志</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityLogs.map(log => (
                <div key={log.id} className="flex items-start p-3 border rounded-lg">
                  <div className="mr-3 mt-1">
                    {getStatusIcon(log.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{log.type === 'login' ? '登录' : log.type === 'password_change' ? '密码更改' : 'API访问'}</div>
                      <Badge className={getStatusStyle(log.status)}>
                        {log.status === 'success' ? '成功' : '失败'}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      用户: {log.user} · IP: {log.ip} · 时间: {log.time}
                    </div>
                    <div className="text-sm mt-1">
                      {log.details}
                    </div>
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
