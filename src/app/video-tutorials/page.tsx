'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OptimizedImage from '@/components/OptimizedImage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function VideoTutorialsPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('getting-started');
  const [currentVideoSrc, setCurrentVideoSrc] = useState('/video-tutorials/onboardingemployee.mp4.mp4');
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

      {/* Videos Section */}
      <section className="py-16 bg-gradient-to-b from-white via-[#FFFAF7] to-[#FFF5ED]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="mb-12">
            <div className="flex gap-3 mb-8 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('getting-started')}
                className={`px-6 py-3 font-semibold text-base transition-all relative ${
                  activeTab === 'getting-started'
                    ? 'text-[#FF8C32] border-b-2 border-[#FF8C32]'
                    : 'text-gray-600 hover:text-[#FF8C32]'
                }`}
              >
                Getting Started
              </button>
              <button
                onClick={() => setActiveTab('civil-contractors')}
                className={`px-6 py-3 font-semibold text-base transition-all relative ${
                  activeTab === 'civil-contractors'
                    ? 'text-[#FF8C32] border-b-2 border-[#FF8C32]'
                    : 'text-gray-600 hover:text-[#FF8C32]'
                }`}
              >
                Civil Contractors
              </button>
              <button
                onClick={() => setActiveTab('plant-hire')}
                className={`px-6 py-3 font-semibold text-base transition-all relative ${
                  activeTab === 'plant-hire'
                    ? 'text-[#FF8C32] border-b-2 border-[#FF8C32]'
                    : 'text-gray-600 hover:text-[#FF8C32]'
                }`}
              >
                Plant Hire
              </button>
            </div>

            {/* Tab Content Headers */}
            {activeTab === 'getting-started' && (
              <div>
                <h2 className="text-3xl sm:text-4xl font-semibold text-[#1E1E1E] mb-3">
                  Getting Started
                </h2>
                <p className="text-lg text-gray-600 mb-2">
                  Learn the basics of using CivDocs
                </p>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => {
                      setCurrentVideoSrc('/video-tutorials/onboardingemployee.mp4.mp4');
                      setIsVideoModalOpen(true);
                      setVideoError(false);
                      setVideoLoading(true);
                    }}
                    className="text-sm text-gray-500 hover:text-[#FF8C32] transition-colors text-left"
                  >
                    • Employee Onboarding
                  </button>
                  <button
                    onClick={() => {
                      setCurrentVideoSrc('/video-tutorials/onboardingemployee.mp4.mp4');
                      setIsVideoModalOpen(true);
                      setVideoError(false);
                      setVideoLoading(true);
                    }}
                    className="text-sm text-gray-500 hover:text-[#FF8C32] transition-colors text-left"
                  >
                    • Creating your CivDocs organisation
                  </button>
                </div>
              </div>
            )}
            {activeTab === 'civil-contractors' && (
              <div>
                <h2 className="text-3xl sm:text-4xl font-semibold text-[#1E1E1E] mb-3">
                  Civil Contractors
                </h2>
                <p className="text-lg text-gray-600 mb-2">
                  Tutorials for civil construction projects and cost tracking
                </p>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => {
                      setCurrentVideoSrc('/video-tutorials/Civil-Contractors/1.0-overview.mp4');
                      setIsVideoModalOpen(true);
                      setVideoError(false);
                      setVideoLoading(true);
                    }}
                    className="text-sm text-gray-500 hover:text-[#FF8C32] transition-colors text-left"
                  >
                    • 1.0 Overview
                  </button>
                  <button
                    onClick={() => {
                      setCurrentVideoSrc('/video-tutorials/Civil-Contractors/1.1-invite-employee.mp4');
                      setIsVideoModalOpen(true);
                      setVideoError(false);
                      setVideoLoading(true);
                    }}
                    className="text-sm text-gray-500 hover:text-[#FF8C32] transition-colors text-left"
                  >
                    • 1.1 Inviting Employees
                  </button>
                  <button
                    onClick={() => {
                      setCurrentVideoSrc('/video-tutorials/Civil-Contractors/1.2-add-machine-.mp4');
                      setIsVideoModalOpen(true);
                      setVideoError(false);
                      setVideoLoading(true);
                    }}
                    className="text-sm text-gray-500 hover:text-[#FF8C32] transition-colors text-left"
                  >
                    • 1.2 Add Machine
                  </button>
                  <button
                    onClick={() => {
                      setCurrentVideoSrc('/video-tutorials/Civil-Contractors/1.3-add-project.mp4');
                      setIsVideoModalOpen(true);
                      setVideoError(false);
                      setVideoLoading(true);
                    }}
                    className="text-sm text-gray-500 hover:text-[#FF8C32] transition-colors text-left"
                  >
                    • 1.3 Add Project
                  </button>
                  <button
                    onClick={() => {
                      setCurrentVideoSrc('/video-tutorials/Civil-Contractors/1.4-how-employees-do-timesheets.mp4');
                      setIsVideoModalOpen(true);
                      setVideoError(false);
                      setVideoLoading(true);
                    }}
                    className="text-sm text-gray-500 hover:text-[#FF8C32] transition-colors text-left"
                  >
                    • 1.4 How Employees Do Timesheets
                  </button>
                  <button
                    onClick={() => {
                      setCurrentVideoSrc('/video-tutorials/Civil-Contractors/1.5-how-to-do-prestart.mp4');
                      setIsVideoModalOpen(true);
                      setVideoError(false);
                      setVideoLoading(true);
                    }}
                    className="text-sm text-gray-500 hover:text-[#FF8C32] transition-colors text-left"
                  >
                    • 1.5 How to Do a Prestart
                  </button>
                  <button
                    onClick={() => {
                      setCurrentVideoSrc('/video-tutorials/Civil-Contractors/1.6-cost-tracking-overview.mp4');
                      setIsVideoModalOpen(true);
                      setVideoError(false);
                      setVideoLoading(true);
                    }}
                    className="text-sm text-gray-500 hover:text-[#FF8C32] transition-colors text-left"
                  >
                    • 1.6 Cost Tracking Overview
                  </button>
                  <button
                    onClick={() => {
                      setCurrentVideoSrc('/video-tutorials/Civil-Contractors/1.7-how-to-create-project-scope.mp4');
                      setIsVideoModalOpen(true);
                      setVideoError(false);
                      setVideoLoading(true);
                    }}
                    className="text-sm text-gray-500 hover:text-[#FF8C32] transition-colors text-left"
                  >
                    • 1.7 How to Create Project Scope
                  </button>
                  <button
                    onClick={() => {
                      setCurrentVideoSrc('/video-tutorials/Civil-Contractors/1.8-cost-code-creation.mp4');
                      setIsVideoModalOpen(true);
                      setVideoError(false);
                      setVideoLoading(true);
                    }}
                    className="text-sm text-gray-500 hover:text-[#FF8C32] transition-colors text-left"
                  >
                    • 1.8 Cost Code Creation
                  </button>
                  <button
                    onClick={() => {
                      setCurrentVideoSrc('/video-tutorials/Civil-Contractors/1.9-how-to-create-materials.mp4');
                      setIsVideoModalOpen(true);
                      setVideoError(false);
                      setVideoLoading(true);
                    }}
                    className="text-sm text-gray-500 hover:text-[#FF8C32] transition-colors text-left"
                  >
                    • 1.9 How to Create Materials
                  </button>
                  <button
                    onClick={() => {
                      setCurrentVideoSrc('/video-tutorials/Civil-Contractors/2.0-how-to-add-materials-and-progress.mp4');
                      setIsVideoModalOpen(true);
                      setVideoError(false);
                      setVideoLoading(true);
                    }}
                    className="text-sm text-gray-500 hover:text-[#FF8C32] transition-colors text-left"
                  >
                    • 2.0 How to Add Materials and Progress
                  </button>
                </div>
              </div>
            )}
            {activeTab === 'plant-hire' && (
              <div>
                <h2 className="text-3xl sm:text-4xl font-semibold text-[#1E1E1E] mb-3">
                  Plant Hire
                </h2>
                <p className="text-lg text-gray-600">
                  Guides for plant hire operations, logbooks, and invoicing
                </p>
              </div>
            )}
          </div>
          
          {/* Tab Content */}
          <div className="max-w-4xl">
            {/* Getting Started Tab Content */}
            {activeTab === 'getting-started' && (
              <div className="mt-6">
                {/* Video Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6 pb-4">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-[#1E1E1E] mb-2">
                        Onboarding Tutorial
                      </h3>
                      <p className="text-gray-600 text-sm">
                        A comprehensive guide to getting started with CivDocs
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center px-6 pb-6">
                    <button
                      onClick={() => {
                        setCurrentVideoSrc('/video-tutorials/onboardingemployee.mp4.mp4');
                        setIsVideoModalOpen(true);
                        setVideoError(false);
                        setVideoLoading(true);
                      }}
                      className="relative w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] cursor-pointer hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF8C32] focus:ring-offset-2 rounded-2xl"
                      aria-label="Play onboarding video"
                    >
                      <OptimizedImage 
                        src="/video-tutorials/Plant-hire/onboard.png" 
                        alt="Onboarding Tutorial Preview"
                        width={400}
                        height={800}
                        className="w-full h-auto"
                      />
                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#FF8C32] ml-0.5 sm:ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Civil Contractors Tab Content */}
            {activeTab === 'civil-contractors' && (
              <div className="mt-6 space-y-6">
                {/* Video Cards */}
                {[
                  { video: '1.0-overview.mp4', image: '1.0.png', title: '1.0 Overview', description: 'Get an overview of CivDocs for civil contractors' },
                  { video: '1.1-invite-employee.mp4', image: '1.1-invite-employee.png', title: '1.1 Inviting Employees', description: 'Learn how to invite employees to join your CivDocs organization' },
                  { video: '1.2-add-machine-.mp4', image: '1.2.png', title: '1.2 Add Machine', description: 'Learn how to add machines to your fleet' },
                  { video: '1.3-add-project.mp4', image: '1.3.png', title: '1.3 Add Project', description: 'Create and manage projects in CivDocs' },
                  { video: '1.4-how-employees-do-timesheets.mp4', image: '1.4.png', title: '1.4 How Employees Do Timesheets', description: 'Guide for employees on submitting timesheets' },
                  { video: '1.5-how-to-do-prestart.mp4', image: '1.5.png', title: '1.5 How to Do a Prestart', description: 'Complete prestart checks for your machines' },
                  { video: '1.6-cost-tracking-overview.mp4', image: '1.6.png', title: '1.6 Cost Tracking Overview', description: 'Overview of cost tracking features' },
                  { video: '1.7-how-to-create-project-scope.mp4', image: '1.7.png', title: '1.7 How to Create Project Scope', description: 'Set up project scopes for cost tracking' },
                  { video: '1.8-cost-code-creation.mp4', image: '1.8.png', title: '1.8 Cost Code Creation', description: 'Create and manage cost codes' },
                  { video: '1.9-how-to-create-materials.mp4', image: '1.9.png', title: '1.9 How to Create Materials', description: 'Add materials to your projects' },
                  { video: '2.0-how-to-add-materials-and-progress.mp4', image: '2.0.png', title: '2.0 How to Add Materials and Progress', description: 'Track materials and project progress' },
                ].map((item, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6 pb-4">
                      <div className="text-center">
                        <h3 className="text-xl font-semibold text-[#1E1E1E] mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center px-6 pb-6">
                      <button
                        onClick={() => {
                          setCurrentVideoSrc(`/video-tutorials/Civil-Contractors/${item.video}`);
                          setIsVideoModalOpen(true);
                          setVideoError(false);
                          setVideoLoading(true);
                        }}
                        className="relative w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] cursor-pointer hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF8C32] focus:ring-offset-2 rounded-2xl"
                        aria-label={`Play ${item.title} video`}
                      >
                        <OptimizedImage 
                          src={`/video-tutorials/Civil-Contractors/${item.image}`}
                          alt={`${item.title} Tutorial Preview`}
                          width={400}
                          height={800}
                          className="w-full h-auto"
                        />
                        {/* Play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#FF8C32] ml-0.5 sm:ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Plant Hire Tab Content */}
            {activeTab === 'plant-hire' && (
              <div className="mt-6">
                {/* Placeholder */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-8 text-center">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-[#1E1E1E] mb-2">
                    Videos Coming Soon
                  </h3>
                  <p className="text-gray-600">
                    Plant hire tutorials will be added here
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      </div>

      {/* Footer */}
      <Footer />

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-[100] flex items-center justify-center md:p-4"
              onClick={() => {
                setIsVideoModalOpen(false);
                setVideoError(false);
                setVideoLoading(true);
              }}
            >
              {/* Modal Content - Full screen on mobile, phone-sized on desktop */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative w-full h-full md:w-[400px] md:h-auto md:max-h-[90vh] bg-black md:rounded-2xl overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-12 h-12 sm:w-14 sm:h-14 bg-black/80 hover:bg-black rounded-full flex items-center justify-center transition-colors shadow-lg border-2 border-white/20"
                  aria-label="Close video"
                >
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Video Player - Full screen on mobile */}
                {videoError ? (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-white">
                    <svg className="w-16 h-16 mb-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-lg font-semibold mb-2">Video failed to load</p>
                    <p className="text-sm text-white/70 text-center max-w-md mb-4">
                      The .mov video format is not well-supported on desktop browsers (Chrome, Firefox, Edge). 
                      Safari supports it, but for best compatibility, the video should be converted to MP4 format.
                    </p>
                    <p className="text-xs text-white/50 text-center max-w-md">
                      If you're using Chrome/Firefox/Edge, please try Safari or convert the video to MP4 format.
                    </p>
                    <button
                      onClick={() => {
                        setVideoError(false);
                        setVideoLoading(true);
                      }}
                      className="mt-4 px-6 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                ) : (
                  <>
                    {videoLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black">
                        <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                      </div>
                    )}
                    <video
                      className="w-full h-full object-contain md:h-auto"
                      controls
                      autoPlay
                      playsInline
                      preload="metadata"
                      muted
                      onEnded={() => setIsVideoModalOpen(false)}
                      onLoadedData={() => {
                        setVideoLoading(false);
                        setVideoError(false);
                      }}
                      onError={(e) => {
                        const video = e.currentTarget;
                        const error = video.error;
                        let errorMessage = 'Unknown error';
                        
                        if (error) {
                          switch (error.code) {
                            case error.MEDIA_ERR_ABORTED:
                              errorMessage = 'Video loading aborted';
                              break;
                            case error.MEDIA_ERR_NETWORK:
                              errorMessage = 'Network error while loading video';
                              break;
                            case error.MEDIA_ERR_DECODE:
                              errorMessage = 'Video format not supported by browser';
                              break;
                            case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                              errorMessage = 'Video format not supported';
                              break;
                            default:
                              errorMessage = `Error code: ${error.code}`;
                          }
                        }
                        
                        console.error('Video load error:', errorMessage, error);
                        setVideoError(true);
                        setVideoLoading(false);
                      }}
                      onCanPlay={() => {
                        setVideoLoading(false);
                        setVideoError(false);
                      }}
                      onLoadStart={() => setVideoLoading(true)}
                    >
                      <source src={currentVideoSrc} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
