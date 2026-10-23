import React, { useState } from 'react';
import { 
  GitRepositoryState, 
  GitCommit 
} from '../types/git';
import { 
  Laptop, 
  Package, 
  BookMarked, 
  Cloud, 
  ArrowRight, 
  ArrowLeft,
  GitBranch, 
  GitCommit as CommitIcon, 
  Tag as TagIcon,
  Archive,
  Info,
  CheckCircle,
  FileCode,
  FileText,
  Clock,
  User
} from 'lucide-react';

interface GitVisualizerProps {
  state: GitRepositoryState;
  activeCommandHighlight?: string; // e.g. "git add" or "git commit"
}

export const GitVisualizer: React.FC<GitVisualizerProps> = ({
  state,
  activeCommandHighlight
}) => {
  const [selectedCommit, setSelectedCommit] = useState<GitCommit | null>(null);

  const wdFiles = Object.values(state.workingDirectory);
  const stagedFiles = Object.values(state.stagingArea);
  const commitsList = Object.values(state.commits);

  // Determine which arrow is active based on command highlight
  const isAddActive = activeCommandHighlight?.includes('add');
  const isCommitActive = activeCommandHighlight?.includes('commit');
  const isPushActive = activeCommandHighlight?.includes('push');
  const isFetchPullActive = activeCommandHighlight?.includes('pull') || activeCommandHighlight?.includes('fetch');
  const isRestoreActive = activeCommandHighlight?.includes('restore') || activeCommandHighlight?.includes('checkout');
  const isResetActive = activeCommandHighlight?.includes('reset');

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 lg:p-5 shadow-xl space-y-5">
      {/* Visualizer Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <span>Live Git State Visualizer</span>
            <span className="text-xs font-mono font-normal text-slate-400 lowercase">
              (branch: <span className="text-orange-400 font-bold">{state.currentBranch}</span>{state.headDetached ? ' [detached]' : ''})
            </span>
          </h3>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-orange-400" /> HEAD
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> Committed
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400" /> Staged
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-400" /> Untracked / Modified
          </span>
        </div>
      </div>

      {/* 4-Stage Architecture Pipeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 lg:gap-4 relative">
        {/* Stage 1: Working Directory */}
        <div className={`flex flex-col bg-slate-950/70 rounded-xl border p-3 min-h-[170px] transition-all ${
          isAddActive || isRestoreActive ? 'border-orange-500 shadow-md shadow-orange-500/20' : 'border-slate-800'
        }`}>
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <Laptop className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-bold text-slate-200">1. Working Dir</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Your Desk</span>
          </div>

          <div className="flex-1 space-y-1.5 overflow-y-auto max-h-[130px] pr-1">
            {wdFiles.length === 0 ? (
              <p className="text-[11px] text-slate-500 italic py-4 text-center">Empty directory</p>
            ) : (
              wdFiles.map(file => (
                <div 
                  key={file.name}
                  className="flex items-center justify-between p-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px]"
                >
                  <span className="font-mono text-slate-300 truncate max-w-[110px]" title={file.name}>
                    {file.name}
                  </span>
                  <span className={`px-1.5 py-0.5 rounded text-[9px] uppercase font-bold ${
                    file.status === 'untracked' 
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
                      : file.status === 'modified'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : file.status === 'staged'
                      ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}>
                    {file.status}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Action indicator */}
          <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>Total: {wdFiles.length} file(s)</span>
            <span className="text-orange-400 flex items-center gap-0.5">
              git add <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Stage 2: Staging Area (Index) */}
        <div className={`flex flex-col bg-slate-950/70 rounded-xl border p-3 min-h-[170px] transition-all ${
          isAddActive || isCommitActive ? 'border-amber-500 shadow-md shadow-amber-500/20' : 'border-slate-800'
        }`}>
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-slate-200">2. Staging Area</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Shipping Box</span>
          </div>

          <div className="flex-1 space-y-1.5 overflow-y-auto max-h-[130px] pr-1">
            {stagedFiles.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-5 text-center text-slate-500 text-[11px]">
                <Package className="w-5 h-5 text-slate-600 mb-1" />
                <span>Box is empty</span>
                <span className="text-[9px] text-slate-600">Run "git add" to stage</span>
              </div>
            ) : (
              stagedFiles.map(file => (
                <div 
                  key={file.name}
                  className="flex items-center justify-between p-1.5 rounded-lg bg-amber-950/20 border border-amber-800/40 text-[11px]"
                >
                  <span className="font-mono text-amber-200 truncate max-w-[110px]" title={file.name}>
                    {file.name}
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] uppercase font-bold bg-amber-500/20 text-amber-300">
                    Ready
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>Staged: {stagedFiles.length}</span>
            <span className="text-emerald-400 flex items-center gap-0.5">
              git commit <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Stage 3: Local Repository */}
        <div className={`flex flex-col bg-slate-950/70 rounded-xl border p-3 min-h-[170px] transition-all ${
          isCommitActive || isResetActive ? 'border-emerald-500 shadow-md shadow-emerald-500/20' : 'border-slate-800'
        }`}>
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <BookMarked className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-slate-200">3. Local Repo</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">The Vault</span>
          </div>

          <div className="flex-1 space-y-1.5 overflow-y-auto max-h-[130px] pr-1">
            <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">HEAD:</span>
                <span className="font-mono text-orange-400 font-bold">
                  {state.headCommitId?.substring(0, 7) || 'none'}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Active Branch:</span>
                <span className="font-mono text-emerald-400 font-bold truncate max-w-[100px]">
                  {state.currentBranch}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Total Commits:</span>
                <span className="font-mono text-slate-300">
                  {commitsList.length}
                </span>
              </div>
            </div>

            {/* Stashes badge if any */}
            {state.stashes.length > 0 && (
              <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-300">
                <Archive className="w-3 h-3 text-amber-400" />
                <span>{state.stashes.length} stash in drawer</span>
              </div>
            )}
          </div>

          <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>Branches: {Object.keys(state.branches).length}</span>
            <span className="text-cyan-400 flex items-center gap-0.5">
              git push <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Stage 4: Remote Repository (Cloud / GitHub) */}
        <div className={`flex flex-col bg-slate-950/70 rounded-xl border p-3 min-h-[170px] transition-all ${
          isPushActive || isFetchPullActive ? 'border-cyan-500 shadow-md shadow-cyan-500/20' : 'border-slate-800'
        }`}>
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <Cloud className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-slate-200">4. Remote (GitHub)</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">The Cloud</span>
          </div>

          <div className="flex-1 space-y-1.5 overflow-y-auto max-h-[130px] pr-1">
            {Object.keys(state.remotes).length === 0 ? (
              <div className="flex flex-col items-center justify-center py-5 text-center text-slate-500 text-[11px]">
                <Cloud className="w-5 h-5 text-slate-600 mb-1" />
                <span>No remote attached</span>
                <span className="text-[9px] text-slate-600">git remote add origin</span>
              </div>
            ) : (
              Object.values(state.remotes).map(remote => (
                <div key={remote.name} className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-cyan-400 font-mono">{remote.name}</span>
                    <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                      Connected
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate" title={remote.url}>
                    {remote.url}
                  </div>
                  <div className="text-[10px] text-slate-300 font-mono">
                    origin/main: {remote.branches['main'] ? remote.branches['main'].substring(0, 7) : 'n/a'}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>Remote Sync</span>
            <span className="text-slate-400 flex items-center gap-0.5">
              <ArrowLeft className="w-3 h-3 text-cyan-400" /> git pull
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Commit DAG Graph */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-orange-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Commit History DAG (Click any node to inspect snapshot)
            </h4>
          </div>
          <span className="text-[11px] text-slate-400">
            {commitsList.length} total node(s) in graph
          </span>
        </div>

        {/* Commit nodes visualization */}
        <div className="flex items-center gap-3 overflow-x-auto py-3 px-2">
          {commitsList.length === 0 ? (
            <div className="text-center py-6 text-slate-500 text-xs w-full">
              No commits yet. Run "git commit -m 'Initial commit'" to create the first checkpoint!
            </div>
          ) : (
            commitsList.map((commit, idx) => {
              const isHead = commit.id === state.headCommitId;
              const isSelected = selectedCommit?.id === commit.id;
              
              // Branches pointing here
              const pointingBranches = Object.entries(state.branches)
                .filter(([_, commitId]) => commitId === commit.id)
                .map(([name]) => name);

              // Tags pointing here
              const pointingTags = Object.values(state.tags)
                .filter(t => t.commitId === commit.id)
                .map(t => t.name);

              return (
                <React.Fragment key={commit.id}>
                  {idx > 0 && (
                    <div className="flex items-center text-slate-600 flex-shrink-0">
                      <div className="w-6 h-0.5 bg-slate-700" />
                      <ArrowRight className="w-3 h-3 -ml-1 text-slate-500" />
                    </div>
                  )}

                  <div
                    onClick={() => setSelectedCommit(commit)}
                    className={`flex-shrink-0 cursor-pointer rounded-xl p-3 border transition-all duration-200 min-w-[170px] max-w-[210px] ${
                      isSelected
                        ? 'bg-orange-950/40 border-orange-500 ring-2 ring-orange-500/20 shadow-lg'
                        : isHead
                        ? 'bg-slate-900 border-orange-500/80 shadow-md'
                        : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    {/* Header: Hash and Badges */}
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-orange-400">
                        <CommitIcon className="w-3.5 h-3.5" />
                        <span>{commit.id.substring(0, 7)}</span>
                      </div>
                      {isHead && (
                        <span className="px-1.5 py-0.2 rounded bg-orange-500/20 text-orange-300 border border-orange-500/40 text-[9px] font-bold uppercase">
                          HEAD
                        </span>
                      )}
                    </div>

                    {/* Commit Message */}
                    <p className="text-xs font-medium text-slate-200 line-clamp-2 leading-tight mb-2" title={commit.message}>
                      {commit.message}
                    </p>

                    {/* Branch Labels */}
                    <div className="flex flex-wrap gap-1 mt-1">
                      {pointingBranches.map(branchName => (
                        <span
                          key={branchName}
                          className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1"
                        >
                          <GitBranch className="w-2.5 h-2.5" />
                          {branchName}
                        </span>
                      ))}

                      {pointingTags.map(tag => (
                        <span
                          key={tag}
                          className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1"
                        >
                          <TagIcon className="w-2.5 h-2.5" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Author & Timestamp */}
                    <div className="mt-2 pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                      <span className="truncate max-w-[80px]">{commit.author.split(' ')[0]}</span>
                      <span>{commit.timestamp}</span>
                    </div>
                  </div>
                </React.Fragment>
              );
            })
          )}
        </div>

        {/* Selected Commit Detail Inspector Drawer */}
        {selectedCommit && (
          <div className="mt-4 p-3.5 bg-slate-900 rounded-xl border border-slate-800 animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <CommitIcon className="w-4 h-4 text-orange-400" />
                <span className="text-xs font-bold text-slate-100 font-mono">
                  Commit Inspector: {selectedCommit.fullHash}
                </span>
              </div>
              <button
                onClick={() => setSelectedCommit(null)}
                className="text-xs text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800"
              >
                Close ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-xs">
              <div>
                <p className="text-slate-400 text-[11px] mb-1">Message:</p>
                <p className="font-semibold text-slate-100 bg-slate-950 p-2 rounded border border-slate-800">
                  {selectedCommit.message}
                </p>

                <div className="flex items-center gap-4 mt-2 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3 text-slate-500" />
                    {selectedCommit.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {selectedCommit.timestamp}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-slate-400 text-[11px] mb-1">Files in this snapshot ({Object.keys(selectedCommit.files).length}):</p>
                <div className="space-y-1 max-h-[90px] overflow-y-auto">
                  {Object.entries(selectedCommit.files).map(([fileName, content]) => (
                    <div key={fileName} className="flex items-center justify-between p-1.5 rounded bg-slate-950 border border-slate-800 text-[11px] font-mono">
                      <span className="text-slate-300 flex items-center gap-1.5">
                        <FileCode className="w-3 h-3 text-orange-400" />
                        {fileName}
                      </span>
                      <span className="text-slate-500 text-[10px]">
                        {content.length} bytes
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

