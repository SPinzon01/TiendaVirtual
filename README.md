# Proyecto Tienda Electrónica

Este proyecto incluye un backend en Node.js con Express y un ORM Sequelize para la base de datos SQLite y un frontend en React (Vite).

---

## Requisitos

- Node.js (v18 o superior recomendado)
- npm

---

## 1. Backend

### Instalación

```bash
cd Back
npm install
```

### Ejecución

```bash
node run dev
```

El backend corre por defecto en [http://localhost:4000](http://localhost:4000).

**Endpoints principales:**

Base URL: http://localhost:4000/api

**Usuarios (/usuarios)**
| Método     | Ruta     | Descripción                                           |
| ---------- | -------- | ----------------------------------------------------- |
| **POST**   | `/`      | Crea un nuevo usuario (registro).                     |
| **GET**    | `/`      | Obtiene todos los usuarios.                           |
| **GET**    | `/:id`   | Obtiene un usuario por su **ID**.                     |
| **PUT**    | `/:id`   | Actualiza los datos de un usuario existente.          |
| **DELETE** | `/:id`   | Elimina un usuario por su **ID**.                     |
| **POST**   | `/login` | Verifica credenciales de usuario para iniciar sesión. |

**Dispositivos (/devices)**
| Método     | Ruta   | Descripción                                        |
| ---------- | ------ | -------------------------------------------------- |
| **GET**    | `/`    | Lista todos los dispositivos registrados.          |
| **GET**    | `/:id` | Obtiene los datos de un dispositivo por su **ID**. |
| **POST**   | `/`    | Crea un nuevo dispositivo.                         |
| **PUT**    | `/:id` | Actualiza un dispositivo existente.                |
| **DELETE** | `/:id` | Elimina un dispositivo por su **ID**.              |

**Comentarios (/comentarios)**
| Método   | Ruta   | Descripción                                               |
| -------- | ------ | --------------------------------------------------------- |
| **POST** | `/`    | Crea un comentario asociado a un dispositivo.             |
| **GET**  | `/`    | Obtiene todos los comentarios existentes.                 |
| **GET**  | `/:id` | Obtiene los comentarios de un **dispositivo** específico. |

## 2. Frontend

### Instalación

```bash
cd Front
npm install
```

### Ejecución

```bash
npm run dev
```

El frontend corre por defecto en [http://localhost:5173](http://localhost:5173).

---

## Notas

- Asegúrate de que el backend esté corriendo antes de usar el frontend.

---

## Estructura

```
Back/    # Backend (Node.js, Express, Sequelize)
Front/   # Frontend (React, Vite)
Diagrama ER/ Diagrama entidad relación bd.
```

---

## Autor

Sergio Pinzon
