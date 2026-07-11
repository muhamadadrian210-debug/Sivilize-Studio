'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  LayoutTemplate,
  Palette,
  Settings,
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
      {/* Workspace / Company Selector */}
      <div className="border-sidebar-border flex h-16 items-center border-b px-6">
        <div className="flex w-full items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-violet-500/30 bg-white shadow-[0_0_12px_rgba(139,92,246,0.25)]">
            <Image
              src="/logo.jpg"
              alt="Sivilize Logo"
              width={40}
              height={40}
              unoptimized
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex flex-1 flex-col overflow-hidden">
            <span className="text-sidebar-foreground truncate text-sm font-bold">
              Sivilize Teknologi
            </span>
            <span className="truncate text-xs text-violet-400/70">
              Free Plan
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                isActive
                  ? 'bg-violet-500/10 text-violet-300 shadow-[inset_0_0_0_1px_rgba(139,92,246,0.2)]'
                  : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              )}
            >
              <item.icon
                className={cn('h-4 w-4', isActive && 'text-violet-400')}
              />
              {item.name}
            </Link>
          )
        })}
      </div>

      {/* Footer / User Profile */}
      <div className="border-sidebar-border border-t p-4">
        <div className="hover:bg-sidebar-accent/50 flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2 transition-colors">
          <div className="bg-muted border-border flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border">
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
