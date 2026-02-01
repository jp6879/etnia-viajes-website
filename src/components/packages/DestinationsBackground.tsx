import { motion } from "framer-motion";

export type BackgroundVariant = 'caribe' | 'nacionales' | 'europa' | 'brasil' | 'exoticos' | 'sudamerica' | 'estadosunidos' | 'lunasdemiel' | 'lastminute' | 'grupales' | 'default';

interface DestinationsBackgroundProps {
  variant?: BackgroundVariant;
  disableAnimation?: boolean;
}

export function DestinationsBackground({ variant = 'default', disableAnimation = false }: DestinationsBackgroundProps) {
  // Common absolute container styles
  const containerClass = "absolute inset-0 pointer-events-none overflow-hidden select-none z-0";

  // Shared animation for background images to make them feel alive but subtle
  const imageAnimation = disableAnimation ? undefined : {
    scale: [1, 1.05, 1],
    opacity: [0.6, 0.8, 0.6],
  };

  const imageTransition = disableAnimation ? undefined : {
    duration: 20,
    repeat: Infinity,
    ease: "easeInOut" as const
  };

  if (variant === 'caribe') {
    return (
      <div className={`${containerClass} bg-gray-100`}>
        <motion.div
           animate={imageAnimation}
           transition={imageTransition}
           className="absolute inset-0 w-full h-full"
        >
          <img 
            src="/bg-caribe-minimal.png" 
            alt="Caribe Background" 
            className="w-full h-full object-cover opacity-100"
          />
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
        </motion.div>
      </div>
    );
  }

  if (variant === 'nacionales') { 
    return (
      <div className={`${containerClass} bg-gray-100`}>
         <motion.div
           animate={imageAnimation}
           transition={imageTransition}
           className="absolute inset-0 w-full h-full"
        >
          <img 
            src="/bg-nacionales-minimal.png" 
            alt="Nacionales Background" 
            className="w-full h-full object-cover opacity-100"
          />
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
        </motion.div>
      </div>
    );
  }

  if (variant === 'europa') {
    return (
      <div className={`${containerClass} bg-gray-100`}>
         <motion.div
           animate={imageAnimation}
           transition={imageTransition}
           className="absolute inset-0 w-full h-full"
        >
           <img 
            src="/bg-europa-minimal.png" 
            alt="Europa Background" 
            className="w-full h-full object-cover opacity-100"
          />
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
        </motion.div>
      </div>
    );
  }

  if (variant === 'sudamerica' || variant === 'brasil') {
    return (
      <div className={`${containerClass} bg-gray-100`}>
         <motion.div
           animate={imageAnimation}
           transition={imageTransition}
           className="absolute inset-0 w-full h-full"
        >
           <img 
            src="/bg-americalatina-minimal.png" 
            alt="Sudamérica Background" 
            className="w-full h-full object-cover object-[50%_75%] opacity-100"
          />
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
        </motion.div>
      </div>
    );
  }

  if (variant === 'exoticos') {
    return (
      <div className={`${containerClass} bg-gray-100`}>
         <motion.div
           animate={imageAnimation}
           transition={imageTransition}
           className="absolute inset-0 w-full h-full"
        >
           <img 
            src="/bg-exoticos-minimal.png" 
            alt="Exóticos Background" 
            className="w-full h-full object-cover opacity-100"
          />
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
        </motion.div>
      </div>
    );
  }

   if (variant === 'estadosunidos') {
    return (
      <div className={`${containerClass} bg-gray-100`}>
         <motion.div
           animate={imageAnimation}
           transition={imageTransition}
           className="absolute inset-0 w-full h-full"
        >
           <img 
            src="/bg-usa-minimal.png" 
            alt="Estados Unidos Background" 
            className="w-full h-full object-cover opacity-100"
          />
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
        </motion.div>
      </div>
    );
  }

  if (variant === 'lunasdemiel') {
    return (
      <div className={`${containerClass} bg-gray-100`}>
         <motion.div
           animate={imageAnimation}
           transition={imageTransition}
           className="absolute inset-0 w-full h-full"
        >
           <img 
            src="/bg-lunasdemiel-minimal.png" 
            alt="Lunas de Miel Background" 
            className="w-full h-full object-cover opacity-100"
          />
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
        </motion.div>
      </div>
    );
  }

  if (variant === 'lastminute') {
    return (
      <div className={`${containerClass} bg-gray-100`}>
         <motion.div
           animate={imageAnimation}
           transition={imageTransition}
           className="absolute inset-0 w-full h-full"
        >
           <img 
            src="/bg-lastminute-minimal.png" 
            alt="Last Minute Background" 
            className="w-full h-full object-cover opacity-100"
          />
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
        </motion.div>
      </div>
    );
  }

  if (variant === 'grupales') {
    return (
      <div className={`${containerClass} bg-gray-100`}>
         <motion.div
           animate={imageAnimation}
           transition={imageTransition}
           className="absolute inset-0 w-full h-full"
        >
           <img 
            src="/bg-grupales-minimal.png" 
            alt="Grupales Background" 
            className="w-full h-full object-cover object-[50%_75%] opacity-100"
          />
          <div className="absolute inset-0 bg-primary/30 mix-blend-multiply" />
        </motion.div>
      </div>
    );
  }

  // Default / Other variants fallback structure
   return (
      <div className={`${containerClass} bg-gradient-to-b from-secondary/20 via-background to-background`}>
        {!disableAnimation && (
          <>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-primary/5 rounded-full blur-[100px]"
            />
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 5 }}
              className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-secondary/20 rounded-full blur-[80px]"
            />
          </>
        )}
      </div>
    );
}
