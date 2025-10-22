import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Send, Loader2, User, Bot, FileText, Download, Trash2 } from 'lucide-react';
import { apiService, StreamEvent } from '@/services/api';
import { Agent } from '@/data/agents';
import { handleApiError, handleNetworkError, getUserFriendlyMessage } from '@/utils/errorHandler';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  agent?: string;
  metadata?: any;
}

interface ChatInterfaceProps {
  agent: Agent;
  onClose?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ agent, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentStreamMessage, setCurrentStreamMessage] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentStreamMessage]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input.trim();
    setInput('');
    setIsLoading(true);
    setIsStreaming(true);
    setCurrentStreamMessage('');

    try {
      const stream = await apiService.sendChatRequest(
        agent.id,
        currentInput,
        {
          theme: '竖屏短剧',
          work_type: '短剧'
        }
      );

      const reader = stream.getReader();
      let assistantMessageId = `assistant_${Date.now()}`;
      let fullContent = '';
      let hasError = false;

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        // 处理不同类型的流式事件
        if (value.type === 'content' || value.type === 'text' || value.type === 'llm_chunk') {
          fullContent += value.content;
          setCurrentStreamMessage(fullContent);
        } else if (value.type === 'done' || value.type === 'complete') {
          // 流式传输完成，保存最终消息
          const assistantMessage: Message = {
            id: assistantMessageId,
            type: 'assistant',
            content: fullContent,
            timestamp: new Date(),
            agent: agent.name,
            metadata: value.payload?.data
          };
          
          setMessages(prev => [...prev, assistantMessage]);
          setCurrentStreamMessage('');
          break;
        } else if (value.type === 'error') {
          hasError = true;
          const errorMessage: Message = {
            id: `error_${Date.now()}`,
            type: 'assistant',
            content: `系统错误：${value.content}`,
            timestamp: new Date(),
            agent: agent.name
          };
          setMessages(prev => [...prev, errorMessage]);
          break;
        }
      }

      // 如果没有收到完成信号但有内容，也要保存
      if (!hasError && fullContent && !messages.some(m => m.id === assistantMessageId)) {
        const assistantMessage: Message = {
          id: assistantMessageId,
          type: 'assistant',
          content: fullContent,
          timestamp: new Date(),
          agent: agent.name
        };
        setMessages(prev => [...prev, assistantMessage]);
      }

    } catch (error) {
      console.error('发送消息失败:', error);
      
      // 使用统一的错误处理
      const errorInfo = error instanceof Error && error.message.includes('fetch')
        ? handleNetworkError(error, { agent: agent.id, query: currentInput })
        : handleApiError(error, { agent: agent.id, query: currentInput });
      
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        type: 'assistant',
        content: getUserFriendlyMessage(errorInfo),
        timestamp: new Date(),
        agent: agent.name
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      setCurrentStreamMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setCurrentStreamMessage('');
  };

  const exportChat = async () => {
    try {
      const sessionId = apiService.getCurrentSessionId();
      const result = await apiService.exportContent(sessionId, 'txt', ['script'], true);
      
      // 创建下载链接
      const blob = new Blob([result.exported_data], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = result.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('导出失败:', error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* 聊天头部 */}
      <CardHeader className="flex-shrink-0 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{agent.icon}</div>
            <div>
              <CardTitle className="text-lg">{agent.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{agent.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={agent.isOnline ? "default" : "secondary"}>
              {agent.isOnline ? "在线" : "离线"}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={exportChat}
              disabled={messages.length === 0}
            >
              <Download className="h-4 w-4 mr-1" />
              导出
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearChat}
              disabled={messages.length === 0}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              清空
            </Button>
            {onClose && (
              <Button variant="outline" size="sm" onClick={onClose}>
                关闭
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      {/* 消息列表 */}
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <div className="text-4xl mb-4">{agent.icon}</div>
                <h3 className="text-lg font-medium mb-2">开始与 {agent.name} 对话</h3>
                <p className="text-sm">请输入您的创作需求，{agent.name} 将为您提供专业帮助</p>
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  {agent.capabilities.map((capability, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {capability}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === 'assistant' && (
                      <div className="flex-shrink-0 mt-1">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                        <span>
                          {message.type === 'user' ? (
                            <User className="h-3 w-3 inline mr-1" />
                          ) : (
                            <Bot className="h-3 w-3 inline mr-1" />
                          )}
                          {message.type === 'user' ? '您' : message.agent}
                        </span>
                        <span>{message.timestamp.toLocaleTimeString()}</span>
                      </div>
                    </div>
                    {message.type === 'user' && (
                      <div className="flex-shrink-0 mt-1">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* 流式消息显示 */}
            {isStreaming && currentStreamMessage && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                  <div className="flex items-start space-x-2">
                    <div className="flex-shrink-0 mt-1">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="whitespace-pre-wrap">{currentStreamMessage}</div>
                      <div className="flex items-center mt-2 text-xs opacity-70">
                        <Loader2 className="h-3 w-3 animate-spin mr-1" />
                        <span>{agent.name} 正在思考...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>

      {/* 输入区域 */}
      <div className="flex-shrink-0 border-t p-4">
        <div className="flex space-x-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`与 ${agent.name} 对话...`}
            className="flex-1 min-h-[60px] max-h-[120px] resize-none"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="self-end"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <span>按 Enter 发送，Shift + Enter 换行</span>
          <span>{input.length}/2000</span>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
