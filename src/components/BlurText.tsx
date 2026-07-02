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
  duration = 0.6, 
  delayOffset = 0.08,
  className = "" 
}: BlurTextProps) {
  // Split text by words for performance (avoids animating each character)
  const words = text.split(" ");

  return (
    <div 
      className={`inline-block whitespace-pre-wrap [perspective:1000px] ${className}`} 
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-5% 0px" }}
          transition={{
            ease: [0.22, 1, 0.36, 1],
            duration: duration,
            delay: index * delayOffset,
          }}
          className="inline-block whitespace-pre text-inherit mr-[0.25em] last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
export { BlurText };
