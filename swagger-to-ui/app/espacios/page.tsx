import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { EspaciosTable } from "@/components/espacios/espacios-table"

export default function EspaciosPage() {
  return (
    <DashboardLayout
      title="Espacios"
      description="Gestiona los espacios reservables"
    >
      <EspaciosTable />
    </DashboardLayout>
  )
}
