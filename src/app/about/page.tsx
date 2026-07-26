"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { 
  Award, 
  Cpu, 
  ShieldCheck, 
  CheckCircle, 
  Milestone, 
  Video, 
  Clock, 
  Settings, 
  UserCheck,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  const [stats, setStats] = useState({ vehicles: 9500, accuracy: 95 });

  useEffect(() => {
    // Small incrementing animation for stats
    const interval = setInterval(() => {
      setStats((prev) => {
        const nextVehicles = prev.vehicles < 10000 ? prev.vehicles + 120 : 10000;
        const nextAccuracy = prev.accuracy < 99.9 ? parseFloat((prev.accuracy + 0.9).toFixed(1)) : 99.9;
        
        if (nextVehicles === 10000 && nextAccuracy === 99.9) {
          clearInterval(interval);
        }
        return { vehicles: nextVehicles, accuracy: nextAccuracy };
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const coreValues = [
    {
      icon: Cpu,
      title: "Dealer-Level Diagnostic Infrastructure",
      description: "We invest heavily in official main-dealer diagnostic channels including BMW ISTA, Mercedes XENTRY, Audi/VW ODIS, and Ford IDS. This allows us to flash ECU firmware, register batteries, and configure modules identically to the main dealership."
    },
    {
      icon: Video,
      title: "Hassle-Free Video Proof Reports",
      description: "Transparency is the foundation of S&R. If we discover a faulty wiring loom, corroded sensor, or mechanical wear, we record a high-definition video of the measurement parameters on our scopes and email it to you before performing any repairs."
    },
    {
      icon: UserCheck,
      title: "IMI Certified Diagnostics Masters",
      description: "Our technicians hold advanced Institute of the Motor Industry (IMI) certifications in vehicle diagnostics and high-voltage hybrid/EV system sweeps. We analyze electrical telemetry using logical engineering, not guesswork."
    },
    {
      icon: ShieldCheck,
      title: "12-Month/12,000-Mile Guarantee",
      description: "Every replacement sensor, harness section, module, or mechanical item we install is fully covered under our parts and labor guarantee. We use exclusively genuine OEM or matching high-grade components."
    }
  ];

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-background transition-colors duration-300">
        
        {/* Hero Section */}
        <section className="relative pt-24 pb-8 bg-section overflow-hidden">
          {/* Background lights */}
          <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[30%] h-[40%] bg-gradient-to-t from-secondary/5 to-transparent rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 md:px-2 relative z-10 text-center space-y-6">
            <span className="inline-flex items-center gap-1.5 self-start bg-background border border-border rounded-full px-3.5 py-1.5 text-xs font-semibold text-heading dark:text-white uppercase tracking-wider">
              <Milestone className="w-3.5 h-3.5 text-secondary animate-pulse" />
              Established 2011
            </span>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-heading dark:text-white tracking-tight max-w-4xl mx-auto leading-tight">
              Bridging the Gap Between Mechanics &
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Computer-Level Diagnostics
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-body-text max-w-2xl mx-auto leading-relaxed">
              Modern vehicles are high-performance computing systems on wheels. We deliver main-dealer diagnostic accuracy and mechanical execution without the dealer prices.
            </p>
          </div>
        </section>

        {/* Story & Philosophy Grid */}
        <section className="py-6 md:py-10 max-w-7xl mx-auto px-4 md:px-2">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Stats & Experience Details */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold text-secondary uppercase tracking-widest block">
                Who We Are
              </span>
              <h2 className="text-3xl font-extrabold text-heading dark:text-white tracking-tight leading-tight">
                Our Mission: Engineering Root-Cause Diagnostics
              </h2>
              <p className="text-sm sm:text-base text-body-text leading-relaxed">
                Standard garages frequently use code readers and simply swap components hoping to resolve issues, causing customers bloated diagnostic costs and repeated visits.
              </p>
              <p className="text-sm sm:text-base text-body-text leading-relaxed">
                At S&R Engines & Diagnostics, we implement a strict scientific method. We analyze communication signals, verify physical parameters using digital oscilloscopes, and trace current drops across wiring looms. We change parts only when we have direct physical proof of component failure.
              </p>

              {/* Stats Counters Grid */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-primary block">
                    {stats.vehicles === 10000 ? "10,000+" : `${stats.vehicles.toLocaleString()}+`}
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold text-body-text uppercase tracking-wider">
                    Vehicles Cured
                  </span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-secondary block">
                    {stats.accuracy.toFixed(1)}%
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold text-body-text uppercase tracking-wider">
                    Scan Precision
                  </span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-heading dark:text-white block">
                    37+
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold text-body-text uppercase tracking-wider">
                    Years Experience
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual highlights boxes */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {coreValues.map((value, idx) => {
                const Icon = value.icon;
                return (
                  <div
                    key={idx}
                    className="bg-section dark:bg-card border border-border rounded-2xl p-6 space-y-4 hover:bg-background transition-colors duration-300 shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-heading dark:text-white">
                      {value.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-body-text leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* Diagnostics Infrastructure Section */}
        <section className="bg-section py-6 md:py-10 relative overflow-hidden">
          {/* Radial light */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 md:px-2 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-bold text-secondary uppercase tracking-widest block">
                Technological Standards
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-heading dark:text-white tracking-tight">
                Our Diagnostic Lab Equipment
              </h2>
              <p className="text-base text-body-text leading-relaxed">
                Advanced software telemetry diagnostics requires specialized hardware tools. Here is what we use daily on client vehicles:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Digital Oscilloscopes",
                  details: "PicoScope telemetry equipment to capture signals directly at the wiring pins, measuring microsecond-level voltage variations."
                },
                {
                  title: "Diagnostic Smoke Testers",
                  details: "Pinpoints high-pressure air leaks inside intake systems, turbochargers, vacuums, and DPF exhaust routes."
                },
                {
                  title: "Factory Key Programming",
                  details: "Authenticates keys directly to immobilizer modules (EWS/CAS, EIS) using secure programming bridges."
                },
                {
                  title: "Insulation Testers",
                  details: "Evaluates high-voltage harness insulation resistance to ensure safety and precision on hybrid/EV systems."
                }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-background border border-border rounded-2xl p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="text-sm font-bold text-secondary">0{idx + 1}</div>
                  <h4 className="text-base font-bold text-heading dark:text-white">{item.title}</h4>
                  <p className="text-xs text-body-text leading-relaxed">{item.details}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA booking section */}
        <section className="py-6 md:py-10 max-w-5xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-heading dark:text-white tracking-tight">
            Ready to Experience the S&R Difference?
          </h2>
          <p className="text-base text-body-text max-w-xl mx-auto leading-relaxed">
            Stop worrying about flashing warning lights or mysterious engine faults. Book your diagnostic session today or speak directly to a specialist.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/book">
              <Button className="bg-primary hover:bg-primary/95 text-white px-8 py-6 text-base font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 cursor-pointer inline-flex items-center gap-2 group">
                <span>Book Diagnostic Scan</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
            <a 
              href="tel:+447454055461"
              className="border border-border text-heading dark:text-white hover:bg-section px-8 py-4.5 text-base font-bold rounded-xl inline-flex items-center gap-2 transition-all cursor-pointer bg-background"
            >
              Speak to Specialist
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
