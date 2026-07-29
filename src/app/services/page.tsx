"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
// import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Cpu,
  ClipboardCheck,
  Hammer,
  Disc,
  Settings,
  Gauge,
  Wrench,
  Sparkles,
  ShieldCheck,
  Car,
  Wind,
  Search,
  Phone,
  ArrowRight,
  SlidersHorizontal,
  X
} from "lucide-react";

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Diagnostics & Electrical",
    "Maintenance & Servicing",
    "Repairs & Tyres"
  ];

  const services = [
    {
      title: "Engine Diagnostics",
      category: "Diagnostics & Electrical",
      icon: Cpu,
      image: "/assets/services/engines_diag.jpeg",

      color: "from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400",
      borderHover: "group-hover:border-blue-500/30",
      description: "Using dealer-level diagnostic scanners (BMW ISTA, Mercedes XENTRY, ODIS), we perform real-time sensor sweeps, live data logging, and module health scans to isolate electrical and electronic faults. We inspect ECU telemetry, map out wiring issues, and diagnose warning lights with scientific accuracy.",
      highlights: ["OEM Dealer Software", "Live Data Telemetry", "ECU Remapping & Coding"]
    },
    {
      title: "Mobile Diagnostics",
      category: "Diagnostics & Electrical",
      icon: Cpu,
      image: "/assets/services/mobile_diagnostics.png",
      color: "from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-400",
      borderHover: "group-hover:border-indigo-500/30",
      description: "We bring dealer-grade diagnostics straight to your home, workplace, or roadside. Our mobile unit is fully equipped with advanced OBD-II diagnostic scanners and live telemetry logging tools to identify engine, transmission, ABS, airbag, and electrical faults on-site.",
      highlights: ["On-Site Diagnostic Sweep", "Fault Code Clearance", "Module & Sensor Calibration"]
    },
    {
      title: "MOT Testing",
      category: "Maintenance & Servicing",
      icon: ClipboardCheck,
      image: "/assets/services/mot_testing.png",
      color: "from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400",
      borderHover: "group-hover:border-emerald-500/30",
      description: "We carry out official, fully certified Ministry of Transport (MOT) safety inspections to check brake efficiency, exhaust emissions, lighting, steering, suspension, and overall roadworthiness. All tests are conducted strictly in accordance with DVSA regulations.",
      highlights: ["DVSA Approved Station", "Emission Testing Included", "Same-Day Certification"]
    },
    {
      title: "MOT Repairs",
      category: "Repairs & Tyres",
      icon: Hammer,
      image: "/assets/services/mot_repairs.png",
      color: "from-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-400",
      borderHover: "group-hover:border-amber-500/30",
      description: "If your vehicle fails its MOT, we provide fast, targeted repair solutions. From replacing worn suspension parts, correcting high emissions, to fixing electrical defects, we ensure your vehicle is returned to full compliance so it passes its re-test.",
      highlights: ["Fast Failure Resolution", "Compliant Safety Standards", "Free Retest Booking Support"]
    },
    {
      title: "Brake Service & Repairs",
      category: "Repairs & Tyres",
      icon: Disc,
      image: "/assets/services/brake_repair.jpeg",
      color: "from-rose-500/10 to-red-500/10 text-rose-600 dark:text-rose-400",
      borderHover: "group-hover:border-rose-500/30",
      description: "We replace worn brake pads and rotors (discs), flush system fluids, rebuild calipers, and adjust handbrakes. Using exclusively genuine OEM or matching high-grade components ensures responsive stopping power and prevents vibration or squeaking.",
      highlights: ["Genuine OEM Parts", "Brake Fluid Performance Flush", "Caliper Rebuilds & Adjustments"]
    },
    {
      title: "Suspension & Steering Repairs",
      category: "Repairs & Tyres",
      icon: Settings,
      image: "/assets/services/suspension_repairs.png",
      color: "from-violet-500/10 to-purple-500/10 text-violet-600 dark:text-violet-400",
      borderHover: "group-hover:border-violet-500/30",
      description: "Our technicians replace steering racks, ball joints, control arms, sway bars, wheel bearings, and shock absorbers. We restore structural stability, eliminate knocks or noises, and bring back tight, precise vehicle handling.",
      highlights: ["Struts & Coilovers", "Steering Rack Overhaul", "Knocking Sound Elimination"]
    },
    {
      title: "Engine Servicing",
      category: "Maintenance & Servicing",
      icon: Wrench,
      image: "/assets/services/engine_servicing.png",
      color: "from-blue-600/10 to-cyan-600/10 text-blue-600 dark:text-blue-400",
      borderHover: "group-hover:border-primary/30",
      description: "Comprehensive servicing packages tailored to manufacturer guidelines. We replace engine oil using premium synthetic oil, install new oil filters, cabin filters, air filters, and spark plugs, and perform a full visual and mechanical safety check.",
      highlights: ["Premium Synthetic Oil Flush", "OEM Specification Filters", "Multi-Point Service Stamp"]
    },
    {
      title: "General Vehicle Repairs",
      category: "Repairs & Tyres",
      icon: Wrench,
      image: "/assets/services/general_repairs.png",
      color: "from-slate-500/10 to-slate-700/10 text-slate-700 dark:text-slate-300",
      borderHover: "group-hover:border-slate-500/30",
      description: "From fixing fluid leaks, replacing engine mounts, swapping auxiliary belts, to repairing windows and door locks, we cover all general mechanical repairs to keep your car operating safely and reliably.",
      highlights: ["Fluid Leak Detection", "Belt & Pulley Replacements", "Engine Mount Checks"]
    },
    {
      title: "Vehicle Maintenance",
      category: "Maintenance & Servicing",
      icon: ShieldCheck,
      image: "/assets/services/vehicle_maintenance.png",
      color: "from-green-500/10 to-emerald-500/10 text-green-600 dark:text-green-400",
      borderHover: "group-hover:border-green-500/30",
      description: "Preventative multi-point inspections checking battery health, coolant level, steering fluid, and general wear items. Ideal for pre-travel checks to ensure your vehicle stays reliable and prevents unexpected roadside breakdowns.",
      highlights: ["150-Point Checklist", "Battery Telemetry Scan", "Fluid Top-Ups Included"]
    },
    {
      title: "Car Headlight Restoration and Polish",
      category: "Maintenance & Servicing",
      icon: Sparkles,
      image: "/assets/services/headlight_polishing.png",
      color: "from-yellow-500/10 to-amber-500/10 text-yellow-600 dark:text-yellow-400",
      borderHover: "group-hover:border-yellow-500/30",
      description: "Restore clarity and brightness to your vehicle's headlights. We remove oxidation, yellowing, and minor scratches using professional wet-sanding and multi-stage polishing, followed by a UV-resistant sealant to prevent future fading.",
      highlights: ["UV Protection Sealant", "Enhanced Night Visibility", "Sanding & Multi-Stage Polish"]
    },
    {
      title: "Air-conditioning Regas and Service",
      category: "Maintenance & Servicing",
      icon: Wind,
      image: "/assets/services/ac_service.png",
      color: "from-cyan-500/10 to-blue-500/10 text-cyan-600 dark:text-cyan-400",
      borderHover: "group-hover:border-cyan-500/30",
      description: "Keep your cabin cool and fresh. We test for system leaks, evacuate old refrigerant oil, and regas with the correct R134a or R1234yf gas. Includes air-con system de-sanitisation to eliminate musty odours and bacteria.",
      highlights: ["R134a & R1234yf Support", "Vacuum Leak Test", "System De-sanitisation"]
    },
    {
      title: "Tyre Repair",
      category: "Repairs & Tyres",
      icon: Wrench,
      image: "/assets/services/tyre_repairs.png",
      color: "from-zinc-500/10 to-slate-500/10 text-zinc-600 dark:text-zinc-400",
      borderHover: "group-hover:border-zinc-500/30",
      description: "Safe and certified tyre puncture repairs in accordance with BS AU 159 standards. We inspect tread depth, repair minor tread punctures, perform wheel balancing, and adjust tyre pressures to optimize fuel economy and road safety.",
      highlights: ["BS AU 159 Compliant", "Precision Wheel Balancing", "Pressure & Tread Check"]
    }
  ];

  // Filter services by category and search term
  const filteredServices = services.filter((service) => {
    const matchesCategory =
      selectedCategory === "All" || service.category === selectedCategory;
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-background transition-colors duration-300">
        
        {/* Hero Section */}
        <section className="relative pt-28 pb-12 bg-section overflow-hidden">
          {/* Subtle glowing elements */}
          <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-gradient-to-t from-secondary/5 to-transparent rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 md:px-2 relative z-10 text-center space-y-4">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-1 bg-background border border-border rounded-full px-3 py-1 text-xs font-semibold text-secondary uppercase tracking-wider"
            >
              Dealer-Grade Service
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-heading dark:text-white tracking-tight max-w-4xl mx-auto leading-tight"
            >
              Our Professional
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Automotive Services
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base text-body-text max-w-2xl mx-auto leading-relaxed"
            >
              We merge master-level manual mechanics with sophisticated diagnostic scopes to deliver precision maintenance. Browse our core offerings below.
            </motion.p>
          </div>
        </section>

        {/* Filters and Search Bar Section */}
        <section className="py-6 max-w-7xl mx-auto px-4 md:px-2 border-b border-border/50">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Category selection */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-xs font-bold rounded-full border transition-all duration-300 cursor-pointer ${
                    selectedCategory === category
                      ? "bg-primary border-primary text-white shadow-sm shadow-primary/20"
                      : "bg-section border-border text-body-text hover:bg-background hover:text-heading"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-body-text">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services..."
                className="w-full pl-10 pr-10 py-2.5 text-sm bg-section border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-heading dark:text-white transition-all placeholder-body-text/60"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-body-text hover:text-heading cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        </section>

        {/* Services Grid Section */}
        <section className="py-10 max-w-7xl mx-auto px-4 md:px-2">
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredServices.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, delay: index * 0.03 }}
                      key={service.title}
                      className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 h-full"
                    >
                      {/* Image Header with scale effect */}
                      <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                        {/* Placeholder gradient to hold the space for client images */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center select-none">
                          <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold opacity-60">
                            Service Image Placeholder
                          </span>
                        </div>
                        {/*
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className={`object-cover transition-transform duration-500 group-hover:scale-105 `}
                        />
                        */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90" />
                        
                        {/* Floating Icon badge */}
                        <div className={`absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/10`}>
                          <Icon className="w-6 h-6" />
                        </div>

                        {/* Floating Category tag */}
                        <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                          {service.category}
                        </span>
                      </div>

                      {/* Content block */}
                      <div className="p-6 flex flex-col flex-grow space-y-4">
                        <h3 className="text-xl font-bold text-heading dark:text-white leading-tight group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                        
                        <p className="text-sm text-body-text leading-relaxed flex-grow">
                          {service.description}
                        </p>

                        {/* Highlights checklist */}
                        <div className="space-y-2 pt-2 border-t border-border/40">
                          {service.highlights.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm font-semibold text-heading dark:text-slate-300">
                              <div className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>

                        {/* Card actions */}
                        <div className="flex gap-2.5 pt-4">
                          <Link href={`/book?service=${encodeURIComponent(service.title)}`} className="flex-1">
                            <Button className="w-full bg-primary hover:bg-primary/95 text-white font-bold h-10 shadow-sm cursor-pointer">
                              Book Service
                            </Button>
                          </Link>
                          <a href="tel:+447454055461">
                            <Button variant="outline" className="h-10 px-3 cursor-pointer" title="Speak to Specialist">
                              <Phone className="w-4 h-4 text-secondary" />
                            </Button>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-20 bg-section border border-dashed border-border rounded-2xl space-y-4 max-w-xl mx-auto">
              <SlidersHorizontal className="w-12 h-12 text-body-text/40 mx-auto" />
              <h3 className="text-lg font-bold text-heading dark:text-white">No Services Found</h3>
              <p className="text-sm text-body-text max-w-xs mx-auto">
                We couldn't find any services matching "{searchQuery}". Try searching for something else or clearing the search.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="cursor-pointer"
              >
                Reset Search Filters
              </Button>
            </div>
          )}
        </section>

        {/* CTA Booking Section at the Bottom */}
        <section className="bg-section py-16 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-4xl mx-auto px-4 text-center space-y-8 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-heading dark:text-white tracking-tight">
              Not Sure Which Service Your Vehicle Needs?
            </h2>
            <p className="text-sm sm:text-base text-body-text max-w-2xl mx-auto leading-relaxed">
              Modern vehicles store error codes when faults arise. Save time and money by booking our dealer-level ECU Diagnostic Scan. We will pinpoint the exact fault before executing any repairs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link href="/book?service=Engine%20Diagnostics">
                <Button className="bg-primary hover:bg-primary/95 text-white px-8 py-6 text-base font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 cursor-pointer inline-flex items-center gap-2 group">
                  <span>Book Diagnostic Scan</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
              <a
                href="tel:+447454055461"
                className="border border-border text-heading dark:text-white hover:bg-background px-8 py-4.5 text-base font-bold rounded-xl inline-flex items-center gap-2 transition-all cursor-pointer bg-background shadow-sm"
              >
                Speak to Specialist
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
