import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

const socials = [
  { icon: Github, href: "https://github.com/Asraful0312", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/asraful-islam-rayhan-434998335/", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/AsrafulIslam031", label: "Twitter" },
  { icon: Mail, href: "mailto:asrafulislam0312@gmail.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block text-xl font-bold text-foreground tracking-tight">
              Asraful Islam
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Full stack developer building fast, thoughtful web applications. Open to remote work.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="h-8 w-8 rounded-lg flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:border-jordy_blue-400/40 hover:bg-secondary transition-all duration-200"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">Navigation</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">Get in touch</p>
            <div className="space-y-2.5">
              <a
                href="mailto:asrafulislam0312@gmail.com"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                asrafulislam0312@gmail.com
              </a>
              <a
                href="https://wa.me/8801873239795"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                +880 1873-239795
              </a>
              <p className="text-sm text-muted-foreground">Noakhali, Bangladesh</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Asraful Islam. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
