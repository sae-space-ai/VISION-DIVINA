import { motion } from 'framer-motion';
import { Filter, Link, Crosshair, Compass, Globe, Shield, Activity } from 'lucide-react';

export default function Header() {
  const tools = [
    { icon: Filter, label: 'Filtros' },
    { icon: Link, label: 'Enlace' },
    { icon: Crosshair, label: 'Objetivo' },
    { icon: Compass, label: 'Brújula' },
    { icon: Globe, label: 'Vista Global' },
  ];

  return (
    <header className="relative z-20 flex items-center justify-between px-4 py-3">
      {/* Left - Title */}
      <div className="flex items-center gap-3">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          {/* Icono de radar animado */}
          <motion.div 
            className="w-10 h-10 rounded-full border-2 border-cyan-500/50 flex items-center justify-center bg-cyan-900/20"
            style={{ boxShadow: '0 0 15px rgba(0,245,255,0.3)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <Activity className="w-5 h-5 text-cyan-400" style={{ filter: 'drop-shadow(0 0 4px rgba(0,245,255,0.6))' }} />
          </motion.div>
          <div>
            <h1 className="text-xl font-black tracking-wider neon-text uppercase leading-tight">
              Visión de Dios
            </h1>
            <p className="text-[9px] tracking-[0.3em] text-cyan-300/50 uppercase">
              Ningún lugar queda atrás
            </p>
          </div>
        </motion.div>
      </div>

      {/* Center - Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel px-4 py-2 flex items-center gap-1"
        style={{ borderRadius: '999px' }}
      >
        {tools.map((tool, i) => (
          <motion.button
            key={tool.label}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="relative group p-2 rounded-full hover:bg-cyan-400/10 transition-colors"
            title={tool.label}
          >
            <tool.icon className="w-4 h-4 text-cyan-300/70 group-hover:text-cyan-300 transition-colors" 
              style={{ filter: 'drop-shadow(0 0 2px rgba(0,245,255,0.3))' }}
            />
            {i === 2 && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full pulse-rec" />
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Right - Status */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3"
      >
        <div className="glass-panel px-4 py-2 flex items-center gap-3">
          <div className="text-right">
            <span className="text-[8px] uppercase tracking-wider text-cyan-300/50 block">Estilo Activo</span>
            <span className="text-[11px] font-bold text-cyan-300 tracking-wider" 
              style={{ textShadow: '0 0 8px rgba(0,245,255,0.5)' }}>
              NORMAL
            </span>
          </div>
          <div className="flex gap-0.5 ml-2 h-6 items-end">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0.3 }}
                animate={{ scaleY: [0.3, 1, 0.5, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
                className="w-1 bg-cyan-400 rounded-full origin-bottom"
                style={{ 
                  opacity: 0.5 + i * 0.1,
                  boxShadow: '0 0 4px rgba(0,245,255,0.5)',
                  height: `${(i + 1) * 20}%`
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </header>
  );
}
