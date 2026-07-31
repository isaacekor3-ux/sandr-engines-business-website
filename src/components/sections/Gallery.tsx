"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ChevronLeft, ChevronRight, Play } from "lucide-react";

export default function Gallery() {
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  const items = [
    {
      src: "/assets/gallery/gallary-1.jpeg",
      type: "image",
      title: "Diagnostic Sweeps",
      category: "Electrical & Coding",
      description: "Using official factory diagnostic tooling to read live sensor data streams.",
    },
    {
      src: "/assets/gallery/gallary-2.jpeg",
      type: "image",
      title: "Live Telemetry Scan",
      category: "Real-time Testing",
      description: "Capturing dynamic ECU error logs during live vehicle replication.",
    },
    {
      src: "/assets/gallery/galllary-3.jpeg",
      type: "image",
      title: "Precision Engine Calibration",
      category: "Mechanical Diagnostics",
      description: "Root-cause diagnostics of fuel, air, and timing delivery systems.",
    },
    {
      src: "/assets/gallery/gallary-4.jpeg",
      type: "image",
      title: "Master Tech Component Fitment",
      category: "Guarantee Repair",
      description: "Fitting premium brand matching parts with precision calibration.",
    },
    {
      src: "/assets/gallery/gallary-5.jpeg",
      type: "image",
      title: "High-Voltage Battery Testing",
      category: "Hybrid & EV Sweep",
      description: "Measuring cell voltage stability on high-voltage hybrid components.",
    },
    {
      src: "/assets/gallery/gallary-6.jpeg",
      type: "image",
      title: "Oscilloscope Waveform Test",
      category: "Component Sweep",
      description: "Analyzing real-time sensor signals using a digital oscilloscope to trace wiring faults.",
    },
    {
      src: "/assets/gallery/gallary-7.mp4",
      type: "video",
      title: "Precision Mechanical Overhaul",
      category: "Engine Repairs",
      description: "Complete mechanical breakdown and repair of complex block assemblies.",
    },
    {
      src: "/assets/gallery/gallary-8.jpeg",
      type: "image",
      title: "Exhaust Emission Analysis",
      category: "Diagnostics & MOT",
      description: "Measuring emission compound density to optimize combustion performance.",
    },
    {
      src: "/assets/gallery/gallary-9.mp4",
      type: "video",
      title: "Chassis & Brake Alignment",
      category: "Safety Checks",
      description: "Laser aligning components for maximum road adherence and braking reliability.",
    },
  ];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeItemIndex !== null) {
      setActiveItemIndex((prev) => (prev === 0 ? items.length - 1 : prev! - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeItemIndex !== null) {
      setActiveItemIndex((prev) => (prev === items.length - 1 ? 0 : prev! + 1));
    }
  };

  return (
    <section id="gallery" className="bg-background py-8 md:py-14 relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-0 left-0 w-[30%] h-[30%] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[30%] h-[30%] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-2 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold text-secondary uppercase tracking-widest"
          >
            Our Workshop
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-heading dark:text-white tracking-tight"
          >
            S&R Diagnostic Gallery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base text-body-text"
          >
            Take a look inside our S&R ENGINES & DIAGNOSTIC 
SAFE AND RELIABLE workshop where premium vehicles are analyzed and repaired by certified master technicians.
          </motion.p>
        </div>

        {/* Gallery Grid: 3 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => setActiveItemIndex(index)}
              className="group relative cursor-pointer aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-slate-950 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {item.type === "video" ? (
                <div className="relative w-full h-full">
                  <video
                    src={item.src}
                    className="object-cover w-full h-full opacity-90 transition-transform duration-700 ease-out group-hover:scale-105"
                    muted
                    loop
                    playsInline
                    autoPlay
                  />
                  <div className="absolute top-4 right-4 bg-secondary text-white p-1.5 rounded-full shadow-md z-20 flex items-center justify-center">
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>
              ) : (
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-110"
                />
              )}
              
              {/* Elegant Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5" />

              {/* Hover Icon Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex justify-end items-end z-10 pointer-events-none">
                <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white flex-shrink-0">
                  {item.type === "video" ? (
                    <Play className="w-4 h-4 fill-current" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItemIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveItemIndex(null)}
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4 sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveItemIndex(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/15 cursor-pointer z-50"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Nav Arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/15 cursor-pointer z-50"
              aria-label="Previous item"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Nav Arrow */}
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/15 cursor-pointer z-50"
              aria-label="Next item"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Content Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-[4/3] max-h-[70vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black"
            >
              {items[activeItemIndex].type === "video" ? (
                <video
                  src={items[activeItemIndex].src}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <Image
                  src={items[activeItemIndex].src}
                  alt={items[activeItemIndex].title}
                  fill
                  priority
                  className="object-contain"
                />
              )}
            </motion.div>

            {/* Text Overlay below Image removed */}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
