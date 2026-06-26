"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial: "NodePilot reduced our edge deployment cycle from weeks to hours. The orchestration layer is exactly what we needed.",
    by: "Sarah Chen",
    role: "VP of Infrastructure, Helix Robotics",
    imgSrc: "/images/sarah-chen.svg"
  },
  {
    tempId: 1,
    testimonial: "Centralized visibility across 3,000+ nodes was a dream — NodePilot made it our operating reality.",
    by: "Marcus Okafor",
    role: "Head of AI Platform, Aurora Logistics",
    imgSrc: "/images/marcus-okafor.svg"
  },
  {
    tempId: 2,
    testimonial: "The device intelligence layer caught failures before they hit production. Truly mission-critical software.",
    by: "Priya Raman",
    role: "Director of MLOps, Beacon Health AI",
    imgSrc: "/images/priya-raman.svg"
  },
  {
    tempId: 3,
    testimonial: "We manage a fleet of 10,000 edge devices across 12 countries. NodePilot is the only platform that scales with us.",
    by: "James Kovacs",
    role: "CTO, Meridian Systems",
    imgSrc: "/images/james-kovacs.svg"
  },
  {
    tempId: 4,
    testimonial: "Infrastructure observability was our biggest pain point. NodePilot's unified telemetry dashboard solved it completely.",
    by: "Ravi Krishnan",
    role: "Platform Architect, Optima Cloud",
    imgSrc: "/images/ravi-krishnan.svg"
  },
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className="absolute left-1/2 top-1/2 cursor-pointer transition-all duration-500 ease-in-out"
      style={{
        width: cardSize,
        height: isCenter ? cardSize + 40 : cardSize,
        clipPath: `polygon(40px 0%, calc(100% - 40px) 0%, 100% 40px, 100% 100%, calc(100% - 40px) 100%, 40px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -75 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
          scale(${isCenter ? 1 : 0.88})
        `,
        zIndex: isCenter ? 20 : 0,
        background: isCenter
          ? 'linear-gradient(160deg, #0a1f1f 0%, #071515 60%, #030e0e 100%)'
          : 'rgba(255,255,255,0.02)',
        border: isCenter
          ? '1.5px solid rgba(0,183,181,0.45)'
          : '1.5px solid rgba(255,255,255,0.06)',
        boxShadow: isCenter
          ? '0 0 0 1px rgba(0,183,181,0.12), 0 8px 40px rgba(0,0,0,0.7), 0 0 60px rgba(0,183,181,0.08)'
          : 'none',
        padding: isCenter ? '2rem' : '1.5rem',
        filter: isCenter ? 'none' : 'blur(0.5px) brightness(0.55)',
      }}
    >
      {/* Corner accent line */}
      <span
        className="absolute block origin-top-right rotate-45"
        style={{
          background: isCenter ? 'rgba(0,183,181,0.35)' : 'rgba(255,255,255,0.05)',
          right: -2,
          top: 38,
          width: SQRT_5000,
          height: isCenter ? 1.5 : 1,
        }}
      />

      {isCenter && (
        /* Teal glow top bar */
        <div
          className="absolute top-0 left-0 right-0 h-[2px] rounded-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(0,183,181,0.8), transparent)',
          }}
        />
      )}

      {/* Quote icon */}
      <Quote
        className="mb-3"
        style={{
          width: isCenter ? 28 : 20,
          height: isCenter ? 28 : 20,
          color: isCenter ? 'rgba(0,183,181,0.7)' : 'rgba(255,255,255,0.15)',
        }}
        fill="currentColor"
      />

      {/* Avatar */}
      <img
        src={testimonial.imgSrc}
        alt={testimonial.by}
        style={{
          width: isCenter ? 52 : 40,
          height: isCenter ? 52 : 40,
          objectFit: 'cover',
          objectPosition: 'top',
          marginBottom: isCenter ? '1rem' : '0.75rem',
          border: isCenter ? '2px solid rgba(0,183,181,0.4)' : '1px solid rgba(255,255,255,0.1)',
          boxShadow: isCenter ? '0 0 12px rgba(0,183,181,0.2)' : 'none',
        }}
      />

      {/* Testimonial text */}
      <p
        className={cn("font-medium leading-relaxed")}
        style={{
          fontSize: isCenter ? '0.9rem' : '0.78rem',
          color: isCenter ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.3)',
          marginBottom: isCenter ? '1.25rem' : '1rem',
        }}
      >
        "{testimonial.testimonial}"
      </p>

      {/* Author */}
      <div className="absolute bottom-6 left-8 right-8">
        <p style={{
          fontWeight: 600,
          fontSize: isCenter ? '0.82rem' : '0.72rem',
          color: isCenter ? 'rgba(0,183,181,0.9)' : 'rgba(255,255,255,0.2)',
          marginBottom: '2px',
        }}>
          {testimonial.by}
        </p>
        <p style={{
          fontSize: isCenter ? '0.72rem' : '0.65rem',
          color: isCenter ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.15)',
          fontStyle: 'italic',
        }}>
          {testimonial.role}
        </p>
      </div>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(340);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 340 : 260);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 560 }}>
      {/* Ambient background glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_55%,rgba(0,183,181,0.05),transparent_80%)]" />

      {testimonialsList.map((testimonial, index) => {
        // Math.floor ensures perfectly balanced positions: -2,-1,0,1,2 for 5 items
        const position = index - Math.floor(testimonialsList.length / 2);
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}

      {/* Navigation */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3 z-30">
        <button
          onClick={() => handleMove(-1)}
          className="flex h-10 w-10 items-center justify-center transition-all duration-300 text-white/50 hover:text-secondary hover:border-secondary/50 focus-visible:outline-none"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            clipPath: 'polygon(8px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 8px)',
          }}
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => handleMove(1)}
          className="flex h-10 w-10 items-center justify-center transition-all duration-300 text-white hover:shadow-[0_0_20px_rgba(0,183,181,0.5)] focus-visible:outline-none btn-gradient"
          style={{
            clipPath: 'polygon(0% 0%, calc(100% - 8px) 0%, 100% 8px, 100% 100%, 0% 100%)',
          }}
          aria-label="Next testimonial"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
