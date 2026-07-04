"use client";

import React from "react";
import { motion } from "framer-motion";
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
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Services() {
  const services = [
    {
      title: "Engine Diagnostics",
      icon: Cpu,
      color: "from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400",
      hoverBg: "hover:bg-blue-500/[0.03] dark:hover:bg-blue-500/[0.08] hover:border-blue-500/30",
    },
    {
      title: "Mobile Diagnostics",
      icon: Cpu,
      color: "from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-400",
      hoverBg: "hover:bg-indigo-500/[0.03] dark:hover:bg-indigo-500/[0.08] hover:border-indigo-500/30",
    },
    {
      title: "MOT Testing",
      icon: ClipboardCheck,
      color: "from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400",
      hoverBg: "hover:bg-emerald-500/[0.03] dark:hover:bg-emerald-500/[0.08] hover:border-emerald-500/30",
    },
    {
      title: "MOT Repairs",
      icon: Hammer,
      color: "from-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-400",
      hoverBg: "hover:bg-amber-500/[0.03] dark:hover:bg-amber-500/[0.08] hover:border-amber-500/30",
    },
    {
      title: "Brake Service & Repairs",
      icon: Disc,
      color: "from-rose-500/10 to-red-500/10 text-rose-600 dark:text-rose-400",
      hoverBg: "hover:bg-rose-500/[0.03] dark:hover:bg-rose-500/[0.08] hover:border-rose-500/30",
    },
    {
      title: "Suspension & Steering Repairs",
      icon: Settings,
      color: "from-violet-500/10 to-purple-500/10 text-violet-600 dark:text-violet-400",
      hoverBg: "hover:bg-violet-500/[0.03] dark:hover:bg-violet-500/[0.08] hover:border-violet-500/30",
    },
    {
      title: "Engine Servicing",
      icon: Wrench,
      color: "from-blue-600/10 to-cyan-600/10 text-primary dark:text-blue-400",
      hoverBg: "hover:bg-primary/[0.03] dark:hover:bg-primary/[0.08] hover:border-primary/30",
    },
    {
      title: "General Vehicle Repairs",
      icon: Wrench,
      color: "from-slate-500/10 to-slate-700/10 text-slate-700 dark:text-slate-300",
      hoverBg: "hover:bg-slate-500/[0.03] dark:hover:bg-slate-500/[0.08] hover:border-slate-500/30",
    },
    {
      title: "Vehicle Maintenance",
      icon: ShieldCheck,
      color: "from-green-500/10 to-emerald-500/10 text-green-600 dark:text-green-400",
      hoverBg: "hover:bg-green-500/[0.03] dark:hover:bg-green-500/[0.08] hover:border-green-500/30",
    },
    {
      title: "Car Headlight Restoration and Polish",
      icon: Sparkles,
      color: "from-yellow-500/10 to-amber-500/10 text-yellow-600 dark:text-yellow-400",
      hoverBg: "hover:bg-yellow-500/[0.03] dark:hover:bg-yellow-500/[0.08] hover:border-yellow-500/30",
    },
    {
      title: "Air-conditioning Regas and Service",
      icon: Wind,
      color: "from-cyan-500/10 to-blue-500/10 text-cyan-600 dark:text-cyan-400",
      hoverBg: "hover:bg-cyan-500/[0.03] dark:hover:bg-cyan-500/[0.08] hover:border-cyan-500/30",
    },
    {
      title: "Tyre Repair",
      icon: Wrench,
      color: "from-zinc-500/10 to-slate-500/10 text-zinc-600 dark:text-zinc-400",
      hoverBg: "hover:bg-zinc-500/[0.03] dark:hover:bg-zinc-500/[0.08] hover:border-zinc-500/30",
    },
  ];

  const router = useRouter();

  const handleServiceClick = (serviceTitle: string) => {
    router.push(`/book?service=${encodeURIComponent(serviceTitle)}`);
  };

  return (
    <section id="services" className="bg-section py-8 md:py-14 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 w-[20%] h-[30%] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-2 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold text-secondary uppercase tracking-widest"
          >
            Expert Automotive Care
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-heading dark:text-white"
          >
            Our Specialized Services
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base text-body-text"
          >
            We combine years of manual mechanical craftsmanship with dealer-level software diagnostic sweeps to deliver the ultimate vehicle check.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`group relative p-6 bg-card border border-border rounded-2xl cursor-pointer transition-all duration-300 ${service.hoverBg} shadow-sm hover:shadow-md flex flex-col justify-start overflow-hidden h-full`}
              onClick={() => handleServiceClick(service.title)}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                <service.icon className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-heading dark:text-white tracking-tight leading-snug group-hover:text-primary transition-colors duration-200">
                {service.title}
              </h4>
            </motion.div>
          ))}
        </div>

        {/* Center Booking Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 text-center"
        >
          <Link href="/services">
            <Button
              className="bg-primary hover:bg-primary/95 text-white px-8 py-6 text-base font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 cursor-pointer inline-flex items-center gap-2 group"
            >
              <span>View All Services</span>
              <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>

        
      </div>
    </section>
  );
}
