# Sistema de Gestión de Estudiantes - Always Music

Este es un sistema de gestión de estudiantes desarrollado para la escuela de música Always Music. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en la base de datos de estudiantes almacenada en PostgreSQL.

## Requerimientos

- Node.js
- PostgreSQL

## Instalación

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias del proyecto utilizando el siguiente comando:

   ```bash
   npm install
   ```

3. Configura tu base de datos PostgreSQL y actualiza las credenciales de conexión en el archivo `db.js`.

## Uso

Para ejecutar el servidor:

```bash
npm start
```

Una vez que el servidor esté en funcionamiento, puedes acceder a la aplicación desde tu navegador en `http://localhost:3000`.

### Operaciones disponibles:

- **Agregar un nuevo estudiante:**
  - Completa el formulario de registro de estudiantes en la página principal (`/`).
- **Consultar todos los estudiantes:**
  - Haz clic en el botón "Consultar todos los estudiantes" en la página principal (`/`).
- **Consultar un estudiante por rut:**
  - Accede a la URL `/api/:rut`, donde `:rut` es el rut del estudiante que deseas consultar.
- **Actualizar la información de un estudiante:**
  - [Instrucciones de implementación pendientes].
- **Eliminar el registro de un estudiante:**
  - Accede a la URL `/api/eliminar/:id`, donde `:id` es el ID del estudiante que deseas eliminar.