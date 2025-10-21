import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Folder, FileText, Calendar, MoreVertical, Star } from "lucide-react";

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const projects = [
    {
      id: 1,
      name: "现代都市爱情剧",
      description: "一部讲述都市年轻人情感生活的现代剧",
      category: "爱情",
      status: "进行中",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
      agentsUsed: ["故事创意激发助手", "剧本创作助手"],
      starred: true,
    },
    {
      id: 2,
      name: "古装武侠短剧",
      description: "江湖恩怨，侠义情仇",
      category: "武侠",
      status: "已完成",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-18",
      agentsUsed: ["竖屏短剧剧本创作助手", "故事评估智能体"],
      starred: false,
    },
    {
      id: 3,
      name: "悬疑推理系列",
      description: "环环相扣的推理故事",
      category: "悬疑",
      status: "草稿",
      createdAt: "2024-01-12",
      updatedAt: "2024-01-19",
      agentsUsed: ["大纲创作助手"],
      starred: true,
    },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8 animate-fade-in-up">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2 gradient-primary bg-clip-text text-transparent">
              我的项目
            </h1>
            <p className="text-muted-foreground">管理和组织您的所有创作项目</p>
          </div>
          <Button className="gradient-primary hover-glow">
            <Plus className="h-4 w-4 mr-2" />
            新建项目
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索项目..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="animate-scale-in">
        <TabsList className="mb-6">
          <TabsTrigger value="all">全部项目</TabsTrigger>
          <TabsTrigger value="ongoing">进行中</TabsTrigger>
          <TabsTrigger value="completed">已完成</TabsTrigger>
          <TabsTrigger value="draft">草稿</TabsTrigger>
          <TabsTrigger value="starred">
            <Star className="h-4 w-4 mr-1" />
            收藏
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {projects.map((project, idx) => (
            <Card 
              key={project.id} 
              className="hover-lift shadow-elegant animate-fade-in-up cursor-pointer"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl">{project.name}</CardTitle>
                      {project.starred && <Star className="h-4 w-4 fill-primary text-primary" />}
                    </div>
                    <CardDescription>{project.description}</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline">
                      <Folder className="h-3 w-3 mr-1" />
                      {project.category}
                    </Badge>
                    <Badge 
                      variant={
                        project.status === "进行中" ? "default" :
                        project.status === "已完成" ? "secondary" :
                        "outline"
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      创建: {project.createdAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      更新: {project.updatedAt}
                    </span>
                  </div>

                  <div>
                    <div className="text-xs text-muted-foreground mb-2">使用的智能体:</div>
                    <div className="flex flex-wrap gap-1">
                      {project.agentsUsed.map((agent, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {agent}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Other tab contents would be similar */}
        <TabsContent value="ongoing">
          <div className="text-center py-12 text-muted-foreground">
            筛选进行中的项目...
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Projects;
