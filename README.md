# 🏢 Sistema de Reservas de Espacios para Coworking (backend_1)

## 📋 Descripción del Proyecto

Este es un sistema completo para gestionar la reserva de espacios de coworking. La aplicación permite administrar usuarios, espacios disponibles y reservas con una interfaz moderna y una API RESTful escalable.

## 🛠️ Tecnologías Utilizadas

### Backend
| Herramienta | Uso |
| :--- | :--- |
| **Java** | Lenguaje principal del desarrollo |
| **Spring Boot** | Framework para crear la API REST |
| **PostgreSQL** | Base de datos para almacenar información |
| **Hibernate** | ORM para trabajar con la base de datos |

### Frontend
| Herramienta | Uso |
| :--- | :--- |
| **Next.js** | Framework para la interfaz gráfica |
| **React** | Biblioteca de componentes UI |
| **Tailwind CSS** | Estilos modernos y responsivos |
| **Radix UI** | Componentes accesibles |

### Plataforma y Alojamiento
| Servicio | Función |
| :--- | :--- |
| **Railway** | Aloja el backend (API Java/Spring Boot) |
| **Vercel** | Aloja el frontend (Interfaz Next.js) |
| **Supabase** | Provee la base de datos PostgreSQL en la nube |

## 🌐 Arquitectura de Despliegue

El sistema opera bajo una arquitectura en tres capas distribuidas en la nube:

1.  **Frontend (Vercel):** La interfaz gráfica se aloja en Vercel, donde los usuarios acceden a través de un navegador web. Se encarga de mostrar la información y capturar las interacciones del usuario.
2.  **Backend (Railway):** La lógica del negocio y la API RESTful están alojadas en Railway. Este servicio recibe las peticiones del frontend, procesa los datos y gestiona la seguridad de las operaciones.
3.  **Base de Datos (Supabase):** La persistencia de datos (usuarios, espacios y reservas) se maneja mediante PostgreSQL alojado en Supabase, conectado de forma segura al backend a través de internet.

Flujo de comunicación: El usuario interactúa con el Frontend en Vercel → El Frontend envía peticiones HTTP al Backend en Railway → El Backend consulta o actualiza la información en la Base de Datos de Supabase.

## 🔧 Características Principales

*   **Gestión de Usuarios:** Crear, visualizar, editar y eliminar usuarios con roles definidos
*   **Gestión de Espacios:** Administrar espacios reservables con capacidad y horarios
*   **Gestión de Reservas:** Crear y controlar las reservas de los espacios
*   **Documentación API:** Swagger UI para probar endpoints directamente
*   **Diseño Responsivo:** Interfaz adaptada a diferentes dispositivos

## 🚀 Instrucciones Breves de Ejecución

### Para Desarrollo Local
1. Clona el repositorio
2. Configura las variables de entorno para tu base de datos local o Supabase
3. Ejecuta el backend con Maven (`mvn spring-boot:run`)
4. Instala dependencias del frontend y ejecuta (`npm run dev`)

### Para Producción
Los servicios ya están desplegados en Railway (backend), Vercel (frontend) y Supabase (base de datos). Las configuraciones de conexión deben apuntar a las direcciones correspondientes de cada plataforma.

## 📁 Estructura del Proyecto

backend_1/
├── src/main/java/       # Código fuente del backend (Java)
├── src/main/resources/  # Configuraciones (application.properties)
└── swagger-to-ui/       # Código fuente del frontend (Next.js)

## 🔗 Recursos Útiles

*   [Documentación Spring Boot](https://spring.io/projects/spring-boot)
*   [Documentación Next.js](https://nextjs.org/docs)
*   [Documentación Supabase](https://supabase.com/docs)
*   [Railway App Guide](https://docs.railway.app/)

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo LICENSE para más detalles.
