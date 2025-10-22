/**
 * 剧本创作AI系统API服务层
 * 提供与后端API的交互功能
 */

export interface ChatRequest {
  user_id: string;
  session_id: string;
  request_data: {
    query: string;
    agent_type: string;
    files?: Array<{
      type: string;
      content: string;
      name: string;
      size?: number;
    }>;
    background?: {
      genre?: string;
      target_audience?: string;
      style?: string;
      market_info?: string;
      competitor_analysis?: string;
      creative_materials?: string;
    };
    workflow_type?: string;
    evaluation_type?: string;
    work_type?: string;
    theme?: string;
    chunk_size?: number;
    max_word_count?: number;
    evaluation_count?: number;
    interaction_context?: Record<string, any>;
    auto?: boolean;
  };
}

export interface StreamEvent {
  type: string;
  content: string;
  timestamp: string;
  agent_source: string;
  payload: {
    content_type: string;
    data: any;
  };
}

export interface AgentInfo {
  name: string;
  display_name: string;
  description: string;
  capabilities: string[];
  status: string;
  category: string;
}

export interface SystemStatus {
  system_status: string;
  active_agents: number;
  available_tools: number;
  active_sessions: number;
  performance_metrics: Record<string, any>;
}

export interface SessionInfo {
  session_id: string;
  user_id: string;
  created_at: string;
  last_activity: string;
  agent_type?: string;
  status: string;
}

class JuBenAPIService {
  private baseURL: string;
  private userId: string;
  private sessionId: string;

  constructor() {
    this.baseURL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8000';
    this.userId = this.getOrCreateUserId();
    this.sessionId = this.getOrCreateSessionId();
  }

