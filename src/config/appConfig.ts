/**
 * 应用配置文件
 * 生产级别的配置管理
 */

export interface AppConfig {
  api: {
    baseURL: string;
    timeout: number;
    retryAttempts: number;
    retryDelay: number;
  };
  ui: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    animations: boolean;
    autoSave: boolean;
  };
  features: {
    webSearch: boolean;
    knowledgeBase: boolean;
    fileUpload: boolean;
    export: boolean;
    analytics: boolean;
  };
  performance: {
    maxFileSize: number;
    maxMessageLength: number;
    cacheTimeout: number;
    debounceDelay: number;
  };
  security: {
    enableCSP: boolean;
    enableHTTPS: boolean;
    maxSessionDuration: number;
  };
}

const defaultConfig: AppConfig = {
  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
    timeout: 30000,
    retryAttempts: 3,
    retryDelay: 1000,
  },
  ui: {
    theme: 'system',
    language: 'zh-CN',
    animations: true,
    autoSave: true,
  },
  features: {
    webSearch: true,
    knowledgeBase: true,
    fileUpload: true,
    export: true,
    analytics: true,
  },
  performance: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    maxMessageLength: 10000,
    cacheTimeout: 5 * 60 * 1000, // 5 minutes
    debounceDelay: 300,
  },
  security: {
    enableCSP: true,
    enableHTTPS: true,
    maxSessionDuration: 24 * 60 * 60 * 1000, // 24 hours
  },
};

class ConfigManager {
  private config: AppConfig;
  private listeners: Array<(config: AppConfig) => void> = [];

  constructor() {
    this.config = this.loadConfig();
    this.setupSecurity();
  }

  /**
   * 加载配置
   */
  private loadConfig(): AppConfig {
    try {
      const savedConfig = localStorage.getItem('juben_app_config');
      if (savedConfig) {
        const parsed = JSON.parse(savedConfig);
        return { ...defaultConfig, ...parsed };
      }
    } catch (error) {
      console.warn('Failed to load config:', error);
    }
    return defaultConfig;
  }

  /**
   * 保存配置
   */
  private saveConfig(): void {
    try {
      localStorage.setItem('juben_app_config', JSON.stringify(this.config));
    } catch (error) {
      console.warn('Failed to save config:', error);
    }
  }

  /**
   * 设置安全配置
   */
  private setupSecurity(): void {
    if (this.config.security.enableCSP) {
      // 设置内容安全策略
      const meta = document.createElement('meta');
      meta.httpEquiv = 'Content-Security-Policy';
      meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';";
      document.head.appendChild(meta);
    }
  }

  /**
   * 获取配置
   */
  getConfig(): AppConfig {
    return { ...this.config };
  }

  /**
   * 更新配置
   */
  updateConfig(updates: Partial<AppConfig>): void {
    this.config = { ...this.config, ...updates };
    this.saveConfig();
    this.notifyListeners();
  }

  /**
   * 重置配置
   */
  resetConfig(): void {
    this.config = { ...defaultConfig };
    this.saveConfig();
    this.notifyListeners();
  }

  /**
   * 添加配置监听器
   */
  addListener(listener: (config: AppConfig) => void): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * 通知监听器
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      try {
        listener(this.config);
      } catch (error) {
        console.warn('Config listener error:', error);
      }
    });
  }

  /**
   * 验证配置
   */
  validateConfig(config: AppConfig): boolean {
    try {
      // 验证API配置
      if (!config.api.baseURL || config.api.timeout <= 0) {
        return false;
      }

      // 验证性能配置
      if (config.performance.maxFileSize <= 0 || config.performance.maxMessageLength <= 0) {
        return false;
      }

      // 验证安全配置
      if (config.security.maxSessionDuration <= 0) {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  }
}

// 创建全局配置管理器实例
export const configManager = new ConfigManager();

// 导出默认配置
export { defaultConfig };

// 导出类型
export type { AppConfig };