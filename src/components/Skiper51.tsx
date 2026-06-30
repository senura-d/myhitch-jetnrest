import React from "react";
import { Autoplay, EffectCreative, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { cn } from "../lib/utils";
import BlurText from "./BlurText";
import TravelDoodles from "./TravelDoodles";

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
    <section className="bg-white py-20 w-full overflow-hidden flex flex-col items-center relative z-10">
      {/* Doodle backdrop */}
      <TravelDoodles opacity={0.05} uid="travel-doodle-carousel" />

      {/* Title block */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 mb-12 text-center flex flex-col items-center">
        <span className="text-xs font-bold text-black uppercase tracking-widest">
          <BlurText text={title} delayOffset={0.03} />
        </span>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mt-1 text-black font-serif">
          <BlurText text={subtitle} delayOffset={0.02} />
        </h2>
        <p className="mt-3 text-sm text-booking-muted max-w-lg leading-relaxed">
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
    height: 680px;
  }

  .Carousal_005 .swiper-slide {
    background-position: center;
    background-size: cover;
    border-radius: 24px;
  }
  `;

  return (
    <div className={cn("relative w-full max-w-7xl px-4 md:px-8", className)}>
      <style>{css}</style>

      <div className="w-full relative">
        <Swiper
          spaceBetween={spaceBetween}
          autoplay={
            autoplay
              ? {
                  delay: 2500,
                  disableOnInteraction: false,
                }
              : false
          }
          effect="creative"
          grabCursor={true}
          slidesPerView="auto"
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
          creativeEffect={{
            prev: {
              shadow: true,
              translate: [0, 0, -400],
            },
            next: {
              translate: ["100%", 0, 0],
            },
          }}
          modules={[EffectCreative, Pagination, Autoplay]}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="relative group overflow-hidden rounded-3xl">
              <img
                className="h-full w-full scale-105 rounded-3xl object-cover transition-transform duration-700 group-hover:scale-110"
                src={image.src}
                alt={image.alt}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10 pointer-events-none rounded-3xl" />
              
              <div className="absolute bottom-10 left-8 right-8 z-20 text-left pointer-events-none">
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
