"use client"

import { Activity, BarChart3, BellRing, BookOpen, Brain, Briefcase, Building, Calendar, ClipboardList, Cloud, Code, Cpu, Database, FileBarChart, FileText, FolderOpen, GitBranch, Home, ImageIcon, Lock, Menu, MessageSquare, Newspaper, Package, Palette, PieChart, Rocket, Search, Settings, Shield, Sliders, Smartphone, Tags, Target, TrendingUp, User, UserCheck, UserX, Users, Wrench, Zap } from 'lucide-react'
import { useState } from "react"

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

import { AnimatedContainer, FloatingElement } from "./components/design-system/animation-system"
import { EnhancedButton } from "./components/design-system/enhanced-button-system"
import { EnhancedCard } from "./components/design-system/enhanced-card-system"
import { HeaderActions } from "./components/design-system/header-actions"
import { LogoEnhanced } from "./components/design-system/logo-enhanced"
import {
  ActionsContainer,
  ContentContainer,
  FooterContainer,
  HeaderContainer,
  LogoContainer,
  MainContentContainer,
  NavigationContainer,
  ResponsiveContainer,
  SearchContainer,
  SidebarContainer,
} from "./components/design-system/responsive-layout"
import { ScrollableNavigation } from "./components/design-system/scrollable-navigation"
import { SeasonalControls } from "./components/design-system/seasonal-controls"
import { SeasonalTheme, useSeasonalTheme } from "./components/design-system/seasonal-themes"
import { SoundButton, SoundProvider, useSound } from "./components/design-system/sound-system"

// 导入数据中心组件
import { CollaborationEngine } from "./components/data-center/collaboration-engine"
import { DynamicDataCenter } from "./components/data-center/dynamic-data-center"
import { WeChatIntegration } from "./components/data-center/wechat-integration"

import { CurrentStatusAnalysis } from "./components/development-analysis/current-status-analysis"
import { DevelopmentAnalysisReport } from "./components/development-analysis/development-analysis-report"
import { DevelopmentRoadmap } from "./components/development-analysis/development-roadmap"
import { TechnicalSpecifications } from "./components/development-analysis/technical-specifications"

// 导入项目管理组件
import { AgileWorkflow } from "./components/project-management/agile-workflow"
import { DevelopmentExecution } from "./components/project-management/development-execution"

// 导入DevOps组件
import { CICDDashboard } from "./components/devops/ci-cd-dashboard"

// 导入用户管理组件
import { UserList } from "./components/user-management/user-list"

// 导入AI引擎组件
import { AIDashboard } from "./components/ai-engine/ai-dashboard"

const menuItems = [
  {
    title: "数据中心",
    icon: Home,
    href: "/dashboard",
  },
  {
    title: "用户管理",
    icon: Users,
    children: [
      { title: "用户列表", icon: Users, href: "/users" },
      { title: "角色权限", icon: Shield, href: "/roles" },
      { title: "封禁管理", icon: UserX, href: "/bans" },
    ],
  },
  {
    title: "内容管理",
    icon: FileText,
    children: [
      { title: "文章管理", icon: Newspaper, href: "/articles" },
      { title: "自媒体库", icon: ImageIcon, href: "/media" },
      { title: "分类管理", icon: Tags, href: "/categories" },
      { title: "推广营销", icon: TrendingUp, href: "/marketing" },
    ],
  },
  {
    title: "数据分析",
    icon: BarChart3,
    children: [
      { title: "数据概览", icon: PieChart, href: "/analytics" },
      { title: "报表中心", icon: FileBarChart, href: "/reports" },
      { title: "实时监控", icon: Activity, href: "/monitoring" },
    ],
  },
  {
    title: "智能引擎",
    icon: Brain,
    children: [
      { title: "AI 智能", icon: Cpu, href: "/ai" },
      { title: "存储管理", icon: Database, href: "/storage" },
      { title: "开发环境", icon: Code, href: "/development" },
      { title: "知识智库", icon: BookOpen, href: "/knowledge" },
      { title: "文件管理", icon: FolderOpen, href: "/files" },
      { title: "云端同步", icon: Cloud, href: "/sync" },
    ],
  },
  {
    title: "商务功能",
    icon: Briefcase,
    children: [
      { title: "商务管理", icon: Building, href: "/business" },
      { title: "ERP系统", icon: Package, href: "/erp" },
      { title: "CRM客户", icon: UserCheck, href: "/crm" },
      { title: "技术平台", icon: Wrench, href: "/platform" },
      { title: "API管理", icon: Code, href: "/api" },
      { title: "移动应用", icon: Smartphone, href: "/mobile" },
      { title: "实时通讯", icon: MessageSquare, href: "/chat" },
    ],
  },
  {
    title: "系统设置",
    icon: Settings,
    children: [
      { title: "常规设置", icon: Sliders, href: "/settings/general" },
      { title: "安全设置", icon: Lock, href: "/settings/security" },
      { title: "通知设置", icon: BellRing, href: "/settings/notifications" },
      { title: "外观设置", icon: Palette, href: "/settings/appearance" },
    ],
  },
  {
    title: "项目管理",
    icon: Target,
    children: [
      { title: "开发执行", icon: Zap, href: "/project-execution" },
      { title: "敏捷工作流", icon: GitBranch, href: "/agile-workflow" },
      { title: "CI/CD流水线", icon: Rocket, href: "/ci-cd-pipeline" },
      { title: "开发路线图", icon: Calendar, href: "/roadmap" },
      { title: "技术规范", icon: Code, href: "/specifications" },
      { title: "现状分析", icon: ClipboardList, href: "/status-analysis" },
      { title: "分析报告", icon: FileText, href: "/analysis-report" },
    ],
  },
  {
    title: "个人资料",
    icon: User,
    href: "/profile",
  },
]

