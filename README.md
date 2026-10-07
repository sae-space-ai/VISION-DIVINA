# 🛰️ VISIÓN DE DIOS - Sistema de Vigilancia Táctica

Dashboard HUD futurista estilo "God's Eye View" con mapa satelital interactivo, construido con React + Vite + TailwindCSS.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build
```

## 🗺️ Configuración del Mapa

### Opción 1: Leaflet (Por Defecto - Sin Token)
El proyecto usa **Leaflet + ArcGIS World Imagery** que funciona sin configuración adicional. Simplemente ejecuta `npm run dev` y el mapa cargará automáticamente.

### Opción 2: CesiumJS (Mapa 3D de Alta Resolución)
Si quieres usar CesiumJS para un mapa satelital 3D más avanzado:

1. **Regístrate en Cesium ion**: https://cesium.com/ion/ (gratis)
2. **Obtén tu token**: Ve a "Access Tokens" → copia tu "Default Token"
3. **Crea el archivo `.env`** en la raíz del proyecto:
   ```
   VITE_CESIUM_TOKEN=tu_token_aqui
   ```
4. **Instala el plugin de Vite**:
   ```bash
   npm install -D vite-plugin-cesium
   ```
5. **Actualiza `vite.config.js`**:
   ```js
   import cesium from 'vite-plugin-cesium';
   
   export default defineConfig({
     plugins: [react(), tailwindcss(), cesium()],
     // ...
   });
   ```
6. **Reemplaza el componente del mapa**:
   - Renombra `MapCenter.tsx` → `MapCenter.leaflet.tsx`
   - Renombra `MapCenterCesium.tsx` → `MapCenter.tsx`
   - Descomenta el código de Cesium en `MapCenter.tsx`

## 🎨 Características

- ✅ Interfaz HUD futurista con glassmorphism y efectos neón
- ✅ Mapa satelital interactivo (Leaflet o CesiumJS)
- ✅ Medidores circulares SVG animados
- ✅ Gráficos de telemetría en tiempo real
- ✅ Retícula táctica con animaciones
- ✅ Visualizador de audio animado
- ✅ Brújula interactiva
- ✅ 100% en español
- ✅ Diseño responsivo

## 🛠️ Stack Tecnológico

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **TailwindCSS 4** (estilos)
- **Framer Motion** (animaciones)
- **Leaflet** / **CesiumJS** (mapas)
- **Recharts** (gráficos)
- **Lucide React** (iconos)

## 📁 Estructura de Componentes

```
src/
├── App.tsx                    # Layout principal
├── components/
│   ├── Header.tsx             # Cabecera con título y toolbar
│   ├── LeftPanel.tsx          # Panel de metadatos
│   ├── RightPanel.tsx         # Panel de telemetría
│   ├── MapCenter.tsx          # Mapa central (Leaflet)
│   ├── MapCenterCesium.tsx    # Mapa alternativo (CesiumJS)
│   ├── Footer.tsx             # Controles inferiores
│   ├── Gauge.tsx              # Medidor circular
│   └── MiniChart.tsx          # Gráfico de líneas mini
```

## 🎯 Coordenadas del Objetivo

- **Ubicación**: Frost Bank Tower, Austin, TX
- **Latitud**: 30°16'01.92"N
- **Longitud**: 97°44'35.16"W

## 🐛 Solución de Problemas

### Error: "Cannot find module..."
```bash
npm install
```

### Error: Puerto en uso (EADDRINUSE)
```bash
npm run dev -- --port 3001
```

### Error: Estilos de Tailwind no se aplican
Verifica que `src/index.css` contenga:
```css
@import "tailwindcss";
```

### Error: CesiumJS no carga el mapa
- Verifica que el token esté en `.env`
- Verifica que `vite-plugin-cesium` esté instalado
- Reinicia el servidor de desarrollo

## 📝 Licencia

Proyecto de demostración. Todos los derechos reservados.

---

**VISIÓN DE DIOS** - *Ningún lugar queda atrás* 🛰️
