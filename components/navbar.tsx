"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Menu, Terminal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Authenticated, Unauthenticated } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { signOut } = useAuthActions();

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
    href: string,
    closeMenu?: () => void
  ) => {
    e.preventDefault();
    const isFragment = href.startsWith("#");
    const sectionId = isFragment ? href.slice(1) : href.split("#")[1];

    // If on a different page (not homepage), navigate to homepage with fragment
    if (isFragment && pathname !== "/") {
      router.push(`/#${sectionId}`);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // If already on homepage, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }

    // Close mobile menu if provided
    if (closeMenu) {
      setTimeout(() => closeMenu(), 300);
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
            <span className="text-white">Asraful</span>
            {/* <img
              className="size-9 shrink-0 object-cover rounded-full"
              src="/me.png"
              alt="me"
            /> */}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="#about" onClick={scrollToSection}>
              About
            </NavLink>
            <NavLink href="#skills" onClick={scrollToSection}>
              Skills
            </NavLink>
            <NavLink href="#projects" onClick={scrollToSection}>
              Projects
            </NavLink>
            <NavLink href="#reviews" onClick={scrollToSection}>
              Reviews
            </NavLink>
            <NavLink href="#contact" onClick={scrollToSection}>
              Contact
            </NavLink>

            <Link
              href="/blog"
              className={cn(
                "text-gray-300 hover:text-white transition-colors relative group"
              )}
            >
              Blogs
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-jordy_blue-400 transition-all group-hover:w-full"></span>
            </Link>
            {/* <Link
              href="/codes"
              className={cn(
                "text-gray-300 hover:text-white transition-colors relative group"
              )}
            >
              Codes
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-jordy_blue-400 transition-all group-hover:w-full"></span>
            </Link> */}
            <Link
              href="/games"
              className={cn(
                "text-gray-300 hover:text-white transition-colors relative group"
              )}
            >
              Games
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-jordy_blue-400 transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="/notes"
              className={cn(
                "text-gray-300 hover:text-white transition-colors relative group"
              )}
            >
              Notes
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-jordy_blue-400 transition-all group-hover:w-full"></span>
            </Link>

            <Link
              href="/terminal"
              className={cn(
                "text-gray-300 hover:text-white transition-colors relative group"
              )}
            >
              <Terminal className="shrink-0" />
            </Link>

            {/* <CartIcon /> */}

            <Authenticated>
              <Button onClick={signOut} variant="secondary" className="">
                Logout
              </Button>
            </Authenticated>
            <Unauthenticated>
              <Link
                href="/signin"
                onClick={signOut}
                className={buttonVariants({
                  variant: "secondary",
                })}
              >
                Login
              </Link>
            </Unauthenticated>
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
                href="#about"
                onClick={scrollToSection}
                closeMenu={() => setIsMobileMenuOpen(false)}
              >
                About
              </MobileNavLink>
              <MobileNavLink
                href="#skills"
                onClick={scrollToSection}
                closeMenu={() => setIsMobileMenuOpen(false)}
              >
                Skills
              </MobileNavLink>
              <MobileNavLink
                href="#projects"
                onClick={scrollToSection}
                closeMenu={() => setIsMobileMenuOpen(false)}
              >
                Projects
              </MobileNavLink>
              <MobileNavLink
                href="#reviews"
                onClick={scrollToSection}
                closeMenu={() => setIsMobileMenuOpen(false)}
              >
                Reviews
              </MobileNavLink>
              <MobileNavLink
                href="#contact"
                onClick={scrollToSection}
                closeMenu={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </MobileNavLink>
              <Link
                href="/blog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-gray-300 hover:text-white transition-colors"
              >
                Blogs
              </Link>
              {/* <Link
                href="/codes"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-gray-300 hover:text-white transition-colors"
              >
                Codes
              </Link> */}
              <Link
                href="/games"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-gray-300 hover:text-white transition-colors"
              >
                Games
              </Link>
              <Link
                href="/notes"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-gray-300 hover:text-white transition-colors"
              >
                Notes
              </Link>

              {/* <CartIcon /> */}

              <Unauthenticated>
                <Link
                  href="/signin"
                  onClick={signOut}
                  className={buttonVariants({
                    variant: "secondary",
                    className: "w-full",
                  })}
                >
                  Login
                </Link>
              </Unauthenticated>
              <Authenticated>
                <Button
                  onClick={signOut}
                  variant="secondary"
                  className="w-full"
                >
                  Logout
                </Button>
              </Authenticated>
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
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={(e) => onClick(e, href)}
      className={cn(
        "text-gray-300 hover:text-white transition-colors relative group",
        className
      )}
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-jordy_blue-400 transition-all group-hover:w-full"></span>
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
  onClick: (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    closeMenu?: () => void
  ) => void;
  closeMenu: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={(e) => onClick(e, href, closeMenu)}
      className="block py-2 text-gray-300 hover:text-white transition-colors"
    >
      {children}
    </Link>
  );
}
