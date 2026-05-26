"use client"

import { useState } from "react"
import { BookOpen, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

// 组件文档页面
export default function ComponentDocumentation() {
  const [searchQuery, setSearchQuery] = useState("")

  // 简单的组件列表数据
  const componentCategories = [
    { name: "基础组件", components: ["Button", "Card", "Input", "Select"] },
    { name: "布局组件", components: ["Layout", "Grid", "Flex", "Container"] },
    { name: "交互组件", components: ["Dialog", "Dropdown", "Tooltip", "Modal"] },
    { name: "表单组件", components: ["Form", "Checkbox", "Radio", "Slider"] }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90">
      {/* 头部 */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">组件文档</h1>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="container px-4 py-8 md:px-6 md:py-12">
        {/* 组件概览卡片 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">YYC³ 组件库</CardTitle>
            <CardDescription>
              全面的UI组件参考，帮助您构建一致、美观的用户界面
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-6">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索组件..."
                className="w-full pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* 组件类别选项卡 */}
        <Tabs defaultValue="基础组件" className="w-full">
          <TabsList className="mb-6 flex flex-wrap">
            {componentCategories.map((category) => (
              <TabsTrigger key={category.name} value={category.name}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {componentCategories.map((category) => (
            <TabsContent key={category.name} value={category.name} className="space-y-4">
              <ScrollArea className="h-[500px] rounded-lg border p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.components.map((componentName) => (
                    <Card key={componentName}>
                      <CardHeader>
                        <CardTitle className="text-lg">{componentName}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {componentName}组件的简要说明
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      {/* 页脚 */}
      <footer className="border-t py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">YYC³ 组件文档</span>
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
