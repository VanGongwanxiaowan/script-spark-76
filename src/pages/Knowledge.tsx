import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Upload, Folder, FileText, Database, Trash2, Download } from "lucide-react";

const Knowledge = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const knowledgeItems = [
    {
      id: 1,
      name: "编剧理论大全",
      type: "文档",
      size: "2.5 MB",
      category: "理论",
      uploadedAt: "2024-01-15",
      tags: ["编剧", "理论"],
    },
    {
      id: 2,
      name: "经典剧本案例集",
      type: "文档",
      size: "5.8 MB",
      category: "案例",
      uploadedAt: "2024-01-18",
      tags: ["案例", "参考"],
    },
    {
      id: 3,
      name: "人物塑造技巧",
      type: "文档",
      size: "1.2 MB",
      category: "技巧",
      uploadedAt: "2024-01-20",
      tags: ["人物", "技巧"],
    },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8 animate-fade-in-up">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-foreground">
              知识库管理
            </h1>
            <p className="text-foreground">管理您的创作参考资料和知识库</p>
          </div>
          <Button className="gradient-primary hover-glow">
            <Upload className="h-4 w-4 mr-2" />
            上传文件
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索知识库..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="hover-lift shadow-elegant animate-scale-in">
          <CardContent className="p-6 text-center">
            <Database className="h-8 w-8 mx-auto mb-3 text-primary" />
            <div className="text-2xl font-bold mb-1">15</div>
            <div className="text-sm text-muted-foreground">总文件数</div>
          </CardContent>
        </Card>
        <Card className="hover-lift shadow-elegant animate-scale-in" style={{ animationDelay: "100ms" }}>
          <CardContent className="p-6 text-center">
            <Folder className="h-8 w-8 mx-auto mb-3 text-blue-500" />
            <div className="text-2xl font-bold mb-1">5</div>
            <div className="text-sm text-muted-foreground">分类数量</div>
          </CardContent>
        </Card>
        <Card className="hover-lift shadow-elegant animate-scale-in" style={{ animationDelay: "200ms" }}>
          <CardContent className="p-6 text-center">
            <FileText className="h-8 w-8 mx-auto mb-3 text-green-500" />
            <div className="text-2xl font-bold mb-1">28.5 MB</div>
            <div className="text-sm text-muted-foreground">总大小</div>
          </CardContent>
        </Card>
        <Card className="hover-lift shadow-elegant animate-scale-in" style={{ animationDelay: "300ms" }}>
          <CardContent className="p-6 text-center">
            <Upload className="h-8 w-8 mx-auto mb-3 text-purple-500" />
            <div className="text-2xl font-bold mb-1">3</div>
            <div className="text-sm text-muted-foreground">本周新增</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="animate-fade-in">
        <TabsList className="mb-6">
          <TabsTrigger value="all">全部文件</TabsTrigger>
          <TabsTrigger value="docs">文档</TabsTrigger>
          <TabsTrigger value="images">图片</TabsTrigger>
          <TabsTrigger value="videos">视频</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {knowledgeItems.map((item, idx) => (
            <Card 
              key={item.id} 
              className="hover-lift shadow-elegant animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{item.name}</CardTitle>
                      <CardDescription>
                        {item.type} · {item.size} · 上传于 {item.uploadedAt}
                      </CardDescription>
                      <div className="flex gap-2 mt-3">
                        <Badge variant="outline">{item.category}</Badge>
                        {item.tags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Knowledge;
