/**
 * 性能监控工具
 * 用于监控API请求性能、用户体验指标等
 */

export interface PerformanceMetrics {
  url: string;
  method: string;
  startTime: number;
  endTime: number;
  duration: number;
  success: boolean;
  error?: string;
  timestamp: number;
}

export interface UserExperienceMetrics {
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  timestamp: number;
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetrics[] = [];
  private maxMetricsSize = 1000;

  private constructor() {
    this.initializeWebVitals();
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  /**
   * 记录API请求性能指标
   */
  recordApiRequest(
    url: string,
    method: string,
    startTime: number,
    endTime: number,
    success: boolean,
    error?: string
  ): void {
    const metric: PerformanceMetrics = {
      url,
      method,
      startTime,
      endTime,
      duration: endTime - startTime,
      success,
      error,
      timestamp: Date.now()
    };

    this.metrics.push(metric);

    // 保持指标数量限制
    if (this.metrics.length > this.maxMetricsSize) {
      this.metrics = this.metrics.slice(-this.maxMetricsSize);
    }

    // 在开发环境下打印性能指标
    if (process.env.NODE_ENV === 'development') {
      console.log('API Performance:', metric);
    }
  }

  /**
   * 获取性能统计信息
   */
  getPerformanceStats(): {
    totalRequests: number;
    averageResponseTime: number;
    successRate: number;
    errorRate: number;
    slowestRequests: PerformanceMetrics[];
    recentRequests: PerformanceMetrics[];
  } {
    const totalRequests = this.metrics.length;
    const successfulRequests = this.metrics.filter(m => m.success).length;
    const averageResponseTime = totalRequests > 0 
      ? this.metrics.reduce((sum, m) => sum + m.duration, 0) / totalRequests 
      : 0;
    const successRate = totalRequests > 0 ? (successfulRequests / totalRequests) * 100 : 0;
    const errorRate = 100 - successRate;

    // 获取最慢的5个请求
    const slowestRequests = [...this.metrics]
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 5);

    // 获取最近的10个请求
    const recentRequests = this.metrics.slice(-10).reverse();

    return {
      totalRequests,
      averageResponseTime,
      successRate,
      errorRate,
      slowestRequests,
      recentRequests
    };
  }

  /**
   * 清除性能指标
   */
  clearMetrics(): void {
    this.metrics = [];
  }

  /**
   * 初始化Web Vitals监控
   */
  private initializeWebVitals(): void {
    if (typeof window === 'undefined') return;

    // 监控页面加载时间
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      this.recordPageLoadTime(loadTime);
    });

    // 监控First Contentful Paint
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              this.recordFirstContentfulPaint(entry.startTime);
            }
          }
        });
        observer.observe({ entryTypes: ['paint'] });
      } catch (error) {
        console.warn('Failed to initialize PerformanceObserver:', error);
      }
    }
  }

  /**
   * 记录页面加载时间
   */
  private recordPageLoadTime(loadTime: number): void {
    if (process.env.NODE_ENV === 'development') {
      console.log('Page Load Time:', loadTime);
    }
  }

  /**
   * 记录First Contentful Paint时间
   */
  private recordFirstContentfulPaint(fcpTime: number): void {
    if (process.env.NODE_ENV === 'development') {
      console.log('First Contentful Paint:', fcpTime);
    }
  }

  /**
   * 导出性能数据
   */
  exportMetrics(): PerformanceMetrics[] {
    return [...this.metrics];
  }
}

// 导出单例实例
export const performanceMonitor = PerformanceMonitor.getInstance();

// 导出便捷方法
export const recordApiRequest = (
  url: string,
  method: string,
  startTime: number,
  endTime: number,
  success: boolean,
  error?: string
) => performanceMonitor.recordApiRequest(url, method, startTime, endTime, success, error);

export const getPerformanceStats = () => performanceMonitor.getPerformanceStats();

export const clearMetrics = () => performanceMonitor.clearMetrics();

export const exportMetrics = () => performanceMonitor.exportMetrics();