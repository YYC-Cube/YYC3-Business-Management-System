// app/appearance/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Palette, 
  Layout, 
  Type, 
  Save,
  RefreshCw,
  Monitor,
  Smartphone,
  Sun,
  Moon
} from 'lucide-react';

export default function AppearancePage() {
  // 主题设置
  const [themeSettings, setThemeSettings] = useState({
    mode: 'light',
    primaryColor: '#3b82f6',
    secondaryColor: '#64748b',
    accentColor: '#8b5cf6',
    borderRadius: '0.5rem'
  });

  // 布局设置
  const [layoutSettings, setLayoutSettings] = useState({
    sidebarPosition: 'left',
    sidebarWidth: '240px',
    topbarHeight: '60px',
    contentPadding: '1.5rem',
    compactMode: false
  });

  // 字体设置
  const [fontSettings, setFontSettings] = useState({
    fontFamily: 'Inter',
    fontSize: '14px',
    lineHeight: '1.5',
    fontWeight: '400'
  });

  // 响应式设置
  const [responsiveSettings, setResponsiveSettings] = useState({
    mobileLayout: 'stacked',
    tabletBreakpoint: '768px',
    mobileBreakpoint: '480px'
  });

  // 保存设置
  const saveSettings = () => {
    // 这里应该调用API保存设置
    alert('外观设置已保存');
  };

  // 重置设置
  const resetSettings = () => {
    // 这里应该重置为默认值
    alert('外观设置已重置');
  };

  return (
    <PageTemplate
      title="外观设置"
      description="自定义系统外观和布局"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '系统设置', path: '/settings' },
        { title: '外观设置', path: '/settings/appearance' }
      ]}
    >
      <div className="space-y-6">
        <Tabs defaultValue="theme" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="theme">主题</TabsTrigger>
            <TabsTrigger value="layout">布局</TabsTrigger>
            <TabsTrigger value="typography">字体</TabsTrigger>
            <TabsTrigger value="responsive">响应式</TabsTrigger>
          </TabsList>
          
          <TabsContent value="theme" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="mr-2 h-5 w-5" />
                  主题设置
                </CardTitle>
                <CardDescription>自定义系统主题和颜色</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>主题模式</Label>
                  <div className="flex gap-4 mt-2">
                    <button
                      className={`p-4 border rounded-lg flex flex-col items-center ${
                        themeSettings.mode === 'light' ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                      onClick={() => setThemeSettings({...themeSettings, mode: 'light'})}
                    >
                      <Sun className="h-6 w-6 mb-2" />
                      <span>浅色模式</span>
                    </button>
                    <button
                      className={`p-4 border rounded-lg flex flex-col items-center ${
                        themeSettings.mode === 'dark' ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                      onClick={() => setThemeSettings({...themeSettings, mode: 'dark'})}
                    >
                      <Moon className="h-6 w-6 mb-2" />
                      <span>深色模式</span>
                    </button>
                    <button
                      className={`p-4 border rounded-lg flex flex-col items-center ${
                        themeSettings.mode === 'system' ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                      onClick={() => setThemeSettings({...themeSettings, mode: 'system'})}
                    >
                      <Monitor className="h-6 w-6 mb-2" />
                      <span>跟随系统</span>
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="primaryColor">主色调</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="color"
                        id="primaryColor"
                        value={themeSettings.primaryColor}
                        onChange={(e) => setThemeSettings({...themeSettings, primaryColor: e.target.value})}
                        className="w-10 h-10 p-1 border rounded"
                      />
                      <Input
                        value={themeSettings.primaryColor}
                        onChange={(e) => setThemeSettings({...themeSettings, primaryColor: e.target.value})}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="secondaryColor">次要色调</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="color"
                        id="secondaryColor"
                        value={themeSettings.secondaryColor}
                        onChange={(e) => setThemeSettings({...themeSettings, secondaryColor: e.target.value})}
                        className="w-10 h-10 p-1 border rounded"
                      />
                      <Input
                        value={themeSettings.secondaryColor}
                        onChange={(e) => setThemeSettings({...themeSettings, secondaryColor: e.target.value})}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="accentColor">强调色</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="color"
                        id="accentColor"
                        value={themeSettings.accentColor}
                        onChange={(e) => setThemeSettings({...themeSettings, accentColor: e.target.value})}
                        className="w-10 h-10 p-1 border rounded"
                      />
                      <Input
                        value={themeSettings.accentColor}
                        onChange={(e) => setThemeSettings({...themeSettings, accentColor: e.target.value})}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="borderRadius">圆角大小</Label>
                    <select
                      id="borderRadius"
                      className="w-full p-2 border rounded-md mt-2"
                      value={themeSettings.borderRadius}
                      onChange={(e) => setThemeSettings({...themeSettings, borderRadius: e.target.value})}
                    >
                      <option value="0">无圆角</option>
                      <option value="0.25rem">小圆角</option>
                      <option value="0.5rem">中等圆角</option>
                      <option value="0.75rem">大圆角</option>
                      <option value="1rem">超大圆角</option>
                    </select>
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
          
          <TabsContent value="layout" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Layout className="mr-2 h-5 w-5" />
                  布局设置
                </CardTitle>
                <CardDescription>自定义系统布局和组件排列</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>侧边栏位置</Label>
                  <div className="flex gap-4 mt-2">
                    <button
                      className={`p-4 border rounded-lg flex flex-col items-center ${
                        layoutSettings.sidebarPosition === 'left' ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                      onClick={() => setLayoutSettings({...layoutSettings, sidebarPosition: 'left'})}
                    >
                      <div className="w-16 h-10 bg-gray-200 rounded mb-2"></div>
                      <span>左侧</span>
                    </button>
                    <button
                      className={`p-4 border rounded-lg flex flex-col items-center ${
                        layoutSettings.sidebarPosition === 'right' ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                      onClick={() => setLayoutSettings({...layoutSettings, sidebarPosition: 'right'})}
                    >
                      <div className="w-16 h-10 bg-gray-200 rounded mb-2"></div>
                      <span>右侧</span>
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sidebarWidth">侧边栏宽度</Label>
                    <select
                      id="sidebarWidth"
                      className="w-full p-2 border rounded-md mt-2"
                      value={layoutSettings.sidebarWidth}
                      onChange={(e) => setLayoutSettings({...layoutSettings, sidebarWidth: e.target.value})}
                    >
                      <option value="200px">窄 (200px)</option>
                      <option value="240px">标准 (240px)</option>
                      <option value="280px">宽 (280px)</option>
                      <option value="320px">超宽 (320px)</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="topbarHeight">顶部栏高度</Label>
                    <select
                      id="topbarHeight"
                      className="w-full p-2 border rounded-md mt-2"
                      value={layoutSettings.topbarHeight}
                      onChange={(e) => setLayoutSettings({...layoutSettings, topbarHeight: e.target.value})}
                    >
                      <option value="50px">矮 (50px)</option>
                      <option value="60px">标准 (60px)</option>
                      <option value="70px">高 (70px)</option>
                      <option value="80px">超高 (80px)</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="contentPadding">内容内边距</Label>
                    <select
                      id="contentPadding"
                      className="w-full p-2 border rounded-md mt-2"
                      value={layoutSettings.contentPadding}
                      onChange={(e) => setLayoutSettings({...layoutSettings, contentPadding: e.target.value})}
                    >
                      <option value="1rem">小 (1rem)</option>
                      <option value="1.5rem">标准 (1.5rem)</option>
                      <option value="2rem">大 (2rem)</option>
                      <option value="2.5rem">超大 (2.5rem)</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>紧凑模式</Label>
                    <p className="text-sm text-gray-500">使用更紧凑的布局和更小的间距</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={layoutSettings.compactMode}
                    onChange={(e) => setLayoutSettings({...layoutSettings, compactMode: e.target.checked})}
                    className="h-4 w-4"
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
          
          <TabsContent value="typography" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Type className="mr-2 h-5 w-5" />
                  字体设置
                </CardTitle>
                <CardDescription>自定义系统字体和排版</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fontFamily">字体族</Label>
                    <select
                      id="fontFamily"
                      className="w-full p-2 border rounded-md mt-2"
                      value={fontSettings.fontFamily}
                      onChange={(e) => setFontSettings({...fontSettings, fontFamily: e.target.value})}
                    >
                      <option value="Inter">Inter</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Open Sans">Open Sans</option>
                      <option value="Lato">Lato</option>
                      <option value="Montserrat">Montserrat</option>
                      <option value="Poppins">Poppins</option>
                      <option value="system">系统默认</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="fontSize">基础字体大小</Label>
                    <select
                      id="fontSize"
                      className="w-full p-2 border rounded-md mt-2"
                      value={fontSettings.fontSize}
                      onChange={(e) => setFontSettings({...fontSettings, fontSize: e.target.value})}
                    >
                      <option value="12px">小 (12px)</option>
                      <option value="14px">标准 (14px)</option>
                      <option value="16px">大 (16px)</option>
                      <option value="18px">超大 (18px)</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="lineHeight">行高</Label>
                    <select
                      id="lineHeight"
                      className="w-full p-2 border rounded-md mt-2"
                      value={fontSettings.lineHeight}
                      onChange={(e) => setFontSettings({...fontSettings, lineHeight: e.target.value})}
                    >
                      <option value="1.2">紧凑 (1.2)</option>
                      <option value="1.4">标准 (1.4)</option>
                      <option value="1.5">舒适 (1.5)</option>
                      <option value="1.6">宽松 (1.6)</option>
                      <option value="1.8">超宽松 (1.8)</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="fontWeight">字体粗细</Label>
                    <select
                      id="fontWeight"
                      className="w-full p-2 border rounded-md mt-2"
                      value={fontSettings.fontWeight}
                      onChange={(e) => setFontSettings({...fontSettings, fontWeight: e.target.value})}
                    >
                      <option value="300">细体 (300)</option>
                      <option value="400">常规 (400)</option>
                      <option value="500">中等 (500)</option>
                      <option value="600">半粗 (600)</option>
                      <option value="700">粗体 (700)</option>
                    </select>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="mb-2 font-medium">字体预览</div>
                  <div style={{ 
                    fontFamily: fontSettings.fontFamily, 
                    fontSize: fontSettings.fontSize,
                    lineHeight: fontSettings.lineHeight,
                    fontWeight: fontSettings.fontWeight
                  }}>
                    <p>这是正文文本的预览效果。YYC³ 是一个企业级云平台解决方案，提供全面的服务和功能。</p>
                    <h3 className="text-lg font-semibold mt-2">这是标题文本的预览效果</h3>
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
          
          <TabsContent value="responsive" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="mr-2 h-5 w-5" />
                  响应式设置
                </CardTitle>
                <CardDescription>配置不同设备上的布局和行为</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>移动设备布局</Label>
                  <div className="flex gap-4 mt-2">
                    <button
                      className={`p-4 border rounded-lg flex flex-col items-center ${
                        responsiveSettings.mobileLayout === 'stacked' ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                      onClick={() => setResponsiveSettings({...responsiveSettings, mobileLayout: 'stacked'})}
                    >
                      <div className="w-10 h-16 bg-gray-200 rounded mb-2"></div>
                      <span>堆叠布局</span>
                    </button>
                    <button
                      className={`p-4 border rounded-lg flex flex-col items-center ${
                        responsiveSettings.mobileLayout === 'sidebar' ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                      onClick={() => setResponsiveSettings({...responsiveSettings, mobileLayout: 'sidebar'})}
                    >
                      <div className="flex gap-1 mb-2">
                        <div className="w-3 h-16 bg-gray-200 rounded"></div>
                        <div className="w-10 h-16 bg-gray-200 rounded"></div>
                      </div>
                      <span>侧边栏布局</span>
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tabletBreakpoint">平板设备断点</Label>
                    <select
                      id="tabletBreakpoint"
                      className="w-full p-2 border rounded-md mt-2"
                      value={responsiveSettings.tabletBreakpoint}
                      onChange={(e) => setResponsiveSettings({...responsiveSettings, tabletBreakpoint: e.target.value})}
                    >
                      <option value="640px">小 (640px)</option>
                      <option value="768px">标准 (768px)</option>
                      <option value="896px">大 (896px)</option>
                      <option value="1024px">超大 (1024px)</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="mobileBreakpoint">移动设备断点</Label>
                    <select
                      id="mobileBreakpoint"
                      className="w-full p-2 border rounded-md mt-2"
                      value={responsiveSettings.mobileBreakpoint}
                      onChange={(e) => setResponsiveSettings({...responsiveSettings, mobileBreakpoint: e.target.value})}
                    >
                      <option value="360px">小 (360px)</option>
                      <option value="480px">标准 (480px)</option>
                      <option value="600px">大 (600px)</option>
                      <option value="768px">超大 (768px)</option>
                </select>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="mb-2 font-medium">响应式预览</div>
                  <div className="flex gap-4">
                    <div className="flex-1 border rounded-lg p-2">
                      <div className="text-center text-sm mb-2">桌面</div>
                      <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
                        <Monitor className="h-8 w-8 text-gray-400" />
                      </div>
                    </div>
                    <div className="flex-1 border rounded-lg p-2">
                      <div className="text-center text-sm mb-2">平板</div>
                      <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
                        <div className="w-12 h-16 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                    <div className="flex-1 border rounded-lg p-2">
                      <div className="text-center text-sm mb-2">手机</div>
                      <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
                        <Smartphone className="h-8 w-8 text-gray-400" />
                      </div>
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
      </div>
    </PageTemplate>
  );
}