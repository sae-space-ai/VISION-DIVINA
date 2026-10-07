/**
 * COMPONENTE ALTERNATIVO: MapCenter con CesiumJS
 * 
 * INSTRUCCIONES DE USO:
 * 1. Regístrate en https://cesium.com/ion/ (gratis)
 * 2. Obtén tu "Default Access Token"
 * 3. Crea un archivo .env en la raíz del proyecto con:
 *    VITE_CESIUM_TOKEN=tu_token_aqui
 * 4. Descomenta el código abajo y reemplaza MapCenter.tsx con este archivo
 * 5. Instala el plugin: npm install -D vite-plugin-cesium
 * 6. Agrega el plugin a vite.config.js:
 *    import cesium from 'vite-plugin-cesium';
 *    plugins: [react(), tailwindcss(), cesium()]
 */

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// IMPORTS DE CESIUM (descomentar cuando esté configurado)
// import * as Cesium from 'cesium';
// import 'cesium/Build/Cesium/Widgets/widgets.css';

export default function MapCenterCesium() {
  const cesiumContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // CONFIGURACIÓN DE CESIUM (descomentar cuando esté listo)
    /*
    // 1. Configurar el token de Cesium ion
    Cesium.Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_TOKEN || 'TU_TOKEN_AQUI';

    // 2. Inicializar el Visor de Cesium
    if (cesiumContainer.current) {
      const viewer = new Cesium.Viewer(cesiumContainer.current, {
        terrainProvider: Cesium.createWorldTerrain(),
        baseLayerPicker: false,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        navigationHelpButton: false,
        animation: false,
        timeline: false,
        fullscreenButton: false,
        infoBox: false,
      });

      // 3. Volar a las coordenadas (Frost Bank Tower, Austin, TX)
      // Coordenadas: 30°16'01.92"N 97°44'35.16"W
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(-97.7431, 30.2672, 1500.0),
        orientation: {
          heading: Cesium.Math.toRadians(0.0),
          pitch: Cesium.Math.toRadians(-45.0),
          roll: 0.0,
        },
      });

      // 4. Añadir marcadores tácticos
      const pois = [
        { position: [-97.7431, 30.2672], label: 'Objetivo Principal', color: Cesium.Color.RED },
        { position: [-97.7410, 30.2690], label: 'Punto Alpha', color: Cesium.Color.CYAN },
        { position: [-97.7460, 30.2650], label: 'Punto Bravo', color: Cesium.Color.CYAN },
        { position: [-97.7450, 30.2700], label: 'Punto Charlie', color: Cesium.Color.LIME },
      ];

      pois.forEach((poi, index) => {
        viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(poi.position[0], poi.position[1]),
          point: {
            pixelSize: 10,
            color: poi.color,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 2,
          },
          label: {
            text: poi.label,
            font: '12px monospace',
            fillColor: Cesium.Color.CYAN,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 2,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            pixelOffset: new Cesium.Cartesian2(0, -15),
          },
        });
      });

      // Limpieza al desmontar
      return () => {
        if (!viewer.isDestroyed()) {
          viewer.destroy();
        }
      };
    }
    */
  }, []);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden border border-cyan-400/20">
      {/* Contenedor del mapa de Cesium */}
      <div ref={cesiumContainer} className="w-full h-full bg-[#050810]" />
      
      {/* Mensaje de configuración */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="glass-panel p-6 text-center max-w-md">
          <p className="text-cyan-300 text-sm mb-2">🗺️ CesiumJS requiere configuración</p>
          <p className="text-cyan-300/60 text-xs mb-4">
            Para habilitar el mapa satelital 3D de alta resolución, sigue las instrucciones en el código fuente.
          </p>
          <p className="text-cyan-400/80 text-xs font-mono">
            Mientras tanto, usando Leaflet como fallback
          </p>
        </div>
      </div>

      {/* Capa de superposición para la retícula táctica (HUD) */}
      <div 
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.6) 100%)',
        }}
      />
      
      {/* Bordes tácticos */}
      <div className="absolute inset-0 pointer-events-none border border-cyan-500/20 z-30 m-4 rounded-xl" />
    </div>
  );
}
