# 🏡 Visualizador de Propiedades Inmobiliarias

Este proyecto es una aplicación desarrollada con **Next.js + TypeScript** que permite visualizar propiedades disponibles, buscar, filtrar, marcar como favoritas y ver recomendaciones similares.

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── ListaPropiedades.tsx      # Componente que renderiza el listado con búsqueda, paginación y favoritos
│   │   ├── NavBar.tsx                # Navegación principal
│   │   └── PropiedadCard.tsx         # Tarjeta individual de propiedad
│   ├── favoritos/
│   │   └── page.tsx                  # Página para mostrar las propiedades favoritas
│   ├── hooks/
│   │   └── useFavoritos.ts           # Hook personalizado para manejar favoritos en localStorage
│   ├── lib/
│   │   └── recomendaciones.ts        # Lógica para calcular recomendaciones similares
│   ├── propiedad/
│   │   └── [id]/page.tsx             # Página de detalle para una propiedad individual
│   ├── types/
│   │   └── propiedad.ts              # Tipado de la entidad Propiedad
│   ├── layout.tsx                    # Layout principal de la aplicación
│   └── page.tsx                      # Página principal
├── public/
│   └── data/
│       └── properties_mock_100_clean.json  # Archivo JSON de propiedades
└── styles/
    └── globals.css                   # Estilos globales
```

---

## 🧩 Funcionalidades principales

✅ Listado de propiedades paginado  
✅ Filtro por texto (ciudad, tipo, título)  
✅ Vista de detalle por propiedad  
✅ Recomendaciones similares (misma ciudad, tipo, precio ±20%)  
✅ Marcar propiedades como favoritas (persistencia con `localStorage`)  
✅ Página dedicada a favoritos  
✅ UI moderna y responsive con animaciones

---

## 🛠️ Instalación y uso

```bash
pnpm install
pnpm run dev
```

La app se ejecutará en `http://localhost:3000`

---

## 📦 Datos

Los datos están disponibles en `public/data/properties_mock_100_clean.json`, y se consumen mediante `fetch` desde varias rutas.

---

## 📌 Consideraciones técnicas

- Los datos favoritos se almacenan en `localStorage` bajo la clave `"favoritos"`.
- `useFavoritos.ts` contiene toda la lógica de lectura/escritura reactiva.
- La lógica de recomendación se encuentra en `lib/recomendaciones.ts`.
- Todo el proyecto está tipado con TypeScript.
- Se usa enfoque modular y componentes reutilizables.

---

## ✨ Mejoras futuras sugeridas

- Guardar favoritos en backend o persistencia de sesión
- Añadir filtrado por rango de precios
- Paginación con scroll infinito
- Test unitarios con Jest o React Testing Library
- Responsive completo para móviles

---

## 🧑‍💻 Autor Iham Vivanco

Proyecto realizado como parte de una prueba técnica o desafío de alt 94
