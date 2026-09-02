import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Screen } from '../src/components/Screen';
import { BackHeader, ScreenTitle } from '../src/components/BackHeader';
import { DragSlider } from '../src/components/DragSlider';
import { Toggle } from '../src/components/Toggle';
import { IconCalendar } from '../src/icons/icons';
import { useApp, FREQS, TONES, SLIDER_RANGES } from '../src/state/AppContext';
import { colors, fonts } from '../src/theme/theme';

function Card({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        borderRadius: 22,
        borderWidth: 1,
        borderColor: colors.borderSoft,
        backgroundColor: colors.fillSoft,
        padding: 20,
        paddingHorizontal: 18,
      }}
    >
      {children}
    </View>
  );
}

export default function Settings() {
  const {
    state,
    riseLabel,
    chargeLabel,
    chargeStartLabel,
    nextRotation,
    setRise,
    setCharge,
    toggleRotation,
    setFreq,
    setTone,
    adjustChargeStartHour,
    adjustChargeStartMinute,
    toggleChargeStartMeridiem,
  } = useApp();
  const [chargeStartHour, chargeStartMinute] = state.chargeStart.time.split(':');

  return (
    <Screen>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 22, paddingTop: 10, paddingBottom: 16 }}>
          <BackHeader />
          <ScreenTitle title="Configuración" />
        </View>

        <ScrollView contentContainerStyle={{ paddingHorizontal: 22, paddingBottom: 32, gap: 14 }}>
          <Card>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', paddingBottom: 16 }}>
              <View style={{ gap: 4 }}>
                <Text style={{ fontFamily: fonts.plexRegular, fontSize: 15, color: colors.onDark.text88 }}>Subida de luz</Text>
                <Text style={{ fontFamily: fonts.plexRegular, fontSize: 12.5, color: colors.onDark.text40 }}>
                  La luz sube desde que suena la alarma
                </Text>
              </View>
              <Text style={{ fontFamily: fonts.soraRegular, fontSize: 22, color: colors.redSoft }}>{riseLabel}</Text>
            </View>
            <DragSlider min={SLIDER_RANGES.RISE_MIN} max={SLIDER_RANGES.RISE_MAX} step={5} value={state.rise} onChange={setRise} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 4 }}>
              <Text style={{ fontFamily: fonts.plexRegular, fontSize: 11.5, color: colors.onDark.text30 }}>10 s</Text>
              <Text style={{ fontFamily: fonts.plexRegular, fontSize: 11.5, color: colors.onDark.text30 }}>300 s</Text>
            </View>
          </Card>

          <Card>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', paddingBottom: 16 }}>
              <View style={{ gap: 4, flex: 1, paddingRight: 12 }}>
                <Text style={{ fontFamily: fonts.plexRegular, fontSize: 15, color: colors.onDark.text88 }}>Tiempo de carga</Text>
                <Text style={{ fontFamily: fonts.plexRegular, fontSize: 12.5, lineHeight: 18, color: colors.onDark.text40 }}>
                  Cuánto tiempo mantiene la mesita la carga inductiva de tu celular antes de cortarla
                </Text>
              </View>
              <Text style={{ fontFamily: fonts.soraRegular, fontSize: 22, color: colors.redSoft }}>{chargeLabel}</Text>
            </View>
            <DragSlider min={SLIDER_RANGES.CHARGE_MIN} max={SLIDER_RANGES.CHARGE_MAX} step={15} value={state.charge} onChange={setCharge} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 4 }}>
              <Text style={{ fontFamily: fonts.plexRegular, fontSize: 11.5, color: colors.onDark.text30 }}>30 min</Text>
              <Text style={{ fontFamily: fonts.plexRegular, fontSize: 11.5, color: colors.onDark.text30 }}>6 h</Text>
            </View>
          </Card>

          <Card>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', paddingBottom: 16 }}>
              <View style={{ gap: 4, flex: 1, paddingRight: 12 }}>
                <Text style={{ fontFamily: fonts.plexRegular, fontSize: 15, color: colors.onDark.text88 }}>Inicio de carga automática</Text>
                <Text style={{ fontFamily: fonts.plexRegular, fontSize: 12.5, lineHeight: 18, color: colors.onDark.text40 }}>
                  A qué hora la mesita empieza a cargar tu celular por inducción
                </Text>
              </View>
              <Text style={{ fontFamily: fonts.soraRegular, fontSize: 22, color: colors.redSoft }}>{chargeStartLabel}</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Pressable
                onPress={adjustChargeStartHour}
                style={{
                  flex: 1,
                  borderRadius: 12,
                  paddingVertical: 10,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: colors.onDark.text10,
                  backgroundColor: 'rgba(255,255,255,0.03)',
                }}
              >
                <Text style={{ fontFamily: fonts.soraRegular, fontSize: 15, color: colors.redSofter }}>{chargeStartHour}</Text>
              </Pressable>
              <Pressable
                onPress={adjustChargeStartMinute}
                style={{
                  flex: 1,
                  borderRadius: 12,
                  paddingVertical: 10,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: colors.onDark.text10,
                  backgroundColor: 'rgba(255,255,255,0.03)',
                }}
              >
                <Text style={{ fontFamily: fonts.soraRegular, fontSize: 15, color: colors.redSofter }}>{chargeStartMinute}</Text>
              </Pressable>
              <Pressable
                onPress={toggleChargeStartMeridiem}
                style={{
                  flex: 1,
                  borderRadius: 12,
                  paddingVertical: 10,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: colors.onDark.text10,
                  backgroundColor: 'rgba(255,255,255,0.03)',
                }}
              >
                <Text style={{ fontFamily: fonts.soraRegular, fontSize: 15, color: colors.redSofter }}>{state.chargeStart.mer}</Text>
              </Pressable>
            </View>
            <Text style={{ fontFamily: fonts.plexRegular, fontSize: 11.5, color: colors.onDark.text30, paddingTop: 8 }}>
              Toca la hora, los minutos o el periodo para ajustarlos
            </Text>
          </Card>

          <Card>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
              <View style={{ gap: 4, flex: 1 }}>
                <Text style={{ fontFamily: fonts.plexRegular, fontSize: 15, color: colors.onDark.text88 }}>
                  Rotación automática del tono
                </Text>
                <Text style={{ fontFamily: fonts.plexRegular, fontSize: 12.5, lineHeight: 18, color: colors.onDark.text40 }}>
                  Cambia el tono para evitar la habituación
                </Text>
              </View>
              <Toggle value={state.rotation} onToggle={toggleRotation} />
            </View>
            {state.rotation && (
              <View style={{ gap: 9, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)', marginTop: 16, paddingTop: 15 }}>
                <Text style={{ fontFamily: fonts.plexRegular, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: colors.onDark.text30 }}>
                  Frecuencia
                </Text>
                <View style={{ flexDirection: 'row', gap: 7 }}>
                  {FREQS.map((f) => {
                    const active = f.key === state.freq;
                    return (
                      <Pressable
                        key={f.key}
                        onPress={() => setFreq(f.key)}
                        style={{
                          flex: 1,
                          borderRadius: 12,
                          paddingVertical: 10,
                          paddingHorizontal: 4,
                          alignItems: 'center',
                          borderWidth: 1,
                          borderColor: active ? 'rgba(232,32,58,0.45)' : colors.onDark.text10,
                          backgroundColor: active ? 'rgba(232,32,58,0.14)' : 'rgba(255,255,255,0.03)',
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: fonts.plexRegular,
                            fontSize: 12,
                            textAlign: 'center',
                            color: active ? colors.redSofter : colors.onDark.text62,
                          }}
                        >
                          {f.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
                <Text style={{ fontFamily: fonts.plexRegular, fontSize: 12, color: colors.onDark.text36 }}>
                  Próximo cambio: {nextRotation}
                </Text>
              </View>
            )}
          </Card>

          <View
            style={{
              borderRadius: 22,
              borderWidth: 1,
              borderColor: colors.borderSoft,
              backgroundColor: colors.fillSoft,
              padding: 18,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 13,
            }}
          >
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
              <IconCalendar size={17} color="rgba(255,255,255,0.55)" strokeWidth={1.5} />
            </View>
            <View style={{ flex: 1, gap: 3 }}>
              <Text style={{ fontFamily: fonts.plexRegular, fontSize: 14.5, color: colors.onDark.text88 }}>Google Calendar</Text>
              <Text style={{ fontFamily: fonts.plexRegular, fontSize: 12, color: colors.onDark.text40 }}>lepe@gmail.com</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 7,
                borderWidth: 1,
                borderColor: 'rgba(74,222,128,0.28)',
                backgroundColor: 'rgba(74,222,128,0.10)',
                borderRadius: 999,
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}
            >
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.green }} />
              <Text style={{ fontFamily: fonts.plexRegular, fontSize: 11.5, color: colors.greenSoft }}>Conectado</Text>
            </View>
          </View>

          <Text
            style={{
              fontFamily: fonts.plexRegular,
              fontSize: 11,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: colors.onDark.text28,
              paddingHorizontal: 4,
              paddingTop: 6,
            }}
          >
            Tono de alarma
          </Text>
          <View style={{ borderRadius: 22, borderWidth: 1, borderColor: colors.borderSoft, backgroundColor: colors.fillSoft, overflow: 'hidden' }}>
            {TONES.map((t, i) => {
              const active = t.name === state.tone;
              return (
                <Pressable
                  key={t.name}
                  onPress={() => setTone(t.name)}
                  style={{
                    padding: 15,
                    paddingHorizontal: 18,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTopWidth: i === 0 ? 0 : 1,
                    borderTopColor: 'rgba(255,255,255,0.05)',
                  }}
                >
                  <View style={{ gap: 3 }}>
                    <Text style={{ fontFamily: fonts.plexRegular, fontSize: 14.5, color: active ? '#fff' : colors.onDark.text72 }}>
                      {t.name}
                    </Text>
                    <Text style={{ fontFamily: fonts.plexRegular, fontSize: 12, color: colors.onDark.text36 }}>{t.desc}</Text>
                  </View>
                  <View
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 9,
                      borderWidth: 1,
                      borderColor: active ? colors.red : colors.onDark.text20,
                      backgroundColor: active ? colors.red : 'transparent',
                    }}
                  />
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Screen>
  );
}
