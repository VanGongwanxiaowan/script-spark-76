import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Sparkles, ArrowRight, TrendingUp, Users, Zap, Award, Search, Star, Clock, MessageCircle, Play, BookOpen, Target } from "lucide-react";
import { agents, agentCategories } from "@/data/agents";
import AgentCard from "@/components/AgentCard";
import ChatInterface from "@/components/ChatInterface";
import AgentDetailModal from "@/components/AgentDetailModal";
import { Link } from "react-router-dom";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // 模拟加载状态
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredAgents = agents.filter(agent => {
    const matchesCategory = selectedCategory === "all" || agent.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.capabilities.some(cap => cap.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleChat = (agent: any) => {
    setSelectedAgent(agent);
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setSelectedAgent(null);
  };

  const handleDetail = (agent: any) => {
    console.log("Index.tsx - handleDetail被调用，智能体:", agent);
    setSelectedAgent(agent);
    setIsDetailOpen(true);
    console.log("Index.tsx - 状态已更新，isDetailOpen:", true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedAgent(null);
  };

  const stats = [
    { label: "总智能体数", value: agents.length.toString(), icon: Sparkles, color: "hsl(0 86% 60%)", trend: "+12%" },
    { label: "活跃智能体", value: agents.filter(a => a.isOnline).length.toString(), icon: TrendingUp, color: "hsl(140 86% 50%)", trend: "+5%" },
    { label: "专业分类", value: agentCategories.length.toString(), icon: Award, color: "hsl(220 86% 60%)", trend: "稳定" },
    { label: "总使用次数", value: agents.reduce((sum, agent) => sum + agent.usageCount, 0).toString(), icon: Users, color: "hsl(280 86% 60%)", trend: "+28%" },
  ];

  const featuredAgents = agents.filter(agent => agent.isOnline).slice(0, 4);
  const popularAgents = [...agents].sort((a, b) => b.usageCount - a.usageCount).slice(0, 3);

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
              <span className="text-red-600 dark:text-red-400">
                AI影视编剧创作工坊
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              基于AI Agents的智能剧本创作平台<br/>
              {agents.length}个专业智能体，助力您的创作之旅
            </p>
            
            {/* 搜索框 */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="搜索智能体或功能..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg border-2 focus:border-primary transition-colors"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/creation">
                <Button size="lg" className="gradient-primary text-lg px-8 hover-glow">
                  开始创作
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/workspace">
                <Button size="lg" variant="outline" className="text-lg px-8 hover-lift">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  智能对话
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y bg-gradient-soft">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">平台数据概览</h2>
            <p className="text-muted-foreground">实时监控系统状态和用户活跃度</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <Card key={idx} className="text-center hover-lift shadow-elegant animate-scale-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-3" style={{ color: stat.color }} />
                  <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
                  <div className="text-xs text-green-600 font-medium">
                    {stat.trend}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Agents Section */}
      <section className="py-16 bg-gradient-soft">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">推荐智能体</h2>
            <p className="text-muted-foreground">精选最受欢迎的AI智能体，助力您的创作之旅</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredAgents.map((agent, idx) => (
              <Card key={agent.id} className="hover-lift shadow-elegant animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl">{agent.icon}</div>
                    <div>
                      <h3 className="font-semibold">{agent.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {agent.tags[0]}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {agent.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>4.8</span>
                    </div>
                    <Button size="sm" onClick={() => handleChat(agent)} className="gradient-primary">
                      <Play className="h-3 w-3 mr-1" />
                      使用
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">智能体分类</h2>
            <p className="text-muted-foreground">按功能分类浏览所有可用的AI智能体</p>
          </div>
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

          {/* Search Results Info */}
          {searchQuery && (
            <div className="text-center mb-6">
              <p className="text-muted-foreground">
                搜索 "{searchQuery}" 找到 {filteredAgents.length} 个智能体
              </p>
            </div>
          )}

          {/* Agents Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <Card key={idx} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-muted rounded"></div>
                        <div className="h-3 bg-muted rounded w-5/6"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredAgents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgents.map((agent, idx) => (
                <div key={agent.id} style={{ animationDelay: `${(idx % 12) * 50}ms` }}>
                  <AgentCard
                    agent={agent}
                    onChat={() => {
                      console.log("对话按钮被点击，智能体:", agent);
                      handleChat(agent);
                    }}
                    onTest={() => console.log("Test", agent.id)}
                    onDetail={() => {
                      console.log("详情按钮被点击，智能体:", agent);
                      handleDetail(agent);
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">未找到匹配的智能体</h3>
              <p className="text-muted-foreground mb-4">
                尝试使用不同的关键词或浏览所有智能体
              </p>
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                清除搜索
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2Mi1oMnYtMmgtMnptMCA0djJoMnYtMmgtMnptLTIgMmgydi0yaC0ydjJ6bTAtNGgydi0yaC0ydjJ6bS0yIDJoMnYtMmgtMnYyem0wLTRoMnYtMmgtMnYyem0tMiAyaDJ2LTJoLTJ2MnptMC00aDJ2LTJoLTJ2MnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="container relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            开启您的AI影视编剧创作之旅
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

      {/* 智能体详情模态框 */}
      <AgentDetailModal
        agent={selectedAgent}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
        onChat={() => {
          handleCloseDetail();
          handleChat(selectedAgent);
        }}
      />
    </div>
  );
};

export default Index;
