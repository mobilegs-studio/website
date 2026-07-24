"use client";

import { useEffect, useRef } from "react";

/* ============================================================================
   HeroCanvas — subtiele deeltjes-constellatie voor de homepage-hero.

   Rendering: raw WebGL (punten als soft sprites + hairline verbindingslijnen,
   additief geblend voor een zachte gloed). Faalt WebGL, dan valt de component
   terug op een 2D-canvas met hetzelfde concept; faalt ook dat, dan resteert
   een statische gradient. De simulatie draait op de CPU (max 200 deeltjes,
   goedkoop) en wordt per frame naar de GPU geüpload.
   ========================================================================== */

const MAX_POINTS = 200; // bovengrens deeltjes (buffers worden hierop gealloceerd)
const MAX_LINKS = MAX_POINTS * 8; // bovengrens verbindingslijnen per frame
const FLOW_SPEED = 9; // basissnelheid van het stroomveld (px/s)
const FIELD_SCALE = 0.0016; // schaal: wereld-px -> "noise"-ruimte
const PARALLAX_MAX = 20; // maximale verschuiving richting cursor (px)
const WRAP_MARGIN = 40; // deeltjes wrappen pas net buiten beeld

// Merkkleuren, genormaliseerd naar 0..1 voor WebGL
const INDIGO: readonly number[] = [91 / 255, 95 / 255, 232 / 255];
const PERI: readonly number[] = [155 / 255, 163 / 255, 242 / 255];
const AMBER: readonly number[] = [224 / 255, 185 / 255, 120 / 255];

