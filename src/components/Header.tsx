import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Home, Briefcase, FileText, BookOpen, Workflow, Settings, User } from "lucide-react";

const Header = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "首页", icon: Home },
    { path: "/workspace", label: "工作区", icon: Sparkles },
    { path: "/projects", label: "我的项目", icon: Briefcase },
    { path: "/notes", label: "我的笔记", icon: FileText },
    { path: "/knowledge", label: "知识库", icon: BookOpen },
    { path: "/workflow", label: "工作流", icon: Workflow },
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
          <span className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
            AI影视创作工坊
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive(item.path) ? "default" : "ghost"}
                size="sm"
                className="transition-all"
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.label}
              </Button>
            </Link>
          ))}
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
