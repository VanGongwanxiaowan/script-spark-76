import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  Target, 
  Workflow, 
  Lightbulb, 
  CheckCircle, 
  Zap, 
  FileText, 
  BarChart3,
  Users,
  Settings,
  Play
} from "lucide-react";
import { Agent } from "@/data/agents";

interface AgentDetailModalProps {
  agent: Agent | null;
  isOpen: boolean;
  onClose: () => void;
  onChat?: () => void;
}

const AgentDetailModal = ({ agent, isOpen, onClose, onChat }: AgentDetailModalProps) => {
  console.log("AgentDetailModal - 渲染，agent:", agent, "isOpen:", isOpen);
  
  if (!agent) {
    console.log("AgentDetailModal - 没有智能体，返回null");
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto z-[9999]">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="text-4xl">{agent.icon}</div>
            <div className="flex-1">
              <DialogTitle className="text-2xl">{agent.name}</DialogTitle>
              <p className="text-muted-foreground">{agent.nameEn}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={agent.isOnline ? "default" : "secondary"}>
                  {agent.tags[0]}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  使用次数: {agent.usageCount}
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* 详细描述 */}
          {agent.detailedDescription && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  智能体介绍
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {agent.detailedDescription}
                </p>
              </CardContent>
            </Card>
          )}

          {/* 核心能力 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                核心能力
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {agent.capabilities.map((cap, idx) => (
                  <Badge key={idx} variant="outline" className="text-sm">
                    {cap}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 核心职责 */}
          {agent.coreResponsibilities && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  核心职责
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {agent.coreResponsibilities.map((responsibility, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        {responsibility}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* 工作流程 */}
          {agent.workflow && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Workflow className="h-5 w-5" />
                  工作流程
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {agent.workflow.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                        {idx + 1}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* 方法论 */}
          {agent.methodology && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  核心方法论
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {agent.methodology.map((method, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        {method}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* 输出格式 */}
          {agent.outputFormat && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  输出格式
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {agent.outputFormat}
                </p>
              </CardContent>
            </Card>
          )}

          {/* 评估标准 */}
          {agent.evaluationCriteria && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  评估标准
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {agent.evaluationCriteria.map((criteria, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        {criteria}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* 应用场景 */}
          {agent.useCases && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  应用场景
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {agent.useCases.map((useCase, idx) => (
                    <Badge key={idx} variant="secondary" className="text-sm">
                      {useCase}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* 技术规格 */}
          {agent.technicalSpecs && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  技术规格
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {agent.technicalSpecs.inputFormat && (
                    <div>
                      <h4 className="font-medium text-sm mb-1">输入格式</h4>
                      <p className="text-xs text-muted-foreground">
                        {agent.technicalSpecs.inputFormat}
                      </p>
                    </div>
                  )}
                  {agent.technicalSpecs.outputFormat && (
                    <div>
                      <h4 className="font-medium text-sm mb-1">输出格式</h4>
                      <p className="text-xs text-muted-foreground">
                        {agent.technicalSpecs.outputFormat}
                      </p>
                    </div>
                  )}
                  {agent.technicalSpecs.processingTime && (
                    <div>
                      <h4 className="font-medium text-sm mb-1">处理时间</h4>
                      <p className="text-xs text-muted-foreground">
                        {agent.technicalSpecs.processingTime}
                      </p>
                    </div>
                  )}
                  {agent.technicalSpecs.accuracy && (
                    <div>
                      <h4 className="font-medium text-sm mb-1">准确度</h4>
                      <p className="text-xs text-muted-foreground">
                        {agent.technicalSpecs.accuracy}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* 操作按钮 */}
          <div className="flex gap-3 pt-4">
            <Button 
              onClick={onChat} 
              className="flex-1 gradient-primary"
              disabled={!agent.isOnline}
            >
              <Play className="h-4 w-4 mr-2" />
              开始对话
            </Button>
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              关闭
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgentDetailModal;
