"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is a \"dealer-level diagnostic sweep\"?",
      answer: "It means we use the exact same official factory software (such as BMW ISTA, Mercedes XENTRY, Audi ODIS, Ford IDS) as main dealers. This allows us to perform module coding, software updates, key programming, and sensor calibrations that standard garage OBD2 scanners cannot perform.",
    },
    {
      question: "How does the \"Video Proof Report\" system work?",
      answer: "When we diagnose a fault or inspect parts under the car, we record a high-definition video showing the physical wear, sensor readings, or smoke leak test in real time. We send this direct link to your phone with a cost breakdown so you see exactly what we see before approving any work.",
    },
    {
      question: "Do you charge if you cannot find the fault?",
      answer: "No. We stand by our diagnostics. Under our No-Trace, No-Fee Guarantee, if we are unable to identify the root cause of your warning light or mechanical fault, we do not charge you any diagnostic fees.",
    },
    {
      question: "How long does a diagnostics scan take?",
      answer: "A standard deep diagnostic session takes between 1 to 2 hours. This includes full vehicle network checks, live-data capture while driving to replicate the fault, component electrical sweeps, and creating your digital diagnostics report.",
    },
    {
      question: "Will using S&R void my manufacturer warranty?",
      answer: "No. Under Block Exemption regulations, you are not legally required to use a main dealer for servicing or diagnostics to keep your warranty valid. We use OEM equivalent parts and follow manufacturer-guided service checklists.",
    },
    {
      question: "What kind of guarantee do you provide on repairs?",
      answer: "All replacement sensors, mechanical parts, and electrical repairs carried out at S&R are backed by a comprehensive 12-month or 12,000-mile parts and labor guarantee for complete peace of mind.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const router = useRouter();

  const handleBookClick = () => {
    router.push("/book");
  };

  return (
    <section id="faq" className="bg-background py-8 md:py-14 relative overflow-hidden select-none">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 left-0 w-[25%] h-[40%] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[20%] h-[30%] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-2 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading and CTA */}
          <div className="lg:col-span-5 flex flex-col space-y-6 lg:sticky lg:top-24">
            <div className="space-y-4">
              <span className="text-xs font-bold text-secondary uppercase tracking-widest block">
                Have Questions?
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-heading dark:text-white tracking-tight leading-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-base text-body-text leading-relaxed">
                Got a warning light or a complex electrical issue you want solved? Find answers to our diagnostic process, pricing, and workshop guarantees.
              </p>
            </div>

            {/* Help Alert Box */}
            <div className="bg-section border border-border rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-heading dark:text-white">Still have questions?</h4>
                  <p className="text-xs text-body-text">We are happy to assist you directly.</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button 
                  onClick={handleBookClick}
                  className="bg-primary hover:bg-primary/95 text-white text-xs font-bold py-5 px-5 rounded-xl flex-grow shadow-md transition-all cursor-pointer"
                >
                  Book Diagnosis
                </Button>
                <a 
                  href="tel:+44 7454 055461" 
                  className="border border-border text-heading dark:text-white hover:bg-background text-xs font-bold py-2.5 px-5 rounded-xl inline-flex items-center justify-center gap-2 transition-all cursor-pointer bg-section"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Workshop</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="border border-border rounded-2xl bg-section dark:bg-card overflow-hidden transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer group"
                  >
                    <span className="text-sm sm:text-base font-bold text-heading dark:text-white group-hover:text-primary transition-colors duration-200 pr-4">
                      {faq.question}
                    </span>
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center text-secondary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-5 pt-1 border-t border-border">
                          <p className="text-xs sm:text-sm text-body-text leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
