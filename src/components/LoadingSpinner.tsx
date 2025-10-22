/**
 * 生产级别加载组件
 * 提供多种加载状态和动画效果
 */
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'primary' | 'secondary' | 'muted';
  text?: string;
  className?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'default',
  text,
  className,
  fullScreen = false,
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  };

  const variantClasses = {
    default: 'text-primary',
    primary: 'text-primary',
    secondary: 'text-secondary-foreground',
    muted: 'text-muted-foreground',
  };

  const spinner = (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <div className="relative">
        {/* 主旋转圆环 */}
        <div
          className={cn(
            'animate-spin rounded-full border-2 border-current border-t-transparent',
            sizeClasses[size],
            variantClasses[variant]
          )}
        />
        
        {/* 内层旋转圆环（可选） */}
        {size === 'lg' || size === 'xl' ? (
          <div
            className={cn(
              'absolute inset-1 animate-spin rounded-full border border-current border-r-transparent opacity-50',
              variantClasses[variant]
            )}
            style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}
          />
        ) : null}
      </div>
      
      {text && (
        <p className={cn('text-sm animate-pulse', variantClasses[variant])}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-card p-8 rounded-lg shadow-lg border">
          {spinner}
        </div>
      </div>
    );
  }

  return spinner;
};

/**
 * 页面加载组件
 */
export const PageLoader: React.FC<{ text?: string }> = ({ text = '加载中...' }) => (
  <LoadingSpinner size="xl" text={text} fullScreen />
);

/**
 * 按钮加载组件
 */
export const ButtonLoader: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'sm' }) => (
  <LoadingSpinner size={size} variant="secondary" />
);

/**
 * 内联加载组件
 */
export const InlineLoader: React.FC<{ text?: string }> = ({ text }) => (
  <LoadingSpinner size="sm" variant="muted" text={text} />
);

/**
 * 骨架屏加载组件
 */
export const SkeletonLoader: React.FC<{
  lines?: number;
  className?: string;
}> = ({ lines = 3, className }) => (
  <div className={cn('space-y-3', className)}>
    {Array.from({ length: lines }).map((_, index) => (
      <div
        key={index}
        className="h-4 bg-muted rounded animate-pulse"
        style={{
          width: `${Math.random() * 40 + 60}%`,
          animationDelay: `${index * 0.1}s`,
        }}
      />
    ))}
  </div>
);

/**
 * 卡片骨架屏
 */
export const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('p-6 space-y-4', className)}>
    <div className="flex items-center space-x-4">
      <div className="h-12 w-12 bg-muted rounded animate-pulse" />
      <div className="space-y-2 flex-1">
        <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
        <div className="h-3 bg-muted rounded w-1/2 animate-pulse" />
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-muted rounded animate-pulse" />
      <div className="h-3 bg-muted rounded w-5/6 animate-pulse" />
    </div>
    <div className="flex space-x-2">
      <div className="h-6 bg-muted rounded w-16 animate-pulse" />
      <div className="h-6 bg-muted rounded w-20 animate-pulse" />
    </div>
  </div>
);

export default LoadingSpinner;
