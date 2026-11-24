import { Easing, interpolate, spring } from "remotion";
import { loadFont as loadBarlow } from "@remotion/google-fonts/BarlowCondensed";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const { fontFamily: display } = loadBarlow("normal", { weights: ["800"], subsets: ["latin"] });
const { fontFamily: ui } = loadInter("normal", { weights: ["400", "500", "600", "700", "800"], subsets: ["latin"] });
export const F = { display, ui };

// Music: "Motivating Mornings" by Ahjay Stelino, Mixkit Stock Music Free License (public/music/LICENSE.md).
// 120.55 BPM, bars start at 1.679 s, the song's final hit is bar 45 (91.24 s).
// The video starts on song bar 17, so its bar 28 lands on that final hit (the close's title).
export const W = 1920;
export const H = 1080;
export const FPS = 30;
export const BPM = 120.55;
export const FPB = (60 / BPM) * FPS;
export const B = (beats: number) => Math.round(beats * FPB);
export const BAR = (bars: number) => B(bars * 4);
export const MUSIC = { src: "music/mixkit-33.mp3", startSec: 1.679 + (17 * 4 * 60) / BPM };
export const TOTAL_FRAMES = BAR(28) + 150;

export const C = {
  night: "#0d0e10",
  night2: "#17181c",
  paper: "#efeee9",
  card: "#ffffff",
  ink: "#141518",
  muted: "#6b6c73",
  line: "#dedcd5",
  lime: "#c6f04a",
  limeInk: "#203000",
  blue: "#3b6cf6",
  coral: "#ff7a59",
  violet: "#8b6cf6",
  teal: "#19b3a6",
  white: "#f6f5f1",
};

const OUT = Easing.bezier(0.2, 0.8, 0.2, 1);

export const ramp = (f: number, a: number, b: number, easing = OUT) =>
  interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing });

// Soft springs (about two-thirds of a second to settle), so nothing feels sped up.
export const pop = (f: number, at: number, damping = 16) =>
  spring({ frame: f - at, fps: FPS, config: { damping, stiffness: 95, mass: 1 } });

export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
