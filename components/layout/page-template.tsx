import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import React, { ReactNode } from 'react';

interface PageTemplateProps {
  title: string;
  subtitle?: string;
  description?: string;
  breadcrumbs?: Array<{ label?: string; title?: string; href?: string; path?: string }>;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

const PageTemplate: React.FC<PageTemplateProps> = ({
  title,
  subtitle,
  breadcrumbs = [],
  actions,
  children,
  className = '',
}) => {
  return (
    <div className={`flex flex-col min-h-screen ${className}`}>
      <div className="flex flex-col gap-4 p-4 sm:p-6">
        {/* Header with breadcrumbs and title */}
        <div className="flex flex-col gap-2">
          {breadcrumbs.length > 0 && (
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) =>
                  (breadcrumb.href || breadcrumb.path) ? (
                    <BreadcrumbItem key={index}>
                      <BreadcrumbLink href={breadcrumb.href || breadcrumb.path}>
                        {breadcrumb.label || breadcrumb.title}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  ) : (
                    <BreadcrumbItem key={index}>
                      <BreadcrumbPage className="text-muted-foreground">
                        {breadcrumb.label || breadcrumb.title}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  )
                )}
              </BreadcrumbList>
            </Breadcrumb>
          )}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
              {subtitle && (
                <p className="text-muted-foreground">{subtitle}</p>
              )}
            </div>
            {actions && <div className="flex gap-2">{actions}</div>}
          </div>
        </div>

        <Separator />

        {/* Main content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export { PageTemplate };
export default PageTemplate;
