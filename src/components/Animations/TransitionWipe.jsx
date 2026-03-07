import { motion } from 'framer-motion';

const wipeVariants = {
  initial: {
    x: '100%',
    width: '100%'
  },
  animate: {
    x: '0%',
    width: '0%'
  },
  exit: {
    x: ['0%', '100%'],
    width: ['0%', '100%']
  }
};

export default function TransitionWipe() {
  return (
    <>
      {/* 
        This is the "wipe" overlay. 
        It sits on top of everything fixed and blocks out the screen with solid black (or dark color) 
        as the new page replaces the old one under it.
      */}
      <motion.div
        className="transition-wipe"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={wipeVariants}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#0a0a0a', /* Base site color */
          zIndex: 99999, /* Above navbar and cursors */
          pointerEvents: 'none'
        }}
      />
      {/* 
        Optional secondary wipe for depth. 
        It follows right behind the main wipe with the brand highlight color.
      */}
      <motion.div
        className="transition-wipe-secondary"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={wipeVariants}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#32E612', /* Analog Green */
          zIndex: 99998,
          pointerEvents: 'none'
        }}
      />
    </>
  );
}
