import React from 'react';
import Link from 'next/link';
import { inter } from '../fonts';
import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
} from "react-icons/fa";

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

const Footer = () => {
  return (
    <footer className={`w-full bg-slate-50 pt-16 pb-8 px-6 md:px-12 lg:px-24 border-t border-slate-200 ${inter.className}`}>
      <div className="max-w-420 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-12">
          
          {/* Logo & Bio */}
          <div className="flex flex-col gap-4 max-w-sm">
            <Link
              href="/"
              className="font-bold text-2xl text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 rounded-md inline-block w-max"
            >
              Aaliyan
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Crafting digital experiences with modern web technologies. Let's build something amazing together.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4 mt-2">
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    scroll={false}
                    className="
                      relative text-gray-500 text-sm font-medium
                      transition-colors duration-200 hover:text-gray-800
                      after:absolute after:left-0 after:-bottom-0.5 after:h-0.5
                      after:w-0 after:bg-gray-400 after:transition-[width] after:duration-300
                      hover:after:w-full w-max
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 rounded-sm
                    "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-4 mt-2">
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
                      flex items-center justify-center w-10 h-10 rounded-xl
                      bg-white border border-slate-200 hover:bg-slate-100 hover:shadow-md
                      transition-all duration-300 ease-out
                      hover:-translate-y-2 active:translate-y-0
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-slate-400
                    "
                    style={{ color: social.color }}
                  >
                    <Icon size={20} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Horizontal Line */}
        <div className="w-full h-px bg-slate-200 mb-8"></div>

        {/* Copyright Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-medium text-gray-500">
            © {new Date().getFullYear()} Aaliyan. All rights reserved.
          </p>
          <p className="text-sm font-medium text-gray-400">
            Designed & Developed with Next.js
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;