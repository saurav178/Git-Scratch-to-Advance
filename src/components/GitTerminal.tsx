import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, Trash2, RotateCcw, CornerDownLeft, Sparkles } from 'lucide-react';
import { TerminalOutputLine } from '../types/git';

interface GitTerminalProps {
  history: TerminalOutputLine[];
  currentBranch: string;
  onExecuteCommand: (command: string) => void;
  onClear: () => void;
  onReset: () => void;
  suggestedCommand?: string;
}

export const GitTerminal: React.FC<GitTerminalProps> = ({
  history,
  currentBranch,
  onExecuteCommand,
  onClear,
  onReset,
  suggestedCommand
}) => {
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom whenever history updates
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // When suggestedCommand changes, prefill if input is empty
  useEffect(() => {
    if (suggestedCommand) {
      setInput(suggestedCommand);
      inputRef.current?.focus();
    }
  }, [suggestedCommand]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    // Add to history navigation
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    onExecuteCommand(cmd);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    }
  };

  const handleRunQuick = (cmd: string) => {
    setInput(cmd);
    onExecuteCommand(cmd);
  };

  return (
    <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Mac-style window controls */}
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <TerminalIcon className="w-3.5 h-3.5 text-orange-400" />
          <span className="text-slate-300 font-bold tracking-wide">
            interactive-git-shell &mdash; bash
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onClear}
            title="Clear terminal screen"
            className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors"
          >
            <Trash2 className="w-3 h-3" />
            <span>Clear</span>
          </button>
          <button
            onClick={onReset}
            title="Reset repository to clean slate"
            className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Repo</span>
          </button>
        </div>
      </div>

      {/* Quick Command Action Chips */}
      <div className="bg-slate-900/60 px-3 py-1.5 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px]">
        <span className="text-slate-500 font-sans text-[10px] uppercase font-bold mr-1">Quick:</span>
        <button
          onClick={() => handleRunQuick('git status')}
          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-orange-500/20 hover:text-orange-300 border border-slate-700/60 text-slate-300 transition-colors"
        >
          git status
        </button>
        <button
          onClick={() => handleRunQuick('git add .')}
          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-orange-500/20 hover:text-orange-300 border border-slate-700/60 text-slate-300 transition-colors"
        >
          git add .
        </button>
        <button
          onClick={() => handleRunQuick('git commit -m "Update feature"')}
          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-orange-500/20 hover:text-orange-300 border border-slate-700/60 text-slate-300 transition-colors"
        >
          git commit -m "..."
        </button>
        <button
          onClick={() => handleRunQuick('git log --oneline')}
          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-orange-500/20 hover:text-orange-300 border border-slate-700/60 text-slate-300 transition-colors"
        >
          git log --oneline
        </button>
        <button
          onClick={() => handleRunQuick('git branch')}
          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-orange-500/20 hover:text-orange-300 border border-slate-700/60 text-slate-300 transition-colors"
        >
          git branch
        </button>
        <button
          onClick={() => handleRunQuick('git diff')}
          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-orange-500/20 hover:text-orange-300 border border-slate-700/60 text-slate-300 transition-colors"
        >
          git diff
        </button>
      </div>

      {/* Terminal Output Stream */}
      <div 
        onClick={() => inputRef.current?.focus()}
        className="p-4 space-y-2 min-h-[220px] max-h-[380px] overflow-y-auto cursor-text text-slate-200"
      >
        {history.map((line) => {
          if (line.type === 'input') {
            return (
              <div key={line.id} className="flex items-start gap-2 pt-1 font-semibold text-orange-400">
                <span className="text-slate-500 select-none">my-git-app ({currentBranch}) $</span>
                <span className="text-slate-100">{line.text}</span>
              </div>
            );
          }

          if (line.type === 'error') {
            return (
              <div key={line.id} className="text-rose-400 whitespace-pre-wrap pl-4 border-l-2 border-rose-500/60 leading-relaxed">
                {line.text}
              </div>
            );
          }

          if (line.type === 'success') {
            return (
              <div key={line.id} className="text-emerald-400 whitespace-pre-wrap pl-4 border-l-2 border-emerald-500/60 leading-relaxed">
                {line.text}
              </div>
            );
          }

          if (line.type === 'info') {
            return (
              <div key={line.id} className="text-cyan-300 whitespace-pre-wrap pl-4 border-l-2 border-cyan-500/60 leading-relaxed">
                {line.text}
              </div>
            );
          }

          return (
            <div key={line.id} className="text-slate-300 whitespace-pre-wrap pl-4 leading-relaxed">
              {line.text}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Terminal Input Form */}
      <form onSubmit={handleSubmit} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
        <span className="text-emerald-400 font-bold select-none whitespace-nowrap">
          my-git-app (<span className="text-orange-400">{currentBranch}</span>) $
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type Git command here (e.g. git status, git add .)..."
          className="flex-1 bg-transparent border-none text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-0 text-xs font-mono"
          autoFocus
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 disabled:opacity-40 disabled:hover:bg-orange-600 text-white font-sans text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <Play className="w-3 h-3 fill-current" />
          <span>Run</span>
        </button>
      </form>
    </div>
  );
};

