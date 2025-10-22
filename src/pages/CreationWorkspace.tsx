import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  PenTool, 
  FileText, 
  Lightbulb, 
  List, 
  Play, 
  BarChart3, 
  Users, 
  Zap,
  MessageCircle,
  Download,
  Upload
} from 'lucide-react';
import { agents, agentCategories } from '@/data/agents';
import ChatInterface from '@/components/ChatInterface';
import AgentCard from '@/components/AgentCard';

const CreationWorkspace: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('creation');

  const creationAgents = agents.filter(agent => agent.category === 'creation');
  const evaluationAgents = agents.filter(agent => agent.category === 'evaluation');
  const workflowAgents = agents.filter(agent => agent.category === 'workflow');

  const handleChat = (agent: any) => {
    setSelectedAgent(agent);
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setSelectedAgent(null);
  };

  const quickActions = [
    {
      title: '开始新剧本',
      description: '从零开始创作竖屏短剧剧本',
      icon: PenTool,
      color: 'bg-blue-500',
      action: () => handleChat(creationAgents[0])
    },
    {
      title: '故事创意',
      description: '激发创作灵感，生成故事创意',
      icon: Lightbulb,
      color: 'bg-yellow-500',
      action: () => handleChat(creationAgents.find(a => a.id === 'story-idea'))
    },
    {
      title: '大纲创作',
      description: '创建完整的故事大纲',
      icon: List,
      color: 'bg-green-500',
      action: () => handleChat(creationAgents.find(a => a.id === 'outline-creation'))
    },
    {
      title: '剧本评估',
      description: '评估剧本质量和商业价值',
      icon: BarChart3,
      color: 'bg-purple-500',
      action: () => handleChat(evaluationAgents[0])
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            剧本创作工作台
          </h1>
          <p className="text-lg text-gray-600">
            专业的AI智能体助您完成从创意到成品的全流程创作
          </p>
        </div>

        {/* 快速操作 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              快速开始
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-start space-y-2 hover:shadow-md transition-all"
                  onClick={action.action}
                >
                  <div className={`p-2 rounded-lg ${action.color} text-white`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">{action.title}</div>
                    <div className="text-sm text-muted-foreground">{action.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 智能体分类 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="creation" className="flex items-center gap-2">
              <PenTool className="h-4 w-4" />
              创作类
            </TabsTrigger>
            <TabsTrigger value="evaluation" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              评估类
            </TabsTrigger>
            <TabsTrigger value="workflow" className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              工作流类
            </TabsTrigger>
          </TabsList>

          <TabsContent value="creation" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {creationAgents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onChat={() => handleChat(agent)}
                  onTest={() => console.log('Test', agent.id)}
                  onDetail={() => console.log('Detail', agent.id)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="evaluation" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {evaluationAgents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onChat={() => handleChat(agent)}
                  onTest={() => console.log('Test', agent.id)}
                  onDetail={() => console.log('Detail', agent.id)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="workflow" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workflowAgents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onChat={() => handleChat(agent)}
                  onTest={() => console.log('Test', agent.id)}
                  onDetail={() => console.log('Detail', agent.id)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* 聊天对话框 */}
        <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
          <DialogContent className="max-w-6xl h-[85vh] p-0">
            <DialogHeader className="p-6 pb-0">
              <DialogTitle>与 {selectedAgent?.name} 对话</DialogTitle>
            </DialogHeader>
            {selectedAgent && (
              <div className="flex-1 overflow-hidden">
                <ChatInterface 
                  agent={selectedAgent} 
                  onClose={handleCloseChat}
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CreationWorkspace;
