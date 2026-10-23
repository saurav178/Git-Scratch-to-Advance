import React, { useState } from 'react';
import { GitRepositoryState } from '../types/git';
import { 
  Laptop, 
  Package, 
  Camera, 
  Cloud, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Copy, 
  RotateCcw,
  FilePlus,
  GitBranch,
  Repeat,
  UploadCloud,
  Layers,
  Award,
  Terminal as TerminalIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface KidFriendlyVisualizerProps {
  state: GitRepositoryState;
  onExecuteAction: (actionType: string, payload?: string) => void;
  recentActionMessage?: string;
  recentCommand?: string;
}

export const KidFriendlyVisualizer: React.FC<KidFriendlyVisualizerProps> = ({
  state,
  onExecuteAction,
  recentActionMessage,
  recentCommand
}) => {
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [newCommitText, setNewCommitText] = useState('');
  const [showCommitInput, setShowCommitInput] = useState(false);

  const wdFiles = Object.values(state.workingDirectory);
  const stagedFiles = Object.values(state.stagingArea);
  const commitsList = Object.values(state.commits);

  const handleCopyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const handleCommitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = newCommitText.trim() || 'Awesome new update';
    onExecuteAction('git_commit', msg);
    setNewCommitText('');
    setShowCommitInput(false);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-4 lg:p-6 shadow-2xl space-y-6">
      {/* Friendly Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-xl shadow-lg shadow-orange-500/20">
            🧸
          </div>
          <div>
            <h3 className="text-base lg:text-lg font-black text-slate-100 flex items-center gap-2">
              <span>The 4 Places Where Your Work Lives</span>
            </h3>
            <p className="text-xs text-slate-400">
              Active Path: <span className="text-emerald-400 font-bold font-mono">🌿 {state.currentBranch}</span>
            </p>
          </div>
        </div>

        {/* Legend pills */}
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            Live State
          </span>
          <span className="px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono font-bold">
            {commitsList.length} Photo Checkpoint(s)
          </span>
        </div>
      </div>

      {/* The 4 Big Intuitive Place Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Place 1: The Desk */}
        <div className="bg-slate-950 rounded-2xl border-2 border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden group hover:border-blue-500/50 transition-all">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl">🎨</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300">
                1. Your Desk
              </span>
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-100">Working Desk</h4>
              <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                Where you draw and write files right now.
              </p>
            </div>

            {/* Files list */}
            <div className="space-y-1.5 pt-2 max-h-[140px] overflow-y-auto">
              {wdFiles.length === 0 ? (
                <div className="p-3 text-center text-slate-500 text-xs italic bg-slate-900/50 rounded-xl">
                  Desk is empty! Click "+ Draw New File" below.
                </div>
              ) : (
                wdFiles.map(file => (
                  <div key={file.name} className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                    <span className="font-mono text-slate-200 truncate max-w-[110px]" title={file.name}>
                      📄 {file.name}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      file.status === 'untracked' 
                        ? 'bg-rose-500/20 text-rose-300' 
                        : file.status === 'modified'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {file.status === 'untracked' ? 'Brand New' : file.status === 'modified' ? 'Edited' : 'Safe'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>{wdFiles.length} item(s)</span>
            <span className="text-orange-400 font-bold flex items-center gap-0.5">
              git add <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Place 2: The Backpack */}
        <div className="bg-slate-950 rounded-2xl border-2 border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden group hover:border-amber-500/50 transition-all">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl">🎒</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                2. Backpack
              </span>
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-100">Staging Bag</h4>
              <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                Drawings packed ready for the next photo.
              </p>
            </div>

            {/* Staged files */}
            <div className="space-y-1.5 pt-2 max-h-[140px] overflow-y-auto">
              {stagedFiles.length === 0 ? (
                <div className="p-3 text-center text-slate-500 text-xs italic bg-slate-900/50 rounded-xl">
                  Backpack is empty. Click "Pack into Backpack" below!
                </div>
              ) : (
                stagedFiles.map(file => (
                  <div key={file.name} className="flex items-center justify-between p-2 rounded-xl bg-amber-950/30 border border-amber-800/50 text-xs">
                    <span className="font-mono text-amber-200 truncate max-w-[110px]" title={file.name}>
                      📦 {file.name}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                      Packed!
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>{stagedFiles.length} packed</span>
            <span className="text-emerald-400 font-bold flex items-center gap-0.5">
              git commit <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Place 3: The Photo Album */}
        <div className="bg-slate-950 rounded-2xl border-2 border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden group hover:border-emerald-500/50 transition-all">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl">📸</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                3. Photo Album
              </span>
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-100">Permanent Album</h4>
              <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                Saved checkpoints locked in forever.
              </p>
            </div>

            {/* Commits */}
            <div className="space-y-1.5 pt-2 max-h-[140px] overflow-y-auto">
              {commitsList.map((c, idx) => (
                <div key={c.id} className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-orange-400 font-bold text-[11px]">
                      #{c.id.substring(0, 7)}
                    </span>
                    <span className="text-[10px] text-slate-400">{c.timestamp}</span>
                  </div>
                  <p className="text-slate-200 font-medium line-clamp-1">{c.message}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>{commitsList.length} photos</span>
            <span className="text-cyan-400 font-bold flex items-center gap-0.5">
              git push <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Place 4: The Cloud Castle */}
        <div className="bg-slate-950 rounded-2xl border-2 border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/50 transition-all">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl">☁️</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">
                4. Cloud Castle
              </span>
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-100">GitHub Cloud</h4>
              <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                Safe worldwide backup for your friends.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-center space-y-1 my-auto">
              <Cloud className="w-6 h-6 text-cyan-400 mx-auto" />
              <p className="text-xs font-bold text-cyan-200">Cloud Synced!</p>
              <p className="text-[10px] text-cyan-400/80">All photos backed up safely</p>
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>origin/main</span>
            <span className="text-emerald-400 font-bold">100% Online</span>
          </div>
        </div>
      </div>

      {/* Action Reaction Speech Bubble (What Just Happened?) */}
      {recentActionMessage && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-950/40 via-amber-950/30 to-slate-950 border border-orange-500/40 shadow-lg animate-fadeIn flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <span className="text-2xl flex-shrink-0">💡</span>
            <div>
              <p className="text-xs font-bold text-orange-300 uppercase tracking-wider">
                What Just Happened:
              </p>
              <p className="text-xs sm:text-sm text-slate-100 font-medium">
                {recentActionMessage}
              </p>
            </div>
          </div>

          {recentCommand && (
            <div className="flex items-center gap-2 flex-shrink-0">
              <code className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-orange-400 font-bold">
                {recentCommand}
              </code>
              <button
                onClick={() => handleCopyCommand(recentCommand)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Copy command"
              >
                {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Big 1-Click Interactive Action Buttons */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <span>🕹️ Big Play Buttons (Click to Test Git)</span>
          </h4>
          <span className="text-[11px] text-slate-500">
            No terminal typing needed! Just click to see it move.
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {/* Action 1: Create File */}
          <button
            onClick={() => onExecuteAction('create_file', 'new_sketch.png')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-blue-500 text-center transition-all group shadow-sm"
          >
            <span className="text-xl mb-1 group-hover:scale-110 transition-transform">🎨</span>
            <span className="text-xs font-bold text-slate-200">1. Draw File</span>
            <span className="text-[10px] text-slate-500 font-mono mt-0.5">touch drawing</span>
          </button>

          {/* Action 2: git add */}
          <button
            onClick={() => onExecuteAction('git_add', '.')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500 text-center transition-all group shadow-sm"
          >
            <span className="text-xl mb-1 group-hover:scale-110 transition-transform">🎒</span>
            <span className="text-xs font-bold text-slate-200">2. Pack Bag</span>
            <span className="text-[10px] text-amber-400 font-mono mt-0.5">git add .</span>
          </button>

          {/* Action 3: git commit */}
          <button
            onClick={() => setShowCommitInput(true)}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-gradient-to-b from-orange-600/20 to-orange-600/5 hover:from-orange-600/30 border border-orange-500/40 text-center transition-all group shadow-sm"
          >
            <span className="text-xl mb-1 group-hover:scale-110 transition-transform">📸</span>
            <span className="text-xs font-bold text-orange-200">3. Snap Photo</span>
            <span className="text-[10px] text-orange-400 font-mono mt-0.5">git commit</span>
          </button>

          {/* Action 4: git branch */}
          <button
            onClick={() => onExecuteAction('git_branch', 'cool-experiment')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-purple-500 text-center transition-all group shadow-sm"
          >
            <span className="text-xl mb-1 group-hover:scale-110 transition-transform">🌿</span>
            <span className="text-xs font-bold text-slate-200">4. New Path</span>
            <span className="text-[10px] text-purple-400 font-mono mt-0.5">git branch</span>
          </button>

          {/* Action 5: git restore */}
          <button
            onClick={() => onExecuteAction('git_restore', '.')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-rose-500 text-center transition-all group shadow-sm"
          >
            <span className="text-xl mb-1 group-hover:scale-110 transition-transform">🧽</span>
            <span className="text-xs font-bold text-slate-200">5. Erase Oops</span>
            <span className="text-[10px] text-rose-400 font-mono mt-0.5">git restore .</span>
          </button>

          {/* Action 6: git push */}
          <button
            onClick={() => onExecuteAction('git_push', 'origin main')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500 text-center transition-all group shadow-sm"
          >
            <span className="text-xl mb-1 group-hover:scale-110 transition-transform">🚀</span>
            <span className="text-xs font-bold text-slate-200">6. To Cloud</span>
            <span className="text-[10px] text-cyan-400 font-mono mt-0.5">git push</span>
          </button>
        </div>

        {/* Modal / Inline input for Snap Photo Commit */}
        {showCommitInput && (
          <form onSubmit={handleCommitSubmit} className="pt-3 border-t border-slate-900 flex items-center gap-2 animate-fadeIn">
            <input
              type="text"
              value={newCommitText}
              onChange={(e) => setNewCommitText(e.target.value)}
              placeholder="Write a simple description (e.g. Draw superhero suit)..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500"
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md transition-colors whitespace-nowrap"
            >
              Save Photo!
            </button>
            <button
              type="button"
              onClick={() => setShowCommitInput(false)}
              className="px-3 py-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

