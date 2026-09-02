import React, { useRef } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen } from '../src/components/Screen';
import { GradientMark } from '../src/components/GradientMark';
import { BackHeader } from '../src/components/BackHeader';
import { IconMic, IconSend } from '../src/icons/icons';
import { useApp, CHIPS } from '../src/state/AppContext';
import { colors, fonts, gradients } from '../src/theme/theme';

export default function Chat() {
  const { state, toggleMic, setDraft, send } = useApp();
  const scrollRef = useRef<ScrollView>(null);

  return (
    <Screen>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              paddingHorizontal: 22,
              paddingTop: 10,
              paddingBottom: 14,
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(255,255,255,0.06)',
            }}
          >
            <BackHeader />
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <GradientMark size={26} dotSize={0} />
              <View>
                <Text style={{ fontFamily: fonts.soraMedium, fontSize: 15, color: colors.text }}>Asistente LepeUp</Text>
                <Text style={{ fontFamily: fonts.plexRegular, fontSize: 11, color: colors.onDark.text38 }}>Conectado a la mesita</Text>
              </View>
            </View>
          </View>

          <ScrollView
            ref={scrollRef}
            onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
            contentContainerStyle={{ paddingHorizontal: 22, paddingTop: 20, paddingBottom: 8, gap: 12 }}
          >
            {state.messages.map((m, i) => {
              const mine = m.who === 'me';
              return (
                <View key={i} style={{ flexDirection: 'row', justifyContent: mine ? 'flex-end' : 'flex-start' }}>
                  <View
                    style={{
                      maxWidth: '78%',
                      borderRadius: 18,
                      borderTopRightRadius: mine ? 6 : 18,
                      borderTopLeftRadius: mine ? 18 : 6,
                      padding: 12,
                      paddingHorizontal: 15,
                      borderWidth: 1,
                      borderColor: mine ? 'rgba(232,32,58,0.3)' : colors.borderSoft,
                      backgroundColor: mine ? 'rgba(232,32,58,0.16)' : 'rgba(255,255,255,0.04)',
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: fonts.plexRegular,
                        fontSize: 14.5,
                        lineHeight: 21,
                        color: mine ? '#fff' : colors.onDark.text82,
                      }}
                    >
                      {m.text}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>

          <View style={{ paddingHorizontal: 22, paddingTop: 6 }}>
            <Text
              style={{
                fontFamily: fonts.plexRegular,
                fontSize: 11,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: colors.onDark.text30,
                paddingBottom: 10,
              }}
            >
              Sugerencias
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {CHIPS.map((c) => (
                <Pressable
                  key={c}
                  onPress={() => send(c)}
                  style={{
                    borderWidth: 1,
                    borderColor: colors.onDark.text12,
                    backgroundColor: 'rgba(255,255,255,0.035)',
                    borderRadius: 999,
                    paddingVertical: 9,
                    paddingHorizontal: 14,
                  }}
                >
                  <Text style={{ fontFamily: fonts.plexRegular, fontSize: 13, color: colors.onDark.text82 }}>{c}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={{ paddingHorizontal: 18, paddingTop: 16, paddingBottom: 12 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: colors.onDark.text10,
                backgroundColor: 'rgba(255,255,255,0.04)',
                paddingVertical: 11,
                paddingHorizontal: 12,
                paddingLeft: 16,
              }}
            >
              <TextInput
                value={state.draft}
                onChangeText={setDraft}
                onSubmitEditing={() => send()}
                placeholder="Escribe o mantén el micrófono…"
                placeholderTextColor="rgba(255,255,255,0.35)"
                style={{ flex: 1, fontFamily: fonts.plexRegular, fontSize: 14.5, color: colors.text }}
              />
              <Pressable
                onPress={toggleMic}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 13,
                  borderWidth: 1,
                  borderColor: state.mic ? 'rgba(232,32,58,0.5)' : colors.onDark.text12,
                  backgroundColor: state.mic ? 'rgba(232,32,58,0.22)' : 'rgba(255,255,255,0.05)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconMic color={state.mic ? colors.redSoft : 'rgba(255,255,255,0.7)'} />
              </Pressable>
              <Pressable onPress={() => send()}>
                <LinearGradient
                  colors={gradients.button}
                  start={{ x: 0.15, y: 0 }}
                  end={{ x: 0.85, y: 1 }}
                  style={{ width: 36, height: 36, borderRadius: 13, alignItems: 'center', justifyContent: 'center' }}
                >
                  <IconSend />
                </LinearGradient>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Screen>
  );
}
