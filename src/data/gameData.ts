export interface Question {
  word: string;
  options: string[];
  correctAnswer: string;
  level: number;
}

export interface Level {
  id: number;
  name: string;
  questions: Question[];
  difficulty: 'easy' | 'medium' | 'hard' | 'expert' | 'impossible';
}

export const gameData: Level[] = [
  {
    id: 1,
    name: "Basic Synonyms",
    difficulty: 'easy',
    questions: [
      { word: "FAST", options: ["SLOW", "QUICK", "HEAVY"], correctAnswer: "QUICK", level: 1 },
      { word: "BIG", options: ["SMALL", "LARGE", "TINY"], correctAnswer: "LARGE", level: 1 },
      { word: "HOT", options: ["COLD", "WARM", "FREEZING"], correctAnswer: "WARM", level: 1 },
      { word: "HAPPY", options: ["SAD", "JOYFUL", "ANGRY"], correctAnswer: "JOYFUL", level: 1 },
      { word: "LIGHT", options: ["DARK", "BRIGHT", "DIM"], correctAnswer: "BRIGHT", level: 1 }
    ]
  },
  {
    id: 2,
    name: "Simple Opposites",
    difficulty: 'easy',
    questions: [
      { word: "UP", options: ["DOWN", "HIGH", "ABOVE"], correctAnswer: "DOWN", level: 2 },
      { word: "YES", options: ["NO", "SURE", "AGREE"], correctAnswer: "NO", level: 2 },
      { word: "DAY", options: ["NIGHT", "MORNING", "SUN"], correctAnswer: "NIGHT", level: 2 },
      { word: "LOVE", options: ["HATE", "LIKE", "ADORE"], correctAnswer: "HATE", level: 2 },
      { word: "LIVE", options: ["DIE", "EXIST", "BREATHE"], correctAnswer: "DIE", level: 2 }
    ]
  },
  {
    id: 3,
    name: "Color Associations",
    difficulty: 'medium',
    questions: [
      { word: "SUN", options: ["YELLOW", "BLUE", "GREEN"], correctAnswer: "YELLOW", level: 3 },
      { word: "GRASS", options: ["GREEN", "RED", "PURPLE"], correctAnswer: "GREEN", level: 3 },
      { word: "BLOOD", options: ["RED", "BLUE", "YELLOW"], correctAnswer: "RED", level: 3 },
      { word: "SKY", options: ["BLUE", "GREEN", "ORANGE"], correctAnswer: "BLUE", level: 3 },
      { word: "SNOW", options: ["WHITE", "BLACK", "GRAY"], correctAnswer: "WHITE", level: 3 }
    ]
  },
  {
    id: 4,
    name: "Animal Sounds",
    difficulty: 'medium',
    questions: [
      { word: "DOG", options: ["BARK", "MEOW", "MOO"], correctAnswer: "BARK", level: 4 },
      { word: "CAT", options: ["MEOW", "WOOF", "ROAR"], correctAnswer: "MEOW", level: 4 },
      { word: "COW", options: ["MOO", "BARK", "CHIRP"], correctAnswer: "MOO", level: 4 },
      { word: "LION", options: ["ROAR", "MEOW", "BARK"], correctAnswer: "ROAR", level: 4 },
      { word: "BIRD", options: ["CHIRP", "MOO", "ROAR"], correctAnswer: "CHIRP", level: 4 }
    ]
  },
  {
    id: 5,
    name: "Body Parts",
    difficulty: 'medium',
    questions: [
      { word: "EYE", options: ["SEE", "HEAR", "SMELL"], correctAnswer: "SEE", level: 5 },
      { word: "EAR", options: ["HEAR", "SEE", "TASTE"], correctAnswer: "HEAR", level: 5 },
      { word: "NOSE", options: ["SMELL", "HEAR", "SEE"], correctAnswer: "SMELL", level: 5 },
      { word: "TONGUE", options: ["TASTE", "HEAR", "SEE"], correctAnswer: "TASTE", level: 5 },
      { word: "HAND", options: ["TOUCH", "HEAR", "SEE"], correctAnswer: "TOUCH", level: 5 }
    ]
  },
  {
    id: 6,
    name: "Weather Patterns",
    difficulty: 'hard',
    questions: [
      { word: "RAIN", options: ["WET", "DRY", "HOT"], correctAnswer: "WET", level: 6 },
      { word: "WIND", options: ["BLOW", "STILL", "QUIET"], correctAnswer: "BLOW", level: 6 },
      { word: "STORM", options: ["WILD", "CALM", "PEACEFUL"], correctAnswer: "WILD", level: 6 },
      { word: "FOG", options: ["BLUR", "CLEAR", "SHARP"], correctAnswer: "BLUR", level: 6 },
      { word: "FROST", options: ["COLD", "HOT", "WARM"], correctAnswer: "COLD", level: 6 }
    ]
  },
  {
    id: 7,
    name: "Emotions & Feelings",
    difficulty: 'hard',
    questions: [
      { word: "FEAR", options: ["SCARED", "BRAVE", "HAPPY"], correctAnswer: "SCARED", level: 7 },
      { word: "ANGER", options: ["MAD", "CALM", "PEACEFUL"], correctAnswer: "MAD", level: 7 },
      { word: "SURPRISE", options: ["SHOCK", "EXPECT", "KNOW"], correctAnswer: "SHOCK", level: 7 },
      { word: "EXCITEMENT", options: ["THRILL", "BORED", "TIRED"], correctAnswer: "THRILL", level: 7 },
      { word: "WORRY", options: ["ANXIOUS", "RELAXED", "CALM"], correctAnswer: "ANXIOUS", level: 7 }
    ]
  },
  {
    id: 8,
    name: "Abstract Concepts",
    difficulty: 'expert',
    questions: [
      { word: "TIME", options: ["CLOCK", "SPACE", "SOUND"], correctAnswer: "CLOCK", level: 8 },
      { word: "DREAMS", options: ["SLEEP", "AWAKE", "WORK"], correctAnswer: "SLEEP", level: 8 },
      { word: "MUSIC", options: ["SOUND", "SILENCE", "VISION"], correctAnswer: "SOUND", level: 8 },
      { word: "MEMORY", options: ["PAST", "FUTURE", "NOW"], correctAnswer: "PAST", level: 8 },
      { word: "HOPE", options: ["FUTURE", "PAST", "NOW"], correctAnswer: "FUTURE", level: 8 }
    ]
  },
  {
    id: 9,
    name: "Complex Associations",
    difficulty: 'expert',
    questions: [
      { word: "BUTTERFLY", options: ["CHANGE", "STAY", "STOP"], correctAnswer: "CHANGE", level: 9 },
      { word: "OCEAN", options: ["DEEP", "SHALLOW", "SMALL"], correctAnswer: "DEEP", level: 9 },
      { word: "MOUNTAIN", options: ["HIGH", "LOW", "FLAT"], correctAnswer: "HIGH", level: 9 },
      { word: "FIRE", options: ["BURN", "FREEZE", "WET"], correctAnswer: "BURN", level: 9 },
      { word: "ICE", options: ["COLD", "HOT", "WARM"], correctAnswer: "COLD", level: 9 }
    ]
  },
  {
    id: 10,
    name: "Impossible Connections",
    difficulty: 'impossible',
    questions: [
      { word: "SILENCE", options: ["LOUD", "QUIET", "SOUND"], correctAnswer: "QUIET", level: 10 },
      { word: "DARKNESS", options: ["LIGHT", "DARK", "BRIGHT"], correctAnswer: "LIGHT", level: 10 },
      { word: "EMPTINESS", options: ["FULL", "EMPTY", "WHOLE"], correctAnswer: "FULL", level: 10 },
      { word: "INFINITY", options: ["ENDLESS", "FINITE", "LIMITED"], correctAnswer: "ENDLESS", level: 10 },
      { word: "NOTHING", options: ["SOMETHING", "EVERYTHING", "ZERO"], correctAnswer: "SOMETHING", level: 10 }
    ]
  }
];

// Bull Rush mode uses all 50 questions from all levels
export const bullRushQuestions: Question[] = gameData.flatMap(level => level.questions);

export interface GameStats {
  totalScore: number;
  levelsCompleted: number;
  bullRushCompleted: boolean;
  bullRushBestScore: number;
  totalQuestionsAnswered: number;
  correctAnswers: number;
  averageTime: number;
}

