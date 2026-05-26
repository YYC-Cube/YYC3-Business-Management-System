"use client"

import { useState, useEffect } from "react"
import {
  BarChart3,
  Users,
  FileText,
  Brain,
  Share2,
  Edit3,
  Eye,
  Lock,
  RefreshCw,
  Download,
  Upload,
  MessageSquare,
  Settings,
  Smartphone,
  Monitor,
  Cloud,
  Shield,
  Activity,
  TrendingUp,
  PieChart,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"

import { EnhancedCard } from "../design-system/enhanced-card-system"
import { EnhancedButton } from "../design-system/enhanced-button-system"
import { AnimatedContainer } from "../design-system/animation-system"
import { useSound } from "../design-system/sound-system"

// 数据类型定义
interface DataSource {
  id: string
  name: string
  type: "spreadsheet" | "database" | "api" | "file"
  status: "active" | "syncing" | "error" | "offline"
  lastSync: string
  collaborators: number
  permissions: "view" | "edit" | "admin"
  platform: "web" | "mobile" | "wechat" | "api"
}

interface CollaborationSession {
  id: string
  user: {
    name: string
    avatar: string
    role: string
  }
  action: string
  timestamp: string
  platform: "web" | "mobile" | "wechat"
}

interface ShareLink {
  id: string
  name: string
  url: string
  permissions: "view" | "edit"
  expiresAt: string
  platform: "wechat" | "web" | "mobile"
  accessCount: number
  isActive: boolean
}

export function DynamicDataCenter() {
  const [activeTab, setActiveTab] = useState("overview")
  const [dataSources, setDataSources] = useState<DataSource[]>([
    {
      id: "1",
      name: "销售数据表",
      type: "spreadsheet",
      status: "active",
      lastSync: "2分钟前",
      collaborators: 8,
      permissions: "admin",
      platform: "wechat",
    },
    {
      id: "2",
      name: "用户行为分析",
      type: "database",
      status: "syncing",
      lastSync: "正在同步...",
      collaborators: 3,
      permissions: "edit",
      platform: "web",
    },
    {
      id: "3",
      name: "财务报表",
      type: "spreadsheet",
      status: "active",
      lastSync: "5分钟前",
      collaborators: 12,
      permissions: "view",
      platform: "mobile",
    },
  ])

  const [collaborationSessions, setCollaborationSessions] = useState<CollaborationSession[]>([
    {
      id: "1",
      user: { name: "张小明", avatar: "", role: "数据分析师" },
      action: "编辑了销售数据表 - Q4业绩",
      timestamp: "刚刚",
      platform: "wechat",
    },
    {
      id: "2",
      user: { name: "李小红", avatar: "", role: "产品经理" },
      action: "添加了新的数据源",
      timestamp: "3分钟前",
      platform: "web",
    },
    {
      id: "3",
      user: { name: "王小华", avatar: "", role: "运营专员" },
      action: "分享了财务报表到微信群",
      timestamp: "5分钟前",
      platform: "mobile",
    },
  ])

  const [shareLinks, setShareLinks] = useState<ShareLink[]>([
    {
      id: "1",
      name: "Q4销售数据",
      url: "https://yanyu.cloud/share/q4-sales",
      permissions: "edit",
      expiresAt: "7天后",
      platform: "wechat",
      accessCount: 24,
      isActive: true,
    },
    {
      id: "2",
      name: "用户反馈统计",
      url: "https://yanyu.cloud/share/feedback",
      permissions: "view",
      expiresAt: "3天后",
      platform: "web",
      accessCount: 156,
      isActive: true,
    },
  ])

  const { playSound } = useSound()

  // 实时数据更新模拟
  useEffect(() => {
    const interval = setInterval(() => {
      // 模拟实时协作更新
      const newSession: CollaborationSession = {
        id: Date.now().toString(),
        user: {
          name: ["张三", "李四", "王五", "赵六"][Math.floor(Math.random() * 4)],
          avatar: "",
          role: ["数据分析师", "产品经理", "运营专员"][Math.floor(Math.random() * 3)],
        },
        action: ["更新了数据表", "添加了新记录", "修改了公式", "导出了报表", "分享了链接"][
          Math.floor(Math.random() * 5)
        ],
        timestamp: "刚刚",
        platform: ["web", "mobile", "wechat"][Math.floor(Math.random() * 3)] as "web" | "mobile" | "wechat",
      }

      setCollaborationSessions((prev) => [newSession, ...prev.slice(0, 9)])
    }, 15000) // 每15秒更新一次

    return () => clearInterval(interval)
  }, [])

  const handleShare = (dataSource: DataSource) => {
    playSound("success")
    // 模拟分享逻辑
    console.log("分享数据源:", dataSource.name)
  }

  const handleSync = (dataSource: DataSource) => {
    playSound("click")
    // 模拟同步逻辑
    setDataSources((prev) => prev.map((ds) => (ds.id === dataSource.id ? { ...ds, status: "syncing" as const } : ds)))

    setTimeout(() => {
      setDataSources((prev) =>
        prev.map((ds) => (ds.id === dataSource.id ? { ...ds, status: "active" as const, lastSync: "刚刚" } : ds)),
      )
    }, 2000)
  }

  const getStatusColor = (status: DataSource["status"]) => {
    switch (status) {
      case "active":
        return "bg-traditional-jade"
      case "syncing":
        return "bg-primary-500 animate-pulse"
      case "error":
        return "bg-traditional-crimson"
      case "offline":
        return "bg-secondary-400"
      default:
        return "bg-secondary-400"
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "wechat":
        return <MessageSquare className="w-4 h-4 text-traditional-jade" />
      case "mobile":
        return <Smartphone className="w-4 h-4 text-primary-500" />
      case "web":
        return <Monitor className="w-4 h-4 text-accent-500" />
      default:
        return <Cloud className="w-4 h-4 text-secondary-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* 实时状态概览 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AnimatedContainer animation="slideUp" delay={0}>
          <EnhancedCard variant="glass" interactive>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">活跃数据源</CardTitle>
              <Activity className="h-4 w-4 text-traditional-jade" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-traditional-jade">
                {dataSources.filter((ds) => ds.status === "active").length}
              </div>
              <p className="text-xs text-secondary-500">
                <span className="text-traditional-jade">+2</span> 较昨日
              </p>
            </CardContent>
          </EnhancedCard>
        </AnimatedContainer>

        <AnimatedContainer animation="slideUp" delay={150}>
          <EnhancedCard variant="glass" interactive>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">实时协作</CardTitle>
              <Users className="h-4 w-4 text-primary-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-500">
                {dataSources.reduce((sum, ds) => sum + ds.collaborators, 0)}
              </div>
              <p className="text-xs text-secondary-500">
                <span className="text-primary-500">+5</span> 在线用户
              </p>
            </CardContent>
          </EnhancedCard>
        </AnimatedContainer>

        <AnimatedContainer animation="slideUp" delay={300}>
          <EnhancedCard variant="glass" interactive>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">分享链接</CardTitle>
              <Share2 className="h-4 w-4 text-accent-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent-500">{shareLinks.length}</div>
              <p className="text-xs text-secondary-500">
                <span className="text-accent-500">{shareLinks.reduce((sum, link) => sum + link.accessCount, 0)}</span>{" "}
                总访问
              </p>
            </CardContent>
          </EnhancedCard>
        </AnimatedContainer>

        <AnimatedContainer animation="slideUp" delay={450}>
          <EnhancedCard variant="glass" interactive>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">同步状态</CardTitle>
              <RefreshCw className="h-4 w-4 text-traditional-azure" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-traditional-azure">99.9%</div>
              <p className="text-xs text-secondary-500">
                <span className="text-traditional-azure">实时</span> 同步率
              </p>
            </CardContent>
          </EnhancedCard>
        </AnimatedContainer>
      </div>

      {/* 主要功能区域 */}
      <EnhancedCard variant="traditional" size="lg">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">数据概览</TabsTrigger>
            <TabsTrigger value="collaboration">实时协作</TabsTrigger>
            <TabsTrigger value="sharing">分享管理</TabsTrigger>
            <TabsTrigger value="analytics">数据分析</TabsTrigger>
          </TabsList>

          {/* 数据概览 */}
          <TabsContent value="overview" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">数据源管理</h3>
              <div className="flex space-x-2">
                <EnhancedButton variant="secondary" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  导入数据
                </EnhancedButton>
                <EnhancedButton variant="primary" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  新建表格
                </EnhancedButton>
              </div>
            </div>

            <div className="grid gap-4">
              {dataSources.map((dataSource, index) => (
                <AnimatedContainer key={dataSource.id} animation="slideRight" delay={index * 100}>
                  <EnhancedCard variant="glass" className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                            {dataSource.type === "spreadsheet" ? (
                              <BarChart3 className="w-5 h-5 text-white" />
                            ) : (
                              <Brain className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <div
                            className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(dataSource.status)}`}
                          />
                        </div>

                        <div>
                          <h4 className="font-medium">{dataSource.name}</h4>
                          <div className="flex items-center space-x-2 text-sm text-secondary-500">
                            <span>{dataSource.lastSync}</span>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              <Users className="w-3 h-3" />
                              <span>{dataSource.collaborators}</span>
                            </div>
                            <span>•</span>
                            {getPlatformIcon(dataSource.platform)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Badge variant={dataSource.permissions === "admin" ? "default" : "secondary"}>
                          {dataSource.permissions === "admin" ? (
                            <Shield className="w-3 h-3 mr-1" />
                          ) : dataSource.permissions === "edit" ? (
                            <Edit3 className="w-3 h-3 mr-1" />
                          ) : (
                            <Eye className="w-3 h-3 mr-1" />
                          )}
                          {dataSource.permissions}
                        </Badge>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Settings className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleShare(dataSource)}>
                              <Share2 className="w-4 h-4 mr-2" />
                              分享到微信
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSync(dataSource)}>
                              <RefreshCw className="w-4 h-4 mr-2" />
                              立即同步
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              导出数据
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Settings className="w-4 h-4 mr-2" />
                              权限设置
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </EnhancedCard>
                </AnimatedContainer>
              ))}
            </div>
          </TabsContent>

          {/* 实时协作 */}
          <TabsContent value="collaboration" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">实时协作动态</h3>
              <Badge variant="outline" className="bg-traditional-jade/10 text-traditional-jade">
                <Activity className="w-3 h-3 mr-1" />
                实时更新
              </Badge>
            </div>

            <div className="space-y-3">
              {collaborationSessions.map((session, index) => (
                <AnimatedContainer key={session.id} animation="slideLeft" delay={index * 50}>
                  <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg border border-secondary-200/50">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs">
                        {session.user.name.slice(-2)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">{session.user.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {session.user.role}
                        </Badge>
                        {getPlatformIcon(session.platform)}
                      </div>
                      <p className="text-sm text-secondary-600">{session.action}</p>
                    </div>

                    <div className="text-xs text-secondary-500">{session.timestamp}</div>
                  </div>
                </AnimatedContainer>
              ))}
            </div>
          </TabsContent>

          {/* 分享管理 */}
          <TabsContent value="sharing" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">分享链接管理</h3>
              <EnhancedButton variant="primary" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                创建分享链接
              </EnhancedButton>
            </div>

            <div className="grid gap-4">
              {shareLinks.map((link, index) => (
                <AnimatedContainer key={link.id} animation="slideUp" delay={index * 100}>
                  <EnhancedCard variant="glass" className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium">{link.name}</h4>
                          {getPlatformIcon(link.platform)}
                          <Badge variant={link.permissions === "edit" ? "default" : "secondary"}>
                            {link.permissions === "edit" ? (
                              <Edit3 className="w-3 h-3 mr-1" />
                            ) : (
                              <Eye className="w-3 h-3 mr-1" />
                            )}
                            {link.permissions}
                          </Badge>
                        </div>

                        <div className="text-sm text-secondary-500 space-y-1">
                          <div className="flex items-center space-x-4">
                            <span>访问次数: {link.accessCount}</span>
                            <span>过期时间: {link.expiresAt}</span>
                          </div>
                          <div className="font-mono text-xs bg-secondary-100 p-2 rounded">{link.url}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch checked={link.isActive} />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Settings className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Share2 className="w-4 h-4 mr-2" />
                              复制链接
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageSquare className="w-4 h-4 mr-2" />
                              分享到微信
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Settings className="w-4 h-4 mr-2" />
                              权限设置
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-traditional-crimson">
                              <Lock className="w-4 h-4 mr-2" />
                              禁用链接
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </EnhancedCard>
                </AnimatedContainer>
              ))}
            </div>
          </TabsContent>

          {/* 数据分析 */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <EnhancedCard variant="glass">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-traditional-jade" />
                    <span>使用趋势</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">微信小程序访问</span>
                      <span className="font-medium">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Web端访问</span>
                      <span className="font-medium">24%</span>
                    </div>
                    <Progress value={24} className="h-2" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm">移动端访问</span>
                      <span className="font-medium">8%</span>
                    </div>
                    <Progress value={8} className="h-2" />
                  </div>
                </CardContent>
              </EnhancedCard>

              <EnhancedCard variant="glass">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="w-5 h-5 text-primary-500" />
                    <span>协作统计</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">今日协作次数</span>
                      <span className="text-2xl font-bold text-primary-500">156</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">活跃协作者</span>
                      <span className="text-2xl font-bold text-accent-500">23</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">数据同步次数</span>
                      <span className="text-2xl font-bold text-traditional-jade">1,247</span>
                    </div>
                  </div>
                </CardContent>
              </EnhancedCard>
            </div>
          </TabsContent>
        </Tabs>
      </EnhancedCard>
    </div>
  )
}
