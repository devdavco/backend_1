"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertCircle, Server } from "lucide-react"

export default function ConfiguracionPage() {
  const [apiUrl, setApiUrl] = useState(
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
  )
  const [connectionStatus, setConnectionStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle")

  const testConnection = async () => {
    setConnectionStatus("loading")
    try {
      const response = await fetch(`${apiUrl}/usuarios/ping`, {
        method: "GET",
      })
      if (response.ok) {
        setConnectionStatus("success")
      } else {
        setConnectionStatus("error")
      }
    } catch {
      setConnectionStatus("error")
    }
  }

  return (
    <DashboardLayout
      title="Configuración"
      description="Configura la conexión con el backend"
    >
          <div className="max-w-2xl space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  Conexión API
                </CardTitle>
                <CardDescription>
                  Configura la URL del servidor backend para conectar con la API de reservas.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="apiUrl">URL del Servidor API</Label>
                  <div className="flex gap-2">
                    <Input
                      id="apiUrl"
                      value={apiUrl}
                      onChange={(e) => setApiUrl(e.target.value)}
                      placeholder="http://localhost:8080"
                      className="flex-1"
                    />
                    <Button onClick={testConnection} disabled={connectionStatus === "loading"}>
                      {connectionStatus === "loading" ? "Probando..." : "Probar Conexión"}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Esta URL se utiliza para todas las llamadas a la API de reservas.
                  </p>
                </div>

                {connectionStatus !== "idle" && connectionStatus !== "loading" && (
                  <div
                    className={`flex items-center gap-2 rounded-lg p-3 ${
                      connectionStatus === "success"
                        ? "bg-green-50 text-green-800"
                        : "bg-red-50 text-red-800"
                    }`}
                  >
                    {connectionStatus === "success" ? (
                      <>
                        <CheckCircle2 className="h-5 w-5" />
                        <span>Conexión exitosa con el servidor</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-5 w-5" />
                        <span>No se pudo conectar con el servidor. Usando datos de demostración.</span>
                      </>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Endpoints Disponibles</CardTitle>
                <CardDescription>
                  Lista de endpoints de la API según la documentación Swagger.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 font-semibold">Usuarios</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700">GET</Badge>
                        <code className="text-muted-foreground">/usuarios/all</code>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700">GET</Badge>
                        <code className="text-muted-foreground">{"/usuarios/{id}"}</code>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">POST</Badge>
                        <code className="text-muted-foreground">/usuarios/create</code>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-red-50 text-red-700">DELETE</Badge>
                        <code className="text-muted-foreground">{"/usuarios/eliminar/{id}"}</code>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 font-semibold">Espacios</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700">GET</Badge>
                        <code className="text-muted-foreground">/espacios/all</code>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700">GET</Badge>
                        <code className="text-muted-foreground">{"/espacios/{id}"}</code>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">POST</Badge>
                        <code className="text-muted-foreground">/espacios/create</code>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-red-50 text-red-700">DELETE</Badge>
                        <code className="text-muted-foreground">{"/espacios/eliminar/{id}"}</code>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 font-semibold">Reservas</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700">GET</Badge>
                        <code className="text-muted-foreground">/reserva/all</code>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700">GET</Badge>
                        <code className="text-muted-foreground">{"/reserva/{id}"}</code>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">POST</Badge>
                        <code className="text-muted-foreground">/reserva/create</code>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700">PUT</Badge>
                        <code className="text-muted-foreground">{"/reserva/update/{id}"}</code>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-red-50 text-red-700">DELETE</Badge>
                        <code className="text-muted-foreground">{"/reserva/eliminar/{id}"}</code>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
    </DashboardLayout>
  )
}
