import type { FC, ReactNode } from "react";
import { C, F, mix, pop, ramp } from "./tokens";

// The framework as one picture, built up across scenes 2-5:
//   four doors (website, client, team, owner)
//   custom add-ons
//   industry layer
//   core
export const CORE = ["Logins & roles", "People", "Messages", "Alerts", "Files & photos", "Needs you", "Calendar", "Website & forms", "AI helper"];

export const INDUSTRIES: { name: string; color: string; chips: string[] }[] = [
  { name: "Cleaning", color: C.teal, chips: ["Recurring visits", "Routes", "Checklists"] },
  { name: "Coffee shop", color: C.coral, chips: ["Order ahead", "Rewards", "Wholesale"] },
  { name: "Construction", color: "#f5a524", chips: ["Time clock", "Daily log", "Job costs"] },
  { name: "Tattoo studio", color: C.violet, chips: ["Deposits", "Design approval", "Waivers"] },
  { name: "Video production", color: C.blue, chips: ["Shoot days", "Review & approve", "Delivery"] },
];

export const DOORS: { name: string; who: string; color: string }[] = [
  { name: "Website", who: "Anyone", color: C.blue },
  { name: "Client", who: "Your customers", color: C.teal },
  { name: "Team", who: "Your staff", color: C.coral },
  { name: "Owner", who: "You", color: C.violet },
];

const X = 960;
const WIDTH = 860;

type Props = {
  f: number;
  core?: number; // frame the core lands (negative = already there)
  coreStagger?: number;
  industry?: number;
  industryEvery?: number; // cycle industries every N frames from `industry`; else show `industryIdx`
  industryIdx?: number;
  addons?: number;
  addonChip?: number;
  doors?: number;
  doorsStagger?: number;
  glow?: number; // frame the whole stack lights up (close)
  scale?: number;
  x?: number;
  y?: number;
};

const Slab: FC<{ f: number; at: number; top: number; h: number; bg: string; border: string; children: ReactNode; from?: number }> = ({
  f,
  at,
  top,
  h,
  bg,
  border,
  children,
  from = 60,
}) => {
  const k = pop(f, at, 18);
  if (f < at) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: X,
        top,
        width: WIDTH,
        height: h,
        borderRadius: 26,
        background: bg,
        border: `2px solid ${border}`,
        boxShadow: "0 24px 50px rgba(0,0,0,.18)",
        transform: `translateY(${(1 - k) * -from}px) scale(${mix(0.96, 1, k)})`,
        opacity: Math.min(1, k * 1.5),
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
};

const Label: FC<{ text: string; color: string }> = ({ text, color }) => (
  <div style={{ fontFamily: F.ui, fontWeight: 800, fontSize: 20, letterSpacing: ".16em", color, textTransform: "uppercase" }}>{text}</div>
);

const Chip: FC<{ text: string; bg: string; ink: string; f: number; at: number; w?: number | string; size?: number }> = ({ text, bg, ink, f, at, w, size = 25 }) => {
  const k = pop(f, at, 15);
  if (f < at) return <div style={{ width: w, height: 1 }} />;
  return (
    <div
      style={{
        width: w,
        boxSizing: "border-box",
        background: bg,
        color: ink,
        fontFamily: F.ui,
        fontWeight: 700,
        fontSize: size,
        padding: "16px 18px",
        borderRadius: 14,
        whiteSpace: "nowrap",
        transform: `translateY(${(1 - k) * -26}px) scale(${mix(0.8, 1, k)})`,
        opacity: Math.min(1, k * 1.8),
      }}
    >
      {text}
    </div>
  );
};

