import { SidebarNav } from "@/components/dashboard/sidebar-nav"
import { Header } from "@/components/dashboard/header"
import { UsuariosTable } from "@/components/usuarios/usuarios-table"

export default function UsuariosPage() {
  return (
    <div className="min-h-screen bg-background">
      <SidebarNav />
      <div className="pl-64">
        <Header
          title="Usuarios"
          description="Gestiona los usuarios del sistema"
        />
        <main className="p-6">
          <UsuariosTable />
        </main>
      </div>
    </div>
  )
}
