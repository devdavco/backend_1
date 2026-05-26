// API Types based on OpenAPI spec

export interface Usuario {
  id: number
  nombre: string
  email: string
  password_hash?: string
  rol: string
}

export interface CreateUsuarioRequest {
  nombre: string
  email: string
  password_hash?: string
  rol?: string
}

export interface Espacio {
  id: number
  nombre: string
  tipo: string
  capacidad: number
  minutos_limpieza: number
}

export interface CreateEspacioRequest {
  nombre: string
  tipo: string
  capacidad: number
  minutos_limpieza: number
}

export interface Reserva {
  id: number
  usuarioId: number
  espacioId: number
  horaInicio: string
  horaFinUsuario: string
  horaFinTotal: string
  estado: string
  version: number
}

export interface CreateReservaRequest {
  usuarioId: number
  espacioId: number
  horaInicio: string
  horaFinUsuario: string
  horaFinTotal: string
  estado: string
  version?: number
}

export interface UpdateReservaRequest {
  id: number
  estado: string
}

// API Base URL - configurable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

// Generic fetch wrapper with error handling
async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

// Usuario API
export const usuarioApi = {
  getAll: () => apiFetch<Usuario[]>("/usuarios/all"),
  getById: (id: number) => apiFetch<Usuario>(`/usuarios/${id}`),
  create: (data: CreateUsuarioRequest) =>
    apiFetch<Usuario>("/usuarios/create", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    apiFetch<object>(`/usuarios/eliminar/${id}`, { method: "DELETE" }),
  ping: () => apiFetch<string>("/usuarios/ping"),
}

// Espacio API
export const espacioApi = {
  getAll: () => apiFetch<Espacio[]>("/espacios/all"),
  getById: (id: number) => apiFetch<Espacio>(`/espacios/${id}`),
  create: (data: CreateEspacioRequest) =>
    apiFetch<Espacio>("/espacios/create", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    apiFetch<object>(`/espacios/eliminar/${id}`, { method: "DELETE" }),
  ping: () => apiFetch<string>("/espacios/ping"),
}

// Reserva API
export const reservaApi = {
  getAll: () => apiFetch<Reserva[]>("/reserva/all"),
  getById: (id: number) => apiFetch<Reserva>(`/reserva/${id}`),
  create: (data: CreateReservaRequest) =>
    apiFetch<Reserva>("/reserva/create", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: number, data: UpdateReservaRequest) =>
    apiFetch<Reserva>(`/reserva/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    apiFetch<object>(`/reserva/eliminar/${id}`, { method: "DELETE" }),
  ping: () => apiFetch<string>("/reserva/ping"),
}
