# 🚀 GUÍA RÁPIDA - VISIÓN DE DIOS

## ✅ La aplicación ya está funcionando

El dashboard está completamente funcional con **Leaflet + ArcGIS World Imagery** (sin necesidad de tokens).

### Para ejecutar:

```bash
npm run dev
```

Luego abre tu navegador en: `http://localhost:3000`

---

## 🗺️ Sobre el Mapa

### Opción Actual: Leaflet (Recomendado)
- ✅ Funciona inmediatamente sin configuración
- ✅ Sin necesidad de tokens o registros
- ✅ Mapa satelital de alta calidad (ArcGIS)
- ✅ Rendimiento óptimo

### Opción Alternativa: CesiumJS (Mapa 3D Avanzado)
Si quieres un mapa 3D con terreno y vistas más inmersivas:

1. **Regístrate gratis** en https://cesium.com/ion/
2. **Copia tu token** desde "Access Tokens"
3. **Crea el archivo `.env`** en la raíz del proyecto:
   ```
   VITE_CESIUM_TOKEN=tu_token_aqui
   ```
4. **Instala el plugin de Vite**:
   ```bash
   npm install -D vite-plugin-cesium
   ```
5. **Edita `vite.config.js`** y agrega el plugin:
   ```javascript
   import cesium from 'vite-plugin-cesium';
   
   export default defineConfig({
     plugins: [react(), tailwindcss(), cesium()],
     // ... resto del código
   });
   ```
6. **Cambia el componente del mapa**:
   - Renombra `src/components/MapCenter.tsx` → `MapCenter.leaflet.tsx`
   - Renombra `src/components/MapCenterCesium.tsx` → `MapCenter.tsx`
   - Descomenta el código de Cesium dentro del componente

⚠️ **Nota**: CesiumJS es una librería pesada (~50MB). El primer build puede ser lento.

---

## 🎨 Características del Dashboard

### Cabecera Superior
- **Título**: "VISIÓN DE DIOS" con efecto neón
- **Subtítulo**: "Ningún lugar queda atrás"
- **Barra de herramientas**: Filtros, Enlace, Objetivo, Brújula, Vista Global
- **Indicador de estilo**: NORMAL con barras de señal animadas

### Panel Izquierdo
- **Clasificación**: ALTO SECRETO // SI-TK // NOFORN
- **Selector de escenas**: Alpha, Bravo, Charlie
- **Coordenadas**: MGRS, LAT, LON con brújula animada
- **Resumen del objetivo**: Estado, cobertura, gráfico de actividad

### Panel Central (Mapa)
- **Mapa satelital** interactivo
- **Retícula táctica** con anillos rotativos
- **Puntos de interés** (POIs) con tooltips
- **Objetivo principal** marcado en rojo
- **Efectos HUD**: scan line, viñeta, esquinas biseladas

### Panel Derecho
- **Indicador REC** con fecha/hora
- **Datos orbitales**: Órbita 147, Pase 23
- **Gráfico de telemetría orbital**
- **Botones de contexto**: Contactos, Misiones Espaciales
- **Medidores circulares**: GSD, ALT, SOL, AIS
- **Calidad de señal**: 96% con visualizador

### Pie de Página
- **Botón Ubicación**
- **Control de micrófono** con visualizador de audio
- **Botón Ajustes Visuales**

---

## 🐛 Solución de Problemas Comunes

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

### El mapa aparece en negro o con marca de agua
- Si usas **Leaflet**: No debería pasar (funciona sin token)
- Si usas **CesiumJS**: Necesitas configurar el token en `.env`

### CesiumJS no carga después de configurar el token
1. Verifica que el token esté en `.env` (sin comillas)
2. Verifica que `vite-plugin-cesium` esté instalado
3. Reinicia el servidor: `Ctrl+C` y luego `npm run dev`
4. Limpia la caché del navegador: `Ctrl+Shift+R`

---

## 📊 Coordenadas del Objetivo

- **Ubicación**: Frost Bank Tower, Austin, TX
- **Latitud**: 30°16'01.92"N (30.2672)
- **Longitud**: 97°44'35.16"W (-97.7431)
- **Altitud del satélite**: 620 km

---

## 🎯 Próximos Pasos

1. **Explora la interfaz**: Haz clic en los botones, mueve el mapa
2. **Prueba el micrófono**: Activa/desactiva el visualizador de audio
3. **Personaliza**: Modifica colores, coordenadas, POIs en los componentes
4. **Agrega más datos**: Conecta APIs reales para telemetría en tiempo real

---

## 📚 Documentación Adicional

- **README.md**: Documentación completa del proyecto
- **Código fuente**: Revisa los componentes en `src/components/`
- **MapCenterCesium.tsx**: Instrucciones detalladas para configurar CesiumJS

---

**¡Disfruta tu dashboard táctico!** 🛰️

*VISIÓN DE DIOS - Ningún lugar queda atrás*
