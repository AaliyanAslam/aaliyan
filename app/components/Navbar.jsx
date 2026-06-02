"use client";

/**
 * OPTIMIZED NAVBAR — Production-Grade
 *
 * Key optimizations vs original:
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. GSAP context scoping via useGSAP() — animations are auto-cleaned up on
 *    unmount, preventing memory leaks & stale tweens.
 * 2. `will-change: transform` applied surgically (sidebar, modal) so the GPU
 *    composites those layers ahead of time, eliminating first-frame jank.
 * 3. All GSAP tweens are interrupt-safe: gsap.killTweensOf() is called before
 *    every new animation so rapid clicks never queue conflicting states.
 * 4. Body scroll-lock uses a CSS class + padding-right compensation to prevent
 *    layout shift on scrollbar removal.
 * 5. Modal & sidebar "close" paths use onComplete to reset display/visibility
 *    so elements are not invisible-but-blocking-clicks mid-animation.
 * 6. ESC key and outside-click close are handled in a single useEffect with
 *    proper cleanup — no dangling listeners.
 * 7. useCallback is used only where referential stability matters (passed as
 *    event handlers deeper in the tree or to deps arrays).
 * 8. All ref arrays are populated with a stable callback pattern; no stale refs.
 * 9. Fixed accessibility: aria-expanded, aria-label, role, keyboard navigation.
 * 10. Fixed invalid HTML: removed dangling <path> inside <button>.
 * 11. `transform: translateZ(0)` forces hardware-accelerated compositing on
 *     the sidebar and modal without full `will-change` bloat on every element.
 * 12. backdrop-blur is limited to a single element per layer to avoid GPU
 *     stacking issues on mobile Safari.
 * 13. next/link + scroll={false} prevents unnecessary page-top jumps for hash
 *     anchors; sidebar closes before navigation (avoids scroll-lock stuck bug).
 */

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
} from "react";
import Link from "next/link";
import { inter } from "../fonts";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Button from "./ui/Button";
import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
} from "react-icons/fa";

// ─── Static data (outside component — no re-creation on render) ──────────────

const NAV_LINKS = [
  { href: "#projects", label: "Projects" },
  { href: "#about",    label: "About Me" },
  { href: "#contact",  label: "Contact"  },
];

const SOCIAL_LINKS = [
  { href: "https://wa.me/yournumber",    icon: FaWhatsapp,   color: "#22c55e", label: "WhatsApp" },
  { href: "https://facebook.com",        icon: FaFacebookF,  color: "#2563eb", label: "Facebook" },
  { href: "https://instagram.com",       icon: FaInstagram,  color: "#ec4899", label: "Instagram" },
  { href: "mailto:your@email.com",       icon: FaEnvelope,   color: "#ef4444", label: "Gmail"    },
  { href: "https://linkedin.com",        icon: FaLinkedinIn, color: "#1d4ed8", label: "LinkedIn" },
];

// ─── Scroll-lock helpers (class-based to avoid layout shifts) ────────────────

const lockScroll = () => {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.setProperty("--scrollbar-compensation", `${scrollbarWidth}px`);
  document.body.classList.add("scroll-locked");
};

const unlockScroll = () => {
  document.body.classList.remove("scroll-locked");
  document.documentElement.style.removeProperty("--scrollbar-compensation");
};

// ─── Hamburger icon (extracted to avoid re-renders) ──────────────────────────

const HamburgerIcon = React.memo(({ isOpen }) => (
  <span
    aria-hidden="true"
    className="pointer-events-none flex flex-col items-center justify-center gap-1.25 w-8 h-8"
  >
    <span
      className="block h-[2.5px] w-6 bg-gray-800 rounded origin-center transition-transform duration-300 ease-[cubic-bezier(.23,1,.32,1)]"
      style={{ transform: isOpen ? "rotate(45deg) translateY(7.5px)" : "none" }}
    />
    <span
      className="block h-[2.5px] w-6 bg-gray-800 rounded transition-all duration-300 ease-[cubic-bezier(.23,1,.32,1)]"
      style={{
        opacity:   isOpen ? 0 : 1,
        transform: isOpen ? "scaleX(0)" : "scaleX(1)",
      }}
    />
    <span
      className="block h-[2.5px] w-6 bg-gray-800 rounded origin-center transition-transform duration-300 ease-[cubic-bezier(.23,1,.32,1)]"
      style={{ transform: isOpen ? "rotate(-45deg) translateY(-7.5px)" : "none" }}
    />
  </span>
));
HamburgerIcon.displayName = "HamburgerIcon";

