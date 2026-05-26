"use client"

import type React from "react"
import { useEffect, useRef, useState, useCallback } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimatedContainer } from "./animation-system"
import { SoundButton } from "./sound-system"

interface MenuItem {
  title: string
  icon: React.ComponentType<{ className?: string }>
  href?: string
  children?: MenuItem[]
}

interface ScrollableNavigationProps {
  menuItems: MenuItem[]
  activeMenu: string
  openMenus: string[]
  onMenuClick: (title: string) => void
  onToggleMenu: (title: string) => void
}

export function ScrollableNavigation({
  menuItems,
  activeMenu,
  openMenus,
  onMenuClick,
  onToggleMenu,
}: ScrollableNavigationProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollUp, setCanScrollUp] = useState(false)
  const [canScrollDown, setCanScrollDown] = useState(false)
  const [isScrollable, setIsScrollable] = useState(false)

  // 检查滚动状态的函数
  const checkScrollState = useCallback(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const { scrollTop, scrollHeight, clientHeight } = container
    const hasOverflow = scrollHeight > clientHeight
    const threshold = 10

    setIsScrollable(hasOverflow)
    setCanScrollUp(hasOverflow && scrollTop > threshold)
    setCanScrollDown(hasOverflow && scrollTop < scrollHeight - clientHeight - threshold)
  }, [])

  // 防抖的检查函数
  const debouncedCheck = useCallback(() => {
    const timeoutId = setTimeout(checkScrollState, 100)
    return () => clearTimeout(timeoutId)
  }, [checkScrollState])

  // 初始化和事件监听
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    // 立即检查一次
    checkScrollState()

    // 延迟检查确保DOM完全渲染
    const initialTimeout = setTimeout(checkScrollState, 500)

    // 监听滚动事件
    const handleScroll = () => {
      checkScrollState()
    }

    // 监听窗口大小变化
    const handleResize = () => {
      debouncedCheck()
    }

    container.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize)

    // 使用 MutationObserver 监听内容变化
    const observer = new MutationObserver(() => {
      debouncedCheck()
    })

    observer.observe(container, {
      childList: true,
      subtree: true,
      attributes: true,
    })

    return () => {
      clearTimeout(initialTimeout)
      container.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
      observer.disconnect()
    }
  }, [checkScrollState, debouncedCheck])

  // 监听菜单展开状态变化
  useEffect(() => {
    const timeout = setTimeout(checkScrollState, 350) // 等待动画完成
    return () => clearTimeout(timeout)
  }, [openMenus, checkScrollState])

  // 平滑滚动函数
  const smoothScroll = (direction: "up" | "down") => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = 100
    const currentScrollTop = container.scrollTop
    const maxScrollTop = container.scrollHeight - container.clientHeight

    let targetScrollTop: number

    if (direction === "up") {
      targetScrollTop = Math.max(0, currentScrollTop - scrollAmount)
    } else {
      targetScrollTop = Math.min(maxScrollTop, currentScrollTop + scrollAmount)
    }

    container.scrollTo({
      top: targetScrollTop,
      behavior: "smooth",
    })
  }

  return (
    <div className="relative flex flex-col h-full">
      {/* 滚动向上按钮 */}
      {isScrollable && canScrollUp && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-50">
          <SoundButton
            variant="ghost"
            size="icon"
            className="h-6 w-6 bg-white/95 hover:bg-primary-50 shadow-lg rounded-full border border-primary-200/50 backdrop-blur-sm"
            onClick={() => smoothScroll("up")}
            soundType="click"
            aria-label="向上滚动导航菜单"
          >
            <ChevronUp className="h-3 w-3 text-primary-600" />
          </SoundButton>
        </div>
      )}

      {/* 顶部渐变遮罩 */}
      {isScrollable && (
        <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white/95 via-white/70 to-transparent z-40 pointer-events-none" />
      )}

      {/* 滚动容器 - 关键修复 */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-2"
        style={{
          height: "100%",
          maxHeight: "100%",
          scrollbarWidth: "thin",
          scrollbarColor: "rgb(14 165 233 / 0.3) transparent",
        }}
      >
        <nav role="navigation" aria-label="主导航菜单" className="space-y-1">
          {menuItems.map((item, index) => (
            <AnimatedContainer key={item.title} animation="slideRight" delay={index * 20}>
              {item.children ? (
                <Collapsible open={openMenus.includes(item.title)} onOpenChange={() => onToggleMenu(item.title)}>
                  <CollapsibleTrigger asChild>
                    <SoundButton
                      variant="ghost"
                      className={cn(
                        "w-full justify-between text-left px-2.5 py-2 rounded-lg transition-all duration-300",
                        "hover:bg-primary-50 hover:text-primary-700 hover:shadow-sm",
                        activeMenu === item.title && "bg-primary-100 text-primary-800 shadow-sm font-medium",
                        item.children?.some((child) => child.title === activeMenu) &&
                          "bg-primary-50 text-primary-700 border-l-2 border-primary-400",
                      )}
                      soundType="hover"
                      aria-expanded={openMenus.includes(item.title)}
                      aria-label={`${item.title}菜单，${openMenus.includes(item.title) ? "已展开" : "已收起"}`}
                    >
                      <div className="flex items-center space-x-2 min-w-0">
                        <item.icon
                          className={cn(
                            "w-4 h-4 transition-colors duration-300 flex-shrink-0",
                            activeMenu === item.title && "text-primary-600",
                            item.children?.some((child) => child.title === activeMenu) && "text-primary-500",
                          )}
                        />
                        <span className="text-xs font-medium truncate">{item.title}</span>
                      </div>
                      <ChevronDown
                        className={cn(
                          "w-3 h-3 transition-all duration-300 flex-shrink-0",
                          openMenus.includes(item.title) && "rotate-180",
                          (activeMenu === item.title || item.children?.some((child) => child.title === activeMenu)) &&
                            "text-primary-600",
                        )}
                      />
                    </SoundButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-0.5 mt-1 ml-1">
                    {item.children.map((child) => (
                      <SoundButton
                        key={child.title}
                        variant="ghost"
                        className={cn(
                          "w-full justify-start text-left px-2.5 py-1.5 rounded-md text-xs transition-all duration-300",
                          "hover:bg-primary-50 hover:text-primary-700 hover:translate-x-1",
                          activeMenu === child.title &&
                            "bg-primary-500 text-white shadow-md font-medium border-l-2 border-primary-300",
                        )}
                        onClick={() => onMenuClick(child.title)}
                        soundType="click"
                        aria-label={`进入${child.title}页面${activeMenu === child.title ? "（当前页面）" : ""}`}
                      >
                        <child.icon
                          className={cn(
                            "w-3 h-3 mr-2 transition-colors duration-300 flex-shrink-0",
                            activeMenu === child.title && "text-white",
                          )}
                        />
                        <span className="truncate">{child.title}</span>
                      </SoundButton>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <SoundButton
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-left px-2.5 py-2 rounded-lg transition-all duration-300",
                    "hover:bg-primary-50 hover:text-primary-700 hover:shadow-sm",
                    activeMenu === item.title && "bg-primary-500 text-white shadow-md font-medium",
                  )}
                  onClick={() => onMenuClick(item.title)}
                  soundType="click"
                  aria-label={`进入${item.title}页面${activeMenu === item.title ? "（当前页面）" : ""}`}
                >
                  <item.icon
                    className={cn(
                      "w-4 h-4 mr-2 transition-colors duration-300 flex-shrink-0",
                      activeMenu === item.title && "text-white",
                    )}
                  />
                  <span className="text-xs font-medium truncate">{item.title}</span>
                </SoundButton>
              )}
            </AnimatedContainer>
          ))}
        </nav>
      </div>

      {/* 底部渐变遮罩 */}
      {isScrollable && (
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white/95 via-white/70 to-transparent z-40 pointer-events-none" />
      )}

      {/* 滚动向下按钮 */}
      {isScrollable && canScrollDown && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-50">
          <SoundButton
            variant="ghost"
            size="icon"
            className="h-6 w-6 bg-white/95 hover:bg-primary-50 shadow-lg rounded-full border border-primary-200/50 backdrop-blur-sm"
            onClick={() => smoothScroll("down")}
            soundType="click"
            aria-label="向下滚动导航菜单"
          >
            <ChevronDown className="h-3 w-3 text-primary-600" />
          </SoundButton>
        </div>
      )}
    </div>
  )
}
