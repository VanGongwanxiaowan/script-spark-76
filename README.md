# 剧本创作AI系统 - 前端

基于React + TypeScript + Vite构建的剧本创作AI系统前端界面，与后端API无缝集成。

## 🚀 功能特性

### 核心功能
- **智能体对话**: 与13个专业AI智能体进行实时对话
- **流式响应**: 支持SSE流式输出，实时显示AI生成内容
- **创作工作台**: 专业的剧本创作界面
- **多智能体协作**: 创作、评估、工作流三大类智能体

### 智能体分类
- **创作类** (5个): 剧本创作、剧本策划、故事创意、大纲创作、创作助手
- **评估类** (5个): 剧本评估、小说初筛、故事大纲评估、IP评估、评估分析
- **工作流类** (4个): 五元素工作流、剧集分析、情节点分析、戏剧功能分析

## 🛠️ 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **UI组件**: Radix UI + Tailwind CSS
- **状态管理**: React Query
- **路由**: React Router v6
- **图标**: Lucide React

## 📦 安装与运行

### 环境要求
- Node.js 18+
- npm 或 yarn

### 安装依赖
```bash
npm install
# 或
yarn install
```

### 开发环境运行
```bash
npm run dev
# 或
yarn dev
```

### 构建生产版本
```bash
npm run build
# 或
yarn build
```

### 预览生产版本
```bash
npm run preview
# 或
yarn preview
```

## 🔧 配置

### 环境变量
创建 `.env` 文件：
```env
# API配置
VITE_API_BASE_URL=http://localhost:8000

# 应用配置
VITE_APP_TITLE=剧本创作AI系统
VITE_APP_VERSION=1.0.0

# 开发配置
VITE_DEV_MODE=true
```

### 后端API集成
确保后端服务运行在 `http://localhost:8000`，支持以下API端点：
- `/juben/script-creation` - 剧本创作
- `/juben/script-planning` - 剧本策划
- `/juben/story-idea` - 故事创意
- `/juben/outline-creation` - 大纲创作
- `/juben/script-evaluation` - 剧本评估
- `/juben/novel-screening` - 小说初筛
- `/juben/five-elements` - 五元素工作流
- `/juben/series-analysis` - 剧集分析
- 等等...

## 📱 页面结构

### 主要页面
- **首页** (`/`): 智能体展示和快速入口
- **创作工作台** (`/creation`): 专业创作界面
- **工作区** (`/workspace`): 项目管理
- **我的项目** (`/projects`): 项目列表
- **我的笔记** (`/notes`): 笔记管理
- **知识库** (`/knowledge`): 知识管理
- **工作流** (`/workflow`): 工作流管理
- **设置** (`/settings`): 系统设置

### 核心组件
- `ChatInterface`: 智能体对话界面
- `AgentCard`: 智能体卡片组件
- `Header`: 导航头部
- API服务层: 与后端通信

## 🎨 设计系统

### 主题色彩
- **主色调**: 小红书风格红色 (`hsl(0 86% 60%)`)
- **创作类**: 红色渐变
- **评估类**: 蓝色渐变  
- **工作流类**: 绿色渐变

### 动画效果
- 淡入上移 (`animate-fade-in-up`)
- 缩放进入 (`animate-scale-in`)
- 脉冲发光 (`animate-pulse-glow`)
- 悬停提升 (`hover-lift`)
- 悬停发光 (`hover-glow`)

## 🔌 API集成

### 聊天接口
```typescript
// 发送聊天请求
const stream = await apiService.sendChatRequest(
  'script-creation', // 智能体类型
  '请帮我创作一个竖屏短剧剧本', // 用户输入
  {
    theme: '竖屏短剧',
    work_type: '短剧'
  }
);
```

### 流式响应处理
```typescript
const reader = stream.getReader();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  
  if (value.type === 'content') {
    // 处理流式内容
    console.log(value.content);
  }
}
```

## 🚀 部署

### 构建生产版本
```bash
npm run build
```

### 部署到服务器
将 `dist` 目录部署到Web服务器，如Nginx、Apache等。

### Docker部署
```dockerfile
FROM nginx:alpine
COPY dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 📝 开发指南

### 添加新智能体
1. 在 `src/data/agents.ts` 中添加智能体配置
2. 确保后端API支持对应的端点
3. 更新智能体分类和图标

### 自定义主题
在 `src/index.css` 中修改CSS变量：
```css
:root {
  --primary: 0 86% 60%; /* 主色调 */
  --gradient-primary: linear-gradient(135deg, ...); /* 主渐变 */
}
```

### 添加新页面
1. 在 `src/pages/` 中创建新组件
2. 在 `src/App.tsx` 中添加路由
3. 在 `src/components/Header.tsx` 中添加导航

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🆘 支持

如有问题或建议，请：
1. 查看 [Issues](../../issues) 页面
2. 创建新的Issue
3. 联系开发团队

---

**剧本创作AI系统** - 让AI助力您的创作之旅 🎬✨