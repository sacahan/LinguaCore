
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { INITIAL_TENSES } from '../constants';
import { QuizQuestion, TenseStatus } from '../types';
import { generateQuizQuestion } from '../aiService';
import { syncService } from '../syncService';
import { useAuth } from '../contexts/AuthContext';

const Quiz: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5; // 每次練習 5 題
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [loading, setLoading] = useState(true);
  const [correctCount, setCorrectCount] = useState(0);

  const currentTense = INITIAL_TENSES.find(t => t.id === id);

  const fetchNewQuestion = async () => {
    if (!currentTense) return;
    setLoading(true);
    setQuestion(null);
    setSelectedAnswer(null);
    setIsAnswered(false);

    const result = await generateQuizQuestion(currentTense.englishName);
    if (result) {
      setQuestion({
        ...result,
        id: `q-${Date.now()}`,
        tenseId: currentTense.id
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNewQuestion();
  }, [id]);

  const handleSelectAnswer = (option: string) => {
    if (isAnswered) return; // 已經回答過就不再處理

    setSelectedAnswer(option);

    // 立即判定答案
    if (question && option === question.correctAnswer) {
      setCorrectCount(prev => prev + 1);
    }
    setIsAnswered(true);
  };

  const handleNext = async () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      fetchNewQuestion();
    } else {
      // 完成練習，更新進度
      setLoading(true);
      if (currentTense) {
        const localProgress = syncService.getLocalProgress();
        const existingTense = localProgress.find(t => t.id === id);
        const currentProgress = existingTense?.progress || 0;

        // 增加進度，正確率越高進度加越多 (假設滿分 5 題增加 20%)
        const increment = (correctCount / totalSteps) * 20;
        const newProgress = Math.min(Math.round(currentProgress + increment), 100);
        const newStatus = newProgress === 100 ? TenseStatus.MASTERED : TenseStatus.IN_PROGRESS;

        await syncService.updateTenseProgress(user?.id, currentTense.id, newProgress, newStatus);
      }
      navigate('/progress');
    }
  };

  const progress = (currentStep / totalSteps) * 100;

  return (
    <Layout title={currentTense?.name || "時態練習"} showBack>
      <div className="px-6 py-4">
        <div className="flex justify-between items-end mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">當前進度</span>
          <span className="text-sm font-bold text-primary">{currentStep}/{totalSteps}</span>
        </div>
        <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="px-6 py-4 min-h-[400px]">
        {loading || !question ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 py-20">
            <div className="size-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <p className="text-gray-400 font-medium animate-pulse">正在為您準備題目...</p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-between items-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                <span className="material-symbols-outlined text-[14px]">psychology</span>
                AI 智慧出題
              </span>
            </div>

            <div className="mb-10 min-h-[120px]">
              <h2 className="text-2xl font-semibold leading-tight tracking-tight text-white mb-3">
                {question.sentence.split('_____').map((part, i, arr) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className={`inline-block border-b-2 px-2 font-bold bg-primary/5 rounded-t-md min-w-[80px] text-center transition-colors ${
                        isAnswered
                          ? (selectedAnswer === question.correctAnswer ? 'text-green-500 border-green-500' : 'text-red-500 border-red-500')
                          : 'text-primary border-primary'
                      }`}>
                        {isAnswered ? question.correctAnswer : (selectedAnswer || '_____')}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </h2>
              <p className="text-sm text-gray-500 italic">({question.translation})</p>
            </div>

            <div className="space-y-3">
              {question.options.map((option) => {
                const isCorrect = option === question.correctAnswer;
                const isSelected = selectedAnswer === option;

                let btnClass = "border-transparent bg-surface-dark hover:border-gray-700";
                if (isSelected) btnClass = "border-primary bg-primary/10";
                if (isAnswered) {
                  if (isCorrect) btnClass = "border-green-500 bg-green-500/20";
                  else if (isSelected) btnClass = "border-red-500 bg-red-500/20";
                }

                return (
                  <button
                    key={option}
                    disabled={isAnswered || loading}
                    onClick={() => handleSelectAnswer(option)}
                    className={`w-full flex items-center p-4 rounded-xl border-2 transition-all ${btnClass}`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all ${
                      isSelected ? 'border-primary bg-primary' : 'border-gray-600'
                    } ${isAnswered && isCorrect ? 'border-green-500 bg-green-500' : ''}`}>
                      {(isSelected || (isAnswered && isCorrect)) && (
                        <span className="material-symbols-outlined text-white text-[14px]">
                          {isAnswered && !isCorrect && isSelected ? 'close' : 'check'}
                        </span>
                      )}
                    </div>
                    <span className="text-lg font-medium">{option}</span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-background-dark/95 backdrop-blur-lg border-t border-gray-800 px-6 py-6 pb-24 z-30">
        <button
          onClick={handleNext}
          disabled={!isAnswered || loading}
          className={`w-full flex items-center justify-center gap-2 font-bold text-lg py-4 px-6 rounded-2xl transition-all active:scale-[0.98] ${
            !isAnswered || loading ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-primary text-white shadow-lg shadow-primary/25 hover:bg-blue-600'
          }`}
        >
          <span>{loading ? (currentStep === totalSteps && isAnswered ? '處理中...' : '生成中...') : (currentStep === totalSteps ? '查看成果' : '下一題')}</span>
          {!loading && <span className="material-symbols-outlined text-[24px]">arrow_forward</span>}
        </button>
      </div>
    </Layout>
  );
};

export default Quiz;
