import { motion } from 'framer-motion';
import { Filter, Link, Crosshair, Compass, Globe, Shield } from 'lucide-react';

export default function Header() {
  const tools = [
    { icon: Filter, label: 'Filtros' },
    { icon: Link, label: 'Enlace' },
    { icon: Crosshair, label: 'Objetivo' },
    { icon: Compass, label: 'Brújula' },
    { icon: Globe, label: 'Vista Global' },
  ];

  return (
    <header className="relative z-20 flex items-center justify-between px-4 py-2">
      {/* Left - Title */}
      <div className="flex items-center gap-3">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <Shield className="w-5 h-5 text-cyan-400" style={{ filter: 'drop-shadow(0 0 4px rgba(0,245,255,0.6))' }} />
          <div>
            <h1 className="text-lg font-black tracking-wider neon-text uppercase leading-tight">
              Visión de Dios
            </h1>
            <p className="text-[8px] tracking-[0.3em] text-cyan-300/50 uppercase">
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
        className="glass-panel px-3 py-1.5 flex items-center gap-1"
      >
        {tools.map((tool, i) => (
          <motion.button
            key={tool.label}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative group p-2 rounded-md hover:bg-cyan-400/10 transition-colors"
            title={tool.label}
          >
            <tool.icon className="w-4 h-4 text-cyan-300/70 group-hover:text-cyan-300 transition-colors" />
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
        <div className="glass-panel px-3 py-1.5 flex items-center gap-2">
          <span className="text-[9px] uppercase tracking-wider text-cyan-300/60">Estilo Activo:</span>
          <span className="text-[10px] font-bold text-cyan-300">NORMAL</span>
          <div className="flex gap-0.5 ml-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0.3 }}
                animate={{ scaleY: [0.3, 1, 0.5, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
                className="w-1 h-4 bg-cyan-400 rounded-full origin-bottom"
                style={{ opacity: 0.5 + i * 0.1 }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </header>
  );
}
