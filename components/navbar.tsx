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
import { ModeToggle } from "@/components/mode-toggle";

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
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 bg-transparent py-5`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="liquid-glass text-lg font-bold py-2 px-6 hover:scale-105">
            <span className="dark:text-white text-jordy_blue-100">Asraful</span>
            {/* <img
              className="size-9 shrink-0 object-cover rounded-full"
              src="/me.png"
              alt="me"
            /> */}
          </Link>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-6">
            <nav className="liquid-glass hidden md:flex items-center space-x-8 py-3 px-8">
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
                  "text-zinc-800 dark:text-gray-300 hover:text-jordy_blue-500 dark:hover:text-white transition-colors relative group",
                  "[text-shadow:_0_1px_2px_rgba(255,255,255,0.8)]  dark:[text-shadow:_0_1px_2px_rgba(0,0,0,0.5)]"
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

              {/* <Link
              href="/notes"
              className={cn(
                "text-gray-300 hover:text-white transition-colors relative group"
              )}
            >
              Notes
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-jordy_blue-400 transition-all group-hover:w-full"></span>
            </Link> */}

              {/* <Link
                href="/terminal"
                className={cn(
                  "text-zinc-800 dark:text-gray-300 hover:text-jordy_blue-500 dark:hover:text-white transition-colors relative group",
                  "[text-shadow:_0_1px_2px_rgba(255,255,255,0.8)]  dark:[text-shadow:_0_1px_2px_rgba(0,0,0,0.5)]"
                )}
              >
                <Terminal className="shrink-0" />
              </Link> */}

              {/* <CartIcon /> */}

            </nav>
            <div className="flex items-center gap-4">
              <ModeToggle />
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
                    variant: "default",
                    className: 'text-jordy_blue-100'
                  })}
                >
                  Login
                </Link>
              </Unauthenticated>
            </div>

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
        "text-zinc-800 dark:text-gray-300 hover:text-jordy_blue-500 dark:hover:text-white transition-colors relative group",
        // Subtle text shadow for extra pop
        "[text-shadow:_0_1px_2px_rgba(255,255,255,0.8)]  dark:[text-shadow:_0_1px_2px_rgba(0,0,0,0.5)]",
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
