import { createFileRoute } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Check,
  Cpu,
  Shield,
  Server,
  Activity,
  Sparkles,
  Layers,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/nodepilot/NodePilotLanding";
import { Footer7 } from "@/components/ui/footer-7";

export const Route = createFileRoute("/Product")({
  component: ProductPage,
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const techStack = [
  {
    title: "NVIDIA Fleet Command",
    desc: "The secure orchestration backbone for zero-touch device provisioning and fleet-wide AI application lifecycle control.",
  },
  {
    title: "NVIDIA Triton Inference Server",
    desc: "The model serving engine that manages over 180 AI models with concurrent execution, versioning, and optimized routing.",
  },
  {
    title: "NVIDIA Morpheus",
    desc: "Real-time telemetry pipelines for anomaly detection, infrastructure insights, and nonstop edge observability.",
  },
  {
    title: "NVIDIA RAPIDS",
    desc: "GPU-accelerated telemetry analytics that turns high-velocity hardware metrics into actionable health signals.",
  },
  {
    title: "NVIDIA TensorRT",
    desc: "Deep learning optimization for every edge deployment, compiling workloads for maximum efficiency and power savings.",
  },
];

const outcomes = [
  {
    title: "Distributed AI operations",
    desc: "Centralize workflows across thousands of endpoints while keeping every rollout fast, secure, and easy to govern.",
    icon: Server,
  },
  {
    title: "Live fleet intelligence",
    desc: "A single pane of truth for telemetry, model health, and infrastructure status in real time.",
    icon: Activity,
  },
  {
    title: "Model-forward scale",
    desc: "Maintain over 180 AI model instances with safe, containerized delivery and hardware-aware deployment logic.",
    icon: Cpu,
  },
  {
    title: "Resilient operations",
    desc: "Proactive alerts, predictable rollouts, and observability that keeps edge systems available under pressure.",
    icon: Shield,
  },
];

function SectionHeading({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="max-w-3xl mx-auto text-center mb-12">
      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-semibold text-secondary mb-4">
        {eyebrow}
      </span>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold tracking-tight">
        {title}
      </h1>
      <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-8">{desc}</p>
    </motion.div>
  );
}

function ProductPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <NavBar />
      <main>
        <section className="relative overflow-hidden pt-28 pb-20 lg:pb-24">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(0,183,181,0.24),transparent_32%)]" />
          <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[1.2fr_0.9fr] items-center">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <span className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-white/5 px-4 py-2 text-sm font-semibold text-secondary shadow-sm shadow-secondary/10 mb-6">
                  Launching NP Core 1.0
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight leading-tight">
                  NP Core 1.0 — the enterprise edge AI control plane for live AI and infrastructure operations.
                </h1>
                <p className="mt-6 max-w-2xl text-lg sm:text-xl text-muted-foreground leading-8">
                  Designed to make distributed AI truly manageable, NP Core 1.0 turns thousands of edge endpoints, hundreds of models, and continuous telemetry into one fluent operational experience.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Button asChild size="lg" className="btn-gradient px-8 py-3 rounded-xl shadow-[0_0_18px_rgba(0,183,181,0.25)]">
                    <a href="http://app.node-pilot.com" target="_blank" rel="noreferrer">
                      Launch Live Core
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="px-8 py-3 rounded-xl border-white/15 text-white/90 hover:bg-white/5">
                    Explore product details
                  </Button>
                </div>
                <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="glass rounded-3xl border border-white/10 p-5 text-center">
                    <p className="text-3xl font-heading font-bold">180+</p>
                    <p className="mt-2 text-sm text-muted-foreground">AI models orchestrated</p>
                  </div>
                  <div className="glass rounded-3xl border border-white/10 p-5 text-center">
                    <p className="text-3xl font-heading font-bold">2.8K+</p>
                    <p className="mt-2 text-sm text-muted-foreground">edge endpoints monitored</p>
                  </div>
                  <div className="glass rounded-3xl border border-white/10 p-5 text-center">
                    <p className="text-3xl font-heading font-bold">24/7</p>
                    <p className="mt-2 text-sm text-muted-foreground">fleet observability</p>
                  </div>
                  <div className="glass rounded-3xl border border-white/10 p-5 text-center">
                    <p className="text-3xl font-heading font-bold">100%</p>
                    <p className="mt-2 text-sm text-muted-foreground">hardware-aware deployments</p>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
                <div className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 shadow-[0_40px_120px_-60px_rgba(0,183,181,0.45)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,183,181,0.18),transparent_40%)] pointer-events-none" />
                  <img src="/images/hero-image-2.svg" alt="Product overview" className="w-full h-full object-cover min-h-[420px]" />
                  <div className="absolute left-6 bottom-6 rounded-3xl bg-background/95 border border-white/10 p-5 shadow-xl backdrop-blur-xl w-[calc(100%-3rem)]">
                    <p className="text-xs uppercase tracking-[0.2em] text-secondary font-semibold mb-2">Product Pulse</p>
                    <h2 className="text-xl font-bold">AI, telemetry, and infrastructure fused into one operating layer.</h2>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">A platform built to let operations teams steer distributed AI without switching tools or losing visibility.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
            <SectionHeading
              eyebrow="Product Overview"
              title="A product shaped around modern edge operations, not abstract infrastructure."
              desc="NP Core 1.0 is built for decisions that happen at the edge: fast deployments, pulse-aware monitoring, and model orchestration across distributed systems."
            />
            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
              {outcomes.map((item) => (
                <motion.div key={item.title} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="glass rounded-3xl border border-white/10 p-7 shadow-[0_0_30px_rgba(0,183,181,0.08)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary mb-4">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="text-sm leading-6 text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-20 overflow-hidden">
          <div className="absolute right-0 top-16 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
          <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12 relative">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] items-center">
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-secondary mb-4">
                  AI Stack Snapshot
                </span>
                <h2 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight mb-6">Powering NP Core 1.0 with market-proven AI orchestration engines.</h2>
                <p className="max-w-xl text-muted-foreground leading-8">
                  The platform is grounded in the engines that move enterprise AI at the edge: model serving, stream processing, analytics, and hardware-specific optimization. These capabilities are surfaced through a single product experience.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <div className="grid gap-4">
                  {techStack.map((item) => (
                    <div key={item.title} className="glass rounded-3xl border border-white/10 p-6 shadow-[0_20px_60px_-40px_rgba(0,183,181,0.3)]">
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-secondary">
                          <Sparkles className="h-5 w-5" />
                        </span>
                        <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-secondary mb-4">
                  Why NP Core 1.0
                </span>
                <h2 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight mb-6">Designed to align AI infrastructure with operational outcomes.</h2>
                <p className="max-w-xl text-muted-foreground leading-8">
                  Every element of NP Core 1.0 is tuned for the needs of distributed teams: clarity over complexity, automation over manual toil, and live understanding over delayed reporting.
                </p>
                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  <div className="glass rounded-3xl border border-white/10 p-6">
                    <p className="text-sm font-semibold text-white">Hardware-aware rollouts</p>
                    <p className="mt-2 text-sm text-muted-foreground leading-6">Deliver AI containers to the right edge hardware with optimized runtime efficiency.</p>
                  </div>
                  <div className="glass rounded-3xl border border-white/10 p-6">
                    <p className="text-sm font-semibold text-white">Unified telemetry fabric</p>
                    <p className="mt-2 text-sm text-muted-foreground leading-6">One view for logs, traces, metrics, and model health across the entire edge fleet.</p>
                  </div>
                  <div className="glass rounded-3xl border border-white/10 p-6">
                    <p className="text-sm font-semibold text-white">Secure production delivery</p>
                    <p className="mt-2 text-sm text-muted-foreground leading-6">Safe, containerized application updates with policy controls and audit-ready workflows.</p>
                  </div>
                  <div className="glass rounded-3xl border border-white/10 p-6">
                    <p className="text-sm font-semibold text-white">Proactive edge resilience</p>
                    <p className="mt-2 text-sm text-muted-foreground leading-6">AI-detects anomalies and surface service health before disruptions impact customers.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <div className="glass-strong rounded-[2rem] border border-white/10 p-8 shadow-[0_40px_120px_-60px_rgba(0,183,181,0.45)]">
                  <div className="flex flex-col gap-5">
                    {[
                      { label: "Endpoint telemetry", value: "Thousands of active edge systems are analyzed continuously for stability and performance." },
                      { label: "Model orchestration", value: "More than 180 models are coordinated across compute, memory, and latency constraints." },
                      { label: "Container rollouts", value: "Secure, predictable updates delivered through enterprise-grade deployment pipelines." },
                      { label: "Operational insight", value: "Your team sees health, utilization, and risk in one shared dashboard." },
                    ].map((item) => (
                      <div key={item.label} className="flex gap-4">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                          <Check className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{item.label}</p>
                          <p className="mt-2 text-sm text-muted-foreground leading-6">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <Button asChild size="lg" className="btn-gradient px-8 py-3 rounded-xl w-full text-center">
                      <a href="http://app.node-pilot.com" target="_blank" rel="noreferrer">
                        Open the live product
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer7 />
    </div>
  );
}
