"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import { Plus, Trash2, Edit2, CalendarClock, User, Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/table";
import { Modal } from "@/components/ui/modal";
import { Input, Select } from "@/components/ui/input";
import { reservaApi, usuarioApi, espacioApi } from "@/lib/api";
import type { Reserva, CreateReservaRequest } from "@/lib/types";

export default function ReservasPage() {
  const { data: reservas, isLoading } = useSWR("reservas", reservaApi.getAll);
  const { data: usuarios } = useSWR("usuarios", usuarioApi.getAll);
  const { data: espacios } = useSWR("espacios", espacioApi.getAll);
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState<Reserva | null>(null);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  
  const [formData, setFormData] = useState<CreateReservaRequest>({
    usuarioId: 0,
    espacioId: 0,
    horaInicio: "",
    horaFinUsuario: "",
    horaFinTotal: "",
    estado: "pendiente",
    version: 1,
  });
  
  const [editEstado, setEditEstado] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await reservaApi.create({
        ...formData,
        horaInicio: new Date(formData.horaInicio).toISOString(),
        horaFinUsuario: new Date(formData.horaFinUsuario).toISOString(),
        horaFinTotal: new Date(formData.horaFinTotal).toISOString(),
      });
      await mutate("reservas");
      setIsCreateModalOpen(false);
      setFormData({
        usuarioId: 0,
        espacioId: 0,
        horaInicio: "",
        horaFinUsuario: "",
        horaFinTotal: "",
        estado: "pendiente",
        version: 1,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear reserva");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReserva) return;
    
    setIsSubmitting(true);
    setError(null);

    try {
      await reservaApi.update(selectedReserva.id, {
        id: selectedReserva.id,
        estado: editEstado,
      });
      await mutate("reservas");
      setIsEditModalOpen(false);
      setSelectedReserva(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al actualizar reserva");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estas seguro de eliminar esta reserva?")) return;

    setIsDeleting(id);
    try {
      await reservaApi.delete(id);
      await mutate("reservas");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error al eliminar reserva");
    } finally {
      setIsDeleting(null);
    }
  };

  const openEditModal = (reserva: Reserva) => {
    setSelectedReserva(reserva);
    setEditEstado(reserva.estado || "pendiente");
    setError(null);
    setIsEditModalOpen(true);
  };

  const getEstadoColor = (estado: string) => {
    switch (estado?.toLowerCase()) {
      case "activa":
        return "bg-success/20 text-success";
      case "completada":
        return "bg-primary/20 text-primary";
      case "cancelada":
        return "bg-destructive/20 text-destructive";
      default:
        return "bg-warning/20 text-warning";
    }
  };

  const getUsuarioNombre = (id: number) => {
    const usuario = usuarios?.find((u) => u.id === id);
    return usuario?.nombre || `Usuario ${id}`;
  };

  const getEspacioNombre = (id: number) => {
    const espacio = espacios?.find((e) => e.id === id);
    return espacio?.nombre || `Espacio ${id}`;
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("es-ES", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  const columns = [
    { key: "id" as const, header: "ID" },
    {
      key: "usuarioId",
      header: "Usuario",
      render: (item: Reserva) => (
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User className="h-3 w-3" />
          </div>
          <span className="text-sm">{getUsuarioNombre(item.usuarioId)}</span>
        </div>
      ),
    },
    {
      key: "espacioId",
      header: "Espacio",
      render: (item: Reserva) => (
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <Building2 className="h-3 w-3" />
          </div>
          <span className="text-sm">{getEspacioNombre(item.espacioId)}</span>
        </div>
      ),
    },
    {
      key: "horaInicio",
      header: "Inicio",
      render: (item: Reserva) => (
        <span className="text-sm text-muted-foreground">
          {formatDateTime(item.horaInicio)}
        </span>
      ),
    },
    {
      key: "horaFinUsuario",
      header: "Fin Usuario",
      render: (item: Reserva) => (
        <span className="text-sm text-muted-foreground">
          {formatDateTime(item.horaFinUsuario)}
        </span>
      ),
    },
    {
      key: "estado",
      header: "Estado",
      render: (item: Reserva) => (
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium capitalize ${getEstadoColor(item.estado)}`}
        >
          {item.estado || "pendiente"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Acciones",
      render: (item: Reserva) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => openEditModal(item)}
            className="text-primary hover:bg-primary/10 hover:text-primary"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(item.id)}
            disabled={isDeleting === item.id}
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reservas</h1>
          <p className="mt-1 text-muted-foreground">
            Gestiona las reservas de espacios
          </p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Reserva
        </Button>
      </div>

      <Card>
        <DataTable
          columns={columns}
          data={reservas || []}
          isLoading={isLoading}
          emptyMessage="No hay reservas registradas"
        />
      </Card>

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Crear Nueva Reserva"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
          <Select
            label="Usuario"
            id="usuarioId"
            value={formData.usuarioId.toString()}
            onChange={(e) =>
              setFormData({ ...formData, usuarioId: parseInt(e.target.value) })
            }
            options={[
              { value: "0", label: "Selecciona un usuario" },
              ...(usuarios?.map((u) => ({
                value: u.id.toString(),
                label: u.nombre,
              })) || []),
            ]}
          />
          <Select
            label="Espacio"
            id="espacioId"
            value={formData.espacioId.toString()}
            onChange={(e) =>
              setFormData({ ...formData, espacioId: parseInt(e.target.value) })
            }
            options={[
              { value: "0", label: "Selecciona un espacio" },
              ...(espacios?.map((e) => ({
                value: e.id.toString(),
                label: `${e.nombre} (${e.tipo})`,
              })) || []),
            ]}
          />
          <Input
            label="Hora de Inicio"
            id="horaInicio"
            type="datetime-local"
            value={formData.horaInicio}
            onChange={(e) =>
              setFormData({ ...formData, horaInicio: e.target.value })
            }
            required
          />
          <Input
            label="Hora Fin Usuario"
            id="horaFinUsuario"
            type="datetime-local"
            value={formData.horaFinUsuario}
            onChange={(e) =>
              setFormData({ ...formData, horaFinUsuario: e.target.value })
            }
            required
          />
          <Input
            label="Hora Fin Total (incluye limpieza)"
            id="horaFinTotal"
            type="datetime-local"
            value={formData.horaFinTotal}
            onChange={(e) =>
              setFormData({ ...formData, horaFinTotal: e.target.value })
            }
            required
          />
          <Select
            label="Estado"
            id="estado"
            value={formData.estado}
            onChange={(e) =>
              setFormData({ ...formData, estado: e.target.value })
            }
            options={[
              { value: "pendiente", label: "Pendiente" },
              { value: "activa", label: "Activa" },
              { value: "completada", label: "Completada" },
              { value: "cancelada", label: "Cancelada" },
            ]}
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creando..." : "Crear Reserva"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Actualizar Estado de Reserva"
      >
        <form onSubmit={handleUpdate} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
          {selectedReserva && (
            <div className="rounded-lg bg-muted p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CalendarClock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Reserva #{selectedReserva.id}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{getUsuarioNombre(selectedReserva.usuarioId)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span>{getEspacioNombre(selectedReserva.espacioId)}</span>
              </div>
            </div>
          )}
          <Select
            label="Nuevo Estado"
            id="editEstado"
            value={editEstado}
            onChange={(e) => setEditEstado(e.target.value)}
            options={[
              { value: "pendiente", label: "Pendiente" },
              { value: "activa", label: "Activa" },
              { value: "completada", label: "Completada" },
              { value: "cancelada", label: "Cancelada" },
            ]}
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Actualizando..." : "Actualizar Estado"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