// Deterministische pseudo-random: geen Math.random, zodat de constellatie
// stabiel is tussen mounts en er nooit hydration-drift kan ontstaan.
function seeded(n: number): number {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/* ---------------------------------------------------------------------------
   Simulatie-state: alle deeltjesdata in platte Float32Arrays (cache-vriendelijk,
   en direct her te gebruiken als upload-bron voor de GPU-buffers).
--------------------------------------------------------------------------- */
type Sim = {
  w: number; // css-breedte
  h: number; // css-hoogte
  dpr: number; // devicePixelRatio, gecapt op 2
  count: number; // actief aantal deeltjes (afhankelijk van oppervlak)
  linkDist: number; // maximale afstand waarop deeltjes verbonden worden
  t: number; // simulatietijd in seconden
  pos: Float32Array; // x,y per deeltje (css-px)
  size: Float32Array; // basisgrootte per deeltje (css-px)
  col: Float32Array; // r,g,b per deeltje (0..1)
  baseA: Float32Array; // basis-alpha per deeltje
  curA: Float32Array; // alpha van dít frame (basis + twinkle)
  spd: Float32Array; // individuele snelheidsfactor
  driftX: Float32Array; // kleine eigen driftsnelheid, voorkomt "lockstep"
  driftY: Float32Array;
  twF: Float32Array; // twinkle-frequentie
  twP: Float32Array; // twinkle-fase
  inited: number; // tot welke index deeltjes geseed zijn
  linkA: Uint16Array; // index deeltje A per lijn
  linkB: Uint16Array; // index deeltje B per lijn
  linkAlpha: Float32Array; // alpha per lijn
  linkCount: number;
};

function seedParticles(s: Sim, from: number, to: number): void {
  for (let i = from; i < to; i++) {
    s.pos[i * 2] = seeded(i * 7 + 1) * s.w;
    s.pos[i * 2 + 1] = seeded(i * 7 + 2) * s.h;
    // ~8% amber accenten, de rest indigo/periwinkle
    const cr = seeded(i * 7 + 3);
    const c = cr < 0.08 ? AMBER : cr < 0.62 ? INDIGO : PERI;
    s.col[i * 3] = c[0];
    s.col[i * 3 + 1] = c[1];
    s.col[i * 3 + 2] = c[2];
    s.size[i] = 1.6 + seeded(i * 7 + 4) * 2.2;
    s.baseA[i] = 0.16 + seeded(i * 7 + 5) * 0.3; // max ~0.46: kop blijft leesbaar
    s.spd[i] = 0.6 + seeded(i * 7 + 6) * 0.9;
    s.driftX[i] = (seeded(i * 11 + 1) - 0.5) * 6;
    s.driftY[i] = (seeded(i * 11 + 2) - 0.5) * 6;
    s.twF[i] = 0.4 + seeded(i * 11 + 3) * 0.9;
    s.twP[i] = seeded(i * 11 + 4) * Math.PI * 2;
  }
}

/* ---------------------------------------------------------------------------
   Stroomveld ("curl noise" in het klein).
   We bouwen een stream function psi(x, y, t) uit twee sinus-octaven en nemen
   daar de curl van: vx = d(psi)/dy, vy = -d(psi)/dx. De curl van een scalair
   veld is divergentievrij: deeltjes klonteren nooit samen en blijven rustig
   "stromen" — het organische gedrag van echte curl noise, maar analytisch en
   dus spotgoedkoop (geen Perlin/Simplex nodig). De partiële afgeleiden staan
   hieronder met de hand uitgeschreven; de constante schaalfactor is
   geabsorbeerd in FLOW_SPEED.
--------------------------------------------------------------------------- */
function stepSim(s: Sim, dt: number): void {
  const { pos, count, t } = s;
  const maxX = s.w + WRAP_MARGIN;
  const maxY = s.h + WRAP_MARGIN;
  for (let i = 0; i < count; i++) {
    const x = pos[i * 2];
    const y = pos[i * 2 + 1];
    const nx = x * FIELD_SCALE;
    const ny = y * FIELD_SCALE;
    // psi = sin(a1)·cos(b1) + 0.5·sin(a2)·cos(b2)  (twee octaven)
    const a1 = nx * 1.7 + t * 0.11;
    const b1 = ny * 1.3 - t * 0.093;
    const a2 = nx * 3.1 - t * 0.061;
    const b2 = ny * 2.6 + t * 0.077;
    // vx =  d(psi)/dy = -(1.3·sin(a1)sin(b1) + 0.5·2.6·sin(a2)sin(b2))
    const vx = -(1.3 * Math.sin(a1) * Math.sin(b1) + 1.3 * Math.sin(a2) * Math.sin(b2));
    // vy = -d(psi)/dx = -(1.7·cos(a1)cos(b1) + 0.5·3.1·cos(a2)cos(b2))
    const vy = -(1.7 * Math.cos(a1) * Math.cos(b1) + 1.55 * Math.cos(a2) * Math.cos(b2));
    let X = x + (vx * FLOW_SPEED * s.spd[i] + s.driftX[i]) * dt;
    let Y = y + (vy * FLOW_SPEED * s.spd[i] + s.driftY[i]) * dt;
    // Wrap net buiten beeld, zodat deeltjes nooit zichtbaar "poppen"
    if (X < -WRAP_MARGIN) X = maxX;
    else if (X > maxX) X = -WRAP_MARGIN;
    if (Y < -WRAP_MARGIN) Y = maxY;
    else if (Y > maxY) Y = -WRAP_MARGIN;
    pos[i * 2] = X;
    pos[i * 2 + 1] = Y;
  }
}

// Alpha van dit frame: basis-alpha met een trage, individuele "twinkle"
function updateAlphas(s: Sim): void {
  for (let i = 0; i < s.count; i++) {
    s.curA[i] = s.baseA[i] * (0.72 + 0.28 * Math.sin(s.t * s.twF[i] + s.twP[i]));
  }
}

// Verbindingslijnen: naïef O(n²), maar met n <= 200 is dat ~20k checks/frame
function computeLinks(s: Sim): void {
  let c = 0;
  const max2 = s.linkDist * s.linkDist;
  outer: for (let i = 0; i < s.count; i++) {
    const xi = s.pos[i * 2];
    const yi = s.pos[i * 2 + 1];
    for (let j = i + 1; j < s.count; j++) {
      const dx = s.pos[j * 2] - xi;
      const dy = s.pos[j * 2 + 1] - yi;
      const d2 = dx * dx + dy * dy;
      if (d2 > max2) continue;
      // Kwadratische falloff: lijnen vervagen zacht met de afstand
      const f = 1 - Math.sqrt(d2) / s.linkDist;
      s.linkA[c] = i;
      s.linkB[c] = j;
      s.linkAlpha[c] = f * f * 0.6 * Math.min(s.curA[i], s.curA[j]);
      if (++c >= MAX_LINKS) break outer;
    }
  }
  s.linkCount = c;
}

/* ---------------------------------------------------------------------------
   Renderers: WebGL (voorkeur) en 2D-canvas (fallback), zelfde interface.
--------------------------------------------------------------------------- */
type Renderer = {
  draw: (s: Sim, ox: number, oy: number) => void;
  dispose: () => void;
};

const POINT_VS = `
attribute vec2 a_pos;
attribute float a_size;
attribute vec4 a_col;
uniform vec2 u_res;
uniform vec2 u_off;
varying vec4 v_col;
void main() {
  vec2 clip = (a_pos + u_off) / u_res * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  gl_PointSize = a_size;
  v_col = a_col;
}`;

const POINT_FS = `
precision mediump float;
varying vec4 v_col;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float a = v_col.a * smoothstep(1.0, 0.25, d); // zachte, ronde sprite
  gl_FragColor = vec4(v_col.rgb * a, a);        // premultiplied voor additief blenden
}`;

const LINE_VS = `
attribute vec2 a_pos;
attribute vec4 a_col;
uniform vec2 u_res;
uniform vec2 u_off;
varying vec4 v_col;
void main() {
  vec2 clip = (a_pos + u_off) / u_res * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  v_col = a_col;
}`;

const LINE_FS = `
precision mediump float;
varying vec4 v_col;
void main() {
  gl_FragColor = vec4(v_col.rgb * v_col.a, v_col.a);
}`;

function createProgram(gl: WebGLRenderingContext, vsSrc: string, fsSrc: string): WebGLProgram | null {
  const compile = (type: number, src: string): WebGLShader | null => {
    const sh = gl.createShader(type);
    if (!sh) return null;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      gl.deleteShader(sh);
      return null;
    }
    return sh;
  };
  const vs = compile(gl.VERTEX_SHADER, vsSrc);
  const fs = compile(gl.FRAGMENT_SHADER, fsSrc);
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    gl.deleteProgram(prog);
    return null;
  }
  return prog;
}

