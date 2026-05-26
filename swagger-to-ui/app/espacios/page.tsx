import { SidebarNav } from "@/components/dashboard/sidebar-nav"
import { Header } from "@/components/dashboard/header"
import { EspaciosTable } from "@/components/espacios/espacios-table"

export default function EspaciosPage() {
  return (
    <div className="min-h-screen bg-background">
      <SidebarNav />
      <div className="pl-64">
        <Header
          title="Espacios"
          description="Gestiona los espacios reservables"
        />
        <main className="p-6">
          <EspaciosTable />
        </main>
      </div>
    </div>
  )
}
