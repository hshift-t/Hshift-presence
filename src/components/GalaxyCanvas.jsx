import React, { useEffect, useRef, useCallback } from "react";

export const GalaxyCanvas = React.memo(function GalaxyCanvas({ reducedMotion }) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const stateRef = useRef({
    far: [],
    near: [],
    shooters: [],
    mouse: { x: 0, y: 0 },
    t: 0,
    raf: null,
    nextShooter: 4 + Math.random() * 6,
  });

  const buildStars = useCallback((w, h) => {
    const far = [];
    const near = [];
    for (let i = 0; i < 110; i++) {
      far.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.5 + Math.random() * 0.9,
        base: 0.2 + Math.random() * 0.35,
        amp: 0.15 + Math.random() * 0.25,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.6,
      });
    }
    for (let i = 0; i < 55; i++) {
      near.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 1 + Math.random() * 1.4,
        base: 0.35 + Math.random() * 0.4,
        amp: 0.2 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 0.7,
      });
    }
    return { far, near };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let rect = { width: 0, height: 0 };
    let resizeTimer;

    const resize = () => {
      rect = wrap.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const { far, near } = buildStars(rect.width, rect.height);
      stateRef.current.far = far;
      stateRef.current.near = near;
    };
    
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 100);
    };

    resize();
    window.addEventListener("resize", debouncedResize);

    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      stateRef.current.mouse.x = (e.clientX - r.left) / r.width - 0.5;
      stateRef.current.mouse.y = (e.clientY - r.top) / r.height - 0.5;
    };
    wrap.addEventListener("mousemove", onMove);

    const drawNebula = () => {
      const g1 = ctx.createRadialGradient(
        rect.width * 0.78, rect.height * 0.22, 0,
        rect.width * 0.78, rect.height * 0.22, rect.width * 0.42
      );
      g1.addColorStop(0, "rgba(139,133,199,0.16)");
      g1.addColorStop(1, "rgba(139,133,199,0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, rect.width, rect.height);

      const g2 = ctx.createRadialGradient(
        rect.width * 0.15, rect.height * 0.7, 0,
        rect.width * 0.15, rect.height * 0.7, rect.width * 0.32
      );
      g2.addColorStop(0, "rgba(111,169,166,0.10)");
      g2.addColorStop(1, "rgba(111,169,166,0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, rect.width, rect.height);
    };

    const drawStars = (stars, parallax, t) => {
      const mx = stateRef.current.mouse.x * parallax;
      const my = stateRef.current.mouse.y * parallax;
      stars.forEach((s) => {
        const alpha = reducedMotion ? s.base : s.base + Math.sin(t * s.speed + s.phase) * s.amp;
        ctx.beginPath();
        ctx.fillStyle = `rgba(242,241,247,${Math.max(0, Math.min(1, alpha))})`;
        ctx.arc(s.x + mx, s.y + my, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawShooters = (dt) => {
      const shooters = stateRef.current.shooters;
      for (let i = shooters.length - 1; i >= 0; i--) {
        const sh = shooters[i];
        sh.x += sh.vx * dt;
        sh.y += sh.vy * dt;
        sh.life -= dt;
        if (sh.life <= 0) {
          shooters.splice(i, 1);
          continue;
        }
        const alpha = Math.max(0, sh.life / sh.maxLife);
        const grad = ctx.createLinearGradient(sh.x, sh.y, sh.x - sh.vx * 0.12, sh.y - sh.vy * 0.12);
        grad.addColorStop(0, `rgba(242,241,247,${0.85 * alpha})`);
        grad.addColorStop(1, "rgba(242,241,247,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(sh.x - sh.vx * 0.12, sh.y - sh.vy * 0.12);
        ctx.stroke();
      }
    };

    const maybeSpawnShooter = (dt) => {
      stateRef.current.nextShooter -= dt;
      if (stateRef.current.nextShooter <= 0) {
        stateRef.current.nextShooter = 6 + Math.random() * 8;
        const startX = rect.width * (0.55 + Math.random() * 0.4);
        const startY = rect.height * (0.05 + Math.random() * 0.25);
        stateRef.current.shooters.push({
          x: startX,
          y: startY,
          vx: -260 - Math.random() * 80,
          vy: 130 + Math.random() * 60,
          life: 0.9,
          maxLife: 0.9,
        });
      }
    };

    const renderStatic = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      drawNebula();
      drawStars(stateRef.current.far, 0, 0);
      drawStars(stateRef.current.near, 0, 0);
    };

    if (reducedMotion) {
      renderStatic();
      return () => {
        window.removeEventListener("resize", debouncedResize);
        wrap.removeEventListener("mousemove", onMove);
      };
    }

    let last = performance.now();
    const loop = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      stateRef.current.t += dt;
      const t = stateRef.current.t;

      ctx.clearRect(0, 0, rect.width, rect.height);
      drawNebula();
      drawStars(stateRef.current.far, 10, t);
      drawStars(stateRef.current.near, 22, t);
      maybeSpawnShooter(dt);
      drawShooters(dt);

      stateRef.current.raf = requestAnimationFrame(loop);
    };
    stateRef.current.raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      wrap.removeEventListener("mousemove", onMove);
      if (stateRef.current.raf) cancelAnimationFrame(stateRef.current.raf);
    };
  }, [reducedMotion, buildStars]);

  return (
    <div className="galaxy-canvas-wrap" ref={wrapRef}>
      <canvas ref={canvasRef} className="galaxy-canvas" />
    </div>
  );
});
