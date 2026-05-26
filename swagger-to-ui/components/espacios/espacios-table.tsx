"use client"

import { useState } from "react"
import useSWR from "swr"
import { Plus, Search, Trash2, Eye, MoreHorizontal, Building2, Users, Clock } from "lucide-react"
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
import { Espacio, espacioApi, CreateEspacioRequest } from "@/lib/api"

// Demo data for preview when API is not available
const demoEspacios: Espacio[] = [
  { id: 1, nombre: "Sala de Reuniones A", tipo: "sala_reunion", capacidad: 10, minutos_limpieza: 15 },
  { id: 2, nombre: "Sala de Reuniones B", tipo: "sala_reunion", capacidad: 6, minutos_limpieza: 10 },
  { id: 3, nombre: "Auditorio Principal", tipo: "auditorio", capacidad: 100, minutos_limpieza: 30 },
  { id: 4, nombre: "Sala de Conferencias", tipo: "conferencia", capacidad: 25, minutos_limpieza: 20 },
  { id: 5, nombre: "Espacio Coworking", tipo: "coworking", capacidad: 20, minutos_limpieza: 15 },
]

const tipoLabels: Record<string, string> = {
  sala_reunion: "Sala de Reuniones",
  auditorio: "Auditorio",
  conferencia: "Conferencias",
  coworking: "Coworking",
  oficina: "Oficina",
}

export function EspaciosTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [selectedEspacio, setSelectedEspacio] = useState<Espacio | null>(null)
  const [formData, setFormData] = useState<CreateEspacioRequest>({
    nombre: "",
    tipo: "",
    capacidad: 0,
    minutos_limpieza: 15,
  })

  const { data: espacios, error, isLoading, mutate } = useSWR<Espacio[]>(
    "espacios",
    () => espacioApi.getAll().catch(() => demoEspacios),
    { fallbackData: demoEspacios }
  )

  const filteredEspacios = espacios?.filter(
    (espacio) =>
      espacio.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      espacio.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreate = async () => {
    try {
      await espacioApi.create(formData)
      mutate()
      setIsCreateOpen(false)
      setFormData({ nombre: "", tipo: "", capacidad: 0, minutos_limpieza: 15 })
    } catch {
      console.log("[v0] Using demo mode - API not available")
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await espacioApi.delete(id)
      mutate()
    } catch {
      console.log("[v0] Using demo mode - API not available")
    }
  }

  const handleView = (espacio: Espacio) => {
    setSelectedEspacio(espacio)
    setIsViewOpen(true)
  }

  const getTipoBadgeVariant = (tipo: string) => {
    switch (tipo) {
      case "auditorio":
        return "default"
      case "conferencia":
        return "secondary"
      case "sala_reunion":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Lista de Espacios</CardTitle>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Espacio
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nuevo Espacio</DialogTitle>
              <DialogDescription>
                Completa los datos para crear un nuevo espacio reservable.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                  placeholder="Ej: Sala de Reuniones A"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tipo">Tipo de Espacio</Label>
                <Select
                  value={formData.tipo}
                  onValueChange={(value) =>
                    setFormData({ ...formData, tipo: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sala_reunion">Sala de Reuniones</SelectItem>
                    <SelectItem value="auditorio">Auditorio</SelectItem>
                    <SelectItem value="conferencia">Sala de Conferencias</SelectItem>
                    <SelectItem value="coworking">Coworking</SelectItem>
                    <SelectItem value="oficina">Oficina</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="capacidad">Capacidad</Label>
                  <Input
                    id="capacidad"
                    type="number"
                    value={formData.capacidad}
                    onChange={(e) =>
                      setFormData({ ...formData, capacidad: parseInt(e.target.value) || 0 })
                    }
                    placeholder="Número de personas"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="limpieza">Min. Limpieza</Label>
                  <Input
                    id="limpieza"
                    type="number"
                    value={formData.minutos_limpieza}
                    onChange={(e) =>
                      setFormData({ ...formData, minutos_limpieza: parseInt(e.target.value) || 0 })
                    }
                    placeholder="Minutos"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreate}>Crear Espacio</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre o tipo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-center">Capacidad</TableHead>
                <TableHead className="text-center">Limpieza</TableHead>
                <TableHead className="w-20 text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Cargando espacios...
                  </TableCell>
                </TableRow>
              ) : filteredEspacios?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No se encontraron espacios
                  </TableCell>
                </TableRow>
              ) : (
                filteredEspacios?.map((espacio) => (
                  <TableRow key={espacio.id}>
                    <TableCell className="font-medium">{espacio.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                          <Building2 className="h-4 w-4 text-primary" />
                        </div>
                        {espacio.nombre}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getTipoBadgeVariant(espacio.tipo)}>
                        {tipoLabels[espacio.tipo] || espacio.tipo}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {espacio.capacidad}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {espacio.minutos_limpieza} min
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleView(espacio)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDelete(espacio.id)}
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
            <DialogTitle>Detalles del Espacio</DialogTitle>
          </DialogHeader>
          {selectedEspacio && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedEspacio.nombre}</h3>
                  <Badge variant={getTipoBadgeVariant(selectedEspacio.tipo)}>
                    {tipoLabels[selectedEspacio.tipo] || selectedEspacio.tipo}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 rounded-lg bg-muted/50 p-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ID</p>
                  <p className="font-semibold">{selectedEspacio.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Capacidad</p>
                  <p className="font-semibold">{selectedEspacio.capacidad} personas</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tiempo Limpieza</p>
                  <p className="font-semibold">{selectedEspacio.minutos_limpieza} min</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
