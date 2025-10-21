import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Play, Edit, Copy, Trash2, Workflow as WorkflowIcon, GitBranch } from "lucide-react";

const Workflow = () => {
  const workflows = [
    {
      id: 1,
      name: "五行工作流",
      description: "基于中国传统五行理论，处理剧本创作中的五个核心要素",
      agents: ["五行工作流Agent"],
      status: "active",
      executions: 12,
    },
    {
      id: 2,
      name: "系列分析工作流",
      description: "专注于系列剧本的整体分析，包括系列连贯性、角色成长线等",
      agents: ["系列分析工作流Agent"],
      status: "active",
      executions: 8,
    },
    {
      id: 3,
      name: "情节点工作流",
      description: "专门处理剧本中的关键情节点，包括开场、转折、高潮、结局等",
      agents: ["情节点工作流Agent"],
      status: "draft",
      executions: 3,
    },
    {
      id: 4,
      name: "剧情分析工作流",
      description: "对剧本的整体剧情进行深度分析，包括戏剧张力、情感曲线等",
      agents: ["剧情分析Agent"],
      status: "active",
      executions: 15,
    },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8 animate-fade-in-up">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2 gradient-primary bg-clip-text text-transparent">
              工作流管理
            </h1>
            <p className="text-muted-foreground">创建和管理自动化的AI创作工作流</p>
          </div>
          <Button className="gradient-primary hover-glow">
            <Plus className="h-4 w-4 mr-2" />
            新建工作流
          </Button>
        </div>
      </div>

      {/* Workflow Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {workflows.map((workflow, idx) => (
          <Card 
            key={workflow.id} 
            className="hover-lift shadow-elegant animate-fade-in-up"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <CardHeader>
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <WorkflowIcon className="h-6 w-6 text-primary" />
                </div>
                <Badge variant={workflow.status === "active" ? "default" : "secondary"}>
                  {workflow.status === "active" ? "运行中" : "草稿"}
                </Badge>
              </div>
              <CardTitle className="text-xl mb-2">{workflow.name}</CardTitle>
              <CardDescription>{workflow.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-2">使用的智能体:</div>
                  <div className="flex flex-wrap gap-1">
                    {workflow.agents.map((agent, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        <GitBranch className="h-3 w-3 mr-1" />
                        {agent}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">执行次数</span>
                  <span className="font-semibold">{workflow.executions}</span>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1 gradient-primary">
                    <Play className="h-3 w-3 mr-1" />
                    运行
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-3 w-3 mr-1" />
                    编辑
                  </Button>
                  <Button size="sm" variant="outline">
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Workflow Builder Preview */}
      <Card className="shadow-elegant animate-scale-in">
        <CardHeader>
          <CardTitle>工作流编辑器</CardTitle>
          <CardDescription>可视化构建您的AI创作工作流</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="min-h-[400px] bg-muted/30 rounded-lg border-2 border-dashed flex items-center justify-center">
            <div className="text-center">
              <WorkflowIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-muted-foreground mb-4">工作流可视化编辑器</p>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                开始构建工作流
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Workflow;
