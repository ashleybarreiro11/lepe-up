import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export function Breathe({
  children = null,
  duration = 9000,
  delay = 0,
  minOpacity = 0.35,
  maxOpacity = 0.7,
  minScale = 1,
  maxScale = 1.04,
  style,
}: {
  children?: React.ReactNode;
  duration?: number;
  delay?: number;
  minOpacity?: number;
  maxOpacity?: number;
  minScale?: number;
  maxScale?: number;
  style?: any;
}) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(progress, {
          toValue: 1,
          duration: duration / 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: duration / 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [progress, duration, delay]);

  const opacity = progress.interpolate({ inputRange: [0, 1], outputRange: [minOpacity, maxOpacity] });
  const scale = progress.interpolate({ inputRange: [0, 1], outputRange: [minScale, maxScale] });

  return <Animated.View style={[style, { opacity, transform: [{ scale }] }]}>{children}</Animated.View>;
}