function createGlRenderer(gl: WebGLRenderingContext): Renderer | null {
  const pProg = createProgram(gl, POINT_VS, POINT_FS);
  const lProg = createProgram(gl, LINE_VS, LINE_FS);
  if (!pProg || !lProg) return null;

  // CPU-side upload-buffers: punten [x,y,size,r,g,b,a], lijnen 2x [x,y,r,g,b,a]
  const pData = new Float32Array(MAX_POINTS * 7);
  const lData = new Float32Array(MAX_LINKS * 12);
  const pBuf = gl.createBuffer();
  const lBuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pBuf);
  gl.bufferData(gl.ARRAY_BUFFER, pData.byteLength, gl.DYNAMIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, lBuf);
  gl.bufferData(gl.ARRAY_BUFFER, lData.byteLength, gl.DYNAMIC_DRAW);

  const pl = {
    pos: gl.getAttribLocation(pProg, "a_pos"),
    size: gl.getAttribLocation(pProg, "a_size"),
    col: gl.getAttribLocation(pProg, "a_col"),
    res: gl.getUniformLocation(pProg, "u_res"),
    off: gl.getUniformLocation(pProg, "u_off"),
  };
  const ll = {
    pos: gl.getAttribLocation(lProg, "a_pos"),
    col: gl.getAttribLocation(lProg, "a_col"),
    res: gl.getUniformLocation(lProg, "u_res"),
    off: gl.getUniformLocation(lProg, "u_off"),
  };

  gl.disable(gl.DEPTH_TEST);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE); // additief: subtiele gloed op de donkere hero
  gl.clearColor(0, 0, 0, 0);

  const draw = (s: Sim, ox: number, oy: number): void => {
    gl.viewport(0, 0, Math.round(s.w * s.dpr), Math.round(s.h * s.dpr));
    gl.clear(gl.COLOR_BUFFER_BIT);

    // --- Lijnen (onder de punten) ---
    if (s.linkCount > 0) {
      let li = 0;
      for (let k = 0; k < s.linkCount; k++) {
        const i = s.linkA[k];
        const j = s.linkB[k];
        const a = s.linkAlpha[k];
        // Lijnkleur = gemiddelde van beide eindpunten
        const r = (s.col[i * 3] + s.col[j * 3]) * 0.5;
        const g = (s.col[i * 3 + 1] + s.col[j * 3 + 1]) * 0.5;
        const b = (s.col[i * 3 + 2] + s.col[j * 3 + 2]) * 0.5;
        lData[li++] = s.pos[i * 2]; lData[li++] = s.pos[i * 2 + 1];
        lData[li++] = r; lData[li++] = g; lData[li++] = b; lData[li++] = a;
        lData[li++] = s.pos[j * 2]; lData[li++] = s.pos[j * 2 + 1];
        lData[li++] = r; lData[li++] = g; lData[li++] = b; lData[li++] = a;
      }
      gl.useProgram(lProg);
      gl.bindBuffer(gl.ARRAY_BUFFER, lBuf);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, lData.subarray(0, li));
      gl.enableVertexAttribArray(ll.pos);
      gl.vertexAttribPointer(ll.pos, 2, gl.FLOAT, false, 24, 0);
      gl.enableVertexAttribArray(ll.col);
      gl.vertexAttribPointer(ll.col, 4, gl.FLOAT, false, 24, 8);
      gl.uniform2f(ll.res, s.w, s.h);
      gl.uniform2f(ll.off, ox, oy);
      gl.drawArrays(gl.LINES, 0, s.linkCount * 2);
    }

    // --- Punten ---
    let pi = 0;
    for (let i = 0; i < s.count; i++) {
      pData[pi++] = s.pos[i * 2];
      pData[pi++] = s.pos[i * 2 + 1];
      pData[pi++] = s.size[i] * 2.4 * s.dpr; // sprite groter dan kern: zachte halo
      pData[pi++] = s.col[i * 3];
      pData[pi++] = s.col[i * 3 + 1];
      pData[pi++] = s.col[i * 3 + 2];
      pData[pi++] = s.curA[i];
    }
    gl.useProgram(pProg);
    gl.bindBuffer(gl.ARRAY_BUFFER, pBuf);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, pData.subarray(0, pi));
    gl.enableVertexAttribArray(pl.pos);
    gl.vertexAttribPointer(pl.pos, 2, gl.FLOAT, false, 28, 0);
    gl.enableVertexAttribArray(pl.size);
    gl.vertexAttribPointer(pl.size, 1, gl.FLOAT, false, 28, 8);
    gl.enableVertexAttribArray(pl.col);
    gl.vertexAttribPointer(pl.col, 4, gl.FLOAT, false, 28, 12);
    gl.uniform2f(pl.res, s.w, s.h);
    gl.uniform2f(pl.off, ox, oy);
    gl.drawArrays(gl.POINTS, 0, s.count);
  };

  const dispose = (): void => {
    gl.deleteBuffer(pBuf);
    gl.deleteBuffer(lBuf);
    gl.deleteProgram(pProg);
    gl.deleteProgram(lProg);
  };

  return { draw, dispose };
}

