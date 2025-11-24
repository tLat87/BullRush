import { DreamStats } from './gameData';

export interface NightlyRitual {
  id: string;
  title: string;
  duration: number;
  benefit: string;
  steps: string[];
  progress: number;
}

export interface PracticeModule {
  id: string;
  title: string;
  duration: string;
  focus: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number;
  badge: string;
  color: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  mood: 'Calm' | 'Curious' | 'Energized' | 'Restless';
  tags: string[];
  note: string;
  createdAt: string;
  energy: number;
  lucid: boolean;
  favorite?: boolean;
}

export interface InsightPulse {
  label: string;
  value: number;
  color: string;
}

export const nightlyRituals: NightlyRitual[] = [
  {
    id: 'breath-sync',
    title: 'Breath Sync',
    duration: 6,
    benefit: 'Releases evening tension',
    steps: ['Inhale 4s', 'Hold 4s', 'Exhale 6s', 'Repeat 6 times'],
    progress: 35,
  },
  {
    id: 'journal-prime',
    title: 'Dream Prime',
    duration: 10,
    benefit: 'Primes the subconscious',
    steps: ['Visualize the dream', 'log a theme', 'Set one question', 'Let thoughts fade'],
    progress: 60,
  },
  {
    id: 'reality-loop',
    title: 'Reality Loop',
    duration: 5,
    benefit: 'Builds lucid awareness',
    steps: ['Check your hands', 'Ask “am I dreaming?”', 'Do a light hop'],
    progress: 20,
  },
];

export const practiceModules: PracticeModule[] = [
  {
    id: 'lucid-foundations',
    title: 'Lucid Foundations',
    duration: '12 min',
    focus: 'Awareness',
    difficulty: 'Beginner',
    progress: 68,
    badge: 'Golden Dawn',
    color: '#FDD835',
  },
  {
    id: 'recall-lab',
    title: 'Recall Lab',
    duration: '18 min',
    focus: 'Dream Recall',
    difficulty: 'Intermediate',
    progress: 42,
    badge: 'Violet Echo',
    color: '#AB47BC',
  },
  {
    id: 'journey-architect',
    title: 'Journey Architect',
    duration: '25 min',
    focus: 'Dream Plotting',
    difficulty: 'Advanced',
    progress: 12,
    badge: 'Indigo Crest',
    color: '#5C6BC0',
  },
];

export const journalSeedEntries: JournalEntry[] = [
  {
    id: 'entry-1',
    title: 'Garden of Light',
    mood: 'Calm',
    tags: ['lucid', 'garden'],
    note: 'Floated above lanterns, talked with my guide and asked for advice.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    energy: 78,
    lucid: true,
    favorite: true,
  },
  {
    id: 'entry-2',
    title: 'City of Mirrors',
    mood: 'Curious',
    tags: ['urban', 'mirror'],
    note: 'Found a portal through a storefront, practiced stabilization—it worked.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    energy: 64,
    lucid: false,
  },
  {
    id: 'entry-3',
    title: 'Atlas of Rivers',
    mood: 'Energized',
    tags: ['water', 'flight'],
    note: 'Designed channels for the dream, saved the anchor symbol.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    energy: 85,
    lucid: true,
  },
];

export const insightPalette: InsightPulse[] = [
  { label: 'Focus', value: 86, color: '#FDD835' },
  { label: 'Calm', value: 74, color: '#7E57C2' },
  { label: 'Energy', value: 62, color: '#26C6DA' },
  { label: 'Readiness', value: 90, color: '#FFB74D' },
];

export const favoriteAffirmations: string[] = [
  'I choose to remember every dream.',
  'My mind stays clear even inside a dream.',
  'My intentions guide me to the right worlds.',
  'I own my dreams and emotions.',
];

export const deriveFocusFromStats = (stats: DreamStats): string => {
  if (stats.lucidDreams > stats.totalDreams * 0.6) {
    return 'Keep the lucid cadence and add new storylines tonight.';
  }
  if (stats.dreamRecallRate > 70) {
    return 'Expand the dream journal and connect themes for deeper insights.';
  }
  if (stats.currentStreak >= 7) {
    return 'You are on a streak—reinforce the evening rituals.';
  }
  return 'Focus on a gentle entry and breathing before sleep.';
};

