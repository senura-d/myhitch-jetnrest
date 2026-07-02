import { motion, type Variants } from 'framer-motion'; // Using framer-motion as it is standard and provides the same motion components
import { Armchair, Monitor, PlaneTakeoff } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import ScrollSequence from './ScrollSequence';
import BlurText from './BlurText';

export interface Hero33Props {
    logoText?: string;
    navItems?: string[];
    primaryActionText?: string;
    secondaryActionText?: string;
    titleLines?: string[];
    features?: {
        icon: React.ElementType;
        title: string;
        description: string;
    }[];
    backgroundImage?: string;
    backgroundImages?: string[];
    onExploreClick?: () => void;
}

export default function Hero33({
  logoText = 'MYHITCH JETNREST',
  navItems = ['Stays', 'Flights', 'Car rentals', 'Attractions'],
  primaryActionText = 'Explore Stays',
  secondaryActionText = 'Exclusive Offers',
  titleLines = ['Peak Moments,', 'Unforgettable', 'Destinations.'],
  features = [
    {
      icon: Armchair,
      title: 'Premium Comfort',
      description: 'Relax in handpicked, ultra-luxury\nsuites',
    },
    {
      icon: Monitor,
      title: 'Stunning Views',
      description: 'Marvel at pristine horizons from\nyour balcony',
    },
  ],
  backgroundImage,
  backgroundImages,
  onExploreClick,
}: Hero33Props) {
  const images = backgroundImages?.length ? backgroundImages : (backgroundImage ? [backgroundImage] : []);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length > 1) {
      const timer = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [images.length]);

  // Nav: quick fade+blur slide
  const navVariants: Variants = {
    hidden: { opacity: 0, y: -16, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 150,
        duration: 0.5,
      },
    },
  };

  // Title container: per-line stagger with progressive delay
  const titleContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.14, delayChildren: 0.3 },
    },
  };

  // Each title line: slides from left + blur
  const titleLineVariants: Variants = {
    hidden: { opacity: 0, x: -32, filter: 'blur(8px)', skewX: 2 },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      skewX: 0,
      transition: { type: 'spring', damping: 24, stiffness: 100, mass: 1.1 },
    },
  };

  // CTA buttons: fade up after title lines settle
  const ctaContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.85 },
    },
  };
  const ctaItemVariants: Variants = {
    hidden: { opacity: 0, y: 12, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', damping: 18, stiffness: 150 },
    },
  };

  // Bottom feature cards: slide up with stagger
  const featuresContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 1.1 },
    },
  };
  const featureItemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(4px)', scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: { type: 'spring', damping: 22, stiffness: 120 },
    },
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-transparent font-sans antialiased selection:bg-white/20">

      {/* Background Images */}
      {images.map((src, idx) => (
        <div 
          key={src}
          className={`absolute inset-0 z-0 select-none pointer-events-none transition-opacity duration-1000 ${
            idx === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            src={src} 
            alt="Hero background" 
            className="h-full w-full object-cover"
          />
        </div>
      ))}

      {/* Content Container */}
      <div className="relative z-10 flex min-h-screen flex-col pl-8 pr-6 pt-24 pb-14 md:pb-16 md:pl-16 lg:pl-24 justify-between">
        <div className="mr-auto flex w-full max-w-7xl flex-1 flex-col">
          {/* Header/Nav spacer (since Navbar is fixed) */}
          <div className="h-4" />

          {/* Hero Main Content */}
          <div className="flex flex-1 flex-col justify-end pb-0">
            <div className="flex max-w-3xl flex-col items-start text-left mr-auto">
              {/* Title — line-by-line stagger, slides from left */}
              <motion.h1
                variants={titleContainerVariants}
                initial="hidden"
                animate="visible"
                className="overflow-hidden text-2xl md:text-4xl lg:text-5xl font-light tracking-wide text-white lg:leading-[1.1]"
              >
                {titleLines.map((line, i) => (
                  <span key={i} className="block">
                    <BlurText text={line} duration={0.4} delayOffset={0.02} />
                  </span>
                ))}
              </motion.h1>

              {/* CTA — staggered scale-in after title */}
              <motion.div
                variants={ctaContainerVariants}
                initial="hidden"
                animate="visible"
                className="mt-10 flex flex-wrap items-center justify-start gap-4"
              >
                <motion.button
                  variants={ctaItemVariants}
                  onClick={onExploreClick}
                  className="flex h-11 items-center gap-2 rounded-lg bg-white pr-5 pl-5 text-xs font-semibold text-booking-blue transition-all duration-300 hover:bg-white/90 shadow-soft-glow active:scale-[0.96] border border-white/20"
                >
                  {primaryActionText}
                  <PlaneTakeoff className="h-3.5 w-3.5" />
                </motion.button>
                <motion.button
                  variants={ctaItemVariants}
                  onClick={onExploreClick}
                  className="flex h-11 items-center rounded-lg border border-white/20 bg-white/5 backdrop-blur-md px-6 text-xs font-medium text-white transition-all duration-300 hover:bg-white/10 active:scale-[0.96]"
                >
                  {secondaryActionText}
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
