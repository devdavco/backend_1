"use client"

import useSWR from "swr"
import { Users, Building2, CalendarDays, CheckCircle2, Clock, XCircle } from "lucide-react"
import { SidebarNav } from "@/components/dashboard/sidebar-nav"
import { Header } from "@/components/dashboard/header"
import { StatCard } from "@/components/dashboard/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  usuarioApi,
  espacioApi,
  reservaApi,
  Usuario,
  Espacio,
  Reserva,
} from "@/lib/api"
import { format } from "date-fns"
import { es } from "date-fns/locale"

// Demo data
const demoUsuarios: Usuario[] = [
  { id: 1, nombre: "María García", email: "maria.garcia@email.com", rol: "admin" },
  { id: 2, nombre: "Carlos López", email: "carlos.lopez@email.com", rol: "usuario" },
  { id: 3, nombre: "Ana Martínez", email: "ana.martinez@email.com", rol: "usuario" },
]

const demoEspacios: Espacio[] = [
  { id: 1, nombre: "Sala de Reuniones A", tipo: "sala_reunion", capacidad: 10, minutos_limpieza: 15 },
  { id: 2, nombre: "Sala de Reuniones B", tipo: "sala_reunion", capacidad: 6, minutos_limpieza: 10 },
  { id: 3, nombre: "Auditorio Principal", tipo: "auditorio", capacidad: 100, minutos_limpieza: 30 },
]

const demoReservas: Reserva[] = [
  {
    id: 1,
    usuarioId: 1,
    espacioId: 1,
    horaInicio: "2026-05-26T09:00:00",
    horaFinUsuario: "2026-05-26T10:00:00",
    horaFinTotal: "2026-05-26T10:15:00",
    estado: "confirmada",
    version: 1,
  },
  {
    id: 2,
    usuarioId: 2,
    espacioId: 2,
    horaInicio: "2026-05-26T11:00:00",
    horaFinUsuario: "2026-05-26T12:30:00",
    horaFinTotal: "2026-05-26T12:40:00",
    estado: "pendiente",
    version: 1,
  },
  {
    id: 3,
    usuarioId: 3,
    espacioId: 3,
    horaInicio: "2026-05-27T14:00:00",
    horaFinUsuario: "2026-05-27T16:00:00",
    horaFinTotal: "2026-05-27T16:30:00",
    estado: "confirmada",
    version: 1,
  },
]

export default function DashboardPage() {
  const { data: usuarios } = useSWR<Usuario[]>(
    "usuarios",
    () => usuarioApi.getAll().catch(() => demoUsuarios),
    { fallbackData: demoUsuarios }
  )

  const { data: espacios } = useSWR<Espacio[]>(
    "espacios",
    () => espacioApi.getAll().catch(() => demoEspacios),
    { fallbackData: demoEspacios }
  )

  const { data: reservas } = useSWR<Reserva[]>(
    "reservas",
    () => reservaApi.getAll().catch(() => demoReservas),
    { fallbackData: demoReservas }
  )

  const confirmadasCount = reservas?.filter((r) => r.estado === "confirmada").length || 0
  const pendientesCount = reservas?.filter((r) => r.estado === "pendiente").length || 0
  const canceladasCount = reservas?.filter((r) => r.estado === "cancelada").length || 0

  const getUsuarioName = (id: number) => {
    return usuarios?.find((u) => u.id === id)?.nombre || `Usuario ${id}`
  }

  const getEspacioName = (id: number) => {
    return espacios?.find((e) => e.id === id)?.nombre || `Espacio ${id}`
  }

  const formatDateTime = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMM, HH:mm", { locale: es })
    } catch {
      return dateString
    }
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado.toLowerCase()) {
      case "confirmada":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Confirmada
          </Badge>
        )
      case "pendiente":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="mr-1 h-3 w-3" />
            Pendiente
          </Badge>
        )
      case "cancelada":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="mr-1 h-3 w-3" />
            Cancelada
          </Badge>
        )
      default:
        return <Badge variant="outline">{estado}</Badge>
    }
  }

  const recentReservas = reservas?.slice(0, 5) || []

  return (
    <div className="min-h-screen bg-background">
      <SidebarNav />
      <div className="pl-64">
        <Header
          title="Dashboard"
          description="Resumen general del sistema de reservas"
        />
        <main className="p-6">
          {/* Stats Grid */}
          <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Usuarios"
              value={usuarios?.length || 0}
              icon={Users}
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard
              title="Espacios Disponibles"
              value={espacios?.length || 0}
              icon={Building2}
            />
            <StatCard
              title="Reservas Activas"
              value={confirmadasCount}
              icon={CalendarDays}
              description={`${pendientesCount} pendientes`}
            />
            <StatCard
              title="Tasa de Ocupación"
              value="78%"
              icon={CheckCircle2}
              trend={{ value: 5, isPositive: true }}
            />
          </div>

          {/* Content Grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Recent Reservations */}
            <Card>
              <CardHeader>
                <CardTitle>Reservas Recientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReservas.map((reserva) => (
                    <div
                      key={reserva.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <CalendarDays className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {getEspacioName(reserva.espacioId)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {getUsuarioName(reserva.usuarioId)} •{" "}
                            {formatDateTime(reserva.horaInicio)}
                          </p>
                        </div>
                      </div>
                      {getEstadoBadge(reserva.estado)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Status Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Estado de Reservas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg bg-green-50 p-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800">Confirmadas</span>
                    </div>
                    <span className="text-2xl font-bold text-green-800">
                      {confirmadasCount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-yellow-50 p-4">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-yellow-600" />
                      <span className="font-medium text-yellow-800">Pendientes</span>
                    </div>
                    <span className="text-2xl font-bold text-yellow-800">
                      {pendientesCount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-red-50 p-4">
                    <div className="flex items-center gap-3">
                      <XCircle className="h-5 w-5 text-red-600" />
                      <span className="font-medium text-red-800">Canceladas</span>
                    </div>
                    <span className="text-2xl font-bold text-red-800">
                      {canceladasCount}
                    </span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-lg border p-4 text-center">
                    <p className="text-sm text-muted-foreground">Espacios más usados</p>
                    <p className="mt-1 font-semibold">Sala Reuniones A</p>
                  </div>
                  <div className="rounded-lg border p-4 text-center">
                    <p className="text-sm text-muted-foreground">Usuario más activo</p>
                    <p className="mt-1 font-semibold">María García</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
