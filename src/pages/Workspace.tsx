import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Send, Upload, Download, Save, RefreshCw, History, 
  Wifi, Database, Sparkles, Plus, X, ChevronLeft, ChevronRight 
} from "lucide-react";
import { agents } from "@/data/agents";

const Workspace = () => {
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [useWebSearch, setUseWebSearch] = useState(false);
  const [useKnowledge, setUseKnowledge] = useState(false);
  const [showSessionManager, setShowSessionManager] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{ role: string; content: string; agent?: string }>>([]);

  const toggleAgent = (agentId: string) => {
    setSelectedAgents(prev => 
      prev.includes(agentId) 
        ? prev.filter(id => id !== agentId)
        : [...prev, agentId]
    );
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { 
      role: "user", 
      content: input 
    }]);
    
    // 模拟AI响应
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "这是AI的回复示例。实际使用时，这里会连接真实的AI服务。",
        agent: selectedAgents[0] || "system"
      }]);
    }, 1000);
    
    setInput("");
  };

  return (
    <div className="container py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar - Agent Selection */}
        <Card className="lg:col-span-3 shadow-elegant animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              选择智能体
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-2">
                {agents.map(agent => (
                  <div
                    key={agent.id}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all hover-lift ${
                      selectedAgents.includes(agent.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => toggleAgent(agent.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-sm mb-1">{agent.name}</div>
                        <div className="text-xs text-muted-foreground line-clamp-2">
                          {agent.description}
                        </div>
                      </div>
                      <Checkbox 
                        checked={selectedAgents.includes(agent.id)}
                        className="ml-2"
                      />
                    </div>
                    <div className="flex gap-1 mt-2">
                      {agent.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Main Content - Chat Interface */}
        <Card className="lg:col-span-6 shadow-elegant animate-scale-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>故事内容输入</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSessionManager(!showSessionManager)}
                >
                  <History className="h-4 w-4 mr-1" />
                  历史记录
                </Button>
                <Select defaultValue="conversation">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conversation">选择会话</SelectItem>
                    <SelectItem value="new">新建会话</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          
          <Separator />
          
          <CardContent className="p-0">
            {/* Messages Area */}
            <ScrollArea className="h-[400px] p-6">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Sparkles className="h-16 w-16 text-primary/20 mb-4" />
                  <p className="text-muted-foreground">
                    请输入要分析的故事内容、剧本大纲、角色设定等...
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        {msg.agent && (
                          <div className="text-xs opacity-70 mb-1">
                            {agents.find(a => a.id === msg.agent)?.name || "AI"}
                          </div>
                        )}
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            <Separator />

            {/* Input Area */}
            <div className="p-6 space-y-4">
              {/* Options */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="websearch" 
                    checked={useWebSearch}
                    onCheckedChange={(checked) => setUseWebSearch(checked as boolean)}
                  />
                  <label htmlFor="websearch" className="text-sm flex items-center gap-1 cursor-pointer">
                    <Wifi className="h-4 w-4" />
                    联网搜索
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="knowledge" 
                    checked={useKnowledge}
                    onCheckedChange={(checked) => setUseKnowledge(checked as boolean)}
                  />
                  <label htmlFor="knowledge" className="text-sm flex items-center gap-1 cursor-pointer">
                    <Database className="h-4 w-4" />
                    连接知识库
                  </label>
                </div>
              </div>

              {/* Selected Agents Display */}
              {selectedAgents.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedAgents.map(agentId => {
                    const agent = agents.find(a => a.id === agentId);
                    return agent ? (
                      <Badge key={agentId} variant="secondary" className="gap-1">
                        {agent.name}
                        <X 
                          className="h-3 w-3 cursor-pointer hover:text-destructive" 
                          onClick={() => toggleAgent(agentId)}
                        />
                      </Badge>
                    ) : null;
                  })}
                </div>
              )}

              {/* Text Input */}
              <div className="flex gap-2">
                <Textarea
                  placeholder="请输入要分析的故事内容、剧本大纲、角色设定等..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  className="min-h-[100px]"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Upload className="h-4 w-4 mr-1" />
                  上传文件
                </Button>
                <Button size="sm" variant="outline" onClick={() => setInput("")}>
                  <RefreshCw className="h-4 w-4 mr-1" />
                  清空结果
                </Button>
                <div className="flex-1"></div>
                <Button onClick={handleSend} className="gradient-primary">
                  <Send className="h-4 w-4 mr-1" />
                  开始分析
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Sidebar - Results */}
        <Card className="lg:col-span-3 shadow-elegant animate-fade-in" style={{ animationDelay: "100ms" }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>分析结果</CardTitle>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              {messages.filter(m => m.role === "assistant").length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <div className="w-24 h-24 mb-4 opacity-20">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-muted-foreground">
                      <rect x="20" y="20" width="60" height="60" rx="8" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <line x1="30" y1="35" x2="70" y2="35" stroke="currentColor" strokeWidth="2"/>
                      <line x1="30" y1="50" x2="70" y2="50" stroke="currentColor" strokeWidth="2"/>
                      <line x1="30" y1="65" x2="55" y2="65" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    暂无分析结果
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    请在左侧输入故事内容并选择分析类型
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.filter(m => m.role === "assistant").map((msg, idx) => (
                    <Card key={idx} className="border-primary/20">
                      <CardContent className="p-4">
                        <div className="text-sm whitespace-pre-wrap">
                          {msg.content}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <div className="flex gap-2 pt-4">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Save className="h-4 w-4 mr-1" />
                      保存
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-1" />
                      导出
                    </Button>
                  </div>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Session Manager Sidebar */}
      {showSessionManager && (
        <div className="fixed right-0 top-16 bottom-0 w-80 bg-card border-l shadow-lg z-40 animate-slide-in-right">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-semibold">会话管理</h3>
            <Button size="icon" variant="ghost" onClick={() => setShowSessionManager(false)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="h-[calc(100vh-8rem)] p-4">
            <Button className="w-full mb-4" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              新建会话
            </Button>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="cursor-pointer hover-lift">
                  <CardContent className="p-3">
                    <div className="font-medium text-sm">会话 {i}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      2024-01-0{i} 10:30
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default Workspace;
