"use client";

import React from "react";
import { motion } from "framer-motion";
import { Monitor, Video, Award, ShieldCheck, HeartHandshake } from "lucide-react";

export default function WhyChooseUs() {
  const points = [
    {
      icon: Monitor,
      title: "OEM Dealer-Level Software",
      description: "We invest in official factory diagnostic equipment for BMW ISTA, Mercedes XENTRY, VW/Audi ODIS, and Ford IDS. This allows us to perform ECU firmware flashes, module coding, and keys matching exactly like the main dealer.",
    },
    {
      icon: Video,
      title: "Hassle-Free Video Proof Reports",
      description: "We believe in 100% transparency. When we run diagnostic logs or discover worn mechanical parts, we record a quick high-definition video explaining the issue, showing the measurement gauges, and send it to you before starting any repairs.",
    },
    {
      icon: Award,
      title: "IMI Certified Master Techs",
      description: "Automotive diagnostics is electrical engineering. Our technicians are Institute of the Motor Industry (IMI) certified diagnostics specialists, trained in hybrid/electric battery safety, high-voltage lines, and complex sensor sweeps.",
    },
    {
      icon: ShieldCheck,
      title: "12-Month / 12k Miles Guarantee",
      description: "Any replacement sensors, ECU components, modules, wiring repairs, or mechanical parts we fit are covered by a full 12-month parts and labor guarantee. We only use OEM or high-grade matching components.",
    },
  ];

  return (
    <section id="why-choose-us" className="bg-background py-8 md:py-14 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-2 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-bold text-secondary uppercase tracking-widest"
            >
              The S&R Difference
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-extrabold text-heading dark:text-white tracking-tight leading-tight"
            >
              Why Car Owners Choose S&R Engines & Diagnostics
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4 text-base text-body-text leading-relaxed"
            >
              <p>
                Standard garages often read error codes and simply start replacing parts hoping to resolve the issue, leading to wasted diagnostic costs and repeat visits.
              </p>
              <p>
                At S&R, we perform rigorous <strong>root-cause analysis</strong>. We trace the signal path, inspect the wiring harnesses, measure voltage drop, and double-verify telemetry so we replace only the exact faulty component.
              </p>
            </motion.div>

            {/* Core Diagnostics Process Flow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-4 pt-2 border-t border-border"
            >
              <h4 className="text-base font-bold text-heading dark:text-white uppercase tracking-wider">
                Our Root-Cause Method
              </h4>
              <div className="space-y-4">
                {[
                  {
                    step: "01",
                    title: "Live Data Logging",
                    desc: "We analyze live sensor data streams while replicating the fault, capturing transient errors that static scans completely miss."
                  },
                  {
                    step: "02",
                    title: "Component-Level Testing",
                    desc: "Using digital oscilloscopes, we measure electrical signals directly at the sensor or actuator to verify physical failure."
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <span className="text-base font-bold text-secondary bg-secondary/10 px-2 py-1 rounded-md mt-0.5">
                      {item.step}
                    </span>
                    <div className="space-y-1">
                      <h5 className="text-base font-bold text-heading dark:text-white leading-none">
                        {item.title}
                      </h5>
                      <p className="text-base text-body-text leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Glowing Accent Indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-section border border-border rounded-2xl p-6 flex items-center gap-4 shadow-sm"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <p className="text-base font-bold text-heading dark:text-white">100% Satisfaction Guarantee</p>
                <p className="text-base text-body-text">We don&apos;t charge diagnostic fee if we cannot trace fault.</p>
              </div>
            </motion.div>
          </div>

          {/* Right Cards Column */}
          <div className="lg:col-span-7 space-y-6">
            {points.map((point, index) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-section border border-border hover:border-slate-300 dark:hover:border-slate-700 rounded-2xl p-6 flex flex-col sm:flex-row gap-5 transition-all duration-300 hover:shadow-md group hover:bg-background"
                >
                  <div className="w-12 h-12 rounded-xl bg-background border border-border group-hover:bg-primary group-hover:text-white transition-all duration-300 flex items-center justify-center text-secondary flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-heading dark:text-white group-hover:text-primary transition-colors duration-200">
                      {point.title}
                    </h3>
                    <p className="text-sm text-body-text leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
