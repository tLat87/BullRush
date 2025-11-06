export interface DreamStep {
  id: string;
  text: string;
  duration: number; // in seconds
  type: 'preparation' | 'induction' | 'lucid' | 'recall' | 'analysis';
  audio?: string;
}

export interface DreamTechnique {
  id: number;
  name: string;
  description: string;
  steps: DreamStep[];
  duration: number; // total duration in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'master';
  category: 'lucid-dreaming' | 'dream-recall' | 'reality-check' | 'dream-journal' | 'sleep-hygiene';
}

export const dreamTechniques: DreamTechnique[] = [
  {
    id: 1,
    name: "Reality Check Training",
    description: "Develop awareness to recognize when you're dreaming",
    duration: 10,
    difficulty: 'beginner',
    category: 'reality-check',
    steps: [
      { id: 'intro', text: "Find a quiet space and get comfortable", duration: 30, type: 'preparation' },
      { id: 'check1', text: "Look at your hands - count your fingers", duration: 20, type: 'reality-check' },
      { id: 'check2', text: "Try to push your finger through your palm", duration: 20, type: 'reality-check' },
      { id: 'check3', text: "Look at a clock, look away, look back", duration: 20, type: 'reality-check' },
      { id: 'repeat', text: "Practice these checks throughout the day", duration: 180, type: 'induction' },
      { id: 'close', text: "Set intention to do reality checks in dreams", duration: 30, type: 'preparation' }
    ]
  },
  {
    id: 2,
    name: "Dream Recall Enhancement",
    description: "Improve your ability to remember dreams",
    duration: 15,
    difficulty: 'beginner',
    category: 'dream-recall',
    steps: [
      { id: 'intro', text: "Lie down and prepare for sleep", duration: 30, type: 'preparation' },
      { id: 'intention', text: "Set strong intention to remember your dreams", duration: 60, type: 'induction' },
      { id: 'visualize', text: "Imagine waking up and writing in your dream journal", duration: 90, type: 'induction' },
      { id: 'anchor', text: "Create a mental anchor to trigger dream recall", duration: 90, type: 'induction' },
      { id: 'repeat', text: "Repeat your intention three times", duration: 120, type: 'induction' },
      { id: 'sleep', text: "Drift into sleep with dream recall in mind", duration: 180, type: 'induction' }
    ]
  },
  {
    id: 3,
    name: "Wake-Back-to-Bed",
    description: "Advanced technique for inducing lucid dreams",
    duration: 30,
    difficulty: 'advanced',
    category: 'lucid-dreaming',
    steps: [
      { id: 'intro', text: "Set alarm for 4-6 hours after bedtime", duration: 30, type: 'preparation' },
      { id: 'wake', text: "Wake up and stay awake for 20-30 minutes", duration: 60, type: 'induction' },
      { id: 'activity', text: "Do a quiet activity like reading about dreams", duration: 300, type: 'induction' },
      { id: 'return', text: "Return to bed with lucid dreaming intention", duration: 60, type: 'induction' },
      { id: 'visualize', text: "Visualize becoming lucid in your next dream", duration: 180, type: 'lucid' },
      { id: 'sleep', text: "Fall asleep while maintaining awareness", duration: 300, type: 'lucid' }
    ]
  },
  {
    id: 4,
    name: "Mnemonic Induction",
    description: "Use memory techniques to trigger lucid dreams",
    duration: 20,
    difficulty: 'intermediate',
    category: 'lucid-dreaming',
    steps: [
      { id: 'intro', text: "Get comfortable and close your eyes", duration: 30, type: 'preparation' },
      { id: 'phrase', text: "Repeat: 'Next time I'm dreaming, I will remember I'm dreaming'", duration: 120, type: 'induction' },
      { id: 'visualize', text: "Visualize yourself becoming lucid in a dream", duration: 180, type: 'lucid' },
      { id: 'scenario', text: "Imagine a specific dream scenario where you become lucid", duration: 180, type: 'lucid' },
      { id: 'repeat', text: "Repeat the phrase 20 times with full attention", duration: 300, type: 'induction' },
      { id: 'sleep', text: "Fall asleep while repeating the phrase", duration: 180, type: 'induction' }
    ]
  },
  {
    id: 5,
    name: "Dream Journal Analysis",
    description: "Analyze patterns in your dreams for insights",
    duration: 25,
    difficulty: 'expert',
    category: 'dream-journal',
    steps: [
      { id: 'intro', text: "Gather your recent dream journal entries", duration: 30, type: 'preparation' },
      { id: 'read', text: "Read through your dreams from the past week", duration: 300, type: 'analysis' },
      { id: 'patterns', text: "Look for recurring themes, symbols, or emotions", duration: 180, type: 'analysis' },
      { id: 'meanings', text: "Consider what these patterns might represent", duration: 180, type: 'analysis' },
      { id: 'insights', text: "Write down any insights or realizations", duration: 120, type: 'analysis' },
      { id: 'intention', text: "Set intention to explore these themes in future dreams", duration: 60, type: 'preparation' }
    ]
  }
];

// Reality check exercises for quick sessions
export const realityCheckExercises: DreamStep[] = [
  { id: 'hand1', text: "Look at your hands - count your fingers", duration: 5, type: 'reality-check' },
  { id: 'hand2', text: "Try to push finger through palm", duration: 5, type: 'reality-check' },
  { id: 'clock1', text: "Look at a clock, look away, look back", duration: 5, type: 'reality-check' },
  { id: 'jump1', text: "Try to jump and float in the air", duration: 5, type: 'reality-check' }
];

export interface DreamStats {
  totalDreams: number;
  lucidDreams: number;
  dreamRecallRate: number;
  currentStreak: number;
  longestStreak: number;
  techniquesCompleted: number;
  favoriteCategory: string;
  averageDreamLength: number;
  lastDreamDate: string;
  realityChecksToday: number;
}

