"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import { Plus, Trash2, Mail, User, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/table";
import { Modal } from "@/components/ui/modal";
import { Input, Select } from "@/components/ui/input";
import { usuarioApi } from "@/lib/api";
import type { Usuario, CreateUsuarioRequest } from "@/lib/types";

export default function UsuariosPage() {
  const { data: usuarios, isLoading } = useSWR("usuarios", usuarioApi.getAll);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [formData, setFormData] = useState<CreateUsuarioRequest>({
    nombre: "",
    email: "",
    password_hash: "",
    rol: "usuario",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await usuarioApi.create(formData);
      await mutate("usuarios");
      setIsCreateModalOpen(false);
      setFormData({ nombre: "", email: "", password_hash: "", rol: "usuario" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear usuario");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estas seguro de eliminar este usuario?")) return;

    setIsDeleting(id);
    try {
      await usuarioApi.delete(id);
      await mutate("usuarios");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error al eliminar usuario");
    } finally {
      setIsDeleting(null);
    }
  };

  const columns = [
    { key: "id" as const, header: "ID" },
    {
      key: "nombre",
      header: "Nombre",
      render: (item: Usuario) => (
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User className="h-4 w-4" />
          </div>
          <span className="font-medium">{item.nombre}</span>
        </div>
      ),
    },
    {
      key: "email",
      header: "Email",
      render: (item: Usuario) => (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="h-4 w-4" />
          {item.email}
        </div>
      ),
    },
    {
      key: "rol",
      header: "Rol",
      render: (item: Usuario) => (
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
            item.rol === "admin"
              ? "bg-primary/20 text-primary"
              : "bg-muted text-muted-foreground"
          }`}
        >
          <Shield className="h-3 w-3" />
          {item.rol || "usuario"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Acciones",
      render: (item: Usuario) => (
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
          <h1 className="text-3xl font-bold text-foreground">Usuarios</h1>
          <p className="mt-1 text-muted-foreground">
            Gestiona los usuarios del sistema
          </p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Usuario
        </Button>
      </div>

      <Card>
        <DataTable
          columns={columns}
          data={usuarios || []}
          isLoading={isLoading}
          emptyMessage="No hay usuarios registrados"
        />
      </Card>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Crear Nuevo Usuario"
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
            placeholder="Juan Perez"
          />
          <Input
            label="Email"
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            placeholder="juan@ejemplo.com"
          />
          <Input
            label="Contrasena"
            id="password"
            type="password"
            value={formData.password_hash}
            onChange={(e) =>
              setFormData({ ...formData, password_hash: e.target.value })
            }
            placeholder="********"
          />
          <Select
            label="Rol"
            id="rol"
            value={formData.rol}
            onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
            options={[
              { value: "usuario", label: "Usuario" },
              { value: "admin", label: "Administrador" },
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
              {isSubmitting ? "Creando..." : "Crear Usuario"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
