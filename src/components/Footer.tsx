import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mic, MicOff, Palette } from 'lucide-react';

export default function Footer() {
  const [micOn, setMicOn] = useState(false);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="relative z-20 flex items-center justify-between px-4 py-2"
    >
      {/* Location Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="glass-panel px-4 py-2 flex items-center gap-2 hover:bg-cyan-400/10 transition-colors"
      >
        <MapPin className="w-4 h-4 text-cyan-400" />
        <span className="text-[10px] uppercase tracking-wider text-cyan-300 font-medium">Ubicación</span>
      </motion.button>

      {/* Microphone Control */}
      <div className="glass-panel-bright px-5 py-2 flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setMicOn(!micOn)}
          className={`flex items-center gap-2 px-3 py-1 rounded-md transition-colors ${
            micOn ? 'bg-cyan-400/20 border border-cyan-400/40' : 'bg-transparent border border-cyan-400/10'
          }`}
        >
          {micOn ? (
            <Mic className="w-4 h-4 text-cyan-400" />
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
        <div className="flex items-center gap-0.5 h-6">
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-1 rounded-full ${micOn ? 'bg-cyan-400' : 'bg-cyan-400/20'}`}
              animate={micOn ? {
                height: ['4px', `${8 + Math.random() * 16}px`, '4px'],
              } : { height: '4px' }}
              transition={micOn ? {
                duration: 0.4 + Math.random() * 0.4,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: i * 0.08,
              } : {}}
            />
          ))}
        </div>
      </div>

      {/* Visual Presets Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="glass-panel px-4 py-2 flex items-center gap-2 hover:bg-cyan-400/10 transition-colors"
      >
        <Palette className="w-4 h-4 text-cyan-400" />
        <span className="text-[10px] uppercase tracking-wider text-cyan-300 font-medium">Ajustes Visuales</span>
      </motion.button>
    </motion.footer>
  );
}
