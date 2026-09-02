import React from 'react';
import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Screen } from '../../src/components/Screen';
import { PrimaryButton, GhostButton } from '../../src/components/PrimaryButton';
import { ProgressDots } from '../../src/components/ProgressDots';
import { IconCalendar, IconCheck, IconShield } from '../../src/icons/icons';
import { colors, fonts } from '../../src/theme/theme';

function PermissionRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <View
      style={{
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.onDark.text10,
        backgroundColor: 'rgba(255,255,255,0.028)',
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 13,
      }}
    >
      {icon}
      <Text style={{ fontFamily: fonts.plexRegular, fontSize: 14, color: colors.onDark.text78, flex: 1 }}>{label}</Text>
    </View>
  );
}

export default function OnboardingCalendar() {
  const router = useRouter();
  const next = () => router.push('/onboarding/first-alarm');
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
          Paso 2 de 3
        </Text>
        <Text style={{ fontFamily: fonts.soraRegular, fontSize: 26, letterSpacing: -0.7, lineHeight: 33, color: colors.text }}>
          Que tu agenda{'\n'}ponga la alarma
        </Text>
        <Text style={{ fontFamily: fonts.plexRegular, fontSize: 14.5, lineHeight: 22, color: colors.onDark.text50, paddingTop: 12 }}>
          LepeUp lee solo la hora de inicio de tus eventos para sugerirte alarmas. Nada sale de tu cuenta.
        </Text>

        <View style={{ flex: 1, justifyContent: 'center', gap: 10 }}>
          <PermissionRow icon={<IconCalendar />} label="Leer eventos y horarios" />
          <PermissionRow icon={<IconCheck />} label="Sugerir alarmas, nunca crearlas solo" />
          <PermissionRow icon={<IconShield />} label="Sin acceso a invitados ni contenido" />
        </View>

        <View style={{ gap: 12, paddingBottom: 12 }}>
          <PrimaryButton label="Conectar Google Calendar" icon={<IconCalendar size={17} color="#fff" strokeWidth={1.6} />} onPress={next} />
          <GhostButton label="Ahora no" onPress={next} />
          <ProgressDots count={4} active={2} />
        </View>
      </SafeAreaView>
    </Screen>
  );
}
