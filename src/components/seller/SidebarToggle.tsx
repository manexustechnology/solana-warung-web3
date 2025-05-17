
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useSidebar from '@/hooks/use-sidebar';

const SidebarToggle = () => {
  const { isCollapsed, toggleCollapse } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute -right-4 top-6 h-8 w-8 rounded-full border bg-background shadow-md hover:shadow-lg z-10"
      onClick={toggleCollapse}
      aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
    >
      {isCollapsed ? (
        <ChevronRight className="h-4 w-4" />
      ) : (
        <ChevronLeft className="h-4 w-4" />
      )}
    </Button>
  );
};

export default SidebarToggle;
