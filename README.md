# 🛍️ NovaShop — E-commerce

Aplicación de comercio electrónico desarrollada con **Next.js, TypeScript, Redux Toolkit y Tailwind CSS**. Permite explorar un catálogo de productos, gestionar un carrito de compras con persistencia, autenticarse y generar una factura en PDF.

> Proyecto desarrollado para el **Primer Desafío Práctico** de la materia _Diseño y Programación de Software Multiplataforma (DPS)_ — Universidad Don Bosco.

---

## 🔗 Enlaces

- 🌐 **Sitio publicado:** _(pega aquí la URL de Vercel una vez desplegado)_
- 🎥 **Video demostrativo:** _(pega aquí el enlace del video)_

---

## ✨ Características

- 🔐 **Autenticación** de usuarios (registro e inicio de sesión) con validaciones.
- 🛍️ **Catálogo** de 20 productos con **filtrado por categorías**.
- 🖼️ Imágenes optimizadas con **`next/image`**, posicionadas a la izquierda del nombre.
- 🛒 **Carrito de compras**: agregar, incrementar/decrementar cantidades y eliminar (con confirmación).
- 💾 **Persistencia** del carrito y la sesión en **localStorage** (se mantienen al refrescar).
- 🔔 Mensajes de confirmación personalizados con **Sonner** (sin usar `alert`).
- 🧾 **Generación de factura en PDF** tras la compra (con **jsPDF**).
- 📧 **Envío de la factura por correo** (simulado).
- 📱 Diseño **Mobile-First** y totalmente responsivo.

---

## 🧰 Tecnologías

| Herramienta | Uso |
|-------------|-----|
| [Next.js](https://nextjs.org) (App Router) | Framework de React |
| [TypeScript](https://www.typescriptlang.org) | Tipado estático |
| [Redux Toolkit](https://redux-toolkit.js.org) | Gestión de estado global (carrito y sesión) |
| [Tailwind CSS](https://tailwindcss.com) | Estilos y diseño responsivo |
| [Sonner](https://sonner.emilkowal.ski) | Notificaciones |
| [jsPDF](https://github.com/parallax/jsPDF) | Generación de la factura en PDF |

---

## 📁 Estructura del proyecto

```
src/
├── app/                 # Páginas (rutas)
│   ├── page.tsx         # Catálogo (inicio)
│   ├── cart/            # Carrito
│   ├── checkout/        # Pago + factura
│   ├── login/           # Inicio de sesión
│   ├── register/        # Registro
│   └── layout.tsx       # Marco general (Navbar, Provider)
├── components/          # Componentes reutilizables
├── redux/               # Estado global (slices, store, hooks)
├── data/                # products.json (datos estáticos)
├── lib/                 # Lógica auxiliar (productos, auth, factura)
└── types/               # Tipos de TypeScript
```

---

## 🚀 Instalación y ejecución local

### Requisitos previos
- [Node.js](https://nodejs.org) 18 o superior
- npm (incluido con Node.js)

### Pasos

1. Clona el repositorio:
   ```bash
   git clone https://github.com/USUARIO/NOMBRE-REPO.git
   ```

2. Entra a la carpeta del proyecto:
   ```bash
   cd NOMBRE-REPO
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📖 Uso

1. **Explora el catálogo** y filtra por categoría.
2. **Regístrate** o **inicia sesión** desde el menú superior.
3. **Agrega productos** al carrito y ajusta las cantidades.
4. Ve al **carrito** y luego a **Proceder al pago**.
5. **Confirma la compra**: se genera y descarga la **factura en PDF**.
6. **Envía la factura por correo** desde la pantalla de confirmación.

---

## ☁️ Despliegue

El proyecto está desplegado en **Vercel** con integración continua desde GitHub: cada `push` a la rama principal genera un nuevo despliegue automáticamente.

Para desplegar tu propia copia:
1. Sube el proyecto a un repositorio de GitHub.
2. Entra a [vercel.com](https://vercel.com) e inicia sesión con GitHub.
3. Importa el repositorio y presiona **Deploy**. Vercel detecta Next.js automáticamente.

---

## 📝 Nota

Según los lineamientos del desafío, los datos y funcionalidades están **simulados** mediante archivos JSON estáticos y `localStorage` (catálogo, usuarios, carrito y sesión). El envío de la factura por correo también es simulado.

---

## 👤 Autor

Desarrollado por **Miguel Ignacio Peña Ayala** — Universidad Don Bosco.
