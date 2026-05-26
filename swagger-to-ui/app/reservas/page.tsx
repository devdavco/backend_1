import { SidebarNav } from "@/components/dashboard/sidebar-nav"
import { Header } from "@/components/dashboard/header"
import { ReservasTable } from "@/components/reservas/reservas-table"

export default function ReservasPage() {
  return (
    <div className="min-h-screen bg-background">
      <SidebarNav />
      <div className="pl-64">
        <Header
          title="Reservas"
          description="Gestiona las reservas de espacios"
        />
        <main className="p-6">
          <ReservasTable />
        </main>
      </div>
    </div>
  )
}
