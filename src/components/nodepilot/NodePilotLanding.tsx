import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Activity, Boxes, Cpu, Gauge, LayoutDashboard, LineChart,
  Menu, Plug, Radar, Rocket, Server, Shield, Sparkles,
  TrendingUp, X, Zap, ArrowRight, Check, Star, Cloud
} from "lucide-react";

const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "How It Works" },
  { id: "features", label: "Features" },
  { id: "pricing", label: "Pricing" },
  { id: "contact", label: "Contact" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ---------------- NAV ---------------- */
function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const y = window.scrollY + 120;
      for (const n of nav) {
        const el = document.getElementById(n.id);
        if (el && el.offsetTop <= y && el.offsetTop + el.offsetHeight > y) {
          setActive(n.id); break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"}`}>
      <div className="mx-auto max-w-[1400px] px-6 sm:px-12 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo("home")} className="flex items-center gap-2">
          <img src="/node-pilot-logo.svg" alt="NodePilot Logo" className="h-28 w-auto" />
        </button>

        {/* Desktop Links & CTA */}
        <div className="hidden lg:flex items-center gap-10">
          <nav className="flex items-center gap-8">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={`text-sm font-medium transition-colors ${active === n.id ? "text-secondary drop-shadow-[0_0_8px_rgba(0,183,181,0.5)]" : "text-white/70 hover:text-white"
                  }`}
              >
                {n.label}
              </button>
            ))}
          </nav>
          
          <button onClick={() => scrollTo("contact")} className="btn-gradient px-6 py-2.5 rounded-lg text-sm font-bold text-white transition-all shadow-[0_0_15px_rgba(0,183,181,0.3)] hover:shadow-[0_0_20px_rgba(0,183,181,0.5)]">
            NodePilot Hub
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden p-2 text-white" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-white/10 p-6 space-y-2 shadow-2xl"
        >
          {nav.map((n) => (
            <button key={n.id} onClick={() => { scrollTo(n.id); setOpen(false); }}
              className={`block w-full text-left px-4 py-3 rounded-xl font-medium ${active === n.id ? "bg-secondary/10 text-secondary" : "text-white/70 hover:bg-white/5"}`}>
              {n.label}
            </button>
          ))}
          <div className="pt-4 mt-4 border-t border-white/5">
            <button className="w-full btn-gradient text-white px-6 py-3 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(0,183,181,0.3)] hover:shadow-[0_0_20px_rgba(0,183,181,0.5)]">
              NodePilot Hub
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}

/* ---------------- HERO BACKGROUND ---------------- */
function NetworkBackdrop() {
  const nodes = Array.from({ length: 14 }).map((_, i) => ({
    x: 50 + (i * 73) % 900,
    y: 60 + (i * 117) % 460,
    r: 3 + (i % 3),
  }));
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 560" preserveAspectRatio="none">
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00B7B5" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#00B7B5" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="line" x1="0" x2="1">
          <stop offset="0%" stopColor="#018790" stopOpacity="0" />
          <stop offset="50%" stopColor="#00B7B5" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#018790" stopOpacity="0" />
        </linearGradient>
      </defs>
      {nodes.map((n, i) =>
        nodes.slice(i + 1, i + 4).map((m, j) => (
          <line key={`${i}-${j}`} x1={n.x} y1={n.y} x2={m.x} y2={m.y}
            stroke="url(#line)" strokeWidth="1" opacity="0.5" />
        ))
      )}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={20} fill="url(#glow)">
            <animate attributeName="r" values="14;28;14" dur={`${3 + (i % 4)}s`} repeatCount="indefinite" />
          </circle>
          <circle cx={n.x} cy={n.y} r={n.r} fill="#00B7B5" />
        </g>
      ))}
    </svg>
  );
}

