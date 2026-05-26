"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown, FileText, Code, Settings, Server, Shield, BarChart3, Book, Github, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

// 文档系统入口组件
export default function Documentation() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    overview: true,
    architecture: false,
    components: false,
    api: false,
    development: false,
    deployment: false
  })

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const documentationSections = [
    {
      id: 'overview',
      title: '项目概述',
      icon: <FileText className="w-4 h-4" />,
      description: '了解项目背景、目标和主要功能',
      subsections: [
        { id: 'introduction', title: '项目介绍', href: '#introduction' },
        { id: 'features', title: '核心功能', href: '#features' },
        { id: 'tech-stack', title: '技术栈', href: '#tech-stack' }
      ]
    },
    {
      id: 'architecture',
      title: '架构设计',
      icon: <Server className="w-4 h-4" />,
      description: '系统架构和技术方案',
      subsections: [
        { id: 'system-architecture', title: '系统架构', href: '#system-architecture' },
        { id: 'frontend-architecture', title: '前端架构', href: '#frontend-architecture' },
        { id: 'backend-architecture', title: '后端架构', href: '#backend-architecture' },
        { id: 'data-model', title: '数据模型', href: '#data-model' }
      ]
    },
    {
      id: 'components',
      title: '组件文档',
      icon: <Code className="w-4 h-4" />,
      description: 'UI组件和设计系统文档',
      subsections: [
        { id: 'design-system', title: '设计系统', href: '#design-system' },
        { id: 'ui-components', title: 'UI组件', href: '#ui-components' },
        { id: 'custom-hooks', title: '自定义Hooks', href: '#custom-hooks' },
        { id: 'utilities', title: '工具函数', href: '#utilities' }
      ]
    },
    {
      id: 'api',
      title: 'API参考',
      icon: <Settings className="w-4 h-4" />,
      description: '接口规范和调用说明',
      subsections: [
        { id: 'api-overview', title: 'API概述', href: '#api-overview' },
        { id: 'api-endpoints', title: 'API端点', href: '#api-endpoints' },
        { id: 'data-types', title: '数据类型', href: '#data-types' },
        { id: 'error-handling', title: '错误处理', href: '#error-handling' }
      ]
    },
    {
      id: 'development',
      title: '开发指南',
      icon: <BarChart3 className="w-4 h-4" />,
      description: '开发环境配置和工作流程',
      subsections: [
        { id: 'setup', title: '环境搭建', href: '#setup' },
        { id: 'workflow', title: '开发工作流', href: '#workflow' },
        { id: 'coding-standards', title: '编码规范', href: '#coding-standards' },
        { id: 'testing', title: '测试指南', href: '#testing' }
      ]
    },
    {
      id: 'deployment',
      title: '部署流程',
      icon: <Shield className="w-4 h-4" />,
      description: '部署、发布和运维指南',
      subsections: [
        { id: 'production', title: '生产部署', href: '#production' },
        { id: 'ci-cd', title: 'CI/CD流程', href: '#ci-cd' },
        { id: 'monitoring', title: '监控与维护', href: '#monitoring' }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90">
      {/* 文档头部 */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Book className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">YYC³ 文档中心</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="gap-2">
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </Button>
            <Button size="sm" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">官方网站</span>
            </Button>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="container px-4 py-8 md:px-6 md:py-12 lg:flex">
        {/* 侧边导航 */}
        <aside className="lg:w-64 lg:shrink-0">
          <div className="sticky top-20 space-y-1">
            <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
              <nav className="space-y-1">
                {documentationSections.map(section => (
                  <div key={section.id} className="space-y-1">
                    <div
                      className="group flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                      onClick={() => toggleSection(section.id)}
                    >
                      <div className="flex items-center gap-2">
                        {section.icon}
                        <span>{section.title}</span>
                      </div>
                      {expandedSections[section.id] ? (
                        <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                      ) : (
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:rotate-90" />
                      )}
                    </div>
                    {expandedSections[section.id] && (
                      <div className="space-y-1 pl-5">
                        {section.subsections.map(subsection => (
                          <a
                            key={subsection.id}
                            href={subsection.href}
                            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                          >
                            {subsection.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </ScrollArea>
          </div>
        </aside>

        {/* 文档内容 */}
        <div className="mt-6 lg:ml-8 lg:mt-0 lg:flex-1">
          <div className="prose prose-lg prose-headings:text-primary prose-a:text-primary max-w-none dark:prose-invert">
            {/* 项目概述 */}
            <section id="introduction">
              <h2 className="text-3xl font-bold mb-6">项目概述</h2>
              <Card>
                <CardHeader>
                  <CardTitle>YYC³ 智能商务中心</CardTitle>
                  <CardDescription>
                    万象归元于云枢，深栈智启新纪元 - 企业级智能云管理平台
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    YYC³ 是一款面向现代企业的智能云管理平台，旨在通过先进的AI技术、高效的协作工具和完善的管理功能，
                    帮助企业实现数字化转型，提升运营效率，降低管理成本。
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary">企业级应用</Badge>
                    <Badge variant="secondary">智能管理</Badge>
                    <Badge variant="secondary">AI赋能</Badge>
                    <Badge variant="secondary">实时协作</Badge>
                    <Badge variant="secondary">云原生</Badge>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 核心功能 */}
            <section id="features" className="mt-12">
              <h2 className="text-3xl font-bold mb-6">核心功能</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">智能数据分析</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      基于AI的智能分析引擎，帮助企业挖掘数据价值，提供决策支持
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">实时协作平台</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      多人实时协作编辑，支持操作同步、冲突解决和版本控制
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">企业资源管理</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      统一管理企业资产、人员、项目等各类资源，优化资源配置
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">自动化工作流</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      可视化工作流设计器，支持复杂业务流程的自动化执行
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">安全合规体系</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      多层次安全防护，符合ISO 27001、GDPR等国际安全标准
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">多端协同体验</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      支持桌面端、移动端、平板端，提供一致的用户体验
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 技术栈 */}
            <section id="tech-stack" className="mt-12">
              <h2 className="text-3xl font-bold mb-6">技术栈</h2>
              <Tabs defaultValue="frontend">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="frontend">前端技术</TabsTrigger>
                  <TabsTrigger value="backend">后端技术</TabsTrigger>
                  <TabsTrigger value="infrastructure">基础设施</TabsTrigger>
                </TabsList>
                <TabsContent value="frontend" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>前端技术栈</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <Badge variant="outline">React 19</Badge>
                          <span>UI构建框架</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="outline">Next.js 15.2.4</Badge>
                          <span>React全栈框架</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="outline">TypeScript 5</Badge>
                          <span>静态类型检查</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="outline">Tailwind CSS</Badge>
                          <span>实用优先的CSS框架</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="outline">Radix UI</Badge>
                          <span>可访问的UI组件库</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="backend" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>后端技术栈（规划中）</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <Badge variant="outline">Node.js</Badge>
                          <span>服务端JavaScript运行时</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="outline">PostgreSQL</Badge>
                          <span>关系型数据库</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="outline">MongoDB</Badge>
                          <span>文档型数据库</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="outline">Redis</Badge>
                          <span>内存数据结构存储</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="outline">Socket.io</Badge>
                          <span>实时通信框架</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="infrastructure" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>基础设施（规划中）</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <Badge variant="outline">Docker</Badge>
                          <span>容器化平台</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="outline">Kubernetes</Badge>
                          <span>容器编排系统</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="outline">Kong/Nginx</Badge>
                          <span>API网关</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="outline">RabbitMQ/Kafka</Badge>
                          <span>消息队列</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="outline">ELK Stack</Badge>
                          <span>日志分析平台</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </section>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="mt-auto border-t py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Book className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">YYC³ 文档中心</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 YYC³ Team. 保留所有权利。
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}