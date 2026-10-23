import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  ChevronDown, 
  ChevronRight, 
  Search, 
  Clock, 
  Award,
  Sparkles,
  Layers,
  Terminal,
  GitBranch,
  History,
  Archive,
  Cloud,
  AlertTriangle,
  Shuffle,
  Cpu
} from 'lucide-react';
import { LESSON_MODULES } from '../data/lessons';
import { Lesson, DifficultyLevel } from '../types/lesson';

interface SidebarProps {
  currentLessonId: string;
  onSelectLesson: (lesson: Lesson) => void;
  completedLessonIds: Set<string>;
}

// Icon helper
const getModuleIcon = (iconName: string) => {
  switch (iconName) {
    case 'Brain': return <Sparkles className="w-4 h-4 text-amber-400" />;
    case 'Terminal': return <Terminal className="w-4 h-4 text-emerald-400" />;
    case 'GitBranch': return <GitBranch className="w-4 h-4 text-blue-400" />;
    case 'History': return <History className="w-4 h-4 text-purple-400" />;
    case 'Archive': return <Archive className="w-4 h-4 text-amber-500" />;
    case 'Cloud': return <Cloud className="w-4 h-4 text-cyan-400" />;
    case 'AlertTriangle': return <AlertTriangle className="w-4 h-4 text-rose-400" />;
    case 'Shuffle': return <Shuffle className="w-4 h-4 text-orange-400" />;
    case 'Search': return <Search className="w-4 h-4 text-teal-400" />;
    case 'Cpu': return <Cpu className="w-4 h-4 text-indigo-400" />;
    default: return <Layers className="w-4 h-4 text-slate-400" />;
  }
};

const getDifficultyBadge = (difficulty: DifficultyLevel) => {
  switch (difficulty) {
    case 'beginner':
      return <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Beginner</span>;
    case 'intermediate':
      return <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">Interm</span>;
    case 'advanced':
      return <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">Adv</span>;
    case 'expert':
      return <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">Expert</span>;
  }
};

export const Sidebar: React.FC<SidebarProps> = ({
  currentLessonId,
  onSelectLesson,
  completedLessonIds
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'module-1': true,
    'module-2': true,
    'module-3': true,
    'module-4': true
  });
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | DifficultyLevel>('all');

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  // Filter lessons based on search query and difficulty
  const filteredModules = LESSON_MODULES.map(module => {
    const lessons = module.lessons.filter(l => {
      const matchesSearch = 
        l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.commands.some(c => c.command.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesDiff = difficultyFilter === 'all' || l.difficulty === difficultyFilter;
      return matchesSearch && matchesDiff;
    });

    return {
      ...module,
      lessons
    };
  }).filter(m => m.lessons.length > 0);

  return (
    <aside className="w-full lg:w-80 flex-shrink-0 bg-slate-900/60 border-r border-slate-800/80 flex flex-col h-[calc(100vh-61px)] overflow-hidden">
      {/* Header search bar */}
      <div className="p-3 border-b border-slate-800 space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search lessons or commands..."
            className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto text-[11px] pb-1">
          <button
            onClick={() => setDifficultyFilter('all')}
            className={`px-2 py-0.5 rounded-md font-medium transition-colors whitespace-nowrap ${
              difficultyFilter === 'all'
                ? 'bg-slate-700 text-white'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setDifficultyFilter('beginner')}
            className={`px-2 py-0.5 rounded-md font-medium transition-colors whitespace-nowrap ${
              difficultyFilter === 'beginner'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-400 hover:text-emerald-300 hover:bg-slate-800'
            }`}
          >
            Beginner
          </button>
          <button
            onClick={() => setDifficultyFilter('intermediate')}
            className={`px-2 py-0.5 rounded-md font-medium transition-colors whitespace-nowrap ${
              difficultyFilter === 'intermediate'
                ? 'bg-amber-600 text-white'
                : 'text-slate-400 hover:text-amber-300 hover:bg-slate-800'
            }`}
          >
            Interm
          </button>
          <button
            onClick={() => setDifficultyFilter('advanced')}
            className={`px-2 py-0.5 rounded-md font-medium transition-colors whitespace-nowrap ${
              difficultyFilter === 'advanced'
                ? 'bg-purple-600 text-white'
                : 'text-slate-400 hover:text-purple-300 hover:bg-slate-800'
            }`}
          >
            Advanced
          </button>
          <button
            onClick={() => setDifficultyFilter('expert')}
            className={`px-2 py-0.5 rounded-md font-medium transition-colors whitespace-nowrap ${
              difficultyFilter === 'expert'
                ? 'bg-rose-600 text-white'
                : 'text-slate-400 hover:text-rose-300 hover:bg-slate-800'
            }`}
          >
            Expert
          </button>
        </div>
      </div>

      {/* Curriculum list */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-2.5 custom-scrollbar">
        {filteredModules.length === 0 ? (
          <div className="text-center py-10 px-4 text-slate-500 text-xs">
            No lessons match your search criteria. Try a different command keyword.
          </div>
        ) : (
          filteredModules.map((module) => {
            const isExpanded = expandedModules[module.id] ?? true;
            const completedInModule = module.lessons.filter(l => completedLessonIds.has(l.id)).length;
            const totalInModule = module.lessons.length;
            const isModuleAllComplete = completedInModule === totalInModule && totalInModule > 0;

            return (
              <div 
                key={module.id} 
                className="rounded-xl border border-slate-800/80 bg-slate-950/40 overflow-hidden"
              >
                {/* Module Header accordion */}
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full px-3 py-2.5 flex items-center justify-between text-left hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-1 rounded-md bg-slate-900 border border-slate-800">
                      {getModuleIcon(module.icon)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-mono text-orange-400 uppercase font-semibold">
                          Mod {module.number}
                        </span>
                        <span className="text-xs font-bold text-slate-200 truncate">
                          {module.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                        <span>{completedInModule}/{totalInModule} done</span>
                        <span>•</span>
                        {getDifficultyBadge(module.difficulty)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    {isModuleAllComplete && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Sub-lessons */}
                {isExpanded && (
                  <div className="p-1.5 space-y-1 bg-slate-950/60 border-t border-slate-900">
                    {module.lessons.map((lesson) => {
                      const isCurrent = lesson.id === currentLessonId;
                      const isCompleted = completedLessonIds.has(lesson.id);

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => onSelectLesson(lesson)}
                          className={`w-full px-2.5 py-2 rounded-lg text-left flex items-start gap-2.5 transition-all ${
                            isCurrent
                              ? 'bg-orange-500/15 border border-orange-500/40 text-orange-200 shadow-sm'
                              : 'hover:bg-slate-800/50 text-slate-300'
                          }`}
                        >
                          <div className="mt-0.5 flex-shrink-0">
                            {isCompleted ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            ) : isCurrent ? (
                              <div className="w-3.5 h-3.5 rounded-full border-2 border-orange-400 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                              </div>
                            ) : (
                              <Circle className="w-3.5 h-3.5 text-slate-600" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className={`text-xs font-semibold leading-snug line-clamp-1 ${
                              isCurrent ? 'text-orange-300' : 'text-slate-200'
                            }`}>
                              {lesson.title}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400">
                              <span className="flex items-center gap-1">
                                <Clock className="w-2.5 h-2.5" />
                                {lesson.estimatedMinutes}m
                              </span>
                              <span>•</span>
                              <span className="truncate">{lesson.commands[0]?.command || 'Concept'}</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};

