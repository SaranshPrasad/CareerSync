import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gray-950 px-6 pt-20 pb-8 text-white">
      
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

      {/* Top line */}
      <div className="relative mx-auto max-w-6xl">
        <div className="h-px w-full bg-white/10" />

        {/* Main wordmark */}
        <div className="flex flex-col items-center justify-center py-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-main text-center text-4xl tracking-tight sm:text-2xl md:text-3xl"
          >
            <span className="text-white">Career</span>
            <span className="text-blue-500">Sync</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-5 font-body text-xs tracking-[0.3em] text-gray-500 uppercase"
          >
            Your career. Optimized.
          </motion.p>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 sm:flex-row">
          <span className="font-body text-xs text-gray-600">
            © 2026 CareerSync
          </span>

          <div className="flex items-center gap-2 font-body text-xs text-gray-600">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            <span>Building the future of careers</span>
          </div>
        </div>
      </div>

      {/* Bottom subtle gradient */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
    </footer>
  );
};

export default Footer;