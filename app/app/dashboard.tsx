import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen } from '../src/components/Screen';
import { GradientMark } from '../src/components/GradientMark';
import { RadialGlow } from '../src/components/RadialGlow';
import { Breathe } from '../src/components/Breathe';
import { PrimaryButton } from '../src/components/PrimaryButton';
import {
  IconAlarmClock,
  IconBatteryBolt,
  IconCalendar,
  IconChevronRight,
  IconGear,
  IconHeadphones,
  IconMic,
  IconSparkle,
} from '../src/icons/icons';
import { useApp } from '../src/state/AppContext';
import { colors, fonts, gradients } from '../src/theme/theme';

function BatteryPill({ percent }: { percent: number }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        borderWidth: 1,
        borderColor: colors.onDark.text10,
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderRadius: 999,
        paddingVertical: 8,
        paddingHorizontal: 12,
      }}
    >
      <View style={{ width: 22, height: 11, borderRadius: 3, borderWidth: 1, borderColor: colors.onDark.text32, justifyContent: 'center' }}>
        <View
          style={{
            marginLeft: 1.5,
            height: 8,
            width: (18 * percent) / 100,
            borderRadius: 2,
            backgroundColor: colors.green,
          }}
        />
      </View>
      <Text style={{ fontFamily: fonts.plexRegular, fontSize: 12.5, color: colors.onDark.text70 }}>Mesita {percent} %</Text>
    </View>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <View
      style={{
        flex: 1,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.borderSoft,
        backgroundColor: colors.fillSoft,
        padding: 16,
        gap: 12,
        minHeight: 104,
      }}
    >
      {icon}
      <View style={{ gap: 3 }}>
        <Text style={{ fontFamily: fonts.soraRegular, fontSize: 24, letterSpacing: -0.6, color: colors.text }}>{value}</Text>
        <Text style={{ fontFamily: fonts.plexRegular, fontSize: 12.5, color: colors.onDark.text40 }}>{label}</Text>
      </View>
    </View>
  );
}

