"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, Activity, Cpu, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const [experience, setExperience] = React.useState(25);
  const [accuracy, setAccuracy] = React.useState(92.0);

  React.useEffect(() => {
    // Experience counter: counts from 25 to 37
    const expDuration = 1200;
    const expSteps = 37 - 25;
    const expStepTime = expDuration / expSteps;
    
    let currentExp = 25;
    const expTimer = setInterval(() => {
      currentExp += 1;
      if (currentExp >= 37) {
        currentExp = 37;
        clearInterval(expTimer);
      }
      setExperience(currentExp);
    }, expStepTime);

    // Accuracy counter: counts from 92.0% to 99.9%
    const accDuration = 1800;
    const accSteps = 79; // (99.9 - 92.0) * 10
    const accStepTime = accDuration / accSteps;
    
    let currentAcc = 92.0;
    const accTimer = setInterval(() => {
      currentAcc = parseFloat((currentAcc + 0.1).toFixed(1));
      if (currentAcc >= 99.9) {
        currentAcc = 99.9;
        clearInterval(accTimer);
      }
      setAccuracy(currentAcc);
    }, accStepTime);

    return () => {
      clearInterval(expTimer);
      clearInterval(accTimer);
    };
  }, []);

  const handleScrollTo = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elemRect = elem.getBoundingClientRect().top;
      const elemPosition = elemRect - bodyRect;
      const offsetPosition = elemPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative pt-24 md:pt-32 pb-7 bg-background overflow-hidden"
    >
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[40%] bg-gradient-to-t from-secondary/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern overlay using theme border color */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-2 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 self-start bg-section border border-border rounded-full px-3.5 py-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs font-semibold text-heading dark:text-white uppercase tracking-wider">
                Dealer-Level Diagnostics & Repair
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1]"
            >
              <span className=" text-blue-600 dark:text-blue-400">
                S&R ENGINES & DIAGNOSTIC
              </span>
              <br />
              <span className="text-red-500 dark:text-red-400G">
                SAFE AND RELIABLE
              </span>
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Dealer-Level Precision.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-body-text max-w-xl leading-relaxed"
            >
              We pinpoint complex electrical, ECU, and mechanical issues that standard garages miss. Get main-dealer standards of automotive care without the main-dealer price tag.
            </motion.p>

            {/* Bullet list of trust points */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {[
                "OEM Diagnostic Software (BMW, Audi, Mercedes, Ford, etc.)",
                "IMI Certified Master Technicians",
                "12-Month Parts & Labor Guarantee",
                "Hassle-Free Video Proof Reports",
              ].map((point, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-body-text font-medium">
                  <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Button
                onClick={() => handleScrollTo("booking")}
                className="bg-primary hover:bg-primary/95 text-white px-8 py-6 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
              >
                Book Diagnostic Scan
              </Button>
              <Link href="/services">
                <Button
                  variant="outline"
                  className="border-border text-heading dark:text-white hover:bg-section px-8 py-6 text-base font-semibold transition-all duration-300 flex items-center gap-2 group cursor-pointer"
                >
                  Explore Services
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>

            {/* Trust and Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-8 border-t border-border flex flex-wrap gap-6 sm:gap-10"
            >
              <div>
                <span className="text-3xl font-extrabold text-heading dark:text-white block">{experience}+</span>
                <span className="text-xs font-semibold text-body-text uppercase tracking-wider">Years Experience</span>
              </div>
              <div className="h-10 w-px bg-border self-center hidden sm:block" />
              <div>
                <span className="text-3xl font-extrabold text-heading dark:text-white block">{accuracy.toFixed(1)}%</span>
                <span className="text-xs font-semibold text-body-text uppercase tracking-wider">Scan Accuracy</span>
              </div>
              <div className="h-10 w-px bg-border self-center hidden sm:block" />
              <div>
                <span className="text-3xl font-extrabold text-heading dark:text-white block">5-Star</span>
                <span className="text-xs font-semibold text-body-text uppercase tracking-wider">Google Rating</span>
              </div>
            </motion.div>
          </div>

          {/* Graphics Showcase */}
          <div className="lg:col-span-5 relative w-full flex justify-center items-center mt-8 lg:mt-0 px-4 sm:px-6 lg:px-0">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[440px] aspect-[3/4]">
              {/* Visual Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative w-full h-full rounded-2xl overflow-hidden border border-border shadow-2xl bg-slate-900 group animate-float"
              >
                <Image
                  src="/hero.jpeg"
                  alt="Professional Mechanic Diagnosing Engine"
                  fill
                  priority
                  className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                />

                {/* Glowing dark overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Top border glow line */}
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary pointer-events-none" />
              </motion.div>

              {/* Floating Telemetry Badge 1 */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 dark:bg-card/95 backdrop-blur-sm border border-border shadow-xl rounded-xl p-3 flex items-center gap-3 max-w-[180px] sm:max-w-[200px] z-20"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] text-body-text font-medium leading-none">Diagnostic Scan</p>
                  <p className="text-[11px] sm:text-xs font-bold text-heading mt-1">100% OBD OK</p>
                </div>
              </motion.div>

              {/* Floating Telemetry Badge 2 */}
              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute -bottom-4 -right-4 sm:-right-6 bg-white/95 dark:bg-card/95 backdrop-blur-sm border border-border shadow-xl rounded-xl p-3 flex items-center gap-3 max-w-[200px] sm:max-w-[220px] z-20"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                  <Activity className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] text-body-text font-medium leading-none">Real-time Telemetry</p>
                  <p className="text-[11px] sm:text-xs font-bold text-heading mt-1">ECU Connected</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
