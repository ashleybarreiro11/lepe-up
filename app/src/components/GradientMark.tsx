import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients } from '../theme/theme';

export function GradientMark({ size = 34, dotSize }: { size?: number; dotSize?: number }) {
  const dot = dotSize ?? size * 0.32;
  return (
    <LinearGradient
      colors={gradients.mark}
      locations={gradients.markLocations}
      start={{ x: 0.15, y: 0 }}
      end={{ x: 0.85, y: 1 }}
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.32,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {dot > 0 && (
        <View
          style={{
            width: dot,
            height: dot,
            borderRadius: dot / 2,
            backgroundColor: colors.screenBg,
          }}
        />
      )}
    </LinearGradient>
  );
}
