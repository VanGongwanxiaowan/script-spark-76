/**
 * 生产级别应用配置管理
 * 支持多环境配置、动态配置更新和配置验证
 */

export interface AppConfig {
  api: {
    baseUrl: string;
    timeout: number;
    retryAttempts: number;
    retryDelay: number;
  };
  performance: {
    enableMonitoring: boolean;
    maxMetrics: number;
    reportInterval: number;
  };
  error: {
    enableReporting: boolean;
    maxLogSize: number;
    reportThreshold: number;
  };
  ui: {
    theme: 'light' | 'dark' | 'auto';
    language: string;
    animations: boolean;
  };
  features: {
    enableAnalytics: boolean;
    enableErrorTracking: boolean;
    enablePerformanceMonitoring: boolean;
  };
}

export class ConfigManager {
  private static instance: ConfigManager;
  private config: AppConfig;
  private listeners: Map<string, Array<(config: AppConfig) => void>> = new Map();

  private constructor() {
    this.config = this.loadDefaultConfig();
    this.loadFromEnvironment();
    this.loadFromLocalStorage();
  }

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  /**
   * 获取配置
   */
  getConfig(): AppConfig {
    return { ...this.config };
  }

  /**
   * 获取特定配置项
   */
  get<T = any>(path: string): T {
    const keys = path.split('.');
    let value: any = this.config;
    
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return undefined as T;
      }
    }
    
    return value as T;
  }

  /**
   * 设置配置
   */
  set(path: string, value: any): void {
    const keys = path.split('.');
    const lastKey = keys.pop()!;
    let target: any = this.config;
    
    for (const key of keys) {
      if (!target[key] || typeof target[key] !== 'object') {
        target[key] = {};
      }
      target = target[key];
    }
    
    target[lastKey] = value;
    this.saveToLocalStorage();
    this.notifyListeners();
  }

  /**
   * 批量更新配置
   */
  update(updates: Partial<AppConfig>): void {
    this.config = { ...this.config, ...updates };
    this.saveToLocalStorage();
    this.notifyListeners();
  }

  /**
   * 重置配置
   */
  reset(): void {
    this.config = this.loadDefaultConfig();
    this.loadFromEnvironment();
    localStorage.removeItem('app_config');
    this.notifyListeners();
  }

  /**
   * 监听配置变化
   */
  onChange(path: string, callback: (config: AppConfig) => void): () => void {
    if (!this.listeners.has(path)) {
      this.listeners.set(path, []);
    }
    
    this.listeners.get(path)!.push(callback);
    
    // 返回取消监听的函数
    return () => {
      const listeners = this.listeners.get(path);
      if (listeners) {
        const index = listeners.indexOf(callback);
        if (index > -1) {
          listeners.splice(index, 1);
        }
      }
    };
  }

  /**
   * 验证配置
   */
  validate(config: Partial<AppConfig>): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // 验证API配置
    if (config.api) {
      if (config.api.timeout && (config.api.timeout < 1000 || config.api.timeout > 30000)) {
        errors.push('API超时时间必须在1000-30000毫秒之间');
      }
      if (config.api.retryAttempts && (config.api.retryAttempts < 0 || config.api.retryAttempts > 5)) {
        errors.push('重试次数必须在0-5次之间');
      }
    }
    
    // 验证性能配置
    if (config.performance) {
      if (config.performance.maxMetrics && (config.performance.maxMetrics < 100 || config.performance.maxMetrics > 10000)) {
        errors.push('最大指标数量必须在100-10000之间');
      }
    }
    
    // 验证UI配置
    if (config.ui) {
      if (config.ui.theme && !['light', 'dark', 'auto'].includes(config.ui.theme)) {
        errors.push('主题必须是light、dark或auto');
      }
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * 加载默认配置
   */
  private loadDefaultConfig(): AppConfig {
    return {
      api: {
        baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
        timeout: 30000,
        retryAttempts: 3,
        retryDelay: 1000
      },
      performance: {
        enableMonitoring: true,
        maxMetrics: 1000,
        reportInterval: 60000
      },
      error: {
        enableReporting: true,
        maxLogSize: 1000,
        reportThreshold: 10
      },
      ui: {
        theme: 'auto',
        language: 'zh-CN',
        animations: true
      },
      features: {
        enableAnalytics: true,
        enableErrorTracking: true,
        enablePerformanceMonitoring: true
      }
    };
  }

  /**
   * 从环境变量加载配置
   */
  private loadFromEnvironment(): void {
    const env = import.meta.env;
    
    if (env.VITE_API_BASE_URL) {
      this.config.api.baseUrl = env.VITE_API_BASE_URL;
    }
    
    if (env.VITE_API_TIMEOUT) {
      this.config.api.timeout = parseInt(env.VITE_API_TIMEOUT, 10);
    }
    
    if (env.VITE_THEME) {
      this.config.ui.theme = env.VITE_THEME as 'light' | 'dark' | 'auto';
    }
    
    if (env.VITE_LANGUAGE) {
      this.config.ui.language = env.VITE_LANGUAGE;
    }
    
    if (env.VITE_ENABLE_ANALYTICS) {
      this.config.features.enableAnalytics = env.VITE_ENABLE_ANALYTICS === 'true';
    }
    
    if (env.VITE_ENABLE_ERROR_TRACKING) {
      this.config.features.enableErrorTracking = env.VITE_ENABLE_ERROR_TRACKING === 'true';
    }
    
    if (env.VITE_ENABLE_PERFORMANCE_MONITORING) {
      this.config.features.enablePerformanceMonitoring = env.VITE_ENABLE_PERFORMANCE_MONITORING === 'true';
    }
  }

  /**
   * 从本地存储加载配置
   */
  private loadFromLocalStorage(): void {
    try {
      const stored = localStorage.getItem('app_config');
      if (stored) {
        const parsed = JSON.parse(stored);
        this.config = { ...this.config, ...parsed };
      }
    } catch (error) {
      console.warn('Failed to load config from localStorage:', error);
    }
  }

  /**
   * 保存配置到本地存储
   */
  private saveToLocalStorage(): void {
    try {
      localStorage.setItem('app_config', JSON.stringify(this.config));
    } catch (error) {
      console.warn('Failed to save config to localStorage:', error);
    }
  }

  /**
   * 通知监听器
   */
  private notifyListeners(): void {
    this.listeners.forEach((callbacks) => {
      callbacks.forEach(callback => {
        try {
          callback(this.config);
        } catch (error) {
          console.error('Config listener error:', error);
        }
      });
    });
  }
}

// 导出单例实例
export const configManager = ConfigManager.getInstance();

// 导出便捷方法
export const getConfig = () => configManager.getConfig();
export const get = <T = any>(path: string) => configManager.get<T>(path);
export const set = (path: string, value: any) => configManager.set(path, value);
export const update = (updates: Partial<AppConfig>) => configManager.update(updates);
export const reset = () => configManager.reset();
export const onChange = (path: string, callback: (config: AppConfig) => void) => 
  configManager.onChange(path, callback);
export const validate = (config: Partial<AppConfig>) => configManager.validate(config);
