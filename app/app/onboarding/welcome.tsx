import React from 'react';
import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Screen } from '../../src/components/Screen';
import { GradientMark } from '../../src/components/GradientMark';
import { PrimaryButton } from '../../src/components/PrimaryButton';
import { ProgressDots } from '../../src/components/ProgressDots';
import { RadialGlow } from '../../src/components/RadialGlow';
import { Breathe } from '../../src/components/Breathe';
import { colors, fonts } from '../../src/theme/theme';

export default function OnboardingWelcome() {
  const router = useRouter();
  return (
    <Screen>
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 26, justifyContent: 'space-between' }}>
        <Breathe
          duration={9000}
          style={{ position: 'absolute', top: -140, left: '50%', marginLeft: -210 }}
        >
          <RadialGlow
            size={420}
            stops={[
              { offset: '0', color: '#E8203A', opacity: 0.3 },
              { offset: '0.55', color: '#6D18C4', opacity: 0.1 },
              { offset: '0.72', color: '#6D18C4', opacity: 0 },
            ]}
          />
        </Breathe>

        <View style={{ alignItems: 'center', gap: 14, paddingTop: 28 }}>
          <GradientMark size={74} />
          <Text style={{ fontFamily: fonts.soraSemiBold, fontSize: 22, letterSpacing: -0.4, color: colors.text }}>
            LepeUp
          </Text>
        </View>

        <View style={{ gap: 14, paddingBottom: 12 }}>
          <Text style={{ fontFamily: fonts.soraLight, fontSize: 32, lineHeight: 38, letterSpacing: -1, color: colors.text }}>
            Despierta con luz,{'\n'}no con sobresaltos.
          </Text>
          <Text style={{ fontFamily: fonts.plexRegular, fontSize: 14.5, lineHeight: 22, color: colors.onDark.text50 }}>
            Tu mesita simula el amanecer y el asistente ajusta todo por voz. Tres pasos y queda lista.
          </Text>
        </View>

        <View style={{ gap: 18, paddingBottom: 12 }}>
          <PrimaryButton label="Comenzar" onPress={() => router.push('/onboarding/pair')} />
          <ProgressDots count={4} active={0} />
        </View>
      </SafeAreaView>
    </Screen>
  );
}
