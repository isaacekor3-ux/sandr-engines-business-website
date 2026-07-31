"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const isHomePage = window.location.pathname === "/";
    const isHashLink = href.startsWith("#") || href.includes("#");

    if (isHomePage && isHashLink) {
      e.preventDefault();
      const targetId = href.includes("#") ? href.split("#")[1] : href;
      const elem = document.getElementById(targetId);
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
    }
  };

  return (
    <footer id="contact" className="bg-[#0F172A] text-slate-400 pt-20 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Upper footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800">

          {/* Col 1: Logo & Info */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <Link href="#hero" className="flex items-center gap-2 group self-start">
              <div className="relative w-12 h-10 rounded-lg overflow-hidden border border-slate-700 shadow-md group-hover:scale-105 transition-transform duration-300 flex items-center justify-center bg-white cursor-pointer">
                <Image
                  src="/assets/logo/logo.jpeg"
                  alt="S&R Engine & Diagnostics Logo"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <span className="text-lg md:text-xl font-bold text-white tracking-tight flex items-center">
                  S&R Engine
                  <span className="text-secondary ml-1 font-extrabold">&</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 block -mt-1 font-semibold">
                  Diagnostics Ltd
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed">
              Specialist diagnostics center and mechanical repair garage. We carry out coding, reprogramming, wiring, and mechanical overhauls for all major car brands.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: "About", href: "/about" },
                { name: "Service", href: "/services" },
                { name: "Cars for Sale", href: "/car-sales" },
                { name: "Contact", href: "/contact" },
                { name: "Book Diagnostic", href: "/book" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="hover:text-secondary hover:underline transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Operating Hours */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Opening Hours</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex justify-between items-center py-1 border-b border-slate-800/40">
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-secondary" /> Mon - Fri</span>
                <span className="font-semibold text-white">9:00 AM - 5:30 PM</span>
              </li>
              <li className="flex justify-between items-center py-1 border-b border-slate-800/40">
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-secondary" /> Saturday</span>
                <span className="font-semibold text-white">9:00 AM - 3:00 PM</span>
              </li>
              <li className="flex justify-between items-center py-1">
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-600" /> Sunday</span>
                <span className="text-slate-500 font-semibold">Closed</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Location */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Find Our Garage</h4>

            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-slate-300 leading-relaxed">
                  Wolverhampton Road,
                  Heath Town,
                  Wolverhampton,
                  WV10 0QQ
                </span>
              </div>
              <div className="flex items-center gap-2 pt-1.5">
                <Mail className="w-4 h-4 text-secondary flex-shrink-0" />
                <a href="mailto:info@sandrengines.co.uk" className="hover:text-white text-slate-300">
                  info@sandrengines.co.uk
                </a>
              </div>
              <div className="flex items-center gap-2 pt-1.5">
                <Phone className="w-4 h-4 text-secondary flex-shrink-0" />
                <a href="tel:+447454055461" className="hover:text-white text-slate-300">
                  +44 7454 055461
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Lower footer copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>© {currentYear} S&R Engine & Diagnostics Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
