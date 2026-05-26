"use client"

import { useState } from "react"
import { 
  Palette, 
  Type, 
  Grid, 
  Layout, 
  Eye, 
  EyeOff, 
  SlidersHorizontal, 
  Copy, 
  ChevronRight,
  Code2,
  AlignJustify,
  Maximize2,
  Minus,
  Plus,
  MoveHorizontal,
  MoveVertical,
  CheckCircle2,
  Info,
  PanelLeft,
  PanelRight
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

import { cn } from "@/lib/utils"

// 本地设计令牌（临时解决方案）
const designTokens = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    neutral: {
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b',
    },
    functional: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    chinese: {
      red: '#c53030',
      orange: '#dd6b20',
      yellow: '#d69e2e',
      green: '#38a169',
      blue: '#3182ce',
      purple: '#805ad5',
      pink: '#d53f8c',
      brown: '#744210',
      gray: '#4a5568',
      black: '#1a202c',
    },
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
    mono: 'Fira Code, monospace',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
  },
  radii: {
    none: '0px',
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  },
  tokens: {
    'color-primary': '#0ea5e9',
    'color-secondary': '#64748b',
    'color-success': '#10b981',
    'color-warning': '#f59e0b',
    'color-error': '#ef4444',
    'color-info': '#3b82f6',
    'font-heading': 'Inter, sans-serif',
    'font-body': 'Inter, sans-serif',
    'font-mono': 'Fira Code, monospace',
    'spacing-xs': '4px',
    'spacing-sm': '8px',
    'spacing-md': '16px',
    'spacing-lg': '24px',
    'spacing-xl': '32px',
    'radius-sm': '4px',
    'radius-md': '6px',
    'radius-lg': '8px',
    'radius-xl': '12px',
    'shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    'shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    'shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
};

// 从本地设计令牌中解构
const { colors, fonts, spacing, radii, shadows, tokens } = designTokens;

