"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Car,
  MessageSquare,
  Wrench,
  Loader2
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    regNumber: "",
    subject: "Engine Diagnostics",
    message: ""
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const subjects = [
    "Engine Diagnostics",
    "Mobile Diagnostics",
    "MOT Testing & Repairs",
    "Brake Service & Repairs",
    "Suspension & Steering",
    "Engine Servicing & Maintenance",
    "Car Headlight Restoration and Polish",
    "Air-conditioning Regas and Service",
    "Tyre Repair",
    "Other Mechanical Inquiry"
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) tempErrors.name = "Full name is required.";
    if (!formData.email.trim()) {
      tempErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address.";
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone number is required.";
    }
    if (!formData.message.trim()) {
      tempErrors.message = "Message details are required.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          regNumber: formData.regNumber,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to submit contact message");
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        regNumber: "",
        subject: "Engine Diagnostics",
        message: ""
      });
    } catch (err: any) {
      console.error(err);
      setErrors((prev) => ({
        ...prev,
        submit: err.message || "An unexpected error occurred. Please try again.",
      }));
      setIsSubmitting(false);
    }
  };

  const contactDetails = [
    {
      icon: MapPin,
      title: "Our Garage Location",
      details: [
        "Wolverhampton Road,",
        "Heath Town,",
        "Wolverhampton, WV10 0QQ"
      ],
      linkText: "Get Directions on Google Maps",
      linkUrl: "https://maps.google.com/?q=Wolverhampton+Road+Heath+Town+Wolverhampton+WV10+0QQ"
    },
    {
      icon: Phone,
      title: "Call Specialist",
      details: [
        "Direct Line: +44 7454 055461",
        "Available for emergency bookings and advice."
      ],
      linkText: "Call Specialist Now",
      linkUrl: "tel:+447454055461"
    },
    {
      icon: Mail,
      title: "Email Support",
      details: [
        "info@sandrengines.co.uk",
        "We aim to respond to all inquiries within 12 hours."
      ],
      linkText: "Send direct email",
      linkUrl: "mailto:info@sandrengines.co.uk"
    },
    {
      icon: Clock,
      title: "Opening Hours",
      details: [
        "Monday - Friday: 9:00 AM - 5:00 PM",
        "Saturday: 10:00 AM - 3:00 PM",
        "Sunday: Closed"
      ],
      linkText: null,
      linkUrl: null
    }
  ];

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-background transition-colors duration-300">

        {/* Hero Section */}
        <section className="relative pt-28 pb-12 bg-section overflow-hidden">
          {/* Ambient light blobs */}
          <div className="absolute top-0 right-0 w-[45%] h-[40%] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[35%] h-[35%] bg-gradient-to-t from-secondary/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 md:px-2 relative z-10 text-center space-y-4">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-1 bg-background border border-border rounded-full px-3.5 py-1.5 text-xs font-semibold text-secondary uppercase tracking-wider"
            >
              Get in Touch
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-heading dark:text-white tracking-tight max-w-4xl mx-auto leading-tight"
            >
              Connect With Our
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Engine & Diagnostics Garage
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base text-body-text max-w-2xl mx-auto leading-relaxed"
            >
              Have a warning light flashing, booking query, or need custom diagnostic remapping? Contact us directly or fill out the form below.
            </motion.p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 max-w-7xl mx-auto px-4 md:px-2">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">

            {/* Left Column: Contact details cards */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="mb-6 space-y-2">
                <h2 className="text-2xl font-bold text-heading dark:text-white tracking-tight">
                  Our Contact Information
                </h2>
                <p className="text-sm text-body-text leading-relaxed">
                  Visit our specialist center in Wolverhampton or reach out directly to check diagnostic calendar availability.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
                {contactDetails.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-card border border-border rounded-2xl p-5 space-y-4 hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-base text-heading dark:text-white">
                          {item.title}
                        </h3>
                        <div className="space-y-1 text-xs sm:text-sm text-body-text">
                          {item.details.map((detail, dIdx) => (
                            <p key={dIdx} className="leading-relaxed">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>

                      {item.linkText && item.linkUrl && (
                        <div className="pt-2">
                          <a
                            href={item.linkUrl}
                            target={item.linkUrl.startsWith("http") ? "_blank" : undefined}
                            rel={item.linkUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary hover:text-secondary/80 transition-colors group cursor-pointer"
                          >
                            <span>{item.linkText}</span>
                            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Contact form card */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between flex-grow h-full">

                <h3 className="text-xl font-bold text-heading dark:text-white mb-6 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-secondary" />
                  Send an Online Inquiry
                </h3>

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="contact-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Name */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-heading dark:text-white uppercase tracking-wider">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="e.g. John Smith"
                            className={`w-full px-4 py-2.5 text-sm bg-section border ${errors.name ? "border-destructive" : "border-border"
                              } rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-heading dark:text-white transition-all`}
                          />
                          {errors.name && (
                            <p className="text-[10px] text-destructive font-semibold flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.name}
                            </p>
                          )}
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-heading dark:text-white uppercase tracking-wider">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="e.g. john@example.com"
                            className={`w-full px-4 py-2.5 text-sm bg-section border ${errors.email ? "border-destructive" : "border-border"
                              } rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-heading dark:text-white transition-all`}
                          />
                          {errors.email && (
                            <p className="text-[10px] text-destructive font-semibold flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Phone */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-heading dark:text-white uppercase tracking-wider">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="e.g. +44 7911 123456"
                            className={`w-full px-4 py-2.5 text-sm bg-section border ${errors.phone ? "border-destructive" : "border-border"
                              } rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-heading dark:text-white transition-all`}
                          />
                          {errors.phone && (
                            <p className="text-[10px] text-destructive font-semibold flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.phone}
                            </p>
                          )}
                        </div>

                        {/* VRN (Car registration) */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-heading dark:text-white uppercase tracking-wider flex items-center gap-1">
                            <Car className="w-3.5 h-3.5 text-secondary" /> Vehicle Registration (VRN)
                          </label>
                          <input
                            type="text"
                            name="regNumber"
                            value={formData.regNumber}
                            onChange={handleInputChange}
                            placeholder="e.g. AB12 CDE"
                            className="w-full px-4 py-2.5 text-sm bg-section border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-heading dark:text-white uppercase transition-all placeholder:normal-case"
                          />
                        </div>
                      </div>

                      {/* Subject */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-heading dark:text-white uppercase tracking-wider">
                          Inquiry Subject
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 text-sm bg-section border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-heading dark:text-white transition-all"
                        >
                          {subjects.map((subj) => (
                            <option key={subj} value={subj}>
                              {subj}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Message */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-heading dark:text-white uppercase tracking-wider">
                          Message Details *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder="Describe the issue with your vehicle, diagnostic scanner needs, or general repair quotes..."
                          className={`w-full px-4 py-2.5 text-sm bg-section border ${errors.message ? "border-destructive" : "border-border"
                            } rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-heading dark:text-white transition-all resize-none`}
                        />
                        {errors.message && (
                          <p className="text-[10px] text-destructive font-semibold flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.message}
                          </p>
                        )}
                      </div>

                      {/* Submit button */}
                      {errors.submit && (
                        <p className="text-xs text-destructive font-semibold flex items-center gap-1.5 pb-2">
                          <AlertCircle className="w-4 h-4 shrink-0" /> {errors.submit}
                        </p>
                      )}
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary/95 text-white h-11 font-bold shadow-md cursor-pointer flex items-center justify-center gap-2 pt-1"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Submitting Inquiries...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Send Message</span>
                          </>
                        )}
                      </Button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success-message"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8 space-y-4"
                    >
                      <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h4 className="text-xl font-bold text-heading dark:text-white">Inquiry Sent Successfully!</h4>
                      <p className="text-sm text-body-text max-w-sm mx-auto leading-relaxed">
                        Thank you for contacting S&R Engine & Diagnostics. Our specialists will review your vehicle details and reach back to you shortly.
                      </p>
                      <Button
                        onClick={() => setIsSubmitted(false)}
                        variant="outline"
                        className="cursor-pointer"
                      >
                        Send Another Inquiry
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>
        </section>

        {/* Map Section */}
        <section className="pb-16 max-w-7xl mx-auto px-4 md:px-2">
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm h-[450px] relative">
            <iframe
              src="https://maps.google.com/maps?q=Wolverhampton%20Road,%20Heath%20Town,%20Wolverhampton,%20WV10%200QQ&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="S&R Engine & Diagnostics Garage Location Map"
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
