export interface Agent {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  description: string;
  capabilities: string[];
  usageCount: number;
  isOnline: boolean;
  tags: string[];
  apiEndpoint?: string;
  icon?: string;
}

export const agentCategories = [
  { id: "creation", name: "创作类", color: "hsl(0 86% 60%)", icon: "✍️" },
  { id: "evaluation", name: "评估分析类", color: "hsl(220 86% 60%)", icon: "📊" },
  { id: "workflow", name: "工作流类", color: "hsl(140 86% 50%)", icon: "⚡" },
  { id: "professional", name: "专业分析类", color: "hsl(280 86% 60%)", icon: "🎭" },
  { id: "information", name: "信息处理类", color: "hsl(40 86% 60%)", icon: "📝" },
  { id: "quality", name: "质量控制类", color: "hsl(320 86% 60%)", icon: "🔍" },
  { id: "core", name: "核心编排类", color: "hsl(180 86% 50%)", icon: "🎯" },
];

export const agents: Agent[] = [
  {
    id: "script-creation",
    name: "剧本创作助手",
    nameEn: "Script Creation Agent",
    category: "creation",
    description: "竖屏短剧剧本创作大师，创作最精彩的竖屏短剧剧本。专业的剧本创作引擎，负责剧本创作的全流程，具备对话生成、场景描述、角色塑造、情节设计、冲突构建等多项核心能力。",
    capabilities: ["剧本创作", "对话生成", "场景描述", "角色塑造", "情节设计"],
    usageCount: 0,
    isOnline: true,
    tags: ["在线"],
    apiEndpoint: "/juben/script_creation",
    icon: "🎬"
  },
  {
    id: "script-planning",
    name: "剧本策划助手",
    nameEn: "Script Planning Agent",
    category: "creation",
    description: "竖屏短剧策划大师，眼光果决、毒辣、直击要害的爆款引擎。与用户沟通，充分了解创作需求，协作共创现象级爆款竖屏短剧策划案。",
    capabilities: ["市场分析", "爆点设计", "情节规划", "商业化卡点"],
    usageCount: 0,
    isOnline: true,
    tags: ["在线"],
    apiEndpoint: "/juben/script_planning",
    icon: "📈"
  },
  {
    id: "story-idea",
    name: "故事创意激发助手",
    nameEn: "Story Idea Agent",
    category: "creation",
    description: "专业的故事创意激发助手，对用户提供的故事创作素材进行充分阅读与理解，与用户一步步沟通，以创新性为第一原则，最终为用户撰写出具有可行性的故事创意策划案。",
    capabilities: ["创意构思", "市场分析", "用户画像", "竞品分析"],
    usageCount: 0,
    isOnline: true,
    tags: ["在线"],
    apiEndpoint: "/juben/story_idea",
    icon: "💡"
  },
  {
    id: "outline-creation",
    name: "大纲创作助手",
    nameEn: "Outline Creation Agent",
    category: "creation",
    description: "专业的大纲创作助手，对用户提供的故事大纲进行结构拆解，从故事大纲的主题立意、人物塑造、情节发展等方面提供专业修改建议。",
    capabilities: ["结构拆解", "主题分析", "情节设计", "大纲优化"],
    usageCount: 0,
    isOnline: true,
    tags: ["在线"],
    apiEndpoint: "/juben/outline_creation",
    icon: "📋"
  },
  {
    id: "script-creation-assistant",
    name: "剧本创作助手",
    nameEn: "Script Creation Assistant",
    category: "creation",
    description: "资深影视剧编剧，对用户提供的剧本进行结构拆解，从剧本的主题、创意呈现、人物塑造、人物关系、情节桥段等方面提供专业修改建议。",
    capabilities: ["结构分析", "主题提炼", "人物优化", "台词润色"],
    usageCount: 0,
    isOnline: true,
    tags: ["在线"],
    apiEndpoint: "/juben/script_creation_assistant",
    icon: "✏️"
  },
  {
    id: "script-evaluation",
    name: "剧本评估审读助手",
    nameEn: "Script Evaluation Agent",
    category: "evaluation",
    description: "资深竖屏短剧评估专家，对用户提供的故事文本进行深度评估与打分，帮助用户判断该故事文本是否具备改编为爆款竖屏短剧的潜力。",
    capabilities: ["爆点评估", "商业价值分析", "市场适应性", "改进方案"],
    usageCount: 0,
    isOnline: true,
    tags: ["在线"],
    apiEndpoint: "/juben/script_evaluation",
    icon: "📊"
  },
  {
    id: "novel-screening",
    name: "小说初筛评估",
    nameEn: "Novel Screening Agent",
    category: "evaluation",
    description: "专业的小说初筛评估助手，对小说进行筛选和评估，帮助用户找到适合改编的优质IP。",
    capabilities: ["小说筛选", "价值评估", "改编建议", "市场分析"],
    usageCount: 0,
    isOnline: true,
    tags: ["在线"],
    apiEndpoint: "/juben/novel_screening",
    icon: "📚"
  },
  {
    id: "story-outline-evaluation",
    name: "故事大纲评估",
    nameEn: "Story Outline Evaluation Agent",
    category: "evaluation",
    description: "专业的故事大纲评估助手，对故事大纲进行深度分析，从结构、逻辑、创意等维度提供专业评估。",
    capabilities: ["结构分析", "逻辑评估", "创意分析", "改进建议"],
    usageCount: 0,
    isOnline: true,
    tags: ["在线"],
    apiEndpoint: "/juben/story_outline_evaluation",
    icon: "📋"
  },
  {
    id: "ip-evaluation",
    name: "IP评估智能体",
    nameEn: "IP Evaluation Agent",
    category: "evaluation",
    description: "专业的IP评估智能体，对提供的由作者创作的IP类型的网络信息进行梳理，从各个维度对该IP类型的内容进行总结，并进行分析、打分。",
    capabilities: ["IP价值分析", "市场潜力", "改编建议", "商业价值"],
    usageCount: 0,
    isOnline: true,
    tags: ["在线"],
    apiEndpoint: "/juben/ip_evaluation",
    icon: "💎"
  },
  {
    id: "script-evaluation-analysis",
    name: "剧本评估分析",
    nameEn: "Script Evaluation Analysis Agent",
    category: "evaluation",
    description: "题材与类型类影视剧本资深评估专家，对提供的影视剧本进行深入阅读，根据题材类型类影视剧本的评估重点，从思想性、艺术性、观赏性三个维度进行判断、评分。",
    capabilities: ["思想性评估", "艺术性分析", "观赏性判断", "综合评分"],
    usageCount: 0,
    isOnline: true,
    tags: ["在线"],
    apiEndpoint: "/juben/script_evaluation_analysis",
    icon: "🎯"
  },
  {
    id: "five-elements",
    name: "故事五元素工作流",
    nameEn: "Five Elements Workflow",
    category: "workflow",
    description: "一键总结提炼故事文本的五元素，基于中国传统五行理论，处理剧本创作中的五个核心要素：金（结构）、木（创意）、水（情感）、火（冲突）、土（基础）。",
    capabilities: ["五行分析", "要素平衡", "流程优化", "系统整合"],
    usageCount: 0,
    isOnline: true,
    tags: ["在线"],
    apiEndpoint: "/juben/five_elements",
    icon: "⚡"
  },
  {
    id: "series-analysis",
    name: "已播剧集分析工作流",
    nameEn: "Series Analysis Workflow",
    category: "workflow",
    description: "已播剧集分析工作流处理Agent，专注于系列剧本的整体分析，包括系列连贯性、角色成长线、情节发展脉络等。",
    capabilities: ["系列连贯性", "角色成长", "情节脉络", "整体规划"],
    usageCount: 0,
    isOnline: true,
    tags: ["在线"],
    apiEndpoint: "/juben/series_analysis",
    icon: "📺"
  },
  {
    id: "plot-points",
    name: "大情节点生成工作流",
    nameEn: "Plot Points Workflow",
    category: "workflow",
    description: "大情节点生成工作流处理Agent，专门处理剧本中的关键情节点，包括开场、转折、高潮、结局等关键节点的设计与优化。",
    capabilities: ["情节点识别", "节奏控制", "高潮设计", "转折优化"],
    usageCount: 0,
    isOnline: true,
    tags: ["在线"],
    apiEndpoint: "/juben/plot_points",
    icon: "🎭"
  },
  {
    id: "plot-drama-analysis",
    name: "情节点戏剧功能分析",
    nameEn: "Plot Drama Analysis",
    category: "workflow",
    description: "情节点戏剧功能分析处理Agent，对剧本的整体剧情进行深度分析，包括戏剧张力、情感曲线、节奏把控等专业维度。",
    capabilities: ["戏剧张力", "情感曲线", "节奏分析", "冲突设计"],
    usageCount: 0,
    isOnline: true,
    tags: ["在线"],
    apiEndpoint: "/juben/plot_drama_analysis",
    icon: "🎪"
  },
];
