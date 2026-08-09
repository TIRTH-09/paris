import React, { useEffect, useRef, useCallback } from 'react';

const FRAME_COUNT = 300;

// Build the frame URL for a given 1-based index
const frameSrc = (index: number): string =>
  `/frames/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;

export const ScrollCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);   // smoothed (lerped) frame
  const targetFrameRef = useRef(0);    // raw scroll-derived target
  const rafIdRef = useRef<number>(0);
  const loadedCountRef = useRef(0);

  // --- Draw a single frame with cover fitting logic (all screen sizes) ---
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;

    let drawWidth, drawHeight, startX, startY;

    // Always use cover logic: fill entire canvas, no black bars on any device
    if (canvasRatio > imgRatio) {
      // Canvas is wider than image — fit to width, center vertically
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      startX = 0;
      startY = (canvas.height - drawHeight) / 2;
    } else {
      // Canvas is taller than image — fit to height, center horizontally
      drawWidth = canvas.height * imgRatio;
      drawHeight = canvas.height;
      startX = (canvas.width - drawWidth) / 2;
      startY = 0;
    }

    ctx.drawImage(img, startX, startY, drawWidth, drawHeight);
  }, []);

  // --- Resize canvas to match window ---
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Cap devicePixelRatio at 2 for performance on high-DPI mobile screens
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    // Use visualViewport when available (fixes mobile browser chrome resize issues)
    const vvw = window.visualViewport?.width || window.innerWidth;
    const vvh = window.visualViewport?.height || window.innerHeight;
    canvas.width = vvw * dpr;
    canvas.height = vvh * dpr;
    renderFrame(Math.round(currentFrameRef.current));
  }, [renderFrame]);

  // --- Persistent rAF animation loop with lerp ---
  const animate = useCallback(() => {
    const target = targetFrameRef.current;
    const current = currentFrameRef.current;
    // Lerp factor: lower = smoother/slower, higher = snappier
    // Lowered to 0.06 for a more buttery smooth transition on mobile
    const lerpFactor = 0.06;
    const diff = target - current;

    // Only redraw when we haven't converged (reduced threshold for smoother tail-end settling)
    if (Math.abs(diff) > 0.1) {
      currentFrameRef.current += diff * lerpFactor;
      const frameIdx = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );
      renderFrame(frameIdx);
    }

    rafIdRef.current = requestAnimationFrame(animate);
  }, [renderFrame]);

  useEffect(() => {
    // --- Preload all frames ---
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      img.onload = () => {
        loadedCountRef.current++;
        // Render the first frame once it loads
        if (i === 1) {
          resizeCanvas();
        }
      };
      images.push(img);
    }
    imagesRef.current = images;

    // --- Scroll handler: compute target frame ---
    const onScroll = () => {
      // Use standard window.scrollY with fallback
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // Robust calculation for document height across mobile browsers
      const docHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      );
      
      const maxScroll = docHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const fraction = Math.min(1, Math.max(0, scrollTop / maxScroll));
      targetFrameRef.current = fraction * (FRAME_COUNT - 1);
    };

    // --- Wire up events ---
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resizeCanvas);
    // visualViewport resize handles mobile browser address bar show/hide
    window.visualViewport?.addEventListener('resize', resizeCanvas);

    // Kick off the animation loop
    rafIdRef.current = requestAnimationFrame(animate);

    // Compute initial scroll position in case page loads mid-scroll
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resizeCanvas);
      window.visualViewport?.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(rafIdRef.current);
    };
  }, [animate, resizeCanvas]);

  return (
    <>
      {/* The fixed canvas — sits behind everything */}
      <canvas
        ref={canvasRef}
        id="scroll-canvas"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100dvh',
          zIndex: 0,
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />
      {/* Dark gradient overlay for text readability — lighter on mobile to not hide image */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100dvh',
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.25) 65%, rgba(0,0,0,0.50) 100%)',
        }}
      />
    </>
  );
};
