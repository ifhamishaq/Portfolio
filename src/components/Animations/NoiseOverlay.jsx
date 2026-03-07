import { motion } from 'framer-motion';

export default function NoiseOverlay({ theme }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.04 }}
      transition={{ duration: 1 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")',
        backgroundRepeat: 'repeat',
        mixBlendMode: theme === 'dark' ? 'overlay' : 'multiply',
        opacity: theme === 'dark' ? 0.04 : 0.02,
      }}
    />
  );
}
