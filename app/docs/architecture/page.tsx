"use client"

import { useState } from "react"
import { Database, Server, Shield, Cloud, Code2, Layers, Settings, Cpu, GitBranch, LayoutGrid, Zap, BarChart3 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"

// 系统架构与技术选型文档页面
export default function Architecture() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90">
      {/* 头部 */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <LayoutGrid className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">系统架构与技术选型</h1>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="container px-4 py-8 md:px-6 md:py-12">
        {/* 架构概览卡片 */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">YYC³ 系统架构概览</CardTitle>
            <CardDescription>
              基于云原生架构的企业级应用平台，采用前后端分离、微服务架构设计
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                <Server className="h-10 w-10 text-primary mb-3" />
                <h3 className="font-medium mb-1">微服务架构</h3>
                <p className="text-sm text-muted-foreground">
                  模块化、可扩展的服务设计，支持独立部署和扩展
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                <Cloud className="h-10 w-10 text-primary mb-3" />
                <h3 className="font-medium mb-1">云原生支持</h3>
                <p className="text-sm text-muted-foreground">
                  容器化部署，支持Kubernetes编排，适应云环境
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                <Shield className="h-10 w-10 text-primary mb-3" />
                <h3 className="font-medium mb-1">全面安全保障</h3>
                <p className="text-sm text-muted-foreground">
                  多层安全防护，身份认证和授权，数据加密传输
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 架构详情选项卡 */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">架构概览</TabsTrigger>
            <TabsTrigger value="frontend">前端架构</TabsTrigger>
            <TabsTrigger value="backend">后端架构</TabsTrigger>
            <TabsTrigger value="database">数据库设计</TabsTrigger>
            <TabsTrigger value="security">安全架构</TabsTrigger>
            <TabsTrigger value="deployment">部署架构</TabsTrigger>
          </TabsList>

          {/* 架构概览选项卡内容 */}
          <TabsContent value="overview" className="space-y-6">
            <Alert className="mb-6">
              <AlertDescription>
                YYC³ 系统采用现代化的分层架构设计，实现了高度模块化、可扩展性和可维护性。
                系统由前端展示层、后端服务层、数据存储层和基础设施层组成，各层之间通过清晰的接口进行通信。
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle>系统总体架构</CardTitle>
                <CardDescription>分层架构设计与组件关系</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative overflow-hidden rounded-lg border p-4 bg-muted/30">
                  {/* 架构示意图 - 使用SVG绘制简单架构图 */}
                  <svg className="w-full h-[350px] mx-auto" viewBox="0 0 800 350">
                    {/* 前端展示层 */}
                    <rect x="100" y="50" width="600" height="40" rx="8" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="2" />
                    <text x="400" y="75" textAnchor="middle" fill="#0369a1" fontWeight="500" fontSize="14">前端展示层</text>
                    
                    {/* 后端服务层 */}
                    <rect x="100" y="120" width="600" height="40" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2" />
                    <text x="400" y="145" textAnchor="middle" fill="#15803d" fontWeight="500" fontSize="14">后端服务层</text>
                    
                    {/* 数据存储层 */}
                    <rect x="100" y="190" width="600" height="40" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
                    <text x="400" y="215" textAnchor="middle" fill="#92400e" fontWeight="500" fontSize="14">数据存储层</text>
                    
                    {/* 基础设施层 */}
                    <rect x="100" y="260" width="600" height="40" rx="8" fill="#fce7f3" stroke="#e879f9" strokeWidth="2" />
                    <text x="400" y="285" textAnchor="middle" fill="#9d174d" fontWeight="500" fontSize="14">基础设施层</text>
                    
                    {/* 连接线 */}
                    <line x1="400" y1="90" x2="400" y2="120" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4" />
                    <line x1="400" y1="160" x2="400" y2="190" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4" />
                    <line x1="400" y1="230" x2="400" y2="260" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4" />
                    
                    {/* 前端组件 */}
                    <rect x="120" y="20" width="120" height="25" rx="4" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1" />
                    <text x="180" y="37" textAnchor="middle" fill="#1e40af" fontSize="11">Web UI</text>
                    
                    <rect x="260" y="20" width="120" height="25" rx="4" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1" />
                    <text x="320" y="37" textAnchor="middle" fill="#1e40af" fontSize="11">移动应用</text>
                    
                    <rect x="400" y="20" width="120" height="25" rx="4" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1" />
                    <text x="460" y="37" textAnchor="middle" fill="#1e40af" fontSize="11">桌面应用</text>
                    
                    <rect x="540" y="20" width="120" height="25" rx="4" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1" />
                    <text x="600" y="37" textAnchor="middle" fill="#1e40af" fontSize="11">API客户端</text>
                    
                    {/* 后端服务组件 */}
                    <rect x="140" y="90" width="100" height="25" rx="4" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1" />
                    <text x="190" y="107" textAnchor="middle" fill="#166534" fontSize="11">API网关</text>
                    
                    <rect x="260" y="90" width="100" height="25" rx="4" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1" />
                    <text x="310" y="107" textAnchor="middle" fill="#166534" fontSize="11">用户服务</text>
                    
                    <rect x="380" y="90" width="100" height="25" rx="4" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1" />
                    <text x="430" y="107" textAnchor="middle" fill="#166534" fontSize="11">业务服务</text>
                    
                    <rect x="500" y="90" width="100" height="25" rx="4" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1" />
                    <text x="550" y="107" textAnchor="middle" fill="#166534" fontSize="11">AI服务</text>
                    
                    {/* 数据库组件 */}
                    <rect x="160" y="160" width="100" height="25" rx="4" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
                    <text x="210" y="177" textAnchor="middle" fill="#9a3412" fontSize="11">关系型DB</text>
                    
                    <rect x="280" y="160" width="100" height="25" rx="4" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
                    <text x="330" y="177" textAnchor="middle" fill="#9a3412" fontSize="11">NoSQL DB</text>
                    
                    <rect x="400" y="160" width="100" height="25" rx="4" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
                    <text x="450" y="177" textAnchor="middle" fill="#9a3412" fontSize="11">缓存</text>
                    
                    <rect x="520" y="160" width="100" height="25" rx="4" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
                    <text x="570" y="177" textAnchor="middle" fill="#9a3412" fontSize="11">文件存储</text>
                    
                    {/* 基础设施组件 */}
                    <rect x="180" y="230" width="100" height="25" rx="4" fill="#fbcfe8" stroke="#be185d" strokeWidth="1" />
                    <text x="230" y="247" textAnchor="middle" fill="#701a75" fontSize="11">容器编排</text>
                    
                    <rect x="300" y="230" width="100" height="25" rx="4" fill="#fbcfe8" stroke="#be185d" strokeWidth="1" />
                    <text x="350" y="247" textAnchor="middle" fill="#701a75" fontSize="11">监控告警</text>
                    
                    <rect x="420" y="230" width="100" height="25" rx="4" fill="#fbcfe8" stroke="#be185d" strokeWidth="1" />
                    <text x="470" y="247" textAnchor="middle" fill="#701a75" fontSize="11">日志管理</text>
                    
                    <rect x="540" y="230" width="100" height="25" rx="4" fill="#fbcfe8" stroke="#be185d" strokeWidth="1" />
                    <text x="590" y="247" textAnchor="middle" fill="#701a75" fontSize="11">CI/CD</text>
                  </svg>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">分层架构说明</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Layers className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span><strong>前端展示层</strong>：提供用户交互界面，包括Web UI、移动应用、桌面应用等多种客户端形式</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Layers className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span><strong>后端服务层</strong>：包含API网关、微服务集群、业务逻辑处理等核心功能模块</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Layers className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span><strong>数据存储层</strong>：包含关系型数据库、NoSQL数据库、缓存和文件存储等多种数据存储方式</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Layers className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span><strong>基础设施层</strong>：提供容器编排、监控告警、日志管理和CI/CD等基础支持服务</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 前端架构选项卡内容 */}
          <TabsContent value="frontend" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>前端技术栈</CardTitle>
                <CardDescription>现代化的前端开发框架与工具链</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                      <Code2 className="h-4 w-4 text-primary" />
                      核心框架
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">React 19</span>
                          <Badge variant="outline" className="ml-auto">核心库</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">\                          用于构建用户界面的JavaScript库，提供组件化开发和虚拟DOM等特性
                        </p>
                      </li>
                      <li className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Next.js 15.2.4</span>
                          <Badge variant="outline" className="ml-auto">全栈框架</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">\                          React框架的扩展，提供服务端渲染、静态站点生成、路由等功能
                        </p>
                      </li>
                      <li className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">TypeScript 5</span>
                          <Badge variant="outline" className="ml-auto">类型系统</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">\                          JavaScript的超集，提供静态类型检查和更强大的IDE支持
                        </p>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                      <LayoutGrid className="h-4 w-4 text-primary" />
                      UI组件库
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Radix UI</span>
                          <Badge variant="outline" className="ml-auto">组件库</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">\                          可访问、可定制的UI组件库，提供基础UI组件构建块
                        </p>
                      </li>
                      <li className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Tailwind CSS</span>
                          <Badge variant="outline" className="ml-auto">样式框架</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">\                          实用优先的CSS框架，通过预定义类快速构建现代UI
                        </p>
                      </li>
                      <li className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Lucide</span>
                          <Badge variant="outline" className="ml-auto">图标库</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">\                          轻量级、可定制的矢量图标库，提供丰富的图标资源
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">前端架构特点</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-muted/30">
                      <h5 className="font-medium mb-2 flex items-center gap-2">\                        <Zap className="h-4 w-4 text-primary" />
                        组件化开发
                      </h5>
                      <p className="text-sm text-muted-foreground">\                        采用原子设计理念，将UI拆分为可复用的组件，提高代码复用性和维护性
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/30">
                      <h5 className="font-medium mb-2 flex items-center gap-2">\                        <Zap className="h-4 w-4 text-primary" />
                        服务端渲染
                      </h5>
                      <p className="text-sm text-muted-foreground">\                        利用Next.js提供的服务端渲染能力，提高首屏加载速度和SEO友好性
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/30">
                      <h5 className="font-medium mb-2 flex items-center gap-2">\                        <Zap className="h-4 w-4 text-primary" />
                        响应式设计
                      </h5>
                      <p className="text-sm text-muted-foreground">\                        基于Tailwind CSS的响应式工具类，构建适配不同屏幕尺寸的用户界面
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/30">
                      <h5 className="font-medium mb-2 flex items-center gap-2">\                        <Zap className="h-4 w-4 text-primary" />
                        TypeScript支持
                      </h5>
                      <p className="text-sm text-muted-foreground">\                        全面采用TypeScript开发，提供类型安全和更好的开发体验
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 后端架构选项卡内容 */}
          <TabsContent value="backend" className="space-y-6">
            <Alert className="mb-6">\              <AlertDescription>
                注：当前项目处于前端开发阶段，后端API服务尚未完全实现。以下是规划的后端技术栈和架构设计。
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle>后端技术栈</CardTitle>
                <CardDescription>高性能、可扩展的后端服务架构</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium mb-3 flex items-center gap-2">\                      <Server className="h-4 w-4 text-primary" />
                      服务端框架
                    </h4>
                    <ul className="space-y-3">\                      <li className="flex flex-col">\                        <div className="flex items-center gap-2">\                          <span className="font-medium">Node.js / NestJS</span>
                          <Badge variant="outline" className="ml-auto">主要框架</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">\                          基于TypeScript的Node.js框架，提供模块化、可测试的架构设计
                        </p>
                      </li>
                      <li className="flex flex-col">\                        <div className="flex items-center gap-2">\                          <span className="font-medium">Go / Gin</span>
                          <Badge variant="outline" className="ml-auto">高性能服务</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">\                          用于需要极高性能的服务组件，如API网关、数据处理等
                        </p>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3 flex items-center gap-2">\                      <GitBranch className="h-4 w-4 text-primary" />
                      微服务生态
                    </h4>
                    <ul className="space-y-3">\                      <li className="flex flex-col">\                        <div className="flex items-center gap-2">\                          <span className="font-medium">Kubernetes</span>
                          <Badge variant="outline" className="ml-auto">容器编排</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">\                          自动化部署、扩展和管理容器化应用程序的平台
                        </p>
                      </li>
                      <li className="flex flex-col">\                        <div className="flex items-center gap-2">\                          <span className="font-medium">gRPC</span>
                          <Badge variant="outline" className="ml-auto">服务通信</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">\                          高性能、开源的远程过程调用(RPC)框架
                        </p>
                      </li>
                      <li className="flex flex-col">\                        <div className="flex items-center gap-2">\                          <span className="font-medium">Redis</span>
                          <Badge variant="outline" className="ml-auto">缓存 & 消息队列</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">\                          高性能的键值存储，用于缓存和构建消息队列
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">\                  <h4 className="text-sm font-medium">微服务架构设计</h4>
                  <div className="relative overflow-hidden rounded-lg border p-4 bg-muted/30">\                    {/* 微服务架构示意图 */}
                    <svg className="w-full h-[300px] mx-auto" viewBox="0 0 800 300">\                      {/* API网关 */}
                      <rect x="350" y="30" width="100" height="40" rx="8" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="2" />
                      <text x="400" y="55" textAnchor="middle" fill="#1e40af" fontWeight="500" fontSize="14">API网关</text>
                       
                      {/* 微服务集群 */}
                      <rect x="100" y="100" width="120" height="40" rx="8" fill="#bbf7d0" stroke="#16a34a" strokeWidth="2" />
                      <text x="160" y="125" textAnchor="middle" fill="#166534" fontWeight="500" fontSize="14">用户服务</text>
                       
                      <rect x="240" y="100" width="120" height="40" rx="8" fill="#bbf7d0" stroke="#16a34a" strokeWidth="2" />
                      <text x="300" y="125" textAnchor="middle" fill="#166534" fontWeight="500" fontSize="14">项目服务</text>
                       
                      <rect x="380" y="100" width="120" height="40" rx="8" fill="#bbf7d0" stroke="#16a34a" strokeWidth="2" />
                      <text x="440" y="125" textAnchor="middle" fill="#166534" fontWeight="500" fontSize="14">任务服务</text>
                       
                      <rect x="520" y="100" width="120" height="40" rx="8" fill="#bbf7d0" stroke="#16a34a" strokeWidth="2" />
                      <text x="580" y="125" textAnchor="middle" fill="#166534" fontWeight="500" fontSize="14">数据分析服务</text>
                       
                      <rect x="350" y="170" width="100" height="40" rx="8" fill="#bbf7d0" stroke="#16a34a" strokeWidth="2" />
                      <text x="400" y="195" textAnchor="middle" fill="#166534" fontWeight="500" fontSize="14">AI服务</text>
                       
                      {/* 服务间通信线 */}
                      <line x1="400" y1="70" x2="400" y2="100" stroke="#94a3b8" strokeWidth="2" />
                      <line x1="160" y1="140" x2="160" y2="190" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
                      <line x1="300" y1="140" x2="300" y2="190" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
                      <line x1="440" y1="140" x2="440" y2="190" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
                      <line x1="580" y1="140" x2="580" y2="190" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
                      <line x1="160" y1="210" x2="400" y2="210" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
                      <line x1="300" y1="210" x2="400" y2="210" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
                      <line x1="440" y1="210" x2="400" y2="210" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
                      <line x1="580" y1="210" x2="400" y2="210" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
                       
                      {/* 客户端连接 */}
                      <rect x="350" y="240" width="100" height="40" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
                      <text x="400" y="265" textAnchor="middle" fill="#92400e" fontWeight="500" fontSize="14">客户端</text>
                      <line x1="400" y1="210" x2="400" y2="240" stroke="#94a3b8" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 数据库设计选项卡内容 */}
          <TabsContent value="database" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>数据库设计</CardTitle>
                <CardDescription>多维度数据存储策略，满足不同业务需求</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">\                  <div>
                    <h4 className="text-sm font-medium mb-3 flex items-center gap-2">\                      <Database className="h-4 w-4 text-primary" />
                      数据库类型
                    </h4>
                    <ul className="space-y-3">\                      <li className="flex flex-col">\                        <div className="flex items-center gap-2">\                          <span className="font-medium">PostgreSQL</span>
                          <Badge variant="outline" className="ml-auto">关系型数据库</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">\                          用于存储结构化业务数据，如用户信息、项目配置、任务数据等
                        </p>
                      </li>
                      <li className="flex flex-col">\                        <div className="flex items-center gap-2">\                          <span className="font-medium">MongoDB</span>
                          <Badge variant="outline" className="ml-auto">文档数据库</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">\                          用于存储非结构化或半结构化数据，如用户行为日志、配置信息等
                        </p>
                      </li>
                      <li className="flex flex-col">\                        <div className="flex items-center gap-2">\                          <span className="font-medium">Redis</span>
                          <Badge variant="outline" className="ml-auto">缓存数据库</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">\                          用于缓存高频访问数据，提高系统响应速度和减轻数据库压力
                        </p>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3 flex items-center gap-2">\                      <BarChart3 className="h-4 w-4 text-primary" />
                      数据处理与分析
                    </h4>
                    <ul className="space-y-3">\                      <li className="flex flex-col">\                        <div className="flex items-center gap-2">\                          <span className="font-medium">Apache Kafka</span>
                          <Badge variant="outline" className="ml-auto">消息队列</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">\                          用于实时数据流处理，连接不同系统组件和数据处理管道
                        </p>
                      </li>
                      <li className="flex flex-col">\                        <div className="flex items-center gap-2">\                          <span className="font-medium">Elasticsearch</span>
                          <Badge variant="outline" className="ml-auto">搜索引擎</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">\                          用于全文搜索、日志分析和数据可视化
                        </p>
                      </li>
                      <li className="flex flex-col">\                        <div className="flex items-center gap-2">\                          <span className="font-medium">MinIO</span>
                          <Badge variant="outline" className="ml-auto">对象存储</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">\                          用于存储大量非结构化数据，如图片、视频、文档等文件
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">\                  <h4 className="text-sm font-medium">数据模型设计原则</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">\                    <div className="p-4 rounded-lg bg-muted/30">\                      <h5 className="font-medium mb-2 flex items-center gap-2">\                        <Database className="h-4 w-4 text-primary" />
                        数据一致性
                      </h5>
                      <p className="text-sm text-muted-foreground">\                        采用事务管理和数据校验机制，确保数据的完整性和一致性
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/30">\                      <h5 className="font-medium mb-2 flex items-center gap-2">\                        <Database className="h-4 w-4 text-primary" />
                        可扩展性
                      </h5>
                      <p className="text-sm text-muted-foreground">\                        数据模型设计考虑未来业务扩展需求，支持水平扩展
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/30">\                      <h5 className="font-medium mb-2 flex items-center gap-2">\                        <Database className="h-4 w-4 text-primary" />
                        高性能
                      </h5>
                      <p className="text-sm text-muted-foreground">\                        通过索引优化、查询优化和缓存机制，确保数据访问性能
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/30">\                      <h5 className="font-medium mb-2 flex items-center gap-2">\                        <Database className="h-4 w-4 text-primary" />
                        安全性
                      </h5>
                      <p className="text-sm text-muted-foreground">\                        实施数据加密、访问控制和审计机制，保护数据安全
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 安全架构选项卡内容 */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>安全架构</CardTitle>
                <CardDescription>全面的安全防护体系，保障系统和数据安全</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">\                  <div>
                    <h4 className="text-sm font-medium mb-3 flex items-center gap-2">\                      <Shield className="h-4 w-4 text-primary" />
                      认证与授权
                    </h4>
                    <ul className="space-y-3">\                      <li className="flex flex-col">\                        <div className="flex items-center gap-2">\                          <span className="font-medium">JWT (JSON Web Token)</span>
                          <Badge variant="outline" className="ml-auto">身份认证</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">\                          基于令牌的身份验证机制，支持无状态会话管理
                        </p>
                      </li>
                      <li className="flex flex-col">\                        <div className="flex items-center gap-2">\                          <span className="font-medium">RBAC (基于角色的访问控制)</span>
                          <Badge variant="outline" className="ml-auto">权限管理</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">\                          通过角色分配权限，实现细粒度的访问控制
                        </p>
                      </li>
                      <li className="flex flex-col">\                        <div className="flex items-center gap-2">\                          <span className="font-medium">OAuth 2.0 / OpenID Connect</span>
                          <Badge variant="outline" className="ml-auto">第三方认证</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">\                          支持与第三方身份提供商集成，实现单点登录
                        </p>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3 flex items-center gap-2">\                      <Shield className="h-4 w-4 text-primary" />
                      数据安全
                    </h4>
                    <ul className="space-y-3">\                      <li className="flex flex-col">\                        <div className="flex items-center gap-2">\                          <span className="font-medium">HTTPS / TLS</span>
                          <Badge variant="outline" className="ml-auto">传输加密</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">\                          确保数据在传输过程中的机密性和完整性
                        </p>
                      </li>
                      <li className="flex flex-col">\                        <div className="flex items-center gap-2">\                          <span className="font-medium">数据加密存储</span>
                          <Badge variant="outline" className="ml-auto">静态数据保护</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">\                          对敏感数据进行加密存储，防止数据泄露
                        </p>
                      </li>
                      <li className="flex flex-col">\                        <div className="flex items-center gap-2">\                          <span className="font-medium">数据备份与恢复</span>
                          <Badge variant="outline" className="ml-auto">业务连续性</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">\                          定期数据备份，确保在灾难发生时能够快速恢复
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">\                  <h4 className="text-sm font-medium">安全防护措施</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">\                    <div className="p-4 rounded-lg bg-muted/30">\                      <h5 className="font-medium mb-2 flex items-center gap-2">\                        <Shield className="h-4 w-4 text-primary" />
                        API安全
                      </h5>
                      <p className="text-sm text-muted-foreground">\                        实施API请求速率限制、请求验证和输入过滤，防止恶意攻击
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/30">\                      <h5 className="font-medium mb-2 flex items-center gap-2">\                        <Shield className="h-4 w-4 text-primary" />
                        安全审计
                      </h5>
                      <p className="text-sm text-muted-foreground">\                        记录关键操作日志，支持安全事件追溯和审计
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/30">\                      <h5 className="font-medium mb-2 flex items-center gap-2">\                        <Shield className="h-4 w-4 text-primary" />
                        漏洞扫描
                      </h5>
                      <p className="text-sm text-muted-foreground">\                        定期进行安全漏洞扫描和渗透测试，及时发现和修复安全问题
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 部署架构选项卡内容 */}
          <TabsContent value="deployment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>部署架构</CardTitle>
                <CardDescription>云原生部署策略，支持高可用和弹性扩展</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">\                  <div>
                    <h4 className="text-sm font-medium mb-3 flex items-center gap-2">\                      <Cloud className="h-4 w-4 text-primary" />
                      容器化部署
                    </h4>
                    <ul className="space-y-3">\                      <li className="flex flex-col">\                        <div className="flex items-center gap-2">\                          <span className="font-medium">Docker</span>
                          <Badge variant="outline" className="ml-auto">容器化</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">\                          应用容器化，确保开发、测试和生产环境的一致性
                        </p>
                      </li>
                      <li className="flex flex-col">\                        <div className="flex items-center gap-2">\                          <span className="font-medium">Kubernetes</span>
                          <Badge variant="outline" className="ml-auto">容器编排</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">\                          自动化容器部署、扩展和管理，提高系统可靠性
                        </p>
                      </li>
                      <li className="flex flex-col">\                        <div className="flex items-center gap-2">\                          <span className="font-medium">Helm</span>
                          <Badge variant="outline" className="ml-auto">包管理</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">\                          Kubernetes应用包管理工具，简化应用部署和更新
                        </p>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3 flex items-center gap-2">\                      <Cpu className="h-4 w-4 text-primary" />
                      基础设施
                    </h4>
                    <ul className="space-y-3">\                      <li className="flex flex-col">\                        <div className="flex items-center gap-2">\                          <span className="font-medium">云服务提供商</span>
                          <Badge variant="outline" className="ml-auto">混合云</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">\                          支持主流云服务提供商，实现混合云和多云部署策略
                        </p>
                      </li>
                      <li className="flex flex-col">\                        <div className="flex items-center gap-2">\                          <span className="font-medium">负载均衡</span>
                          <Badge variant="outline" className="ml-auto">流量分发</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">\                          智能流量分发，确保系统负载均衡和高可用性
                        </p>
                      </li>
                      <li className="flex flex-col">\                        <div className="flex items-center gap-2">\                          <span className="font-medium">自动扩缩容</span>
                          <Badge variant="outline" className="ml-auto">弹性资源</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">\                          根据负载自动调整资源，优化成本和性能
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">\                  <h4 className="text-sm font-medium">CI/CD 流水线</h4>
                  <div className="relative overflow-hidden rounded-lg border p-4 bg-muted/30">\                    {/* CI/CD流水线示意图 */}
                    <svg className="w-full h-[200px] mx-auto" viewBox="0 0 800 200">\                      {/* 流水线步骤 */}
                      <rect x="50" y="80" width="120" height="40" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
                      <text x="110" y="105" textAnchor="middle" fill="#92400e" fontWeight="500" fontSize="14">代码提交</text>
                       
                      <rect x="200" y="80" width="120" height="40" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
                      <text x="260" y="105" textAnchor="middle" fill="#92400e" fontWeight="500" fontSize="14">自动构建</text>
                       
                      <rect x="350" y="80" width="120" height="40" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
                      <text x="410" y="105" textAnchor="middle" fill="#92400e" fontWeight="500" fontSize="14">自动化测试</text>
                       
                      <rect x="500" y="80" width="120" height="40" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
                      <text x="560" y="105" textAnchor="middle" fill="#92400e" fontWeight="500" fontSize="14">镜像构建</text>
                       
                      <rect x="650" y="80" width="100" height="40" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
                      <text x="700" y="105" textAnchor="middle" fill="#92400e" fontWeight="500" fontSize="14">部署</text>
                       
                      {/* 流水线连接线 */}
                      <line x1="170" y1="100" x2="200" y2="100" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)" />
                      <line x1="320" y1="100" x2="350" y2="100" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)" />
                      <line x1="470" y1="100" x2="500" y2="100" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)" />
                      <line x1="620" y1="100" x2="650" y2="100" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)" />
                       
                      {/* 箭头定义 */}
                      <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">\                          <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                        </marker>
                      </defs>
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* 页脚 */}
      <footer className="mt-auto border-t py-8 md:py-12">\        <div className="container px-4 md:px-6">\          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">\            <div className="flex items-center gap-2">\              <LayoutGrid className="h-5 w-5 text-primary" />\              <span className="text-sm font-medium">YYC³ 架构文档</span>\            </div>\            <div className="text-sm text-muted-foreground">\              © 2024 YYC³ Team. 保留所有权利。\            </div>\          </div>\        </div>\      </footer>
    </div>
  )
}