import React from 'react';
import { 
  GitBranch, 
  Map, 
  Gamepad2, 
  ShieldAlert, 
  BookOpen, 
  RotateCcw,
  Sparkles,
  Award
} from 'lucide-react';

interface CleanNavbarProps {
  activeTab: 'journey' | 'sandbox' | 'conflict' | 'dictionary';
  setActiveTab: (tab: 'journey' | 'sandbox' | 'conflict' | 'dictionary') => void;
  completedStepsCount: number;
  totalStepsCount: number;
  onResetAll: () => void;
}

export const CleanNavbar: React.FC<CleanNavbarProps> = ({
  activeTab,
  setActiveTab,
  completedStepsCount,
  totalStepsCount,
  onResetAll
}) => {
  const percent = Math.round((completedStepsCount / (totalStepsCount || 1)) * 100);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 px-4 lg:px-8 py-3">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand Logo & Tagline */}
        <div 
          onClick={() => setActiveTab('journey')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-500 to-rose-500 flex items-center justify-center text-xl shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
            🧸
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg tracking-tight bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                GitAcademy
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                ELI5 Edition
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Git explained so simply, even a 5-year-old gets it!
            </p>
          </div>
        </div>

        {/* 4 Main Crystal-Clear Tabs */}
        <nav className="flex items-center bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs font-bold gap-1">
          <button
            onClick={() => setActiveTab('journey')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
              activeTab === 'journey'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span>🗺️</span>
            <span>Lessons</span>
          </button>

          <button
            onClick={() => setActiveTab('sandbox')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
              activeTab === 'sandbox'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span>🎮</span>
            <span>Toy Sandbox</span>
          </button>

          <button
            onClick={() => setActiveTab('conflict')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
              activeTab === 'conflict'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span>🧩</span>
            <span>Conflict Lab</span>
          </button>

          <button
            onClick={() => setActiveTab('dictionary')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
              activeTab === 'dictionary'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span>📖</span>
            <span>Dictionary</span>
          </button>
        </nav>

        {/* Progress & Reset */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <Award className="w-4 h-4 text-amber-400" />
            <div className="flex flex-col items-end">
              <span className="font-bold text-slate-200 text-[11px]">
                {completedStepsCount} / {totalStepsCount} Steps Done
              </span>
              <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-300" 
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          </div>

          <button
            onClick={onResetAll}
            title="Reset to clean start"
            className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};