function rgba(r: number, g: number, b: number, a: number): string {
  return `rgba(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)},${a.toFixed(3)})`;
}

// 2D-fallback: zelfde concept, iets simpelere gloed
function create2dRenderer(ctx: CanvasRenderingContext2D): Renderer {
  const draw = (s: Sim, ox: number, oy: number): void => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.setTransform(s.dpr, 0, 0, s.dpr, ox * s.dpr, oy * s.dpr);
    ctx.globalCompositeOperation = "lighter"; // additief, net als de WebGL-versie
    ctx.lineWidth = 0.75;
    for (let k = 0; k < s.linkCount; k++) {
      const i = s.linkA[k];
      const j = s.linkB[k];
      ctx.strokeStyle = rgba(
        (s.col[i * 3] + s.col[j * 3]) * 0.5,
        (s.col[i * 3 + 1] + s.col[j * 3 + 1]) * 0.5,
        (s.col[i * 3 + 2] + s.col[j * 3 + 2]) * 0.5,
        s.linkAlpha[k]
      );
      ctx.beginPath();
      ctx.moveTo(s.pos[i * 2], s.pos[i * 2 + 1]);
      ctx.lineTo(s.pos[j * 2], s.pos[j * 2 + 1]);
      ctx.stroke();
    }
    for (let i = 0; i < s.count; i++) {
      ctx.fillStyle = rgba(s.col[i * 3], s.col[i * 3 + 1], s.col[i * 3 + 2], s.curA[i]);
      ctx.beginPath();
      ctx.arc(s.pos[i * 2], s.pos[i * 2 + 1], s.size[i] * 0.7, 0, Math.PI * 2);
      ctx.fill();
    }
  };
  return { draw, dispose: () => {} };
}

