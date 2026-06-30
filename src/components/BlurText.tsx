import React from 'react';
import { motion } from 'framer-motion';

interface BlurTextProps {
  text: string;
  duration?: number;
  delayOffset?: number;
  className?: string;
}

export default function BlurText({ 
  text, 
  duration = 0.75, 
  delayOffset = 0.035,
  className = "" 
}: BlurTextProps) {
  // Split text by characters
  const chars = text.split("");

  return (
    <div 
      className={`inline-block whitespace-pre-wrap ${className}`} 
      style={{ perspective: "1000px" }}
    >
      {chars.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, filter: "blur(5px)", rotateX: 95, y: 12 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", rotateX: 0, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{
            ease: [0.22, 1, 0.36, 1], // Custom premium cubic ease-out
            duration: duration,
            delay: index * delayOffset,
          }}
          className="inline-block whitespace-pre text-inherit"
          style={{ transformOrigin: "top center" }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}
export { BlurText };
