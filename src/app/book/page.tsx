"use client";

import React, { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import {
  Calendar,
  Car,
  Wrench,
  AlertCircle,
  CheckCircle2,
  MapPin,
  Phone,
  User,
  FileText,
  Clock,
  ArrowLeft,
  Sparkles,
  Cpu,
  ArrowRight,
  Home
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

type BookingType = "diagnostic" | "full_service";

interface BookingFormData {
  fullName: string;
  phone: string;
  regNumber: string;
  makeModel: string;
  faultDescription: string;
  requireMobile: boolean;
  address: string;
  preferredDate: string;
  preferredTimeSlot: string;
  serviceType: string;
}

function BookingForm() {
  const searchParams = useSearchParams();
  const defaultService = searchParams.get("service") || "Engine Diagnostics";
  const defaultBookingType = searchParams.get("type") === "full_service" ? "full_service" : "diagnostic";

  const [bookingType, setBookingType] = useState<BookingType>(defaultBookingType);
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: "",
    phone: "",
    regNumber: "",
    makeModel: "",
    faultDescription: "",
    requireMobile: false,
    address: "",
    preferredDate: "",
    preferredTimeSlot: "",
    serviceType: defaultService,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData | "submit", string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState(0); 
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "regNumber" ? value.toUpperCase() : value,
    }));
    
    if (errors[name as keyof BookingFormData]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof BookingFormData];
        return next;
      });
    }
  };

  const handleToggleMobile = () => {
    const nextVal = !formData.requireMobile;
    setFormData((prev) => ({
      ...prev,
      requireMobile: nextVal,
      address: nextVal ? prev.address : "",
    }));

    if (errors.address) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.address;
        return next;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.regNumber.trim()) {
      newErrors.regNumber = "Vehicle registration plate is required";
    }

    if (!formData.makeModel.trim()) {
      newErrors.makeModel = "Vehicle make & model are required";
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = "Please choose a date";
    }

    if (!formData.preferredTimeSlot) {
      newErrors.preferredTimeSlot = "Please choose a preferred time slot";
    }

    if (bookingType === "diagnostic") {
      // Diagnostic specific validation
      if (!formData.faultDescription.trim()) {
        newErrors.faultDescription = "Please describe the fault or issue";
      }
      if (formData.requireMobile && !formData.address.trim()) {
        newErrors.address = "An address is required for mobile callouts";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStep(1);

    try {
      const stepTimer1 = setTimeout(() => setSubmitStep(2), 800);
      const stepTimer2 = setTimeout(() => setSubmitStep(3), 1600);

      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingType,
          fullName: formData.fullName,
          phone: formData.phone,
          regNumber: formData.regNumber,
          makeModel: formData.makeModel,
          faultDescription: formData.faultDescription,
          requireMobile: formData.requireMobile,
          address: formData.address,
          preferredDate: formData.preferredDate,
          preferredTimeSlot: formData.preferredTimeSlot,
          serviceType: formData.serviceType,
        }),
      });

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to submit booking");
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      console.error(err);
      setErrors((prev) => ({
        ...prev,
        submit: err.message || "An unexpected error occurred. Please try again.",
      }));
      setIsSubmitting(false);
    }
  };

  const serviceCategories = [
    "Engine Diagnostics",
    "Mobile Diagnostics",
    "MOT Testing & Repairs",
    "Brake Service & Repairs",
    "Suspension & Steering Repairs",
    "Engine Servicing & Maintenance",
    "Car Headlight Restoration and Polish",
    "Air-conditioning Regas and Service",
    "Tyre Repair",
    "General Vehicle Repairs",
    "Other Mechanical Issue"
  ];

  const timeSlots = [
    { value: "morning", label: "Morning (9:00 AM - 12:00 PM)" },
    { value: "midday", label: "Midday (12:00 PM - 3:00 PM)" },
    { value: "afternoon", label: "Late Afternoon (3:00 PM - 5:00 PM)" },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-background transition-colors duration-300 min-h-screen">
        
        {/* Banner header */}
        <section className="relative pt-32 pb-6 bg-section overflow-hidden border-b border-border/40">
          <div className="absolute top-0 right-0 w-[35%] h-[40%] bg-gradient-to-b from-primary/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[25%] h-[35%] bg-gradient-to-t from-secondary/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-4xl mx-auto px-4 relative z-10 text-center space-y-4">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-heading dark:text-white tracking-tight">
              Request Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">S&R Booking</span>
            </h1>
            <p className="text-sm sm:text-base text-body-text max-w-2xl mx-auto leading-relaxed">
              Confirm your vehicle details and preferred appointment slot. Our expert specialists will schedule your slot and call you back to lock it in.
            </p>
          </div>
        </section>

        {/* Form area */}
        <section className="pt-6 pb-12 max-w-4xl mx-auto px-4">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="booking-form-container"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-card border border-border/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden"
              >
                
                {/* Visual Type Tabs */}
                <div className="grid grid-cols-2 gap-3 p-1 bg-section rounded-2xl mb-8 border border-border/40">
                  <button
                    type="button"
                    onClick={() => {
                      setBookingType("diagnostic");
                      setErrors({});
                    }}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      bookingType === "diagnostic"
                        ? "bg-secondary text-white shadow-sm border border-secondary/20"
                        : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                    }`}
                  >
                    <Cpu className={`w-4 h-4 ${bookingType === "diagnostic" ? "text-white" : "text-slate-400"}`} />
                    Diagnostic & Repair
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setBookingType("full_service");
                      setErrors({});
                    }}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      bookingType === "full_service"
                        ? "bg-secondary text-white shadow-sm border border-secondary/20"
                        : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                    }`}
                  >
                    <Wrench className={`w-4 h-4 ${bookingType === "full_service" ? "text-white" : "text-slate-400"}`} />
                    Full Vehicle Service
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Dynamic Alert Banner */}
                  <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-2xl p-4 flex gap-3 text-xs sm:text-sm text-heading dark:text-slate-300">
                    <Sparkles className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-primary dark:text-blue-400">
                        {bookingType === "diagnostic" 
                          ? "Diagnostic & Fault Booking details: " 
                          : "Full Servicing schedule guidelines: "}
                      </span>
                      {bookingType === "diagnostic"
                        ? "Perfect for check engine lights, mechanical faults, or specific repair jobs. Address required only for Mobile / Home diagnostics."
                        : "Includes dynamic synthetic fluid flush, filters swap, engine tune evaluation, and full health checks. No fault description needed."}
                    </div>
                  </div>

                  {/* Form Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    {/* Full Name */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-bold text-heading dark:text-white uppercase tracking-wider block">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="e.g. Liam Cooper"
                          className={`w-full pl-10 pr-4 py-3 text-sm bg-section border ${
                            errors.fullName ? "border-destructive" : "border-border"
                          } rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-heading dark:text-white transition-all`}
                        />
                      </div>
                      {errors.fullName && (
                        <p className="text-[10px] text-destructive font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Contact Phone Number */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-heading dark:text-white uppercase tracking-wider block">
                        Contact Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="e.g. +44 7123 456789"
                          className={`w-full pl-10 pr-4 py-3 text-sm bg-section border ${
                            errors.phone ? "border-destructive" : "border-border"
                          } rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-heading dark:text-white transition-all`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-[10px] text-destructive font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* UK License Plate Style Registration Number */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-heading dark:text-white uppercase tracking-wider block">
                        Vehicle Registration Number *
                      </label>
                      <div className="relative flex rounded-xl border border-border overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                        {/* UK Blue flag strip */}
                        <div className="bg-[#003399] w-7 flex flex-col justify-center items-center text-white text-[7px] font-bold p-1 select-none flex-shrink-0">
                          <span className="text-[8px]">GB</span>
                        </div>
                        {/* Yellow UK plate style input */}
                        <input
                          type="text"
                          name="regNumber"
                          value={formData.regNumber}
                          onChange={handleInputChange}
                          placeholder="e.g. AB12 CDE"
                          className={`w-full px-4 py-3 text-sm font-extrabold uppercase tracking-widest bg-yellow-400/10 dark:bg-yellow-400/[0.04] text-heading dark:text-yellow-400 placeholder-slate-400 border-none outline-none focus:ring-0`}
                        />
                      </div>
                      {errors.regNumber && (
                        <p className="text-[10px] text-destructive font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.regNumber}
                        </p>
                      )}
                    </div>

                    {/* Vehicle Make and Model */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-bold text-heading dark:text-white uppercase tracking-wider block">
                        Vehicle Make & Model *
                      </label>
                      <div className="relative">
                        <Car className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          name="makeModel"
                          value={formData.makeModel}
                          onChange={handleInputChange}
                          placeholder="e.g. BMW 320d / Volkswagen Golf MK7"
                          className={`w-full pl-10 pr-4 py-3 text-sm bg-section border ${
                            errors.makeModel ? "border-destructive" : "border-border"
                          } rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-heading dark:text-white transition-all`}
                        />
                      </div>
                      {errors.makeModel && (
                        <p className="text-[10px] text-destructive font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.makeModel}
                        </p>
                      )}
                    </div>

                    {/* Preferred Appointment Date */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-heading dark:text-white uppercase tracking-wider block">
                        Preferred Date *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                        <input
                          type="date"
                          name="preferredDate"
                          min={new Date().toISOString().split("T")[0]}
                          value={formData.preferredDate}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 text-sm bg-section border ${
                            errors.preferredDate ? "border-destructive" : "border-border"
                          } rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-heading dark:text-white transition-all`}
                        />
                      </div>
                      {errors.preferredDate && (
                        <p className="text-[10px] text-destructive font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.preferredDate}
                        </p>
                      )}
                    </div>

                    {/* Preferred Appointment Time Slot */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-heading dark:text-white uppercase tracking-wider block">
                        Preferred Time Window *
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                        <select
                          name="preferredTimeSlot"
                          value={formData.preferredTimeSlot}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 text-sm bg-section border ${
                            errors.preferredTimeSlot ? "border-destructive" : "border-border"
                          } rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-heading dark:text-white transition-all appearance-none`}
                        >
                          <option value="">Select a time slot</option>
                          {timeSlots.map((ts) => (
                            <option key={ts.value} value={ts.value}>
                              {ts.label}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-4 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-500 w-0 h-0" />
                      </div>
                      {errors.preferredTimeSlot && (
                        <p className="text-[10px] text-destructive font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.preferredTimeSlot}
                        </p>
                      )}
                    </div>

                    {/* DIAGNOSTIC-ONLY FIELDS */}
                    {bookingType === "diagnostic" && (
                      <div className="sm:col-span-2 space-y-6 pt-2">
                        {/* Service Type Selection */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-heading dark:text-white uppercase tracking-wider block">
                            Specific Service Required
                          </label>
                          <div className="relative">
                            <Wrench className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                            <select
                              name="serviceType"
                              value={formData.serviceType}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-4 py-3 text-sm bg-section border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-heading dark:text-white transition-all appearance-none"
                            >
                              {serviceCategories.map((cat) => (
                                <option key={cat} value={cat}>
                                  {cat}
                                </option>
                              ))}
                            </select>
                            <div className="absolute right-4 top-4 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-500 w-0 h-0" />
                          </div>
                        </div>

                        {/* Mobile Diagnostic Address Toggle */}
                        <div className="bg-section border border-border/50 rounded-2xl p-4 space-y-4">
                          <div className="flex justify-between items-center">
                            <div className="flex gap-3">
                              <Home className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                              <div>
                                <h4 className="text-sm font-bold text-heading dark:text-white">Mobile Visit / Diagnostic Callout?</h4>
                                <p className="text-xs text-body-text">Do you require our mobile technician to come to your home or work?</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={handleToggleMobile}
                              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                formData.requireMobile ? "bg-primary" : "bg-slate-300 dark:bg-slate-700"
                              }`}
                            >
                              <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                  formData.requireMobile ? "translate-x-5" : "translate-x-0"
                                }`}
                              />
                            </button>
                          </div>

                          {/* Address Expand Area */}
                          <AnimatePresence>
                            {formData.requireMobile && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25 }}
                                className="space-y-1.5 overflow-hidden"
                              >
                                <label className="text-xs font-bold text-heading dark:text-white uppercase tracking-wider block">
                                  Home/Work Address *
                                </label>
                                <div className="relative">
                                  <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                                  <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full street address & postcode"
                                    className={`w-full pl-10 pr-4 py-3 text-sm bg-background border ${
                                      errors.address ? "border-destructive" : "border-border"
                                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-heading dark:text-white transition-all`}
                                  />
                                </div>
                                {errors.address && (
                                  <p className="text-[10px] text-destructive font-semibold flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" /> {errors.address}
                                  </p>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Brief Fault Description */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-heading dark:text-white uppercase tracking-wider block">
                            Brief description of the fault/issue *
                          </label>
                          <div className="relative">
                            <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                            <textarea
                              name="faultDescription"
                              rows={4}
                              value={formData.faultDescription}
                              onChange={handleInputChange}
                              placeholder="e.g. Engine light turned on yesterday morning. Vibration coming from underbody at 50mph. No power when accelerating."
                              className={`w-full pl-10 pr-4 py-3 text-sm bg-section border ${
                                errors.faultDescription ? "border-destructive" : "border-border"
                              } rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-heading dark:text-white transition-all resize-none`}
                            />
                          </div>
                          {errors.faultDescription && (
                            <p className="text-[10px] text-destructive font-semibold flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.faultDescription}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Submission triggers */}
                  <div className="pt-4 border-t border-border/40 flex flex-col sm:flex-row sm:justify-between items-center gap-4">
                    {errors.submit && (
                      <p className="text-xs text-destructive font-semibold flex items-center gap-1.5 self-start sm:self-center">
                        <AlertCircle className="w-4 h-4 shrink-0" /> {errors.submit}
                      </p>
                    )}
                    <div className="sm:ml-auto w-full sm:w-auto">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-primary hover:bg-primary/95 text-white shadow-lg shadow-primary/20 text-sm font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-[1.02] flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>
                              {submitStep === 1 && "Verifying registration..."}
                              {submitStep === 2 && "Checking garage schedules..."}
                              {submitStep === 3 && "Securing appointment slot..."}
                            </span>
                          </>
                        ) : (
                          <>
                            <span>Submit Booking Request</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                </form>
              </motion.div>
            ) : (
              /* Success screen receipt */
              <motion.div
                key="booking-success-container"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-2xl text-center space-y-6 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-[40%] h-[35%] bg-gradient-to-b from-emerald-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
                
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-heading dark:text-white">
                    Booking Request Sent!
                  </h2>
                  <p className="text-sm text-body-text max-w-md mx-auto">
                    We have received your vehicle details and calendar request. An S&R Engine Specialist will contact you shortly to confirm your booking.
                  </p>
                </div>

                {/* Printable Booking Receipt Card */}
                <div className="max-w-md mx-auto bg-section border border-border rounded-2xl p-6 text-left space-y-4">
                  <div className="flex justify-between items-center border-b border-border/80 pb-3">
                    <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                      Booking Status
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                      Pending Callback
                    </span>
                  </div>

                  <div className="space-y-2.5 text-sm">
                    {formData.fullName && (
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-semibold text-xs">Customer Name:</span>
                        <span className="text-heading dark:text-white font-bold">{formData.fullName}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-semibold text-xs">Phone Number:</span>
                      <span className="text-heading dark:text-white font-bold">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-semibold text-xs">Registration Plate:</span>
                      <span className="px-2 py-0.5 bg-yellow-400 text-slate-900 rounded font-black tracking-wider text-[11px]">
                        {formData.regNumber}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-semibold text-xs">Vehicle Model:</span>
                      <span className="text-heading dark:text-white font-bold">{formData.makeModel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-semibold text-xs">Service Selected:</span>
                      <span className="text-heading dark:text-white font-bold">
                        {bookingType === "full_service" ? "Full Vehicle Service" : formData.serviceType}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-semibold text-xs">Home Visit?</span>
                      <span className="text-heading dark:text-white font-bold">
                        {formData.requireMobile ? "Yes (Mobile Diagnostics)" : "No (Garage Appointment)"}
                      </span>
                    </div>
                    {formData.requireMobile && formData.address && (
                      <div className="flex flex-col pt-1 border-t border-border/40">
                        <span className="text-slate-400 font-semibold text-xs mb-1">Callout Address:</span>
                        <span className="text-heading dark:text-white font-semibold text-xs leading-normal">
                          {formData.address}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between pt-1.5 border-t border-border/40">
                      <span className="text-slate-400 font-semibold text-xs">Preferred Date:</span>
                      <span className="text-primary dark:text-blue-400 font-bold">{formData.preferredDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-semibold text-xs">Time Window:</span>
                      <span className="text-heading dark:text-white font-bold capitalize">
                        {formData.preferredTimeSlot === "morning" && "Morning (9am - 12pm)"}
                        {formData.preferredTimeSlot === "midday" && "Midday (12pm - 3pm)"}
                        {formData.preferredTimeSlot === "afternoon" && "Late Afternoon (3pm - 5pm)"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/" className="cursor-pointer">
                    <Button variant="outline" className="w-full sm:w-auto rounded-xl py-3 px-6 cursor-pointer">
                      Return to Homepage
                    </Button>
                  </Link>
                  <a href="tel:+447454055461" className="cursor-pointer">
                    <Button className="bg-secondary hover:bg-secondary/95 text-white w-full sm:w-auto rounded-xl py-3 px-6 flex items-center gap-1.5 cursor-pointer shadow-lg shadow-secondary/15">
                      <Phone className="w-4 h-4" /> Call to Confirm Now
                    </Button>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

      </main>
      <Footer />
    </>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-slate-400">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-semibold text-sm">Loading booking scheduling assistant...</p>
      </div>
    }>
      <BookingForm />
    </Suspense>
  );
}
