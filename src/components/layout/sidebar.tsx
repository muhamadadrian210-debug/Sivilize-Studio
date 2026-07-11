'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  LayoutTemplate,
  Palette,
  Settings,
  Building2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const menuItems = [
  { name: 'Beranda', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Dokumen', icon: FileText, href: '/dashboard/documents' },
  { name: 'Template', icon: LayoutTemplate, href: '/dashboard/templates' },
  { name: 'Brand Kit', icon: Palette, href: '/dashboard/company' },
  { name: 'Pengaturan', icon: Settings, href: '/dashboard/team' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="bg-sidebar border-sidebar-border hidden h-screen w-64 flex-shrink-0 flex-col border-r md:flex">
      {/* Workspace / Company Selector Mock */}
      <div className="border-sidebar-border flex h-16 items-center border-b px-6">
        <div className="flex w-full items-center gap-3">
          <div className="bg-primary/20 border-primary/30 flex h-8 w-8 items-center justify-center rounded-md border">
            <Building2 className="text-primary h-4 w-4" />
          </div>
          <div className="flex flex-1 flex-col overflow-hidden">
            <span className="text-sidebar-foreground truncate text-sm font-bold">
              Sivilize Teknologi
            </span>
            <span className="text-muted-foreground truncate text-xs">
              Free Plan
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
      </div>

      {/* Footer / User Profile Mock */}
      <div className="border-sidebar-border border-t p-4">
        <div className="hover:bg-sidebar-accent/50 flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 transition-colors">
          <div className="bg-muted border-border flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border">
            {/* Fallback avatar */}
            <span className="text-muted-foreground text-xs font-bold">CTO</span>
          </div>
          <div className="flex flex-1 flex-col overflow-hidden">
            <span className="text-sidebar-foreground truncate text-sm font-medium">
              Bos Besar
            </span>
            <span className="text-muted-foreground truncate text-xs">
              bos@sivilize.com
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}
