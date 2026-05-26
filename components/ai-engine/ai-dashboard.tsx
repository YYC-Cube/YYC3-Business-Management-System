"use client"

import { useState } from "react"
import { Brain, Sparkles, Target, TrendingUp, Zap, Settings } from 'lucide-react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EnhancedCard } from "../design-system/enhanced-card-system"
import { AnimatedContainer } from "../design-system/animation-system"

import { AIAssistant } from "./ai-assistant"
import { IntelligentAnalysis } from "./intelligent-analysis"
import { RecommendationEngine } from "./recommendation-engine"

export function AIDashboard() {
  const [activeTab, setActiveTab] = useState("assistant")

  return (
    <div className="space-y-6">
      {/* AI功能概览 */}
      <div className="grid gap-4 md:grid-cols-3">
        <AnimatedContainer animation="slideUp" delay={0}>
          <EnhancedCard variant="glass" interactive className="p-4 text-center">
            <Brain className="w-8 h-8 text-primary-500 mx-auto mb-2" />
            <h3 className="font-semibold">AI智能助手</h3>
            <p className="text-sm text-secondary-600">智能对话与业务咨询</p>
          </EnhancedCard>
        </AnimatedContainer>

        <AnimatedContainer animation="slideUp" delay={150}>
          <EnhancedCard variant="glass" interactive className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-accent-500 mx-auto mb-2" />
            <h3 className="font-semibold">智能分析</h3>
            <p className="text-sm text-secondary-600">数据洞察与预测分析</p>
          </EnhancedCard>
        </AnimatedContainer>

        <AnimatedContainer animation="slideUp" delay={300}>
          <EnhancedCard variant="glass" interactive className="p-4 text-center">
            <Target className="w-8 h-8 text-traditional-gold mx-auto mb-2" />
            <h3 className="font-semibold">智能推荐</h3>
            <p className="text-sm text-secondary-600">个性化推荐与优化</p>
          </EnhancedCard>
        </AnimatedContainer>
      </div>

      {/* AI功能主界面 */}
      <EnhancedCard variant="traditional" size="lg">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="assistant">
              <Brain className="w-4 h-4 mr-2" />
              AI助手
            </TabsTrigger>
            <TabsTrigger value="analysis">
              <TrendingUp className="w-4 h-4 mr-2" />
              智能分析
            </TabsTrigger>
            <TabsTrigger value="recommendations">
              <Target className="w-4 h-4 mr-2" />
              智能推荐
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assistant">
            <AIAssistant />
          </TabsContent>

          <TabsContent value="analysis">
            <IntelligentAnalysis />
          </TabsContent>

          <TabsContent value="recommendations">
            <RecommendationEngine />
          </TabsContent>
        </Tabs>
      </EnhancedCard>
    </div>
  )
}
