import Globe from './components/Globe';
import { motion } from 'motion/react';

export default function App() {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4 selection:bg-[#00ffcc] selection:text-black">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00ffcc] opacity-[0.03] blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#00ffcc] opacity-70 font-mono mb-2 block">
            Visualización de Datos
          </span>
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-4">
            GLOBO <span className="italic font-serif">Wireframe</span>
          </h1>
          <div className="h-[1px] w-12 bg-[#00ffcc] mx-auto opacity-50" />
        </motion.div>

        {/* Globe Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          className="w-full aspect-square max-w-[500px] relative"
        >
          <Globe />
          
          {/* Decorative elements */}
          <div className="absolute inset-0 border border-white/5 rounded-full pointer-events-none scale-110" />
          <div className="absolute inset-0 border border-white/5 rounded-full pointer-events-none scale-125 opacity-50" />
        </motion.div>

        {/* Footer / Stats */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 text-center"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Rotación</span>
            <span className="text-sm font-light">0.005 rad/s</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Segmentos</span>
            <span className="text-sm font-light">24 x 12</span>
          </div>
          <div className="hidden md:flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Material</span>
            <span className="text-sm font-light">LineBasic</span>
          </div>
        </motion.div>
      </div>

      {/* Side Rail Text */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 hidden lg:block">
        <span className="writing-vertical-rl rotate-180 text-[10px] uppercase tracking-[0.5em] text-white/20 font-mono">
          SISTEMA DE NAVEGACIÓN GLOBAL • VERSIÓN 1.0.4
        </span>
      </div>
    </main>
  );
}
