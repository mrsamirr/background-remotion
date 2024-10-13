import { AbsoluteFill } from "remotion";
import { BackgroundAnimation } from "./BackgroundAnimation";

export const MyComposition = () => {
  return <AbsoluteFill>
    <BackgroundAnimation baseColor="blue" />
  </AbsoluteFill>
};
