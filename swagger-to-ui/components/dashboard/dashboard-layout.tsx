"use client"

import { useCallback, useState } from "react"
import { SidebarNav } from "@/components/dashboard/sidebar-nav"
import { Header } from "@/components/dashboard/header"

interface DashboardLayoutProps {
  title: string
  description?: string
  children: React.ReactNode
}

export function DashboardLayout({
  title,
  description,
  children,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const handleClose = useCallback(() => setSidebarOpen(false), [])
  const handleMenuClick = useCallback(
    () => setSidebarOpen((prev) => !prev),
    []
  )

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <SidebarNav open={sidebarOpen} onClose={handleClose} />
      <div className="md:pl-64">
        <Header
          title={title}
          description={description}
          menuOpen={sidebarOpen}
          onMenuClick={handleMenuClick}
        />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
