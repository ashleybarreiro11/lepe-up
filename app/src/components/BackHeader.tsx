import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { fonts } from '../theme/theme';
import { IconChevronLeft } from '../icons/icons';

export function BackHeader() {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.back()}
      hitSlop={12}
      style={{ width: 34, height: 34, alignItems: 'center', justifyContent: 'center' }}
    >
      <IconChevronLeft />
    </Pressable>
  );
}

export function ScreenTitle({ title }: { title: string }) {
  return <Text style={{ fontFamily: fonts.soraMedium, fontSize: 19, letterSpacing: -0.3, color: '#F4F4F6' }}>{title}</Text>;
}
