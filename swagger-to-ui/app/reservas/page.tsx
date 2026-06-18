import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ReservasTable } from "@/components/reservas/reservas-table"

export default function ReservasPage() {
  return (
    <DashboardLayout
      title="Reservas"
      description="Gestiona las reservas de espacios"
    >
      <ReservasTable />
    </DashboardLayout>
  )
}
