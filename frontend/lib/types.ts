// API Types based on Swagger specification

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password_hash?: string;
  rol: string;
}

export interface CreateUsuarioRequest {
  nombre: string;
  email: string;
  password_hash?: string;
  rol?: string;
}

export interface Espacio {
  id: number;
  nombre: string;
  tipo: string;
  capacidad: number;
  minutos_limpieza: number;
}

export interface CreateEspacioRequest {
  nombre: string;
  tipo: string;
  capacidad: number;
  minutos_limpieza: number;
}

export interface Reserva {
  id: number;
  usuarioId: number;
  espacioId: number;
  horaInicio: string;
  horaFinUsuario: string;
  horaFinTotal: string;
  estado: string;
  version: number;
}

export interface CreateReservaRequest {
  espacioId: number;
  usuarioId: number;
  horaInicio: string;
  horaFinUsuario: string;
  horaFinTotal: string;
  estado: string;
  version?: number;
}

export interface UpdateReservaRequest {
  id: number;
  estado: string;
}
