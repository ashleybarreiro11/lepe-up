import React from 'react';
import { Pressable, View } from 'react-native';
import { colors } from '../theme/theme';

export function Toggle({ value, onToggle }: { value: boolean; onToggle: () => void }) {
  return (
    <Pressable
      onPress={onToggle}
      style={{
        width: 52,
        height: 31,
        borderRadius: 999,
        padding: 3,
        backgroundColor: value ? colors.red : colors.onDark.text10,
        borderWidth: 1,
        borderColor: value ? colors.red : colors.onDark.text12,
      }}
    >
      <View
        style={{
          width: 23,
          height: 23,
          borderRadius: 11.5,
          backgroundColor: '#fff',
          transform: [{ translateX: value ? 21 : 0 }],
        }}
      />
    </Pressable>
  );
}
