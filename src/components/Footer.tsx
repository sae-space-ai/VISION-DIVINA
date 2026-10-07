import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mic, MicOff, Palette, Radio } from 'lucide-react';

export default function Footer() {
  const [micOn, setMicOn] = useState(false);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="relative z-20 flex items-center justify-between px-4 py-3"
    >
      {/* Location Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="glass-panel px-5 py-2.5 flex items-center gap-2 hover:bg-cyan-400/10 transition-colors group"
      >
        <MapPin className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300 transition-colors" 
          style={{ filter: 'drop-shadow(0 0 3px rgba(0,245,255,0.5))' }}
        />
        <span className="text-[10px] uppercase tracking-wider text-cyan-300 font-medium">Ubicación</span>
      </motion.button>

      {/* Microphone Control */}
      <div className="glass-panel-bright px-6 py-2.5 flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setMicOn(!micOn)}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg transition-all ${
            micOn 
              ? 'bg-cyan-400/20 border border-cyan-400/40 shadow-[0_0_10px_rgba(0,245,255,0.2)]' 
              : 'bg-transparent border border-cyan-400/10'
          }`}
        >
          {micOn ? (
            <Mic className="w-4 h-4 text-cyan-400" style={{ filter: 'drop-shadow(0 0 4px rgba(0,245,255,0.6))' }} />
          ) : (
            <MicOff className="w-4 h-4 text-cyan-300/50" />
          )}
          <span className={`text-[10px] uppercase tracking-wider font-medium ${
            micOn ? 'text-cyan-300' : 'text-cyan-300/50'
          }`}>
            Micrófono: {micOn ? 'ENCENDIDO' : 'APAGADO'}
          </span>
        </motion.button>

        {/* Audio Visualizer */}
        <div className="flex items-center gap-1 h-8">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-1 rounded-full ${micOn ? 'bg-cyan-400' : 'bg-cyan-400/20'}`}
              animate={micOn ? {
                height: ['4px', `${8 + Math.random() * 20}px`, '4px'],
              } : { height: '4px' }}
              transition={micOn ? {
                duration: 0.3 + Math.random() * 0.3,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: i * 0.05,
              } : {}}
              style={{
                boxShadow: micOn ? '0 0 4px rgba(0,245,255,0.5)' : 'none',
              }}
            />
          ))}
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ 
              backgroundColor: micOn ? '#00ff88' : '#ff3344',
              boxShadow: micOn ? '0 0 8px rgba(0,255,136,0.6)' : '0 0 8px rgba(255,51,68,0.6)',
            }}
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-[9px] text-cyan-300/60 uppercase tracking-wider">
            {micOn ? 'Transmitiendo' : 'En espera'}
          </span>
        </div>
      </div>

      {/* Visual Presets Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="glass-panel px-5 py-2.5 flex items-center gap-2 hover:bg-cyan-400/10 transition-colors group"
      >
        <Palette className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300 transition-colors" 
          style={{ filter: 'drop-shadow(0 0 3px rgba(0,245,255,0.5))' }}
        />
        <span className="text-[10px] uppercase tracking-wider text-cyan-300 font-medium">Ajustes Visuales</span>
      </motion.button>
    </motion.footer>
  );
}
