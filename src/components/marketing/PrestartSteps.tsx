"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function PrestartSteps() {
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
      title: "Sign & send your report",
      description: "Add your signature, choose recipients and automatically email the PDF."
    }
  ];

  return (
    <section className="w-full py-24">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-semibold mb-16 text-[#1E1E1E]">How our Pre-Starts Work</h2>

        {/* Mobile Carousel - swipable */}
        <div className="md:hidden">
          <Swiper
            modules={[Pagination]}
            spaceBetween={32}
            slidesPerView={1}
            centeredSlides={true}
            pagination={{
              clickable: true,
            }}
            className="!pb-12"
          >
            {steps.map((step, index) => (
              <SwiperSlide key={index}>
                <div className="bg-[#fafafa] rounded-2xl shadow-sm p-8 flex flex-col items-center">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    width={380}
                    height={760}
                    className="rounded-xl mb-6 w-full max-w-[380px] h-auto object-contain"
                  />
                  <h3 className="text-xl font-semibold mb-2 text-[#111827]">{step.title}</h3>
                  <p className="text-[#6B7280] text-sm max-w-[90%]">
                    {step.description}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop Grid - side by side */}
        <div className="hidden md:grid grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div key={index} className="bg-[#fafafa] rounded-2xl shadow-sm p-8 flex flex-col items-center">
              <Image
                src={step.image}
                alt={step.alt}
                width={380}
                height={760}
                className="rounded-xl mb-6 w-full max-w-[380px] h-auto object-contain"
              />
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm max-w-[90%]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

