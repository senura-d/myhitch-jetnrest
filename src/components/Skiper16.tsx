import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ReactLenis } from "lenis/react";
import React, { useRef } from "react";

const experiences = [
  {
    title: "Overwater Seclusion, Maldives",
    src: "/destinations/srilanka_unsplash_2.jpg",
    tag: "Soneva Jani",
    description: "Slide directly into the turquoise lagoon from your private water retreat with a retractable roof."
  },
  {
    title: "Cliffside Frescoes, Ravello",
    src: "/destinations/srilanka_unsplash_3.jpg",
    tag: "Belmond Hotel Caruso",
    description: "Float in an infinity pool suspended 350 meters above the Amalfi Coast in an 11th-century palace."
  },
  {
    title: "Zen Temple Retreats, Kyoto",
    src: "/destinations/srilanka_unsplash_4.jpg",
    tag: "Sowaka Ryokan",
    description: "Relax on tatami mats overlooking private courtyard gardens in a historic Gion townhouse."
  },
  {
    title: "Alpine Fireside Suites, Swiss Alps",
    src: "/destinations/srilanka_unsplash_5.jpg",
    tag: "The Chedi Andermatt",
    description: "Unwind by double-sided fireplaces surrounded by natural stone and warm Swiss pine wood."
  },
  {
    title: "Caldera Horizons, Santorini",
    src: "/destinations/srilanka_unsplash_6.jpg",
    tag: "Grace Hotel",
    description: "Indulge in volcanic sunset views from your private heated plunge pool carved into the cliffs."
  }
];

interface StickyCardProps {
  i: number;
  title: string;
  src: string;
  tag: string;
  description: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const StickyCard_001 = ({
  i,
  title,
  src,
  tag,
  description,
  progress,
  range,
  targetScale,
}: StickyCardProps) => {
  const container = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="sticky top-0 flex items-center justify-center min-h-[70vh] md:min-h-screen pt-20"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 24 + 180}px)`,
        }}
        className="rounded-3xl relative flex h-[360px] md:h-[400px] w-[90vw] md:w-[620px] origin-top flex-col overflow-hidden shadow-luxury border border-white/10 group bg-booking-dark"
      >
        <img 
          src={src} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.85]" 
        />
        
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-booking-dark via-booking-dark/20 to-transparent z-10" />
        
        {/* Card Metadata */}
        <div className="absolute bottom-6 left-6 right-6 z-20 text-left">
          <span className="text-[9px] font-bold text-booking-amber bg-booking-amber/20 border border-booking-amber/30 px-3 py-1 rounded-full backdrop-blur-sm uppercase tracking-wider">
            {tag}
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-white mt-3.5 font-serif leading-tight">
            {title}
          </h3>
          <p className="text-xs md:text-sm text-white/70 mt-2 leading-relaxed font-light">
            {description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default function Skiper16() {
  const container = useRef<HTMLDivElement>(null);
  
  // Track scroll position within the section
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <ReactLenis root>
      <section
        ref={container}
        className="relative w-full bg-booking-navy text-white py-20"
      >
        {/* Title details */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 text-center flex flex-col items-center">
          <span className="text-xs font-bold text-booking-amber uppercase tracking-widest">Elite Collections</span>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mt-1 text-white font-serif">
            Signature Signature Escapes
          </h2>
          <p className="mt-3 text-sm text-white/50 max-w-lg leading-relaxed">
            Scroll down to view our meticulously hand-curated portfolio of five-star luxury stays, mapped to your desires.
          </p>
        </div>

        {/* Scroll indicator banner */}
        <div className="flex justify-center mt-6">
          <span className="text-[10px] text-white/40 uppercase tracking-widest flex flex-col items-center gap-2">
            Scroll Down
            <span className="h-10 w-[1px] bg-gradient-to-b from-white/40 to-transparent block" />
          </span>
        </div>

        {/* Cards Stack */}
        <div className="relative flex flex-col items-center justify-center pb-20 md:pb-32">
          {experiences.map((exp, i) => {
            const targetScale = Math.max(0.65, 1 - (experiences.length - i - 1) * 0.05);
            return (
              <StickyCard_001
                key={`p_${i}`}
                i={i}
                {...exp}
                progress={scrollYProgress}
                range={[i * 0.18, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </div>
      </section>
    </ReactLenis>
  );
}
export { Skiper16 as Skiper16Section, StickyCard_001 };
