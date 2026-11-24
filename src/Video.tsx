import type { FC } from "react";
import { AbsoluteFill, Audio, Composition, interpolate, Sequence, staticFile } from "remotion";
import { CLOSE_AT, Close, SCENES } from "./scenes";
import { BAR, C, FPS, H, MUSIC, TOTAL_FRAMES, W } from "./tokens";

// Framework explainer for the Morris County Chamber talk: 16:9, ~60 s, cuts on the bar.
export const Framework: FC = () => (
  <AbsoluteFill style={{ background: C.night }}>
    <Audio
      src={staticFile(MUSIC.src)}
      trimBefore={Math.round(MUSIC.startSec * FPS)}
      volume={(f) => interpolate(f, [0, 4, TOTAL_FRAMES - 40, TOTAL_FRAMES], [0, 0.9, 0.9, 0], { extrapolateRight: "clamp" })}
    />
    {SCENES.map(([start, len, Scene], i) => (
      <Sequence key={i} from={BAR(start)} durationInFrames={BAR(start + len) - BAR(start)} name={Scene.name}>
        <Scene />
      </Sequence>
    ))}
    <Sequence from={CLOSE_AT} durationInFrames={TOTAL_FRAMES - CLOSE_AT} name="Close">
      <Close />
    </Sequence>
  </AbsoluteFill>
);

export const Root: FC = () => (
  <Composition id="Framework" component={Framework} durationInFrames={TOTAL_FRAMES} fps={FPS} width={W} height={H} />
);
