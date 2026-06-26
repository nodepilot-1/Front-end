import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React, { useRef, useEffect } from 'react';

// Define the props for reusability
interface StatProps {
  value: string;
  numericValue?: number;
  suffix?: string;
  decimals?: number;
  label: string;
  icon: React.ReactNode;
}

function AnimatedStat({ value, suffix = "", decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const springValue = useSpring(0, { stiffness: 50, damping: 20 });
  const displayValue = useTransform(springValue, (current) => current.toFixed(decimals));

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  return (
    <span ref={ref}>
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
}

interface ActionProps {
  text: React.ReactNode;
  onClick: () => void;
  variant?: ButtonProps['variant'];
  className?: string;
}

interface HeroSectionProps {
  badge?: React.ReactNode;
  title: React.ReactNode;
  subtitle: string;
  actions: ActionProps[];
  stats: StatProps[];
  images: string[];
  className?: string;
}

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const floatingVariants = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const HeroSection = ({ badge, title, subtitle, actions, stats, images, className }: HeroSectionProps) => {
  return (
    <section className={cn('w-full overflow-hidden bg-background py-12 sm:py-24', className)}>
      <div className="container mx-auto grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8 px-4 sm:px-6 lg:px-8">
        {/* Left Column: Text Content */}
        <motion.div
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {badge && (
            <motion.div variants={itemVariants} className="mb-4">
              {badge}
            </motion.div>
          )}
          <motion.div
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl font-heading leading-[1.05]"
            variants={itemVariants}
          >
            {title}
          </motion.div>
          <motion.p className="mt-6 max-w-md text-lg text-muted-foreground leading-relaxed" variants={itemVariants}>
            {subtitle}
          </motion.p>
          <motion.div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start" variants={itemVariants}>
            {actions.map((action, index) => (
              <Button key={index} onClick={action.onClick} variant={action.variant} size="lg" className={cn("px-6 py-3 rounded-xl", action.className)}>
                {action.text}
              </Button>
            ))}
          </motion.div>
          <motion.div className="mt-12 flex flex-wrap justify-center gap-8 lg:justify-start" variants={itemVariants}>
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10">{stat.icon}</div>
                <div>
                  <p className="text-xl font-bold gradient-text font-heading">
                    {stat.numericValue !== undefined ? (
                      <AnimatedStat value={stat.numericValue} suffix={stat.suffix} decimals={stat.decimals} />
                    ) : (
                      stat.value
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: Image Collage */}
        <motion.div
          className="relative h-[400px] w-full sm:h-[500px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Decorative Shapes */}
          <motion.div
            className="absolute -top-4 left-1/4 h-16 w-16 rounded-full bg-[#00B7B5]/20 dark:bg-[#00B7B5]/20"
            variants={floatingVariants}
            animate="animate"
          />
          <motion.div
            className="absolute bottom-0 right-1/4 h-12 w-12 rounded-lg bg-white/10 dark:bg-white/10"
            variants={floatingVariants}
            animate="animate"
            style={{ transitionDelay: '0.5s' }}
          />
          <motion.div
            className="absolute bottom-1/4 left-4 h-6 w-6 rounded-full bg-[#00B7B5]/40 dark:bg-[#00B7B5]/40"
            variants={floatingVariants}
            animate="animate"
            style={{ transitionDelay: '1s' }}
          />

          {/* Images */}
          <motion.div
            className="absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-2xl bg-white/5 p-2 shadow-lg sm:h-64 sm:w-64 border border-white/10 z-10"
            style={{ transformOrigin: 'bottom center' }}
            variants={imageVariants}
            whileHover={{ scale: 1.05, zIndex: 30 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              className="h-full w-full"
            >
              <img src={images[0]} alt="Global edge network" className="h-full w-full rounded-xl object-cover" />
            </motion.div>
          </motion.div>
          <motion.div
            className="absolute right-0 top-1/3 h-40 w-40 rounded-2xl bg-white/5 p-2 shadow-lg sm:h-56 sm:w-56 border border-white/10 z-20"
            style={{ transformOrigin: 'left center' }}
            variants={imageVariants}
            whileHover={{ scale: 1.05, zIndex: 30 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="h-full w-full"
            >
              <img src={images[1]} alt="AI computation" className="h-full w-full rounded-xl object-cover" />
            </motion.div>
          </motion.div>
          <motion.div
            className="absolute bottom-0 left-0 h-32 w-32 rounded-2xl bg-white/5 p-2 shadow-lg sm:h-48 sm:w-48 border border-white/10 z-10"
            style={{ transformOrigin: 'top right' }}
            variants={imageVariants}
            whileHover={{ scale: 1.05, zIndex: 30 }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="h-full w-full"
            >
              <img src={images[2]} alt="Edge hardware" className="h-full w-full rounded-xl object-cover" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
