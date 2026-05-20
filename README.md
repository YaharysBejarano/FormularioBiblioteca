# Proyecto UniversidadDevSenior

Este proyecto es una aplicación web para gestionar información de docentes. Está dividido en dos partes principales:

- `client/`: Frontend creado con React.
- `server/`: Backend construido con Express y MySQL.

## Qué hace el proyecto

La aplicación permite trabajar con datos de docentes mediante operaciones básicas de una API REST:

- Obtener la lista de docentes.
- Consultar un docente por su ID.
- Crear un nuevo docente.
- Actualizar los datos de un docente.
- Eliminar un docente.

## Estructura del proyecto

- `client/`: contiene la aplicación React.
  - `src/`: código principal de la interfaz.
  - `public/`: archivos estáticos como `index.html`.
  - `package.json`: dependencias de React y scripts para ejecutar la app.

- `server/`: contiene el servidor Express.
  - `index.js`: define las rutas de la API y el servidor en el puerto `3001`.
  - `db.js`: configura la conexión a la base de datos MySQL.
  - `package.json`: dependencias de Node.js para el backend.

## Tecnologías usadas

- React 19
- Express 5
- MySQL (`mysql2`)
- CORS
- dotenv
- Nodemon (para desarrollo)

## Cómo usarlo

1. Instala dependencias en cada carpeta:

```bash
cd server
npm install

cd ../client
npm install
```

2. Configura la base de datos MySQL:

Crea una base de datos llamada `docentes_db` o ajusta las variables de entorno en un archivo `.env` dentro de `server/`:

```env
DB_HOST=localhost
DB_USSER=root
DB_PASSWORD=admin
DB_NAME=docentes_db
```

> Nota: en `db.js` hay una variable de conexión `DB_USSER` que se usa para el usuario MySQL.

3. Inicia el servidor backend:

```bash
cd server
npm run dev
```

4. Inicia el frontend React:

```bash
cd client
npm start
```

5. Abre la aplicación en tu navegador y consume la API en `http://localhost:3001`.

## Observaciones

- El backend escucha en el puerto `3001`.
- El frontend se puede ejecutar con `npm start` desde la carpeta `client`.
- Asegúrate de tener MySQL en funcionamiento y la base de datos creada.
