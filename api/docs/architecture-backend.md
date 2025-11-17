# 📘 ARQUITECTURA DEL BACKEND – SIGI (NestJS)
Documento técnico oficial — Estructura del proyecto y definición de cada módulo.

---

# 📁 Estructura General del Backend

```
/
├── eslint.config.mjs
├── nest-cli.json
├── package.json
├── tsconfig.json
├── tsconfig.build.json
├── test/
└── src/
    ├── app.controller.ts
    ├── app.module.ts
    ├── app.service.ts
    ├── main.ts
    ├── common/
    ├── config/
    ├── database/
    ├── infraestructure/
    └── modules/
```

---

# 🏛️ 1. Directorio principal: `/src`

## `main.ts`
Punto de entrada de la aplicación NestJS. Configura:
- Pipes globales
- Prefijo de rutas
- CORS
- Bootstrap del servidor HTTP

## `app.module.ts`
Módulo raíz. Importa todos los módulos de negocio.

## `app.controller.ts` y `app.service.ts`
Controlador y servicio base para pruebas de salud del sistema.

---

# 📦 2. `/common` — Elementos reutilizables

```
common/
├── decorators/
├── filters/
├── guards/
├── interceptors/
├── pipes/
└── utils/
```

### decorators/
Decoradores personalizados para parámetros, rutas, o lógica cross-cutting.

### filters/
Filtros de excepción para manejo centralizado de errores.

### guards/
Guardias de autorización/autenticación:
- AuthGuard
- RoleGuard

### interceptors/
Transforman o interceptan peticiones/respuestas:
- Logging
- Timeout
- JWT attachment

### pipes/
Validación y transformación de datos.

### utils/
Funciones utilitarias comunes a toda la app.

---

# 🧩 3. `/config` — Configuración global

```
config/
├── app.config.ts
├── database.config.ts
└── mail.config.ts
```

### app.config.ts
Variables de entorno, configuración global de app, prefijos, puertos.

### database.config.ts
Configuración del ORM (TypeORM/Prisma).

### mail.config.ts
Configuración del servidor SMTP para envío de notificaciones.

---

# 🗄️ 4. `/database` — Persistencia

```
database/
├── entities/
├── migrations/
└── seeds/
```

### entities/
Modelos ORM que representan tablas de BD:
- User
- Employee
- Incapacity
- Document
- AuditLog
- NotificationLog

### migrations/
Scripts generados por el ORM para cambiar el esquema.

### seeds/
Datos pre-cargados necesarios para la inicialización.

---

# 🌐 5. `/infraestructure` — Adaptadores externos

```
infraestructure/
├── email/
├── event-bus/
├── external-apis/
└── file-storage/
```

### email/
Adaptadores SMTP o servicios transaccionales:
- Nodemailer
- Resend
- SendGrid

### event-bus/
Sistema de eventos internos o externos (EventEmitter, Kafka, RabbitMQ).

### external-apis/
Conexiones con servicios externos (EPS, ARL, validadores externos).

### file-storage/
Manejo de almacenamiento:
- Local
- AWS S3
- Google Cloud Storage

---

# 🏗️ 6. `/modules` — Módulos funcionales del dominio

```
modules/
├── audit/
├── auth/
├── documents/
├── employees/
├── incapacities/
├── integrations/
├── notifications/
├── reports/
├── statistics/
└── users/
```

Cada módulo sigue la misma estructura y representa un dominio del sistema.

---

# 🧱 ¿Qué debe contener un módulo? — Estructura base

Cada módulo sigue esta arquitectura:

```
/modules/<module-name>
├── controllers/
│     └── *.controller.ts
├── services/
│     └── *.service.ts
├── repositories/
│     └── *.repository.ts
├── entities/
│     └── *.entity.ts
├── dtos/
│     └── *.dto.ts
├── mappers/ (opcional)
│     └── *.mapper.ts
└── <module-name>.module.ts
```

## ✔️ Explicación de cada parte

### controllers/
Exponen endpoints HTTP.  
Responsabilidades:
- Recibir solicitudes
- Validar DTOs
- Llamar servicios
- Devolver respuestas HTTP

### services/
Contienen la lógica de negocio (casos de uso).  
Ejemplos:
- Crear incapacidad
- Validar documento
- Enviar notificación
- Cambiar estado de trámite

### repositories/
Aíslan el acceso a la base de datos.  
El servicio **no** debería interactuar directamente con TypeORM/Prisma.

### entities/
Modelos ORM que representan tablas en la BD.

### dtos/
Definen cómo llegan los datos:
- Validaciones (`class-validator`)
- Tipificación (`class-transformer`)

### mappers/
Transforman:
- Entity → DTO
- DTO → Entity

### `<module-name>.module.ts`
Archivo de registro del módulo en NestJS:
- Declara controllers
- Declara providers
- Importa otros módulos
- Exporta servicios si es necesario

---

# 📦 7. Módulos del negocio — Descripción funcional

---

## 🔹 auth/
Gestión de autenticación y autorización:
- Login
- Tokens JWT
- Roles
- Guards

---

## 🔹 users/
Maneja usuarios del sistema:
- CRUD
- Roles
- Perfil básico

---

## 🔹 employees/
Información del empleado:
- Datos personales
- Datos contractuales
- Portal del colaborador

---

## 🔹 incapacities/
Núcleo del sistema SIGI:
- Registro y edición de incapacidades
- Flujo de estados:
  - Registrada → Aceptada → Rechazada → Pagada
- Asociación con documentos
- Validaciones automáticas

---

## 🔹 documents/
Gestión de documentos:
- Subida de archivos
- Validación
- Almacenamiento
- Asociación a incapacidades

---

## 🔹 notifications/
Envío automático de correos:
- Cambio de estado
- Notificaciones a empleados
- Alertas de RRHH

---

## 🔹 reports/
Generación de:
- PDF
- CSV
- Reportes contables
- Reportes para RRHH y auditoría

---

## 🔹 statistics/
Cálculo y entrega de estadísticas:
- Incapacidades por mes
- Tiempos promedio
- Valores acumulados
- Gráficas para dashboard

---

## 🔹 audit/
Trazabilidad del sistema:
- Registro de actividades críticas
- Historial de trámites
- Registro de cambios por usuario

---

## 🔹 integrations/
Conexión futura con:
- EPS
- ARL
- Sistemas externos
