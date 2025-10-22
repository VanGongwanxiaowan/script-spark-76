import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sparkles, ArrowRight, TrendingUp, Users, Zap, Award } from "lucide-react";
import { agents, agentCategories } from "@/data/agents";
import AgentCard from "@/components/AgentCard";
import ChatInterface from "@/components/ChatInterface";
import { Link } from "react-router-dom";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const filteredAgents = selectedCategory === "all" 
    ? agents 
    : agents.filter(agent => agent.category === selectedCategory);

  const handleChat = (agent: any) => {
    setSelectedAgent(agent);
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setSelectedAgent(null);
  };

  const stats = [
    { label: "总智能体数", value: agents.length.toString(), icon: Sparkles, color: "hsl(0 86% 60%)" },
    { label: "活跃智能体", value: agents.filter(a => a.isOnline).length.toString(), icon: TrendingUp, color: "hsl(140 86% 50%)" },
    { label: "专业分类", value: agentCategories.length.toString(), icon: Award, color: "hsl(220 86% 60%)" },
    { label: "总使用次数", value: agents.reduce((sum, agent) => sum + agent.usageCount, 0).toString(), icon: Users, color: "hsl(280 86% 60%)" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 gradient-hero opacity-10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZjAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6bS0yIDJoMnYtMmgtMnYyem0wLTRoMnYtMmgtMnYyem0tMiAyaDJ2LTJoLTJ2MnptMC00aDJ2LTJoLTJ2MnptLTIgMmgydi0yaC0ydjJ6bTAtNGgydi0yaC0ydjJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-5"></div>
        
        <div className="container relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
            <div className="inline-flex items-center justify-center p-2 mb-6 bg-primary/10 rounded-full">
              <Sparkles className="h-12 w-12 text-primary animate-pulse-glow" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-primary bg-clip-text text-transparent">
                AI编剧创作工坊
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              基于AI Agents的智能剧本创作平台<br/>
              {agents.length}个专业智能体，助力您的创作之旅
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/creation">
                <Button size="lg" className="gradient-primary text-lg px-8 hover-glow">
                  开始创作
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 hover-lift">
                <Zap className="mr-2 h-5 w-5" />
                了解更多
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y bg-gradient-soft">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <Card key={idx} className="text-center hover-lift shadow-elegant animate-scale-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-3" style={{ color: stat.color }} />
                  <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12">
        <div className="container">
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className="transition-all"
            >
              全部智能体
            </Button>
            {agentCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="transition-all"
                style={selectedCategory === category.id ? { 
                  background: category.color,
                  color: 'white'
                } : {}}
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Agents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent, idx) => (
              <div key={agent.id} style={{ animationDelay: `${(idx % 12) * 50}ms` }}>
                <AgentCard
                  agent={agent}
                  onChat={() => handleChat(agent)}
                  onTest={() => console.log("Test", agent.id)}
                  onDetail={() => console.log("Detail", agent.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2Mi1oMnYtMmgtMnptMCA0djJoMnYtMmgtMnptLTIgMmgydi0yaC0ydjJ6bTAtNGgydi0yaC0ydjJ6bS0yIDJoMnYtMmgtMnYyem0wLTRoMnYtMmgtMnYyem0tMiAyaDJ2LTJoLTJ2MnptMC00aDJ2LTJoLTJ2MnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="container relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            开启您的AI编剧创作之旅
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            立即体验{agents.length}个专业智能体的强大能力，让AI助力您的剧本创作
          </p>
          <Link to="/creation">
            <Button size="lg" variant="secondary" className="text-lg px-8 hover-lift">
              立即开始
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* 聊天对话框 */}
      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="max-w-4xl h-[80vh] p-0">
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
  );
};

export default Index;
