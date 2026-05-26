// app/chat/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare, 
  Users, 
  Bot, 
  Send,
  Search,
  Plus,
  Settings,
  Paperclip,
  Smile,
  MoreHorizontal,
  Phone,
  Video,
  Info,
  Check,
  CheckCheck
} from 'lucide-react';

export default function ChatPage() {
  // 模拟聊天列表数据
  const [chatList, setChatList] = useState([
    { 
      id: 1, 
      name: '产品团队', 
      type: 'group',
      lastMessage: '新版本计划已经确定',
      time: '10:30',
      unread: 3,
      members: 8,
      avatar: ''
    },
    { 
      id: 2, 
      name: '张三', 
      type: 'private',
      lastMessage: '明天的会议准备好了吗？',
      time: '09:45',
      unread: 0,
      members: 1,
      avatar: ''
    },
    { 
      id: 3, 
      name: '技术支持', 
      type: 'group',
      lastMessage: '问题已经解决，感谢反馈',
      time: '昨天',
      unread: 0,
      members: 5,
      avatar: ''
    },
    { 
      id: 4, 
      name: '李四', 
      type: 'private',
      lastMessage: '文档已经更新完成',
      time: '昨天',
      unread: 1,
      members: 1,
      avatar: ''
    },
    { 
      id: 5, 
      name: 'AI助手', 
      type: 'bot',
      lastMessage: '有什么可以帮助您的吗？',
      time: '前天',
      unread: 0,
      members: 1,
      avatar: ''
    }
  ]);

  // 模拟聊天消息数据
  const [chatMessages, setChatMessages] = useState([
    { 
      id: 1, 
      senderId: 'user',
      senderName: '我',
      content: '大家好，关于新版本的开发计划有什么想法吗？',
      time: '10:15',
      status: 'read'
    },
    { 
      id: 2, 
      senderId: 'other',
      senderName: '张三',
      content: '我认为我们应该优先考虑用户体验的改进',
      time: '10:18',
      status: 'read'
    },
    { 
      id: 3, 
      senderId: 'other',
      senderName: '李四',
      content: '同意，另外性能优化也很重要',
      time: '10:20',
      status: 'read'
    },
    { 
      id: 4, 
      senderId: 'user',
      senderName: '我',
      content: '好的，我会整理大家的意见，制定一个详细的计划',
      time: '10:25',
      status: 'read'
    },
    { 
      id: 5, 
      senderId: 'other',
      senderName: '王五',
      content: '新版本计划已经确定，请大家查看邮件',
      time: '10:30',
      status: 'delivered'
    }
  ]);

  // 模拟AI助手聊天数据
  const [aiMessages, setAiMessages] = useState([
    { 
      id: 1, 
      sender: 'user',
      content: '你好，我需要了解YYC³平台的API使用方法',
      time: '14:20'
    },
    { 
      id: 2, 
      sender: 'ai',
      content: '您好！YYC³平台提供了丰富的API接口，您可以通过我们的API文档了解详细信息。请问您具体需要了解哪个方面的API？',
      time: '14:21'
    },
    { 
      id: 3, 
      sender: 'user',
      content: '我想了解用户管理相关的API',
      time: '14:22'
    },
    { 
      id: 4, 
      sender: 'ai',
      content: '用户管理API包括用户注册、登录、信息修改等功能。主要接口有：\n1. POST /api/v1/users/register - 用户注册\n2. POST /api/v1/users/login - 用户登录\n3. GET /api/v1/users/{id} - 获取用户信息\n4. PUT /api/v1/users/{id} - 更新用户信息\n\n您可以通过访问我们的开发者中心获取完整的API文档和示例代码。',
      time: '14:23'
    }
  ]);

  // 当前选中的聊天
  const [activeChat, setActiveChat] = useState(1);
  const [newMessage, setNewMessage] = useState('');

  // 发送消息
  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const userMessage = {
      id: chatMessages.length + 1,
      senderId: 'user',
      senderName: '我',
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // 模拟回复
    setTimeout(() => {
      const aiMessage = {
        id: chatMessages.length + 2,
        senderId: 'other',
        senderName: 'AI助手',
        content: '我正在处理您的请求，请稍候...',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'delivered'
      };
      setChatMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  // 获取状态图标
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Check className="h-3 w-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="h-3 w-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="h-3 w-3 text-blue-500" />;
      default:
        return null;
    }
  };

  // 获取聊天类型图标
  const getChatTypeIcon = (type: string) => {
    switch (type) {
      case 'group':
        return <Users className="h-4 w-4 text-gray-500" />;
      case 'private':
        return <MessageSquare className="h-4 w-4 text-gray-500" />;
      case 'bot':
        return <Bot className="h-4 w-4 text-gray-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <PageTemplate
      title="聊天系统"
      description="团队沟通和AI助手界面，支持群组聊天、私聊和智能对话"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '商务功能', path: '/business' },
        { title: '聊天系统', path: '/chat' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新建聊天
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            聊天设置
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row h-[calc(100vh-200px)]">
          {/* 聊天列表 */}
          <div className="w-full md:w-1/3 border-r">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索聊天..."
                  className="pl-8"
                />
              </div>
            </div>
            
            <div className="overflow-y-auto h-[calc(100%-60px)]">
              {chatList.map(chat => (
                <div 
                  key={chat.id} 
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                    activeChat === chat.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setActiveChat(chat.id)}
                >
                  <div className="flex items-start">
                    <div className="mr-3">
                      {chat.type === 'group' ? (
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-500" />
                        </div>
                      ) : chat.type === 'bot' ? (
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <Bot className="h-5 w-5 text-purple-500" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="font-medium">{chat.name.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="font-medium truncate">{chat.name}</div>
                        <div className="text-xs text-gray-500">{chat.time}</div>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="text-sm text-gray-500 truncate">{chat.lastMessage}</div>
                        {chat.unread > 0 && (
                          <Badge className="bg-red-500 text-white text-xs">
                            {chat.unread}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        {getChatTypeIcon(chat.type)}
                        <span className="ml-1">
                          {chat.type === 'group' ? `${chat.members} 成员` : chat.type === 'bot' ? 'AI助手' : '私聊'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 聊天内容 */}
          <div className="w-full md:w-2/3 flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-500" />
                  </div>
                </div>
                <div>
                  <div className="font-medium">产品团队</div>
                  <div className="text-sm text-gray-500">8 成员</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Info className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-4">
                {chatMessages.map(message => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.senderId === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md ${
                      message.senderId === 'user' ? 'order-2' : 'order-1'
                    }`}>
                      {message.senderId !== 'user' && (
                        <div className="text-xs text-gray-500 mb-1">{message.senderName}</div>
                      )}
                      <div className={`p-3 rounded-lg ${
                        message.senderId === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white border'
                      }`}>
                        {message.content}
                      </div>
                      <div className={`flex items-center mt-1 text-xs text-gray-500 ${
                        message.senderId === 'user' ? 'justify-end' : 'justify-start'
                      }`}>
                        <span>{message.time}</span>
                        {message.senderId === 'user' && (
                          <span className="ml-1">{getStatusIcon(message.status)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="输入消息..."
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button variant="ghost" size="sm">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button onClick={sendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* AI助手标签页 */}
        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">团队聊天</TabsTrigger>
            <TabsTrigger value="ai">AI助手</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ai" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bot className="mr-2 h-5 w-5" />
                  AI助手
                </CardTitle>
                <CardDescription>与AI助手对话，获取智能分析和建议</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 overflow-y-auto mb-4 border rounded-lg p-4">
                  {aiMessages.map(message => (
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
          </TabsContent>
        </Tabs>
      </div>
    </PageTemplate>
  );
}
