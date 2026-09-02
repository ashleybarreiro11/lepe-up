import React from 'react';
import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen } from '../../src/components/Screen';
import { PrimaryButton } from '../../src/components/PrimaryButton';
import { ProgressDots } from '../../src/components/ProgressDots';
import { colors, fonts, gradients } from '../../src/theme/theme';

const DAYS = [
  { l: 'L', active: true },
  { l: 'M', active: true },
  { l: 'M', active: true },
  { l: 'J', active: true },
  { l: 'V', active: true },
  { l: 'S', active: false },
  { l: 'D', active: false },
];

export default function OnboardingFirstAlarm() {
  const router = useRouter();
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

        <View style={{ flex: 1, justifyContent: 'center', gap: 22 }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 10 }}>
            <Text style={{ fontFamily: fonts.soraLight, fontSize: 66, letterSpacing: -3, lineHeight: 60, color: colors.text }}>
              06:40
            </Text>
            <Text style={{ fontFamily: fonts.plexRegular, fontSize: 16, color: colors.onDark.text50, paddingBottom: 9 }}>
              a.m.
            </Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
            {DAYS.map((d, i) => (
              <View
                key={i}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: d.active ? 'rgba(232,32,58,0.35)' : colors.onDark.text10,
                  backgroundColor: d.active ? 'rgba(232,32,58,0.14)' : 'transparent',
                }}
              >
                <Text
                  style={{
                    fontFamily: fonts.plexRegular,
                    fontSize: 12.5,
                    color: d.active ? colors.redSofter : colors.onDark.text35,
                  }}
                >
                  {d.l}
                </Text>
              </View>
            ))}
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
              <Text style={{ fontFamily: fonts.soraRegular, fontSize: 18, color: colors.redSoft }}>45 s</Text>
            </View>
            <View style={{ height: 6, borderRadius: 999, backgroundColor: colors.onDark.text10 }}>
              <LinearGradient
                colors={gradients.slider}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '22%', borderRadius: 999 }}
              />
              <View
                style={{
                  position: 'absolute',
                  top: -7,
                  left: '22%',
                  marginLeft: -10,
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: colors.text,
                }}
              />
            </View>
            <Text style={{ fontFamily: fonts.plexRegular, fontSize: 12.5, lineHeight: 18, color: colors.onDark.text40 }}>
              La luz se enciende en cuanto suena la alarma y sube despacio hasta el 100 % en 45 s.
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
