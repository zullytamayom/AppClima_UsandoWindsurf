# 🌤️ Clima App - Historias del Clima

Una aplicación web moderna y minimalista que utiliza la API de Open-Meteo para consultar el clima actual de cualquier ciudad del mundo en tiempo real. Construida con JavaScript vanila, modular y con un diseño interactivo estilo *Glassmorphism* (efecto translúcido).

## ✨ Características

- **Geocodificación Integrada:** Transforma el nombre de una ciudad en coordenadas geográficas de forma automática.
- **Manejo de Errores Robustos:** Controla entradas vacías, problemas de conexión a internet y el caso de "ciudad no encontrada".
- **Traducción WMO:** Traduce los códigos climáticos numéricos de la API a descripciones amigables en español.
- **Arquitectura Modular:** Lógica separada por servicios y utilidades bajo el estándar de ECMAScript Modules (`import`/`export`).

## 📁 Estructura del Proyecto

```text
clima-app/
├── package.json
└── public/
    ├── index.html
    ├── style.css
    ├── app.js
    ├── services/
    │   └── weatherService.js
    └── utils/
        └── weatherTranslator.js
