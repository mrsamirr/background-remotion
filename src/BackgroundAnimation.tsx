import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import chroma from 'chroma-js';

// Function to generate shades of the input color
const generateShades = (color: string, numberOfShades: number) => {
  return chroma.scale([chroma(color).darken(2), chroma(color).brighten(2)]).colors(numberOfShades);
};

export const BackgroundAnimation: React.FC<{ baseColor: string }> = ({ baseColor }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Generate 5 shades of the input color (e.g., Pink)
  const shades = generateShades(baseColor, 5);

  // Transition interval between shades
  const transitionDuration = Math.floor(durationInFrames / shades.length);

  // Current shade index based on the frame
  const currentIndex = Math.floor(frame / transitionDuration) % shades.length;
  const nextIndex = (currentIndex + 1) % shades.length;

  // Interpolating between two shades of the same color
  const currentShade = shades[currentIndex];
  const nextShade = shades[nextIndex];

  const backgroundColor = chroma.mix(currentShade, nextShade, interpolate(
    frame % transitionDuration,
    [0, transitionDuration],
    [0, 1]
  )).hex();

  // Smooth transition
  const opacity = spring({
    frame: frame % transitionDuration,
    fps,
    config: {
      damping: 20,
    },
  });

  return (
    <div
      style={{
        flex: 1,
        background: backgroundColor,
        opacity: 0.9 + opacity * 0.1, // Smooth opacity change
        transition: 'background 2s ease-in-out',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 80,
        color: 'white',
        height: '100vh',
      }}
    >
      Gradient Shades of {baseColor}
    </div>
  );
};

