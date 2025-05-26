'use client';
import { AppSidebar } from '@/components/common/Sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import Breadcrumb from '@/components/common/Breadcrumb';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const RootLayoutWithSidebar = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isFleetMap = pathname.includes('/fleet/map');

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="max-w-[calc(100vw - 40px)] w-full overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-background z-10">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <Breadcrumb />
          </div>
          <ThemeSwitcher />
        </div>
        <div
          className={cn('p-4', {
            'p-0': isFleetMap,
          })}
        >
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default RootLayoutWithSidebar;