export default function Dashboard() {
  const router = useRouter();
  const { state, riseLabel, chargeStartLabel, rotationNote, acceptSuggestion, dismissSuggestion } = useApp();

  return (
    <Screen>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 22, paddingTop: 12, paddingBottom: 8, gap: 22 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ gap: 3 }}>
              <Text style={{ fontFamily: fonts.plexRegular, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: colors.textFaint }}>
                Buenas noches
              </Text>
              <Text style={{ fontFamily: fonts.soraMedium, fontSize: 20, letterSpacing: -0.3, color: colors.text }}>Lepe</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 9 }}>
              <BatteryPill percent={state.deviceBattery} />
              <Pressable
                onPress={() => router.push('/settings')}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 13,
                  borderWidth: 1,
                  borderColor: colors.onDark.text10,
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconGear />
              </Pressable>
            </View>
          </View>

          <View
            style={{
              borderRadius: 26,
              borderWidth: 1,
              borderColor: colors.onDark.text10,
              overflow: 'hidden',
              padding: 24,
              paddingTop: 26,
            }}
          >
            <LinearGradient
              colors={gradients.heroCard}
              start={{ x: 0.1, y: 0 }}
              end={{ x: 0.9, y: 1 }}
              style={{ position: 'absolute', inset: 0 }}
            />
            <Breathe duration={7000} style={{ position: 'absolute', top: -70, right: -50 }}>
              <RadialGlow
                size={190}
                stops={[
                  { offset: '0', color: '#E8203A', opacity: 0.45 },
                  { offset: '0.68', color: '#E8203A', opacity: 0 },
                ]}
              />
            </Breathe>
            <View style={{ gap: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <IconAlarmClock />
                <Text style={{ fontFamily: fonts.plexRegular, fontSize: 11.5, letterSpacing: 2, textTransform: 'uppercase', color: colors.onDark.text50 }}>
                  Próxima alarma
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 12 }}>
                <Text style={{ fontFamily: fonts.soraLight, fontSize: 60, letterSpacing: -2.5, lineHeight: 54, color: colors.text }}>
                  {state.alarm.time}
                </Text>
                <Text style={{ fontFamily: fonts.plexMedium, fontSize: 15, color: colors.onDark.text55, paddingBottom: 8 }}>
                  {state.alarm.mer}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: fonts.plexRegular, fontSize: 13.5, color: colors.onDark.text62 }}>
                  {state.alarm.day} · faltan {state.alarm.in}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(232,32,58,0.3)',
                    backgroundColor: 'rgba(232,32,58,0.10)',
                    borderRadius: 999,
                    paddingVertical: 5,
                    paddingHorizontal: 11,
                  }}
                >
                  <Text style={{ fontFamily: fonts.plexRegular, fontSize: 12.5, color: colors.redSofter }}>Activa</Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              borderRadius: 20,
              borderWidth: 1,
              borderColor: colors.borderSoft,
              backgroundColor: colors.fillSoft,
              padding: 18,
              gap: 14,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 13 }}>
              <View
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 12,
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconAlarmClock size={16} color="rgba(255,255,255,0.55)" strokeWidth={1.6} />
              </View>
              <View style={{ flex: 1, gap: 2 }}>
                <Text style={{ fontFamily: fonts.soraRegular, fontSize: 15, color: colors.text }}>Alarmas personalizadas</Text>
                <Text style={{ fontFamily: fonts.plexRegular, fontSize: 12.5, lineHeight: 18, color: colors.onDark.text40 }}>
                  Ej. jueves 5:00 a.m., el resto de la semana 06:40 a.m.
                </Text>
              </View>
            </View>
            <Pressable
              onPress={() => router.push('/chat')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                borderRadius: 13,
                borderWidth: 1,
                borderColor: 'rgba(31,92,207,0.45)',
                backgroundColor: 'rgba(31,92,207,0.16)',
                paddingVertical: 11,
              }}
            >
              <Text style={{ fontFamily: fonts.plexMedium, fontSize: 13.5, color: colors.blueLight }}>Pídeselo a LepeUp</Text>
            </Pressable>
          </View>

          {state.suggestionOpen && (
            <View
              style={{
                borderRadius: 22,
                borderWidth: 1,
                borderColor: 'rgba(232,32,58,0.34)',
                overflow: 'hidden',
                padding: 18,
                paddingBottom: 16,
                gap: 14,
              }}
            >
              <LinearGradient colors={gradients.banner} start={{ x: 0.15, y: 0 }} end={{ x: 0.9, y: 1 }} style={{ position: 'absolute', inset: 0 }} />
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 10,
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconCalendar size={15} color={colors.redSofter} strokeWidth={1.6} />
                </View>
                <View style={{ gap: 5, flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={{ fontFamily: fonts.plexRegular, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,138,150,0.85)' }}>
                      Sugerencia del calendario
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                        borderWidth: 1,
                        borderColor: colors.onDark.text12,
                        borderRadius: 999,
                        paddingVertical: 2,
                        paddingHorizontal: 7,
                      }}
                    >
                      <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: colors.green }} />
                      <Text style={{ fontFamily: fonts.plexRegular, fontSize: 10, color: colors.onDark.text55 }}>Google Calendar</Text>
                    </View>
                  </View>
                  <Text style={{ fontFamily: fonts.plexRegular, fontSize: 14.5, lineHeight: 21, color: colors.onDark.text90 }}>
                    Detectamos un vuelo el jueves a las 5:00 a.m., ¿quieres programar una alarma para esa hora?
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <View style={{ flex: 1 }}>
                  <PrimaryButton label="Programar" onPress={acceptSuggestion} />
                </View>
                <Pressable
                  onPress={dismissSuggestion}
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: colors.onDark.text12,
                    borderRadius: 13,
                    paddingVertical: 11,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ fontFamily: fonts.plexRegular, fontSize: 14, color: colors.onDark.text62 }}>Descartar</Text>
                </Pressable>
              </View>
            </View>
          )}

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            <StatCard icon={<IconSparkle />} value={riseLabel} label="Subida de luz" />
            <StatCard icon={<IconBatteryBolt />} value={chargeStartLabel} label="Inicio de carga" />
            <Pressable
              onPress={() => router.push('/settings')}
              style={{
                width: '100%',
                borderRadius: 20,
                borderWidth: 1,
                borderColor: colors.borderSoft,
                backgroundColor: colors.fillSoft,
                padding: 16,
                paddingHorizontal: 18,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 13 }}>
                <IconHeadphones size={17} />
                <View style={{ gap: 2 }}>
                  <Text style={{ fontFamily: fonts.soraRegular, fontSize: 16, color: colors.text }}>{state.tone}</Text>
                  <Text style={{ fontFamily: fonts.plexRegular, fontSize: 12.5, color: colors.onDark.text40 }}>
                    Tono actual{rotationNote}
                  </Text>
                </View>
              </View>
              <IconChevronRight />
            </Pressable>
          </View>
        </ScrollView>

        <View style={{ paddingHorizontal: 18, paddingTop: 10, paddingBottom: 16 }}>
          <Pressable onPress={() => router.push('/chat')}>
            <View
              style={{
                borderRadius: 20,
                borderWidth: 1,
                borderColor: 'rgba(232,32,58,0.28)',
                overflow: 'hidden',
                padding: 13,
                paddingHorizontal: 14,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <LinearGradient colors={gradients.chatBar} start={{ x: 0.1, y: 0 }} end={{ x: 0.9, y: 1 }} style={{ position: 'absolute', inset: 0 }} />
              <GradientMark size={32} dotSize={9} />
              <View style={{ flex: 1, gap: 1 }}>
                <Text style={{ fontFamily: fonts.plexRegular, fontSize: 14.5, color: colors.onDark.text90 }}>Habla con LepeUp</Text>
                <Text style={{ fontFamily: fonts.plexRegular, fontSize: 11.5, color: colors.onDark.text42 }}>Ajusta alarmas, luz y sonidos</Text>
              </View>
              <IconMic size={19} color="rgba(255,255,255,0.75)" strokeWidth={1.6} />
            </View>
          </Pressable>
        </View>
      </SafeAreaView>
    </Screen>
  );
}
