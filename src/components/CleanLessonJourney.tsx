import React, { useState } from 'react';
import { SIMPLE_CURRICULUM, SimpleLevel, SimpleStep } from '../data/simpleCurriculum';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  HelpCircle, 
  Award, 
  Copy, 
  Check, 
  Play, 
  Lightbulb,
  FilePlus,
  Package,
  Camera,
  GitBranch,
  Repeat,
  GitMerge,
  RotateCcw,
  Eye,
  Archive,
  UploadCloud,
  ShieldAlert,
  Sliders,
  Search,
  Laptop
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CleanLessonJourneyProps {
  onExecuteAction: (actionType: string, payload?: string) => void;
  completedStepIds: Set<string>;
  onMarkStepComplete: (stepId: string) => void;
}

const getActionIcon = (iconName: string) => {
  switch (iconName) {
    case 'FilePlus': return <FilePlus className="w-4 h-4" />;
    case 'Package': return <Package className="w-4 h-4" />;
    case 'Camera': return <Camera className="w-4 h-4" />;
    case 'GitBranch': return <GitBranch className="w-4 h-4" />;
    case 'Repeat': return <Repeat className="w-4 h-4" />;
    case 'GitMerge': return <GitMerge className="w-4 h-4" />;
    case 'RotateCcw': return <RotateCcw className="w-4 h-4" />;
    case 'Eye': return <Eye className="w-4 h-4" />;
    case 'Archive': return <Archive className="w-4 h-4" />;
    case 'UploadCloud': return <UploadCloud className="w-4 h-4" />;
    case 'ShieldAlert': return <ShieldAlert className="w-4 h-4" />;
    case 'Sliders': return <Sliders className="w-4 h-4" />;
    case 'Search': return <Search className="w-4 h-4" />;
    case 'Laptop': return <Laptop className="w-4 h-4" />;
    default: return <Sparkles className="w-4 h-4" />;
  }
};