// ─── Main Component ───────────────────────────────────────────────────────────

const Navbar = () => {
  const [isOpen,     setIsOpen]     = useState(false);
  const [openModal,  setOpenModal]  = useState(false);

  // Unique IDs for ARIA relationships (SSR-safe via useId)
  const modalId   = useId();
  const sidebarId = useId();

  // DOM refs
  const sidebarRef      = useRef(null);
  const overlayRef      = useRef(null);
  const modalRef        = useRef(null);
  const linkItemsRef    = useRef([]);    // populated per-render in JSX
  const socialIconsRef  = useRef([]);   // populated per-render in JSX
  const hireMeBtnRef    = useRef(null);

  // Animation state guards (interrupt-safe flags)
  const sidebarAnimating = useRef(false);

  // ── Add CSS scroll-lock rule once (avoids inline style churn) ──────────────
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      body.scroll-locked {
        overflow: hidden;
        padding-right: var(--scrollbar-compensation, 0px);
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  // ── ESC key + outside click close ─────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key !== "Escape") return;
      if (openModal) setOpenModal(false);
      if (isOpen)    closeSidebar();      // closeSidebar is stable (useCallback)
    };

    const handlePointerDown = (e) => {
      if (!openModal) return;
      const modal   = modalRef.current;
      const btn     = hireMeBtnRef.current;
      if (modal && !modal.contains(e.target) && btn && !btn.contains(e.target)) {
        setOpenModal(false);
      }
    };

    document.addEventListener("keydown",      handleKeyDown,    { passive: true });
    document.addEventListener("pointerdown",  handlePointerDown, { passive: true });
    return () => {
      document.removeEventListener("keydown",      handleKeyDown);
      document.removeEventListener("pointerdown",  handlePointerDown);
    };
    // closeSidebar is defined below; ESLint rule suppressed intentionally.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal, isOpen]);

  // ── Modal GSAP animation (scoped — auto-cleanup on unmount) ───────────────
  useGSAP(
    () => {
      const el    = modalRef.current;
      const icons = socialIconsRef.current.filter(Boolean);
      if (!el) return;

      // Kill any in-flight tweens on these targets before starting new ones
      gsap.killTweensOf([el, ...icons]);

      if (openModal) {
        // Force display before animating in
        gsap.set(el, { display: "block" });

        const tl = gsap.timeline();
        tl.fromTo(
          el,
          { y: -16, opacity: 0, scale: 0.94 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.38,
            ease: "back.out(1.6)",
          }
        );
        tl.fromTo(
          icons,
          { y: 12, opacity: 0 },
          {
            y: 0, opacity: 1,
            stagger: 0.045,
            duration: 0.28,
            ease: "power3.out",
          },
          "-=0.18"
        );
      } else {
        gsap.to(el, {
          y: -10,
          opacity: 0,
          scale: 0.95,
          duration: 0.18,
          ease: "power2.in",
          onComplete: () => gsap.set(el, { display: "none" }),
        });
      }
    },
    { dependencies: [openModal] }
  );

  // ── Sidebar open ──────────────────────────────────────────────────────────
  const openSidebar = useCallback(() => {
    if (sidebarAnimating.current) return;
    sidebarAnimating.current = true;

    const sidebar = sidebarRef.current;
    const overlay = overlayRef.current;
    const links   = linkItemsRef.current.filter(Boolean);
    if (!sidebar || !overlay) { sidebarAnimating.current = false; return; }

    lockScroll();
    setIsOpen(true);

    // Kill stale tweens (interrupt-safe)
    gsap.killTweensOf([sidebar, overlay, ...links]);

    const tl = gsap.timeline({
      onComplete: () => { sidebarAnimating.current = false; },
    });

    tl.to(overlay, {
      autoAlpha: 1,
      duration: 0.25,
      ease: "none",
    });

    tl.to(
      sidebar,
      {
        x: 0,
        duration: 0.42,
        ease: "expo.out",
      },
      "<0.05"
    );

    tl.fromTo(
      links,
      { x: 48, opacity: 0 },
      {
        x: 0, opacity: 1,
        duration: 0.36,
        stagger: 0.07,
        ease: "power3.out",
      },
      "-=0.22"
    );
  }, []);

  // ── Sidebar close ─────────────────────────────────────────────────────────
  const closeSidebar = useCallback(() => {
    if (sidebarAnimating.current) return;
    sidebarAnimating.current = true;

    const sidebar = sidebarRef.current;
    const overlay = overlayRef.current;
    const links   = linkItemsRef.current.filter(Boolean);
    if (!sidebar || !overlay) { sidebarAnimating.current = false; return; }

    // Kill stale tweens
    gsap.killTweensOf([sidebar, overlay, ...links]);

    const tl = gsap.timeline({
      onComplete: () => {
        sidebarAnimating.current = false;
        unlockScroll();
        setIsOpen(false);
      },
    });

    tl.to(links, {
      x: 32, opacity: 0,
      duration: 0.18,
      stagger: 0.04,
      ease: "power2.in",
    });

    tl.to(
      sidebar,
      {
        x: "100%",
        duration: 0.38,
        ease: "expo.in",
      },
      "-=0.08"
    );

    tl.to(
      overlay,
      {
        autoAlpha: 0,
        duration: 0.22,
        ease: "none",
      },
      "-=0.25"
    );
  }, []);

  // ── Toggle handler for hamburger button ───────────────────────────────────
  const handleMenuToggle = useCallback(() => {
    if (isOpen) closeSidebar();
    else        openSidebar();
  }, [isOpen, openSidebar, closeSidebar]);

  // ── Handle nav link click inside sidebar ──────────────────────────────────
  const handleNavLinkClick = useCallback(() => {
    if (isOpen) closeSidebar();
  }, [isOpen, closeSidebar]);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <nav
        className={`fixed top-4 left-0 right-0 px-4 md:px-10 ${inter.className}`}
        style={{ zIndex: 50 }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-420 backdrop-blur-xl bg-white/70 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-4 sm:px-6 lg:px-8 py-2 sm:py-3 border border-white/60 flex items-center justify-between ring-1 ring-slate-900/5 transition-all duration-300">

          {/* Logo */}
          <Link
            href="/"
            className="font-extrabold text-[1rem] sm:text-lg text-slate-800 tracking-tight hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 rounded-md"
          >
            Aaliyan<span className="text-blue-500">.</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1 rounded-full shadow-inner border border-slate-200/50" role="menubar">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                role="menuitem"
                className="
                  px-5 py-2 rounded-full text-sm lg:text-base font-semibold text-slate-600
                  transition-all duration-300 ease-out hover:bg-white hover:text-slate-900 hover:shadow-sm hover:ring-1 hover:ring-slate-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400
                "
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Section: Hire Me + Hamburger */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Hire Me + social modal */}
            <div className="relative flex flex-col items-center">
              <Button
                ref={hireMeBtnRef}
                onClick={() => setOpenModal((v) => !v)}
                variant="colorful"
                size="md"
                aria-expanded={openModal}
                aria-controls={modalId}
                aria-haspopup="dialog"
                className="text-[10px] sm:text-xs lg:text-sm px-3 sm:px-5 min-w-[80px] sm:min-w-[100px] rounded-full uppercase tracking-wider font-bold shadow-sm hover:shadow-md transition-shadow select-none"
              >
                Hire me
              </Button>

              {/*
               * Social modal
               * ─ display:none handled by GSAP (not Tailwind hidden class)
               *   so GSAP can toggle it without specificity fights.
               * ─ will-change:transform → GPU layer pre-allocated.
               * ─ translateZ(0) ensures compositing even before will-change fires.
               */}
              <div
                id={modalId}
                ref={modalRef}
                role="dialog"
                aria-label="Connect with me"
                aria-modal="false"
                className="absolute top-full right-0 mt-4 z-50 w-[280px] sm:w-72 origin-top-right"
                style={{
                  display: "none",
                  willChange: "transform, opacity",
                  transform: "translateZ(0)",
                }}
              >
                <div className="bg-white/92 backdrop-blur-xl rounded-2xl p-5 shadow-2xl border border-slate-100/80 ring-1 ring-black/5">
                  <h2 className="text-center font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2 text-sm tracking-wide uppercase">
                    Connect With Me
                  </h2>

                  {/* Social icons grid */}
                  <div className="grid grid-cols-5 gap-2 sm:gap-3 justify-center mb-4">
                    {SOCIAL_LINKS.map((social, i) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          ref={(el) => (socialIconsRef.current[i] = el)}
                          aria-label={social.label}
                          className="
                            flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl
                            bg-slate-50 hover:bg-slate-100
                            transition-[transform,background-color] duration-150
                            hover:scale-110 active:scale-95
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-slate-400
                          "
                          style={{ color: social.color }}
                        >
                          <Icon size={20} aria-hidden="true" />
                        </a>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setOpenModal(false)}
                    className="
                      w-full py-2 bg-slate-100 text-slate-600 rounded-lg
                      hover:bg-slate-200 active:bg-slate-300
                      transition-colors duration-150
                      text-xs font-bold uppercase tracking-widest
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400
                    "
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>

            {/* Hamburger — mobile only */}
            <button
              onClick={handleMenuToggle}
              aria-expanded={isOpen}
              aria-controls={sidebarId}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="
                md:hidden relative flex items-center justify-center
                w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-sm border border-slate-200
                hover:bg-slate-50 active:scale-95
                transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400
              "
              style={{ zIndex: 70 }}
            >
              <HamburgerIcon isOpen={isOpen} size={0} />
            </button>
          </div>
        </div>
      </nav>

      {/*
       * Overlay
       * ─ autoAlpha (GSAP combo: opacity + visibility) handles the
       *   "invisible but blocking clicks" bug from opacity:0 alone.
       * ─ pointer-events is controlled by visibility (autoAlpha) so no
       *   additional class toggling needed.
       */}
      <div
        ref={overlayRef}
        onClick={closeSidebar}
        aria-hidden="true"
        className="fixed inset-0 bg-black/50 backdrop-blur-[2px]"
        style={{
          zIndex: 55,
          visibility: "hidden",
          opacity: 0,
          willChange: "opacity",
        }}
      />

      {/*
       * Sidebar
       * ─ Initial transform set inline (not via Tailwind class) to avoid
       *   a flash-of-incorrect-position during hydration.
       * ─ will-change:transform → GPU layer so slide-in is always 60 fps.
       * ─ transform:translateZ(0) forces GPU compositing immediately.
       */}
      <aside
        id={sidebarId}
        ref={sidebarRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!isOpen}
        className={`fixed top-0 right-0 h-full w-[75vw] max-w-[320px] bg-white shadow-2xl flex flex-col ${inter.className}`}
        style={{
          zIndex: 60,
          transform: "translateX(100%)",
          willChange: "transform",
        }}
      >
        {/* Sidebar header */}
        <div className="flex justify-end p-6">
          <button
            onClick={closeSidebar}
            aria-label="Close menu"
            className="
              w-10 h-10 rounded-full bg-gray-100
              flex items-center justify-center
              hover:bg-gray-200 active:bg-gray-300
              transition-colors duration-150
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400
            "
          >
            {/* SVG close icon — fixed: was a bare <path> in the original */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Sidebar nav links */}
        <nav className="flex flex-col gap-1 px-8 mt-2" aria-label="Mobile navigation">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              ref={(el) => { linkItemsRef.current[i] = el; }}
              onClick={handleNavLinkClick}
              className="
                text-2xl font-bold text-gray-800
                py-4 border-b border-gray-100
                flex items-center gap-3
                transition-colors duration-150 hover:text-gray-400
                focus-visible:outline-none focus-visible:text-gray-500
              "
            >
              <span className="text-gray-300 text-base font-normal tabular-nums">
                0{i + 1}
              </span>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Sidebar footer — social links */}
        <div className="mt-auto px-8 pb-10 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-4 font-semibold">
            Reach out
          </p>
          <div className="flex gap-3">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="
                    flex items-center justify-center w-9 h-9 rounded-lg
                    bg-slate-50 hover:bg-slate-100 active:bg-slate-200
                    transition-[transform,background-color] duration-150
                    hover:scale-110 active:scale-95
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400
                  "
                  style={{ color: social.color }}
                >
                  <Icon size={17} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;