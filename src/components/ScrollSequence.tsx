import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const backdrops = [
  { id: "home-hero", image: "/destinations/sigiriya.jpg" },
  { id: "home-search", image: "/destinations/sunset.jpg" },
  { id: "home-deals", image: "/destinations/sarmat-batagov-cuZbrYoimv8-unsplash.jpg" },
];

export default function ScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const images = containerRef.current?.querySelectorAll(".backdrop-img-wrapper");

      backdrops.forEach((backdrop, idx) => {
        const section = document.getElementById(backdrop.id);
        const imgWrapper = images?.[idx];
        const img = imgWrapper?.querySelector("img");

        if (section && imgWrapper && img) {
          // 1. Crossfade Opacity Animations — snap swap at section boundary
          if (idx === 1) {
            // Hero → Search: instant snap as soon as the search section scrolls into view
            gsap.fromTo(
              imgWrapper,
              { opacity: 0 },
              {
                opacity: 1,
                scrollTrigger: {
                  trigger: section,
                  start: "top bottom",
                  end: "top bottom",
                  toggleActions: "play none none reverse",
                },
              }
            );
          } else if (idx > 1) {
            // Search → rest: near-instant snap at section top
            gsap.fromTo(
              imgWrapper,
              { opacity: 0 },
              {
                opacity: 1,
                scrollTrigger: {
                  trigger: section,
                  start: "top 5%",
                  end: "top top",
                  scrub: true,
                },
              }
            );
          }



          // 2. Parallax Zoom Animations
          // Zoom in smoothly from 1.05 to 1.45 to add extra zoom and prevent any white edges
          gsap.fromTo(
            img,
            { scale: 1.05 },
            {
              scale: 1.45,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 h-full w-full pointer-events-none select-none overflow-hidden bg-[#0b0f17]">
      {backdrops.map((backdrop, idx) => (
        <div
          key={backdrop.id}
          className={`backdrop-img-wrapper absolute inset-0 h-full w-full pointer-events-none ${idx === 0 ? 'opacity-100' : 'opacity-0'}`}
        >
          <img
            src={backdrop.image}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}

export { ScrollSequence };