export const CleanLessonJourney: React.FC<CleanLessonJourneyProps> = ({
  onExecuteAction,
  completedStepIds,
  onMarkStepComplete
}) => {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);

  const currentLevel: SimpleLevel = SIMPLE_CURRICULUM[currentLevelIndex] || SIMPLE_CURRICULUM[0];
  const currentStep: SimpleStep = currentLevel.steps[currentStepIndex] || currentLevel.steps[0];

  const isStepComplete = completedStepIds.has(currentStep.id);

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const handleRunInteractiveAction = () => {
    onExecuteAction(
      currentStep.interactiveAction.actionType,
      currentStep.interactiveAction.payload
    );
    onMarkStepComplete(currentStep.id);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handleNextStep = () => {
    setSelectedQuizAnswer(null);
    setShowQuizResult(false);

    if (currentStepIndex + 1 < currentLevel.steps.length) {
      setCurrentStepIndex(prev => prev + 1);
    } else if (currentLevelIndex + 1 < SIMPLE_CURRICULUM.length) {
      setCurrentLevelIndex(prev => prev + 1);
      setCurrentStepIndex(0);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    }
  };

  const handlePrevStep = () => {
    setSelectedQuizAnswer(null);
    setShowQuizResult(false);

    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    } else if (currentLevelIndex > 0) {
      setCurrentLevelIndex(prev => prev - 1);
      setCurrentStepIndex(SIMPLE_CURRICULUM[currentLevelIndex - 1].steps.length - 1);
    }
  };

  const handleQuizOption = (idx: number) => {
    setSelectedQuizAnswer(idx);
    setShowQuizResult(true);
    if (idx === currentStep.quickQuestion?.correctIndex) {
      onMarkStepComplete(currentStep.id);
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Level Selection Ribbon (10 Levels) */}
      <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-2.5 overflow-x-auto custom-scrollbar">
        <div className="flex items-center gap-2 min-w-max">
          {SIMPLE_CURRICULUM.map((level, idx) => {
            const isSelected = idx === currentLevelIndex;
            const completedInThisLevel = level.steps.filter(s => completedStepIds.has(s.id)).length;
            const isLevelDone = completedInThisLevel === level.steps.length;

            return (
              <button
                key={level.id}
                onClick={() => {
                  setCurrentLevelIndex(idx);
                  setCurrentStepIndex(0);
                  setSelectedQuizAnswer(null);
                  setShowQuizResult(false);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25 scale-105'
                    : 'bg-slate-950/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <span className="text-base">{level.emoji}</span>
                <span>Level {level.number}</span>
                {isLevelDone && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 fill-emerald-950" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Lesson Stage Card */}
      <div className="bg-slate-900/95 rounded-3xl border border-slate-800 p-6 lg:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Level & Step Sub-Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{currentLevel.emoji}</span>
            <div>
              <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider font-mono">
                Level {currentLevel.number}: {currentLevel.title}
              </span>
              <p className="text-xs text-slate-400">
                Step {currentStepIndex + 1} of {currentLevel.steps.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {currentLevel.steps.map((s, idx) => (
              <div
                key={s.id}
                onClick={() => {
                  setCurrentStepIndex(idx);
                  setSelectedQuizAnswer(null);
                  setShowQuizResult(false);
                }}
                className={`w-7 h-2 rounded-full cursor-pointer transition-all ${
                  idx === currentStepIndex
                    ? 'bg-orange-500 w-9'
                    : completedStepIds.has(s.id)
                    ? 'bg-emerald-500'
                    : 'bg-slate-800'
                }`}
                title={`Step ${idx + 1}: ${s.title}`}
              />
            ))}
          </div>
        </div>

        {/* Step Heading */}
        <div className="space-y-1">
          <h2 className="text-xl lg:text-2xl font-black text-slate-100 tracking-tight">
            {currentStep.title}
          </h2>
          <p className="text-sm font-medium text-slate-400">
            {currentStep.tagline}
          </p>
        </div>

        {/* The 5-Year-Old Plain English Story Card */}
        <div className="bg-gradient-to-br from-amber-950/30 via-slate-950 to-slate-950 rounded-2xl border-2 border-amber-500/30 p-5 lg:p-6 shadow-xl space-y-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl flex-shrink-0 shadow-md">
              {currentStep.metaphor.emoji}
            </div>
            <div className="space-y-1 flex-1">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                🧸 Think of It Like This: {currentStep.metaphor.concept}
              </span>
              <p className="text-sm lg:text-base text-slate-200 leading-relaxed font-sans pt-1">
                {currentStep.story}
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/90 border border-amber-900/40 text-xs text-amber-200/90 flex items-center gap-2">
            <span className="font-bold text-amber-300 whitespace-nowrap">✨ In Short:</span>
            <span>{currentStep.metaphor.explanation}</span>
          </div>
        </div>

        {/* Real Command Card + Interactive Try-It Action */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider">
                The Real Git Command Developers Type:
              </span>
              <div className="flex items-center gap-2 mt-1">
                <code className="text-base sm:text-lg font-mono font-bold text-orange-400 bg-slate-900 px-3 py-1 rounded-xl border border-slate-800">
                  {currentStep.command}
                </code>
                <button
                  onClick={() => handleCopy(currentStep.command)}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                  title="Copy command"
                >
                  {copiedCmd ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Big Action Button */}
            <button
              onClick={handleRunInteractiveAction}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-extrabold text-sm shadow-lg shadow-orange-500/30 transition-all hover:scale-105 active:scale-95"
            >
              {getActionIcon(currentStep.interactiveAction.buttonIcon)}
              <span>{currentStep.interactiveAction.buttonLabel}</span>
            </button>
          </div>

          <p className="text-xs text-slate-300 font-sans border-t border-slate-900 pt-3">
            <strong>What it does:</strong> {currentStep.commandExplanation}
          </p>
        </div>

        {/* Pro Tip Card */}
        <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-800/40 text-xs text-emerald-200/90 flex items-start gap-2.5">
          <Lightbulb className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <p>
            <strong className="text-emerald-300">Golden Rule:</strong> {currentStep.proTip}
          </p>
        </div>

        {/* Quick 1-Question Check */}
        {currentStep.quickQuestion && (
          <div className="bg-slate-950/90 rounded-2xl border border-slate-800 p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400">
              <HelpCircle className="w-4 h-4" />
              <span>Quick Check: Test Your Intuition</span>
            </div>

            <p className="text-sm font-bold text-slate-100">
              {currentStep.quickQuestion.question}
            </p>

            <div className="space-y-2 pt-1">
              {currentStep.quickQuestion.options.map((opt, idx) => {
                const isSelected = selectedQuizAnswer === idx;
                const isCorrect = idx === currentStep.quickQuestion?.correctIndex;

                let btnStyle = 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-200';
                if (showQuizResult) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-200 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-950/50 border-rose-500 text-rose-200';
                  } else {
                    btnStyle = 'opacity-40 border-slate-900 text-slate-500';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleQuizOption(idx)}
                    disabled={showQuizResult}
                    className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {showQuizResult && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {showQuizResult && (
              <p className="text-xs text-emerald-300 font-semibold pt-1 animate-fadeIn">
                🎉 {currentStep.quickQuestion.celebrationText}
              </p>
            )}
          </div>
        )}

        {/* Navigation Step Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={handlePrevStep}
            disabled={currentLevelIndex === 0 && currentStepIndex === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-slate-200 text-xs font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>

          <button
            onClick={handleNextStep}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-extrabold transition-all shadow-md shadow-orange-600/30 hover:scale-105"
          >
            <span>Next Step</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

