// app/ai/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { StatCard, StatCardGroup } from '@/components/business/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Cpu, 
  Brain, 
  Zap, 
  BarChart3, 
  MessageSquare,
  Lightbulb,
  TrendingUp,
  Send,
  RefreshCw,
  Settings,
  FileText,
  Database
} from 'lucide-react';

export default function AIPage() {
  // 模拟AI模型数据
  const [aiModels, setAiModels] = useState([
    { 
      id: 1, 
      name: '文本生成模型', 
      type: 'NLP',
      status: 'running',
      accuracy: 94.5,
      requests: 12560,
      lastTrained: '2023-05-20'
    },
    { 
      id: 2, 
      name: '图像识别模型', 
      type: 'CV',
      status: 'running',
      accuracy: 92.3,
      requests: 8950,
      lastTrained: '2023-05-15'
    },
    { 
      id: 3, 
      name: '推荐系统', 
      type: 'RS',
      status: 'training',
      accuracy: 87.8,
      requests: 15420,
      lastTrained: '2023-05-25'
    },
    { 
      id: 4, 
      name: '异常检测模型', 
      type: 'AD',
      status: 'stopped',
      accuracy: 89.2,
      requests: 5420,
      lastTrained: '2023-05-10'
    }
  ]);

  // 模拟AI任务数据
  const [aiTasks, setAiTasks] = useState([
    { 
      id: 1, 
      name: '用户行为分析', 
      type: '分析',
      status: 'completed',
      progress: 100,
      createdAt: '2023-06-01',
      completedAt: '2023-06-02'
    },
    { 
      id: 2, 
      name: '内容分类', 
      type: '分类',
      status: 'running',
      progress: 65,
      createdAt: '2023-06-02',
      completedAt: null
    },
    { 
      id: 3, 
      name: '预测模型训练', 
      type: '训练',
      status: 'pending',
      progress: 0,
      createdAt: '2023-06-03',
      completedAt: null
    }
  ]);

  // AI聊天状态
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'ai', content: '您好！我是YYC³的AI助手，有什么可以帮助您的吗？', time: '10:00' },
    { id: 2, sender: 'user', content: '请帮我分析一下最近一周的用户活跃度数据', time: '10:02' },
    { id: 3, sender: 'ai', content: '根据最近一周的数据分析，用户活跃度相比上周提升了12.3%，主要增长来自移动端用户。详细报告已生成，您可以查看数据分析模块获取更多信息。', time: '10:03' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  // 发送消息
  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const userMessage = {
      id: chatMessages.length + 1,
      sender: 'user' as const,
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages([...chatMessages, userMessage]);
    setNewMessage('');
    
    // 模拟AI回复
    setTimeout(() => {
      const aiMessage = {
        id: chatMessages.length + 2,
        sender: 'ai' as const,
        content: '我正在处理您的请求，请稍候...',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  // 获取状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-100 text-green-800';
      case 'training':
        return 'bg-yellow-100 text-yellow-800';
      case 'stopped':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageTemplate
      title="AI智能"
      description="AI模型配置和智能分析界面，包含模型性能指标图表和预测结果展示"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '智能引擎', path: '/ai' },
        { title: 'AI智能', path: '/ai' }
      ]}
      actions={
        <Button>
          <Settings className="mr-2 h-4 w-4" />
          模型设置
        </Button>
      }
    >
      <div className="space-y-8">
        {/* AI统计卡片 */}
        <StatCardGroup>
          <StatCard
            title="AI模型数量"
            value="4"
            icon={<Brain className="h-5 w-5" />}
            description="当前运行的AI模型"
          />
          <StatCard
            title="今日请求量"
            value="24,560"
            change={{ value: 18, type: 'increase', text: '较昨日' }}
            icon={<Zap className="h-5 w-5" />}
            description="AI模型总请求量"
          />
          <StatCard
            title="平均准确率"
            value="91.2%"
            change={{ value: 2, type: 'increase', text: '较上周' }}
            icon={<BarChart3 className="h-5 w-5" />}
            description="AI模型平均准确率"
          />
          <StatCard
            title="处理时间"
            value="125ms"
            change={{ value: 5, type: 'decrease', text: '较上周' }}
            icon={<Cpu className="h-5 w-5" />}
            description="平均请求处理时间"
          />
        </StatCardGroup>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI模型列表 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="mr-2 h-5 w-5" />
                AI模型
              </CardTitle>
              <CardDescription>系统中的AI模型及其状态</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiModels.map(model => (
                  <div key={model.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{model.name}</div>
                      <Badge className={getStatusStyle(model.status)}>
                        {model.status === 'running' ? '运行中' :
                         model.status === 'training' ? '训练中' :
                         model.status === 'stopped' ? '已停止' : model.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-gray-500">类型</div>
                        <div>{model.type}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">准确率</div>
                        <div>{model.accuracy}%</div>
                      </div>
                      <div>
                        <div className="text-gray-500">请求数</div>
                        <div>{model.requests.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">最后训练</div>
                        <div>{model.lastTrained}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI任务列表 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="mr-2 h-5 w-5" />
                AI任务
              </CardTitle>
              <CardDescription>当前运行的AI任务</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiTasks.map(task => (
                  <div key={task.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{task.name}</div>
                      <Badge className={getStatusStyle(task.status)}>
                        {task.status === 'completed' ? '已完成' :
                         task.status === 'running' ? '运行中' :
                         task.status === 'pending' ? '等待中' : task.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-gray-500">
                        类型: {task.type} · 创建时间: {task.createdAt}
                      </div>
                      <div>
                        {task.status === 'completed' ? (
                          <span>完成时间: {task.completedAt}</span>
                        ) : (
                          <span>进度: {task.progress}%</span>
                        )}
                      </div>
                    </div>
                    {task.status !== 'completed' && (
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="h-2 rounded-full bg-blue-500"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI助手 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                AI助手
              </CardTitle>
              <CardDescription>与AI助手对话，获取智能分析和建议</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 overflow-y-auto mb-4 border rounded-lg p-4">
                {chatMessages.map(message => (
                  <div 
                    key={message.id} 
                    className={`mb-4 ${message.sender === 'user' ? 'text-right' : ''}`}
                  >
                    <div className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md ${
                      message.sender === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {message.content}
                    </div>
                    <div className={`text-xs text-gray-500 mt-1 ${
                      message.sender === 'user' ? 'text-right' : ''
                    }`}>
                      {message.time}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="输入您的问题..."
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button onClick={sendMessage} className="ml-2">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI洞察 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                AI洞察
              </CardTitle>
              <CardDescription>基于数据分析的AI洞察和建议</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-medium text-blue-800 flex items-center">
                    <Lightbulb className="mr-2 h-4 w-4" />
                    用户行为洞察
                  </div>
                  <div className="text-sm text-blue-700 mt-1">
                    根据最近数据分析，移动端用户活跃度显著提升，建议加强移动端功能开发和优化。
                  </div>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="font-medium text-green-800 flex items-center">
                    <Lightbulb className="mr-2 h-4 w-4" />
                    内容推荐优化
                  </div>
                  <div className="text-sm text-green-700 mt-1">
                    推荐算法显示，用户对技术类内容兴趣度上升，建议增加相关内容产出。
                  </div>
                </div>
                
                <div className="p-3 bg-amber-50 rounded-lg">
                  <div className="font-medium text-amber-800 flex items-center">
                    <Lightbulb className="mr-2 h-4 w-4" />
                    系统性能建议
                  </div>
                  <div className="text-sm text-amber-700 mt-1">
                    检测到数据库查询响应时间增加，建议优化索引或考虑分库分表方案。
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTemplate>
  );
}
