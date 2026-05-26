"use client"

import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface ResponsiveLayoutProps {
  children: ReactNode
  className?: string
}

// 响应式容器组件
export function ResponsiveContainer({ children, className }: ResponsiveLayoutProps) {
  return (
    <div
      className={cn(
        // 基础布局
        "w-full h-screen flex",
        // 响应式断点
        "min-h-screen max-h-screen",
        // 防止内容溢出
        "overflow-hidden",
        className,
      )}
    >
      {children}
    </div>
  )
}

// 侧边栏容器
export function SidebarContainer({ children, className }: ResponsiveLayoutProps) {
  return (
    <aside
      className={cn(
        // 基础样式
        "bg-white/95 backdrop-blur-sm border-r border-secondary-200/50",
        // 桌面端固定宽度
        "hidden lg:flex lg:flex-col",
        // 响应式宽度 - 根据屏幕尺寸调整
        "lg:w-44 xl:w-48 2xl:w-52", // 176px, 192px, 208px
        // 高度和溢出控制
        "h-full flex-shrink-0",
        className,
      )}
    >
      {children}
    </aside>
  )
}

// 主内容区域
export function MainContentContainer({ children, className }: ResponsiveLayoutProps) {
  return (
    <main
      className={cn(
        // Flex布局
        "flex-1 flex flex-col",
        // 防止内容溢出
        "min-w-0 overflow-hidden",
        // 高度控制
        "h-full",
        className,
      )}
    >
      {children}
    </main>
  )
}

// 头部容器
export function HeaderContainer({ children, className }: ResponsiveLayoutProps) {
  return (
    <header
      className={cn(
        // 基础样式
        "border-b border-secondary-200/50 bg-white/90 backdrop-blur-sm",
        // 高度固定
        "h-14 sm:h-16",
        // Flex布局
        "flex items-center flex-shrink-0",
        // 内边距响应式
        "px-3 sm:px-4 lg:px-6",
        className,
      )}
      role="banner"
    >
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 w-full">{children}</div>
    </header>
  )
}

// 内容区域容器
export function ContentContainer({ children, className }: ResponsiveLayoutProps) {
  return (
    <div
      className={cn(
        // Flex布局
        "flex-1 overflow-auto",
        // 内边距响应式
        "p-3 sm:p-4 lg:p-6",
        // 背景渐变
        "bg-gradient-to-br from-white via-secondary-50/30 to-primary-50/20",
        className,
      )}
      role="main"
    >
      <div className="max-w-7xl mx-auto w-full">{children}</div>
    </div>
  )
}

// Logo区域容器
export function LogoContainer({ children, className }: ResponsiveLayoutProps) {
  return (
    <div
      className={cn(
        // 基础样式
        "border-b border-secondary-200/50 flex-shrink-0",
        // 响应式内边距
        "p-3 lg:p-4",
        // 居中对齐
        "flex items-center justify-center",
        className,
      )}
    >
      {children}
    </div>
  )
}

// 导航区域容器
export function NavigationContainer({ children, className }: ResponsiveLayoutProps) {
  return (
    <div
      className={cn(
        // Flex布局 - 关键：确保可以收缩
        "flex-1 min-h-0",
        // 溢出控制
        "overflow-hidden",
        className,
      )}
    >
      {children}
    </div>
  )
}

// Footer区域容器
export function FooterContainer({ children, className }: ResponsiveLayoutProps) {
  return (
    <div
      className={cn(
        // 基础样式
        "border-t border-secondary-200/50 flex-shrink-0",
        // 响应式内边距
        "p-3 lg:p-4",
        // 文本居中
        "text-center",
        className,
      )}
    >
      {children}
    </div>
  )
}

// 搜索框容器
export function SearchContainer({ children, className }: ResponsiveLayoutProps) {
  return (
    <div
      className={cn(
        // 响应式宽度
        "flex-1 max-w-xs sm:max-w-sm lg:max-w-md",
        // 最小宽度防止过度收缩
        "min-w-0",
        className,
      )}
    >
      {children}
    </div>
  )
}

// 操作按钮组容器
export function ActionsContainer({ children, className }: ResponsiveLayoutProps) {
  return (
    <div
      className={cn(
        // Flex布局
        "flex items-center flex-shrink-0",
        // 响应式间距
        "space-x-1 sm:space-x-2 lg:space-x-3",
        className,
      )}
    >
      {children}
    </div>
  )
}
