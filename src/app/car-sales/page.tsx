"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Car,
  Wrench,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Gauge,
  DollarSign
} from "lucide-react";

export default function CarSalesPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const steps = [
    {
      icon: DollarSign,
      title: "Hand-Picked Sourcing",
      description: "We source high-potential vehicles from select auctions and private clients. We carefully filter for cars with clean history, documented mileage, and structural integrity."
    },
    {
      icon: Gauge,
      title: "Dealer-Grade Diagnostics",
      description: "Using our advanced diagnostic suite (BMW ISTA, Mercedes XENTRY, ODIS), we check every electronic module, clear error codes, reset parameters, and verify module health."
    },
    {
      icon: Wrench,
      title: "Complete Restoration",
      description: "Our master mechanics perform necessary repairs, replace wear-and-tear items (brakes, suspension, tyres), perform comprehensive fluid changes, and tune the engine to OEM specs."
    },
    {
      icon: Sparkles,
      title: "Detailing & Sanitisation",
      description: "We execute multi-stage paint correction, restore cloudy headlights, and conduct deep chemical cabin extraction to deliver a clean, fresh, and polished look."
    }
  ];

  const valueProps = [
    {
      title: "Dealer Quality, Fair Prices",
      description: "Get main-dealer quality preparation without the steep premium markups. We pass on our low overhead savings to you."
    },
    {
      title: "Transparent Video Proof",
      description: "We share high-definition videos showing our diagnostics results and mechanical repairs so you know exactly what was restored."
    },
    {
      title: "Comprehensive Warranty",
      description: "Every car is sold with a peace-of-mind guarantee covering major components, electrical systems, and mechanical diagnostics."
    },
    {
      title: "HPI Clear Guarantee",
      description: "All vehicles undergo comprehensive checks to ensure no outstanding finance, no accident write-offs, and no mileage discrepancy."
    }
  ];

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-background transition-colors duration-300">
        {/* Hero Section */}
        <section className="relative pt-28 pb-8 bg-section overflow-hidden">
          <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[30%] h-[40%] bg-gradient-to-t from-secondary/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 md:px-2 relative z-10 text-center space-y-6">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 bg-background border border-border rounded-full px-3.5 py-1.5 text-xs font-semibold text-heading dark:text-white uppercase tracking-wider"
            >
              <Car className="w-3.5 h-3.5 text-secondary animate-pulse" />
              S&R Approved Vehicles
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-heading dark:text-white tracking-tight max-w-4xl mx-auto leading-tight"
            >
              Hand-Picked & Expertly
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Restored Cars For Sale
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-body-text max-w-2xl mx-auto leading-relaxed"
            >
              We buy vehicles, repair them using diagnostic-grade technology and master mechanical overhauls, and offer them to our clients at incredible value.
            </motion.p>
          </div>
        </section>

        {/* Featured Restored Vehicles Showroom */}
        <section className="py-10 max-w-7xl mx-auto px-4 md:px-2">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
            <h2 className="text-3xl font-extrabold text-heading dark:text-white tracking-tight">
              Featured Restorations
            </h2>
            <p className="text-body-text text-sm sm:text-base leading-relaxed">
              Explore some of our recently restored vehicles. Every car undergoes a full 150+ point inspection before listing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Vehicle 1 */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-900">
                <Image
                  src="/assets/car-sell/car-sell-1.jpeg"
                  alt="Refurbished Vehicle Front Showcase"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90" />
                <span className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  Recently Restored
                </span>
              </div>
              <div className="p-8 flex flex-col flex-grow space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-heading dark:text-white">
                    Premium Diagnostics Certified Stock
                  </h3>
                  <p className="text-sm text-body-text leading-relaxed">
                    A stellar example of our complete vehicle restoration. This car underwent deep module configuration updates, full transmission servicing, and comprehensive steering alignment.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-heading dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                    <span>Full Diagnostic Sweep Pass</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                    <span>Engine & Gears Restored</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                    <span>Fresh 12-Month MOT</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                    <span>Valeted & Deep Detailed</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Vehicle 2 */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-900">
                <Image
                  src="/assets/car-sell/car-sell-2.jpeg"
                  alt="Refurbished Vehicle Interior and Details"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90" />
                <span className="absolute top-4 right-4 bg-secondary text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  Showroom Ready
                </span>
              </div>
              <div className="p-8 flex flex-col flex-grow space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-heading dark:text-white">
                    Master Mechanics Inspected Stock
                  </h3>
                  <p className="text-sm text-body-text leading-relaxed">
                    Featuring a meticulously restored cabin and mechanical layout. Equipped with replacement brakes, full suspension refresh, and complete diagnostic calibration of active safety systems.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-heading dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                    <span>150+ Point Safety Check</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                    <span>HPI Clear & Warranted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                    <span>Brake & Suspension Refresh</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                    <span>12-Month Roadside Cover</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Restoration Process */}
        <section className="py-10 bg-section">
          <div className="max-w-7xl mx-auto px-4 md:px-2">
            <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
              <span className="text-xs font-bold text-secondary uppercase tracking-widest block">
                How We Do It
              </span>
              <h2 className="text-3xl font-extrabold text-heading dark:text-white tracking-tight">
                Our Refurbishment Journey
              </h2>
              <p className="text-body-text text-sm sm:text-base leading-relaxed">
                We believe in breathing new life into every vehicle. Here is our step-by-step restoration process that ensures every car meets our high diagnostic and mechanical standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={idx}
                    className="relative bg-background p-6 rounded-2xl border border-border/80 shadow-sm flex flex-col space-y-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="absolute top-2 right-4 text-5xl font-extrabold text-slate-100 dark:text-slate-800/40 select-none">
                      0{idx + 1}
                    </span>
                    <h3 className="text-lg font-bold text-heading dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-xs text-body-text leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Buy From S&R */}
        <section className="py-10 max-w-7xl mx-auto px-4 md:px-2">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold text-secondary uppercase tracking-widest block">
                The S&R Standards
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-heading dark:text-white tracking-tight">
                Why Buy a Refurbished Vehicle From Us?
              </h2>
              <p className="text-sm text-body-text leading-relaxed">
                Most dealerships wash a car and put it straight on the forecourt. We do the opposite. Because we are master vehicle diagnostics specialists first and foremost, we make sure every electronic module, mechanical bearing, and critical engine component is performing flawlessly before we pass the keys to you.
              </p>
              <div className="pt-2">
                <Link href="/contact">
                  <Button className="bg-primary text-white hover:bg-primary/95 shadow-md flex items-center gap-1.5">
                    Contact Our Sales Team <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {valueProps.map((prop, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-card border border-border rounded-2xl shadow-sm space-y-3 hover:border-secondary/30 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-secondary/15 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-secondary" />
                  </div>
                  <h4 className="font-bold text-heading dark:text-white text-base">
                    {prop.title}
                  </h4>
                  <p className="text-xs text-body-text leading-relaxed">
                    {prop.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