/* ---------------- DASHBOARD MOCKUP ---------------- */
function DashboardMock({ compact = false }: { compact?: boolean }) {
  const stats = [
    { label: "Active Edge Nodes", value: "2,847", trend: "+12.4%", icon: Server },
    { label: "Device Health", value: "99.2%", trend: "+0.3%", icon: Activity },
    { label: "AI Deployments", value: "184", trend: "+8", icon: Rocket },
    { label: "Throughput", value: "4.2 TB/s", trend: "+18%", icon: Zap },
  ];
  return (
    <div className="glass-strong rounded-2xl p-4 sm:p-6 shadow-[var(--shadow-elegant)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-secondary animate-pulse" />
          <span className="text-xs font-medium text-muted-foreground">Operations Console · Live</span>
        </div>
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-secondary" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="glass rounded-xl p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <s.icon className="h-4 w-4 text-secondary" />
              <span className="text-[10px] text-secondary font-semibold">{s.trend}</span>
            </div>
            <div className="text-lg sm:text-2xl font-heading font-bold">{s.value}</div>
            <div className="text-[11px] text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      {!compact && (
        <div className="mt-4 glass rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium">Infrastructure Status</span>
            <span className="text-xs text-secondary">Deployment Success 98.7%</span>
          </div>
          <div className="flex items-end gap-1.5 h-20">
            {[40, 65, 50, 80, 70, 90, 60, 85, 75, 95, 70, 88, 80, 92].map((h, i) => (
              <motion.div key={i}
                initial={{ height: 0 }} whileInView={{ height: `${h}%` }}
                transition={{ delay: i * 0.04, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex-1 rounded-t bg-gradient-to-t from-primary to-secondary"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- HERO ---------------- */
import HeroSection from '@/components/ui/hero-section-9';

function Hero() {
  const heroData = {
    title: (
      <>
        The <span className="gradient-text">Edge Computing</span> Management Platform for AI Deployments
      </>
    ),
    subtitle: 'Deploy, orchestrate, monitor, and optimize AI workloads across distributed edge environments through intelligent infrastructure management.',
    actions: [
      {
        text: (
          <span className="flex items-center gap-2">
            Request Demo <ArrowRight className="h-4 w-4" />
          </span>
        ),
        onClick: () => scrollTo("contact"),
        className: 'border border-border hover:bg-white/5 transition text-white',
      },
      {
        text: 'Explore Platform',
        onClick: () => scrollTo("features"),
        variant: 'outline' as const,
        className: 'glass hover:bg-white/10 text-white border-white/10',
      }
    ],
    stats: [
      {
        value: '2.8K+',
        numericValue: 2.8,
        suffix: 'K+',
        decimals: 1,
        label: 'Edge Nodes',
        icon: <Server className="h-5 w-5 text-secondary" />,
      },
      {
        value: '99.9%',
        numericValue: 99.9,
        suffix: '%',
        decimals: 1,
        label: 'Uptime SLA',
        icon: <Activity className="h-5 w-5 text-secondary" />,
      },
      {
        value: '180+',
        numericValue: 180,
        suffix: '+',
        decimals: 0,
        label: 'AI Models',
        icon: <Rocket className="h-5 w-5 text-secondary" />,
      },
    ],
    images: [
      '/images/hero-image-1.svg',
      '/images/hero-image-2.svg',
      '/images/hero-image-3.svg',
    ],
  };

  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      <div className="absolute inset-0 -z-10"><NetworkBackdrop /></div>
      <div className="absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(circle_at_30%_20%,rgba(0,183,181,0.15),transparent_50%)]" />

      <HeroSection
        title={heroData.title}
        subtitle={heroData.subtitle}
        actions={heroData.actions}
        stats={heroData.stats}
        images={heroData.images}
        className="bg-transparent py-0 sm:py-0 lg:py-0 w-full"
      />
    </section>
  );
}

/* ---------------- SECTION HEADING ---------------- */
function SectionHead({ eyebrow, title, desc }: { eyebrow?: string; title: string; desc?: string }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}
      className="max-w-3xl mx-auto text-center mb-14">
      {eyebrow && (
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-semibold text-secondary mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold">{title}</h2>
      {desc && <p className="mt-4 text-muted-foreground text-base sm:text-lg">{desc}</p>}
    </motion.div>
  );
}

/* ---------------- ABOUT ---------------- */
function About() {
  const items = [
    { 
      icon: <img src="/images/icon-centralized-visibility.svg" alt="Centralized Visibility" className="w-full h-full object-contain" />, 
      t: "Centralized Visibility", 
      d: "Unified view across every distributed edge node and AI workload in real time.",
      image: "/images/about-centralized-visibility.svg"
    },
    { 
      icon: <img src="/images/icon-intelligent-orchestration.svg" alt="Intelligent Orchestration" className="w-full h-full object-contain" />, 
      t: "Intelligent Orchestration", 
      d: "Automate deployment pipelines and intelligently route AI workloads to optimal nodes.",
      image: "/images/about-intelligent-orchestration.svg"
    },
    { 
      icon: <img src="/images/icon-device-intelligence.svg" alt="Device Intelligence" className="w-full h-full object-contain" />, 
      t: "Device Intelligence", 
      d: "Deep telemetry, health metrics, and predictive insights across all connected hardware.",
      image: "/images/about-device-intelligence.svg"
    },
    { 
      icon: <img src="/images/icon-infrastructure-monitoring.svg" alt="Infrastructure Monitoring" className="w-full h-full object-contain" />, 
      t: "Infrastructure Monitoring", 
      d: "Continuous observability with proactive alerts and end-to-end performance tracking.",
      image: "/images/about-infrastructure-monitoring.svg"
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* --- SPLIT LAYOUT --- */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center lg:items-start">
          
          {/* --- LEFT COLUMN: HERO --- */}
          <motion.div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:sticky lg:top-32" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[10px] font-semibold text-secondary mb-2">
                About NodePilot
              </span>
              <h2 className="text-3xl lg:text-5xl font-heading font-bold leading-tight">Discover NodePilot<br/><span className="text-xl lg:text-3xl text-muted-foreground font-normal">Where Innovation Meets Edge Computing</span></h2>
            </div>

            <div className="w-full max-w-lg aspect-video lg:aspect-[4/3] rounded-[1.5rem] overflow-hidden shadow-[0_0_40px_rgba(0,183,181,0.15)] border border-white/10 relative mt-4 mb-8">
              <img 
                src="/images/about-journey.svg" 
                alt="The NodePilot Journey" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
            </div>

            <h2 className="text-xl lg:text-2xl font-heading font-bold mb-3">The NodePilot Journey</h2>
            <p className="max-w-md text-muted-foreground leading-relaxed text-sm">
              NodePilot is an AI-powered edge computing management platform that provides centralized visibility, intelligent orchestration, device monitoring, and infrastructure analytics across distributed environments.
            </p>
          </motion.div>

          {/* --- RIGHT COLUMN: JOURNEY TIMELINE S-CURVE --- */}
          <motion.div 
            className="relative w-full flex flex-col items-center mt-8 lg:mt-24"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px" }}
            variants={{
              show: {
                transition: {
                  staggerChildren: 0.25
                }
              }
            }}
          >
            {items.map((step, index) => {
              const isLeft = index % 2 === 0;
              const isFirst = index === 0;
              const isLast = index === items.length - 1;

              return (
                <motion.div key={index} variants={fadeUp} className={`relative w-full flex flex-col md:flex-row items-center md:items-stretch md:mb-[-2px]`}>
                  
                  {/* --- DESKTOP S-CURVE BORDERS (Solid color to fix overlap) --- */}
                  {isLeft ? (
                    <>
                      <div className="hidden md:block absolute top-0 left-0 w-1/2 h-full border-t-[2px] border-l-[2px] border-b-[2px] border-[#016867] rounded-l-[32px] z-0 pointer-events-none" />
                      {!isFirst && <div className="hidden md:block absolute top-0 right-[32px] w-[calc(50%-30px)] border-t-[2px] border-[#016867] z-0 pointer-events-none" />}
                      {!isLast && <div className="hidden md:block absolute bottom-0 right-[32px] w-[calc(50%-30px)] border-b-[2px] border-[#016867] z-0 pointer-events-none" />}
                    </>
                  ) : (
                    <>
                      <div className="hidden md:block absolute top-0 right-0 w-1/2 h-full border-t-[2px] border-r-[2px] border-b-[2px] border-[#016867] rounded-r-[32px] z-0 pointer-events-none" />
                      <div className="hidden md:block absolute top-0 left-[32px] w-[calc(50%-30px)] border-t-[2px] border-[#016867] z-0 pointer-events-none" />
                      {!isLast && <div className="hidden md:block absolute bottom-0 left-[32px] w-[calc(50%-30px)] border-b-[2px] border-[#016867] z-0 pointer-events-none" />}
                    </>
                  )}

                  {/* --- CONTENT --- */}
                  {/* Image Side */}
                  <div className={`relative z-20 w-full md:w-1/2 py-6 px-2 md:px-4 lg:px-6 flex items-center justify-center ${!isLeft ? "md:order-2" : ""}`}>
                    <div className="w-full max-w-[150px] lg:max-w-[180px] aspect-[4/3] rounded-xl overflow-hidden shadow-[0_0_15px_rgba(0,183,181,0.1)] border border-white/5 relative bg-white/5 group hover:scale-[1.05] transition-transform duration-500">
                      <img src={step.image} alt={step.t} className="w-full h-full object-cover mix-blend-overlay opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                  
                  {/* Text Side */}
                  <div className={`relative z-20 w-full md:w-1/2 py-6 px-2 md:px-4 lg:px-6 flex flex-col justify-center ${!isLeft ? "md:order-1 text-right md:text-left" : ""}`}>
                    <div className={`w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center mb-2 relative shadow-sm shrink-0 ${!isLeft ? "ml-auto md:ml-0" : ""}`}>
                      <div className="w-full h-full">{step.icon}</div>
                    </div>
                    <h3 className="text-sm lg:text-base font-heading font-bold mb-1 text-foreground leading-tight">{step.t}</h3>
                    <p className="text-muted-foreground leading-snug text-[10px] lg:text-xs">{step.d}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { ChainProcessSection } from "@/components/ui/chain-process";

/* ---------------- HOW IT WORKS ---------------- */
function HowItWorks() {
  const steps = [
    { 
        num: "01",
        title: "Connect Edge Devices", 
        desc: "Onboard distributed devices with zero-touch provisioning.",
        icon: Plug,
        image: "/images/how-connect-edge-devices.svg"
    },
    { 
        num: "02",
        title: "Deploy AI Models", 
        desc: "Push AI workloads to selected nodes with one click.",
        icon: Rocket,
        image: "/images/how-deploy-ai-models.svg"
    },
    { 
        num: "03",
        title: "Monitor Infrastructure", 
        desc: "Real-time telemetry across the entire edge fleet.",
        icon: Activity,
        image: "/images/how-monitor-infrastructure.svg"
    },
    { 
        num: "04",
        title: "Optimize Operations", 
        desc: "AI-driven recommendations to maximize performance.",
        icon: TrendingUp,
        image: "/images/how-optimize-operations.svg"
    },
  ];

  return (
    <section id="how" className="relative border-t border-white/5">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_0%_50%,rgba(0,183,181,0.05),transparent_50%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <ChainProcessSection steps={steps} />
      </div>
    </section>
  );
}

/* ---------------- FEATURES ---------------- */
import FlipGallery from "@/components/ui/flip-gallery";

function Features() {
  const [activeIndex, setActiveIndex] = useState(0);

  const features = [
    { title: "Edge Infrastructure Management", desc: "Provision, configure, and govern thousands of edge nodes from a single pane.", icon: <img src="/images/icon-device-intelligence.svg" alt="Device Intelligence" className="h-10 w-10" /> },
    { title: "AI Deployment Orchestration", desc: "Container & model rollout workflows.", icon: <img src="/images/icon-ai-deployment.svg" alt="AI Deployment" className="h-10 w-10" /> },
    { title: "Device Intelligence Layer", desc: "Hardware-aware telemetry & insights.", icon: <img src="/images/icon-edge-infrastructure-management.svg" alt="Edge Infrastructure Management" className="h-10 w-10" /> },
    { title: "Operational Analytics Engine", desc: "Deep performance & cost analytics across the fleet.", icon: <img src="/images/icon-operational-analytics.svg" alt="Operational Analytics" className="h-10 w-10" /> },
    { title: "Distributed Monitoring", desc: "Always-on health checks at the edge.", icon: <img src="/images/icon-distributed-monitoring.svg" alt="Distributed Monitoring" className="h-10 w-10" /> },
    { title: "Infrastructure Observability", desc: "Traces, metrics, and logs unified.", icon: <img src="/images/icon-infrastructure-observability.svg" alt="Infrastructure Observability" className="h-10 w-10" /> },
    { title: "Enterprise Integration Framework", desc: "SSO, RBAC, audit, and policy controls.", icon: <img src="/images/icon-enterprise-integration.svg" alt="Enterprise Integration" className="h-10 w-10" /> },
    { title: "Scalable Edge Architecture", desc: "Designed to scale from 10 to 100K nodes.", icon: <img src="/images/icon-scalable-edge-architecture.svg" alt="Scalable Edge Architecture" className="h-10 w-10" /> },
  ];

  const galleryImages = [
    // 0 – Edge Infrastructure Management: server racks
    { title: features[0].title, url: '/images/feat-edge-infrastructure.svg' },
    // 1 – AI Deployment Orchestration: data / AI visualization
    { title: features[1].title, url: '/images/feat-ai-deployment.svg' },
    // 2 – Device Intelligence Layer: circuit board / chips
    { title: features[2].title, url: '/images/feat-device-intelligence.svg' },
    // 3 – Operational Analytics Engine: analytics dashboard
    { title: features[3].title, url: '/images/feat-operational-analytics.svg' },
    // 4 – Distributed Monitoring: network cables / infrastructure
    { title: features[4].title, url: '/images/feat-distributed-monitoring.svg' },
    // 5 – Infrastructure Observability: logs / trace monitoring
    { title: features[5].title, url: '/images/feat-infrastructure-observability.svg' },
    // 6 – Enterprise Integration Framework: security / shield
    { title: features[6].title, url: '/images/feat-enterprise-integration.svg' },
    // 7 – Scalable Edge Architecture: global network / globe
    { title: features[7].title, url: '/images/feat-scalable-edge-architecture.svg' },
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-1/2 bg-[radial-gradient(circle_at_100%_0,rgba(0,183,181,0.05),transparent_70%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead eyebrow="Features" title="Built for Edge AI Operations"
          desc="Everything your team needs to run AI infrastructure at planetary scale." />
        <div className="grid lg:grid-cols-3 gap-6 xl:gap-10 items-center">
          {/* Left: Features 0-3 */}
          <div className="space-y-3">
            {features.slice(0, 4).map((f, i) => (
              <button key={f.title} onClick={() => setActiveIndex(i)} className={`w-full text-left py-3 px-4 rounded-xl border transition ${activeIndex === i ? 'glass border-secondary/50 shadow-[0_0_15px_rgba(0,183,181,0.1)]' : 'hover:bg-white/5 border-transparent'}`}>
                <div className="flex items-center gap-3 mb-1.5">
                  <div className={`p-3 rounded-lg transition-colors bg-transparent text-muted-foreground border border-white/20`}>{f.icon}</div>
                  <h3 className={`font-heading font-bold text-base xl:text-lg transition-colors ${activeIndex === i ? 'text-white' : 'text-white/80'}`}>{f.title}</h3>
                </div>
                <p className={`text-[11px] xl:text-xs transition-colors ${activeIndex === i ? 'text-muted-foreground' : 'text-muted-foreground/60'}`}>{f.desc}</p>
              </button>
            ))}
          </div>

          {/* Middle: Flip Gallery */}
          <div className="flex justify-center w-full relative z-10 px-2">
            <FlipGallery images={galleryImages} onIndexChange={setActiveIndex} activeIndex={activeIndex} />
          </div>

          {/* Right: Features 4-7 */}
          <div className="space-y-3">
            {features.slice(4, 8).map((f, i) => {
              const index = i + 4;
              return (
                <button key={f.title} onClick={() => setActiveIndex(index)} className={`w-full text-left py-3 px-4 rounded-xl border transition ${activeIndex === index ? 'glass border-secondary/50 shadow-[0_0_15px_rgba(0,183,181,0.1)]' : 'hover:bg-white/5 border-transparent'}`}>
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className={`p-3 rounded-lg transition-colors bg-transparent text-muted-foreground border border-white/20`}>{f.icon}</div>
                    <h3 className={`font-heading font-bold text-base xl:text-lg transition-colors ${activeIndex === index ? 'text-white' : 'text-white/80'}`}>{f.title}</h3>
                  </div>
                  <p className={`text-[11px] xl:text-xs transition-colors ${activeIndex === index ? 'text-muted-foreground' : 'text-muted-foreground/60'}`}>{f.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


/* ---------------- PRICING ---------------- */
import PricingCard from "@/components/ui/pricing-card";

function Pricing() {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(0,183,181,0.05),transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead eyebrow="Pricing" title="Simple Pricing for Every Deployment"
          desc="Transparent plans designed to scale alongside your edge AI operations." />
        <div className="flex justify-center w-full">
          <PricingCard />
        </div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";

function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(0,183,181,0.06),transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          eyebrow="Testimonials"
          title="Trusted by Infrastructure Teams Worldwide"
          desc="See how organizations are scaling their distributed AI deployments with NodePilot's centralized command center."
        />
      </div>
      <StaggerTestimonials />
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
import { Footer7 } from "@/components/ui/footer-7";
import { ContactSection } from "@/components/ui/contact-section";
/* ---------------- ROOT ---------------- */

// Run this immediately when the script loads in the browser to prevent initial jump
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

export default function NodePilotLanding() {
  useEffect(() => {
    // Force scroll to top on mount
    window.scrollTo(0, 0);
    // Add a small delay to catch any late layout shifts
    const timer = setTimeout(() => {
        window.scrollTo(0, 0);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <NavBar />
      <main>
        <Hero />
        <About />
        <HowItWorks />
        <Features />
        <Pricing />
        <Testimonials />
        <ContactSection />
      </main>
      <Footer7 />
    </div>
  );
}
