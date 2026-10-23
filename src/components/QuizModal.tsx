import React, { useState } from 'react';
import { QuizQuestion } from '../types/lesson';
import { HelpCircle, CheckCircle2, XCircle, Award, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizModalProps {
  questions: QuizQuestion[];
  lessonTitle: string;
  onClose: () => void;
  onPassQuiz: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  questions,
  lessonTitle,
  onClose,
  onPassQuiz
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (showAnswer) return;
    setSelectedOption(idx);
    setShowAnswer(true);

    if (idx === currentQ.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    } else {
      setIsFinished(true);
      const passed = score + (selectedOption === currentQ.correctIndex ? 0 : 0) >= Math.ceil(questions.length / 2);
      if (passed) {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
        onPassQuiz();
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">Knowledge Check</h3>
              <p className="text-xs text-slate-400 truncate max-w-[260px]">{lessonTitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800 text-xs font-semibold"
          >
            ✕
          </button>
        </div>

        {isFinished ? (
          /* Finished Screen */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto shadow-lg">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-100">
                Quiz Completed!
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                You scored <strong className="text-orange-400 font-mono text-base">{score}</strong> out of <strong className="font-mono text-base">{questions.length}</strong> questions correct!
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-3">
              <button
                onClick={handleRestart}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>
              <button
                onClick={onClose}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-colors shadow-md shadow-orange-600/30"
              >
                <span>Continue Learning</span>
              </button>
            </div>
          </div>
        ) : (
          /* Question Screen */
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Question {currentIndex + 1} of {questions.length}</span>
              <span className="text-orange-400 font-bold">Score: {score}</span>
            </div>

            <h4 className="text-sm lg:text-base font-bold text-slate-100 leading-snug">
              {currentQ.question}
            </h4>

            {/* Options */}
            <div className="space-y-2">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;
                let optionStyle = 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-200';

                if (showAnswer) {
                  if (isCorrect) {
                    optionStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-semibold';
                  } else if (isSelected) {
                    optionStyle = 'bg-rose-950/40 border-rose-500 text-rose-200';
                  } else {
                    optionStyle = 'bg-slate-950/40 border-slate-900 text-slate-500';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={showAnswer}
                    className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-start justify-between gap-3 ${optionStyle}`}
                  >
                    <span>{option}</span>
                    {showAnswer && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    )}
                    {showAnswer && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation reveal */}
            {showAnswer && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed animate-fadeIn">
                <span className="font-bold text-orange-400 mr-1">Explanation:</span>
                {currentQ.explanation}
              </div>
            )}

            {/* Next button */}
            {showAnswer && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-all shadow-md shadow-orange-600/30"
                >
                  <span>{currentIndex + 1 < questions.length ? 'Next Question' : 'View Results'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

