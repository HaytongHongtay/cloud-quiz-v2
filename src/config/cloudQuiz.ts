export type CloudKey = 'CUMULUS' | 'STRATUS' | 'CIRRUS' | 'NIMBUS';

export const cloudQuiz = {
  id: 'cloud-types-v1',
  intro: {
    title: 'What cloud are you today?',
    lead: "Imagine you're floating in the sky… let the breeze guide your choices.",
  },
  betweenPrompts: [
    'Close your eyes. A light wind nudges you east…',
    'The sun peeks through. Shapes swirl around you…',
    'A soft rumble in the distance. How do you feel?',
  ],
  questions: [
    {
      id: 'q1',
      text: 'Pick your sky right now:',
      options: [
        { id: 'a', label: 'Clear blue and calm', scores: { CIRRUS: 2 } },
        { id: 'b', label: 'Fluffy and playful', scores: { CUMULUS: 2 } },
        { id: 'c', label: 'Soft blanket, steady', scores: { STRATUS: 2 } },
        { id: 'd', label: 'Moody, powerful', scores: { NIMBUS: 2 } },
      ],
    },
    {
      id: 'q2',
      text: 'Your friends need a plan. You…',
      options: [
        { id: 'a', label: 'Spark ideas then float along', scores: { CIRRUS: 2, CUMULUS: 1 } },
        { id: 'b', label: 'Bring energy and fun', scores: { CUMULUS: 2 } },
        { id: 'c', label: 'Keep things consistent', scores: { STRATUS: 2 } },
        { id: 'd', label: 'Take charge when it matters', scores: { NIMBUS: 2 } },
      ],
    },
    {
      id: 'q3',
      text: 'When plans change you…',
      options: [
        { id: 'a', label: 'Adapt and stay light', scores: { CIRRUS: 2 } },
        { id: 'b', label: 'Find a new playful route', scores: { CUMULUS: 2 } },
        { id: 'c', label: 'Stabilize everyone', scores: { STRATUS: 2 } },
        { id: 'd', label: 'Drive through and deliver', scores: { NIMBUS: 2 } },
      ],
    },
    {
      id: 'q4',
      text: 'Choose a motto:',
      options: [
        { id: 'a', label: 'Go with the flow', scores: { CIRRUS: 2 } },
        { id: 'b', label: 'Make it fun', scores: { CUMULUS: 2 } },
        { id: 'c', label: 'Keep it steady', scores: { STRATUS: 2 } },
        { id: 'd', label: 'Own the storm', scores: { NIMBUS: 2 } },
      ],
    },
  ],
  results: {
    CUMULUS: { title: 'CUMULUS', emoji: '☁️', desc: 'Playful, uplifting, you bring brightness wherever you go.', palette: { bg: '#E6F3FF', fg: '#0ea5e9' } },
    STRATUS: { title: 'STRATUS', emoji: '🌫️', desc: 'Grounding and calm, you keep the world steady.', palette: { bg: '#F1F5F9', fg: '#334155' } },
    CIRRUS:  { title: 'CIRRUS',  emoji: '🌤️', desc: 'Light and visionary, you see patterns others miss.', palette: { bg: '#F0F9FF', fg: '#0284c7' } },
    NIMBUS:  { title: 'NIMBUS',  emoji: '⛈️', desc: 'Focused and powerful, you deliver when it counts.', palette: { bg: '#E5E7EB', fg: '#111827' } },
  },
} as const;