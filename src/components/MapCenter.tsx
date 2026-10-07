import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, CircleMarker, useMap, Tooltip } from 'react-leaflet';
import L from 'leaflet';

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;

// Frost Bank Tower coordinates
const CENTER: [number, number] = [30.2672, -97.7431];

function MapController() {
  const map = useMap();
  
  useEffect(() => {
    map.zoomControl.setPosition('bottomright');
    // Force a resize after mount to fix rendering
    setTimeout(() => map.invalidateSize(), 100);
  }, [map]);

  return null;
}

// POI data
const pois = [
  { position: [30.2672, -97.7431] as [number, number], label: 'Objetivo Principal', color: '#ff3344', radius: 10, pulse: true },
  { position: [30.2690, -97.7410] as [number, number], label: 'Punto Alpha', color: '#00f5ff', radius: 6, pulse: false },
  { position: [30.2650, -97.7460] as [number, number], label: 'Punto Bravo', color: '#00f5ff', radius: 6, pulse: false },
  { position: [30.2700, -97.7450] as [number, number], label: 'Punto Charlie', color: '#00d4aa', radius: 6, pulse: false },
  { position: [30.2640, -97.7400] as [number, number], label: 'Punto Delta', color: '#00f5ff', radius: 5, pulse: false },
  { position: [30.2680, -97.7380] as [number, number], label: 'Punto Echo', color: '#00d4aa', radius: 5, pulse: false },
];

function PulsingCircle({ position, color }: { position: [number, number]; color: string }) {
  return (
    <>
      <CircleMarker
        center={position}
        radius={20}
        pathOptions={{
          color: color,
          fillColor: color,
          fillOpacity: 0.05,
          weight: 1,
          dashArray: '4, 4',
        }}
      />
      <CircleMarker
        center={position}
        radius={12}
        pathOptions={{
          color: color,
          fillColor: color,
          fillOpacity: 0.1,
          weight: 1,
        }}
      />
    </>
  );
}

export default function MapCenter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Ensure map renders after container is sized
    const timer = setTimeout(() => setMapLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full rounded-lg overflow-hidden border border-cyan-400/20">
      {/* Map */}
      {mapLoaded && (
        <MapContainer
          center={CENTER}
          zoom={16}
          className="w-full h-full z-0"
          zoomControl={true}
          attributionControl={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            maxZoom={19}
          />
          <MapController />
          
          {/* POI Markers */}
          {pois.map((poi, i) => (
            <CircleMarker
              key={i}
              center={poi.position}
              radius={poi.radius}
              pathOptions={{
                color: poi.color,
                fillColor: poi.color,
                fillOpacity: 0.4,
                weight: 2,
              }}
            >
              <Tooltip
                direction="top"
                offset={[0, -10]}
                className="bg-black/80 text-cyan-300 border-cyan-400/30 text-[10px] font-mono"
              >
                {poi.label}
              </Tooltip>
            </CircleMarker>
          ))}

          {/* Pulsing rings around main target */}
          <PulsingCircle position={CENTER} color="#ff3344" />

          {/* Target outer ring */}
          <CircleMarker
            center={CENTER}
            radius={40}
            pathOptions={{
              color: '#ff3344',
              fillColor: 'transparent',
              fillOpacity: 0,
              weight: 1,
              dashArray: '8, 4',
            }}
          />
        </MapContainer>
      )}

      {/* Dark overlay for map integration */}
      <div 
        className="absolute inset-0 pointer-events-none z-[400]"
        style={{
          background: 'linear-gradient(180deg, rgba(5,8,16,0.3) 0%, transparent 20%, transparent 80%, rgba(5,8,16,0.3) 100%)',
          mixBlendMode: 'multiply',
        }}
      />

      {/* Color filter to make map darker/more cyan */}
      <div 
        className="absolute inset-0 pointer-events-none z-[401] opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,20,40,0.2) 0%, rgba(5,8,16,0.5) 100%)',
        }}
      />

      {/* Tactical Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none z-[402] grid-overlay opacity-40" />
      
      {/* Reticle */}
      <div className="absolute inset-0 pointer-events-none z-[403] flex items-center justify-center">
        {/* Outer rotating ring */}
        <motion.div
          className="w-40 h-40 rounded-full border border-cyan-400/15"
          style={{ position: 'absolute' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-4 bg-cyan-400/40" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-4 bg-cyan-400/40" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-px bg-cyan-400/40" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-px bg-cyan-400/40" />
        </motion.div>

        {/* Inner counter-rotating ring */}
        <motion.div
          className="w-24 h-24 rounded-full border border-cyan-400/10"
          style={{ position: 'absolute' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {[0, 90, 180, 270].map(deg => (
            <div
              key={deg}
              className="absolute w-1.5 h-1.5 bg-cyan-400/30 rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${deg}deg) translateY(-48px) translate(-50%, -50%)`,
              }}
            />
          ))}
        </motion.div>
        
        {/* Crosshair */}
        <div className="absolute w-20 h-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-5 bg-cyan-400/60" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-5 bg-cyan-400/60" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-px bg-cyan-400/60" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-px bg-cyan-400/60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-1.5 h-1.5 bg-red-500 rounded-full"
              style={{ boxShadow: '0 0 8px rgba(255,51,68,0.8)' }}
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </div>

      {/* Corner brackets */}
      <div className="absolute top-3 left-3 pointer-events-none z-[404]">
        <div className="w-8 h-8 border-t-2 border-l-2 border-cyan-400/40" />
      </div>
      <div className="absolute top-3 right-3 pointer-events-none z-[404]">
        <div className="w-8 h-8 border-t-2 border-r-2 border-cyan-400/40" />
      </div>
      <div className="absolute bottom-3 left-3 pointer-events-none z-[404]">
        <div className="w-8 h-8 border-b-2 border-l-2 border-cyan-400/40" />
      </div>
      <div className="absolute bottom-3 right-3 pointer-events-none z-[404]">
        <div className="w-8 h-8 border-b-2 border-r-2 border-cyan-400/40" />
      </div>

      {/* Coordinate label */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-panel px-4 py-1.5 pointer-events-none z-[405]">
        <span className="text-[10px] font-mono text-cyan-300/80 tracking-wider">
          30°16'01.92"N &nbsp; 97°44'35.16"W
        </span>
      </div>

      {/* Map info overlay top-left */}
      <div className="absolute top-4 left-4 pointer-events-none z-[405]">
        <div className="glass-panel px-2 py-1">
          <span className="text-[8px] font-mono text-cyan-400/60 tracking-wider">SAT-VIEW // LIVE</span>
        </div>
      </div>

      {/* Map info overlay top-right */}
      <div className="absolute top-4 right-4 pointer-events-none z-[405]">
        <div className="glass-panel px-2 py-1 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full" style={{ boxShadow: '0 0 4px rgba(0,255,136,0.6)' }} />
          <span className="text-[8px] font-mono text-green-400/80 tracking-wider">SEÑAL ACTIVA</span>
        </div>
      </div>

      {/* Scan line effect */}
      <motion.div
        className="absolute left-0 right-0 h-px pointer-events-none z-[406]"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.4), transparent)',
        }}
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
      />

      {/* Vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-[407]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,8,16,0.7) 100%)',
        }}
      />
    </div>
  );
}
