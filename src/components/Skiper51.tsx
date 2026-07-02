import React from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { cn } from "../lib/utils";
import BlurText from "./BlurText";

const defaultImages = [
  {
    src: "/destinations/hendrik-cornelissen-jpTT_SAU034-unsplash.jpg",
    alt: "Cape Weligama Ocean Villas, Weligama",
  },
  {
    src: "/destinations/sebastian-latorre-VqPOeYqzK-M-unsplash.jpg",
    alt: "Ceylon Tea Trails Bungalows, Hatton",
  },
  {
    src: "/destinations/sigiriya.jpg",
    alt: "Water Garden Sigiriya Villas, Sigiriya",
  },
];

export interface Skiper51Props {
  title?: string;
  subtitle?: string;
  description?: string;
  images?: { src: string; alt: string }[];
}

export default function Skiper51({
  title = "Elite Portfolio",
  subtitle = "Featured Signature Escapes",
  description = "Swipe through our handpicked signature destinations featuring architectural masterpieces and five-star hospitality.",
  images = defaultImages
}: Skiper51Props) {
  return (
    <section className="bg-white py-20 w-full overflow-hidden flex flex-col items-center relative z-10 border-t border-slate-200">

      {/* Title block */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 mb-12 text-center flex flex-col items-center">
        <span className="text-sm font-bold text-blue-600 uppercase tracking-[0.3em]">
          <BlurText text={title} delayOffset={0.03} />
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mt-3 text-black font-serif uppercase drop-shadow-sm">
          <BlurText text={subtitle} delayOffset={0.02} />
        </h2>
        <p className="mt-8 text-xl text-black/50 max-w-2xl leading-relaxed font-light">
          {description}
        </p>
      </div>

      {/* Carousel */}
      <Carousel_005
        className="mt-4 relative z-10"
        images={images}
        autoplay
        loop
      />
    </section>
  );
}

const Carousel_005 = ({
  images,
  className,
  showPagination = false,
  loop = true,
  autoplay = false,
  spaceBetween = 0,
}: {
  images: { src: string; alt: string }[];
  className?: string;
  showPagination?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
}) => {
  const css = `
  .Carousal_005 {
    width: 100%;
    height: 70vh;
    min-height: 500px;
  }

  .Carousal_005 .swiper-slide {
    background-position: center;
    background-size: cover;
  }
  `;

  return (
    <div className={cn("relative w-full", className)}>
      <style>{css}</style>

      <div className="w-full relative">
        <Swiper
          spaceBetween={0}
          autoplay={
            autoplay
              ? {
                  delay: 4500,
                  disableOnInteraction: false,
                }
              : false
          }
          grabCursor={true}
          slidesPerView={1}
          centeredSlides={true}
          loop={loop}
          pagination={
            showPagination
              ? {
                  clickable: true,
                }
              : false
          }
          className="Carousal_005"
          modules={[Pagination, Autoplay]}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="relative group overflow-hidden">
              <img
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                src={image.src}
                alt={image.alt}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />
              
              <div className="absolute bottom-16 left-6 md:left-12 right-12 z-20 text-left pointer-events-none">
                <span className="text-[9px] font-bold text-white bg-white/20 border border-white/30 px-3 py-1 rounded-full backdrop-blur-sm uppercase tracking-wider">
                  Signature Destination
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mt-3 font-serif leading-tight">
                  {image.alt}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export { Carousel_005 };
