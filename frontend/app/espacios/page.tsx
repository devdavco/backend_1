"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import { Plus, Trash2, Building2, Users, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/table";
import { Modal } from "@/components/ui/modal";
import { Input, Select } from "@/components/ui/input";
import { espacioApi } from "@/lib/api";
import type { Espacio, CreateEspacioRequest } from "@/lib/types";

export default function EspaciosPage() {
  const { data: espacios, isLoading } = useSWR("espacios", espacioApi.getAll);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [formData, setFormData] = useState<CreateEspacioRequest>({
    nombre: "",
    tipo: "escritorio",
    capacidad: 1,
    minutos_limpieza: 15,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await espacioApi.create(formData);
      await mutate("espacios");
      setIsCreateModalOpen(false);
      setFormData({
        nombre: "",
        tipo: "escritorio",
        capacidad: 1,
        minutos_limpieza: 15,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear espacio");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estas seguro de eliminar este espacio?")) return;

    setIsDeleting(id);
    try {
      await espacioApi.delete(id);
      await mutate("espacios");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error al eliminar espacio");
    } finally {
      setIsDeleting(null);
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo?.toLowerCase()) {
      case "sala":
        return "bg-primary/20 text-primary";
      case "escritorio":
        return "bg-success/20 text-success";
      case "oficina":
        return "bg-warning/20 text-warning";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const columns = [
    { key: "id" as const, header: "ID" },
    {
      key: "nombre",
      header: "Nombre",
      render: (item: Espacio) => (
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Building2 className="h-4 w-4" />
          </div>
          <span className="font-medium">{item.nombre}</span>
        </div>
      ),
    },
    {
      key: "tipo",
      header: "Tipo",
      render: (item: Espacio) => (
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium capitalize ${getTipoColor(item.tipo)}`}
        >
          {item.tipo}
        </span>
      ),
    },
    {
      key: "capacidad",
      header: "Capacidad",
      render: (item: Espacio) => (
        <div className="flex items-center gap-1 text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{item.capacidad} personas</span>
        </div>
      ),
    },
    {
      key: "minutos_limpieza",
      header: "Limpieza",
      render: (item: Espacio) => (
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{item.minutos_limpieza} min</span>
        </div>
      ),
    },
    {
      key: "actions",
      header: "Acciones",
      render: (item: Espacio) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleDelete(item.id)}
          disabled={isDeleting === item.id}
          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Espacios</h1>
          <p className="mt-1 text-muted-foreground">
            Gestiona los espacios de coworking
          </p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Espacio
        </Button>
      </div>

      <Card>
        <DataTable
          columns={columns}
          data={espacios || []}
          isLoading={isLoading}
          emptyMessage="No hay espacios registrados"
        />
      </Card>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Crear Nuevo Espacio"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
          <Input
            label="Nombre"
            id="nombre"
            value={formData.nombre}
            onChange={(e) =>
              setFormData({ ...formData, nombre: e.target.value })
            }
            required
            placeholder="Sala de Reuniones A"
          />
          <Select
            label="Tipo"
            id="tipo"
            value={formData.tipo}
            onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
            options={[
              { value: "escritorio", label: "Escritorio" },
              { value: "sala", label: "Sala de Reuniones" },
              { value: "oficina", label: "Oficina Privada" },
            ]}
          />
          <Input
            label="Capacidad (personas)"
            id="capacidad"
            type="number"
            min={1}
            value={formData.capacidad}
            onChange={(e) =>
              setFormData({ ...formData, capacidad: parseInt(e.target.value) })
            }
            required
          />
          <Input
            label="Minutos de Limpieza"
            id="minutos_limpieza"
            type="number"
            min={0}
            value={formData.minutos_limpieza}
            onChange={(e) =>
              setFormData({
                ...formData,
                minutos_limpieza: parseInt(e.target.value),
              })
            }
            required
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
              {isSubmitting ? "Creando..." : "Crear Espacio"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
