import { motion } from 'framer-motion';
import Header from './components/Header';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import MapCenter from './components/MapCenter';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="h-screen w-screen flex flex-col bg-[#050810] overflow-hidden relative">
      {/* Background grid */}
      <div className="fixed inset-0 grid-overlay pointer-events-none opacity-30" />
      
      {/* Ambient glow effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-turquoise/3 rounded-full blur-3xl" />
      </div>

      {/* Scan line */}
      <div className="scanline" />

      {/* Main Layout */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <Header />

        {/* Main Content Area */}
        <div className="flex-1 flex gap-3 px-3 py-1 min-h-0 overflow-hidden">
          {/* Left Panel */}
          <LeftPanel />

          {/* Center Map */}
          <div className="flex-1 flex flex-col min-w-0 min-h-0">
            <MapCenter />
          </div>

          {/* Right Panel */}
          <RightPanel />
        </div>

        {/* Footer */}
        <Footer />
      </div>

      {/* Corner decorations for the whole screen */}
      <div className="fixed top-0 left-0 w-16 h-16 pointer-events-none z-50">
        <div className="absolute top-2 left-2 w-8 h-8 border-t border-l border-cyan-400/30" />
      </div>
      <div className="fixed top-0 right-0 w-16 h-16 pointer-events-none z-50">
        <div className="absolute top-2 right-2 w-8 h-8 border-t border-r border-cyan-400/30" />
      </div>
      <div className="fixed bottom-0 left-0 w-16 h-16 pointer-events-none z-50">
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b border-l border-cyan-400/30" />
      </div>
      <div className="fixed bottom-0 right-0 w-16 h-16 pointer-events-none z-50">
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b border-r border-cyan-400/30" />
      </div>

      {/* Version tag */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-1 right-3 z-50"
      >
        <span className="text-[8px] text-cyan-400/30 font-mono">v2.6.1 // BUILD 20261007</span>
      </motion.div>
    </div>
  );
}
