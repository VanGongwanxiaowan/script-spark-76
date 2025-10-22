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
  // 新增详细描述字段
  detailedDescription?: string;
  coreResponsibilities?: string[];
  workflow?: string[];
  methodology?: string[];
  outputFormat?: string;
  evaluationCriteria?: string[];
  useCases?: string[];
  technicalSpecs?: {
    inputFormat?: string;
    outputFormat?: string;
    processingTime?: string;
    accuracy?: string;
  };
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
    icon: "🎬",
    detailedDescription: "竖屏短剧剧本创作大师，冷静、精准、犀利的'金牌剧作官'。专注于创作最精彩的竖屏短剧剧本，具备完整的剧本创作全流程能力。",
    coreResponsibilities: [
      "宏观建构：设计整体故事大纲、规划长线剧情结构、布局核心付费卡点",
      "剧本创作：撰写完整的单集或多集剧本",
      "精准优化：对现有剧本进行情节修改、节奏调整、台词润色",
      "创意发想：构思'打脸'场景、设计悬念钩子、头脑风暴人物小传"
    ],
    workflow: [
      "需求分析：理解用户创作需求和目标受众",
      "结构设计：构建故事框架和情节发展脉络",
      "角色塑造：创建立体化的人物形象和关系网络",
      "剧本撰写：按照竖屏短剧格式创作具体内容",
      "优化完善：根据反馈进行细节调整和整体优化"
    ],
    methodology: [
      "情绪弹簧理论：每一集剧本只有'压弹簧'或'放弹簧'两种状态",
      "全局观情绪坐标：将整个剧本看作'情绪K线图'",
      "钩子-反转-再钩子：单集闭环法则",
      "信息前置，废话后置：台词法则",
      "动作可视化：场景构建法则"
    ],
    outputFormat: "单集字数不超过800字，对应成片时长控制在2分钟以内，严格遵守剧本格式规范",
    evaluationCriteria: [
      "情节紧凑度：是否在有限时间内完成完整故事闭环",
      "情绪张力：是否具备足够的戏剧冲突和情感起伏",
      "商业价值：是否具备付费卡点和用户留存潜力",
      "创新性：是否在传统套路基础上有所突破"
    ],
    useCases: [
      "竖屏短剧剧本创作",
      "现有剧本优化改进",
      "情节桥段设计",
      "人物关系构建",
      "商业化卡点布局"
    ],
    technicalSpecs: {
      inputFormat: "故事大纲、人物设定、创作需求描述",
      outputFormat: "标准剧本格式，包含场景描述、对话、动作指导",
      processingTime: "5-10分钟/集",
      accuracy: "95%以上格式规范度"
    }
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
    icon: "📈",
    detailedDescription: "竖屏短剧策划大师，眼光果决、毒辣、直击要害的'爆款引擎'。与用户沟通，充分了解创作需求，协作共创现象级爆款竖屏短剧策划案。",
    coreResponsibilities: [
      "市场分析：深度调研目标受众和市场趋势，识别爆款机会点",
      "爆点设计：构思具有强烈冲击力的情节转折和情感爆发点",
      "情节规划：构建完整的故事发展脉络和节奏控制",
      "商业化卡点：设计付费转化点和用户留存策略"
    ],
    workflow: [
      "初步了解：分析用户创作资料及需求，进行市场扫描",
      "核心定位：提炼爆款基因和差异化竞争优势",
      "人物小传：构建立体化的人物形象和关系网络",
      "故事简纲：设计完整的故事发展脉络",
      "完成策划案：整合所有要素形成完整的策划方案"
    ],
    methodology: [
      "情绪价值第一性原理：以情感共鸣为核心驱动力",
      "黄金三秒钩子法则：开场三秒内抓住用户注意力",
      "'期待-压抑-爆发'三幕式爽点结构：经典戏剧结构应用",
      "人设即容器：通过人物设定承载故事冲突",
      "商业化卡点逻辑：在关键节点设置付费转化"
    ],
    outputFormat: "完整的竖屏短剧策划案，包含市场分析、人物设定、故事大纲、商业化策略等",
    evaluationCriteria: [
      "市场适应性：是否符合目标受众喜好和市场需求",
      "爆点强度：是否具备足够的冲击力和传播性",
      "商业价值：是否具备清晰的盈利模式和变现路径",
      "创新性：是否在现有模式基础上有所突破"
    ],
    useCases: [
      "竖屏短剧项目策划",
      "爆款内容策略制定",
      "市场趋势分析",
      "商业化模式设计",
      "竞品分析对比"
    ],
    technicalSpecs: {
      inputFormat: "创作需求、市场数据、竞品信息、目标受众画像",
      outputFormat: "结构化策划案文档，包含分析报告和执行方案",
      processingTime: "15-30分钟/项目",
      accuracy: "90%以上市场预测准确度"
    }
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
    icon: "💡",
    detailedDescription: "专业的故事创意激发助手，对用户提供的故事创作素材进行充分阅读与理解，与用户一步步沟通，以创新性为第一原则，通过不断创作与修改，最终为用户撰写出具有可行性的故事创意策划案。",
    coreResponsibilities: [
      "素材分析：深度阅读和理解用户提供的创作素材",
      "需求沟通：与用户进行多轮对话，充分了解创作需求",
      "创意激发：以创新性为第一原则，激发独特的故事创意",
      "方案输出：撰写具有可行性的故事创意策划案"
    ],
    workflow: [
      "素材理解：深入分析用户提供的创作素材和背景信息",
      "需求挖掘：通过多轮对话深入了解用户的真实需求",
      "创意构思：基于素材和需求进行创新性故事构思",
      "方案设计：将创意转化为具体的策划方案",
      "优化完善：根据反馈不断优化和完善创意方案"
    ],
    methodology: [
      "创新性第一原则：始终以创新和独特性为核心导向",
      "用户导向思维：深度理解用户需求，提供个性化解决方案",
      "素材整合能力：善于从多个素材中提取和整合有效信息",
      "迭代优化机制：通过多轮对话不断完善创意方案"
    ],
    outputFormat: "故事策划：一句话梗概、故事概念、角色创建、情节结构设计、主题与风格；故事简纲：行文流畅的故事大纲（800字以上）",
    evaluationCriteria: [
      "创新性：是否具备独特的创意点和差异化优势",
      "可行性：是否具备实际操作的可行性和可执行性",
      "市场价值：是否符合市场需求和受众喜好",
      "完整性：是否包含完整的故事要素和发展脉络"
    ],
    useCases: [
      "故事创意策划",
      "IP内容开发",
      "创意头脑风暴",
      "故事大纲设计",
      "内容创新咨询"
    ],
    technicalSpecs: {
      inputFormat: "故事创作素材、用户需求描述、背景信息",
      outputFormat: "故事策划案或故事简纲，包含完整创意方案",
      processingTime: "10-20分钟/项目",
      accuracy: "85%以上创意可行性"
    }
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
    icon: "📋",
    detailedDescription: "专业的大纲创作助手，对用户提供的故事大纲进行结构拆解，从故事大纲的主题立意、人物塑造、情节发展等方面提供专业修改建议，帮助创作者提升影视剧故事大纲的质量。",
    coreResponsibilities: [
      "结构拆解：对故事大纲进行深度结构分析，识别关键要素",
      "主题分析：从主题立意角度评估故事的价值和深度",
      "人物塑造：分析人物设定的合理性和发展空间",
      "情节设计：优化情节发展的逻辑性和吸引力",
      "大纲优化：提供具体的修改建议和改进方案"
    ],
    workflow: [
      "大纲分析：深入阅读和理解用户提供的故事大纲",
      "结构梳理：按照标准结构框架分析大纲组织",
      "要素评估：从主题、人物、情节等维度进行评估",
      "问题识别：发现大纲中存在的问题和不足",
      "建议输出：提供具体的修改建议和优化方案"
    ],
    methodology: [
      "三幕式结构：引子/铺垫、激励事件、冲突/波折、大高潮、结局、尾声",
      "人物弧光理论：确保主要人物有完整的成长轨迹",
      "情节节拍分析：按照标准节拍检查情节发展",
      "主题一致性：确保所有元素都服务于核心主题"
    ],
    outputFormat: "结构化的修改建议报告，包含问题分析、改进建议和具体实施方案",
    evaluationCriteria: [
      "结构完整性：是否具备完整的故事结构框架",
      "逻辑合理性：情节发展是否符合逻辑规律",
      "人物立体性：人物设定是否丰富立体",
      "主题深度：是否具备深刻的思想内涵"
    ],
    useCases: [
      "故事大纲优化",
      "剧本结构分析",
      "创作指导咨询",
      "内容质量提升",
      "创作技巧培训"
    ],
    technicalSpecs: {
      inputFormat: "故事大纲文档、创作需求描述",
      outputFormat: "结构化分析报告和修改建议",
      processingTime: "8-15分钟/项目",
      accuracy: "90%以上分析准确度"
    }
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
    icon: "✏️",
    detailedDescription: "资深影视剧编剧，对用户提供的剧本进行结构拆解，从剧本的主题、创意呈现、人物塑造、人物关系、情节桥段、叙事节奏、台词表达等方面提供专业修改建议，帮助创作者提升影视剧剧本的质量。",
    coreResponsibilities: [
      "结构分析：对剧本进行深度结构拆解，识别关键要素",
      "主题提炼：从主题角度评估剧本的思想深度和价值",
      "创意呈现：分析创意表达的独特性和吸引力",
      "人物优化：完善人物塑造和人物关系设计",
      "情节桥段：优化情节发展的逻辑性和戏剧张力",
      "台词润色：提升对话的生动性和表现力"
    ],
    workflow: [
      "剧本分析：深入阅读和理解用户提供的剧本内容",
      "结构梳理：按照情节节拍进行剧本结构梳理",
      "要素评估：从主题、创意、人物、情节等维度进行评估",
      "问题识别：发现剧本中存在的问题和不足",
      "建议输出：提供具体的修改建议和优化方案"
    ],
    methodology: [
      "情节节拍理论：按照标准节拍检查剧本结构",
      "人物关系网络：构建复杂而合理的人物关系",
      "对话功能化：确保每句台词都有明确功能",
      "视觉化思维：将抽象概念转化为具体场景"
    ],
    outputFormat: "结构化的修改建议报告，包含问题分析、改进建议和具体实施方案",
    evaluationCriteria: [
      "结构完整性：是否具备完整的剧本结构框架",
      "创意独特性：是否具备独特的创意表达",
      "人物立体性：人物塑造是否丰富立体",
      "情节合理性：情节发展是否符合逻辑规律",
      "台词生动性：对话是否生动有力"
    ],
    useCases: [
      "剧本质量提升",
      "创作技巧指导",
      "结构问题诊断",
      "人物关系优化",
      "台词润色服务"
    ],
    technicalSpecs: {
      inputFormat: "剧本文档、创作需求描述、目标受众信息",
      outputFormat: "结构化分析报告和修改建议",
      processingTime: "10-20分钟/项目",
      accuracy: "92%以上分析准确度"
    }
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
    icon: "📊",
    detailedDescription: "资深竖屏短剧评估专家，对用户提供的故事文本进行深度评估与打分，帮助用户判断该故事文本是否具备改编为爆款竖屏短剧的潜力，从各个维度对该故事文本进行深度评估。",
    coreResponsibilities: [
      "爆点评估：分析故事中的核心爽点和情感爆发点",
      "商业价值分析：评估内容的商业潜力和变现能力",
      "市场适应性：判断内容是否符合目标受众喜好",
      "改进方案：提供具体的优化建议和提升策略"
    ],
    workflow: [
      "文本分析：深入阅读和理解用户提供的故事文本",
      "维度评估：从多个专业维度进行系统性评估",
      "评分计算：基于评估标准进行量化评分",
      "问题识别：发现内容中存在的问题和不足",
      "建议输出：提供具体的改进建议和优化方案"
    ],
    methodology: [
      "核心爽点评估：高度普世化、清晰具体化、节奏层层递进",
      "故事类型分析：强设定、经典模式+元素创新",
      "人物设定评估：极致标签化、符号化、功能化",
      "人物关系分析：强冲突与强绑定、权力结构清晰、高度功能化",
      "情节桥段评估：省略过程直接切入核心矛盾、每一桥段只服务于一种极致情绪"
    ],
    outputFormat: "结构化的评估报告，包含各维度评分、问题分析和改进建议",
    evaluationCriteria: [
      "核心爽点：是否具备强烈的情绪冲击力和传播性",
      "故事类型：是否具备清晰的类型定位和创新元素",
      "人物设定：人物是否具备鲜明的标签和功能",
      "人物关系：关系设计是否具备强烈的冲突和绑定",
      "情节桥段：情节是否紧凑有力，直击核心矛盾"
    ],
    useCases: [
      "竖屏短剧内容评估",
      "IP改编潜力分析",
      "内容质量诊断",
      "市场适应性评估",
      "创作方向指导"
    ],
    technicalSpecs: {
      inputFormat: "故事文本、目标受众信息、市场数据",
      outputFormat: "评估报告和评分表，包含详细分析",
      processingTime: "5-10分钟/项目",
      accuracy: "88%以上评估准确度"
    }
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
    icon: "📚",
    detailedDescription: "专业的小说初筛评估助手，对小说进行筛选和评估，帮助用户找到适合改编的优质IP。通过深度分析小说的内容质量、市场潜力、改编可行性等维度，为用户提供专业的IP评估服务。",
    coreResponsibilities: [
      "小说筛选：从大量小说中筛选出具有改编潜力的优质作品",
      "价值评估：评估小说的内容价值、商业价值和市场价值",
      "改编建议：分析小说的改编可行性并提供具体建议",
      "市场分析：分析目标市场和受众群体，评估商业潜力"
    ],
    workflow: [
      "文本分析：深入阅读和分析小说内容",
      "大纲生成：提取故事核心要素，生成故事大纲",
      "多维度评估：从内容、市场、改编等维度进行评估",
      "统计分析：对评估结果进行统计分析和评级",
      "报告输出：生成完整的评估报告和建议方案"
    ],
    methodology: [
      "市场潜力评估：受众适合度、讨论热度、稀缺性、播放数据",
      "创新属性分析：核心选点、故事概念、故事设计",
      "内容亮点挖掘：主题立意、故事情境、人物设定、人物关系、情节桥段",
      "改编可行性分析：视觉化程度、情节密度、人物复杂度"
    ],
    outputFormat: "综合评估报告，包含评分、等级、问题分析和改进建议",
    evaluationCriteria: [
      "内容质量：故事完整性、逻辑性、创新性",
      "市场潜力：受众基础、话题性、商业价值",
      "改编可行性：视觉化程度、情节密度、人物复杂度",
      "创新性：是否具备独特的创意点和差异化优势"
    ],
    useCases: [
      "IP采购决策",
      "内容投资评估",
      "改编项目筛选",
      "市场趋势分析",
      "创作方向指导"
    ],
    technicalSpecs: {
      inputFormat: "小说文本、题材类型、目标受众信息",
      outputFormat: "评估报告和评级表，包含详细分析",
      processingTime: "15-30分钟/项目",
      accuracy: "85%以上评估准确度"
    }
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
    icon: "📋",
    detailedDescription: "专业的故事大纲评估助手，对故事大纲进行深度分析，从结构、逻辑、创意等维度提供专业评估。通过系统性的分析，帮助用户识别大纲中的问题，提供具体的改进建议。",
    coreResponsibilities: [
      "结构分析：评估故事大纲的结构完整性和合理性",
      "逻辑评估：检查情节发展的逻辑性和连贯性",
      "创意分析：评估创意的独特性和市场价值",
      "改进建议：提供具体的优化建议和提升策略"
    ],
    workflow: [
      "大纲分析：深入阅读和理解故事大纲内容",
      "结构梳理：按照标准结构框架分析大纲组织",
      "要素评估：从多个维度进行系统性评估",
      "问题识别：发现大纲中存在的问题和不足",
      "建议输出：提供具体的修改建议和优化方案"
    ],
    methodology: [
      "结构完整性检查：引子、激励事件、冲突、高潮、结局",
      "逻辑合理性分析：情节发展的因果关系和逻辑链条",
      "创意独特性评估：创新点和差异化优势分析",
      "市场适应性判断：是否符合目标受众喜好"
    ],
    outputFormat: "结构化的评估报告，包含各维度评分、问题分析和改进建议",
    evaluationCriteria: [
      "结构完整性：是否具备完整的故事结构框架",
      "逻辑合理性：情节发展是否符合逻辑规律",
      "创意独特性：是否具备独特的创意点和差异化优势",
      "市场适应性：是否符合目标受众喜好和市场需求"
    ],
    useCases: [
      "故事大纲质量评估",
      "创作指导咨询",
      "结构问题诊断",
      "创意优化建议",
      "市场适应性分析"
    ],
    technicalSpecs: {
      inputFormat: "故事大纲文档、题材类型、目标受众信息",
      outputFormat: "评估报告和评分表，包含详细分析",
      processingTime: "8-15分钟/项目",
      accuracy: "90%以上评估准确度"
    }
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
    icon: "💎",
    detailedDescription: "专业的IP评估智能体，对提供的由作者创作的IP类型的网络信息进行梳理，从各个维度对该IP类型的内容进行总结，并进行分析、打分，为用户后续是否要对该IP类型进行进一步的影视改编给出意见。",
    coreResponsibilities: [
      "IP价值分析：评估IP的内容价值、文化价值和商业价值",
      "市场潜力评估：分析IP的市场前景和受众基础",
      "改编建议：提供具体的影视改编建议和策略",
      "商业价值评估：评估IP的商业化潜力和变现能力"
    ],
    workflow: [
      "信息收集：收集和整理IP相关的网络信息",
      "内容分析：深入分析IP的内容特点和价值",
      "市场调研：分析目标市场和受众群体",
      "多维度评估：从多个专业维度进行系统性评估",
      "报告输出：生成完整的评估报告和建议方案"
    ],
    methodology: [
      "市场潜力评估：受众适合度、讨论热度、稀缺性、播放数据",
      "创新属性分析：核心选点、故事概念、故事设计",
      "内容亮点挖掘：主题立意、故事情境、人物设定、人物关系、情节桥段",
      "商业价值分析：IP影响力、粉丝基础、变现潜力"
    ],
    outputFormat: "综合评估报告，包含评分、等级、问题分析和改编建议",
    evaluationCriteria: [
      "内容质量：故事完整性、创新性、文化价值",
      "市场潜力：受众基础、话题性、商业价值",
      "改编可行性：视觉化程度、情节密度、人物复杂度",
      "商业价值：IP影响力、粉丝基础、变现潜力"
    ],
    useCases: [
      "IP采购决策",
      "内容投资评估",
      "改编项目筛选",
      "市场趋势分析",
      "商业价值评估"
    ],
    technicalSpecs: {
      inputFormat: "IP信息、作品类型、市场数据、受众信息",
      outputFormat: "评估报告和评级表，包含详细分析",
      processingTime: "20-40分钟/项目",
      accuracy: "87%以上评估准确度"
    }
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
    icon: "🎯",
    detailedDescription: "题材与类型类影视剧本资深评估专家，对提供的影视剧本进行深入阅读，根据题材类型类影视剧本的评估重点，从思想性、艺术性、观赏性三个维度进行判断、评分，为用户后续是否要继续推进该剧本或如何修改该剧本给出建议。",
    coreResponsibilities: [
      "思想性评估：评估剧本的价值观、社会意义和思想深度",
      "艺术性分析：分析剧本的细节刻画、创意呈现、叙事技巧",
      "观赏性判断：评估剧本的受众基础、话题性、娱乐价值",
      "综合评分：基于三个维度进行综合评分和等级划分"
    ],
    workflow: [
      "剧本分析：深入阅读和理解影视剧本内容",
      "三维评估：从思想性、艺术性、观赏性三个维度进行评估",
      "细节分析：分析剧本的细节刻画和技巧运用",
      "综合评分：基于评估标准进行量化评分",
      "建议输出：提供具体的修改建议和优化方案"
    ],
    methodology: [
      "思想性评估：价值观、社会意义、思想深度",
      "艺术性分析：细节刻画、创意呈现、叙事逻辑、叙事技巧、叙事节奏、台词表达",
      "观赏性判断：受众基础、话题性、题材风格、人物塑造、人物关系、情节桥段"
    ],
    outputFormat: "三维度评估报告，包含各维度评分、问题分析和改进建议",
    evaluationCriteria: [
      "思想性：价值观是否正确、社会意义是否深刻",
      "艺术性：技巧运用是否娴熟、创意表达是否独特",
      "观赏性：是否具备足够的娱乐价值和话题性",
      "综合质量：整体质量是否达到制作标准"
    ],
    useCases: [
      "剧本质量评估",
      "制作决策支持",
      "创作指导咨询",
      "内容优化建议",
      "投资风险评估"
    ],
    technicalSpecs: {
      inputFormat: "影视剧本文档、题材类型、目标受众信息",
      outputFormat: "三维度评估报告和评分表，包含详细分析",
      processingTime: "12-25分钟/项目",
      accuracy: "91%以上评估准确度"
    }
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
    icon: "⚡",
    detailedDescription: "一键总结提炼故事文本的五元素，基于中国传统五行理论，处理剧本创作中的五个核心要素。通过系统性的分析，帮助用户全面理解故事的核心要素，为后续创作提供指导。",
    coreResponsibilities: [
      "五行分析：基于金木水火土理论分析故事要素",
      "要素平衡：确保五个核心要素的平衡发展",
      "流程优化：优化故事创作的整体流程",
      "系统整合：将分散的要素整合为有机整体"
    ],
    workflow: [
      "文本分割：将大文档按指定长度分割成多个文本块",
      "故事总结：对分割后的内容进行总结提炼",
      "五元素提取：调用五个专业智能体进行分析",
      "思维导图生成：生成可视化的思维导图",
      "流式输出：智能体完成即输出，最后展示完整内容"
    ],
    methodology: [
      "金（结构）：故事框架、情节组织、逻辑关系",
      "木（创意）：创新点、独特元素、差异化优势",
      "水（情感）：情感曲线、情绪张力、情感共鸣",
      "火（冲突）：矛盾冲突、戏剧张力、高潮设计",
      "土（基础）：人物设定、世界观构建、基础设定"
    ],
    outputFormat: "五元素分析报告，包含题材类型、故事梗概、人物小传、人物关系、大情节点和思维导图",
    evaluationCriteria: [
      "要素完整性：五个核心要素是否齐全",
      "平衡性：各要素之间是否平衡发展",
      "逻辑性：要素之间的关系是否合理",
      "创新性：是否具备独特的创意元素"
    ],
    useCases: [
      "故事分析总结",
      "创作要素梳理",
      "内容结构优化",
      "创作指导咨询",
      "项目规划支持"
    ],
    technicalSpecs: {
      inputFormat: "故事文本、分割长度设置",
      outputFormat: "五元素分析报告和思维导图",
      processingTime: "15-30分钟/项目",
      accuracy: "93%以上分析准确度"
    }
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
    icon: "📺",
    detailedDescription: "已播剧集分析工作流处理Agent，专注于系列剧本的整体分析，包括系列连贯性、角色成长线、情节发展脉络等。通过深度分析已播剧集，为用户提供专业的系列分析报告。",
    coreResponsibilities: [
      "系列连贯性分析：分析系列剧集之间的逻辑关系和连贯性",
      "角色成长分析：追踪主要角色的成长轨迹和发展变化",
      "情节脉络梳理：梳理整个系列的情节发展脉络和关键节点",
      "整体规划建议：为系列剧集的后续发展提供规划建议"
    ],
    workflow: [
      "剧集信息收集：收集和整理剧集的基础信息",
      "情节内容分析：深入分析各集的情节内容和关键事件",
      "角色关系梳理：分析角色之间的关系变化和发展",
      "系列连贯性检查：检查系列剧集之间的逻辑关系",
      "综合分析报告：生成完整的系列分析报告"
    ],
    methodology: [
      "系列连贯性检查：确保各集之间的逻辑关系合理",
      "角色弧光分析：追踪角色的成长轨迹和变化",
      "情节节拍分析：按照标准节拍分析情节发展",
      "整体结构评估：评估整个系列的结构完整性"
    ],
    outputFormat: "系列分析报告，包含剧集信息、五元素分析、拉片分析和分集剧情",
    evaluationCriteria: [
      "连贯性：系列剧集之间的逻辑关系是否合理",
      "完整性：角色成长线是否完整清晰",
      "节奏感：情节发展是否张弛有度",
      "创新性：是否具备独特的创意元素"
    ],
    useCases: [
      "系列剧集分析",
      "创作参考研究",
      "市场趋势分析",
      "创作技巧学习",
      "项目规划参考"
    ],
    technicalSpecs: {
      inputFormat: "剧集名称、分集剧情、用户上传文件",
      outputFormat: "系列分析报告和思维导图",
      processingTime: "20-40分钟/项目",
      accuracy: "90%以上分析准确度"
    }
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
    icon: "🎭",
    detailedDescription: "大情节点生成工作流处理Agent，专门处理剧本中的关键情节点，包括开场、转折、高潮、结局等关键节点的设计与优化。通过系统性的分析，帮助用户构建完整的情节发展脉络。",
    coreResponsibilities: [
      "情节点识别：识别故事中的关键情节点和转折点",
      "节奏控制：控制情节发展的节奏和张弛",
      "高潮设计：设计故事的高潮部分和情感爆发点",
      "转折优化：优化情节转折的逻辑性和冲击力"
    ],
    workflow: [
      "文本处理：对用户提供的文本进行分割和处理",
      "故事总结：对处理后的内容进行总结提炼",
      "大情节点提取：调用专业智能体提取大情节点",
      "详细情节点分析：分析详细的情节点内容",
      "思维导图生成：生成可视化的思维导图"
    ],
    methodology: [
      "情节点定义：按照标准定义识别关键情节点",
      "节奏分析：分析情节发展的节奏和张弛",
      "高潮设计：确保高潮部分具备足够的冲击力",
      "转折逻辑：确保转折点的逻辑性和合理性"
    ],
    outputFormat: "情节点分析报告，包含大情节点、详细情节点和思维导图",
    evaluationCriteria: [
      "完整性：关键情节点是否齐全",
      "逻辑性：情节点之间的逻辑关系是否合理",
      "节奏感：情节发展是否张弛有度",
      "冲击力：高潮部分是否具备足够的冲击力"
    ],
    useCases: [
      "情节点分析",
      "情节结构优化",
      "创作指导咨询",
      "节奏控制建议",
      "高潮设计支持"
    ],
    technicalSpecs: {
      inputFormat: "故事文本、分割长度设置、截取长度设置",
      outputFormat: "情节点分析报告和思维导图",
      processingTime: "10-20分钟/项目",
      accuracy: "92%以上分析准确度"
    }
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
    icon: "🎪",
    detailedDescription: "情节点戏剧功能分析处理Agent，对剧本的整体剧情进行深度分析，包括戏剧张力、情感曲线、节奏把控等专业维度。通过专业的戏剧理论分析，帮助用户优化剧本的戏剧效果。",
    coreResponsibilities: [
      "戏剧张力分析：分析剧本的戏剧张力和冲突强度",
      "情感曲线绘制：绘制情感发展的曲线和变化",
      "节奏分析：分析情节发展的节奏和张弛",
      "冲突设计：优化冲突的设计和呈现方式"
    ],
    workflow: [
      "文本处理：对用户提供的文本进行分割和处理",
      "情节点分析：分析故事中的关键情节点",
      "戏剧功能分析：分析每个情节点的戏剧功能",
      "综合评估：对整体戏剧效果进行综合评估",
      "优化建议：提供具体的优化建议和改进方案"
    ],
    methodology: [
      "戏剧张力理论：分析冲突的强度和戏剧张力",
      "情感曲线分析：绘制情感发展的起伏变化",
      "节奏控制理论：分析情节发展的节奏和张弛",
      "冲突设计原则：优化冲突的设计和呈现"
    ],
    outputFormat: "戏剧功能分析报告，包含情节点分析、戏剧功能评估和优化建议",
    evaluationCriteria: [
      "戏剧张力：是否具备足够的戏剧张力和冲突强度",
      "情感曲线：情感发展是否起伏有致",
      "节奏感：情节发展是否张弛有度",
      "冲突设计：冲突设计是否合理有效"
    ],
    useCases: [
      "戏剧效果分析",
      "情节结构优化",
      "冲突设计改进",
      "节奏控制建议",
      "创作技巧指导"
    ],
    technicalSpecs: {
      inputFormat: "故事文本、分割长度设置、截取长度设置",
      outputFormat: "戏剧功能分析报告，包含详细分析",
      processingTime: "12-25分钟/项目",
      accuracy: "89%以上分析准确度"
    }
  },
];
