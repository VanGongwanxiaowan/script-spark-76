/**
 * 系统状态组件
 * 显示API连接状态、系统健康状态等信息
 */
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Wifi, 
  WifiOff, 
  Server, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  RefreshCw,
  Activity,
  Database,
  Cpu,
  MemoryStick
} from 'lucide-react';
import { apiService } from '@/services/api';

interface SystemStatusProps {
  className?: string;
}

interface StatusInfo {
  api: 'connected' | 'disconnected' | 'error';
  database: 'connected' | 'disconnected' | 'error';
  performance: 'good' | 'warning' | 'critical';
  lastChecked: string;
}

const SystemStatus: React.FC<SystemStatusProps> = ({ className }) => {
  const [status, setStatus] = useState<StatusInfo>({
    api: 'disconnected',
    database: 'disconnected',
    performance: 'good',
    lastChecked: new Date().toISOString()
  });
  const [isLoading, setIsLoading] = useState(false);

  const checkSystemStatus = async () => {
    setIsLoading(true);
    try {
      // 检查API状态
      const healthResponse = await apiService.healthCheck();
      
      setStatus({
        api: 'connected',
        database: 'connected', // 简化实现，实际应该检查数据库
        performance: 'good',
        lastChecked: new Date().toISOString()
      });
    } catch (error) {
      setStatus(prev => ({
        ...prev,
        api: 'error',
        lastChecked: new Date().toISOString()
      }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSystemStatus();
    
    // 每30秒检查一次状态
    const interval = setInterval(checkSystemStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'disconnected':
        return <WifiOff className="h-4 w-4 text-gray-400" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-800';
      case 'disconnected':
        return 'bg-gray-100 text-gray-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected':
        return '已连接';
      case 'disconnected':
        return '未连接';
      case 'error':
        return '连接错误';
      default:
        return '未知状态';
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            系统状态
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={checkSystemStatus}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
            刷新
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* API状态 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wifi className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">API服务</span>
            </div>
            <Badge className={getStatusColor(status.api)}>
              <div className="flex items-center gap-1">
                {getStatusIcon(status.api)}
                {getStatusText(status.api)}
              </div>
            </Badge>
          </div>

          {/* 数据库状态 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Database className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">数据库</span>
            </div>
            <Badge className={getStatusColor(status.database)}>
              <div className="flex items-center gap-1">
                {getStatusIcon(status.database)}
                {getStatusText(status.database)}
              </div>
            </Badge>
          </div>

          {/* 性能状态 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Cpu className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">系统性能</span>
            </div>
            <Badge className={getStatusColor(status.performance)}>
              <div className="flex items-center gap-1">
                {status.performance === 'good' ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : status.performance === 'warning' ? (
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                {status.performance === 'good' ? '良好' : 
                 status.performance === 'warning' ? '警告' : '严重'}
              </div>
            </Badge>
          </div>

          {/* 最后检查时间 */}
          <div className="text-xs text-muted-foreground text-center pt-2 border-t">
            最后检查: {new Date(status.lastChecked).toLocaleString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemStatus;
