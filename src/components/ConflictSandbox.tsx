import React, { useState } from 'react';
import { 
  ShieldAlert, 
  GitMerge, 
  CheckCircle2, 
  Sparkles, 
  RotateCcw, 
  FileCode, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { GitRepositoryState } from '../types/git';
import confetti from 'canvas-confetti';

interface ConflictSandboxProps {
  state: GitRepositoryState;
  onResolveConflict: (resolvedContent: string, fileName: string) => void;
  onResetScenario: () => void;
}

export const ConflictSandbox: React.FC<ConflictSandboxProps> = ({
  state,
  onResolveConflict,
  onResetScenario
}) => {
  const conflictedFileName = 'button.css';
  const rawConflictedContent = state.workingDirectory[conflictedFileName]?.content || `<<<<<<< HEAD\n.btn {\n  background: #0066cc; /* Brand Blue from Main */\n  border-radius: 8px;\n  padding: 10px 20px;\n}\n=======\n.btn {\n  background: #dc2626; /* Alert Red from Feature */\n  border-radius: 12px;\n  padding: 12px 24px;\n}\n>>>>>>> feature/red-button\n`;

  const [editorContent, setEditorContent] = useState<string>(rawConflictedContent);
  const [isResolved, setIsResolved] = useState(false);

  const currentVersionCode = `.btn {\n  background: #0066cc; /* Brand Blue */\n  border-radius: 8px;\n  padding: 10px 20px;\n}`;
  const incomingVersionCode = `.btn {\n  background: #dc2626; /* Alert Red */\n  border-radius: 12px;\n  padding: 12px 24px;\n}`;
  const bothCombinedCode = `.btn {\n  background: #0066cc; /* Brand Blue default */\n  border-radius: 10px;\n  padding: 10px 20px;\n}\n\n.btn-alert {\n  background: #dc2626; /* Alert Red variant */\n  border-radius: 12px;\n  padding: 12px 24px;\n}`;

  const handleAcceptCurrent = () => {
    setEditorContent(currentVersionCode);
  };

  const handleAcceptIncoming = () => {
    setEditorContent(incomingVersionCode);
  };

  const handleAcceptBoth = () => {
    setEditorContent(bothCombinedCode);
  };

  const handleCommitResolution = () => {
    // Check if markers are still in editor
    if (editorContent.includes('<<<<<<<') || editorContent.includes('=======') || editorContent.includes('>>>>>>>')) {
      alert('⚠️ Hold on! You still have conflict markers (<<<<<<< or =======) in your code. Delete or choose one before committing!');
      return;
    }

    onResolveConflict(editorContent, conflictedFileName);
    setIsResolved(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-950 rounded-2xl border border-rose-500/30 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                Merge Conflict Interactive Lab
              </span>
              <span className="text-xs text-slate-400 font-mono">File: button.css</span>
            </div>
            <h1 className="text-xl lg:text-2xl font-extrabold text-slate-100">
              Two Branches Changed The Same Line
            </h1>
            <p className="text-xs lg:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Git does not know which design is intended, so it paused the merge and inserted conflict markers. Use the controls below to accept one version or combine both, then commit the resolution.
            </p>
          </div>

          <button
            onClick={onResetScenario}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Conflict Demo</span>
          </button>
        </div>
      </div>

      {/* Non-tech Marker Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-800/40 space-y-1">
          <div className="flex items-center gap-1.5 text-blue-400 font-mono font-bold text-xs">
            <span>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</span>
          </div>
          <p className="text-xs text-slate-300">
            <strong>Current Change:</strong> The version already present on your active branch (<span className="text-blue-300 font-mono">main</span>).
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400 font-mono font-bold text-xs">
            <span>=======</span>
          </div>
          <p className="text-xs text-slate-300">
            <strong>The Divider:</strong> Separates your code from the incoming branch's competing proposal.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-800/40 space-y-1">
          <div className="flex items-center gap-1.5 text-rose-400 font-mono font-bold text-xs">
            <span>&gt;&gt;&gt;&gt;&gt;&gt;&gt; incoming</span>
          </div>
          <p className="text-xs text-slate-300">
            <strong>Incoming Change:</strong> The version from the branch you are attempting to merge (<span className="text-rose-300 font-mono">feature/red-button</span>).
          </p>
        </div>
      </div>

      {/* Interactive Resolver Workspace */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        {/* Quick Decision Bar */}
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-bold text-slate-200 font-mono">button.css &mdash; Resolution Editor</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleAcceptCurrent}
              className="px-2.5 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 text-xs font-semibold transition-colors"
            >
              Accept Current (Blue)
            </button>
            <button
              onClick={handleAcceptIncoming}
              className="px-2.5 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 text-xs font-semibold transition-colors"
            >
              Accept Incoming (Red)
            </button>
            <button
              onClick={handleAcceptBoth}
              className="px-2.5 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 text-xs font-semibold transition-colors"
            >
              Accept Both (Combine)
            </button>
          </div>
        </div>

        {/* Textarea code editor */}
        <div className="p-4">
          <textarea
            value={editorContent}
            onChange={(e) => setEditorContent(e.target.value)}
            rows={12}
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-200 leading-relaxed focus:outline-none focus:border-orange-500 transition-colors"
            placeholder="Edit final resolved code here..."
          />
        </div>

        {/* Resolution Commit Footer */}
        <div className="bg-slate-900/60 px-4 py-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>After picking a version, Git requires: <code className="font-mono text-orange-400">git add button.css</code> then <code className="font-mono text-orange-400">git commit</code></span>
          </div>

          <button
            onClick={handleCommitResolution}
            disabled={isResolved}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
              isResolved
                ? 'bg-emerald-600 text-white cursor-default'
                : 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-orange-600/30'
            }`}
          >
            {isResolved ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Conflict Resolved & Merged!</span>
              </>
            ) : (
              <>
                <GitMerge className="w-4 h-4" />
                <span>Stage & Finalize Merge Commit</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

