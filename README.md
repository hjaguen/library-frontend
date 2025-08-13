# Library Frontend

## Project Overview
Una aplicación web moderna construida con React, TypeScript y Vite que proporciona una interfaz de usuario para la gestión de una biblioteca. La aplicación está optimizada para dispositivos móviles y de escritorio.

Funcionalidades Principales:
- 📚 Gestión básica de libros (listado, agregar, actualizar)
- 👥 Administración de miembros
- 📱 Diseño responsive con Material-UI
- 📋 Sistema de préstamos de libros

## Stack Tecnológico
- Frontend:
  - React v18.2.0
  - TypeScript v5.3.3
  - Redux Toolkit v2.0.1
  - Material-UI v5.18.0
  - React Router v6.30.1
  - Axios v1.11.0
- Herramientas de Desarrollo:
  - Vite v5.0.12
  - ESLint v8.56.0
  - TypeScript ESLint
  - Hot Module Replacement (HMR)

## Estructura del Proyecto
```
project-root/
├── src/
│   ├── components/         # Componentes React reutilizables
│   │   ├── BookForm.tsx    # Formulario de libros
│   │   ├── BookList.tsx    # Lista de libros
│   │   ├── MemberForm.tsx  # Formulario de miembros
│   │   ├── MemberList.tsx  # Lista de miembros
│   │   └── Layout.tsx      # Diseño principal de la aplicación
│   ├── pages/              # Componentes de página
│   │   ├── Books.tsx       # Página de gestión de libros
│   │   ├── Members.tsx     # Página de gestión de miembros
│   │   └── Checkouts.tsx   # Página de préstamos
│   └── store/              # Estado global con Redux
│       ├── booksSlice.ts   # Lógica de estado para libros
│       ├── membersSlice.ts # Lógica de estado para miembros
│       └── store.ts        # Configuración de Redux store
└── public/                 # Archivos estáticos
```

## Instrucciones de Configuración
### Prerequisitos
- Node.js (v18.x o superior)
- npm (v9.x o superior) o yarn (v1.22.x o superior)
- Git

### Configuración del Entorno
Crea un archivo `.env` en la raíz del proyecto:
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_API_TIMEOUT=5000
VITE_APP_ENV=development
```

### Instalación
1. Clone the repository
   ```bash
   git clone [repository-url]
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

### Scripts Disponibles
```bash
# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview

# Ejecutar linting
npm run lint
```

### Configuración de ESLint
El proyecto incluye una configuración robusta de ESLint para análisis de código con soporte de tipos. La configuración se encuentra en `eslint.config.js` e incluye:
- Reglas de análisis con reconocimiento de tipos
- Reglas específicas para React
- Configuración optimizada para TypeScript

## Conexión con el Backend
### Configuración de la API
- URL Base: Configurada mediante variable de entorno `VITE_API_URL`
- Endpoints principales:
  - `/books`: Gestión de libros
  - `/members`: Gestión de miembros
  - `/checkouts`: Gestión de préstamos

### Modelos de Datos
```typescript
// Libro
interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  available: boolean;
}

// Formulario de libro nuevo
interface CreateBookRequest {
  title: string;
  author: string;
  isbn: string;
}
```

### Manejo de Errores
La aplicación implementa manejo de errores para las peticiones API:
- Estados de carga ('loading', 'succeeded', 'failed')
- Mensajes de error amigables para el usuario
- Reintentos automáticos en caso de fallo de red

### Optimización
- Diseño responsive para todas las pantallas
- Componentes optimizados con Material-UI
- Estado global gestionado con Redux Toolkit

### Guía de Inicio Rápido

1. **Configuración Inicial**
   ```bash
   # Clone and set up the project
   git clone [repository-url]
   cd library-frontend
   npm install

   # Create and configure your environment file
   cp .env.example .env
   # Edit .env with your specific configuration
   ```

2. **Flujo de Desarrollo**
   ```bash
   # Iniciar servidor de desarrollo con recarga en caliente
   npm run dev

   # Ejecutar linting
   npm run lint
   ```

3. **Despliegue a Producción**
   ```bash
   # Build optimized production bundle
   npm run build

   # Verify production build locally
   npm run preview
   ```

### Mejores Prácticas de Configuración

1. **API Configuration**
   ```env
   # Development (.env.development)
   VITE_API_BASE_URL=http://localhost:3000
   VITE_API_TIMEOUT=5000
   VITE_APP_ENV=development

   # Production (.env.production)
   VITE_API_BASE_URL=https://api.yourdomain.com
   VITE_API_TIMEOUT=10000
   VITE_APP_ENV=production
   ```

2. **Environment Variables Usage**
   ```typescript
   // src/config/api.ts
   export const API_CONFIG = {
     baseURL: import.meta.env.VITE_API_BASE_URL,
     timeout: parseInt(import.meta.env.VITE_API_TIMEOUT),
     headers: {
       'Content-Type': 'application/json'
     }
   };
   ```
