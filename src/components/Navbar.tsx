import React from 'react';
import { 
  GitBranch, 
  Terminal, 
  BookOpen, 
  HelpCircle, 
  ShieldAlert, 
  Sparkles, 
  Award,
  Search,
  RotateCcw
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'lessons' | 'simulator' | 'conflict' | 'dictionary';
  setActiveTab: (tab: 'lessons' | 'simulator' | 'conflict' | 'dictionary') => void;
  explainMode: 'simple' | 'tech';
  setExplainMode: (mode: 'simple' | 'tech') => void;
  completedLessonsCount: number;
  totalLessonsCount: number;
  onOpenSearch: () => void;
  onResetSimulator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  explainMode,
  setExplainMode,
  completedLessonsCount,
  totalLessonsCount,
  onOpenSearch,
  onResetSimulator
}) => {
  const progressPercent = Math.round((completedLessonsCount / (totalLessonsCount || 1)) * 100);

  // Compute rank title based on progress
  let rankTitle = 'Git Novice';
  let rankColor = 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60';
  if (progressPercent >= 80) {
    rankTitle = 'Git Grandmaster 💎';
    rankColor = 'text-cyan-400 bg-cyan-950/60 border-cyan-800/60';
  } else if (progressPercent >= 50) {
    rankTitle = 'Branch Time-Traveler 🥇';
    rankColor = 'text-amber-400 bg-amber-950/60 border-amber-800/60';
  } else if (progressPercent >= 25) {
    rankTitle = 'Staging Specialist 🥈';
    rankColor = 'text-purple-400 bg-purple-950/60 border-purple-800/60';
  } else if (progressPercent > 0) {
    rankTitle = 'Repo Explorer 🥉';
    rankColor = 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60';
  }

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100 px-4 lg:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Title */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div 
            onClick={() => setActiveTab('lessons')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-500 p-0.5 shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <GitBranch className="w-5 h-5 text-orange-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base lg:text-lg tracking-tight bg-gradient-to-r from-orange-400 via-amber-300 to-rose-400 bg-clip-text text-transparent">
                  GitFlow Academy
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/30">
                  Interactive
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Master Git from scratch to advanced • Non-tech friendly
              </p>
            </div>
          </div>

          {/* Quick Search Shortcut button for mobile/tablet */}
          <button
            onClick={onOpenSearch}
            className="md:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            title="Search commands"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Center: Navigation Tabs */}
        <nav className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800/80 text-xs sm:text-sm overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('lessons')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'lessons'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Lessons</span>
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'simulator'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Git Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('conflict')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'conflict'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Conflict Lab</span>
          </button>

          <button
            onClick={() => setActiveTab('dictionary')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'dictionary'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Command Docs</span>
          </button>
        </nav>

        {/* Right side: Mode Switcher & Progress */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* ELI5 vs Tech Mode Toggle */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setExplainMode('simple')}
              title="Explain Like I'm 5 with real-world analogies"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-all ${
                explainMode === 'simple'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>ELI5 Metaphor</span>
            </button>
            <button
              onClick={() => setExplainMode('tech')}
              title="Technical deep-dive with internal mechanics"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-all ${
                explainMode === 'tech'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>💻 Tech Deep</span>
            </button>
          </div>

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 text-xs transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Quick Find</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] text-slate-400 font-mono">
              Ctrl+K
            </kbd>
          </button>

          {/* User Rank & Progress */}
          <div className="hidden lg:flex items-center gap-2.5 pl-2 border-l border-slate-800">
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold ${rankColor}`}>
              <Award className="w-3.5 h-3.5" />
              <span>{rankTitle}</span>
            </div>
            <div className="flex flex-col items-end text-right">
              <span className="text-[11px] font-mono text-slate-400">
                {completedLessonsCount} / {totalLessonsCount} ({progressPercent}%)
              </span>
              <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-0.5">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