  private getOrCreateUserId(): string {
    let userId = localStorage.getItem('juben_user_id');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('juben_user_id', userId);
    }
    return userId;
  }

  private getOrCreateSessionId(): string {
    let sessionId = localStorage.getItem('juben_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('juben_session_id', sessionId);
    }
    return sessionId;
  }

  /**
   * 带重试机制的fetch请求
   */
  private async fetchWithRetry(url: string, options: RequestInit, maxRetries: number = 3): Promise<Response> {
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetch(url, options);
        
        // 如果是服务器错误(5xx)或网络错误，进行重试
        if (response.status >= 500 || response.status === 429) {
          if (attempt < maxRetries) {
            const delay = Math.pow(2, attempt - 1) * 1000; // 指数退避
            await new Promise(resolve => setTimeout(resolve, delay));
            continue;
          }
        }
        
        return response;
      } catch (error) {
        lastError = error as Error;
        
        // 如果是网络错误且还有重试次数，继续重试
        if (attempt < maxRetries && (error as Error).name === 'TypeError') {
          const delay = Math.pow(2, attempt - 1) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        
        throw error;
      }
    }
    
    throw lastError || new Error('请求失败');
  }

  public createNewSession(): string {
    this.sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('juben_session_id', this.sessionId);
    return this.sessionId;
  }

  public getCurrentUserId(): string {
    return this.userId;
  }

  public getCurrentSessionId(): string {
    return this.sessionId;
  }

  /**
   * 发送聊天请求到指定的Agent
   */
  async sendChatRequest(
    agentType: string,
    query: string,
    options: {
      files?: Array<{ type: string; content: string; name: string; size?: number }>;
      background?: any;
      workflow_type?: string;
      evaluation_type?: string;
      work_type?: string;
      theme?: string;
      auto?: boolean;
    } = {}
  ): Promise<ReadableStream<StreamEvent>> {
    const startTime = performance.now();
    const request: ChatRequest = {
      user_id: this.userId,
      session_id: this.sessionId,
      request_data: {
        query,
        agent_type: agentType,
        ...options
      }
    };

    try {
      const response = await this.fetchWithRetry(`${this.baseURL}/juben/${agentType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
      });

      const endTime = performance.now();
      const duration = endTime - startTime;

      // 记录性能指标
      if (typeof window !== 'undefined' && 'performance' in window) {
        const { recordApiRequest } = await import('../utils/performanceMonitor');
        recordApiRequest(
          `${this.baseURL}/juben/${agentType}`,
          'POST',
          startTime,
          endTime,
          response.ok,
          response.ok ? undefined : `HTTP ${response.status}`
        );
      }

      if (!response.ok) {
        throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
      }

      if (!response.body) {
        throw new Error('响应体为空');
      }

      return this.parseSSEStream(response.body);
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;

      // 记录错误性能指标
      if (typeof window !== 'undefined' && 'performance' in window) {
        const { recordApiRequest } = await import('../utils/performanceMonitor');
        recordApiRequest(
          `${this.baseURL}/juben/${agentType}`,
          'POST',
          startTime,
          endTime,
          false,
          error instanceof Error ? error.message : 'Unknown error'
        );
      }

      throw error;
    }
  }

  /**
   * 解析SSE流
   */
  private async parseSSEStream(body: ReadableStream<Uint8Array>): Promise<ReadableStream<StreamEvent>> {
    const reader = body.getReader();
    const decoder = new TextDecoder();

    return new ReadableStream({
      start(controller) {
        function pump(): Promise<void> {
          return reader.read().then(({ done, value }) => {
            if (done) {
              controller.close();
              return;
            }

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                try {
                  const data = line.slice(6);
                  if (data === '[DONE]') {
                    controller.close();
                    return;
                  }
                  
                  // 添加数据验证
                  if (data.trim()) {
                    const event: StreamEvent = JSON.parse(data);
                    // 验证事件结构
                    if (event.type && event.content !== undefined) {
                      controller.enqueue(event);
                    } else {
                      console.warn('无效的SSE事件格式:', event);
                    }
                  }
                } catch (error) {
                  console.error('解析SSE数据失败:', error, '原始数据:', line);
                  // 发送错误事件而不是忽略
                  controller.enqueue({
                    type: 'error',
                    content: `数据解析错误: ${error instanceof Error ? error.message : '未知错误'}`,
                    timestamp: new Date().toISOString(),
                    agent_source: 'api_service',
                    payload: {
                      content_type: 'error',
                      data: { error: String(error) }
                    }
                  });
                }
              }
            }

            return pump();
          }).catch((error) => {
            console.error('SSE流读取失败:', error);
            controller.enqueue({
              type: 'error',
              content: `流读取错误: ${error.message}`,
              timestamp: new Date().toISOString(),
              agent_source: 'api_service',
              payload: {
                content_type: 'error',
                data: { error: error.message }
              }
            });
            controller.close();
          });
        }

        return pump();
      }
    });
  }

  /**
   * 获取可用的Agent列表
   */
  async getAgents(): Promise<AgentInfo[]> {
    const response = await fetch(`${this.baseURL}/juben/agents`);
    if (!response.ok) {
      throw new Error(`获取Agent列表失败: ${response.status}`);
    }
    return response.json();
  }

  /**
   * 获取系统状态
   */
  async getSystemStatus(): Promise<SystemStatus> {
    const response = await fetch(`${this.baseURL}/juben/status`);
    if (!response.ok) {
      throw new Error(`获取系统状态失败: ${response.status}`);
    }
    return response.json();
  }

  /**
   * 获取用户会话列表
   */
  async getUserSessions(): Promise<SessionInfo[]> {
    const response = await fetch(`${this.baseURL}/juben/sessions/${this.userId}`);
    if (!response.ok) {
      throw new Error(`获取会话列表失败: ${response.status}`);
    }
    return response.json();
  }

  /**
   * 创建新会话
   */
  async createSession(): Promise<{ session_id: string }> {
    const response = await fetch(`${this.baseURL}/juben/sessions/${this.userId}`, {
      method: 'POST'
    });
    if (!response.ok) {
      throw new Error(`创建会话失败: ${response.status}`);
    }
    const result = await response.json();
    this.sessionId = result.data.session_id;
    localStorage.setItem('juben_session_id', this.sessionId);
    return result.data;
  }

  /**
   * 删除会话
   */
  async deleteSession(sessionId: string): Promise<void> {
    const response = await fetch(`${this.baseURL}/juben/sessions/${this.userId}/${sessionId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`删除会话失败: ${response.status}`);
    }
  }

  /**
   * 健康检查
   */
  async healthCheck(): Promise<{ status: string; message: string; data: any }> {
    const response = await fetch(`${this.baseURL}/juben/health`);
    if (!response.ok) {
      throw new Error(`健康检查失败: ${response.status}`);
    }
    return response.json();
  }

  /**
   * 导出内容
   */
  async exportContent(
    sessionId: string,
    exportFormat: string = 'txt',
    contentTypes: string[] = ['script'],
    includeMetadata: boolean = false
  ): Promise<{
    status: string;
    message: string;
    export_format: string;
    total_items: number;
    exported_data: string;
    filename: string;
  }> {
    const response = await fetch(`${this.baseURL}/juben/export/content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: this.userId,
        session_id: sessionId,
        export_format: exportFormat,
        content_types: contentTypes,
        include_metadata: includeMetadata
      })
    });

    if (!response.ok) {
      throw new Error(`导出内容失败: ${response.status}`);
    }

    return response.json();
  }
}

// 创建单例实例
export const apiService = new JuBenAPIService();
export default apiService;
