"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll function
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const sectionId = href.split("#")[1];
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0f0f0f]/90 backdrop-blur-md py-3 shadow-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            <span className="gradient-text">Asraful</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/#about" onClick={scrollToSection}>
              About
            </NavLink>
            <NavLink href="/#skills" onClick={scrollToSection}>
              Skills
            </NavLink>
            <NavLink href="/#projects" onClick={scrollToSection}>
              Projects
            </NavLink>
            <NavLink href="/#reviews" onClick={scrollToSection}>
              Reviews
            </NavLink>
            <NavLink href="/#contact" onClick={scrollToSection}>
              Contact
            </NavLink>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Resume
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#0f0f0f] border-t border-gray-800"
          >
            <div className="px-4 py-5 space-y-4">
              <MobileNavLink
                href="/#about"
                onClick={scrollToSection}
                closeMenu={() => setIsMobileMenuOpen(false)}
              >
                About
              </MobileNavLink>
              <MobileNavLink
                href="/#skills"
                onClick={scrollToSection}
                closeMenu={() => setIsMobileMenuOpen(false)}
              >
                Skills
              </MobileNavLink>
              <MobileNavLink
                href="/#projects"
                onClick={scrollToSection}
                closeMenu={() => setIsMobileMenuOpen(false)}
              >
                Projects
              </MobileNavLink>
              <MobileNavLink
                href="/#reviews"
                onClick={scrollToSection}
                closeMenu={() => setIsMobileMenuOpen(false)}
              >
                Reviews
              </MobileNavLink>
              <MobileNavLink
                href="/#contact"
                onClick={scrollToSection}
                closeMenu={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </MobileNavLink>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Resume
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  return (
    <Link
      href={href}
      onClick={(e) => onClick(e, href)}
      className="text-gray-300 hover:text-white transition-colors relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
    </Link>
  );
}

function MobileNavLink({
  href,
  onClick,
  closeMenu,
  children,
}: {
  href: string;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  closeMenu: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={(e) => {
        onClick(e, href);
        closeMenu();
      }}
      className="block py-2 text-gray-300 hover:text-white transition-colors"
    >
      {children}
    </Link>
  );
}
