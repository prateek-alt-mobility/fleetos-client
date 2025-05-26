import { AppSidebar } from '@/components/common/Sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import Breadcrumb from '@/components/common/Breadcrumb';

const RootLayoutWithSidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="max-w-[calc(100vw - 40px)] w-full overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-background z-10">
          <Breadcrumb />
          <SidebarTrigger />
        </div>
        <div className="p-4">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default RootLayoutWithSidebar;