function AdminDashboardContent() {
  const [activeMenu, setActiveMenu] = useState("AI 智能")
  const [openMenus, setOpenMenus] = useState<string[]>(["智能引擎"])
  const seasonalTheme = useSeasonalTheme()
  const season = seasonalTheme?.season || "spring"
  const autoDetect = seasonalTheme?.autoDetect || false
  const changeSeason = seasonalTheme?.changeSeason || (() => { })
  const enableAutoDetect = seasonalTheme?.enableAutoDetect || ((_enabled: boolean) => { })
  const soundHook = useSound()
  const playSound = soundHook?.playSound || (() => { })

  const toggleMenu = (title: string) => {
    if (!title) return
    playSound("click")
    setOpenMenus((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const handleMenuClick = (title: string) => {
    if (!title) return
    playSound("click")
    setActiveMenu(title)

    // 如果点击的是子菜单项，自动展开对应的父菜单
    const parentMenu = menuItems.find((item) => item.children?.some((child) => child.title === title))
    if (parentMenu && !openMenus.includes(parentMenu.title)) {
      setOpenMenus((prev) => [...prev, parentMenu.title])
    }
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo区域 */}
      <LogoContainer>
        <AnimatedContainer animation="slideDown">
          <LogoEnhanced size="sm" variant="full" layout="vertical" animated />
        </AnimatedContainer>
      </LogoContainer>

      {/* 导航菜单 */}
      <NavigationContainer>
        <ScrollableNavigation
          menuItems={menuItems}
          activeMenu={activeMenu}
          openMenus={openMenus}
          onMenuClick={handleMenuClick}
          onToggleMenu={toggleMenu}
        />
      </NavigationContainer>

      {/* Footer */}
      <FooterContainer>
        <AnimatedContainer animation="slideUp">
          <div className="text-xs text-secondary-500">
            <p className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent font-medium">
              万象归元于云枢
            </p>
            <p className="mt-1">深栈智启新纪元</p>
          </div>
        </AnimatedContainer>
      </FooterContainer>
    </div>
  )

  // 根据当前菜单渲染不同的内容
  const renderContent = () => {
    switch (activeMenu) {
      case "数据中心":
        return <DynamicDataCenter />
      case "实时协作":
        return <CollaborationEngine />
      case "微信集成":
        return <WeChatIntegration />
      case "开发执行":
        return <DevelopmentExecution />
      case "敏捷工作流":
        return <AgileWorkflow />
      case "CI/CD流水线":
        return <CICDDashboard />
      case "开发路线图":
        return <DevelopmentRoadmap />
      case "技术规范":
        return <TechnicalSpecifications />
      case "现状分析":
        return <CurrentStatusAnalysis />
      case "分析报告":
        return <DevelopmentAnalysisReport />
      case "用户列表":
        return <UserList />
      case "AI 智能":
        return <AIDashboard />
      default:
        return (
          <AnimatedContainer animation="fadeIn" delay={200}>
            <EnhancedCard variant="traditional" size="lg" glowEffect>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 sm:p-4 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-full w-fit">
                  <Cloud className="w-12 h-12 sm:w-16 sm:h-16 text-primary-500" />
                </div>
                <CardTitle className="text-xl sm:text-2xl bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  {activeMenu}
                </CardTitle>
                <CardDescription className="text-base sm:text-lg text-secondary-600">
                  {activeMenu}功能模块正在开发中，敬请期待...
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-24 sm:h-32">
                  <div className="text-center space-y-4">
                    <FloatingElement>
                      <div className="bg-gradient-to-r from-primary-500 via-accent-500 to-traditional-azure bg-clip-text text-transparent font-bold text-base sm:text-lg">
                        智能引擎正在为您准备{activeMenu}功能
                      </div>
                    </FloatingElement>
                    <div className="flex justify-center space-x-4">
                      <EnhancedButton variant="secondary" size="sm" glowEffect>
                        了解更多
                      </EnhancedButton>
                      <EnhancedButton variant="primary" size="sm" glowEffect>
                        申请体验
                      </EnhancedButton>
                    </div>
                  </div>
                </div>
              </CardContent>
            </EnhancedCard>
          </AnimatedContainer>
        )
    }
  }

  return (
    <SeasonalTheme season={season} autoDetect={autoDetect}>
      <ResponsiveContainer className="bg-secondary-50/30">
        {/* Desktop Sidebar */}
        <SidebarContainer>
          <SidebarContent />
        </SidebarContainer>

        {/* Main Content */}
        <MainContentContainer>
          {/* Header */}
          <HeaderContainer>
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <SoundButton
                  variant="ghost"
                  size="icon"
                  className="lg:hidden h-8 w-8"
                  soundType="click"
                  aria-label="打开移动端导航菜单"
                >
                  <Menu className="h-4 w-4" />
                </SoundButton>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-44 sm:w-48">
                <SheetHeader className="sr-only">
                  <SheetTitle>导航菜单</SheetTitle>
                  <SheetDescription>YYC³ Business Management System 主导航菜单</SheetDescription>
                </SheetHeader>
                <SidebarContent />
              </SheetContent>
            </Sheet>

            {/* Search */}
            <SearchContainer>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-secondary-400 w-3.5 h-3.5" />
                <Input
                  placeholder="搜索功能、用户、内容..."
                  className="pl-8 h-8 text-sm border-secondary-200 focus:border-primary-400 focus:ring-primary-400/20 bg-white/80 backdrop-blur-sm"
                  aria-label="全局搜索"
                />
              </div>
            </SearchContainer>

            {/* Actions */}
            <ActionsContainer>
              {/* Seasonal Controls - 在大屏幕上显示 */}
              <div className="hidden xl:block">
                <SeasonalControls
                  onSeasonChange={changeSeason}
                  onAutoDetectToggle={enableAutoDetect}
                  currentSeason={season}
                  autoDetect={autoDetect}
                />
              </div>

              {/* Header Actions */}
              <HeaderActions onMenuClick={handleMenuClick} activeMenu={activeMenu} />
            </ActionsContainer>
          </HeaderContainer>

          {/* Main Content Area */}
          <ContentContainer>
            {/* Page Header */}
            <AnimatedContainer animation="fadeIn" className="mb-6 lg:mb-8">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                {activeMenu}
              </h1>
              <p className="text-secondary-600 mt-1 lg:mt-2 text-sm lg:text-base">
                {activeMenu === "AI 智能"
                  ? "基于深度学习的智能助手、数据分析与个性化推荐系统"
                  : activeMenu === "开发执行"
                    ? "基于分析报告的迭代开发计划执行与任务管理"
                    : activeMenu === "敏捷工作流"
                      ? "敏捷开发流程管理，Sprint规划与团队协作"
                      : activeMenu === "CI/CD流水线"
                        ? "自动化构建、测试、部署流程管理与监控"
                        : activeMenu === "分析报告"
                          ? "基于当前开发状态的全面技术评估与发展规划建议"
                          : "欢迎使用 YYC³ Business Management System，开启数字化管理新体验"}
              </p>
            </AnimatedContainer>

            {/* Dynamic Content */}
            {renderContent()}
          </ContentContainer>
        </MainContentContainer>
      </ResponsiveContainer>
    </SeasonalTheme>
  )
}

export default function EnhancedAdminDashboard() {
  return (
    <SoundProvider>
      <AdminDashboardContent />
    </SoundProvider>
  )
}
