import React from 'react';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';

type GlowStop = { offset: string; color: string; opacity: number };

export function RadialGlow({
  size,
  stops,
  style,
}: {
  size: number;
  stops: GlowStop[];
  style?: any;
}) {
  const id = 'glow';
  return (
    <Svg width={size} height={size} style={style} pointerEvents="none">
      <Defs>
        <RadialGradient id={id} cx="50%" cy="50%" r="50%">
          {stops.map((s, i) => (
            <Stop key={i} offset={s.offset} stopColor={s.color} stopOpacity={s.opacity} />
          ))}
        </RadialGradient>
      </Defs>
      <Circle cx={size / 2} cy={size / 2} r={size / 2} fill={`url(#${id})`} />
    </Svg>
  );
}
