import { motion } from 'framer-motion';
import { Navigation, MapPin, Layers } from 'lucide-react';
import MiniChart from './MiniChart';

export default function LeftPanel() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="flex flex-col gap-3 w-64 h-full overflow-y-auto pr-1"
    >
      {/* Classification Badge */}
      <div className="glass-panel-bright p-3 corner-decoration" style={{ borderColor: 'rgba(255, 51, 68, 0.4)' }}>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-red-500 rounded-full pulse-rec" />
          <span className="text-[9px] font-bold tracking-widest text-red-400 uppercase">
            Clasificación
          </span>
        </div>
        <div className="bg-red-950/30 border border-red-500/20 rounded px-2 py-1.5 text-center">
          <span className="text-[10px] font-bold text-red-400 tracking-wider">
            ALTO SECRETO // SI-TK // NOFORN
          </span>
        </div>
      </div>

      {/* Scene Selector */}
      <div className="glass-panel p-3">
        <div className="flex items-center gap-2 mb-2">
          <Layers className="w-3 h-3 text-cyan-400" />
          <span className="text-[10px] uppercase tracking-wider text-cyan-300/70 font-medium">Escenas</span>
        </div>
        <div className="space-y-1">
          {['Escena Alpha', 'Escena Bravo', 'Escena Charlie'].map((scene, i) => (
            <motion.div
              key={scene}
              whileHover={{ x: 3 }}
              className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer transition-colors ${
                i === 0 ? 'bg-cyan-400/10 border border-cyan-400/30' : 'hover:bg-cyan-400/5'
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-cyan-400' : 'bg-cyan-400/30'}`} />
              <span className={`text-[10px] ${i === 0 ? 'text-cyan-300' : 'text-cyan-300/50'}`}>{scene}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Coordinates */}
      <div className="glass-panel p-3">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-3 h-3 text-cyan-400" />
          <span className="text-[10px] uppercase tracking-wider text-cyan-300/70 font-medium">Coordenadas</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-cyan-300/50">MGRS</span>
            <span className="text-[10px] font-mono text-cyan-300">14S PL 52743 33519</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-cyan-300/50">LAT</span>
            <span className="text-[10px] font-mono text-cyan-300">30.2672° N</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-cyan-300/50">LON</span>
            <span className="text-[10px] font-mono text-cyan-300">97.7431° W</span>
          </div>
        </div>

        {/* Mini Compass */}
        <div className="flex justify-center mt-3">
          <div className="relative w-14 h-14">
            <svg viewBox="0 0 60 60" className="w-full h-full">
              <circle cx="30" cy="30" r="28" fill="none" stroke="rgba(0,245,255,0.2)" strokeWidth="1" />
              <circle cx="30" cy="30" r="22" fill="none" stroke="rgba(0,245,255,0.1)" strokeWidth="0.5" />
              {/* Cardinal points */}
              <text x="30" y="8" textAnchor="middle" fill="#00f5ff" fontSize="6" fontWeight="bold">N</text>
              <text x="30" y="57" textAnchor="middle" fill="rgba(0,245,255,0.4)" fontSize="5">S</text>
              <text x="5" y="33" textAnchor="middle" fill="rgba(0,245,255,0.4)" fontSize="5">O</text>
              <text x="55" y="33" textAnchor="middle" fill="rgba(0,245,255,0.4)" fontSize="5">E</text>
              {/* Needle */}
              <motion.polygon
                points="30,12 28,30 32,30"
                fill="#ff3344"
                animate={{ rotate: [0, 2, -1, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ transformOrigin: '30px 30px' }}
              />
              <polygon points="30,48 28,30 32,30" fill="rgba(0,245,255,0.4)" />
              <circle cx="30" cy="30" r="2" fill="#00f5ff" />
            </svg>
          </div>
        </div>
      </div>

      {/* Target Summary */}
      <div className="glass-panel p-3">
        <div className="flex items-center gap-2 mb-2">
          <Navigation className="w-3 h-3 text-cyan-400" />
          <span className="text-[10px] uppercase tracking-wider text-cyan-300/70 font-medium">Resumen del Objetivo</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[9px] text-cyan-300/50">Estado</span>
            <span className="text-[9px] font-bold text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded">ACTIVO</span>
          </div>
          
          {/* Progress bar */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-[9px] text-cyan-300/50">Cobertura</span>
              <span className="text-[9px] text-cyan-300">78%</span>
            </div>
            <div className="h-1.5 bg-cyan-950/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '78%' }}
                transition={{ duration: 2, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-cyan-500 to-turquoise rounded-full"
                style={{ boxShadow: '0 0 8px rgba(0, 245, 255, 0.5)' }}
              />
            </div>
          </div>

          {/* Mini chart */}
          <div className="mt-2">
            <span className="text-[9px] text-cyan-300/50 block mb-1">Actividad (24h)</span>
            <MiniChart data={[3, 5, 4, 7, 6, 8, 7, 9, 8, 6, 7, 8, 9, 7, 6, 5, 7, 8, 9, 8, 7, 6, 5, 4]} height={30} width={200} />
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
