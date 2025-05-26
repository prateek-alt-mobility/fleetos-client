import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface RouteTransitionProps {
  children: React.ReactNode;
}

const RouteTransition = ({ children }: RouteTransitionProps) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.2,
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default RouteTransition;
