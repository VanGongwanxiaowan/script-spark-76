/**
 * 生产级别错误处理工具
 * 提供统一的错误处理、监控和用户友好的错误消息
 */

export interface ErrorInfo {
  code: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'network' | 'api' | 'validation' | 'system' | 'user';
  timestamp: string;
  context?: Record<string, any>;
}

export class ErrorHandler {
  private static instance: ErrorHandler;
  private errorLog: ErrorInfo[] = [];
  private maxLogSize = 1000;

  private constructor() {}

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  /**
   * 处理API错误
   */
  handleApiError(error: any, context?: Record<string, any>): ErrorInfo {
    const errorInfo: ErrorInfo = {
      code: this.getErrorCode(error),
      message: this.getErrorMessage(error),
      severity: this.getErrorSeverity(error),
      category: 'api',
      timestamp: new Date().toISOString(),
      context
    };

    this.logError(errorInfo);
    return errorInfo;
  }

  /**
   * 处理网络错误
   */
  handleNetworkError(error: any, context?: Record<string, any>): ErrorInfo {
    const errorInfo: ErrorInfo = {
      code: 'NETWORK_ERROR',
      message: this.getNetworkErrorMessage(error),
      severity: 'high',
      category: 'network',
      timestamp: new Date().toISOString(),
      context
    };

    this.logError(errorInfo);
    return errorInfo;
  }

  /**
   * 处理验证错误
   */
  handleValidationError(error: any, context?: Record<string, any>): ErrorInfo {
    const errorInfo: ErrorInfo = {
      code: 'VALIDATION_ERROR',
      message: this.getValidationErrorMessage(error),
      severity: 'medium',
      category: 'validation',
      timestamp: new Date().toISOString(),
      context
    };

    this.logError(errorInfo);
    return errorInfo;
  }

  /**
   * 获取用户友好的错误消息
   */
  getUserFriendlyMessage(errorInfo: ErrorInfo): string {
    const messages: Record<string, string> = {
      'NETWORK_ERROR': '网络连接异常，请检查网络设置后重试',
      'API_ERROR': '服务暂时不可用，请稍后重试',
      'VALIDATION_ERROR': '输入内容有误，请检查后重试',
      'TIMEOUT_ERROR': '请求超时，请稍后重试',
      'AUTH_ERROR': '认证失败，请重新登录',
      'RATE_LIMIT_ERROR': '请求过于频繁，请稍后重试',
      'SERVER_ERROR': '服务器内部错误，请联系技术支持'
    };

    return messages[errorInfo.code] || '发生未知错误，请稍后重试';
  }

  /**
   * 记录错误
   */
  private logError(errorInfo: ErrorInfo): void {
    this.errorLog.push(errorInfo);
    
    // 保持日志大小限制
    if (this.errorLog.length > this.maxLogSize) {
      this.errorLog = this.errorLog.slice(-this.maxLogSize);
    }

    // 根据严重程度决定是否上报
    if (errorInfo.severity === 'critical' || errorInfo.severity === 'high') {
      this.reportError(errorInfo);
    }

    // 开发环境下打印详细错误
    if (process.env.NODE_ENV === 'development') {
      console.error('Error logged:', errorInfo);
    }
  }

  /**
   * 上报错误（可集成第三方错误监控服务）
   */
  private reportError(errorInfo: ErrorInfo): void {
    // 这里可以集成 Sentry、Bugsnag 等错误监控服务
    console.warn('Critical error reported:', errorInfo);
  }

  /**
   * 获取错误代码
   */
  private getErrorCode(error: any): string {
    if (error?.response?.status) {
      const status = error.response.status;
      if (status >= 500) return 'SERVER_ERROR';
      if (status === 429) return 'RATE_LIMIT_ERROR';
      if (status === 401) return 'AUTH_ERROR';
      if (status === 400) return 'VALIDATION_ERROR';
      if (status >= 400) return 'API_ERROR';
    }
    
    if (error?.code === 'NETWORK_ERROR') return 'NETWORK_ERROR';
    if (error?.name === 'TimeoutError') return 'TIMEOUT_ERROR';
    
    return 'UNKNOWN_ERROR';
  }

  /**
   * 获取错误消息
   */
  private getErrorMessage(error: any): string {
    if (error?.response?.data?.message) {
      return error.response.data.message;
    }
    if (error?.message) {
      return error.message;
    }
    return '未知错误';
  }

  /**
   * 获取网络错误消息
   */
  private getNetworkErrorMessage(error: any): string {
    if (error?.code === 'NETWORK_ERROR') {
      return '网络连接失败';
    }
    if (error?.name === 'TimeoutError') {
      return '请求超时';
    }
    return '网络异常';
  }

  /**
   * 获取验证错误消息
   */
  private getValidationErrorMessage(error: any): string {
    if (error?.response?.data?.detail) {
      return Array.isArray(error.response.data.detail) 
        ? error.response.data.detail.map((d: any) => d.msg).join(', ')
        : error.response.data.detail;
    }
    return '输入验证失败';
  }

  /**
   * 获取错误严重程度
   */
  private getErrorSeverity(error: any): 'low' | 'medium' | 'high' | 'critical' {
    if (error?.response?.status >= 500) return 'critical';
    if (error?.response?.status >= 400) return 'high';
    if (error?.code === 'NETWORK_ERROR') return 'high';
    return 'medium';
  }

  /**
   * 获取错误统计
   */
  getErrorStats(): {
    total: number;
    bySeverity: Record<string, number>;
    byCategory: Record<string, number>;
    recent: ErrorInfo[];
  } {
    const bySeverity = this.errorLog.reduce((acc, error) => {
      acc[error.severity] = (acc[error.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byCategory = this.errorLog.reduce((acc, error) => {
      acc[error.category] = (acc[error.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: this.errorLog.length,
      bySeverity,
      byCategory,
      recent: this.errorLog.slice(-10)
    };
  }

  /**
   * 清除错误日志
   */
  clearLogs(): void {
    this.errorLog = [];
  }
}

// 导出单例实例
export const errorHandler = ErrorHandler.getInstance();

// 导出便捷方法
export const handleApiError = (error: any, context?: Record<string, any>) => 
  errorHandler.handleApiError(error, context);

export const handleNetworkError = (error: any, context?: Record<string, any>) => 
  errorHandler.handleNetworkError(error, context);

export const handleValidationError = (error: any, context?: Record<string, any>) => 
  errorHandler.handleValidationError(error, context);

export const getUserFriendlyMessage = (errorInfo: ErrorInfo) => 
  errorHandler.getUserFriendlyMessage(errorInfo);
