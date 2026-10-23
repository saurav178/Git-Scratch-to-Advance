import React, { useState } from 'react';
import { Lesson } from '../types/lesson';
import { 
  Sparkles, 
  Terminal, 
  CheckCircle2, 
  Copy, 
  Check, 
  Play, 
  HelpCircle, 
  AlertTriangle, 
  Lightbulb, 
  ArrowLeft, 
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  Flame,
  Gamepad2,
  Package,
  Layers,
  Camera,
  Repeat,
  Eraser,
  Edit3,
  Rewind,
  LifeBuoy,
  Archive,
  UploadCloud,
  Split,
  GitMerge,
  Cpu,
  BookOpen
} from 'lucide-react';

interface LessonViewerProps {
  lesson: Lesson;
  explainMode: 'simple' | 'tech';
  isCompleted: boolean;
  onToggleComplete: (lessonId: string) => void;
  onPreviousLesson: () => void;
  onNextLesson: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  onRunInSimulator: (command: string) => void;
  onOpenQuiz: () => void;
  challengeSolved: boolean;
}

const getMetaphorIcon = (iconName: string) => {
  switch (iconName) {
    case 'Gamepad2': return <Gamepad2 className="w-6 h-6 text-amber-400" />;
    case 'Package': return <Package className="w-6 h-6 text-amber-400" />;
    case 'Layers': return <Layers className="w-6 h-6 text-blue-400" />;
    case 'Camera': return <Camera className="w-6 h-6 text-purple-400" />;
    case 'Repeat': return <Repeat className="w-6 h-6 text-emerald-400" />;
    case 'Eraser': return <Eraser className="w-6 h-6 text-rose-400" />;
    case 'Edit3': return <Edit3 className="w-6 h-6 text-orange-400" />;
    case 'Rewind': return <Rewind className="w-6 h-6 text-yellow-400" />;
    case 'LifeBuoy': return <LifeBuoy className="w-6 h-6 text-cyan-400" />;
    case 'Archive': return <Archive className="w-6 h-6 text-amber-400" />;
    case 'UploadCloud': return <UploadCloud className="w-6 h-6 text-cyan-400" />;
    case 'Split': return <Split className="w-6 h-6 text-indigo-400" />;
    case 'GitMerge': return <GitMerge className="w-6 h-6 text-teal-400" />;
    default: return <Sparkles className="w-6 h-6 text-amber-400" />;
  }
};

