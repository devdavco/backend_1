"use client"

import { useState } from "react"
import useSWR from "swr"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import {
  Plus,
  Search,
  Trash2,
  Eye,
  MoreHorizontal,
  CalendarDays,
  Edit,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Reserva,
  reservaApi,
  CreateReservaRequest,
  Usuario,
  Espacio,
  usuarioApi,
  espacioApi,
} from "@/lib/api"

// Demo data for preview when API is not available
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
  {
    id: 4,
    usuarioId: 1,
    espacioId: 4,
    horaInicio: "2026-05-28T10:00:00",
    horaFinUsuario: "2026-05-28T11:00:00",
    horaFinTotal: "2026-05-28T11:20:00",
    estado: "cancelada",
    version: 2,
  },
]

const demoUsuarios: Usuario[] = [
  { id: 1, nombre: "María García", email: "maria.garcia@email.com", rol: "admin" },
  { id: 2, nombre: "Carlos López", email: "carlos.lopez@email.com", rol: "usuario" },
  { id: 3, nombre: "Ana Martínez", email: "ana.martinez@email.com", rol: "usuario" },
]

const demoEspacios: Espacio[] = [
  { id: 1, nombre: "Sala de Reuniones A", tipo: "sala_reunion", capacidad: 10, minutos_limpieza: 15 },
  { id: 2, nombre: "Sala de Reuniones B", tipo: "sala_reunion", capacidad: 6, minutos_limpieza: 10 },
  { id: 3, nombre: "Auditorio Principal", tipo: "auditorio", capacidad: 100, minutos_limpieza: 30 },
  { id: 4, nombre: "Sala de Conferencias", tipo: "conferencia", capacidad: 25, minutos_limpieza: 20 },
]

