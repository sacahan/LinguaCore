
export enum TenseCategory {
  PRESENT = '現在式',
  PAST = '過去式',
  FUTURE = '未來式'
}

export enum TenseStatus {
  LOCKED = 'LOCKED',
  UNLOCKED = 'UNLOCKED',
  IN_PROGRESS = 'IN_PROGRESS',
  MASTERED = 'MASTERED'
}

export interface TenseInfo {
  id: string;
  name: string;
  englishName: string;
  category: TenseCategory;
  example: string;
  status: TenseStatus;
  progress: number; // 0-100
  formula: string;
  definition: string;
}

export interface QuizQuestion {
  id: string;
  sentence: string;
  correctAnswer: string;
  options: string[];
  translation: string;
  tenseId: string;
}

export interface UserStats {
  streak: number;
  masteryRate: number;
  completedExercises: number;
  totalTime: string;
  level: number;
  rank: string;
}
