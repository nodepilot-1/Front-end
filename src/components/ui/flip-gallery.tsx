"use client";

import { useEffect, useRef, useState } from 'react';

const defaultImages = [
  { title: 'Zero-Touch Provisioning', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&h=1000&auto=format&fit=crop' },
  { title: 'Real-Time Telemetry', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&h=1000&auto=format&fit=crop' },
  { title: 'Automated Rollbacks', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&h=1000&auto=format&fit=crop' },
  { title: 'Secure Data Pipelines', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&h=1000&auto=format&fit=crop' },
  { title: 'Global Load Balancing', url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=600&h=1000&auto=format&fit=crop' },
  { title: 'Containerized Workloads', url: 'https://images.unsplash.com/photo-1614064641913-6b716b6c23cd?q=80&w=600&h=1000&auto=format&fit=crop' }
];

const FLIP_SPEED = 650;
const flipTiming = { duration: FLIP_SPEED, iterations: 1 };

// flip down (forward)
const flipAnimationTop = [
  { transform: 'rotateX(0)' },
  { transform: 'rotateX(-90deg)' },
  { transform: 'rotateX(-90deg)' }
];
const flipAnimationBottom = [
  { transform: 'rotateX(90deg)' },
  { transform: 'rotateX(90deg)' },
  { transform: 'rotateX(0)' }
];

// flip up (reverse)
const flipAnimationTopReverse = [
  { transform: 'rotateX(-90deg)' },
  { transform: 'rotateX(-90deg)' },
  { transform: 'rotateX(0)' }
];
const flipAnimationBottomReverse = [
  { transform: 'rotateX(0)' },
  { transform: 'rotateX(90deg)' },
  { transform: 'rotateX(90deg)' }
];

export default function FlipGallery({
  images = defaultImages,
  onIndexChange,
  activeIndex,
}: {
  images?: { title: string; url: string }[];
  onIndexChange?: (index: number) => void;
  activeIndex?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniteRef = useRef<HTMLElement[]>([]);
  const currentIndexRef = useRef<number>(activeIndex ?? 0);
  const [displayIndex, setDisplayIndex] = useState(activeIndex ?? 0);

  // ── helper: set background image for a specific index ──────────────────────
  const setImageAt = (el: HTMLElement, idx: number) => {
    const url = images[idx]?.url ?? '';
    el.style.backgroundImage = `url('${url}')`;
  };

  // ── helper: show title from index ─────────────────────────────────────────
  const showTitle = (idx: number) => {
    const gallery = containerRef.current;
    if (!gallery) return;
    gallery.setAttribute('data-title', images[idx]?.title ?? '');
    gallery.style.setProperty('--title-y', '0');
    gallery.style.setProperty('--title-opacity', '1');
  };

  const hideTitle = () => {
    const gallery = containerRef.current;
    if (!gallery) return;
    gallery.style.setProperty('--title-y', '-1rem');
    gallery.style.setProperty('--title-opacity', '0');
    gallery.setAttribute('data-title', '');
  };

  // ── initialise first image ─────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current) return;
    uniteRef.current = Array.from(
      containerRef.current.querySelectorAll('.unite')
    ) as HTMLElement[];
    const idx = currentIndexRef.current;
    uniteRef.current.forEach((el) => setImageAt(el, idx));
    showTitle(idx);
    onIndexChange?.(idx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── core flip animation ────────────────────────────────────────────────────
  const flipTo = (nextIdx: number, isReverse: boolean) => {
    const gallery = containerRef.current;
    if (!gallery) return;

    const topAnim = isReverse ? flipAnimationTopReverse : flipAnimationTop;
    const bottomAnim = isReverse ? flipAnimationBottomReverse : flipAnimationBottom;

    gallery.querySelector('.overlay-top')?.animate(topAnim, flipTiming);
    gallery.querySelector('.overlay-bottom')?.animate(bottomAnim, flipTiming);

    hideTitle();

    // update each panel with the correct image, using staggered timing
    uniteRef.current.forEach((el, panelIdx) => {
      const delay =
        (isReverse && (panelIdx !== 1 && panelIdx !== 2)) ||
        (!isReverse && (panelIdx === 1 || panelIdx === 2))
          ? FLIP_SPEED - 200
          : 0;
      setTimeout(() => setImageAt(el, nextIdx), delay);
    });

    // reveal new title mid-animation
    setTimeout(() => showTitle(nextIdx), FLIP_SPEED * 0.5);
  };

  // ── respond to external activeIndex prop changes (feature clicks) ──────────
  useEffect(() => {
    if (activeIndex === undefined) return;
    if (activeIndex === currentIndexRef.current) return;

    const isReverse = activeIndex < currentIndexRef.current;
    currentIndexRef.current = activeIndex;
    setDisplayIndex(activeIndex);
    flipTo(activeIndex, isReverse);
    onIndexChange?.(activeIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  return (
    <div className='flex items-center justify-center font-sans w-full'>
      <div className='relative glass-strong border border-secondary/40 p-3 sm:p-4 rounded-xl shadow-[var(--shadow-elegant)] w-full max-w-[420px]'>
        {/* flip gallery */}
        <div
          id='flip-gallery'
          ref={containerRef}
          className='relative w-full aspect-[3/4] text-center mx-auto'
          style={{ perspective: '800px' }}
        >
          <div className='top unite bg-cover bg-no-repeat rounded-t-lg'></div>
          <div className='bottom unite bg-cover bg-no-repeat rounded-b-lg'></div>
          <div className='overlay-top unite bg-cover bg-no-repeat rounded-t-lg'></div>
          <div className='overlay-bottom unite bg-cover bg-no-repeat rounded-b-lg'></div>

          {/* Title overlay at top of image */}
          <div className='absolute top-0 left-0 right-0 z-20 px-3 pt-3 pb-6 rounded-t-lg pointer-events-none'
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, transparent 100%)' }}
          >
            <p className='text-white font-semibold text-sm text-left leading-snug drop-shadow-md'
              style={{
                opacity: 'var(--title-opacity, 0)',
                transform: 'translateY(var(--title-y, 0))',
                transition: 'opacity 500ms ease-in-out, transform 500ms ease-in-out'
              }}
              id='gallery-title-overlay'
            >
              {images[displayIndex]?.title}
            </p>
          </div>
        </div>

        {/* dot indicators inside card */}
        <div className='flex justify-center gap-1.5 mt-3'>
          {images.map((_, i) => (
            <span
              key={i}
              className={`block rounded-full transition-all duration-300 ${
                i === displayIndex
                  ? 'w-4 h-1.5 bg-secondary'
                  : 'w-1.5 h-1.5 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* component-scoped styles */}
      <style>{`
        #flip-gallery::after {
          content: '';
          position: absolute;
          background-color: rgba(0, 0, 0, 0.4);
          width: 100%;
          height: 2px;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          z-index: 10;
        }

        #flip-gallery > * {
          position: absolute;
          width: 100%;
          height: 50%;
          overflow: hidden;
          background-size: 100% 200%;
        }

        .top,
        .overlay-top {
          top: 0;
          transform-origin: bottom;
          background-position: top;
        }

        .bottom,
        .overlay-bottom {
          bottom: 0;
          transform-origin: top;
          background-position: bottom;
        }
      `}</style>
    </div>
  );
}
