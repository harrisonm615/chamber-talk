import type { FC, ReactNode } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Stack } from "./stack";
import { BAR, C, F, mix, pop, ramp } from "./tokens";
import { Callout, Headline, Pointer, Scene } from "./ui";

// 1. Hook: a pile of separate apps snaps into one place.
const APPS = [
  { t: "Calendar app", x: 1010, y: 150, r: -6 },
  { t: "Invoices", x: 1440, y: 120, r: 5 },
  { t: "Group text", x: 1240, y: 360, r: -3 },
  { t: "Spreadsheet", x: 960, y: 560, r: 4 },
  { t: "Web forms", x: 1500, y: 560, r: -5 },
  { t: "Client emails", x: 1180, y: 770, r: 3 },
  { t: "Sticky notes", x: 1560, y: 820, r: -2 },
];

export const Hook: FC = () => {
  const f = useCurrentFrame();
  const snap = BAR(1.6);
  const s = ramp(f, snap, snap + 26);
  const one = pop(f, snap + 18, 16);
  return (
    <Scene dark kicker="THE PROBLEM" l1="Too many apps." l2="One business.">
      {APPS.map((a, i) => {
        const k = pop(f, 4 + i * 6, 15);
        const drift = Math.sin((f + i * 20) / 22) * 8;
        const cx = 1360;
        const cy = 520;
        return (
          <div
            key={a.t}
            style={{
              position: "absolute",
              left: mix(a.x, cx - 130, s),
              top: mix(a.y + drift, cy - 40, s),
              width: 260,
              padding: "20px 24px",
              borderRadius: 18,
              background: C.night2,
              border: "2px solid #2e3036",
              color: C.white,
              fontFamily: F.ui,
              fontWeight: 700,
              fontSize: 28,
              transform: `rotate(${a.r * (1 - s)}deg) scale(${mix(0.7, 1, k) * mix(1, 0.6, s)})`,
              opacity: Math.min(1, k * 1.6) * (1 - s),
              boxShadow: "0 20px 40px rgba(0,0,0,.4)",
            }}
          >
            {a.t}
            <div style={{ marginTop: 10, display: "inline-block", fontSize: 17, fontWeight: 700, color: C.coral, letterSpacing: ".04em" }}>
              Separate login
            </div>
          </div>
        );
      })}
      {f >= snap + 18 && (
        <div
          style={{
            position: "absolute",
            left: 1360 - 260,
            top: 520 - 110,
            width: 520,
            padding: "34px 40px",
            borderRadius: 28,
            background: C.lime,
            color: C.ink,
            fontFamily: F.ui,
            transform: `scale(${mix(0.6, 1, one)})`,
            opacity: Math.min(1, one * 1.6),
            boxShadow: "0 40px 90px rgba(198,240,74,.25)",
          }}
        >
          <div style={{ fontWeight: 800, fontSize: 20, letterSpacing: ".16em" }}>ONE PLACE</div>
          <div style={{ fontFamily: F.display, fontWeight: 800, fontSize: 92, lineHeight: "88px", textTransform: "uppercase", marginTop: 6 }}>Your portal</div>
          <div style={{ fontWeight: 600, fontSize: 26, marginTop: 6 }}>One sign-in for you, your team and your clients.</div>
        </div>
      )}
    </Scene>
  );
};

// 2. The core: nine pieces every business needs.
export const Core: FC = () => {
  const f = useCurrentFrame();
  return (
    <Scene kicker="THE FRAMEWORK" l1="Start with" l2="the core.">
      <Stack f={f} core={6} coreStagger={14} />
      <SubLine f={f} at={150} text="Nine pieces every business runs on." />
    </Scene>
  );
};

// 3. The industry layer: swaps on top of the same core.
export const Industry: FC = () => {
  const f = useCurrentFrame();
  return (
    <Scene dark kicker="LAYER TWO" l1="Add your" l2="industry.">
      <Stack f={f} core={-99} industry={10} industryEvery={58} />
      <SubLine f={f} at={60} dark text="Same core. The pieces your trade needs on top." />
    </Scene>
  );
};

