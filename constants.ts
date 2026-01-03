
import { TenseCategory, TenseStatus, TenseInfo, QuizQuestion } from './types';

export const INITIAL_TENSES: TenseInfo[] = [
  // 現在式系列
  {
    id: 'pres_simple',
    name: '現在簡單式',
    englishName: 'Simple Present',
    category: TenseCategory.PRESENT,
    example: 'I eat apple every day.',
    status: TenseStatus.UNLOCKED,
    progress: 0,
    formula: 'S + V(s/es)',
    definition: '表達一般性的事實、反覆發生的習慣或永恆的真理。'
  },
  {
    id: 'pres_cont',
    name: '現在進行式',
    englishName: 'Present Continuous',
    category: TenseCategory.PRESENT,
    example: 'I am eating now.',
    status: TenseStatus.IN_PROGRESS,
    progress: 45,
    formula: 'be (am/is/are) + V-ing',
    definition: '表達說話當下正在進行的動作，或現階段暫時的情況。'
  },
  {
    id: 'pres_perf',
    name: '現在完成式',
    englishName: 'Present Perfect',
    category: TenseCategory.PRESENT,
    example: 'I have eaten.',
    status: TenseStatus.UNLOCKED,
    progress: 0,
    formula: 'have/has + p.p.',
    definition: '過去發生但對現在造成影響的動作，或動作從過去持續到現在。'
  },
  {
    id: 'pres_perf_cont',
    name: '現在完成進行式',
    englishName: 'Present Perfect Continuous',
    category: TenseCategory.PRESENT,
    example: 'I have been eating for an hour.',
    status: TenseStatus.LOCKED,
    progress: 0,
    formula: 'have/has + been + V-ing',
    definition: '強調動作從過去某個時間點開始，一直持續到現在，且可能還在繼續。'
  },
  // 過去式系列
  {
    id: 'past_simple',
    name: '過去簡單式',
    englishName: 'Simple Past',
    category: TenseCategory.PAST,
    example: 'I ate an apple yesterday.',
    status: TenseStatus.MASTERED,
    progress: 100,
    formula: 'S + V-ed',
    definition: '表達過去某個特定時間點發生並已結束的動作。'
  },
  {
    id: 'past_cont',
    name: '過去進行式',
    englishName: 'Past Continuous',
    category: TenseCategory.PAST,
    example: 'I was eating when you called.',
    status: TenseStatus.UNLOCKED,
    progress: 0,
    formula: 'was/were + V-ing',
    definition: '描述過去某個特定時刻正在進行的動作。'
  },
  {
    id: 'past_perf',
    name: '過去完成式',
    englishName: 'Past Perfect',
    category: TenseCategory.PAST,
    example: 'I had eaten before he arrived.',
    status: TenseStatus.LOCKED,
    progress: 0,
    formula: 'had + p.p.',
    definition: '表示在過去某個動作或時間點之前已經完成的動作（過去的過去）。'
  },
  {
    id: 'past_perf_cont',
    name: '過去完成進行式',
    englishName: 'Past Perfect Continuous',
    category: TenseCategory.PAST,
    example: 'I had been eating for hours.',
    status: TenseStatus.LOCKED,
    progress: 0,
    formula: 'had + been + V-ing',
    definition: '表示在過去某個時間點之前，一直在持續進行的動作。'
  },
  // 未來式系列
  {
    id: 'fut_simple',
    name: '未來簡單式',
    englishName: 'Simple Future',
    category: TenseCategory.FUTURE,
    example: 'I will eat later.',
    status: TenseStatus.UNLOCKED,
    progress: 0,
    formula: 'will + V / be going to + V',
    definition: '預測未來、表達未來的意圖或計畫。'
  },
  {
    id: 'fut_cont',
    name: '未來進行式',
    englishName: 'Future Continuous',
    category: TenseCategory.FUTURE,
    example: 'I will be eating at 8 PM.',
    status: TenseStatus.LOCKED,
    progress: 0,
    formula: 'will + be + V-ing',
    definition: '表示未來某個特定時間點正在進行的動作。'
  },
  {
    id: 'fut_perf',
    name: '未來完成式',
    englishName: 'Future Perfect',
    category: TenseCategory.FUTURE,
    example: 'I will have eaten by then.',
    status: TenseStatus.LOCKED,
    progress: 0,
    formula: 'will + have + p.p.',
    definition: '表示在未來某個時間點之前將會完成的動作。'
  },
  {
    id: 'fut_perf_cont',
    name: '未來完成進行式',
    englishName: 'Future Perfect Continuous',
    category: TenseCategory.FUTURE,
    example: 'I will have been eating for 2 hours.',
    status: TenseStatus.LOCKED,
    progress: 0,
    formula: 'will + have + been + V-ing',
    definition: '表示在未來某個時間點時，某個動作已經持續進行了多久。'
  }
];

export const SAMPLE_QUIZ: QuizQuestion[] = []; // 改為動態生成，此處留空
