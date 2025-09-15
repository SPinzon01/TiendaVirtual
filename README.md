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
npm run dev
```

El backend corre por defecto en [http://localhost:4000](http://localhost:4000).

**Endpoints principales:**
- `/api/usuarios` (usuarios)
- `/api/devices` (dispositivos)
- `/api/comentarios` (comentarios)

---

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

## Hecho por:

Sergio Pinzon Ramírez
