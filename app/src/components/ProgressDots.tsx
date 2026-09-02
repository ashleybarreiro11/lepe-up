import React from 'react';
import { View } from 'react-native';
import { colors } from '../theme/theme';

export function ProgressDots({ count, active }: { count: number; active: number }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
      {Array.from({ length: count }).map((_, i) => (
        <View
          key={i}
          style={{
            width: i === active ? 22 : 4,
            height: 4,
            borderRadius: 99,
            backgroundColor: i === active ? colors.red : colors.onDark.text18,
          }}
        />
      ))}
    </View>
  );
}
