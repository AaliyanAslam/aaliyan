"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { inter } from "../fonts";
import gsap from "gsap";

const navLinks = [
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About Me" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);
  const linkItemsRef = useRef([]);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const openSidebar = useCallback(() => {
    const sidebar = sidebarRef.current;
    const overlay = overlayRef.current;
    const links = linkItemsRef.current.filter(Boolean);

    if (!sidebar || !overlay) return;

    // Kill any running animations
    gsap.killTweensOf([sidebar, overlay, ...links]);

    // Animate overlay in
    gsap.to(overlay, {
      autoAlpha: 1,
      duration: 0.3,
      ease: "power2.out",
    });

    // Slide sidebar in from right
    gsap.to(sidebar, {
      x: 0,
      duration: 0.5,
      ease: "power3.out",
    });

    // Stagger links in
    gsap.fromTo(
      links,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.15,
      }
    );

    setIsOpen(true);
  }, []);

  const closeSidebar = useCallback(() => {
    const sidebar = sidebarRef.current;
    const overlay = overlayRef.current;
    const links = linkItemsRef.current.filter(Boolean);

    if (!sidebar || !overlay) return;

    gsap.killTweensOf([sidebar, overlay, ...links]);

    // Fade links out
    gsap.to(links, {
      x: 30,
      opacity: 0,
      duration: 0.2,
      stagger: 0.04,
      ease: "power2.in",
    });

    // Slide sidebar out
    gsap.to(sidebar, {
      x: "100%",
      duration: 0.4,
      ease: "power3.in",
      delay: 0.1,
    });

    // Fade overlay out
    gsap.to(overlay, {
      autoAlpha: 0,
      duration: 0.3,
      delay: 0.15,
    });

    setIsOpen(false);
  }, []);

  return (
    <>
      {/* ── Navbar ── */}
      <nav
        className={`fixed top-4 left-0 right-0 px-4 md:px-10 ${inter.className}`}
        style={{ zIndex: 50 }}
      >
        <div className="mx-auto max-w-420 backdrop-blur-md bg-white/10 rounded-full px-6 sm:px-8 py-3 border border-white/20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-bold text-2xl sm:text-3xl md:text-4xl text-gray-800">
            Aaliyan
          </Link>

          {/* Desktop links — hidden below md */}
          <div className="hidden md:flex gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-800 hover:text-gray-400 transition text-base md:text-lg lg:text-xl font-bold"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Hamburger — visible below md */}
          <button
            onClick={isOpen ? closeSidebar : openSidebar}
            aria-label="Toggle menu"
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[5px]"
            style={{ zIndex: 70 }}
          >
            <span
              className={`block h-[2.5px] w-6 bg-gray-800 rounded transition-all duration-300 origin-center ${
                isOpen ? "rotate-45 translate-y-[7.5px]" : ""
              }`}
            />
            <span
              className={`block h-[2.5px] w-6 bg-gray-800 rounded transition-all duration-300 ${
                isOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block h-[2.5px] w-6 bg-gray-800 rounded transition-all duration-300 origin-center ${
                isOpen ? "-rotate-45 -translate-y-[7.5px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* ── Overlay ── */}
      <div
        ref={overlayRef}
        onClick={closeSidebar}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        style={{ zIndex: 55, visibility: "hidden", opacity: 0 }}
      />

      {/* ── Sidebar ── */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-[75vw] max-w-[320px] bg-white shadow-2xl flex flex-col ${inter.className}`}
        style={{ zIndex: 60, transform: "translateX(100%)" }}
      >
        {/* Close button */}
        <div className="flex justify-end p-6">
          <button
            onClick={closeSidebar}
            aria-label="Close menu"
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Sidebar links */}
        <nav className="flex flex-col gap-2 px-8 mt-4">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              ref={(el) => { linkItemsRef.current[i] = el; }}
              onClick={closeSidebar}
              className="text-2xl font-bold text-gray-800 hover:text-gray-400 transition-colors py-4 border-b border-gray-100 last:border-0"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bottom accent */}
        <div className="mt-auto p-8">
          <p className="text-sm text-gray-400">© 2026 Aaliyan</p>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
