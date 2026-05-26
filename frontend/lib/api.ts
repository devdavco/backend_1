import type {
  Usuario,
  CreateUsuarioRequest,
  Espacio,
  CreateEspacioRequest,
  Reserva,
  CreateReservaRequest,
  UpdateReservaRequest,
} from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// Usuario endpoints
export const usuarioApi = {
  getAll: async (): Promise<Usuario[]> => {
    const response = await fetch(`${API_BASE_URL}/usuarios/all`);
    return handleResponse<Usuario[]>(response);
  },

  getById: async (id: number): Promise<Usuario> => {
    const response = await fetch(`${API_BASE_URL}/usuarios/${id}`);
    return handleResponse<Usuario>(response);
  },

  create: async (data: CreateUsuarioRequest): Promise<Usuario> => {
    const response = await fetch(`${API_BASE_URL}/usuarios/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<Usuario>(response);
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/usuarios/eliminar/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  },

  ping: async (): Promise<string> => {
    const response = await fetch(`${API_BASE_URL}/usuarios/ping`);
    return response.text();
  },
};

// Espacio endpoints
export const espacioApi = {
  getAll: async (): Promise<Espacio[]> => {
    const response = await fetch(`${API_BASE_URL}/espacios/all`);
    return handleResponse<Espacio[]>(response);
  },

  getById: async (id: number): Promise<Espacio> => {
    const response = await fetch(`${API_BASE_URL}/espacios/${id}`);
    return handleResponse<Espacio>(response);
  },

  create: async (data: CreateEspacioRequest): Promise<Espacio> => {
    const response = await fetch(`${API_BASE_URL}/espacios/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<Espacio>(response);
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/espacios/eliminar/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  },

  ping: async (): Promise<string> => {
    const response = await fetch(`${API_BASE_URL}/espacios/ping`);
    return response.text();
  },
};

// Reserva endpoints
export const reservaApi = {
  getAll: async (): Promise<Reserva[]> => {
    const response = await fetch(`${API_BASE_URL}/reserva/all`);
    return handleResponse<Reserva[]>(response);
  },

  getById: async (id: number): Promise<Reserva> => {
    const response = await fetch(`${API_BASE_URL}/reserva/${id}`);
    return handleResponse<Reserva>(response);
  },

  create: async (data: CreateReservaRequest): Promise<Reserva> => {
    const response = await fetch(`${API_BASE_URL}/reserva/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<Reserva>(response);
  },

  update: async (id: number, data: UpdateReservaRequest): Promise<Reserva> => {
    const response = await fetch(`${API_BASE_URL}/reserva/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<Reserva>(response);
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/reserva/eliminar/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  },

  ping: async (): Promise<string> => {
    const response = await fetch(`${API_BASE_URL}/reserva/ping`);
    return response.text();
  },
};
