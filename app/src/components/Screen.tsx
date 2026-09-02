import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors, fonts } from '../theme/theme';

export function Screen({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      {children}
    </View>
  );
}

export const baseText = { fontFamily: fonts.plexRegular, color: colors.text };

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.screenBg,
  },
});
