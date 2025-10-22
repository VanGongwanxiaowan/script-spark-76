/**
 * 智能体详情组件
 * 显示智能体的详细信息、能力和使用统计
 */
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Star, 
  Clock, 
  Users, 
  Zap, 
  CheckCircle, 
  XCircle,
  MessageCircle,
  Play,
  Info
} from 'lucide-react';
import { Agent } from '@/data/agents';

interface AgentDetailsProps {
  agent: Agent;
  onChat?: () => void;
  onTest?: () => void;
  onClose?: () => void;
}

const AgentDetails: React.FC<AgentDetailsProps> = ({ 
  agent, 
  onChat, 
  onTest, 
  onClose 
}) => {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-4xl">{agent.icon}</div>
            <div>
              <CardTitle className="text-xl">{agent.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{agent.nameEn}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={agent.isOnline ? "default" : "secondary"}>
              {agent.isOnline ? (
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  在线
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <XCircle className="h-3 w-3" />
                  离线
                </div>
              )}
            </Badge>
            {onClose && (
              <Button variant="outline" size="sm" onClick={onClose}>
                关闭
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* 描述 */}
        <div>
          <h3 className="font-semibold mb-2">功能描述</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {agent.description}
          </p>
        </div>

        <Separator />

        {/* 核心能力 */}
        <div>
          <h3 className="font-semibold mb-3">核心能力</h3>
          <div className="flex flex-wrap gap-2">
            {agent.capabilities.map((capability, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {capability}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* 使用统计 */}
        <div>
          <h3 className="font-semibold mb-3">使用统计</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <div className="text-sm font-medium">使用次数</div>
                <div className="text-2xl font-bold">{agent.usageCount}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Star className="h-5 w-5 text-yellow-500" />
              <div>
                <div className="text-sm font-medium">用户评分</div>
                <div className="text-2xl font-bold">4.8</div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* 标签 */}
        <div>
          <h3 className="font-semibold mb-3">标签</h3>
          <div className="flex flex-wrap gap-2">
            {agent.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* 操作按钮 */}
        <div className="flex gap-3">
          <Button 
            className="flex-1 gradient-primary" 
            onClick={onChat}
            disabled={!agent.isOnline}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            开始对话
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={onTest}
            disabled={!agent.isOnline}
          >
            <Play className="h-4 w-4 mr-2" />
            快速测试
          </Button>
        </div>

        {/* 技术信息 */}
        <div className="text-xs text-muted-foreground">
          <div className="flex items-center gap-2 mb-1">
            <Info className="h-3 w-3" />
            <span>技术信息</span>
          </div>
          <div className="space-y-1">
            <div>智能体ID: {agent.id}</div>
            <div>分类: {agent.category}</div>
            <div>API端点: {agent.apiEndpoint || '未配置'}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentDetails;
