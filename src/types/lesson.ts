export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface CommandBreakdown {
  command: string;
  explanation: string;
  syntax: string;
  commonFlags?: { flag: string; description: string }[];
  visualFlow?: string; // description of what travels where
  exampleOutput?: string;
  dangerLevel?: 'safe' | 'caution' | 'destructive';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface InteractiveChallenge {
  id: string;
  title: string;
  instruction: string;
  hint: string;
  expectedCommands: string[]; // one of these or validated via repo state
  verificationFnName?: string;
  initialScenario?: string;
  solutionCommand: string;
}

export interface Lesson {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  moduleIndex: number;
  difficulty: DifficultyLevel;
  estimatedMinutes: number;
  
  // Non-tech Metaphor
  metaphor: {
    title: string;
    analogy: string; // e.g. "Cooking in a kitchen", "A video game save checkpoint"
    illustrationIcon: string;
    realWorldScenario: string;
    comparisonTable?: { nonTech: string; gitConcept: string }[];
  };

  // Deep dive tech explanation
  technicalExplanation: string[];

  // 4 Stages Pipeline visualization notes
  flowStep?: {
    from: 'Working Directory' | 'Staging Area' | 'Local Repo' | 'Remote' | 'Branch';
    to: 'Working Directory' | 'Staging Area' | 'Local Repo' | 'Remote' | 'Branch';
    label: string;
    description: string;
  };

  // Commands taught in this lesson
  commands: CommandBreakdown[];

  // Best practices & common traps
  proTips: string[];
  commonGotchas: string[];

  // Practice Challenge
  challenge?: InteractiveChallenge;

  // Quiz questions
  quiz?: QuizQuestion[];
}

export interface LessonModule {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: string;
  difficulty: DifficultyLevel;
  lessons: Lesson[];
}

