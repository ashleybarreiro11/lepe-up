import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

type IconProps = { size?: number; color?: string; strokeWidth?: number };

const GEAR_TEETH_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

export function IconGear({ size = 17, color = 'rgba(244,244,246,0.6)', strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {GEAR_TEETH_ANGLES.map((angle) => (
        <Rect key={angle} x="10.3" y="1.4" width="3.4" height="3.6" rx="1" fill={color} transform={`rotate(${angle} 12 12)`} />
      ))}
      <Circle cx="12" cy="12" r="5.6" stroke={color} strokeWidth={strokeWidth} />
      <Circle cx="12" cy="12" r="2" fill={color} />
    </Svg>
  );
}

export function IconAlarmClock({ size = 13, color = '#FF6070', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="13" r="8" stroke={color} strokeWidth={strokeWidth} />
      <Path d="M12 10v3.5l2.2 1.6M5 4.5 7.2 6.6M19 4.5 16.8 6.6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function IconCalendar({ size = 18, color = 'rgba(255,255,255,0.5)', strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="3.5" y="5" width="17" height="15.5" rx="3.5" stroke={color} strokeWidth={strokeWidth} />
      <Path d="M3.5 10h17M8.5 3v3.5M15.5 3v3.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function IconCheck({ size = 18, color = 'rgba(255,255,255,0.5)', strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M5 12.5 10 17.5 19 7.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function IconShield({ size = 18, color = 'rgba(255,255,255,0.5)', strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="4.5" y="10.5" width="15" height="9.5" rx="3" stroke={color} strokeWidth={strokeWidth} />
      <Path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function IconSparkle({ size = 16, color = 'rgba(255,255,255,0.42)', strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 4v2M12 18v2M4 12h2M18 12h2M6.5 6.5 8 8M17.5 6.5 16 8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Circle cx="12" cy="12" r="3.6" stroke={color} strokeWidth={strokeWidth} />
    </Svg>
  );
}

export function IconBatteryBolt({ size = 16, color = 'rgba(255,255,255,0.42)', strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="2.5" y="7.5" width="16" height="9" rx="3" stroke={color} strokeWidth={strokeWidth} />
      <Path d="M21.5 11v2" stroke={color} strokeWidth={strokeWidth} />
      <Path d="M9.5 9.5 7 12.8h2.6l-.6 2.4 2.8-3.5H9.2z" fill={color} stroke="none" />
    </Svg>
  );
}

export function IconHeadphones({ size = 17, color = 'rgba(255,255,255,0.42)', strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 14v-3.5A8 8 0 0 1 20 10.5V14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Path
        d="M4 14a2.5 2.5 0 0 0 2.5 2.5V11.5A2.5 2.5 0 0 0 4 14zM20 14a2.5 2.5 0 0 1-2.5 2.5V11.5A2.5 2.5 0 0 1 20 14z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function IconChevronRight({ size = 16, color = 'rgba(255,255,255,0.3)', strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M9.5 5.5 16 12l-6.5 6.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function IconChevronLeft({ size = 18, color = 'rgba(255,255,255,0.5)', strokeWidth = 1.7 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M14.5 5.5 8 12l6.5 6.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function IconMic({ size = 17, color = 'rgba(255,255,255,0.7)', strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="9" y="3" width="6" height="11" rx="3" stroke={color} strokeWidth={strokeWidth} />
      <Path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function IconSend({ size = 16, color = '#fff', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M5 12h13M12.5 6 18.5 12l-6 6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
