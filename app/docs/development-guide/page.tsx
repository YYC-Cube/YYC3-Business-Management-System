"use client"

import { useState, useRef } from "react"
import { 
  Code2, 
  Database, 
  Settings, 
  GitBranch, 
  Terminal, 
  Book, 
  CheckCircle, 
  AlertCircle, 
  Play, 
  RefreshCw, 
  FileCode, 
  Users, 
  Workflow
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// 开发指南文档页面
export default function DevelopmentGuide() {
  const [activeTab, setActiveTab] = useState("setup")
  const codeBlockRef = useRef<HTMLDivElement>(null)

  // 代码复制功能
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // 这里可以添加一个提示，告知用户已复制
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90">
      {/* 头部 */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Code2 className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">开发指南</h1>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="container px-4 py-8 md:px-6 md:py-12">
        {/* 开发指南概览 */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">YYC³ 开发指南</CardTitle>
            <CardDescription>
              本指南将帮助您快速上手 YYC³ 项目的开发环境配置和工作流程
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                <Terminal className="h-10 w-10 text-primary mb-3" />
                <h3 className="font-medium mb-1">环境设置</h3>
                <p className="text-sm text-muted-foreground">
                  配置本地开发环境，安装依赖和工具
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                <GitBranch className="h-10 w-10 text-primary mb-3" />
                <h3 className="font-medium mb-1">工作流程</h3>
                <p className="text-sm text-muted-foreground">
                  了解代码提交、分支管理和发布流程
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                <FileCode className="h-10 w-10 text-primary mb-3" />
                <h3 className="font-medium mb-1">代码规范</h3>
                <p className="text-sm text-muted-foreground">
                  遵循项目的编码标准和最佳实践
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                <Book className="h-10 w-10 text-primary mb-3" />
                <h3 className="font-medium mb-1">开发文档</h3>
                <p className="text-sm text-muted-foreground">
                  查阅组件使用、API接口等详细文档
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 开发指南详情选项卡 */}
        <Tabs defaultValue="setup" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="setup">环境设置</TabsTrigger>
            <TabsTrigger value="workflow">工作流程</TabsTrigger>
            <TabsTrigger value="coding">编码规范</TabsTrigger>
            <TabsTrigger value="components">组件开发</TabsTrigger>
            <TabsTrigger value="api">API集成</TabsTrigger>
            <TabsTrigger value="testing">测试指南</TabsTrigger>
          </TabsList>

          {/* 环境设置选项卡内容 */}
          <TabsContent value="setup" className="space-y-6">
            <Alert className="mb-6">
              <AlertDescription>
                在开始开发之前，请确保您的开发环境满足以下要求，并完成相应的配置。
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle>环境要求</CardTitle>
                <CardDescription>开发 YYC³ 项目所需的软件和工具</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                      <Terminal className="h-4 w-4 text-primary" />
                      基础开发环境
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Node.js 18.x 或更高版本</span>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">必需</Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>npm 9.x / yarn 1.x / pnpm 7.x 或更高版本</span>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">必需</Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Git 2.30 或更高版本</span>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">必需</Badge>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                      <Settings className="h-4 w-4 text-primary" />
                      推荐开发工具
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                          <span>Visual Studio Code</span>
                        </div>
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">推荐</Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                          <span>Docker (用于容器化开发)</span>
                        </div>
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">推荐</Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                          <span>PostgreSQL (可选，用于本地数据库开发)</span>
                        </div>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">可选</Badge>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>项目设置</CardTitle>
                <CardDescription>克隆项目并安装依赖的步骤</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">1. 克隆项目</h4>
                    <div className="relative" ref={codeBlockRef}>
                      <pre className="rounded-md bg-muted p-4 overflow-x-auto">
                        <code className="text-sm font-mono">
                          {`git clone https://github.com/your-org/yanyu-cloud3.git
cd yanyu-cloud3`}
                        </code>
                      </pre>
                      <button 
                        className="absolute top-2 right-2 p-1 rounded-md bg-background/70 hover:bg-background text-muted-foreground"
                        onClick={() => copyToClipboard("git clone https://github.com/your-org/yanyu-cloud3.git\ncd yanyu-cloud3")}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">2. 安装依赖</h4>
                    <div className="relative">
                      <pre className="rounded-md bg-muted p-4 overflow-x-auto">
                        <code className="text-sm font-mono">
                          {`# 使用 npm
npm install

# 或使用 yarn
yarn install

# 或使用 pnpm
pnpm install`}
                        </code>
                      </pre>
                      <button 
                        className="absolute top-2 right-2 p-1 rounded-md bg-background/70 hover:bg-background text-muted-foreground"
                        onClick={() => copyToClipboard("# 使用 npm\nnpm install\n\n# 或使用 yarn\nyarn install\n\n# 或使用 pnpm\npnpm install")}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">3. 配置环境变量</h4>
                    <p className="text-sm text-muted-foreground">
                      复制 <code className="bg-muted px-1 py-0.5 rounded text-xs">.env.example</code> 文件并重命名为 <code className="bg-muted px-1 py-0.5 rounded text-xs">.env</code>，然后根据您的环境配置相应的值。
                    </p>
                    <div className="relative">
                      <pre className="rounded-md bg-muted p-4 overflow-x-auto">
                        <code className="text-sm font-mono">
                          {`cp .env.example .env`}
                        </code>
                      </pre>
                      <button 
                        className="absolute top-2 right-2 p-1 rounded-md bg-background/70 hover:bg-background text-muted-foreground"
                        onClick={() => copyToClipboard("cp .env.example .env")}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">4. 启动开发服务器</h4>
                    <div className="relative">
                      <pre className="rounded-md bg-muted p-4 overflow-x-auto">
                        <code className="text-sm font-mono">
                          {`# 使用 npm
npm run dev

# 或使用 yarn
yarn dev

# 或使用 pnpm
pnpm dev`}
                        </code>
                      </pre>
                      <button 
                        className="absolute top-2 right-2 p-1 rounded-md bg-background/70 hover:bg-background text-muted-foreground"
                        onClick={() => copyToClipboard("# 使用 npm\nnpm run dev\n\n# 或使用 yarn\nyarn dev\n\n# 或使用 pnpm\npnpm dev")}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      开发服务器启动后，可以通过浏览器访问 <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">http://localhost:3000</a> 查看应用。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 工作流程选项卡内容 */}
          <TabsContent value="workflow" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Git 工作流程</CardTitle>
                <CardDescription>项目的分支管理和代码提交规范</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <GitBranch className="h-4 w-4 text-primary" />
                      分支策略
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-muted/30">
                        <h5 className="font-medium mb-2">主分支 (main/master)</h5>
                        <p className="text-sm text-muted-foreground">
                          主分支包含生产环境的代码。所有发布到生产环境的代码都必须从主分支部署。
                        </p>
                        <Badge className="mt-2" variant="outline">受保护</Badge>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/30">
                        <h5 className="font-medium mb-2">开发分支 (develop)</h5>
                        <p className="text-sm text-muted-foreground">
                          开发分支是所有新功能和改进的集成点。开发中的功能都应该基于此分支创建。
                        </p>
                        <Badge className="mt-2" variant="outline">活跃开发</Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="p-4 rounded-lg bg-muted/30">
                        <h5 className="font-medium mb-2">功能分支 (feature/xxx)</h5>
                        <p className="text-sm text-muted-foreground">
                          每个新功能或改进都应该在单独的功能分支中开发，命名格式为 <code className="bg-background px-1 py-0.5 rounded text-xs">feature/功能名称</code>。
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/30">
                        <h5 className="font-medium mb-2">修复分支 (fix/xxx)</h5>
                        <p className="text-sm text-muted-foreground">
                          用于修复生产环境或开发环境中的问题，命名格式为 <code className="bg-background px-1 py-0.5 rounded text-xs">fix/问题描述</code>。
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <RefreshCw className="h-4 w-4 text-primary" />
                      开发工作流
                    </h4>
                    <ol className="list-decimal pl-5 space-y-3 text-sm">
                      <li><strong>更新开发分支</strong>: 确保您的 develop 分支是最新的
                        <pre className="mt-2 rounded-md bg-muted p-3 overflow-x-auto text-xs font-mono">
                          {`git checkout develop
git pull origin develop`}
                        </pre>
                      </li>
                      <li><strong>创建功能分支</strong>: 从 develop 分支创建新的功能分支
                        <pre className="mt-2 rounded-md bg-muted p-3 overflow-x-auto text-xs font-mono">
                          {`git checkout -b feature/your-feature-name`}
                        </pre>
                      </li>
                      <li><strong>开发和提交</strong>: 实现功能并定期提交代码
                        <pre className="mt-2 rounded-md bg-muted p-3 overflow-x-auto text-xs font-mono">
                          {`git add .
git commit -m "feat: 简要描述功能"`}
                        </pre>
                      </li>
                      <li><strong>推送分支</strong>: 将您的功能分支推送到远程仓库
                        <pre className="mt-2 rounded-md bg-muted p-3 overflow-x-auto text-xs font-mono">
                          {`git push origin feature/your-feature-name`}
                        </pre>
                      </li>
                      <li><strong>创建 Pull Request</strong>: 提交 PR 从功能分支到 develop 分支，等待代码审查</li>
                      <li><strong>合并代码</strong>: 代码审查通过后，将功能分支合并到 develop 分支</li>
                    </ol>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <FileCode className="h-4 w-4 text-primary" />
                      提交消息规范
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      项目采用标准化的提交消息格式，便于自动生成变更日志和版本管理。提交消息应遵循以下格式：
                    </p>
                    <div className="rounded-md bg-muted p-4 text-sm font-mono">
                      {`<类型>(<范围>): <简述>

[可选的正文]

[可选的页脚]`}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <h5 className="font-medium mb-2 text-sm">类型</h5>
                        <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground">
                          <li><strong>feat</strong>: 新功能</li>
                          <li><strong>fix</strong>: 修复 bug</li>
                          <li><strong>docs</strong>: 文档变更</li>
                          <li><strong>style</strong>: 不影响代码功能的变更（空白、格式化等）</li>
                          <li><strong>refactor</strong>: 既不是修复 bug 也不是添加功能的代码变更</li>
                          <li><strong>perf</strong>: 优化性能的代码变更</li>
                          <li><strong>test</strong>: 添加或修改测试</li>
                          <li><strong>build</strong>: 影响构建系统或外部依赖的变更</li>
                          <li><strong>ci</strong>: 更改 CI 配置文件和脚本</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2 text-sm">范围</h5>
                        <p className="text-xs text-muted-foreground">
                          范围可以是指定提交更改的模块或组件的名称，例如：
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground mt-2">
                          <li>auth</li>
                          <li>dashboard</li>
                          <li>user-profile</li>
                          <li>api</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h5 className="font-medium mb-2 text-sm">示例</h5>
                      <div className="rounded-md bg-muted p-3 text-sm font-mono">
                        {`feat(user): 添加用户个人资料编辑功能

fix(dashboard): 修复数据统计图表不更新的问题

docs(readme): 更新项目安装指南`}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 编码规范选项卡内容 */}
          <TabsContent value="coding" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>编码规范</CardTitle>
                <CardDescription>项目中遵循的编码标准和最佳实践</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible defaultValue="typescript">
                  <AccordionItem value="typescript">
                    <AccordionTrigger className="text-sm font-medium">TypeScript 规范</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 text-sm">
                        <div className="space-y-2">
                          <h4 className="font-medium">基本类型</h4>
                          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            <li>优先使用 TypeScript 内置类型，如 <code className="bg-background px-1 py-0.5 rounded text-xs">string</code>、<code className="bg-background px-1 py-0.5 rounded text-xs">number</code>、<code className="bg-background px-1 py-0.5 rounded text-xs">boolean</code> 等</li>
                            <li>为所有变量、函数参数和返回值添加明确的类型</li>
                            <li>避免过度使用 <code className="bg-background px-1 py-0.5 rounded text-xs">any</code> 类型，除非必要</li>
                          </ul>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium">接口和类型</h4>
                          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            <li>使用 <code className="bg-background px-1 py-0.5 rounded text-xs">interface</code> 定义对象的形状</li>
                            <li>使用 <code className="bg-background px-1 py-0.5 rounded text-xs">type</code> 定义联合类型、交叉类型或工具类型</li>
                            <li>为接口和类型使用有意义的名称，避免过于简化</li>
                          </ul>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium">代码示例</h4>
                          <pre className="rounded-md bg-muted p-3 overflow-x-auto text-xs font-mono">
                            {`// 推荐的类型定义方式
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

// 推荐的函数类型注解
function getUserById(id: string): User {
  // 实现代码
  return userData;
}`}
                          </pre>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="react">
                    <AccordionTrigger className="text-sm font-medium">React 组件规范</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 text-sm">
                        <div className="space-y-2">
                          <h4 className="font-medium">组件结构</h4>
                          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            <li>使用函数式组件和 React Hooks</li>
                            <li>为组件属性定义明确的接口</li>
                            <li>组件命名使用 PascalCase 格式</li>
                            <li>属性命名使用 camelCase 格式</li>
                          </ul>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium">Hooks 使用</h4>
                          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            <li>遵循 React Hooks 规则，只在函数组件的顶层调用 Hooks</li>
                            <li>自定义 Hook 命名以 <code className="bg-background px-1 py-0.5 rounded text-xs">use</code> 开头</li>
                            <li>合理使用 <code className="bg-background px-1 py-0.5 rounded text-xs">useCallback</code> 和 <code className="bg-background px-1 py-0.5 rounded text-xs">useMemo</code> 优化性能</li>
                          </ul>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium">代码示例</h4>
                          <pre className="rounded-md bg-muted p-3 overflow-x-auto text-xs font-mono">
                            {`import React, { useState, useEffect } from 'react';

interface ButtonProps {
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  variant = 'primary', 
  disabled = false, 
  children 
}) => {
  // 组件实现
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={\`px-4 py-2 rounded \${variant === 'primary' ? 'bg-primary' : 'bg-secondary'}\`}
    >
      {children}
    </button>
  );
};

export default Button;`}
                          </pre>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="styling">
                    <AccordionTrigger className="text-sm font-medium">样式规范</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 text-sm">
                        <div className="space-y-2">
                          <h4 className="font-medium">Tailwind CSS 使用</h4>
                          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            <li>优先使用 Tailwind CSS 类进行样式设计</li>
                            <li>遵循设计系统中定义的颜色、间距、字体大小等规范</li>
                            <li>合理使用 <code className="bg-background px-1 py-0.5 rounded text-xs">@apply</code> 提取可复用的样式组合</li>
                          </ul>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium">组件样式组织</h4>
                          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            <li>内联样式类直接写在组件文件中</li>
                            <li>对于复杂组件，可以使用 <code className="bg-background px-1 py-0.5 rounded text-xs">cn</code> 函数合并样式类</li>
                            <li>避免使用过时的 CSS-in-JS 方案</li>
                          </ul>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium">代码示例</h4>
                          <pre className="rounded-md bg-muted p-3 overflow-x-auto text-xs font-mono">
                            {`import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className, children }) => {
  return (
    <div 
      className={cn(
        'p-4 rounded-lg border bg-card shadow-sm',
        className
      )}
    >
      {children}
    </div>
  );
};`}
                          </pre>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="file-structure">
                    <AccordionTrigger className="text-sm font-medium">文件结构规范</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 text-sm">
                        <div className="space-y-2">
                          <h4 className="font-medium">目录组织</h4>
                          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            <li>遵循 Next.js 项目结构最佳实践</li>
                            <li>组件放在 <code className="bg-background px-1 py-0.5 rounded text-xs">components/</code> 目录下</li>
                            <li>工具函数放在 <code className="bg-background px-1 py-0.5 rounded text-xs">lib/</code> 目录下</li>
                            <li>自定义 Hooks 放在 <code className="bg-background px-1 py-0.5 rounded text-xs">hooks/</code> 目录下</li>
                            <li>页面组件放在 <code className="bg-background px-1 py-0.5 rounded text-xs">app/</code> 目录下</li>
                          </ul>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium">文件命名</h4>
                          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            <li>组件文件使用 PascalCase 命名，如 <code className="bg-background px-1 py-0.5 rounded text-xs">Button.tsx</code></li>
                            <li>工具函数和类型定义使用 camelCase 命名，如 <code className="bg-background px-1 py-0.5 rounded text-xs">apiUtils.ts</code></li>
                            <li>目录命名使用 kebab-case，如 <code className="bg-background px-1 py-0.5 rounded text-xs">user-profile/</code></li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 组件开发选项卡内容 */}
          <TabsContent value="components" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>组件开发</CardTitle>
                <CardDescription>如何在 YYC³ 项目中创建和使用组件</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <FileCode className="h-4 w-4 text-primary" />
                      组件创建流程
                    </h4>
                    <ol className="list-decimal pl-5 space-y-3 text-sm">
                      <li><strong>创建组件文件</strong>: 在 <code className="bg-background px-1 py-0.5 rounded text-xs">components/</code> 目录下创建组件文件</li>
                      <li><strong>定义组件接口</strong>: 为组件的 props 定义 TypeScript 接口</li>
                      <li><strong>实现组件逻辑</strong>: 编写组件的 JSX 结构和逻辑</li>
                      <li><strong>添加样式</strong>: 使用 Tailwind CSS 类或 CSS 模块添加样式</li>
                      <li><strong>导出组件</strong>: 确保组件被正确导出</li>
                      <li><strong>在页面中使用</strong>: 在需要的页面或组件中导入并使用</li>
                    </ol>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">基础组件示例</h4>
                    <div className="rounded-md bg-muted p-4 overflow-x-auto text-sm font-mono">
                      {`import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  children,
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variantStyles = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  };
  
  const sizeStyles = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-11 px-8 text-base',
  };
  
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
    >
      {children}
    </button>
  );
};

export default Button;`}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <Settings className="h-4 w-4 text-primary" />
                      组件最佳实践
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-muted/30">
                        <h5 className="font-medium mb-2">组件拆分</h5>
                        <p className="text-sm text-muted-foreground">
                          将大型组件拆分为更小、更专注的子组件，提高可维护性和复用性。遵循单一职责原则。
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/30">
                        <h5 className="font-medium mb-2">Props 设计</h5>
                        <p className="text-sm text-muted-foreground">
                          设计清晰、简洁的 props 接口，提供合理的默认值，避免过度配置。
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/30">
                        <h5 className="font-medium mb-2">状态管理</h5>
                        <p className="text-sm text-muted-foreground">
                          组件内部状态应尽量精简，复杂状态考虑使用全局状态管理或 React Context。
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/30">
                        <h5 className="font-medium mb-2">性能优化</h5>
                        <p className="text-sm text-muted-foreground">
                          对频繁重渲染的组件使用 React.memo，对复杂计算使用 useMemo，对回调函数使用 useCallback。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API集成选项卡内容 */}
          <TabsContent value="api" className="space-y-6">
            <Alert className="mb-6">
              <AlertDescription>
                注：当前项目处于前端开发阶段，后端API服务尚未完全实现。以下是规划的API集成方案。
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle>API集成</CardTitle>
                <CardDescription>与后端API服务交互的方法和最佳实践</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <Database className="h-4 w-4 text-primary" />
                      API请求封装
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      项目使用 axios 进行HTTP请求，创建了统一的API客户端，处理请求配置、错误处理、身份验证等通用逻辑。
                    </p>
                    
                    <div className="rounded-md bg-muted p-4 overflow-x-auto text-sm font-mono">
                      {`// lib/api.ts
import axios from 'axios';

// 创建axios实例
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器 - 添加认证令牌
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器 - 统一错误处理
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // 统一错误处理逻辑
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;`}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <Workflow className="h-4 w-4 text-primary" />
                      API服务模块
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      按功能模块组织API调用，每个功能模块对应一个服务文件，便于维护和测试。
                    </p>
                    
                    <div className="rounded-md bg-muted p-4 overflow-x-auto text-sm font-mono">
                      {`// services/userService.ts
import apiClient from '@/lib/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

export const userService = {
  // 获取当前用户信息
  getCurrentUser: async (): Promise<User> => {
    return apiClient.get('/users/me');
  },
  
  // 用户登录
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    return apiClient.post('/auth/login', credentials);
  },
  
  // 用户登出
  logout: async (): Promise<void> => {
    return apiClient.post('/auth/logout');
  },
  
  // 获取用户列表
  getUsers: async (): Promise<User[]> => {
    return apiClient.get('/users');
  },
};`}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      在组件中使用API
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      使用React Hooks在组件中处理API请求，管理加载状态、数据和错误。
                    </p>
                    
                    <div className="rounded-md bg-muted p-4 overflow-x-auto text-sm font-mono">
                      {`import React, { useState, useEffect } from 'react';
import { userService } from '@/services/userService';

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const data = await userService.getCurrentUser();
        setUser(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch user data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, []);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div className="text-destructive">{error}</div>;
  }
  
  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default UserProfile;`}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 测试指南选项卡内容 */}
          <TabsContent value="testing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>测试指南</CardTitle>
                <CardDescription>项目的测试策略和工具使用说明</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-muted/30">
                      <h5 className="font-medium mb-2 flex items-center gap-2">
                        <Play className="h-4 w-4 text-primary" />
                        单元测试
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        测试独立的函数和组件，验证其功能正确性。使用 Jest 作为测试框架。
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/30">
                      <h5 className="font-medium mb-2 flex items-center gap-2">
                        <Play className="h-4 w-4 text-primary" />
                        集成测试
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        测试多个组件或模块之间的交互，确保它们协同工作正常。
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/30">
                      <h5 className="font-medium mb-2 flex items-center gap-2">
                        <Play className="h-4 w-4 text-primary" />
                        E2E 测试
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        模拟用户操作，测试完整的业务流程。使用 Cypress 进行端到端测试。
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">运行测试</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm">运行单元测试</h5>
                        <div className="relative">
                          <pre className="rounded-md bg-muted p-3 overflow-x-auto text-xs font-mono">
                            {`# 使用 npm
npm test

# 或使用 yarn
yarn test

# 或使用 pnpm
pnpm test`}
                          </pre>
                          <button 
                            className="absolute top-2 right-2 p-1 rounded-md bg-background/70 hover:bg-background text-muted-foreground"
                            onClick={() => copyToClipboard("# 使用 npm\nnpm test\n\n# 或使用 yarn\nyarn test\n\n# 或使用 pnpm\npnpm test")}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm">运行 E2E 测试</h5>
                        <div className="relative">
                          <pre className="rounded-md bg-muted p-3 overflow-x-auto text-xs font-mono">
                            {`# 打开 Cypress 测试界面
npm run cypress:open

# 或在命令行中运行所有 E2E 测试
npm run cypress:run`}
                          </pre>
                          <button 
                            className="absolute top-2 right-2 p-1 rounded-md bg-background/70 hover:bg-background text-muted-foreground"
                            onClick={() => copyToClipboard("# 打开 Cypress 测试界面\nnpm run cypress:open\n\n# 或在命令行中运行所有 E2E 测试\nnpm run cypress:run")}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* 页脚 */}
      <footer className="mt-auto border-t py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">YYC³ 开发指南</span>
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
