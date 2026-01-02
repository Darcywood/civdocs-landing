'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function VideoTutorialsPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Header />
      <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-12 pb-32 sm:pt-20 sm:pb-40 lg:pt-28 lg:pb-48">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Main Card with Gradient */}
            <div className="relative bg-gray-50 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden">
              {/* Heavy gradient overlay concentrated in bottom-right corner */}
              <div 
                className="absolute -bottom-20 -right-20 w-[85%] h-[85%] opacity-100"
                style={{
                  background: 'radial-gradient(ellipse 70% 70% at bottom right, #FF8C32 0%, #FF9D4A 8%, #FFB366 18%, #FFC88A 32%, #FFD4A3 48%, #FFE4CC 65%, #FFF0E6 80%, rgba(249, 250, 251, 0.5) 92%, rgba(249, 250, 251, 0) 100%)'
                }}
              ></div>
              
              {/* Content */}
              <div className="relative p-8 sm:p-12 lg:p-16 z-10 text-center">
                {/* Pill Label */}
                <div className="inline-block mb-8">
                  <span className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-full">
                    Video Tutorials
                  </span>
                </div>
                
                {/* Heading */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1E1E1E] leading-tight tracking-tight mb-8 max-w-3xl mx-auto">
                  Watch and learn how to use CivDocs
                </h1>
                
                {/* Description */}
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-normal max-w-2xl mx-auto">
                  Short videos that show you exactly how to use CivDocs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
