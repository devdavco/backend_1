"use client";

import useSWR from "swr";
import { Users, Building2, CalendarClock, CheckCircle } from "lucide-react";
import { StatCard, Card } from "@/components/ui/card";
import { usuarioApi, espacioApi, reservaApi } from "@/lib/api";
import { DataTable } from "@/components/ui/table";
import type { Reserva } from "@/lib/types";

export default function DashboardPage() {
  const { data: usuarios, isLoading: loadingUsuarios } = useSWR(
    "usuarios",
    usuarioApi.getAll
  );
  const { data: espacios, isLoading: loadingEspacios } = useSWR(
    "espacios",
    espacioApi.getAll
  );
  const { data: reservas, isLoading: loadingReservas } = useSWR(
    "reservas",
    reservaApi.getAll
  );

  const isLoading = loadingUsuarios || loadingEspacios || loadingReservas;

  const reservasActivas =
    reservas?.filter((r) => r.estado?.toLowerCase() === "activa") || [];

  const recentReservas = reservas?.slice(0, 5) || [];

  const reservaColumns = [
    { key: "id" as const, header: "ID" },
    { key: "usuarioId" as const, header: "Usuario ID" },
    { key: "espacioId" as const, header: "Espacio ID" },
    {
      key: "horaInicio",
      header: "Inicio",
      render: (item: Reserva) =>
        item.horaInicio
          ? new Date(item.horaInicio).toLocaleString("es-ES", {
              dateStyle: "short",
              timeStyle: "short",
            })
          : "-",
    },
    {
      key: "estado",
      header: "Estado",
      render: (item: Reserva) => (
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
            item.estado?.toLowerCase() === "activa"
              ? "bg-success/20 text-success"
              : item.estado?.toLowerCase() === "cancelada"
                ? "bg-destructive/20 text-destructive"
                : "bg-warning/20 text-warning"
          }`}
        >
          {item.estado || "Pendiente"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Bienvenido al panel de administracion de CoWork
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Usuarios"
          value={isLoading ? "-" : usuarios?.length || 0}
          icon={<Users className="h-5 w-5" />}
          description="Usuarios registrados"
        />
        <StatCard
          title="Total Espacios"
          value={isLoading ? "-" : espacios?.length || 0}
          icon={<Building2 className="h-5 w-5" />}
          description="Espacios disponibles"
        />
        <StatCard
          title="Total Reservas"
          value={isLoading ? "-" : reservas?.length || 0}
          icon={<CalendarClock className="h-5 w-5" />}
          description="Reservas totales"
        />
        <StatCard
          title="Reservas Activas"
          value={isLoading ? "-" : reservasActivas.length}
          icon={<CheckCircle className="h-5 w-5" />}
          description="En curso ahora"
        />
      </div>

      <Card>
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Reservas Recientes
        </h2>
        <DataTable
          columns={reservaColumns}
          data={recentReservas}
          isLoading={loadingReservas}
          emptyMessage="No hay reservas recientes"
        />
      </Card>
    </div>
  );
}