export function ReservasTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedReserva, setSelectedReserva] = useState<Reserva | null>(null)
  const [formData, setFormData] = useState<CreateReservaRequest>({
    usuarioId: 0,
    espacioId: 0,
    horaInicio: "",
    horaFinUsuario: "",
    horaFinTotal: "",
    estado: "pendiente",
  })

  const { data: reservas, isLoading, mutate } = useSWR<Reserva[]>(
    "reservas",
    () => reservaApi.getAll().catch(() => demoReservas),
    { fallbackData: demoReservas }
  )

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

  const getUsuarioName = (id: number) => {
    return usuarios?.find((u) => u.id === id)?.nombre || `Usuario ${id}`
  }

  const getEspacioName = (id: number) => {
    return espacios?.find((e) => e.id === id)?.nombre || `Espacio ${id}`
  }

  const filteredReservas = reservas?.filter((reserva) => {
    const matchesSearch =
      getUsuarioName(reserva.usuarioId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      getEspacioName(reserva.espacioId).toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || reserva.estado === statusFilter
    return matchesSearch && matchesStatus
  })
/*
  const handleCreate = async () => {
    try {
      await reservaApi.create(formData)
      mutate()
      setIsCreateOpen(false)
      setFormData({
        usuarioId: 0,
        espacioId: 0,
        horaInicio: "",
        horaFinUsuario: "",
        horaFinTotal: "",
        estado: "pendiente",
      })
    } catch {
      console.log("[v0] Using demo mode - API not available")
    }
  }
  */

  const handleCreate = async () => {
    try {
      // 1. Validar que tenemos fechas
      if (!formData.horaInicio || !formData.horaFinUsuario) {
        alert("Por favor selecciona horas de inicio y fin");
        return;
      }

      // 2. Transformación EXPLÍCITA y FORZADA
      // Reemplazamos la 'T' por espacio y cortamos a 16 caracteres (YYYY-MM-DD HH:mm)
      const horaInicioLimpa = formData.horaInicio.replace('T', ' ').slice(0, 16);
      const horaFinLimpa = formData.horaFinUsuario.replace('T', ' ').slice(0, 16);
      const horaFinTotalLimpa = formData.horaFinTotal.replace('T', ' ').slice(0, 16);

      // 3. Construir el objeto final
      const payload = {
        usuarioId: Number(formData.usuarioId), // Asegurar que es número
        espacioId: Number(formData.espacioId), // Asegurar que es número
        horaInicio: horaInicioLimpa,           // String con espacio
        horaFinUsuario: horaFinLimpa,          // String con espacio
        horaFinTotal: horaFinTotalLimpa,       // String con espacio
        estado: formData.estado.toUpperCase(), // Mayúsculas
        version: 1
      };

      // 4. DEBUG: Imprimir lo que REALMENTE se va a enviar
      console.log("=== ENVIANDO AL BACKEND ===");
      console.log(JSON.stringify(payload));
      console.log("==========================");

      // 5. Llamar a la API pasando el payload transformado
      await reservaApi.create(payload);

      mutate();
      setIsCreateOpen(false);

      // Reset
      setFormData({
        usuarioId: 0,
        espacioId: 0,
        horaInicio: "",
        horaFinUsuario: "",
        horaFinTotal: "",
        estado: "pendiente",
      });
    } catch (error) {
      console.error("Error completo:", error);
      // Si tienes acceso a la respuesta, imprime el cuerpo del error
      if (error && typeof error === 'object' && 'message' in error) {
        console.error("Mensaje error:", (error as any).message);
      }
    }
  };

  const handleUpdateStatus = async (id: number, estado: string) => {
    try {
      await reservaApi.update(id, { id, estado })
      mutate()
      setIsEditOpen(false)
    } catch {
      console.log("[v0] Using demo mode - API not available")
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await reservaApi.delete(id)
      mutate()
    } catch {
      console.log("[v0] Using demo mode - API not available")
    }
  }

  const handleView = (reserva: Reserva) => {
    setSelectedReserva(reserva)
    setIsViewOpen(true)
  }

  const handleEdit = (reserva: Reserva) => {
    setSelectedReserva(reserva)
    setIsEditOpen(true)
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

  const formatDateTime = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMM yyyy, HH:mm", { locale: es })
    } catch {
      return dateString
    }
  }

  const formatTime = (dateString: string) => {
    try {
      return format(new Date(dateString), "HH:mm", { locale: es })
    } catch {
      return dateString
    }
  }
  // Nueva función para enviar al backend (Spring espera "yyyy-MM-dd HH:mm")
  const formatForBackend = (dateString: string) => {
    if (!dateString) return "";
    // Reemplaza la 'T' por un espacio y corta cualquier segundo o zona horaria extra
    return dateString.replace('T', ' ').substring(0, 16);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Lista de Reservas</CardTitle>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Reserva
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Crear Nueva Reserva</DialogTitle>
              <DialogDescription>
                Completa los datos para crear una nueva reserva de espacio.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="usuario">Usuario</Label>
                <Select
                  value={formData.usuarioId.toString()}
                  onValueChange={(value) =>
                    setFormData({ ...formData, usuarioId: parseInt(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un usuario" />
                  </SelectTrigger>
                  <SelectContent>
                    {usuarios?.map((usuario) => (
                      <SelectItem key={usuario.id} value={usuario.id.toString()}>
                        {usuario.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="espacio">Espacio</Label>
                <Select
                  value={formData.espacioId.toString()}
                  onValueChange={(value) =>
                    setFormData({ ...formData, espacioId: parseInt(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un espacio" />
                  </SelectTrigger>
                  <SelectContent>
                    {espacios?.map((espacio) => (
                      <SelectItem key={espacio.id} value={espacio.id.toString()}>
                        {espacio.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="horaInicio">Hora Inicio</Label>
                  <Input
                    id="horaInicio"
                    type="datetime-local"
                    value={formData.horaInicio}
                    onChange={(e) =>
                      setFormData({ ...formData, horaInicio: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="horaFin">Hora Fin</Label>
                  <Input
                    id="horaFin"
                    type="datetime-local"
                    value={formData.horaFinUsuario}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        horaFinUsuario: e.target.value,
                        horaFinTotal: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="estado">Estado</Label>
                <Select
                  value={formData.estado}
                  onValueChange={(value) =>
                    setFormData({ ...formData, estado: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pendiente">Pendiente</SelectItem>
                    <SelectItem value="confirmada">Confirmada</SelectItem>
                    <SelectItem value="cancelada">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreate}>Crear Reserva</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por usuario o espacio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="confirmada">Confirmada</SelectItem>
              <SelectItem value="cancelada">Cancelada</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">ID</TableHead>
                <TableHead>Usuario</TableHead>
                <TableHead>Espacio</TableHead>
                <TableHead>Fecha y Hora</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="w-20 text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Cargando reservas...
                  </TableCell>
                </TableRow>
              ) : filteredReservas?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No se encontraron reservas
                  </TableCell>
                </TableRow>
              ) : (
                filteredReservas?.map((reserva) => (
                  <TableRow key={reserva.id}>
                    <TableCell className="font-medium">{reserva.id}</TableCell>
                    <TableCell>{getUsuarioName(reserva.usuarioId)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        {getEspacioName(reserva.espacioId)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="font-medium">{formatDateTime(reserva.horaInicio)}</p>
                        <p className="text-muted-foreground">
                          {formatTime(reserva.horaInicio)} - {formatTime(reserva.horaFinUsuario)}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{getEstadoBadge(reserva.estado)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleView(reserva)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(reserva)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Cambiar estado
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDelete(reserva.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalles de la Reserva</DialogTitle>
          </DialogHeader>
          {selectedReserva && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <CalendarDays className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Reserva #{selectedReserva.id}</h3>
                    <p className="text-sm text-muted-foreground">
                      Versión {selectedReserva.version}
                    </p>
                  </div>
                </div>
                {getEstadoBadge(selectedReserva.estado)}
              </div>
              <div className="grid gap-4 rounded-lg bg-muted/50 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Usuario</p>
                    <p className="font-semibold">{getUsuarioName(selectedReserva.usuarioId)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Espacio</p>
                    <p className="font-semibold">{getEspacioName(selectedReserva.espacioId)}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Hora Inicio</p>
                    <p className="font-semibold">{formatDateTime(selectedReserva.horaInicio)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Hora Fin Usuario</p>
                    <p className="font-semibold">{formatDateTime(selectedReserva.horaFinUsuario)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Hora Fin Total (con limpieza)</p>
                  <p className="font-semibold">{formatDateTime(selectedReserva.horaFinTotal)}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Status Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cambiar Estado de Reserva</DialogTitle>
            <DialogDescription>
              Selecciona el nuevo estado para la reserva #{selectedReserva?.id}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-3">
              <Button
                variant="outline"
                className="justify-start gap-2"
                onClick={() => selectedReserva && handleUpdateStatus(selectedReserva.id, "pendiente")}
              >
                <Clock className="h-4 w-4 text-yellow-600" />
                Marcar como Pendiente
              </Button>
              <Button
                variant="outline"
                className="justify-start gap-2"
                onClick={() => selectedReserva && handleUpdateStatus(selectedReserva.id, "confirmada")}
              >
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Marcar como Confirmada
              </Button>
              <Button
                variant="outline"
                className="justify-start gap-2"
                onClick={() => selectedReserva && handleUpdateStatus(selectedReserva.id, "cancelada")}
              >
                <XCircle className="h-4 w-4 text-red-600" />
                Marcar como Cancelada
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
