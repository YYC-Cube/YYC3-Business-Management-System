import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number | { value: number; type: string; text: string };
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon?: React.ReactNode;
  trend?: Array<number>;
  tooltip?: string;
  description?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  trend,
  tooltip,
  className = '',
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'increase':
        return 'text-green-500';
      case 'decrease':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case 'increase':
        return '↑';
      case 'decrease':
        return '↓';
      default:
        return '→';
    }
  };

  return (
    <TooltipProvider>
      <Card className={`overflow-hidden transition-all hover:shadow-md ${className}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
                {tooltip && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help text-muted-foreground hover:text-foreground">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="16" x2="12" y2="12" />
                          <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>{tooltip}</TooltipContent>
                  </Tooltip>
                )}
              </div>
              <div className="text-3xl font-bold">{value}</div>
            </div>
            {icon && (
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                {icon}
              </div>
            )}
          </div>
          {change !== undefined && (
            <div className="flex items-center gap-1 text-sm">
              <span className={getChangeColor()}>{getChangeIcon()}</span>
              <span className={getChangeColor()}>
                {typeof change === 'object' ? `${change.value}%` : `${Math.abs(change)}%`}
              </span>
              <span className="text-muted-foreground">
                {typeof change === 'object' ? change.text : 'vs previous period'}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

const StatCardGroup: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {children}
    </div>
  );
};

export { StatCard, StatCardGroup };
export default StatCard;
