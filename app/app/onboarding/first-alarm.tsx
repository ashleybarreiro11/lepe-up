import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Screen } from '../../src/components/Screen';
import { PrimaryButton } from '../../src/components/PrimaryButton';
import { ProgressDots } from '../../src/components/ProgressDots';
import { DragSlider } from '../../src/components/DragSlider';
import { useApp, DAY_LABELS, SLIDER_RANGES } from '../../src/state/AppContext';
import { colors, fonts } from '../../src/theme/theme';

export default function OnboardingFirstAlarm() {
  const router = useRouter();
  const { state, riseLabel, setRise, toggleDay, adjustAlarmHour, adjustAlarmMinute, toggleAlarmMeridiem } = useApp();
  const [hour, minute] = state.alarm.time.split(':');

  return (
    <Screen>
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 26, paddingTop: 8 }}>
        <Text
          style={{
            fontFamily: fonts.plexRegular,
            fontSize: 12,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: colors.onDark.text32,
            paddingBottom: 10,
          }}
        >
          Paso 3 de 3
        </Text>
        <Text style={{ fontFamily: fonts.soraRegular, fontSize: 26, letterSpacing: -0.7, lineHeight: 33, color: colors.text }}>
          Tu primera{'\n'}alarma
        </Text>

        <View style={{ flex: 1, justifyContent: 'center', gap: 18 }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 10 }}>
            <Pressable onPress={adjustAlarmHour} hitSlop={8}>
              <Text style={{ fontFamily: fonts.soraLight, fontSize: 66, letterSpacing: -3, lineHeight: 60, color: colors.text }}>
                {hour}
              </Text>
            </Pressable>
            <Text style={{ fontFamily: fonts.soraLight, fontSize: 66, letterSpacing: -3, lineHeight: 60, color: colors.text }}>
              :
            </Text>
            <Pressable onPress={adjustAlarmMinute} hitSlop={8}>
              <Text style={{ fontFamily: fonts.soraLight, fontSize: 66, letterSpacing: -3, lineHeight: 60, color: colors.text }}>
                {minute}
              </Text>
            </Pressable>
            <Pressable onPress={toggleAlarmMeridiem} hitSlop={8} style={{ paddingBottom: 9 }}>
              <Text style={{ fontFamily: fonts.plexRegular, fontSize: 16, color: colors.onDark.text50 }}>{state.alarm.mer}</Text>
            </Pressable>
          </View>
          <Text
            style={{
              fontFamily: fonts.plexRegular,
              fontSize: 11.5,
              textAlign: 'center',
              color: colors.onDark.text30,
            }}
          >
            Toca la hora, los minutos, el periodo o los días para ajustarlos
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
            {DAY_LABELS.map((l, i) => {
              const active = state.activeDays[i];
              return (
                <Pressable
                  key={i}
                  onPress={() => toggleDay(i)}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: active ? 'rgba(232,32,58,0.35)' : colors.onDark.text10,
                    backgroundColor: active ? 'rgba(232,32,58,0.14)' : 'transparent',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fonts.plexRegular,
                      fontSize: 12.5,
                      color: active ? colors.redSofter : colors.onDark.text35,
                    }}
                  >
                    {l}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View
            style={{
              borderRadius: 20,
              borderWidth: 1,
              borderColor: colors.onDark.text10,
              backgroundColor: 'rgba(255,255,255,0.028)',
              padding: 18,
              gap: 14,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <Text style={{ fontFamily: fonts.plexRegular, fontSize: 14.5, color: colors.onDark.text82 }}>Subida de luz</Text>
              <Text style={{ fontFamily: fonts.soraRegular, fontSize: 18, color: colors.redSoft }}>{riseLabel}</Text>
            </View>
            <DragSlider min={SLIDER_RANGES.RISE_MIN} max={SLIDER_RANGES.RISE_MAX} step={5} value={state.rise} onChange={setRise} />
            <Text style={{ fontFamily: fonts.plexRegular, fontSize: 12.5, lineHeight: 18, color: colors.onDark.text40 }}>
              La luz se enciende en cuanto suena la alarma y sube despacio hasta el 100 % en {riseLabel}.
            </Text>
          </View>
        </View>

        <View style={{ gap: 18, paddingBottom: 12 }}>
          <PrimaryButton label="Listo" onPress={() => router.replace('/dashboard')} />
          <ProgressDots count={4} active={3} />
        </View>
      </SafeAreaView>
    </Screen>
  );
}
