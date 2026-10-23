import React, { useState } from 'react';
import { 
  GitRepositoryState, 
  TerminalOutputLine 
} from '../types/git';
import { GitVisualizer } from './GitVisualizer';
import { GitTerminal } from './GitTerminal';
import { PRESET_SCENARIOS, PresetScenario } from '../data/presetScenarios';
import { 
  Sparkles, 
  FilePlus, 
  FileEdit, 
  Trash2, 
  Eye, 
  Layers, 
  RotateCcw,
  BookOpen,
  Archive,
  History
} from 'lucide-react';

interface GitSimulatorViewProps {
  state: GitRepositoryState;
  terminalHistory: TerminalOutputLine[];
  onExecuteCommand: (command: string) => void;
  onClearTerminal: () => void;
  onResetToScenario: (scenario: PresetScenario) => void;
  onModifyFile: (fileName: string, newContent: string) => void;
  onCreateFile: (fileName: string, content: string) => void;
  onDeleteFile: (fileName: string) => void;
}

export const GitSimulatorView: React.FC<GitSimulatorViewProps> = ({
  state,
  terminalHistory,
  onExecuteCommand,
  onClearTerminal,
  onResetToScenario,
  onModifyFile,
  onCreateFile,
  onDeleteFile
}) => {
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [fileEditContent, setFileEditContent] = useState<string>('');
  const [newFileName, setNewFileName] = useState('');
  const [showNewFileModal, setShowNewFileModal] = useState(false);

  const wdFiles = Object.values(state.workingDirectory);

  const handleSelectFileToInspect = (name: string) => {
    setSelectedFileName(name);
    setFileEditContent(state.workingDirectory[name]?.content || '');
  };

  const handleSaveFileEdits = () => {
    if (!selectedFileName) return;
    onModifyFile(selectedFileName, fileEditContent);
  };

  const handleCreateNewFileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim()) return;
    onCreateFile(newFileName.trim(), `// File: ${newFileName.trim()}\nconsole.log("Hello from ${newFileName.trim()}");\n`);
    setNewFileName('');
    setShowNewFileModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 space-y-6">
      {/* Top Controls: Preset Scenarios */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 lg:p-5 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-extrabold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>Interactive Git Sandbox & Playground</span>
            </h2>
            <p className="text-xs text-slate-400">
              Load realistic Git scenarios instantly or type freehand commands in the terminal
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Scenario Presets:</span>
          </div>
        </div>

        {/* Preset scenario buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {PRESET_SCENARIOS.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => onResetToScenario(scenario)}
              className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-orange-500/50 text-left transition-all group"
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  {scenario.badge}
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-200 group-hover:text-orange-300 transition-colors">
                {scenario.title}
              </h4>
              <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                {scenario.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Live Visualizer: 4-Stage Pipeline + Commit Graph */}
      <GitVisualizer state={state} />

      {/* Split Grid: Interactive Terminal + Virtual Filesystem Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Terminal */}
        <div className="lg:col-span-2">
          <GitTerminal
            history={terminalHistory}
            currentBranch={state.currentBranch}
            onExecuteCommand={onExecuteCommand}
            onClear={onClearTerminal}
            onReset={() => onResetToScenario(PRESET_SCENARIOS[0])}
          />
        </div>

        {/* Right 1 Col: Working Directory File Inspector & Editor */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 space-y-4 shadow-xl flex flex-col">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-orange-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Virtual File System
              </h3>
            </div>

            <button
              onClick={() => setShowNewFileModal(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-600/20 hover:bg-orange-600/30 text-orange-300 border border-orange-500/40 text-xs font-semibold transition-colors"
            >
              <FilePlus className="w-3.5 h-3.5" />
              <span>New File</span>
            </button>
          </div>

          {/* File list */}
          <div className="space-y-1.5 flex-1 max-h-[160px] overflow-y-auto pr-1">
            {wdFiles.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-4 text-center">No files in directory</p>
            ) : (
              wdFiles.map(file => (
                <div
                  key={file.name}
                  onClick={() => handleSelectFileToInspect(file.name)}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all text-xs font-mono ${
                    selectedFileName === file.name
                      ? 'bg-orange-950/40 border border-orange-500 text-orange-200'
                      : 'bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <span className="truncate max-w-[140px] font-medium" title={file.name}>
                    {file.name}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] uppercase font-bold ${
                      file.status === 'untracked' 
                        ? 'bg-rose-500/10 text-rose-400' 
                        : file.status === 'modified'
                        ? 'bg-amber-500/10 text-amber-400'
                        : file.status === 'staged'
                        ? 'bg-blue-500/10 text-blue-400'
                        : 'bg-emerald-500/10 text-emerald-400'
                    }`}>
                      {file.status}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteFile(file.name);
                      }}
                      className="p-1 rounded hover:bg-slate-800 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Delete file"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Quick File Edit Simulator */}
          {selectedFileName && (
            <div className="pt-3 border-t border-slate-800 space-y-2 animate-fadeIn">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-orange-400 font-bold truncate">
                  Editing: {selectedFileName}
                </span>
                <span className="text-[10px] text-slate-400">
                  Click 'Save' to trigger 'modified' status
                </span>
              </div>
              <textarea
                value={fileEditContent}
                onChange={(e) => setFileEditContent(e.target.value)}
                rows={4}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 font-mono text-[11px] text-slate-200 focus:outline-none focus:border-orange-500"
              />
              <button
                onClick={handleSaveFileEdits}
                className="w-full py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-colors"
              >
                Save Edits (Modifies File in Working Tree)
              </button>
            </div>
          )}

          {/* Reflog & Stash quick summary */}
          <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                <Archive className="w-3 h-3 text-amber-400" />
                <span>Stashes</span>
              </div>
              <span className="font-mono font-bold text-slate-200 text-sm">
                {state.stashes.length}
              </span>
            </div>

            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                <History className="w-3 h-3 text-cyan-400" />
                <span>Reflog Events</span>
              </div>
              <span className="font-mono font-bold text-slate-200 text-sm">
                {state.reflog.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* New File Modal */}
      {showNewFileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <form 
            onSubmit={handleCreateNewFileSubmit}
            className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <FilePlus className="w-4 h-4 text-orange-400" />
                <span>Create New File</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowNewFileModal(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400">File Name (with extension):</label>
              <input
                type="text"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                placeholder="e.g. login.js, styles.css, README.md"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-orange-500"
                autoFocus
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowNewFileModal(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!newFileName.trim()}
                className="px-3.5 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white text-xs font-bold"
              >
                Create File
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