// 4. Four doors into the same system.
export const Doors: FC = () => {
  const f = useCurrentFrame();
  return (
    <Scene kicker="WHO SEES WHAT" l1="Four doors." l2="One system.">
      <Stack f={f} core={-99} industry={-99} industryIdx={0} doors={20} doorsStagger={22} />
      <SubLine f={f} at={120} text="Website, client, team and owner views. Each sees only their part." />
    </Scene>
  );
};

// 5. Custom add-ons: the slot that's only yours.
export const Custom: FC = () => {
  const f = useCurrentFrame();
  return (
    <Scene dark kicker="LAYER THREE" l1="Then add" l2="what's yours.">
      <Stack f={f} core={-99} industry={-99} industryIdx={0} doors={-99} addons={8} addonChip={54} />
    </Scene>
  );
};

const SubLine: FC<{ f: number; at: number; text: string; dark?: boolean }> = ({ f, at, text, dark }) => {
  const k = ramp(f, at, at + 24);
  return (
    <div
      style={{
        position: "absolute",
        left: 96,
        top: 650,
        width: 740,
        fontFamily: F.ui,
        fontWeight: 600,
        fontSize: 34,
        lineHeight: 1.3,
        color: dark ? "#b9bac0" : C.muted,
        opacity: k,
        transform: `translateY(${(1 - k) * 16}px)`,
      }}
    >
      {text}
    </div>
  );
};

// 6. Example add-on: Michael's networking calendar, one click to sign up and land it on the calendar.
const WX = 96;
const WY = 330;
const WW = 1728;
const WH = 700;
const SIDE = 220;
const PANEL = 450;
const GRID_W = WW - SIDE - PANEL;
const COL = GRID_W / 5;
const TOP = 50 + 46; // title bar + day header
const H0 = 7;
const PXH = (WH - TOP - 10) / 12;
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const BUSY = [
  { d: 0, s: 10, e: 12, t: "Shoot · client" },
  { d: 1, s: 13, e: 14, t: "Edit review" },
  { d: 2, s: 9, e: 10.5, t: "Team call" },
  { d: 3, s: 13, e: 15.5, t: "Shoot · client" },
  { d: 4, s: 11, e: 12, t: "Client call" },
];

const EVENTS = [
  { d: 1, s: 8, e: 10, t: "Business Connections", where: "Morris County Chamber", when: "Tue 8:00 AM", fit: "Great fit", click: 96 },
  { d: 2, s: 17, e: 18.75, t: "After Hours Mixer", where: "Chamber · Morristown", when: "Wed 5:30 PM", fit: "Good fit", click: 196 },
  { d: 3, s: 8.5, e: 10, t: "Coffee & Connections", where: "Networking group", when: "Thu 8:30 AM", fit: "Good fit", click: 290 },
];

const ROW_TOP = 50 + 74;
const ROW_H = 166;
const btn = (i: number) => ({ x: WX + WW - PANEL + 24 + 92, y: WY + ROW_TOP + i * ROW_H + 102 + 24 });

