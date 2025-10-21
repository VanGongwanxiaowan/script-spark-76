import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, FileText, Tag, Calendar, Edit, Trash2 } from "lucide-react";

const Notes = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const notes = [
    {
      id: 1,
      title: "人物性格设定笔记",
      content: "主角性格内向但坚韧，次要角色开朗外向...",
      tags: ["人物", "设定"],
      createdAt: "2024-01-20",
      project: "现代都市爱情剧",
    },
    {
      id: 2,
      title: "第三集情节要点",
      content: "男女主角第一次正式见面，误会产生...",
      tags: ["情节", "第三集"],
      createdAt: "2024-01-19",
      project: "现代都市爱情剧",
    },
    {
      id: 3,
      title: "武侠世界观设定",
      content: "江湖分为五大门派，各有特色...",
      tags: ["世界观", "设定"],
      createdAt: "2024-01-18",
      project: "古装武侠短剧",
    },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8 animate-fade-in-up">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2 gradient-primary bg-clip-text text-transparent">
              我的笔记
            </h1>
            <p className="text-muted-foreground">记录创作过程中的灵感和想法</p>
          </div>
          <Button className="gradient-primary hover-glow">
            <Plus className="h-4 w-4 mr-2" />
            新建笔记
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索笔记..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note, idx) => (
          <Card 
            key={note.id} 
            className="hover-lift shadow-elegant animate-fade-in-up cursor-pointer group"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors">
                    {note.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {note.content}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-1">
                  {note.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {note.createdAt}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {note.project}
                  </Badge>
                </div>

                <div className="flex gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="ghost" className="flex-1">
                    <Edit className="h-3 w-3 mr-1" />
                    编辑
                  </Button>
                  <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* New Note Card */}
        <Card className="border-dashed border-2 hover-lift cursor-pointer animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <CardContent className="flex flex-col items-center justify-center h-full min-h-[250px] text-center p-6">
            <Plus className="h-12 w-12 text-primary/30 mb-4" />
            <p className="text-sm font-medium mb-1">创建新笔记</p>
            <p className="text-xs text-muted-foreground">
              记录您的创作灵感
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Notes;
