import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { fonts, gradients } from '../theme/theme';

export function PrimaryButton({
  label,
  onPress,
  icon,
}: {
  label: string;
  onPress?: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <LinearGradient
          colors={gradients.button}
          start={{ x: 0.15, y: 0 }}
          end={{ x: 0.85, y: 1 }}
          style={{
            borderRadius: 17,
            paddingVertical: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            opacity: pressed ? 0.85 : 1,
          }}
        >
          {icon}
          <Text style={{ fontFamily: fonts.plexMedium, fontSize: 15.5, color: '#fff' }}>{label}</Text>
        </LinearGradient>
      )}
    </Pressable>
  );
}

export function GhostButton({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={{ paddingVertical: 4, alignItems: 'center' }}>
      {({ pressed }) => (
        <Text
          style={{
            fontFamily: fonts.plexRegular,
            fontSize: 14,
            color: pressed ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.45)',
          }}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}
