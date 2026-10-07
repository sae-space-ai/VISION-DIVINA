import { motion } from 'framer-motion';
import { Radio, Users, Rocket } from 'lucide-react';
import Gauge from './Gauge';
import MiniChart from './MiniChart';

export default function RightPanel() {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const timeStr = now.toTimeString().split(' ')[0];

  return (
    <motion.aside
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="flex flex-col gap-3 w-64 h-full overflow-y-auto pl-1"
    >
      {/* REC Indicator */}
      <div className="glass-panel-bright p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full pulse-rec" />
            <span className="text-[10px] font-bold neon-text-red tracking-wider">REC</span>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-mono text-cyan-300">{dateStr}</div>
            <div className="text-[9px] font-mono text-cyan-300/60">{timeStr} UTC</div>
          </div>
        </div>
      </div>

      {/* Orbital Data */}
      <div className="glass-panel p-3">
        <div className="flex items-center gap-2 mb-2">
          <Radio className="w-3 h-3 text-cyan-400" />
          <span className="text-[10px] uppercase tracking-wider text-cyan-300/70 font-medium">Datos Orbitales</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-cyan-950/20 rounded p-2 text-center">
            <div className="text-[8px] text-cyan-300/50 uppercase">Órbita</div>
            <div className="text-sm font-bold text-cyan-300 font-mono">147</div>
          </div>
          <div className="bg-cyan-950/20 rounded p-2 text-center">
            <div className="text-[8px] text-cyan-300/50 uppercase">Pase</div>
            <div className="text-sm font-bold text-cyan-300 font-mono">23</div>
          </div>
        </div>

        {/* Orbital chart */}
        <div>
          <span className="text-[9px] text-cyan-300/50 block mb-1">Telemetría Orbital</span>
          <MiniChart 
            data={[120, 135, 140, 138, 142, 145, 147, 148, 147, 150, 148, 147]} 
            color="#00d4aa" 
            height={35} 
            width={200} 
          />
        </div>
      </div>

      {/* Context Panel */}
      <div className="glass-panel p-3">
        <span className="text-[10px] uppercase tracking-wider text-cyan-300/70 font-medium block mb-2">Contexto</span>
        <div className="grid grid-cols-2 gap-2">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-cyan-400/5 border border-cyan-400/20 hover:bg-cyan-400/10 transition-colors"
          >
            <Users className="w-5 h-5 text-cyan-400" />
            <span className="text-[9px] text-cyan-300 uppercase tracking-wider">Contactos</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-cyan-400/5 border border-cyan-400/20 hover:bg-cyan-400/10 transition-colors"
          >
            <Rocket className="w-5 h-5 text-cyan-400" />
            <span className="text-[9px] text-cyan-300 uppercase tracking-wider">Misiones</span>
          </motion.button>
        </div>
      </div>

      {/* Telemetry Gauges */}
      <div className="glass-panel p-3">
        <span className="text-[10px] uppercase tracking-wider text-cyan-300/70 font-medium block mb-3">Telemetría</span>
        <div className="grid grid-cols-4 gap-2">
          <Gauge value={0.31} max={1} label="GSD" unit="m" optimal={true} size={60} />
          <Gauge value={620} max={800} label="ALT" unit="km" optimal={true} size={60} />
          <Gauge value={42} max={90} label="SOL" unit="°" optimal={true} size={60} />
          <Gauge value={2.1} max={5} label="AIS" unit="ms" optimal={false} size={60} />
        </div>
      </div>

      {/* Signal Quality */}
      <div className="glass-panel p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase tracking-wider text-cyan-300/70 font-medium">Calidad de Señal</span>
          <span className="text-[10px] font-bold text-green-400">96%</span>
        </div>
        <div className="flex gap-0.5 h-6 items-end">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${30 + Math.random() * 70}%` }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="flex-1 bg-gradient-to-t from-cyan-500 to-turquoise rounded-sm"
              style={{ opacity: 0.4 + (i / 20) * 0.6 }}
            />
          ))}
        </div>
      </div>
    </motion.aside>
  );
}
