"use client";

import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useState } from "react";

const quickLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: <FaLinkedin size={15} />, href: "#", label: "LinkedIn" },
  { icon: <FaGithub size={15} />, href: "#", label: "GitHub" },
  { icon: <FaTwitter size={15} />, href: "#", label: "Twitter" },
];

export const Footer7 = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSent(true);
  };

  return (
    <footer className="relative overflow-hidden bg-background">
      {/* ── TOP ROW: 3 columns ──────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 sm:px-10 pt-16 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

        {/* Col 1: Newsletter */}
        <div className="lg:col-span-5 xl:col-span-6 lg:pr-8">
          <div className="flex items-center gap-2 mb-4">
            <img src="/node-pilot-logo.svg" alt="NodePilot Logo" className="h-12 w-auto" />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-md">
            AI-powered edge computing management that provides centralized visibility and intelligent orchestration across distributed environments.
          </p>

          {!sent ? (
            <form onSubmit={handleSubmit} className="max-w-md">
              <div className="flex items-center gap-2 border border-secondary/40 rounded-xl overflow-hidden bg-black/30 p-1 focus-within:border-secondary/70 transition-colors">
                <div className="pl-3 text-muted-foreground shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="Enter your e-mail address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent py-2.5 pr-2 text-sm text-foreground placeholder:text-muted-foreground outline-none"
                />
                <button
                  type="submit"
                  className="btn-gradient px-5 py-2.5 rounded-lg text-sm font-semibold text-white shrink-0 hover:shadow-[0_0_12px_rgba(0,183,181,0.4)] transition-all"
                >
                  Subscribe
                </button>
              </div>
            </form>
          ) : (
            <div className="flex items-center gap-2 text-sm text-secondary max-w-md">
              <ArrowRight size={14} />
              <span>You're subscribed! Thanks for joining.</span>
            </div>
          )}

          {/* Social Icons & Trust badges */}
          <div className="flex items-center justify-between mt-6 max-w-md">
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block shadow-[0_0_8px_rgba(0,183,181,0.8)]" />
                SOC 2 Certified
              </span>
              <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block shadow-[0_0_8px_rgba(0,183,181,0.8)]" />
                ISO 27001
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-muted-foreground hover:text-secondary hover:bg-secondary/10 hover:border-secondary/30 transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Col 2: Company */}
        <div className="lg:col-span-3 lg:pl-4 xl:pl-8">
          <h4 className="font-bold text-sm text-foreground mb-6">Company</h4>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-secondary transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Get in touch */}
        <div className="lg:col-span-4 xl:col-span-3 glass-strong p-6 rounded-2xl border border-white/10 shadow-lg">
          <h4 className="font-bold text-sm text-foreground mb-6">Get in touch</h4>
          <ul className="flex flex-col gap-y-5">
            <li className="flex items-center gap-x-3">
              <div className="flex-none w-10 h-10 flex items-center justify-center rounded-lg bg-[#111111] border border-white/10 shadow-sm text-white">
                <Mail className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <h4 className="text-sm font-bold text-white mb-0.5">Email us</h4>
                <a href="mailto:contact@node-pilot.com" className="text-muted-foreground text-xs font-medium hover:text-secondary transition-colors">contact@node-pilot.com</a>
              </div>
            </li>
            <li className="flex items-center gap-x-3">
              <div className="flex-none w-10 h-10 flex items-center justify-center rounded-lg bg-[#111111] border border-white/10 shadow-sm text-white">
                <Phone className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <h4 className="text-sm font-bold text-white mb-0.5">Call us</h4>
                <a href="tel:+13107845201" className="text-muted-foreground text-xs font-medium hover:text-secondary transition-colors">+1 (310) 784-5201</a>
              </div>
            </li>
            <li className="flex items-center gap-x-3">
              <div className="flex-none w-10 h-10 flex items-center justify-center rounded-lg bg-[#111111] border border-white/10 shadow-sm text-white">
                <MapPin className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <h4 className="text-sm font-bold text-white mb-0.5">Visit us</h4>
                <a href="https://maps.google.com/?q=1100+Glendon+Ave,+Los+Angeles,+CA+90024,+USA" target="_blank" rel="noopener noreferrer" className="text-muted-foreground text-xs font-medium hover:text-secondary transition-colors">1100 Glendon Ave, Los Angeles, CA 90024, USA</a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* ── GIANT BRAND BOX ─────────────────────────────────── */}
      <div className="mx-6 sm:mx-10 my-6 rounded-2xl overflow-hidden relative flex flex-col items-center justify-center min-h-[160px] sm:min-h-[200px]"
        style={{
          background: "linear-gradient(135deg, #012e2e 0%, #014444 40%, #013535 100%)",
          border: "1px solid rgba(0,183,181,0.2)",
        }}
      >
        {/* Grid texture overlay */}
        <div className="absolute inset-0 opacity-[0.04] z-0"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg,rgba(255,255,255,0.5) 0px,rgba(255,255,255,0.5) 1px,transparent 1px,transparent 40px), repeating-linear-gradient(90deg,rgba(255,255,255,0.5) 0px,rgba(255,255,255,0.5) 1px,transparent 1px,transparent 40px)",
          }}
        />

        {/* Glow behind center */}
        <div className="absolute inset-0 z-0"
          style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,183,181,0.15), transparent 70%)" }}
        />

        {/* ── PAPER AIRPLANE GRAPHIC ── */}
        <div className="absolute top-[10%] left-[25%] md:left-[35%] z-10 rotate-12 opacity-80 scale-75 sm:scale-100">
          <svg width="120" height="60" viewBox="0 0 120 60" className="absolute -left-[100px] top-[10px] -z-10 opacity-50">
            <path d="M0,50 Q40,60 60,30 T120,10" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
          </svg>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="rgba(0,183,181,0.8)" stroke="rgba(0,183,181,1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-lg">
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </div>

        {/* ── MIDDLE IMAGE ── */}
        {/* Faded on ALL sides to connect with background */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <img 
            src="/images/footer-image.svg" 
            alt="Footer Image"
            className="w-full max-w-[500px] h-full object-cover object-center opacity-90 mix-blend-luminosity"
            style={{
              maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)",
              WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)"
            }}
          />
        </div>

        {/* ── GIANT BRAND NAME (IN FRONT) ── */}
        <div className="relative z-20 w-full flex items-center justify-center py-6 sm:py-8">
          <h2
            className="font-black font-heading leading-none tracking-tighter text-white select-none text-center w-full"
            style={{ 
              fontSize: "clamp(3.5rem, 16vw, 15rem)",
              textShadow: "0 10px 40px rgba(0,0,0,0.6)"
            }}
          >
            NodePilot
          </h2>
        </div>
      </div>

      {/* ── BOTTOM BAR ──────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        {/* Left: credits */}
        <p>Built with precision for distributed infrastructure teams.</p>

        {/* Center: Legal Links */}
        <div className="flex items-center gap-4">
          <a href="/terms-and-conditions" className="hover:text-secondary hover:underline underline-offset-4 transition-colors">
            Terms & Conditions
          </a>
          <span className="text-white/20">•</span>
          <a href="/privacy-policy" className="hover:text-secondary hover:underline underline-offset-4 transition-colors">
            Privacy Policy
          </a>
          <span className="text-white/20">•</span>
          <a href="/cookies-policy" className="hover:text-secondary hover:underline underline-offset-4 transition-colors">
            Cookies Policy
          </a>
        </div>

        {/* Right: copyright */}
        <p>© 2026 NodePilot. All rights reserved.</p>
      </div>
    </footer>
  );
};