const DesignSystemPage = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>("overview")
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    primary: true,
    secondary: false,
    neutral: false,
    functional: false,
    chinese: false,
    typography: false,
    spacing: false,
    radii: false,
    shadows: false,
    tokens: false
  })

  // 切换暗黑模式
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  // 复制到剪贴板功能
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} 已复制到剪贴板`)
  }

  // 切换展开/折叠状态
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  // 渲染颜色示例
  const renderColorExample = (name: string, color: string) => {
    return (
      <div key={name} className="relative rounded-lg overflow-hidden" onClick={() => copyToClipboard(color, name)}>
        <div className="h-20 w-full" style={{ backgroundColor: color }}></div>
        <div className="p-2 bg-background/90 backdrop-blur-sm">
          <p className="text-sm font-mono truncate">{name}</p>
          <p className="text-xs text-muted-foreground font-mono">{color}</p>
        </div>
      </div>
    )
  }

  // 渲染间距示例
  const renderSpacingExample = (name: string, value: string) => {
    return (
      <div key={name} className="rounded-lg border p-3" onClick={() => copyToClipboard(value, name)}>
        <p className="text-sm font-mono">{name}</p>
        <div className="my-2 h-4 bg-primary/20 rounded" style={{ width: value }}></div>
        <p className="text-xs text-muted-foreground font-mono">{value}</p>
      </div>
    )
  }

  // 渲染圆角示例
  const renderRadiusExample = (name: string, value: string) => {
    const numericValue = value.replace('px', '')
    return (
      <div key={name} className="rounded-lg border p-3" onClick={() => copyToClipboard(value, name)}>
        <p className="text-sm font-mono">{name}</p>
        <div className="my-2 h-12 bg-primary/20 mx-auto" style={{ 
          width: '60px', 
          borderRadius: numericValue + 'px' 
        }}></div>
        <p className="text-xs text-muted-foreground font-mono">{value}</p>
      </div>
    )
  }

  // 渲染阴影示例
  const renderShadowExample = (name: string, value: string) => {
    return (
      <div key={name} className="rounded-lg border p-3" onClick={() => copyToClipboard(value, name)}>
        <p className="text-sm font-mono">{name}</p>
        <div className="my-2 h-12 bg-background mx-auto" style={{ 
          width: '80px', 
          boxShadow: value 
        }}></div>
        <p className="text-xs text-muted-foreground font-mono">{value}</p>
      </div>
    )
  }

  // 渲染字体示例
  const renderFontExample = (name: string, value: string, size?: string) => {
    return (
      <div key={name} className="rounded-lg border p-3" onClick={() => copyToClipboard(value, name)}>
        <p className="text-sm font-mono">{name}</p>
        <p 
          className="my-2 font-mono"
          style={{ 
            fontFamily: value, 
            fontSize: size || '16px' 
          }}
        >
          示例文本 ABCabc123
        </p>
        <p className="text-xs text-muted-foreground font-mono">{value}</p>
      </div>
    )
  }

  // 渲染令牌示例
  const renderTokenExample = (name: string, value: string, type: string) => {
    return (
      <div key={name} className="rounded-lg border p-3" onClick={() => copyToClipboard(value, name)}>
        <p className="text-sm font-mono flex justify-between items-center">
          {name}
          <Badge variant="secondary">{type}</Badge>
        </p>
        <p className="text-xs text-muted-foreground font-mono mt-1">{value}</p>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-950 text-gray-100' : 'bg-gradient-to-b from-background to-background/90 text-foreground'}`}>
      {/* 头部 */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-gray-900/80 dark:border-gray-800">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Palette className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">设计系统</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <Switch 
                id="dark-mode" 
                checked={darkMode} 
                onCheckedChange={toggleDarkMode} 
              />
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            </div>
            <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <AlignJustify className="h-5 w-5" />
                  <span className="sr-only">打开菜单</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>设计系统</SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col space-y-4">
                  <Button variant="ghost" className="justify-start" onClick={() => {
                    setActiveTab("overview")
                    setShowMobileMenu(false)
                  }}>
                    <Info className="mr-2 h-4 w-4" />
                    设计系统概览
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={() => {
                    setActiveTab("colors")
                    setShowMobileMenu(false)
                  }}>
                    <Palette className="mr-2 h-4 w-4" />
                    颜色系统
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={() => {
                    setActiveTab("typography")
                    setShowMobileMenu(false)
                  }}>
                    <Type className="mr-2 h-4 w-4" />
                    排版规范
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={() => {
                    setActiveTab("spacing")
                    setShowMobileMenu(false)
                  }}>
                    <Grid className="mr-2 h-4 w-4" />
                    间距规范
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={() => {
                    setActiveTab("radii")
                    setShowMobileMenu(false)
                  }}>
                    <Layout className="mr-2 h-4 w-4" />
                    圆角规范
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={() => {
                    setActiveTab("shadows")
                    setShowMobileMenu(false)
                  }}>
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    阴影规范
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={() => {
                    setActiveTab("tokens")
                    setShowMobileMenu(false)
                  }}>
                    <Code2 className="mr-2 h-4 w-4" />
                    设计令牌
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-6 md:px-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* 侧边导航 (桌面版) */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-20 space-y-1">
              <Button 
                variant={activeTab === "overview" ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveTab("overview")}
              >
                <Info className="mr-2 h-4 w-4" />
                设计系统概览
              </Button>
              <Button 
                variant={activeTab === "colors" ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveTab("colors")}
              >
                <Palette className="mr-2 h-4 w-4" />
                颜色系统
              </Button>
              <Button 
                variant={activeTab === "typography" ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveTab("typography")}
              >
                <Type className="mr-2 h-4 w-4" />
                排版规范
              </Button>
              <Button 
                variant={activeTab === "spacing" ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveTab("spacing")}
              >
                <Grid className="mr-2 h-4 w-4" />
                间距规范
              </Button>
              <Button 
                variant={activeTab === "radii" ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveTab("radii")}
              >
                <Layout className="mr-2 h-4 w-4" />
                圆角规范
              </Button>
              <Button 
                variant={activeTab === "shadows" ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveTab("shadows")}
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                阴影规范
              </Button>
              <Button 
                variant={activeTab === "tokens" ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveTab("tokens")}
              >
                <Code2 className="mr-2 h-4 w-4" />
                设计令牌
              </Button>
            </div>
          </aside>

          {/* 内容区域 */}
          <div className="flex-1">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">设计系统概览</CardTitle>
                    <CardDescription>
                      YYC³ 设计系统是一套完整的UI设计规范和组件库，旨在确保产品界面的一致性和高质量。
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p>
                        本设计系统采用现代UI设计理念，结合中国传统色彩元素，创建了一套既美观又实用的设计语言。
                        系统包含了颜色、排版、间距、圆角、阴影等基本设计元素，以及一套完整的设计令牌，
                        用于确保整个产品的视觉一致性。
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-muted/50 rounded-lg p-4">
                          <h3 className="font-medium mb-2">设计理念</h3>
                          <p className="text-sm text-muted-foreground">
                            简洁、清晰、高效、美观，结合中国传统色彩元素，创造独特的视觉体验。
                          </p>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-4">
                          <h3 className="font-medium mb-2">设计原则</h3>
                          <p className="text-sm text-muted-foreground">
                            一致性、可访问性、分层设计、响应式设计、高效性。
                          </p>
                        </div>
                      </div>
                      <Alert variant="default" className="mt-4">
                        <Info className="mr-2 h-4 w-4" />
                        <AlertDescription>
                          点击左侧菜单或下方卡片可以查看具体的设计规范。
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => setActiveTab("colors")}>
                    <CardHeader className="pb-2">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                        <Palette className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle>颜色系统</CardTitle>
                      <CardDescription>主色调、辅助色、中性色和功能色</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="ghost" className="w-full justify-between">
                        查看详情 <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => setActiveTab("typography")}>
                    <CardHeader className="pb-2">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                        <Type className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle>排版规范</CardTitle>
                      <CardDescription>字体、字号、行高、字重和字间距</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="ghost" className="w-full justify-between">
                        查看详情 <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => setActiveTab("spacing")}>
                    <CardHeader className="pb-2">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                        <Grid className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle>间距规范</CardTitle>
                      <CardDescription>统一的间距单位和间距系统</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="ghost" className="w-full justify-between">
                        查看详情 <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => setActiveTab("radii")}>
                    <CardHeader className="pb-2">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                        <Layout className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle>圆角规范</CardTitle>
                      <CardDescription>统一的圆角定义和使用规则</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="ghost" className="w-full justify-between">
                        查看详情 <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => setActiveTab("shadows")}>
                    <CardHeader className="pb-2">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                        <SlidersHorizontal className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle>阴影规范</CardTitle>
                      <CardDescription>阴影层级和使用规则</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="ghost" className="w-full justify-between">
                        查看详情 <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => setActiveTab("tokens")}>
                    <CardHeader className="pb-2">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                        <Code2 className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle>设计令牌</CardTitle>
                      <CardDescription>完整的设计令牌系统</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="ghost" className="w-full justify-between">
                        查看详情 <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "colors" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">颜色系统</CardTitle>
                    <CardDescription>
                      YYC³ 颜色系统包含主色调、辅助色、中性色、功能色和中国传统色彩。
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* 主色调 */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-lg font-medium">主色调</h3>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 gap-1" 
                            onClick={() => toggleSection("primary")}
                          >
                            {expandedSections.primary ? (
                              <>收起 <Minus className="h-3 w-3" /></>
                            ) : (
                              <>展开 <Plus className="h-3 w-3" /></>
                            )}
                          </Button>
                        </div>
                        {expandedSections.primary && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {Object.entries(colors.primary).map(([name, color]) => renderColorExample(name, color))}
                          </div>
                        )}
                      </div>

                      {/* 辅助色 */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-lg font-medium">辅助色</h3>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 gap-1" 
                            onClick={() => toggleSection("secondary")}
                          >
                            {expandedSections.secondary ? (
                              <>收起 <Minus className="h-3 w-3" /></>
                            ) : (
                              <>展开 <Plus className="h-3 w-3" /></>
                            )}
                          </Button>
                        </div>
                        {expandedSections.secondary && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {Object.entries(colors.secondary).map(([name, color]) => renderColorExample(name, color))}
                          </div>
                        )}
                      </div>

                      {/* 中性色 */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-lg font-medium">中性色</h3>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 gap-1" 
                            onClick={() => toggleSection("neutral")}
                          >
                            {expandedSections.neutral ? (
                              <>收起 <Minus className="h-3 w-3" /></>
                            ) : (
                              <>展开 <Plus className="h-3 w-3" /></>
                            )}
                          </Button>
                        </div>
                        {expandedSections.neutral && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {Object.entries(colors.neutral).map(([name, color]) => renderColorExample(name, color))}
                          </div>
                        )}
                      </div>

                      {/* 功能色 */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-lg font-medium">功能色</h3>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 gap-1" 
                            onClick={() => toggleSection("functional")}
                          >
                            {expandedSections.functional ? (
                              <>收起 <Minus className="h-3 w-3" /></>
                            ) : (
                              <>展开 <Plus className="h-3 w-3" /></>
                            )}
                          </Button>
                        </div>
                        {expandedSections.functional && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {Object.entries(colors.functional).map(([name, color]) => renderColorExample(name, color))}
                          </div>
                        )}
                      </div>

                      {/* 中国传统色彩 */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-lg font-medium">中国传统色彩</h3>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 gap-1" 
                            onClick={() => toggleSection("chinese")}
                          >
                            {expandedSections.chinese ? (
                              <>收起 <Minus className="h-3 w-3" /></>
                            ) : (
                              <>展开 <Plus className="h-3 w-3" /></>
                            )}
                          </Button>
                        </div>
                        {expandedSections.chinese && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {Object.entries(colors.chinese).map(([name, color]) => renderColorExample(name, color))}
                          </div>
                        )}
                      </div>

                      <Alert variant="default" className="mt-4">
                        <Info className="mr-2 h-4 w-4" />
                        <AlertDescription>
                          点击任意颜色卡片可以复制颜色值到剪贴板。
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "typography" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">排版规范</CardTitle>
                    <CardDescription>
                      YYC³ 排版规范定义了字体、字号、行高、字重和字间距。
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-medium">字体</h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 gap-1" 
                          onClick={() => toggleSection("typography")}
                        >
                          {expandedSections.typography ? (
                            <>收起 <Minus className="h-3 w-3" /></>
                          ) : (
                            <>展开 <Plus className="h-3 w-3" /></>
                          )}
                        </Button>
                      </div>
                      {expandedSections.typography && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {Object.entries(fonts).map(([name, value]) => renderFontExample(name, value))}
                        </div>
                      )}

                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-4">字体层级</h3>
                        <div className="space-y-4">
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-3xl font-bold" style={{ fontFamily: fonts.heading }}>大标题</p>
                            <p className="text-sm text-muted-foreground mt-1">font-size: 36px, font-weight: 700, line-height: 1.2</p>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-2xl font-bold" style={{ fontFamily: fonts.heading }}>中标题</p>
                            <p className="text-sm text-muted-foreground mt-1">font-size: 28px, font-weight: 700, line-height: 1.3</p>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-xl font-bold" style={{ fontFamily: fonts.heading }}>小标题</p>
                            <p className="text-sm text-muted-foreground mt-1">font-size: 22px, font-weight: 700, line-height: 1.4</p>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-lg font-medium" style={{ fontFamily: fonts.heading }}>副标题</p>
                            <p className="text-sm text-muted-foreground mt-1">font-size: 18px, font-weight: 500, line-height: 1.4</p>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-base" style={{ fontFamily: fonts.body }}>正文文本</p>
                            <p className="text-sm text-muted-foreground mt-1">font-size: 16px, font-weight: 400, line-height: 1.6</p>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm" style={{ fontFamily: fonts.body }}>辅助文本</p>
                            <p className="text-sm text-muted-foreground mt-1">font-size: 14px, font-weight: 400, line-height: 1.5</p>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-xs" style={{ fontFamily: fonts.body }}>小文本</p>
                            <p className="text-sm text-muted-foreground mt-1">font-size: 12px, font-weight: 400, line-height: 1.4</p>
                          </div>
                        </div>
                      </div>

                      <Alert variant="default" className="mt-4">
                        <Info className="mr-2 h-4 w-4" />
                        <AlertDescription>
                          点击任意字体卡片可以复制字体名称到剪贴板。
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "spacing" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">间距规范</CardTitle>
                    <CardDescription>
                      YYC³ 间距规范定义了统一的间距单位和间距系统。
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-medium">间距单位</h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 gap-1" 
                          onClick={() => toggleSection("spacing")}
                        >
                          {expandedSections.spacing ? (
                            <>收起 <Minus className="h-3 w-3" /></>
                          ) : (
                            <>展开 <Plus className="h-3 w-3" /></>
                          )}
                        </Button>
                      </div>
                      {expandedSections.spacing && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {Object.entries(spacing).map(([name, value]) => renderSpacingExample(name, value))}
                        </div>
                      )}

                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-4">间距使用指南</h3>
                        <div className="space-y-3">
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <h4 className="font-medium">布局间距</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              页面级布局间距通常使用较大的间距值，如 spacing.lg (24px) 或 spacing.xl (32px)。
                            </p>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <h4 className="font-medium">组件间距</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              组件之间的间距通常使用中等间距值，如 spacing.md (16px) 或 spacing.lg (24px)。
                            </p>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <h4 className="font-medium">组件内间距</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              组件内部元素之间的间距通常使用较小的间距值，如 spacing.sm (12px) 或 spacing.md (16px)。
                            </p>
                          </div>
                        </div>
                      </div>

                      <Alert variant="default" className="mt-4">
                        <Info className="mr-2 h-4 w-4" />
                        <AlertDescription>
                          点击任意间距卡片可以复制间距值到剪贴板。
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "radii" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">圆角规范</CardTitle>
                    <CardDescription>
                      YYC³ 圆角规范定义了统一的圆角值和使用规则。
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-medium">圆角值</h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 gap-1" 
                          onClick={() => toggleSection("radii")}
                        >
                          {expandedSections.radii ? (
                            <>收起 <Minus className="h-3 w-3" /></>
                          ) : (
                            <>展开 <Plus className="h-3 w-3" /></>
                          )}
                        </Button>
                      </div>
                      {expandedSections.radii && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {Object.entries(radii).map(([name, value]) => renderRadiusExample(name, value))}
                        </div>
                      )}

                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-4">圆角使用指南</h3>
                        <div className="space-y-3">
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <h4 className="font-medium">小圆角</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              适用于按钮、标签等小型组件，通常使用 radii.sm (4px) 或 radii.md (6px)。
                            </p>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <h4 className="font-medium">中圆角</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              适用于卡片、输入框等中型组件，通常使用 radii.md (6px) 或 radii.lg (8px)。
                            </p>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <h4 className="font-medium">大圆角</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              适用于头像、特殊卡片等需要突出显示的组件，通常使用 radii.xl (12px) 或 radii.2xl (16px)。
                            </p>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <h4 className="font-medium">圆形</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              适用于圆形按钮、圆形图标等，使用 radii.full (9999px)。
                            </p>
                          </div>
                        </div>
                      </div>

                      <Alert variant="default" className="mt-4">
                        <Info className="mr-2 h-4 w-4" />
                        <AlertDescription>
                          点击任意圆角卡片可以复制圆角值到剪贴板。
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "shadows" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">阴影规范</CardTitle>
                    <CardDescription>
                      YYC³ 阴影规范定义了阴影层级和使用规则。
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-medium">阴影层级</h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 gap-1" 
                          onClick={() => toggleSection("shadows")}
                        >
                          {expandedSections.shadows ? (
                            <>收起 <Minus className="h-3 w-3" /></>
                          ) : (
                            <>展开 <Plus className="h-3 w-3" /></>
                          )}
                        </Button>
                      </div>
                      {expandedSections.shadows && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {Object.entries(shadows).map(([name, value]) => renderShadowExample(name, value))}
                        </div>
                      )}

                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-4">阴影使用指南</h3>
                        <div className="space-y-3">
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <h4 className="font-medium">基础阴影</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              适用于卡片、按钮等基础组件，提供轻微的深度感，使用 shadows.md。
                            </p>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <h4 className="font-medium">中级阴影</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              适用于浮层、下拉菜单等需要强调的组件，提供明显的深度感，使用 shadows.lg。
                            </p>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <h4 className="font-medium">高级阴影</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              适用于模态框、对话框等需要强烈突出的组件，提供强烈的深度感，使用 shadows.xl。
                            </p>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <h4 className="font-medium">内阴影</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              适用于输入框、凹陷效果等，提供内凹的视觉效果，使用 shadows.inner。
                            </p>
                          </div>
                        </div>
                      </div>

                      <Alert variant="default" className="mt-4">
                        <Info className="mr-2 h-4 w-4" />
                        <AlertDescription>
                          点击任意阴影卡片可以复制阴影值到剪贴板。
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "tokens" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">设计令牌</CardTitle>
                    <CardDescription>
                      YYC³ 设计令牌系统提供了完整的设计变量定义。
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-medium">设计令牌</h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 gap-1" 
                          onClick={() => toggleSection("tokens")}
                        >
                          {expandedSections.tokens ? (
                            <>收起 <Minus className="h-3 w-3" /></>
                          ) : (
                            <>展开 <Plus className="h-3 w-3" /></>
                          )}
                        </Button>
                      </div>
                      {expandedSections.tokens && (
                        <ScrollArea className="h-[500px] pr-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {Object.entries(tokens).map(([name, value]) => {
                              // 确定令牌类型
                              let tokenType = "other";
                              if (name.startsWith("color")) tokenType = "color";
                              else if (name.startsWith("font")) tokenType = "font";
                              else if (name.startsWith("spacing")) tokenType = "spacing";
                              else if (name.startsWith("radius")) tokenType = "radius";
                              else if (name.startsWith("shadow")) tokenType = "shadow";
                              
                              return renderTokenExample(name, value as string, tokenType);
                            })}
                          </div>
                        </ScrollArea>
                      )}

                      <Alert variant="default" className="mt-4">
                        <Info className="mr-2 h-4 w-4" />
                        <AlertDescription>
                          点击任意令牌卡片可以复制令牌值到剪贴板。设计令牌是连接设计和开发的桥梁，
                          确保了整个产品的视觉一致性。
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="border-t mt-12 py-6 md:mt-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              <span className="font-medium">YYC³ 设计系统</span>
            </div>
            <div className="text-sm text-muted-foreground">
              版本 1.0.0 · 最后更新于 {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default DesignSystemPage