/* ---------------------------------------------------------------------------
   Component
--------------------------------------------------------------------------- */
interface HeroCanvasProps {
  className?: string;
}

export default function HeroCanvas({ className }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const sim: Sim = {
      w: 1, h: 1, dpr: 1, count: 0, linkDist: 110, t: 0,
      pos: new Float32Array(MAX_POINTS * 2),
      size: new Float32Array(MAX_POINTS),
      col: new Float32Array(MAX_POINTS * 3),
      baseA: new Float32Array(MAX_POINTS),
      curA: new Float32Array(MAX_POINTS),
      spd: new Float32Array(MAX_POINTS),
      driftX: new Float32Array(MAX_POINTS),
      driftY: new Float32Array(MAX_POINTS),
      twF: new Float32Array(MAX_POINTS),
      twP: new Float32Array(MAX_POINTS),
      inited: 0,
      linkA: new Uint16Array(MAX_LINKS),
      linkB: new Uint16Array(MAX_LINKS),
      linkAlpha: new Float32Array(MAX_LINKS),
      linkCount: 0,
    };

    // Contextkeuze: eerst WebGL, anders 2D. Let op: zodra een canvas een
    // WebGL-context heeft geeft getContext("2d") null terug — de keuze valt
    // dus definitief op dit punt.
    const glAttrs: WebGLContextAttributes = {
      alpha: true,
      antialias: true,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    };
    let gl: WebGLRenderingContext | null = null;
    try {
      gl =
        (canvas.getContext("webgl", glAttrs) as WebGLRenderingContext | null) ??
        (canvas.getContext("experimental-webgl", glAttrs) as WebGLRenderingContext | null);
    } catch {
      gl = null;
    }

    let renderer: Renderer | null = null;
    if (gl) renderer = createGlRenderer(gl);
    if (!renderer && !gl) {
      const ctx = canvas.getContext("2d");
      if (ctx) renderer = create2dRenderer(ctx);
    }
    if (!renderer) {
      // Laatste redmiddel: statische merk-gradient, geen animatie.
      canvas.style.background =
        "radial-gradient(60% 50% at 30% 30%, rgba(91,95,232,0.14), transparent 70%)," +
        "radial-gradient(50% 40% at 75% 60%, rgba(155,163,242,0.10), transparent 70%)," +
        "radial-gradient(35% 30% at 60% 15%, rgba(224,185,120,0.06), transparent 70%)";
      return;
    }

    // --- Toestand voor loop, parallax en zichtbaarheid ---
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = mq.matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    let inView = false;
    let raf = 0;
    let last = 0;
    let tX = 0, tY = 0; // parallax-doel
    let offX = 0, offY = 0; // huidige (gelerpte) parallax-offset

    const renderStatic = (): void => {
      // Eén mooi statisch frame voor prefers-reduced-motion
      updateAlphas(sim);
      computeLinks(sim);
      renderer?.draw(sim, 0, 0);
    };

    const frame = (now: number): void => {
      raf = requestAnimationFrame(frame);
      if (!renderer) { stop(); return; }
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      sim.t += dt;
      // Parallax lerpt traag naar het doel (max PARALLAX_MAX px)
      offX += (tX - offX) * Math.min(1, dt * 2.5);
      offY += (tY - offY) * Math.min(1, dt * 2.5);
      stepSim(sim, dt);
      updateAlphas(sim);
      computeLinks(sim);
      renderer.draw(sim, offX, offY);
    };

    const start = (): void => {
      if (raf === 0) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    const stop = (): void => {
      if (raf !== 0) cancelAnimationFrame(raf);
      raf = 0;
    };
    // Loop draait alleen als: in beeld, tab zichtbaar en geen reduced motion
    const updateRunning = (): void => {
      if (inView && !document.hidden && !reduced && renderer) start();
      else stop();
    };

    const resize = (w: number, h: number): void => {
      if (w < 1 || h < 1) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1); // dpr gecapt op 2
      sim.w = w;
      sim.h = h;
      sim.dpr = dpr;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      // Dichtheid schaalt met het oppervlak, binnen 120..200 deeltjes
      sim.count = Math.max(120, Math.min(MAX_POINTS, Math.round((w * h) / 6500)));
      sim.linkDist = Math.max(95, Math.min(140, Math.sqrt((w * h) / sim.count) * 1.2));
      // Alleen nieuwe indices seeden: bestaande posities blijven staan zodat
      // een resize (bijv. mobiele adresbalk) de constellatie niet laat springen
      if (sim.inited < sim.count) {
        seedParticles(sim, sim.inited, sim.count);
        sim.inited = sim.count;
      }
      if (reduced) renderStatic();
    };

    // --- Listeners & observers ---
    const onPointer = (e: PointerEvent): void => {
      if (e.pointerType === "touch") return; // geen parallax op touch
      tX = ((e.clientX / window.innerWidth) * 2 - 1) * PARALLAX_MAX;
      tY = ((e.clientY / window.innerHeight) * 2 - 1) * PARALLAX_MAX;
    };
    if (!coarse) window.addEventListener("pointermove", onPointer, { passive: true });

    const onVis = (): void => updateRunning();
    document.addEventListener("visibilitychange", onVis);

    const onMq = (): void => {
      reduced = mq.matches;
      if (reduced) {
        stop();
        renderStatic();
      } else {
        updateRunning();
      }
    };
    mq.addEventListener("change", onMq);

    const io = new IntersectionObserver((entries) => {
      inView = entries[0]?.isIntersecting ?? false;
      updateRunning();
    });
    io.observe(canvas);

    const ro = new ResizeObserver((entries) => {
      const e = entries[0];
      if (e) resize(e.contentRect.width, e.contentRect.height);
    });
    ro.observe(canvas);

    // WebGL-context kan verloren gaan (bijv. GPU-reset): netjes pauzeren en
    // na herstel alle GPU-resources opnieuw opbouwen.
    const onLost = (e: Event): void => {
      e.preventDefault();
      stop();
    };
    const onRestored = (): void => {
      if (!gl) return;
      renderer?.dispose();
      renderer = createGlRenderer(gl);
      if (reduced) renderStatic();
      else updateRunning();
    };
    if (gl) {
      canvas.addEventListener("webglcontextlost", onLost);
      canvas.addEventListener("webglcontextrestored", onRestored);
    }

    // Eerste maat + eerste frame (RO vuurt ook direct, dit voorkomt een flits)
    resize(canvas.clientWidth, canvas.clientHeight);
    if (reduced) renderStatic();
    else updateRunning();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      if (!coarse) window.removeEventListener("pointermove", onPointer);
      mq.removeEventListener("change", onMq);
      if (gl) {
        canvas.removeEventListener("webglcontextlost", onLost);
        canvas.removeEventListener("webglcontextrestored", onRestored);
      }
      renderer?.dispose();
      renderer = null;
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={["pointer-events-none absolute inset-0 h-full w-full", className]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
