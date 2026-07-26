"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Menu, MapPin, Sun, Moon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const pathname = usePathname();

  // Handle hydration safe client theme mounting
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Listen to scroll events to adjust styling and track active links
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (pathname !== "/") {
        return;
      }

      const sections = ["hero", "about", "services", "contact"];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    if (pathname === "/services") {
      setActiveSection("services");
    } else if (pathname === "/about") {
      setActiveSection("about");
    } else if (pathname === "/contact") {
      setActiveSection("contact");
    } else if (pathname === "/") {
      setActiveSection("hero");
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Navlinks mapping specified by the user
  const navLinks = [
    { name: "Home", href: "/", id: "hero" },
    { name: "About", href: "/about", id: "about" },
    { name: "Service", href: "/services", id: "services" },
    { name: "Contact", href: "/contact", id: "contact" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const isHomePage = window.location.pathname === "/";
    const isServicesPage = window.location.pathname === "/services";
    const isContactPage = window.location.pathname === "/contact";
    const isHashLink = href.startsWith("#") || href.includes("#") || href === "/";
    
    if (isHomePage && isHashLink) {
      e.preventDefault();
      
      if (href === "/") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      }
      
      const targetId = href.includes("#") ? href.split("#")[1] : href;
      const elem = document.getElementById(targetId);
      if (elem) {
        const offset = 80; // height of sticky navbar
        const bodyRect = document.body.getBoundingClientRect().top;
        const elemRect = elem.getBoundingClientRect().top;
        const elemPosition = elemRect - bodyRect;
        const offsetPosition = elemPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    } else if (isServicesPage && href === "/services") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else if (isContactPage && href === "/contact") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Bar - Contact details updated */}
      <div className="bg-[#0F172A] text-white text-xs py-2 px-4 border-b border-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5 sm:gap-4">
          <div className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors">
            <MapPin className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
            <a
              href="https://maps.google.com/?q=Wolverhampton+Road+Heath+Town+Wolverhampton+WV10+0QQ"
              target="_blank"
              rel="noreferrer"
              className="text-secondary hover:text-white text-center sm:text-left cursor-pointer"
            >
              Wolverhampton Road, Heath Town, Wolverhampton, WV10 0QQ
            </a>
          </div>
          <div className="flex items-center">
            <a
              href="tel:+447454055461"
              className="flex items-center gap-1.5 font-bold text-secondary hover:text-white transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 animate-pulse" />
              Call Specialist: +44 7454 055461
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full py-4 px-4 md:px-8 transition-all duration-300 ${isScrolled
            ? "bg-white/90 dark:bg-[#0B0F19]/90 backdrop-blur-md shadow-lg border-b border-slate-200/50 dark:border-slate-800/50 py-3"
            : "bg-transparent py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link 
            href="/" 
            onClick={(e) => handleScrollTo(e as unknown as React.MouseEvent<HTMLAnchorElement>, "/")}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="relative w-12 h-10 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md group-hover:scale-105 transition-transform duration-300 flex items-center justify-center bg-white cursor-pointer">
              <Image
                src="/assets/logo/logo.jpeg"
                alt="S&R Engine & Diagnostics Logo"
                fill
                className="object-contain p-0.5"
              />
            </div>
            <div>
              <span className="text-lg md:text-xl font-bold text-heading dark:text-white tracking-tight flex items-center">
                S&R Engines
                <span className="text-secondary ml-1 font-extrabold">&</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-body-text dark:text-slate-400 block -mt-1 font-semibold">
                Diagnostics Ltd
              </span>
            </div>
          </Link>

          {/* Desktop Right Alignment Group (Nav Links + Toggles + CTA) */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Desktop Navigation Links */}
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className={`text-sm font-semibold transition-colors relative py-1 hover:text-primary dark:hover:text-white cursor-pointer group ${activeSection === link.id
                      ? "text-primary dark:text-white font-bold"
                      : "text-body-text dark:text-slate-400"
                    }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-secondary transition-transform duration-300 origin-left ${activeSection === link.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                  />
                </Link>
              ))}
            </div>

            {/* Separator */}
            <div className="h-5 w-px bg-slate-200 dark:bg-slate-800" />

            {/* Actions group */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-heading dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-transform duration-300 hover:rotate-12 cursor-pointer"
                title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
              >
                {!mounted ? (
                  <div className="w-5 h-5" />
                ) : theme === "dark" ? (
                  <Sun className="w-5 h-5 text-amber-400" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-700" />
                )}
              </Button>

              {/* Book Diagnostic Button */}
              <Link
                href="/book"
                className="cursor-pointer"
              >
                <Button className="bg-primary hover:bg-primary/95 text-white dark:bg-primary dark:hover:bg-primary/90 shadow-md shadow-primary/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                  Book Diagnostic
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Right Controls (Theme toggle & menu sheet trigger) */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Theme toggle directly visible in header */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-heading dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full cursor-pointer"
            >
              {!mounted ? (
                <div className="w-5 h-5" />
              ) : theme === "dark" ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </Button>

            {/* Mobile Sheet Drawer Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-heading dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[350px] bg-white dark:bg-[#0B0F19] border-l border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between"
              >
                <div>
                  <SheetHeader className="mb-8">
                    <SheetTitle className="text-left">
                      <div className="flex items-center gap-2">
                        <div className="relative w-10 h-8 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md flex items-center justify-center bg-white">
                          <Image
                            src="/assets/logo/logo.jpeg"
                            alt="S&R Engine & Diagnostics Logo"
                            fill
                            className="object-contain p-0.5"
                          />
                        </div>
                        <div>
                          <span className="text-md font-bold text-heading dark:text-white tracking-tight flex items-center">
                            S&R Engine
                            <span className="text-secondary ml-1 font-extrabold">&</span>
                          </span>
                          <span className="text-[8px] uppercase tracking-widest text-body-text dark:text-slate-400 block -mt-1 font-semibold">
                            Diagnostics Ltd
                          </span>
                        </div>
                      </div>
                    </SheetTitle>
                  </SheetHeader>

                  {/* Mobile Links list */}
                  <div className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleScrollTo(e, link.href)}
                        className={`text-base font-bold py-2 border-b border-slate-100 dark:border-slate-900 transition-colors hover:text-primary dark:hover:text-white cursor-pointer ${activeSection === link.id
                            ? "text-primary dark:text-white"
                            : "text-body-text dark:text-slate-400"
                          }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Mobile Drawer Details footer */}
                <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-900">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-heading dark:text-white">Garage Location</p>
                      <p className="text-xs text-body-text dark:text-slate-400 leading-normal">
                        Wolverhampton Road, Heath Town, Wolverhampton, WV10 0QQ
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Phone className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-heading dark:text-white">Emergency Booking</p>
                      <a href="tel:+447454055461" className="text-xs text-body-text dark:text-slate-400 hover:text-primary hover:underline">
                        +44 7454 055461
                      </a>
                    </div>
                  </div>

                  {/* CTA button inside drawer */}
                  <Link
                    href="/book"
                    className="block w-full pt-2 cursor-pointer"
                  >
                    <Button className="w-full bg-primary hover:bg-primary/95 text-white flex items-center justify-center gap-1.5 cursor-pointer">
                      Book Diagnostic <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