export const Stack: FC<Props> = ({ f, core, coreStagger = 0, industry, industryEvery, industryIdx = 0, addons, addonChip, doors, doorsStagger = 0, glow, scale = 1, x = 0, y = 0 }) => {
  const g = glow === undefined ? 0 : ramp(f, glow, glow + 30);
  let ind = industryIdx;
  let swapAt = industry ?? 0;
  if (industry !== undefined && industryEvery) {
    ind = Math.max(0, Math.min(INDUSTRIES.length - 1, Math.floor((f - industry) / industryEvery)));
    swapAt = industry + ind * industryEvery;
  }
  const I = INDUSTRIES[ind];
  return (
    <div style={{ position: "absolute", inset: 0, transform: `translate(${x}px, ${y}px) scale(${scale})`, transformOrigin: `${X + WIDTH / 2}px 540px` }}>
      {/* Core */}
      {core !== undefined && (
        <Slab f={f} at={core} top={700} h={300} bg="#1b1c21" border={g > 0 ? `rgba(198,240,74,${0.25 + g * 0.6})` : "#33353c"} from={0}>
          <div style={{ padding: "22px 26px" }}>
            <Label text="Core · every business" color={C.lime} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 16 }}>
              {CORE.map((c, i) => (
                <Chip key={c} text={c} bg="#2a2c33" ink={C.white} f={f} at={core + 8 + i * coreStagger} size={24} />
              ))}
            </div>
          </div>
        </Slab>
      )}
      {/* Industry */}
      {industry !== undefined && (
        <Slab f={f} at={industry} top={520} h={160} bg={I.color} border="rgba(0,0,0,.08)">
          <div key={ind} style={{ padding: "22px 26px", transform: `translateX(${(1 - pop(f, swapAt, 18)) * 50}px)`, opacity: Math.min(1, pop(f, swapAt, 18) * 1.6) }}>
            <Label text={`Industry · ${I.name}`} color="rgba(255,255,255,.92)" />
            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
              {I.chips.map((c, i) => (
                <Chip key={c} text={c} bg="rgba(255,255,255,.94)" ink={C.ink} f={f} at={swapAt + 6 + i * 5} w="33%" />
              ))}
            </div>
          </div>
        </Slab>
      )}
      {/* Custom add-ons */}
      {addons !== undefined && (
        <Slab f={f} at={addons} top={378} h={122} bg="transparent" border={C.lime}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(198,240,74,.13)" }} />
          <div style={{ position: "relative", padding: "20px 26px", display: "flex", alignItems: "center", gap: 18, height: "100%", boxSizing: "border-box" }}>
            <div style={{ width: 250 }}>
              <Label text="Custom add-ons" color={glow !== undefined || addonChip !== undefined ? "#8fbf1a" : "#8fbf1a"} />
            </div>
            {addonChip !== undefined ? (
              <Chip text="📅  Networking calendar" bg={C.lime} ink={C.ink} f={f} at={addonChip} size={27} />
            ) : null}
            <div
              style={{
                border: "3px dashed rgba(143,191,26,.8)",
                borderRadius: 14,
                padding: "13px 22px",
                fontFamily: F.ui,
                fontWeight: 700,
                fontSize: 25,
                color: "#8fbf1a",
                opacity: ramp(f, addons + 10, addons + 30),
              }}
            >
              + Yours
            </div>
          </div>
        </Slab>
      )}
      {/* Four doors */}
      {doors !== undefined &&
        DOORS.map((d, i) => {
          const at = doors + i * doorsStagger;
          const k = pop(f, at, 15);
          if (f < at) return null;
          const w = (WIDTH - 3 * 20) / 4;
          return (
            <div
              key={d.name}
              style={{
                position: "absolute",
                left: X + i * (w + 20),
                top: 120,
                width: w,
                height: 236,
                borderRadius: 22,
                background: C.card,
                border: `2px solid ${C.line}`,
                boxShadow: "0 24px 50px rgba(0,0,0,.18)",
                transform: `translateY(${(1 - k) * 70}px) scale(${mix(0.85, 1, k)})`,
                opacity: Math.min(1, k * 1.6),
                overflow: "hidden",
              }}
            >
              <div style={{ height: 14, background: d.color }} />
              <MiniScreen kind={i} color={d.color} />
              <div style={{ position: "absolute", left: 20, bottom: 18 }}>
                <div style={{ fontFamily: F.display, fontWeight: 800, fontSize: 46, lineHeight: "44px", color: C.ink, textTransform: "uppercase" }}>{d.name}</div>
                <div style={{ fontFamily: F.ui, fontWeight: 600, fontSize: 20, color: C.muted, marginTop: 4 }}>{d.who}</div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

// Tiny wireframes so each door reads as its own screen.
const MiniScreen: FC<{ kind: number; color: string }> = ({ kind, color }) => {
  const bar = (w: number | string, h = 9, c = "#e7e6e1") => <div style={{ width: w, height: h, borderRadius: 5, background: c }} />;
  const pad = { padding: "14px 20px", display: "flex", flexDirection: "column" as const, gap: 8 };
  if (kind === 0)
    return (
      <div style={pad}>
        <div style={{ height: 46, borderRadius: 8, background: `${color}22` }} />
        {bar("80%")}
        <div style={{ width: 80, height: 18, borderRadius: 9, background: color }} />
      </div>
    );
  if (kind === 1)
    return (
      <div style={pad}>
        {[0, 1, 2].map((r) => (
          <div key={r} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ width: 18, height: 18, borderRadius: 9, background: r === 0 ? color : "#e7e6e1" }} />
            {bar(r === 0 ? "70%" : "55%")}
          </div>
        ))}
      </div>
    );
  if (kind === 2)
    return (
      <div style={{ ...pad, flexDirection: "row", gap: 6 }}>
        {[0, 1, 2].map((c) => (
          <div key={c} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ height: 26, borderRadius: 6, background: c === 1 ? `${color}55` : "#e7e6e1" }} />
            <div style={{ height: 26, borderRadius: 6, background: "#e7e6e1" }} />
          </div>
        ))}
      </div>
    );
  return (
    <div style={{ ...pad, flexDirection: "row", alignItems: "flex-end", gap: 8, height: 82, boxSizing: "border-box" }}>
      {[30, 46, 38, 60, 52].map((h, i) => (
        <div key={i} style={{ flex: 1, height: h, borderRadius: 5, background: i === 3 ? color : "#e7e6e1" }} />
      ))}
    </div>
  );
};
