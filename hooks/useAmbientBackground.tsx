'use client';

import { useEffect, useRef } from 'react';

type Theme = {
  bgStart: string;
  bgEnd: string;
  accentColors: string[];
};

export function useAmbientBackground() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;

    if (!section || !canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    const drawingCtx = ctx;

    const theme: Theme = {
      bgStart: '#F5F7FA',
      bgEnd: '#FFFFFF',
      accentColors: [
        'rgba(109, 169, 255, 0.78)',
        'rgba(142, 197, 255, 0.6)',
        'rgba(168, 211, 255, 0.5)',
        'rgba(238, 242, 246, 0.92)',
      ],
    };

    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      active: false,
    };

    const scroll = {
      current: 0,
      target: 0,
    };

    const noiseCanvas = document.createElement('canvas');
    const noiseCtx = noiseCanvas.getContext('2d');
    noiseCanvas.width = 128;
    noiseCanvas.height = 128;

    if (noiseCtx) {
      const imgData = noiseCtx.createImageData(128, 128);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        const grain = Math.floor(Math.random() * 255);
        data[i] = grain;
        data[i + 1] = grain;
        data[i + 2] = grain;
        data[i + 3] = 255;
      }

      noiseCtx.putImageData(imgData, 0, 0);
    }

    let width = 0;
    let height = 0;
    let rafId = 0;
    let disposed = false;

    const state = {
      grainOpacity: 0.04,
      speedMultiplier: 1,
      particleCount: 40,
      parallaxStrength: 15,
      breathingScale: true,
    };

    const resize = () => {
      const rect = section.getBoundingClientRect();
      const pixelRatio = window.devicePixelRatio || 1;

      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);

      canvas.width = Math.max(1, Math.floor(width * pixelRatio));
      canvas.height = Math.max(1, Math.floor(height * pixelRatio));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      if (!mouse.active) {
        mouse.x = width / 2;
        mouse.y = height / 2;
        mouse.targetX = width / 2;
        mouse.targetY = height / 2;
      }
    };

    class SoftBlob {
      id: number;
      xPercent: number;
      yPercent: number;
      baseRadiusPercent: number;
      speed: number;
      x: number;
      y: number;
      radius: number;
      angle: number;
      breathingPhase: number;
      vx: number;
      vy: number;
      parallaxX: number;
      parallaxY: number;
      color: string;

      constructor(id: number, xPercent: number, yPercent: number, baseRadiusPercent: number, speed: number) {
        this.id = id;
        this.xPercent = xPercent;
        this.yPercent = yPercent;
        this.baseRadiusPercent = baseRadiusPercent;
        this.speed = speed;
        this.x = 0;
        this.y = 0;
        this.radius = 0;
        this.angle = Math.random() * Math.PI * 2;
        this.breathingPhase = Math.random() * 100;
        this.vx = 0;
        this.vy = 0;
        this.parallaxX = 0;
        this.parallaxY = 0;
        this.color = theme.accentColors[this.id % theme.accentColors.length];
      }

      update() {
        this.color = theme.accentColors[this.id % theme.accentColors.length];
        this.angle += 0.002 * state.speedMultiplier * this.speed;

        const driftRadius = 70;
        const driftX = Math.cos(this.angle) * driftRadius;
        const driftY = Math.sin(this.angle * 0.75) * driftRadius;

        const mousePowerX = width ? (mouse.x - width / 2) / (width / 2) : 0;
        const mousePowerY = height ? (mouse.y - height / 2) / (height / 2) : 0;
        const targetParallaxX = -mousePowerX * state.parallaxStrength;
        const targetParallaxY = -mousePowerY * state.parallaxStrength;

        this.parallaxX += (targetParallaxX - this.parallaxX) * 0.08;
        this.parallaxY += (targetParallaxY - this.parallaxY) * 0.08;

        this.breathingPhase += 0.005;
        const breathScale = state.breathingScale ? 1 + Math.sin(this.breathingPhase) * 0.05 : 1;
        const scrollEffect = scroll.current * 0.15 * (this.id % 2 === 0 ? 1 : -1);

        this.x = width * this.xPercent + driftX + this.parallaxX;
        this.y = height * this.yPercent + driftY + this.parallaxY + scrollEffect;
        this.radius = Math.max(width, height) * this.baseRadiusPercent * 1.18 * breathScale;
      }

      draw() {
        const grad = drawingCtx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        grad.addColorStop(0, this.color);

        const colorBase = this.color.substring(0, this.color.lastIndexOf(','));
        grad.addColorStop(0.3, `${colorBase}, 0.32)`);
        grad.addColorStop(0.6, `${colorBase}, 0.14)`);
        grad.addColorStop(1, `${colorBase}, 0)`);

        drawingCtx.fillStyle = grad;
        drawingCtx.beginPath();
        drawingCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        drawingCtx.fill();
      }
    }

    class AmbientParticle {
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      opacity: number;
      phase: number;
      phaseSpeed: number;

      constructor() {
        this.x = 0;
        this.y = 0;
        this.radius = 0;
        this.speedY = 0;
        this.speedX = 0;
        this.opacity = 0;
        this.phase = 0;
        this.phaseSpeed = 0;
        this.reset();
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + 10;
        this.radius = 2.25 + Math.random() * 4.25;
        this.speedY = 0.18 + Math.random() * 0.5;
        this.speedX = (Math.random() - 0.5) * 0.35;
        this.opacity = 0.14 + Math.random() * 0.22;
        this.phase = Math.random() * Math.PI * 2;
        this.phaseSpeed = 0.012 + Math.random() * 0.025;
      }

      update() {
        this.y -= this.speedY * state.speedMultiplier;
        this.phase += this.phaseSpeed;
        this.x += Math.sin(this.phase) * 0.15 + this.speedX;

        if (this.y < -10 || this.x < -10 || this.x > width + 10) {
          this.reset();
        }
      }

      draw() {
        drawingCtx.save();
        drawingCtx.shadowColor = 'rgba(109, 169, 255, 0.35)';
        drawingCtx.shadowBlur = 14;
        drawingCtx.fillStyle = `rgba(109, 169, 255, ${this.opacity})`;
        drawingCtx.beginPath();
        drawingCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        drawingCtx.fill();
        drawingCtx.restore();
      }
    }

    let blobs: SoftBlob[] = [];
    let particles: AmbientParticle[] = [];

    const initBlobs = () => {
      blobs = [
        new SoftBlob(0, 0.75, 0.25, 0.58, 1.2),
        new SoftBlob(1, 0.2, 0.45, 0.66, 0.8),
        new SoftBlob(2, 0.85, 0.8, 0.5, 0.9),
        new SoftBlob(3, 0.45, 0.7, 0.56, 1.1),
      ];
    };

    const adjustParticlesCount = () => {
      const diff = state.particleCount - particles.length;

      if (diff > 0) {
        for (let i = 0; i < diff; i += 1) {
          particles.push(new AmbientParticle());
        }
      } else if (diff < 0) {
        particles.splice(0, Math.abs(diff));
      }
    };

    resize();
    initBlobs();
    adjustParticlesCount();

    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => {
          resize();
        })
      : null;

    resizeObserver?.observe(section);

    const handleWindowLoad = () => {
      resize();
    };

    window.addEventListener('load', handleWindowLoad);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!disposed) {
          resize();
        }
      });
    }

    const handleMouseMove = (event: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mouse.targetX = event.clientX - rect.left;
      mouse.targetY = event.clientY - rect.top;
      mouse.active =
        mouse.targetX >= 0 &&
        mouse.targetX <= rect.width &&
        mouse.targetY >= 0 &&
        mouse.targetY <= rect.height;
    };

    const handleMouseLeave = () => {
      mouse.targetX = width / 2;
      mouse.targetY = height / 2;
      mouse.active = false;
    };

    const handleScroll = () => {
      scroll.target = window.scrollY;
    };

    const animate = () => {
      if (disposed) {
        return;
      }

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      scroll.current += (scroll.target - scroll.current) * 0.08;

      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, theme.bgStart);
      bgGrad.addColorStop(1, theme.bgEnd);
      drawingCtx.fillStyle = bgGrad;
      drawingCtx.fillRect(0, 0, width, height);

      blobs.forEach((blob) => {
        blob.update();
        blob.draw();
      });

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      if (state.grainOpacity > 0 && noiseCtx) {
        const pattern = ctx.createPattern(noiseCanvas, 'repeat');
        if (pattern) {
          drawingCtx.save();
          const dx = Math.floor(Math.random() * 128);
          const dy = Math.floor(Math.random() * 128);
          drawingCtx.globalAlpha = state.grainOpacity;
          drawingCtx.globalCompositeOperation = 'multiply';
          drawingCtx.fillStyle = pattern;
          drawingCtx.translate(dx, dy);
          drawingCtx.fillRect(-dx, -dy, width, height);
          drawingCtx.restore();
        }
      }

      rafId = window.requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    rafId = window.requestAnimationFrame(animate);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(rafId);
      resizeObserver?.disconnect();
      window.removeEventListener('load', handleWindowLoad);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return { sectionRef, canvasRef } as const;
}