export const Networking: FC = () => {
  const f = useCurrentFrame();
  const win = pop(f, 4, 18);
  return (
    <Scene kicker="CUSTOM ADD-ON · EXAMPLE" l1="My networking" l2="calendar." size={100} top={60}>
      <div
        style={{
          position: "absolute",
          left: WX,
          top: WY,
          width: WW,
          height: WH,
          borderRadius: 22,
          background: C.card,
          border: `2px solid ${C.line}`,
          boxShadow: "0 40px 90px rgba(0,0,0,.18)",
          overflow: "hidden",
          fontFamily: F.ui,
          transform: `translateY(${(1 - win) * 80}px)`,
          opacity: Math.min(1, win * 1.6),
        }}
      >
        {/* title bar */}
        <div style={{ height: 50, background: "#f4f3ef", borderBottom: `1px solid ${C.line}`, display: "flex", alignItems: "center", padding: "0 20px", gap: 9 }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <div key={c} style={{ width: 14, height: 14, borderRadius: 7, background: c }} />
          ))}
          <div style={{ marginLeft: 20, fontSize: 19, fontWeight: 600, color: C.muted }}>My portal · Calendar</div>
        </div>
        {/* sidebar */}
        <div style={{ position: "absolute", left: 0, top: 50, bottom: 0, width: SIDE, background: "#fafaf7", borderRight: `1px solid ${C.line}`, padding: "22px 16px", boxSizing: "border-box" }}>
          {["Today", "Calendar", "Networking", "Clients", "Jobs", "Messages"].map((t) => (
            <div
              key={t}
              style={{
                padding: "12px 14px",
                borderRadius: 10,
                fontSize: 21,
                fontWeight: t === "Calendar" ? 800 : 600,
                color: t === "Calendar" ? C.ink : C.muted,
                background: t === "Calendar" ? "#ecebe5" : "transparent",
                marginBottom: 4,
              }}
            >
              {t}
            </div>
          ))}
        </div>
        {/* week grid */}
        <div style={{ position: "absolute", left: SIDE, top: 50, width: GRID_W, bottom: 0 }}>
          {DAYS.map((d, i) => (
            <div key={d} style={{ position: "absolute", left: i * COL, top: 0, width: COL, height: 46, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, fontWeight: 700, color: C.muted, borderLeft: i ? `1px solid ${C.line}` : "none" }}>
              {d}
            </div>
          ))}
          {DAYS.map((d, i) => (
            <div key={d + "c"} style={{ position: "absolute", left: i * COL, top: 46, width: COL, bottom: 0, borderLeft: i ? `1px solid ${C.line}` : "none", borderTop: `1px solid ${C.line}` }} />
          ))}
          {BUSY.map((b, i) => (
            <Block key={i} d={b.d} s={b.s} e={b.e} bg="#e9eefc" ink="#2a4fbf" border="#cfdaf8">
              {b.t}
            </Block>
          ))}
          {EVENTS.map((ev, i) => {
            const done = f >= ev.click + 34;
            const k = pop(f, ev.click + 34, 14);
            return (
              <Block
                key={i}
                d={ev.d}
                s={ev.s}
                e={ev.e}
                bg={done ? C.lime : "rgba(198,240,74,.10)"}
                ink={done ? C.ink : "#7a9a20"}
                border={done ? C.lime : "#a9cf3a"}
                dashed={!done}
                scale={done ? mix(1.12, 1, k) : 1}
              >
                {done ? "✓ " : ""}
                {ev.t}
              </Block>
            );
          })}
        </div>
        {/* networking panel */}
        <div style={{ position: "absolute", right: 0, top: 50, bottom: 0, width: PANEL, background: "#fbfbf8", borderLeft: `1px solid ${C.line}`, boxSizing: "border-box", padding: "20px 24px" }}>
          <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: ".14em", color: C.muted }}>NETWORKING THIS WEEK</div>
          {EVENTS.map((ev, i) => {
            const state = f < ev.click ? 0 : f < ev.click + 34 ? 1 : 2;
            const k = pop(f, ev.click + 34, 14);
            return (
              <div key={i} style={{ position: "absolute", left: 24, right: 24, top: ROW_TOP - 50 + i * ROW_H, height: ROW_H - 14, borderBottom: i < 2 ? `1px solid ${C.line}` : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: C.ink }}>{ev.t}</div>
                </div>
                <div style={{ fontSize: 19, color: C.muted, marginTop: 6 }}>
                  {ev.when} · {ev.where}
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#5f8a00", marginTop: 6 }}>{ev.fit}</div>
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 102,
                    width: 184,
                    height: 48,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    fontWeight: 800,
                    background: state === 2 ? "#e6f7c8" : state === 1 ? "#2a2c33" : C.ink,
                    color: state === 2 ? "#3c6400" : C.white,
                    transform: `scale(${state === 2 ? mix(1.1, 1, k) : 1})`,
                  }}
                >
                  {state === 0 ? "Register me" : state === 1 ? <Dots f={f - ev.click} /> : "✓ Registered"}
                </div>
                {state === 2 && (
                  <div style={{ position: "absolute", left: 200, top: 114, fontSize: 17, fontWeight: 600, color: C.muted, opacity: ramp(f, ev.click + 40, ev.click + 60) }}>
                    On your calendar
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <Pointer
        f={f}
        path={[
          { at: 60, x: 1100, y: 980 },
          ...EVENTS.map((ev, i) => ({ at: ev.click, ...btn(i), click: true })),
          { at: 360, x: btn(2).x + 140, y: btn(2).y + 60 },
        ]}
      />
      <Callout f={f} at={330} x={1150} y={78} w={620} rot={-2}>
        <div style={{ fontFamily: F.display, fontWeight: 800, fontSize: 64, lineHeight: "60px", textTransform: "uppercase" }}>One click each.</div>
        <div style={{ fontSize: 26, fontWeight: 600, marginTop: 10 }}>Signed up, and it's on my calendar. Nothing else to press.</div>
      </Callout>
    </Scene>
  );
};

const Block: FC<{ d: number; s: number; e: number; bg: string; ink: string; border: string; dashed?: boolean; scale?: number; children: ReactNode }> = ({
  d,
  s,
  e,
  bg,
  ink,
  border,
  dashed,
  scale = 1,
  children,
}) => (
  <div
    style={{
      position: "absolute",
      left: d * COL + 8,
      top: TOP - 50 + (s - H0) * PXH + 2,
      width: COL - 16,
      height: (e - s) * PXH - 4,
      boxSizing: "border-box",
      borderRadius: 10,
      background: bg,
      border: `2px ${dashed ? "dashed" : "solid"} ${border}`,
      color: ink,
      fontSize: 18,
      fontWeight: 700,
      padding: "8px 10px",
      overflow: "hidden",
      lineHeight: 1.2,
      transform: `scale(${scale})`,
    }}
  >
    {children}
  </div>
);

const Dots: FC<{ f: number }> = ({ f }) => (
  <div style={{ display: "flex", gap: 7 }}>
    {[0, 1, 2].map((i) => (
      <div key={i} style={{ width: 10, height: 10, borderRadius: 5, background: C.lime, opacity: 0.35 + 0.65 * Math.abs(Math.sin((f - i * 5) / 7)) }} />
    ))}
  </div>
);

// 7. Close: the whole stack lit, names under the title.
export const Close: FC = () => {
  const f = useCurrentFrame();
  const hit = BAR(2);
  const names = ramp(f, hit - 6, hit + 24);
  return (
    <AbsoluteFill style={{ background: C.night }}>
      <AbsoluteFill style={{ background: "radial-gradient(55% 60% at 72% 55%, rgba(198,240,74,.10), transparent 70%)" }} />
      <Stack f={f} core={-99} industry={-99} industryIdx={0} doors={-99} addons={-99} addonChip={-99} glow={hit - 10} />
      {<Headline f={f} dark l1="Your business." l2="One framework." top={300} />}
      <div style={{ position: "absolute", left: 96, top: 650, fontFamily: F.ui, color: C.white, opacity: names, transform: `translateY(${(1 - names) * 14}px)` }}>
        <div style={{ fontSize: 36, fontWeight: 700 }}>Michael Harrison · Chris Carpio</div>
        <div style={{ fontSize: 26, fontWeight: 500, color: "#a6a7ad", marginTop: 10 }}>Custom software for the businesses in this room.</div>
      </div>
    </AbsoluteFill>
  );
};

// [start bar, length in bars, scene]
export const SCENES: [number, number, FC][] = [
  [0, 3, Hook],
  [3, 4, Core],
  [7, 5, Industry],
  [12, 5, Doors],
  [17, 2, Custom],
  [19, 7, Networking],
];
export const CLOSE_AT = BAR(26);
