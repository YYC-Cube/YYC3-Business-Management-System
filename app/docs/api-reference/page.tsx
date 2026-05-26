"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown, Code, Database, Settings, Search, AlertCircle, Info, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"

// 定义TypeScript接口
interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  default?: string | number | boolean | null;
}

interface Response {
  type: string;
  description: string;
}

interface Endpoint {
  name: string;
  method: string;
  path: string;
  description: string;
  parameters: Parameter[];
  response: Response;
  status?: string;
  requestBody?: {
    type: string;
    description: string;
  };
}

interface Category {
  category: string;
  categoryName: string;
  icon: React.ReactNode;
  endpoints: Endpoint[];
}

// API参考文档页面
export default function ApiReference() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    user: true,
    project: false,
    task: false,
    data: false,
    ai: false,
    system: false
  })

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }))
  }

  // 基于之前搜索到的接口定义，创建API接口数据
  const apiEndpoints: Category[] = [
    {
      category: 'user',
      categoryName: '用户管理',
      icon: <Settings className="w-4 h-4" />,
      endpoints: [
        {
          name: '获取用户信息',
          method: 'GET',
          path: '/api/users/:id',
          description: '获取指定用户的详细信息',
          parameters: [
            { name: 'id', type: 'string', required: true, description: '用户唯一标识符' }
          ],
          response: {
            type: 'User',
            description: '用户详细信息对象'
          },
          status: 'planned'
        },
        {
          name: '创建用户',
          method: 'POST',
          path: '/api/users',
          description: '创建新用户账户',
          parameters: [],
          requestBody: {
            type: 'UserCreateRequest',
            description: '用户创建请求对象'
          },
          response: {
            type: 'User',
            description: '创建的用户信息'
          },
          status: 'planned'
        }
      ]
    },
    {
      category: 'project',
      categoryName: '项目管理',
      icon: <Database className="w-4 h-4" />,
      endpoints: [
        {
          name: '获取项目列表',
          method: 'GET',
          path: '/api/projects',
          description: '获取用户有权访问的项目列表',
          parameters: [
            { name: 'page', type: 'number', required: false, default: 1, description: '页码' },
            { name: 'limit', type: 'number', required: false, default: 20, description: '每页数量' },
            { name: 'status', type: 'string', required: false, description: '项目状态筛选' }
          ],
          response: {
            type: 'Project[]',
            description: '项目列表'
          },
          status: 'planned'
        },
        {
          name: '获取项目详情',
          method: 'GET',
          path: '/api/projects/:id',
          description: '获取指定项目的详细信息',
          parameters: [
            { name: 'id', type: 'string', required: true, description: '项目唯一标识符' }
          ],
          response: {
            type: 'Project',
            description: '项目详细信息'
          },
          status: 'planned'
        }
      ]
    },
    {
      category: 'task',
      categoryName: '任务管理',
      icon: <CheckCircle2 className="w-4 h-4" />,
      endpoints: [
        {
          name: '创建任务',
          method: 'POST',
          path: '/api/projects/:projectId/tasks',
          description: '在指定项目中创建新任务',
          parameters: [
            { name: 'projectId', type: 'string', required: true, description: '项目唯一标识符' }
          ],
          requestBody: {
            type: 'TaskCreateRequest',
            description: '任务创建请求对象'
          },
          response: {
            type: 'Task',
            description: '创建的任务信息'
          },
          status: 'planned'
        },
        {
          name: '更新任务状态',
          method: 'PATCH',
          path: '/api/tasks/:id/status',
          description: '更新任务的状态',
          parameters: [
            { name: 'id', type: 'string', required: true, description: '任务唯一标识符' }
          ],
          requestBody: {
            type: 'TaskStatusUpdateRequest',
            description: '任务状态更新请求对象'
          },
          response: {
            type: 'Task',
            description: '更新后的任务信息'
          },
          status: 'planned'
        }
      ]
    },
    {
      category: 'data',
      categoryName: '数据中心',
      icon: <Database className="w-4 h-4" />,
      endpoints: [
        {
          name: '获取数据源列表',
          method: 'GET',
          path: '/api/data-sources',
          description: '获取所有可用的数据源',
          parameters: [],
          response: {
            type: 'DataSource[]',
            description: '数据源列表'
          },
          status: 'planned'
        },
        {
          name: '获取数据集',
          method: 'GET',
          path: '/api/data-sources/:id/data',
          description: '获取指定数据源的数据集',
          parameters: [
            { name: 'id', type: 'string', required: true, description: '数据源唯一标识符' },
            { name: 'query', type: 'string', required: false, description: '数据查询参数' },
            { name: 'startDate', type: 'string', required: false, description: '开始日期' },
            { name: 'endDate', type: 'string', required: false, description: '结束日期' }
          ],
          response: {
            type: 'DataSet',
            description: '数据集结果'
          },
          status: 'planned'
        }
      ]
    },
    {
      category: 'ai',
      categoryName: 'AI服务',
      icon: <Settings className="w-4 h-4" />,
      endpoints: [
        {
          name: '发送AI请求',
          method: 'POST',
          path: '/api/ai/request',
          description: '向AI引擎发送请求并获取智能分析结果',
          parameters: [],
          requestBody: {
            type: 'AIRequest',
            description: 'AI请求对象'
          },
          response: {
            type: 'AIResponse',
            description: 'AI分析结果'
          },
          status: 'planned'
        },
        {
          name: '获取AI洞察',
          method: 'GET',
          path: '/api/ai/insights',
          description: '获取系统生成的AI洞察和建议',
          parameters: [
            { name: 'type', type: 'string', required: false, description: '洞察类型' },
            { name: 'limit', type: 'number', required: false, default: 10, description: '返回数量限制' }
          ],
          response: {
            type: 'AIInsight[]',
            description: 'AI洞察列表'
          },
          status: 'planned'
        }
      ]
    },
    {
      category: 'system',
      categoryName: '系统管理',
      icon: <Settings className="w-4 h-4" />,
      endpoints: [
        {
          name: '获取系统状态',
          method: 'GET',
          path: '/api/system/status',
          description: '获取系统的当前状态信息',
          parameters: [],
          response: {
            type: 'SystemStatus',
            description: '系统状态信息'
          },
          status: 'planned'
        },
        {
          name: '获取配置项',
          method: 'GET',
          path: '/api/system/config/:key',
          description: '获取指定的系统配置项',
          parameters: [
            { name: 'key', type: 'string', required: true, description: '配置项键名' }
          ],
          response: {
            type: 'ConfigItem',
            description: '配置项信息'
          },
          status: 'planned'
        }
      ]
    }
  ]

  // 数据类型定义
  const dataTypes = [
    {
      name: 'User',
      description: '用户信息对象',
      properties: [
        { name: 'id', type: 'string', required: true, description: '用户唯一标识符' },
        { name: 'name', type: 'string', required: true, description: '用户姓名' },
        { name: 'email', type: 'string', required: true, description: '电子邮箱' },
        { name: 'avatar', type: 'string', required: false, description: '头像URL' },
        { name: 'role', type: 'string', required: true, description: '用户角色' },
        { name: 'status', type: 'string', required: true, description: '用户状态' },
        { name: 'createdAt', type: 'string', required: true, description: '创建时间' },
        { name: 'updatedAt', type: 'string', required: true, description: '更新时间' }
      ]
    },
    {
      name: 'Project',
      description: '项目信息对象',
      properties: [
        { name: 'id', type: 'string', required: true, description: '项目唯一标识符' },
        { name: 'name', type: 'string', required: true, description: '项目名称' },
        { name: 'description', type: 'string', required: false, description: '项目描述' },
        { name: 'status', type: 'string', required: true, description: '项目状态' },
        { name: 'startDate', type: 'string', required: false, description: '开始日期' },
        { name: 'endDate', type: 'string', required: false, description: '结束日期' },
        { name: 'ownerId', type: 'string', required: true, description: '项目负责人ID' },
        { name: 'members', type: 'User[]', required: true, description: '项目成员列表' }
      ]
    },
    {
      name: 'Task',
      description: '任务信息对象',
      properties: [
        { name: 'id', type: 'string', required: true, description: '任务唯一标识符' },
        { name: 'title', type: 'string', required: true, description: '任务标题' },
        { name: 'description', type: 'string', required: false, description: '任务描述' },
        { name: 'status', type: 'string', required: true, description: '任务状态' },
        { name: 'priority', type: 'string', required: false, description: '任务优先级' },
        { name: 'assigneeId', type: 'string', required: false, description: '任务负责人ID' },
        { name: 'projectId', type: 'string', required: true, description: '所属项目ID' },
        { name: 'dueDate', type: 'string', required: false, description: '截止日期' }
      ]
    },
    {
      name: 'DataSource',
      description: '数据源信息对象',
      properties: [
        { name: 'id', type: 'string', required: true, description: '数据源唯一标识符' },
        { name: 'name', type: 'string', required: true, description: '数据源名称' },
        { name: 'type', type: 'string', required: true, description: '数据源类型' },
        { name: 'status', type: 'string', required: true, description: '数据源状态' },
        { name: 'connectionDetails', type: 'object', required: false, description: '连接详情' },
        { name: 'lastSynced', type: 'string', required: false, description: '最后同步时间' }
      ]
    },
    {
      name: 'AIRequest',
      description: 'AI请求对象',
      properties: [
        { name: 'prompt', type: 'string', required: true, description: '提示文本' },
        { name: 'type', type: 'string', required: false, description: '请求类型' },
        { name: 'context', type: 'object', required: false, description: '上下文信息' },
        { name: 'model', type: 'string', required: false, description: '使用的模型' }
      ]
    }
  ]

  // API设计指南
  const apiGuidelines = [
    {
      title: '设计原则',
      content: '我们的API设计遵循RESTful原则，使用清晰的资源路径、适当的HTTP方法和状态码，确保API的可理解性和可维护性。'
    },
    {
      title: '认证授权',
      content: '所有API端点都需要身份验证，支持JWT令牌认证。部分端点还需要特定的授权权限才能访问。'
    },
    {
      title: '错误处理',
      content: 'API使用标准的HTTP状态码来表示请求的结果，并在响应体中包含详细的错误信息，便于客户端进行错误处理。'
    },
    {
      title: '版本控制',
      content: 'API采用URL路径版本控制，确保API变更不会破坏现有客户端的功能。'
    },
    {
      title: '限流策略',
      content: '为保护系统稳定，API实施了限流策略，对过高频率的请求会返回429状态码。'
    },
    {
      title: '数据格式',
      content: '所有API请求和响应都使用JSON格式，确保数据的一致性和易于处理。'
    }
  ]

  // 过滤API端点
  const filteredEndpoints = apiEndpoints.map(category => ({
    ...category,
    endpoints: category.endpoints.filter(endpoint => 
      endpoint.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      endpoint.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      endpoint.path.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.endpoints.length > 0)

  // 获取状态标签颜色
  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'planned':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      case 'implemented':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
    }
  }

  // 获取HTTP方法标签颜色
  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case 'POST':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      case 'PUT':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
      case 'PATCH':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
      case 'DELETE':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90">
      {/* 头部 */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">API 参考文档</h1>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="container px-4 py-8 md:px-6 md:py-12">
        {/* API概览卡片 */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">YYC³ API</CardTitle>
            <CardDescription>
              全面的接口参考，帮助您集成和扩展 YYC³ 平台功能
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索API端点..."
                  className="w-full pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Alert className="bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-200">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  提示：部分API仍在开发中，标记为"planned"的接口将在后续版本中提供
                </AlertDescription>
              </Alert>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                <Database className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium mb-1">RESTful API</h3>
                <p className="text-sm text-muted-foreground">
                  遵循行业标准的RESTful设计原则
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                <Settings className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium mb-1">安全认证</h3>
                <p className="text-sm text-muted-foreground">
                  基于JWT的安全认证机制
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                <CheckCircle2 className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium mb-1">标准响应</h3>
                <p className="text-sm text-muted-foreground">
                  统一的JSON数据格式和错误处理
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API详情选项卡 */}
        <Tabs defaultValue="endpoints" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="endpoints">API端点</TabsTrigger>
            <TabsTrigger value="data-types">数据类型</TabsTrigger>
            <TabsTrigger value="guidelines">API指南</TabsTrigger>
          </TabsList>

          {/* API端点内容 */}
          <TabsContent value="endpoints" className="space-y-6">
            {filteredEndpoints.length > 0 ? (
              <div className="space-y-4">
                {filteredEndpoints.map((category) => (
                  <div key={category.category} className="border rounded-lg overflow-hidden">
                    <div 
                      className="flex items-center justify-between p-4 bg-card hover:bg-muted cursor-pointer"
                      onClick={() => toggleCategory(category.category)}
                    >
                      <div className="flex items-center gap-2">
                        {category.icon}
                        <h3 className="font-medium">{category.categoryName}</h3>
                        <Badge variant="outline" className="ml-2">
                          {category.endpoints.length}
                        </Badge>
                      </div>
                      {expandedCategories[category.category] ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </div>
                    
                    {expandedCategories[category.category] && (
                      <div className="divide-y">
                        {category.endpoints.map((endpoint) => (
                          <div key={`${category.category}-${endpoint.name}`} className="p-4">
                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                              <div className="flex items-center gap-2">
                                <Badge className={`${getMethodColor(endpoint.method)}`}>
                                  {endpoint.method}
                                </Badge>
                                <h4 className="font-medium">{endpoint.name}</h4>
                              </div>
                              <div className="flex-1 text-muted-foreground text-sm bg-muted/50 px-3 py-1 rounded">
                                {endpoint.path}
                              </div>
                              {endpoint.status && (
                                  <Badge className={`${getStatusColor(endpoint.status)}`}>
                                    {endpoint.status === 'planned' ? '计划中' : endpoint.status === 'in-progress' ? '开发中' : '已实现'}
                                  </Badge>
                                )}
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-4">
                              {endpoint.description}
                            </p>
                            
                            {/* 参数表 */}
                            {endpoint.parameters && endpoint.parameters.length > 0 && (
                              <div className="mb-4">
                                <h5 className="text-sm font-medium mb-2">参数</h5>
                                <div className="overflow-x-auto">
                                  <table className="min-w-full border rounded">
                                    <thead>
                                      <tr className="bg-muted">
                                        <th className="text-left text-xs font-medium px-3 py-2">名称</th>
                                        <th className="text-left text-xs font-medium px-3 py-2">类型</th>
                                        <th className="text-left text-xs font-medium px-3 py-2">必需</th>
                                        <th className="text-left text-xs font-medium px-3 py-2">默认值</th>
                                        <th className="text-left text-xs font-medium px-3 py-2">描述</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                      {endpoint.parameters.map((param) => (
                                        <tr key={param.name}>
                                          <td className="px-3 py-2 text-sm font-medium">{param.name}</td>
                                          <td className="px-3 py-2 text-sm">{param.type}</td>
                                          <td className="px-3 py-2 text-sm">{param.required ? '是' : '否'}</td>
                                          <td className="px-3 py-2 text-sm">{('default' in param) ? param.default : '-'}</td>
                                          <td className="px-3 py-2 text-sm text-muted-foreground">{param.description}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}
                            
                            {/* 请求体 */}
                            {endpoint.requestBody && (
                              <div className="mb-4">
                                <h5 className="text-sm font-medium mb-2">请求体</h5>
                                <div className="bg-muted/50 p-3 rounded text-sm">
                                  <span className="font-mono">{endpoint.requestBody.type}</span>
                                  <p className="mt-1 text-muted-foreground">{endpoint.requestBody.description}</p>
                                </div>
                              </div>
                            )}
                            
                            {/* 响应 */}
                            {endpoint.response && (
                              <div>
                                <h5 className="text-sm font-medium mb-2">响应</h5>
                                <div className="bg-muted/50 p-3 rounded text-sm">
                                  <span className="font-mono">{endpoint.response.type}</span>
                                  <p className="mt-1 text-muted-foreground">{endpoint.response.description}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <Card className="border-0 bg-muted/50">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">未找到匹配的API端点</h3>
                  <p className="text-muted-foreground max-w-md">
                    尝试使用不同的搜索词或浏览所有可用的API端点
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* 数据类型内容 */}
          <TabsContent value="data-types">
            <ScrollArea className="h-[600px]">
              <div className="space-y-6">
                {dataTypes.map((dataType) => (
                  <Card key={dataType.name}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{dataType.name}</CardTitle>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant="outline">数据模型</Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>JSON数据结构定义</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <CardDescription>{dataType.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="min-w-full border rounded">
                          <thead>
                            <tr className="bg-muted">
                              <th className="text-left text-xs font-medium px-3 py-2">属性名</th>
                              <th className="text-left text-xs font-medium px-3 py-2">类型</th>
                              <th className="text-left text-xs font-medium px-3 py-2">必需</th>
                              <th className="text-left text-xs font-medium px-3 py-2">描述</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {dataType.properties.map((prop) => (
                              <tr key={prop.name}>
                                <td className="px-3 py-2 text-sm font-medium">{prop.name}</td>
                                <td className="px-3 py-2 text-sm font-mono bg-muted/30 rounded">{prop.type}</td>
                                <td className="px-3 py-2 text-sm">{prop.required ? '是' : '否'}</td>
                                <td className="px-3 py-2 text-sm text-muted-foreground">{prop.description}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      {/* 示例JSON结构 */}
                      <div className="mt-4">
                        <h5 className="text-sm font-medium mb-2">示例结构</h5>
                        <div className="bg-muted p-3 rounded text-xs font-mono overflow-x-auto">
                          {(() => {
                            const example = {} as Record<string, any>
                            dataType.properties.forEach(prop => {
                              if (prop.type.includes('[]')) {
                                example[prop.name] = []
                              } else if (prop.type === 'string') {
                                example[prop.name] = 'string'
                              } else if (prop.type === 'number') {
                                example[prop.name] = 0
                              } else if (prop.type === 'boolean') {
                                example[prop.name] = false
                              } else if (prop.type === 'object') {
                                example[prop.name] = {}
                              } else {
                                example[prop.name] = '{' + prop.type + '}'
                              }
                            })
                            return JSON.stringify(example, null, 2)
                          })()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* API指南内容 */}
          <TabsContent value="guidelines">
            <div className="space-y-6">
              {apiGuidelines.map((guideline, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{guideline.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{guideline.content}</p>
                  </CardContent>
                </Card>
              ))}
              
              {/* 常见问题 */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">常见问题</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-1">如何获取API访问权限？</h4>
                      <p className="text-sm text-muted-foreground">
                        通过系统管理员账户在"系统设置-API管理"页面生成API密钥，每个用户最多可以生成5个活跃的API密钥。
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">API请求频率限制是多少？</h4>
                      <p className="text-sm text-muted-foreground">
                        目前系统对每个API密钥的请求频率限制为每分钟100次，超出限制会返回429状态码。
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">如何处理API错误？</h4>
                      <p className="text-sm text-muted-foreground">
                        API错误响应包含详细的错误信息和建议的解决方法，请根据错误信息调整请求参数或检查认证状态。
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
