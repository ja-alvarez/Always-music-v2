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
- **Editar un estudiante:**
  - Utiliza el botón "Editar" en la tabla de estudiantes para modificar la información.
- **Eliminar un estudiante:**
  - Utiliza el botón "Eliminar" en la tabla de estudiantes para eliminar un registro.

### Description

This is a student management system developed for the music school Always Music. It allows performing CRUD (Create, Read, Update, Delete) operations on the student database stored in PostgreSQL.

## Requirements

- Node.js
- PostgreSQL

## Installation

1. Clone this repository to your local machine.
2. Install project dependencies using the following command:

   ```bash
   npm install
   ```

3. Configure your PostgreSQL database and update the connection credentials in the `db.js` file.

## Usage

To run the server:

```bash
npm start
```

Once the server is running, you can access the application from your browser at `http://localhost:3000`.

### Available Operations:

- **Add a new student:**
  - Complete the student registration form on the main page (`/`).
- **View all students:**
  - Click the "View all students" button on the main page (`/`).
- **Edit a student:**
  - Use the "Edit" button in the student table to modify the information.
- **Delete a student:**
  - Use the "Delete" button in the student table to remove a record.