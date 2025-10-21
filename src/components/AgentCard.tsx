import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info, Play, ToggleLeft } from "lucide-react";
import { Agent } from "@/data/agents";

interface AgentCardProps {
  agent: Agent;
  onTest?: () => void;
  onToggle?: () => void;
  onDetail?: () => void;
}

const AgentCard = ({ agent, onTest, onToggle, onDetail }: AgentCardProps) => {
  return (
    <Card className="group hover-lift shadow-elegant animate-fade-in-up">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
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
          onClick={onDetail}
        >
          <Info className="h-4 w-4 mr-1" />
          详情
        </Button>
        <Button 
          size="sm" 
          className="flex-1 gradient-primary"
          onClick={onTest}
        >
          <Play className="h-4 w-4 mr-1" />
          测试
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          onClick={onToggle}
        >
          <ToggleLeft className="h-4 w-4" />
          切换
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AgentCard;
