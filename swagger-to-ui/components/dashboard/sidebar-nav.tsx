"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Users,
  Building2,
  CalendarDays,
  LayoutDashboard,
  Settings,
} from "lucide-react"

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Usuarios",
    href: "/usuarios",
    icon: Users,
  },
  {
    title: "Espacios",
    href: "/espacios",
    icon: Building2,
  },
  {
    title: "Reservas",
    href: "/reservas",
    icon: CalendarDays,
  },
]

interface SidebarNavProps {
  open: boolean
  onClose: () => void
}

export function SidebarNav({ open, onClose }: SidebarNavProps) {
  const pathname = usePathname()
  const isMobile = useIsMobile()

  // Cerrar solo al cambiar de ruta (navegación), no en cada re-render del padre
  useEffect(() => {
    onClose()
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }

    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  return (
    <>
      {/* Overlay — solo móvil */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-border bg-card transition-transform duration-300 ease-in-out md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
        aria-label="Navegación principal"
        aria-hidden={isMobile && !open ? true : undefined}
        inert={isMobile && !open ? true : undefined}
      >
        <div className="flex h-16 shrink-0 items-center border-b border-border px-4 md:px-6">
          <CalendarDays className="mr-2 h-6 w-6 text-primary" />
          <span className="text-lg font-semibold text-foreground md:text-xl">
            Reservas App
          </span>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors touch-manipulation",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {item.title}
              </Link>
            )
          })}
        </nav>

        <div className="shrink-0 border-t border-border p-4">
          <Link
            href="/configuracion"
            className="flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors touch-manipulation hover:bg-accent hover:text-accent-foreground"
          >
            <Settings className="h-5 w-5 shrink-0" />
            Configuración
          </Link>
        </div>
      </aside>
    </>
  )
}
