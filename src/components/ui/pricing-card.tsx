"use client";

import {
  Plus as Add01Icon,
  Minus as MinusSignIcon,
  Check as Tick02Icon,
  Server as UserStoryIcon,
} from "lucide-react";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const plans = [
  {
    id: "starter",
    name: "Starter",
    description: "Pilot deployments",
    monthlyPrice: 8.99,
    yearlyPrice: 83.88,
    monthlyFeatures: [
      "Up to 50 edge nodes",
      "Basic monitoring",
      "Email support",
      "Standard SLA"
    ],
    yearlyFeatures: [
      "Up to 50 edge nodes",
      "Advanced monitoring",
      "Priority email support",
      "Standard SLA"
    ],
  },
  {
    id: "professional",
    name: "Professional",
    description: "Production AI at scale",
    monthlyPrice: 12.99,
    yearlyPrice: 119.88,
    monthlyFeatures: [
      "Up to 500 edge nodes",
      "Advanced orchestration",
      "24/7 support",
      "99.9% SLA",
      "Custom integrations"
    ],
    yearlyFeatures: [
      "Up to 500 edge nodes",
      "Advanced orchestration",
      "Dedicated 24/7 support channel",
      "99.9% SLA",
      "Custom integrations + 1 free plugin"
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Global deployments",
    monthlyPrice: 24.99,
    yearlyPrice: 239.88,
    monthlyFeatures: [
      "Unlimited edge nodes",
      "Dedicated infrastructure",
      "SSO + RBAC + Audit",
      "99.99% SLA",
      "On-prem option"
    ],
    yearlyFeatures: [
      "Unlimited edge nodes",
      "Dedicated infrastructure",
      "SSO + RBAC + Audit",
      "100% Uptime SLA guarantee",
      "On-prem option + Dedicated Account Manager"
    ],
  },
];

const TRANSITION = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

export default function PricingCard() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlan, setSelectedPlan] = useState("professional");
  const [userCount, setUserCount] = useState(10);

  const activePlan = plans.find((p) => p.id === selectedPlan) || plans[0];

  return (
    <div className="w-full max-w-5xl mx-auto grid lg:grid-cols-2 gap-8 p-5 px-4 sm:p-8 rounded-3xl sm:rounded-[2rem] glass-strong border border-secondary/40 shadow-[var(--shadow-elegant)] transition-colors duration-300 not-prose">
      {/* Left Column: Plan Selection */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-5 mb-2">
          <h1 className="text-3xl font-bold font-heading text-foreground tracking-tight text-center lg:text-left">
            Select a Plan
          </h1>

          <div className="glass p-1 h-12 w-full rounded-2xl flex relative overflow-hidden">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`flex-1 h-full rounded-xl text-sm font-semibold relative transition-colors duration-300 ${
                billingCycle === "monthly"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {billingCycle === "monthly" && (
                <motion.div
                  layoutId="tab-bg"
                  className="absolute inset-0 bg-white/10 rounded-xl"
                  transition={TRANSITION}
                />
              )}
              <span className="relative z-10">Monthly</span>
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`flex-1 h-full rounded-xl text-sm font-semibold relative transition-colors duration-300 flex items-center justify-center gap-2 ${
                billingCycle === "yearly"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {billingCycle === "yearly" && (
                <motion.div
                  layoutId="tab-bg"
                  className="absolute inset-0 bg-white/10 rounded-xl"
                  transition={TRANSITION}
                />
              )}
              <span className="relative z-10">Yearly</span>
              <span className="relative z-10 bg-secondary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase text-[#05131a] tracking-tight whitespace-nowrap">
                20% OFF
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            const price =
              billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative cursor-pointer rounded-2xl transition-all duration-300 ${
                  isSelected ? "bg-[rgba(0,183,181,0.05)] border border-secondary shadow-[0_0_20px_rgba(0,183,181,0.15)]" : "glass border border-white/5 hover:border-white/20"
                }`}
              >
                <div className="p-5">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                      <div className="shrink-0">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                            isSelected
                              ? "border-secondary"
                              : "border-muted-foreground/30 group-hover:border-muted-foreground/60"
                          }`}
                        >
                          <AnimatePresence mode="wait" initial={false}>
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="w-3 h-3 rounded-full bg-secondary"
                                transition={{
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 25,
                                  duration: 0.2,
                                }}
                              />
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold font-heading text-foreground leading-tight">
                          {plan.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {plan.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex flex-col justify-center">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-bold font-heading text-white">
                          ${price.toFixed(2)}
                        </span>
                        <span className="text-xs text-muted-foreground/60 uppercase tracking-wider font-semibold">
                          / {billingCycle === "monthly" ? "Month" : "Year"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Active Plan Details */}
      <div className="flex flex-col relative h-full">
        <div className="glass h-full rounded-2xl border border-white/5 p-6 sm:p-8 flex flex-col">
          <h3 className="text-2xl font-bold font-heading text-foreground mb-2">
            {activePlan.name} Features
          </h3>
          <p className="text-muted-foreground text-sm mb-6">
            Everything you need to run {activePlan.name.toLowerCase()} operations seamlessly.
          </p>
          
          <div className="flex flex-col gap-4 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePlan.id + billingCycle}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-4"
              >
                {(billingCycle === "monthly" ? activePlan.monthlyFeatures : activePlan.yearlyFeatures).map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                  >
                    <Tick02Icon
                      size={16}
                      className="text-secondary shrink-0"
                    />
                    {feature}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="h-px w-full bg-white/10 my-6" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl glass-strong shrink-0 flex items-center justify-center border border-white/5">
                <UserStoryIcon
                  size={24}
                  className="text-secondary"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold font-heading text-foreground leading-none">
                  Base Nodes
                </span>
                <span className="text-xs text-muted-foreground mt-1.5">
                  Starting at {userCount} nodes
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 glass p-1.5 rounded-xl border border-white/5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setUserCount(Math.max(1, userCount - 5));
                }}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-all text-muted-foreground hover:text-white active:scale-95"
              >
                <MinusSignIcon size={16} />
              </button>
              <span className="text-sm w-8 text-center tabular-nums text-foreground font-semibold">
                <NumberFlow value={userCount} />
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setUserCount(userCount + 5);
                }}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-all text-muted-foreground hover:text-white active:scale-95"
              >
                <Add01Icon size={16} />
              </button>
            </div>
          </div>
          
          <button className="w-full py-3.5 rounded-xl btn-gradient btn-gradient-hover font-semibold text-sm transition-all shadow-lg hover:shadow-[0_0_20px_rgba(0,183,181,0.4)]">
            Subscribe to {activePlan.name}
          </button>
        </div>
      </div>
    </div>
  );
}
