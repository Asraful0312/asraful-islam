import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full ">
        <SidebarTrigger />

        <div className="px-6 w-full mb-7">{children}</div>
      </div>
    </SidebarProvider>
  );
}
