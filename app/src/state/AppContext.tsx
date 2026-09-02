import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type ToneDef = { name: string; desc: string };
export type FreqKey = 'dia' | 'semana' | 'quincena' | 'mes';
export type FreqDef = { key: FreqKey; label: string; next: string };
export type ChatMessage = { who: 'bot' | 'me'; text: string };
export type AlarmInfo = { time: string; mer: string; day: string; in: string };

export const TONES: ToneDef[] = [
  { name: 'Nebulosa', desc: 'Pulso lento, graves suaves' },
  { name: 'Vibranium', desc: 'Percusión metálica contenida' },
  { name: 'Ruido blanco', desc: 'Estático cálido, sin picos' },
  { name: 'Cuerdas al alba', desc: 'Ascenso orquestal de 40 s' },
  { name: 'Personalizado', desc: 'Creado por el asistente · Ambiental estilo Wakanda' },
];

export const FREQS: FreqDef[] = [
  { key: 'dia', label: 'Cada día', next: 'mañana a las 06:40' },
  { key: 'semana', label: 'Cada semana', next: 'lunes 8 de septiembre' },
  { key: 'quincena', label: 'Cada 15 días', next: 'lunes 15 de septiembre' },
  { key: 'mes', label: 'Cada mes', next: '1 de octubre' },
];

export const CHIPS = [
  'Ambiental estilo Wakanda',
  'Ruido blanco suave inspirado en anime',
  'Cambiar horario de alarma',
  'Tono inspirado en los Simpson',
  'Revisar mi calendario',
];

export const REPLIES: Record<string, string> = {
  'Ambiental estilo Wakanda':
    'Listo: percusión profunda y coro bajo, volumen máximo al 40 %. Lo dejo como tono ambiental de la subida de luz.',
  'Ruido blanco suave inspirado en anime':
    'Puse un lecho de ruido blanco con lluvia lejana. Se apagará solo 45 minutos después de que te duermas.',
  'Cambiar horario de alarma': '¿Para qué hora la muevo? Puedes decirme algo como "mañana a las 5:15".',
  'Tono inspirado en los Simpson':
    'Armé una versión suave del tema de los Simpson: solo vientos y xilófono, sin metales. Queda guardado como tono Personalizado.',
  'Revisar mi calendario':
    'Tienes un vuelo el jueves a las 5:00 a.m. y una reunión el viernes a las 9:00. ¿Programo alarmas para ambos?',
};

const RISE_MIN = 10;
const RISE_MAX = 300;
const CHARGE_MIN = 30;
const CHARGE_MAX = 360;

type AppState = {
  rise: number;
  charge: number;
  tone: string;
  rotation: boolean;
  freq: FreqKey;
  suggestionOpen: boolean;
  alarm: AlarmInfo;
  mic: boolean;
  draft: string;
  messages: ChatMessage[];
  deviceBattery: number;
};

type AppContextValue = {
  state: AppState;
  riseLabel: string;
  chargeLabel: string;
  rotationNote: string;
  risePct: number;
  chargePct: number;
  nextRotation: string;
  setRise: (v: number) => void;
  setCharge: (v: number) => void;
  setTone: (name: string) => void;
  toggleRotation: () => void;
  setFreq: (key: FreqKey) => void;
  acceptSuggestion: () => void;
  dismissSuggestion: () => void;
  toggleMic: () => void;
  setDraft: (text: string) => void;
  send: (text?: string) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>({
    rise: 45,
    charge: 120,
    tone: 'Nebulosa',
    rotation: true,
    freq: 'semana',
    suggestionOpen: true,
    alarm: { time: '06:40', mer: 'a.m.', day: 'Mañana, miércoles', in: '8 h 12 min' },
    mic: false,
    draft: '',
    deviceBattery: 82,
    messages: [
      {
        who: 'bot',
        text: 'Buenas noches. La mesita está cargada y la alarma de mañana sigue en pie. ¿Qué ajustamos?',
      },
    ],
  });

  const setRise = useCallback((v: number) => setState((s) => ({ ...s, rise: clamp(v, RISE_MIN, RISE_MAX) })), []);
  const setCharge = useCallback(
    (v: number) => setState((s) => ({ ...s, charge: clamp(v, CHARGE_MIN, CHARGE_MAX) })),
    []
  );
  const setTone = useCallback((name: string) => setState((s) => ({ ...s, tone: name })), []);
  const toggleRotation = useCallback(() => setState((s) => ({ ...s, rotation: !s.rotation })), []);
  const setFreq = useCallback((key: FreqKey) => setState((s) => ({ ...s, freq: key })), []);
  const acceptSuggestion = useCallback(
    () =>
      setState((s) => ({
        ...s,
        suggestionOpen: false,
        alarm: { time: '05:00', mer: 'a.m.', day: 'Jueves · vuelo', in: '2 d 6 h' },
      })),
    []
  );
  const dismissSuggestion = useCallback(() => setState((s) => ({ ...s, suggestionOpen: false })), []);
  const toggleMic = useCallback(() => setState((s) => ({ ...s, mic: !s.mic })), []);
  const setDraft = useCallback((text: string) => setState((s) => ({ ...s, draft: text })), []);
  const send = useCallback((text?: string) => {
    setState((s) => {
      const said = (text ?? s.draft).trim();
      if (!said) return s;
      const reply = REPLIES[said] || 'Entendido. Lo aplico en la mesita ahora mismo.';
      return {
        ...s,
        draft: '',
        messages: [...s.messages, { who: 'me', text: said }, { who: 'bot', text: reply }],
      };
    });
  }, []);

  const riseLabel = `${state.rise} s`;
  const h = Math.floor(state.charge / 60);
  const m = state.charge % 60;
  const chargeLabel = m === 0 ? `${h} h` : h > 0 ? `${h} h ${m}` : `${m} min`;
  const activeFreq = FREQS.find((f) => f.key === state.freq) ?? FREQS[0];
  const rotationNote = state.rotation ? ` · rota ${activeFreq.label.toLowerCase()}` : '';
  const risePct = (state.rise - RISE_MIN) / (RISE_MAX - RISE_MIN);
  const chargePct = (state.charge - CHARGE_MIN) / (CHARGE_MAX - CHARGE_MIN);

  const value = useMemo<AppContextValue>(
    () => ({
      state,
      riseLabel,
      chargeLabel,
      rotationNote,
      risePct,
      chargePct,
      nextRotation: activeFreq.next,
      setRise,
      setCharge,
      setTone,
      toggleRotation,
      setFreq,
      acceptSuggestion,
      dismissSuggestion,
      toggleMic,
      setDraft,
      send,
    }),
    [state, riseLabel, chargeLabel, rotationNote, risePct, chargePct, activeFreq]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export const SLIDER_RANGES = { RISE_MIN, RISE_MAX, CHARGE_MIN, CHARGE_MAX };
