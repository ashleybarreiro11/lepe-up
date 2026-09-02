import React, { useMemo, useRef, useState } from 'react';
import { PanResponder, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients } from '../theme/theme';

export function DragSlider({
  min,
  max,
  step,
  value,
  onChange,
}: {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  const trackRef = useRef<View>(null);
  const originX = useRef(0);
  const width = useRef(1);

  const [layoutTick, setLayoutTick] = useState(0);

  const applyFromPageX = (pageX: number) => {
    const t = Math.max(0, Math.min(1, (pageX - originX.current) / width.current));
    const raw = min + t * (max - min);
    onChange(Math.round(raw / step) * step);
  };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt) => applyFromPageX(evt.nativeEvent.pageX),
        onPanResponderMove: (evt) => applyFromPageX(evt.nativeEvent.pageX),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [min, max, step, layoutTick]
  );

  const pct = ((value - min) / (max - min)) * 100;

  return (
    <View
      ref={trackRef}
      onLayout={(e) => {
        width.current = Math.max(1, e.nativeEvent.layout.width);
        trackRef.current?.measureInWindow((x) => {
          originX.current = x;
          setLayoutTick((t) => t + 1);
        });
      }}
      {...panResponder.panHandlers}
      style={{ paddingVertical: 10 }}
    >
      <View style={{ height: 6, borderRadius: 999, backgroundColor: colors.onDark.text10 }}>
        <LinearGradient
          colors={gradients.slider}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: `${pct}%`,
            borderRadius: 999,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: -8,
            left: `${pct}%`,
            marginLeft: -11,
            width: 22,
            height: 22,
            borderRadius: 11,
            backgroundColor: colors.text,
            shadowColor: colors.red,
            shadowOpacity: 0.5,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 2 },
            elevation: 4,
          }}
        />
      </View>
    </View>
  );
}
