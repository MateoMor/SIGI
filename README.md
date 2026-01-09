# SIGI – Sistema de Gestión de Incapacidades

SIGI es una plataforma web diseñada para optimizar el registro, administración y seguimiento de incapacidades médicas dentro de una organización.  
El proyecto tiene como propósito centralizar la información, reducir reprocesos, mejorar la trazabilidad y brindar herramientas de análisis para el área de Talento Humano.

El sistema incluye funcionalidades como:
- Registro de incapacidades y documentos de soporte.
- Validación y control de estados del trámite.
- Portal del colaborador.
- Generación de reportes.
- Estadísticas y visualizaciones.
- Notificaciones automáticas.

---

## 🧩 Arquitectura del Proyecto

El repositorio está dividido en dos partes principales:

### **📌 /api – Backend**
Implementado con **NestJS**, siguiendo una arquitectura modular y orientada al dominio.  
Aquí se gestionan todas las operaciones del servidor, lógica de negocio, base de datos, validaciones, reportes y notificaciones.

➡️ **Ver documentación del backend:**  
- [README del backend](./api/README.md)

---

### **📌 /app – Frontend**
Construido con **Angular (standalone, Angular 20)** usando componentes independientes, lazy loading y buenas prácticas de diseño.  
Esta capa se encarga de la interfaz de usuario, flujos de navegación, carga de documentos y visualización de datos.

➡️ **Ver documentación del frontend:**  
- [README del frontend](./app/README.md)
  
---

## � Cómo iniciar el proyecto

### **Requisitos previos**

- **Node.js** >= 20.x
- **npm** >= 10.x
- **Git**
- Cuenta en **Supabase** (para base de datos y almacenamiento)

---

### **1. Clonar el repositorio**

```bash
git clone https://github.com/MateoMor/SIGI.git
cd SIGI
```

---

### **2. Configurar e iniciar el Backend (API)**

```bash
# Ir al directorio del backend
cd api

# Instalar dependencias
npm install

# Copiar archivo de variables de entorno
cp .env.example .env
```

**Editar el archivo `.env`** con tus credenciales:

```env
# Entorno
NODE_ENV=development
PORT=3005

# Supabase (obtener de tu proyecto en supabase.com)
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
SUPABASE_ANON_KEY=tu-anon-key

# JWT
JWT_SECRET=tu-secreto-jwt-seguro

# Email (opcional, para notificaciones)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_SECURE=false
MAIL_USER=tu-email@gmail.com
MAIL_PASSWORD=tu-contraseña-de-aplicacion
MAIL_FROM_NAME=SIGI
MAIL_FROM_EMAIL=noreply@sigi.com
```

**Iniciar el servidor de desarrollo:**

```bash
# Modo desarrollo (con hot-reload)
npm run start:dev

# El servidor estará disponible en:
# - API: http://localhost:3000
# - Swagger UI: http://localhost:3000/docs
```

---

### **3. Configurar e iniciar el Frontend (App)**

```bash
# Desde la raíz del proyecto, ir al directorio del frontend
cd app

# Instalar dependencias
npm install
```

**Iniciar el servidor de desarrollo:**

```bash
npm start

# La aplicación estará disponible en:
# http://localhost:4200
```

---

### **4. Ejecutar ambos servicios simultáneamente**

Abre dos terminales:

**Terminal 1 - Backend:**
```bash
cd api
npm run start:dev
```

**Terminal 2 - Frontend:**
```bash
cd app
npm start
```

---

### **5. Configuración de Supabase**

1. Crea un proyecto en [supabase.com](https://supabase.com)
2. Ejecuta las migraciones SQL ubicadas en `api/src/database/migrations/` en orden:
   - `001_initial_schema.sql`
   - `002_add_empresa_to_usuarios.sql`
   - `003_add_unique_constraint_empresa_nombre.sql`
   - `004_make_empresa_id_required.sql`
   - `005_create_password_resets_table.sql`
3. Crea un bucket llamado `documentos` en Supabase Storage
4. Copia las credenciales al archivo `.env`

---

### **📍 URLs por defecto**

| Servicio | URL |
|----------|-----|
| Frontend | http://localhost:4200 |
| Backend API | http://localhost:3005 |
| Swagger Docs | http://localhost:3005/docs |
| OpenAPI JSON | http://localhost:3005/docs-json |

---

## �🛠️ Tecnologías utilizadas (visión general)

---

## 📜 Licencia

Este proyecto se distribuye bajo la licencia incluida en este repositorio.  
Consulta el archivo:  
➡️ [LICENSE](./LICENSE)
