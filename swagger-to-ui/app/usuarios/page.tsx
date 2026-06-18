import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { UsuariosTable } from "@/components/usuarios/usuarios-table"

export default function UsuariosPage() {
  return (
    <DashboardLayout
      title="Usuarios"
      description="Gestiona los usuarios del sistema"
    >
      <UsuariosTable />
    </DashboardLayout>
  )
}
