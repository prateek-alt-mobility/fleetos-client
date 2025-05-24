import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import Breadcrumb from '@/components/common/Breadcrumb';

const RootLayoutWithSidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-background z-10">
          <Breadcrumb />
          <SidebarTrigger />
        </div>
        <div className="p-4 w-full">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default RootLayoutWithSidebar;
