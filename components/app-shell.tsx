"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import Link from "next/link";
import { api } from "./../convex/_generated/api";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const currentUser = useQuery(api.auth.loggedInUser);

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL!;

  return (
    <>
      <Authenticated>
        {adminEmail === currentUser?.email ? (
          <SidebarProvider>
            <AppSidebar />
            <div className="w-full ">
              <SidebarTrigger />

              <div className="px-6 w-full mb-7">{children}</div>
            </div>
          </SidebarProvider>
        ) : (
          <p className="text-lg text-center mt-20 text-white">
            You cannot access this page!
          </p>
        )}
      </Authenticated>
      <Unauthenticated>
        <div className="flex items-center justify-center h-full">
          <Link
            href="/signin"
            className="text-white text-lg font-bold underline mt-20"
          >
            Please login to access this page
          </Link>
        </div>
      </Unauthenticated>
    </>
  );
}