export const LessonViewer: React.FC<LessonViewerProps> = ({
  lesson,
  explainMode,
  isCompleted,
  onToggleComplete,
  onPreviousLesson,
  onNextLesson,
  hasPrevious,
  hasNext,
  onRunInSimulator,
  onOpenQuiz,
  challengeSolved
}) => {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(text);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-6 space-y-6 max-w-5xl mx-auto custom-scrollbar">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <span className="px-2 py-0.5 rounded bg-slate-800 text-orange-400 font-bold">
            Module {lesson.moduleIndex}
          </span>
          <span>/</span>
          <span className="text-slate-200 font-sans font-semibold">{lesson.title}</span>
        </div>

        <div className="flex items-center gap-2">
          {lesson.quiz && lesson.quiz.length > 0 && (
            <button
              onClick={onOpenQuiz}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-semibold transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Test Knowledge (Quiz)</span>
            </button>
          )}

          <button
            onClick={() => onToggleComplete(lesson.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              isCompleted
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isCompleted ? 'Completed ✓' : 'Mark as Done'}</span>
          </button>
        </div>
      </div>

      {/* Lesson Title Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-100 tracking-tight">
          {lesson.title}
        </h1>
        <p className="text-sm lg:text-base text-slate-400 mt-2 leading-relaxed">
          {lesson.shortDesc}
        </p>
      </div>

      {/* Non-Tech Metaphor Section (ELI5 Mode) */}
      {(explainMode === 'simple' || !explainMode) && (
        <section className="bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-950 rounded-2xl border border-amber-500/30 p-5 lg:p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
              {getMetaphorIcon(lesson.metaphor.illustrationIcon)}
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  🧸 Non-Tech Mental Model (ELI5)
                </span>
                <span className="text-xs font-bold text-amber-200">
                  {lesson.metaphor.title}
                </span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed font-sans">
                {lesson.metaphor.analogy}
              </p>
              <div className="mt-3 p-3 rounded-xl bg-slate-950/80 border border-amber-900/40 text-xs text-amber-200/90 leading-relaxed">
                <span className="font-bold text-amber-300 mr-1">Real-Life Scenario:</span>
                {lesson.metaphor.realWorldScenario}
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          {lesson.metaphor.comparisonTable && (
            <div className="mt-5 border-t border-amber-500/20 pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2.5">
                Everyday Life vs Git Concept
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                {lesson.metaphor.comparisonTable.map((row, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                    <span className="text-slate-300">{row.nonTech}</span>
                    <span className="font-mono text-orange-400 font-semibold text-[11px] ml-2 text-right">
                      ➜ {row.gitConcept}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Visual Flow Pipeline step if present */}
      {lesson.flowStep && (
        <section className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 lg:p-5">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-orange-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Visual Data Movement in this Lesson
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-950/40 border border-rose-800/40 text-rose-300 text-xs font-semibold">
              <span>{lesson.flowStep.from}</span>
            </div>
            
            <div className="flex flex-col items-center justify-center text-center">
              <span className="font-mono text-xs font-bold text-orange-400 bg-orange-950/60 px-3 py-1 rounded-full border border-orange-500/40">
                {lesson.flowStep.label}
              </span>
              <span className="text-[10px] text-slate-400 mt-1 max-w-[240px]">
                {lesson.flowStep.description}
              </span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 text-xs font-semibold">
              <span>{lesson.flowStep.to}</span>
            </div>
          </div>
        </section>
      )}

      {/* Technical Under the Hood Explanation */}
      <section className="bg-slate-900/60 rounded-2xl border border-slate-800 p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Technical Mechanics & How It Works
          </h3>
        </div>
        <ul className="space-y-2 text-xs lg:text-sm text-slate-300 leading-relaxed list-disc list-inside">
          {lesson.technicalExplanation.map((point, idx) => (
            <li key={idx} className="pl-1">
              {point}
            </li>
          ))}
        </ul>
      </section>

      {/* Commands Taught in this Lesson */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Core Commands & Syntax
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {lesson.commands.map((cmd) => (
            <div 
              key={cmd.command}
              className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2.5 transition-all hover:border-slate-700"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-orange-400 text-sm">
                    {cmd.syntax}
                  </span>
                  {cmd.dangerLevel === 'destructive' && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] uppercase font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3" /> Destructive
                    </span>
                  )}
                  {cmd.dangerLevel === 'caution' && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] uppercase font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Caution
                    </span>
                  )}
                  {cmd.dangerLevel === 'safe' && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] uppercase font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Safe
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopy(cmd.syntax)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Copy command"
                  >
                    {copiedCommand === cmd.syntax ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    onClick={() => onRunInSimulator(cmd.syntax)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-600/20 hover:bg-orange-600/30 text-orange-300 border border-orange-500/40 text-xs font-semibold transition-colors"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Run in Simulator</span>
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {cmd.explanation}
              </p>

              {cmd.exampleOutput && (
                <div className="mt-2 p-2 rounded bg-slate-900 border border-slate-800/80 font-mono text-[11px] text-slate-400 whitespace-pre-wrap">
                  <span className="text-slate-500 select-none">$ Output:</span><br />
                  {cmd.exampleOutput}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Pro Tips & Gotchas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pro Tips */}
        {lesson.proTips.length > 0 && (
          <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              <span>Senior Developer Pro Tips</span>
            </div>
            <ul className="space-y-1.5 text-xs text-emerald-200/90 leading-relaxed">
              {lesson.proTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Common Gotchas */}
        {lesson.commonGotchas.length > 0 && (
          <div className="bg-rose-950/20 border border-rose-800/40 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Common Beginner Traps</span>
            </div>
            <ul className="space-y-1.5 text-xs text-rose-200/90 leading-relaxed">
              {lesson.commonGotchas.map((gotcha, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>{gotcha}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Hands-on Interactive Challenge */}
      {lesson.challenge && (
        <section className={`rounded-2xl border p-5 transition-all ${
          challengeSolved
            ? 'bg-emerald-950/30 border-emerald-500 shadow-lg shadow-emerald-500/10'
            : 'bg-gradient-to-r from-orange-950/20 to-slate-900 border-orange-500/40 shadow-xl'
        }`}>
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30">
                  🎯 Hands-On Challenge
                </span>
                <span className="text-xs font-bold text-slate-100">
                  {lesson.challenge.title}
                </span>
              </div>
              <p className="text-xs lg:text-sm text-slate-200 leading-relaxed">
                {lesson.challenge.instruction}
              </p>
            </div>

            {challengeSolved && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Challenge Solved! +50 XP</span>
              </div>
            )}
          </div>

          {/* Hint Accordion */}
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-orange-400 hover:text-orange-300 underline underline-offset-2 flex items-center gap-1"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{showHint ? 'Hide Hint' : 'Need a hint?'}</span>
            </button>

            <button
              onClick={() => onRunInSimulator(lesson.challenge!.solutionCommand)}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors"
            >
              Fill Solution Command
            </button>
          </div>

          {showHint && (
            <div className="mt-2 p-2.5 rounded bg-slate-950 border border-orange-500/30 text-xs font-mono text-orange-200">
              💡 {lesson.challenge.hint}
            </div>
          )}
        </section>
      )}

      {/* Bottom Prev / Next Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-800">
        <button
          onClick={onPreviousLesson}
          disabled={!hasPrevious}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-200 text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous Lesson</span>
        </button>

        <button
          onClick={onNextLesson}
          disabled={!hasNext}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 disabled:opacity-40 disabled:hover:bg-orange-600 text-white text-xs font-semibold transition-colors shadow-md shadow-orange-600/30"
        >
          <span>Next Lesson</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

