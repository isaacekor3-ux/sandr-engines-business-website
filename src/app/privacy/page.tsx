"use client";

import React from "react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Shield, Eye, Lock, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: Eye,
      title: "1. Information We Collect",
      content:
        "We collect contact information (name, address, email, telephone number) when you book an appointment. We also collect specific vehicle telemetry, registration details, VIN/chassis numbers, ECU logs, and digital video proof recordings of your vehicle's components during diagnostics.",
    },
    {
      icon: Shield,
      title: "2. How We Use Your Data",
      content:
        "Your details are used solely to conduct root-cause diagnostics, compile detailed diagnostic reports, email/text you high-definition video proof reports before commencing repairs, process payments, and manage warranty claims.",
    },
    {
      icon: Lock,
      title: "3. Data Security & Storage",
      content:
        "Diagnostic scans and ECU data are stored securely on our localized factory server and are used for tracking your vehicle's historical maintenance. We never sell, lease, or distribute your personal or vehicle data to third-party marketing companies.",
    },
    {
      icon: FileText,
      title: "4. Your Legal Rights",
      content:
        "Under UK GDPR regulations, you have the right to request access to the personal data we hold about you, request corrections to incorrect data, request deletion of your records under certain conditions, and request copies of your diagnostic scans.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-section dark:bg-slate-950 py-16 md:py-24 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 pt-9 sm:px-6">

          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-secondary hover:text-primary uppercase tracking-wider mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          {/* Page Title Header */}
          <div className="space-y-4 border-b border-border pb-8 mb-12">
            <h1 className="text-4xl font-extrabold text-heading dark:text-white tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-sm text-body-text">
              Last Updated: June 27, 2026 • S&R Engine & Diagnostics Ltd
            </p>
            <p className="text-base text-body-text leading-relaxed">
              At S&R Engine & Diagnostics, we take your privacy and vehicle data security seriously. This policy explains how we collect, store, and use your personal information and diagnostic telemetry.
            </p>
          </div>

          {/* Main Content Sections */}
          <div className="space-y-10">
            {sections.map((sec, idx) => {
              const Icon = sec.icon;
              return (
                <div
                  key={idx}
                  className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-heading dark:text-white">
                      {sec.title}
                    </h2>
                  </div>
                  <p className="text-sm sm:text-base text-body-text leading-relaxed pl-0 sm:pl-13">
                    {sec.content}
                  </p>
                </div>
              );
            })}

            {/* In-depth legal copy */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              <h2 className="text-lg sm:text-xl font-bold text-heading dark:text-white border-b border-border pb-3">
                Detailed Policy Outline
              </h2>

              <div className="space-y-4 text-sm text-body-text leading-relaxed">
                <p>
                  <strong>Cookies & Website Telemetry:</strong> Our website uses cookies to store temporary scheduling data, secure form inputs, and track analytical visitor traffic. You can choose to disable cookies in your browser settings, though it may disrupt appointment scheduler modules.
                </p>
                <p>
                  <strong>Video & Imagery Storage:</strong> HD video proof reports of diagnostic scans or physical component wear are securely uploaded to a cloud server using unique, unindexed hash links. These reports are kept for a maximum of 24 months to support warranty claims before being archived.
                </p>
                <p>
                  <strong>Contacting Us:</strong> If you have any inquiries regarding your data security or wish to request data erasure, please contact us directly at <a href="mailto:info@sandrengines.co.uk" className="text-secondary hover:underline font-bold">info@sandrengines.co.uk</a>.
                </p>
              </div>
            </div>

          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
