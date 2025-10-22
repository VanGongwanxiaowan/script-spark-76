import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info, Play, MessageCircle, Zap } from "lucide-react";
import { Agent } from "@/data/agents";

interface AgentCardProps {
  agent: Agent;
  onChat?: () => void;
  onTest?: () => void;
  onDetail?: () => void;
}

const AgentCard = ({ agent, onChat, onTest, onDetail }: AgentCardProps) => {
  return (
    <Card className="group hover-lift shadow-elegant animate-fade-in-up">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="text-2xl">{agent.icon}</div>
              <Badge 
                variant={agent.isOnline ? "default" : "secondary"}
                className="transition-all"
              >
                {agent.tags[0]}
              </Badge>
            </div>
            <CardTitle className="text-lg mb-1 group-hover:text-primary transition-colors">
              {agent.name}
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              {agent.nameEn}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-foreground/80 line-clamp-3">
          {agent.description}
        </p>

        <div>
          <p className="text-xs font-semibold mb-2">核心能力：</p>
          <div className="flex flex-wrap gap-1.5">
            {agent.capabilities.map((cap, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {cap}
              </Badge>
            ))}
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          使用次数: {agent.usageCount}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button 
          size="sm" 
          variant="ghost"
          className="flex-1"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("详情按钮被点击，智能体:", agent);
            onDetail?.();
          }}
        >
          <Info className="h-4 w-4 mr-1" />
          详情
        </Button>
        <Button 
          size="sm" 
          className="flex-1 gradient-primary"
          onClick={onChat}
          disabled={!agent.isOnline}
        >
          <MessageCircle className="h-4 w-4 mr-1" />
          对话
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          onClick={onTest}
          disabled={!agent.isOnline}
        >
          <Zap className="h-4 w-4 mr-1" />
          快速
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AgentCard;
