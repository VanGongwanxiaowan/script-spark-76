import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Home, Briefcase, FileText, BookOpen, Workflow, Settings, User, PenTool } from "lucide-react";

const Header = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "首页", icon: Home, theme: "primary" },
    { path: "/creation", label: "创作工作台", icon: PenTool, theme: "primary" },
    { path: "/workspace", label: "工作区", icon: Sparkles, theme: "primary" },
    { path: "/projects", label: "我的项目", icon: Briefcase, theme: "primary" },
    { path: "/notes", label: "我的笔记", icon: FileText, theme: "notes" },
    { path: "/knowledge", label: "知识库", icon: BookOpen, theme: "knowledge" },
    { path: "/workflow", label: "工作流", icon: Workflow, theme: "workflow" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse-glow"></div>
            <Sparkles className="h-8 w-8 text-primary relative z-10 transition-transform group-hover:scale-110" />
          </div>
          <span className="text-xl font-bold text-gray-800 dark:text-gray-200">
            AI编剧创作工坊
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const active = isActive(item.path);
            const getButtonClass = () => {
              if (active) {
                switch (item.theme) {
                  case "notes":
                    return "bg-gradient-to-r from-pink-500 to-rose-500 text-foreground border-pink-500 hover:from-pink-600 hover:to-rose-600";
                  case "knowledge":
                    return "bg-gradient-to-r from-blue-500 to-indigo-500 text-foreground border-blue-500 hover:from-blue-600 hover:to-indigo-600";
                  case "workflow":
                    return "bg-gradient-to-r from-green-500 to-teal-500 text-foreground border-green-500 hover:from-green-600 hover:to-teal-600";
                  default:
                    return "bg-primary text-foreground border-primary hover:bg-primary/90";
                }
              } else {
                return "bg-transparent text-foreground border-transparent hover:bg-accent hover:text-accent-foreground";
              }
            };

            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant="outline"
                  size="sm"
                  className={`transition-all ${getButtonClass()}`}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        <Link to="/settings">
          <Button
            variant={isActive("/settings") ? "default" : "outline"}
            size="icon"
            className="transition-all hover-lift"
          >
            <User className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
