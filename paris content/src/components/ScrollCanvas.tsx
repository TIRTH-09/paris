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

  // --- Draw a single frame with object-fit: cover logic ---
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;

    let drawWidth = canvas.width;
    let drawHeight = canvas.width / imgRatio;
    let startX = 0;
    let startY = (canvas.height - drawHeight) / 2;

    if (canvasRatio < imgRatio) {
      drawWidth = canvas.height * imgRatio;
      drawHeight = canvas.height;
      startX = (canvas.width - drawWidth) / 2;
      startY = 0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, startX, startY, drawWidth, drawHeight);
  }, []);

  // --- Resize canvas to match window ---
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    renderFrame(Math.round(currentFrameRef.current));
  }, [renderFrame]);

  // --- Persistent rAF animation loop with lerp ---
  const animate = useCallback(() => {
    const target = targetFrameRef.current;
    const current = currentFrameRef.current;
    // Lerp factor: lower = smoother/slower, higher = snappier
    const lerpFactor = 0.1;
    const diff = target - current;

    // Only redraw when we haven't converged
    if (Math.abs(diff) > 0.3) {
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
      const scrollTop = document.documentElement.scrollTop;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const fraction = Math.min(1, Math.max(0, scrollTop / maxScroll));
      targetFrameRef.current = fraction * (FRAME_COUNT - 1);
    };

    // --- Wire up events ---
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resizeCanvas);

    // Kick off the animation loop
    rafIdRef.current = requestAnimationFrame(animate);

    // Compute initial scroll position in case page loads mid-scroll
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resizeCanvas);
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
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />
      {/* Dark gradient overlay for text readability */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.55) 100%)',
        }}
      />
    </>
  );
};
