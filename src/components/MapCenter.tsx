import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';

// Frost Bank Tower coordinates
const CENTER: [number, number] = [30.2672, -97.7431];

function MapEffects() {
  const map = useMap();
  
  useEffect(() => {
    // Remove default zoom control styling issues
    map.zoomControl.setPosition('bottomright');
  }, [map]);

  return null;
}

// POI data
const pois = [
  { position: [30.2672, -97.7431] as [number, number], label: 'Objetivo Principal', color: '#ff3344', radius: 8 },
  { position: [30.2690, -97.7410] as [number, number], label: 'Punto Alpha', color: '#00f5ff', radius: 5 },
  { position: [30.2650, -97.7460] as [number, number], label: 'Punto Bravo', color: '#00f5ff', radius: 5 },
  { position: [30.2700, -97.7450] as [number, number], label: 'Punto Charlie', color: '#00d4aa', radius: 5 },
  { position: [30.2640, -97.7400] as [number, number], label: 'Punto Delta', color: '#00f5ff', radius: 4 },
];

export default function MapCenter() {
  const mapRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={mapRef} className="relative flex-1 rounded-lg overflow-hidden border border-cyan-400/20">
      {/* Map */}
      <MapContainer
        center={CENTER}
        zoom={16}
        className="w-full h-full"
        zoomControl={true}
        attributionControl={false}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          maxZoom={19}
        />
        <MapEffects />
        
        {/* POI Markers */}
        {pois.map((poi, i) => (
          <CircleMarker
            key={i}
            center={poi.position}
            radius={poi.radius}
            pathOptions={{
              color: poi.color,
              fillColor: poi.color,
              fillOpacity: 0.3,
              weight: 2,
            }}
          />
        ))}

        {/* Target circle */}
        <CircleMarker
          center={CENTER}
          radius={30}
          pathOptions={{
            color: '#ff3344',
            fillColor: '#ff3344',
            fillOpacity: 0.05,
            weight: 1,
            dashArray: '5, 5',
          }}
        />
      </MapContainer>

      {/* Tactical Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none grid-overlay opacity-50" />
      
      {/* Reticle */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <motion.div
          className="w-32 h-32 border border-cyan-400/20 rounded-full rotate-slow"
          style={{ position: 'absolute' }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-3 bg-cyan-400/40" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-3 bg-cyan-400/40" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-px bg-cyan-400/40" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-px bg-cyan-400/40" />
        </motion.div>
        
        {/* Crosshair */}
        <div className="absolute w-16 h-16">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-4 bg-cyan-400/60" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-4 bg-cyan-400/60" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-px bg-cyan-400/60" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-px bg-cyan-400/60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1 h-1 bg-red-500 rounded-full" style={{ boxShadow: '0 0 6px rgba(255,51,68,0.8)' }} />
          </div>
        </div>
      </div>

      {/* Corner brackets */}
      <div className="absolute top-3 left-3 pointer-events-none">
        <div className="w-6 h-6 border-t-2 border-l-2 border-cyan-400/40" />
      </div>
      <div className="absolute top-3 right-3 pointer-events-none">
        <div className="w-6 h-6 border-t-2 border-r-2 border-cyan-400/40" />
      </div>
      <div className="absolute bottom-3 left-3 pointer-events-none">
        <div className="w-6 h-6 border-b-2 border-l-2 border-cyan-400/40" />
      </div>
      <div className="absolute bottom-3 right-3 pointer-events-none">
        <div className="w-6 h-6 border-b-2 border-r-2 border-cyan-400/40" />
      </div>

      {/* Coordinate label */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 glass-panel px-3 py-1 pointer-events-none">
        <span className="text-[9px] font-mono text-cyan-300/80">
          30°16'01.92"N 97°44'35.16"W
        </span>
      </div>

      {/* Scan line effect */}
      <motion.div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.3), transparent)',
        }}
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />

      {/* Vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(5,8,16,0.6) 100%)',
        }}
      />
    </div>
  );
}
