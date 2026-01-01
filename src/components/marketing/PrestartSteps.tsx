"use client";

import OptimizedImage from "@/components/OptimizedImage";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useRef, useEffect } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';

export default function PrestartSteps() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  
  const steps = [
    {
      image: "/John Smith/PS1.png",
      alt: "Step 1 - Enter details",
      title: "Enter project & machine details",
      description: "Select your project, asset number, operator and start your pre-start."
    },
    {
      image: "/John Smith/PS2.png",
      alt: "Step 2 - Checklist",
      title: "Complete your digital checklist",
      description: "Tick items, add faults, attach photos and record plant hours."
    },
    {
      image: "/John Smith/PS3.png",
      alt: "Step 3 - Sign & submit",
      title: "Sign your report and generate the PDF",
      description: "Add your signature, choose recipients and create the PDF."
    }
  ];

  // Preload all carousel images immediately when component mounts
  useEffect(() => {
    steps.forEach((step) => {
      const img = new window.Image();
      img.src = step.image;
    });
  }, []);

  return (
    <section className="w-full py-24">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-semibold mb-16 text-[#1E1E1E]">How our Pre-Starts Work</h2>

        {/* Mobile Carousel - swipable */}
        <div className="md:hidden">
          {/* Number Pagination - Above the carousel */}
          <div className="flex justify-center gap-3 mb-6 z-10 relative">
            {steps.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (swiperRef.current) {
                    swiperRef.current.slideTo(index);
                  }
                }}
                className={`w-10 h-10 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer relative z-10 ${
                  activeIndex === index
                    ? 'bg-[#FF8C32] text-white scale-110'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
                aria-label={`Go to step ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* Swipe hint label - Fixed height to prevent layout shift */}
          <div className="flex justify-center mb-4 h-6">
            {activeIndex < steps.length - 1 && (
              <p className="text-[#6B7280] text-sm font-medium animate-pulse-glow">
                Swipe to view steps →
              </p>
            )}
          </div>

          <Swiper
            spaceBetween={16}
            slidesPerView={1.1}
            centeredSlides={false}
            speed={300}
            resistance={true}
            resistanceRatio={0.85}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="!pb-8"
            style={{
              overflow: 'visible'
            }}
          >
            {steps.map((step, index) => (
              <SwiperSlide key={index} style={{ height: 'auto' }}>
                <div className="max-w-xl mx-auto h-full">
                  <div className="bg-gradient-to-b from-white to-[#f4f4f4] rounded-2xl shadow-sm px-6 py-4 md:px-8 md:py-6 flex flex-col items-center h-full">
                    <h3 className="text-xl font-semibold text-center mb-2 text-[#111827]">{step.title}</h3>
                    <p className="text-[#6B7280] text-center text-sm mb-4 max-w-[90%]">
                      {step.description}
                    </p>
                    <div className="max-w-[460px] mx-auto">
                      <OptimizedImage
                        src={step.image}
                        alt={step.alt}
                        width={320}
                        height={640}
                        sizes="(max-width: 768px) 90vw, 380px"
                        priority
                        className="rounded-xl drop-shadow-2xl w-full max-w-[320px] h-auto object-contain"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop Grid - side by side */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-gradient-to-b from-white to-[#f4f4f4] rounded-2xl shadow-sm px-6 py-4 md:px-8 md:py-6 flex flex-col items-center">
              <h3 className="text-xl font-semibold text-center mb-2 text-[#111827]">{step.title}</h3>
              <p className="text-[#6B7280] text-center text-sm mb-4 max-w-[90%]">
                {step.description}
              </p>
              <div className="max-w-[460px] mx-auto">
                <OptimizedImage
                  src={step.image}
                  alt={step.alt}
                  width={320}
                  height={640}
                  sizes="(max-width: 768px) 90vw, 380px"
                  className="rounded-xl drop-shadow-2xl w-full max-w-[320px] h-auto object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
