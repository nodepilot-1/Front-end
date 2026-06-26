import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export interface ProcessStep {
    num: string;
    title: string;
    desc: string;
    icon: LucideIcon;
    image: string;
}

export function ChainProcessSection({ steps }: { steps: ProcessStep[] }) {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <div className="relative w-full py-16 overflow-hidden">
            <div className="grid lg:grid-cols-3 gap-10 items-start relative z-10">
                
                {/* 1. LEFT COLUMN: Header & Watermark */}
                <div className="relative h-full flex flex-col justify-start lg:sticky lg:top-32">

                    
                    <div className="relative z-10 mt-16 lg:mt-32 px-4">
                        <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight text-foreground">
                            How It<br />Works
                        </h2>
                        <div className="w-12 h-1 bg-secondary mt-6 rounded-full" />
                        <p className="mt-6 text-muted-foreground max-w-xs">
                            Follow our streamlined operational flow designed for robust production AI at the edge.
                        </p>
                    </div>
                </div>

                {/* 2. CENTER COLUMN: Dynamic Illustration */}
                <div className="relative flex justify-center items-center h-[400px] lg:h-[600px] lg:sticky lg:top-16">
                    {/* Glowing background circle */}
                    <div className="absolute inset-0 m-auto w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] rounded-full bg-secondary/10 blur-[80px]" />
                    
                    {/* Circular container */}
                    <div className="relative w-[280px] h-[280px] lg:w-[380px] lg:h-[380px] rounded-full border border-white/10 glass-strong overflow-hidden shadow-2xl flex items-center justify-center p-8">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={activeStep}
                                src={steps[activeStep].image}
                                alt={steps[activeStep].title}
                                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="w-full h-full object-cover rounded-full mix-blend-overlay opacity-80"
                            />
                        </AnimatePresence>
                    </div>
                </div>

                {/* 3. RIGHT COLUMN: Process Steps */}
                <div className="relative flex flex-col justify-center py-10 lg:py-20 pl-4 lg:pl-0">
                    
                    {/* SVG Connecting Dashed Line (Visible on Desktop) */}
                    <svg className="absolute left-6 top-0 w-full h-full -z-10 hidden lg:block" preserveAspectRatio="none" viewBox="0 0 100 1000">
                        {/* A curved path that bows slightly outward to the left */}
                        <path 
                            d="M 50 0 Q -20 500 50 1000" 
                            fill="none" 
                            stroke="rgba(0,183,181,0.3)" 
                            strokeWidth="2" 
                            strokeDasharray="6 6" 
                        />
                    </svg>
                    
                    {/* Straight connecting line for mobile */}
                    <div className="absolute left-[38px] top-0 w-[2px] h-full border-l-2 border-dashed border-secondary/30 lg:hidden -z-10" />

                    <div className="flex flex-col gap-12 lg:gap-20">
                        {steps.map((step, index) => {
                            // Calculate a subtle horizontal offset to create an "arc" shape matching the SVG
                            const xOffset = index === 0 || index === steps.length - 1 ? 20 : -10;
                            const isActive = activeStep === index;
                            
                            return (
                                <motion.div
                                    key={step.num}
                                    onMouseEnter={() => setActiveStep(index)}
                                    className="relative flex items-start gap-6 cursor-pointer group"
                                    animate={{ x: typeof window !== 'undefined' && window.innerWidth >= 1024 ? xOffset : 0 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                >
                                    {/* Number Badge */}
                                    <div className={cn(
                                        "flex-none w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 z-10",
                                        isActive 
                                            ? "bg-secondary text-white shadow-[0_0_20px_rgba(0,183,181,0.5)] scale-110" 
                                            : "glass border border-white/20 text-secondary group-hover:border-secondary/50 group-hover:scale-105"
                                    )}>
                                        {step.num}
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="pt-2">
                                        <h3 className={cn(
                                            "text-xl font-heading font-bold transition-colors duration-300",
                                            isActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"
                                        )}>
                                            {step.title}
                                        </h3>
                                        <p className={cn(
                                            "mt-2 text-sm leading-relaxed transition-all duration-500",
                                            isActive ? "text-muted-foreground opacity-100 h-auto" : "text-zinc-600 opacity-0 h-0 overflow-hidden"
                                        )}>
                                            {step.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
