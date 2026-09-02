import React from 'react';
import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Screen } from '../../src/components/Screen';
import { PrimaryButton } from '../../src/components/PrimaryButton';
import { ProgressDots } from '../../src/components/ProgressDots';
import { RadialGlow } from '../../src/components/RadialGlow';
import { Breathe } from '../../src/components/Breathe';
import { useApp } from '../../src/state/AppContext';
import { colors, fonts } from '../../src/theme/theme';

export default function OnboardingPair() {
  const router = useRouter();
  const { chargeLabel, chargeStartLabel } = useApp();
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
          Paso 1 de 3
        </Text>
        <Text
          style={{
            fontFamily: fonts.soraRegular,
            fontSize: 26,
            letterSpacing: -0.7,
            lineHeight: 33,
            color: colors.text,
          }}
        >
          Acerca el teléfono{'\n'}a la mesita
        </Text>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Breathe
            duration={6000}
            minOpacity={0.35}
            maxOpacity={0.7}
            style={{ position: 'absolute', width: 250, height: 250, borderRadius: 125, borderWidth: 1, borderColor: 'rgba(232,32,58,0.16)' }}
          />
          <Breathe
            duration={6000}
            delay={600}
            minOpacity={0.35}
            maxOpacity={0.7}
            style={{ position: 'absolute', width: 170, height: 170, borderRadius: 85, borderWidth: 1, borderColor: 'rgba(232,32,58,0.28)' }}
          />
          <View
            style={{
              width: 96,
              height: 96,
              borderRadius: 30,
              backgroundColor: 'rgba(255,255,255,0.06)',
              borderWidth: 1,
              borderColor: colors.onDark.text12,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <RadialGlow
              size={26}
              stops={[
                { offset: '0', color: '#FF6070', opacity: 1 },
                { offset: '1', color: '#8A0F20', opacity: 1 },
              ]}
              style={{ borderRadius: 13 }}
            />
          </View>
        </View>

        <View style={{ gap: 14, paddingBottom: 12 }}>
          <Text style={{ fontFamily: fonts.plexRegular, fontSize: 13, lineHeight: 20, color: colors.onDark.text45 }}>
            La mesita también carga tu celular por inducción, empezando automáticamente a las {chargeStartLabel}.
            Después podrás elegir cuánto tiempo mantiene la carga antes de cortarla: {chargeLabel} por defecto.
          </Text>
          <View
            style={{
              borderRadius: 18,
              borderWidth: 1,
              borderColor: colors.onDark.text10,
              backgroundColor: 'rgba(255,255,255,0.03)',
              padding: 15,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: colors.green,
                shadowColor: colors.green,
                shadowOpacity: 0.7,
                shadowRadius: 10,
              }}
            />
            <View style={{ flex: 1, gap: 2 }}>
              <Text style={{ fontFamily: fonts.plexRegular, fontSize: 14.5, color: colors.text }}>
                LepeUp-A17 encontrada
              </Text>
              <Text style={{ fontFamily: fonts.plexRegular, fontSize: 12, color: colors.onDark.text40 }}>
                Señal fuerte · a 40 cm
              </Text>
            </View>
            <Text style={{ fontFamily: fonts.plexRegular, fontSize: 12.5, color: colors.onDark.text35 }}>
              Bluetooth
            </Text>
          </View>
          <PrimaryButton label="Emparejar" onPress={() => router.push('/onboarding/calendar')} />
          <ProgressDots count={4} active={1} />
        </View>
      </SafeAreaView>
    </Screen>
  );
}
