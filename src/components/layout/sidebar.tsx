"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, LayoutTemplate, Palette, Settings, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Beranda", icon: LayoutDashboard, href: "/" },
  { name: "Dokumen", icon: FileText, href: "/dokumen" },
  { name: "Template", icon: LayoutTemplate, href: "/template" },
  { name: "Brand Kit", icon: Palette, href: "/brand" },
  { name: "Pengaturan", icon: Settings, href: "/pengaturan" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-sidebar border-r border-sidebar-border hidden md:flex flex-col flex-shrink-0">
      {/* Workspace / Company Selector Mock */}
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3 w-full">
          <div className="w-8 h-8 rounded-md bg-primary/20 flex items-center justify-center border border-primary/30">
            <Building2 className="w-4 h-4 text-primary" />
          </div>
          <div className="flex flex-col flex-1 overflow-hidden">
            <span className="text-sm font-bold text-sidebar-foreground truncate">Sivilize Teknologi</span>
            <span className="text-xs text-muted-foreground truncate">Free Plan</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                  : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* Footer / User Profile Mock */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-sidebar-accent/50 cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden border border-border">
            {/* Fallback avatar */}
            <span className="text-xs font-bold text-muted-foreground">CTO</span>
          </div>
          <div className="flex flex-col flex-1 overflow-hidden">
            <span className="text-sm font-medium text-sidebar-foreground truncate">Bos Besar</span>
            <span className="text-xs text-muted-foreground truncate">bos@sivilize.com</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
