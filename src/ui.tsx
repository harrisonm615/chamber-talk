import type { CSSProperties, FC, ReactNode } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, F, mix, pop, ramp } from "./tokens";

// Scene shell: flat background, kicker + two-line headline, the stage behind it.
export const Scene: FC<{ dark?: boolean; kicker?: string; l1: string; l2: string; size?: number; top?: number; children?: ReactNode }> = ({
  dark,
  kicker,
  l1,
  l2,
  size,
  top,
  children,
}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: dark ? C.night : C.paper, overflow: "hidden" }}>
      {dark && <AbsoluteFill style={{ background: "radial-gradient(60% 60% at 70% 60%, rgba(198,240,74,.07), transparent 70%)" }} />}
      <AbsoluteFill>{children}</AbsoluteFill>
      <Headline f={f} dark={dark} kicker={kicker} l1={l1} l2={l2} size={size} top={top} />
    </AbsoluteFill>
  );
};

export const Headline: FC<{ f: number; dark?: boolean; kicker?: string; l1: string; l2: string; size?: number; top?: number; left?: number }> = ({
  f,
  dark,
  kicker,
  l1,
  l2,
  size = 112,
  top = 300,
  left = 96,
}) => {
  const line = Math.round(size * 0.92);
  const k = pop(f, 0, 18);
  const a = ramp(f, 3, 30);
  const box = ramp(f, 12, 36);
  const b = ramp(f, 18, 45);
  const base: CSSProperties = {
    fontFamily: F.display,
    fontWeight: 800,
    fontSize: size,
    lineHeight: `${line}px`,
    textTransform: "uppercase",
    letterSpacing: "-.005em",
    whiteSpace: "nowrap",
  };
  return (
    <div style={{ position: "absolute", left, top, zIndex: 50 }}>
      {kicker && (
        <div
          style={{
            display: "inline-block",
            background: dark ? C.lime : C.ink,
            color: dark ? C.ink : C.lime,
            fontFamily: F.ui,
            fontWeight: 800,
            fontSize: 24,
            letterSpacing: ".14em",
            padding: "6px 13px 5px",
            marginBottom: 22,
            transform: `scale(${mix(0.6, 1, k)})`,
            transformOrigin: "0 50%",
            opacity: Math.min(1, k * 2),
          }}
        >
          {kicker}
        </div>
      )}
      <div style={{ overflow: "hidden", height: line + 8 }}>
        <div style={{ ...base, color: dark ? C.white : C.ink, transform: `translateY(${(1 - a) * 105}%)` }}>{l1}</div>
      </div>
      <div style={{ position: "relative", display: "inline-block", height: line + 6, marginTop: 6, marginLeft: -14 }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${box * 100}%`, background: C.lime }} />
        <div style={{ overflow: "hidden", position: "relative", padding: "0 14px", height: line + 6 }}>
          <div style={{ ...base, color: C.ink, transform: `translateY(${(1 - b) * 105}%)`, paddingTop: 6 }}>{l2}</div>
        </div>
      </div>
    </div>
  );
};

// A mouse pointer that glides to a spot and clicks there.
export const Pointer: FC<{ f: number; path: { at: number; x: number; y: number; click?: boolean }[] }> = ({ f, path }) => {
  if (f < path[0].at - 10) return null;
  let x = path[0].x;
  let y = path[0].y;
  for (let i = 1; i < path.length; i++) {
    const p = path[i - 1];
    const q = path[i];
    const t = ramp(f, q.at - 22, q.at);
    if (f >= q.at - 22) {
      x = mix(p.x, q.x, t);
      y = mix(p.y, q.y, t);
    }
  }
  const clicks = path.filter((p) => p.click);
  const pressed = clicks.some((c) => f >= c.at && f < c.at + 6);
  const appear = ramp(f, path[0].at - 10, path[0].at);
  return (
    <>
      {clicks.map((c, i) => {
        const r = ramp(f, c.at, c.at + 22);
        if (f < c.at || f > c.at + 24) return null;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: c.x - 30,
              top: c.y - 30,
              width: 60,
              height: 60,
              borderRadius: "50%",
              border: `4px solid ${C.lime}`,
              transform: `scale(${mix(0.4, 1.8, r)})`,
              opacity: 1 - r,
              zIndex: 80,
            }}
          />
        );
      })}
      <svg
        width={44}
        height={44}
        viewBox="0 0 24 24"
        style={{ position: "absolute", left: x - 6, top: y - 3, zIndex: 81, opacity: appear, transform: `scale(${pressed ? 0.88 : 1})`, filter: "drop-shadow(0 4px 8px rgba(0,0,0,.35))" }}
      >
        <path d="M4 2 L4 19 L8.5 15 L11.5 22 L14.5 20.7 L11.6 14 L18 14 Z" fill="#fff" stroke="#111" strokeWidth={1.4} strokeLinejoin="round" />
      </svg>
    </>
  );
};

// A card that pops out like a sticker.
export const Callout: FC<{ f: number; at: number; x: number; y: number; w?: number; rot?: number; children: ReactNode }> = ({ f, at, x, y, w, rot = -3, children }) => {
  const k = pop(f, at, 14);
  if (f < at) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        background: C.lime,
        color: C.ink,
        borderRadius: 24,
        padding: "22px 28px",
        fontFamily: F.ui,
        boxShadow: "0 30px 70px rgba(0,0,0,.35), 0 8px 18px rgba(0,0,0,.18)",
        transform: `scale(${mix(0.5, 1, k)}) rotate(${rot * k}deg)`,
        transformOrigin: "50% 100%",
        opacity: Math.min(1, k * 1.6),
        zIndex: 70,
      }}
    >
      {children}
    </div>
  );
};
