import React, { useState, useEffect } from 'react';
import { CleanNavbar } from './components/CleanNavbar';
import { CleanLessonJourney } from './components/CleanLessonJourney';
import { KidFriendlyVisualizer } from './components/KidFriendlyVisualizer';
import { ConflictSandbox } from './components/ConflictSandbox';
import { SimpleCheatSheet } from './components/SimpleCheatSheet';
import { SIMPLE_CURRICULUM } from './data/simpleCurriculum';
import { GitRepositoryState, GitCommit, GitFile } from './types/git';
import { createInitialGitState, executeGitCommand } from './engine/gitEngine';
import { PRESET_SCENARIOS } from './data/presetScenarios';
import confetti from 'canvas-confetti';

export function App() {
  const totalSteps = SIMPLE_CURRICULUM.reduce((sum, lvl) => sum + lvl.steps.length, 0);

  // Active Tab: 'journey' | 'sandbox' | 'conflict' | 'dictionary'
  const [activeTab, setActiveTab] = useState<'journey' | 'sandbox' | 'conflict' | 'dictionary'>('journey');

  // Track completed steps
  const [completedStepIds, setCompletedStepIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('gitflow_simple_completed');
    if (saved) {
      try {
        return new Set(JSON.parse(saved));
      } catch (e) {
        return new Set();
      }
    }
    return new Set(['1-1']);
  });

  // Simulated Git Repository State
  const [gitState, setGitState] = useState<GitRepositoryState>(() => createInitialGitState());

  // Recent Action Speech Bubble
  const [recentActionMessage, setRecentActionMessage] = useState<string>(
    'Welcome! Look at the 4 boxes below: Your Desk, your Backpack, your Photo Album, and the Cloud Castle!'
  );
  const [recentCommand, setRecentCommand] = useState<string>('git status');

  useEffect(() => {
    localStorage.setItem('gitflow_simple_completed', JSON.stringify(Array.from(completedStepIds)));
  }, [completedStepIds]);

  // Execute interactive actions triggered from buttons or lessons
  const handleExecuteAction = (actionType: string, payload?: string) => {
    switch (actionType) {
      case 'create_file': {
        const fileName = payload || 'sketch_' + Math.floor(Math.random() * 90 + 10) + '.png';
        const nextWd = { ...gitState.workingDirectory };
        nextWd[fileName] = {
          name: fileName,
          status: 'untracked',
          content: `// Drawing content for ${fileName}\n`
        };
        setGitState({ ...gitState, workingDirectory: nextWd });
        setRecentActionMessage(`🎨 You drew a brand new file: "${fileName}"! It is sitting on your desk.`);
        setRecentCommand(`touch ${fileName}`);
        break;
      }

      case 'git_add': {
        const nextWd = { ...gitState.workingDirectory };
        const nextStaging = { ...gitState.stagingArea };
        for (const [name, file] of Object.entries(nextWd)) {
          nextStaging[name] = { ...file, status: 'staged', stagedContent: file.content };
          nextWd[name] = { ...file, status: 'staged', stagedContent: file.content };
        }
        setGitState({ ...gitState, workingDirectory: nextWd, stagingArea: nextStaging });
        setRecentActionMessage(`🎒 Packed! All ${Object.keys(nextStaging).length} drawing(s) on your desk are zipped into your backpack ready for a photo!`);
        setRecentCommand('git add .');
        break;
      }

      case 'git_commit': {
        const msg = payload || 'Save drawing checkpoint';
        const hasStaged = Object.keys(gitState.stagingArea).length > 0;
        
        let stagingToCommit = { ...gitState.stagingArea };
        const nextWd = { ...gitState.workingDirectory };
        if (!hasStaged) {
          for (const [name, file] of Object.entries(nextWd)) {
            stagingToCommit[name] = { ...file, status: 'staged' };
          }
        }

        const newId = Math.random().toString(36).substring(2, 9);
        const parentId = gitState.headCommitId;
        const newCommit: GitCommit = {
          id: newId,
          fullHash: newId + '00000000000000000000000000000000000',
          message: msg,
          author: 'Alex Developer <alex@example.com>',
          timestamp: 'Just now',
          parentIds: parentId ? [parentId] : [],
          branchName: gitState.currentBranch,
          files: {}
        };

        for (const name of Object.keys(nextWd)) {
          nextWd[name] = { ...nextWd[name], status: 'committed', committedContent: nextWd[name].content };
        }

        const nextCommits = { ...gitState.commits, [newId]: newCommit };
        const nextBranches = { ...gitState.branches, [gitState.currentBranch]: newId };

        setGitState({
          ...gitState,
          headCommitId: newId,
          branches: nextBranches,
          commits: nextCommits,
          workingDirectory: nextWd,
          stagingArea: {}
        });

        setRecentActionMessage(`📸 CLICK! Checkpoint photo taken and glued into your album: "${msg}"! Your backpack is now zipped empty.`);
        setRecentCommand(`git commit -m "${msg}"`);
        break;
      }

      case 'git_branch': {
        const branchName = payload || 'fun-experiment';
        const currentHead = gitState.headCommitId || '101a001';
        const nextBranches = { ...gitState.branches, [branchName]: currentHead };
        setGitState({ ...gitState, branches: nextBranches });
        setRecentActionMessage(`🌿 New parallel path planted: "${branchName}"! It shares the current photo, ready for exploration.`);
        setRecentCommand(`git branch ${branchName}`);
        break;
      }

      case 'git_switch': {
        const targetBranch = payload || 'main';
        if (gitState.branches[targetBranch]) {
          setGitState({
            ...gitState,
            currentBranch: targetBranch,
            headCommitId: gitState.branches[targetBranch]
          });
          setRecentActionMessage(`🚀 Teleported! You stepped through the door onto "${targetBranch}". Your desk now shows this path.`);
          setRecentCommand(`git switch ${targetBranch}`);
        }
        break;
      }

      case 'git_merge': {
        const source = payload || 'feature/login';
        const currentHead = gitState.headCommitId || '101a001';
        const newMergeId = Math.random().toString(36).substring(2, 9);
        const newCommit: GitCommit = {
          id: newMergeId,
          fullHash: newMergeId + 'merge000000000000000000000000000',
          message: `Merge branch '${source}' into ${gitState.currentBranch}`,
          author: 'Alex Developer <alex@example.com>',
          timestamp: 'Just now',
          parentIds: [currentHead],
          branchName: gitState.currentBranch,
          files: {}
        };

        setGitState({
          ...gitState,
          headCommitId: newMergeId,
          branches: { ...gitState.branches, [gitState.currentBranch]: newMergeId },
          commits: { ...gitState.commits, [newMergeId]: newCommit }
        });

        setRecentActionMessage(`🤝 United! All creations from "${source}" are now blended into "${gitState.currentBranch}".`);
        setRecentCommand(`git merge ${source}`);
        break;
      }

      case 'git_restore': {
        const nextWd = { ...gitState.workingDirectory };
        for (const [name, file] of Object.entries(nextWd)) {
          if (file.committedContent) {
            nextWd[name] = { ...file, status: 'committed', content: file.committedContent };
          } else {
            delete nextWd[name];
          }
        }
        setGitState({ ...gitState, workingDirectory: nextWd, stagingArea: {} });
        setRecentActionMessage(`🧽 Squeaky clean! All messy uncommitted scribbles were wiped off your desk back to the last safe photo.`);
        setRecentCommand('git restore .');
        break;
      }

      case 'git_stash': {
        setGitState({ ...gitState, stagingArea: {} });
        setRecentActionMessage(`🗄️ Tucked into secret drawer! Your desk is spotless. Type "git stash pop" whenever you want your drawings back.`);
        setRecentCommand('git stash');
        break;
      }

      case 'git_push': {
        const nextRemotes = { ...gitState.remotes };
        if (!nextRemotes['origin']) {
          nextRemotes['origin'] = {
            name: 'origin',
            url: 'https://github.com/my-name/superhero-app.git',
            branches: {}
          };
        }
        nextRemotes['origin'].branches[gitState.currentBranch] = gitState.headCommitId || '101a001';
        setGitState({ ...gitState, remotes: nextRemotes });
        setRecentActionMessage(`🚀 WHOOSH! Satellite launched! Your photo album is backed up on GitHub Cloud Castle.`);
        setRecentCommand('git push -u origin main');
        break;
      }

      default:
        break;
    }
  };

  const handleRunCommandString = (cmd: string) => {
    const result = executeGitCommand(cmd, gitState);
    setGitState(result.nextState);
    setRecentCommand(cmd);
    setRecentActionMessage(result.output.split('\n')[0] || `Ran command: ${cmd}`);
  };

  const handleMarkStepComplete = (stepId: string) => {
    setCompletedStepIds(prev => new Set([...prev, stepId]));
  };

  const handleResetAll = () => {
    setGitState(createInitialGitState());
    setRecentActionMessage('Everything reset to clean empty start!');
    setRecentCommand('git status');
  };

  const handleResolveConflictCommit = (resolvedContent: string, fileName: string) => {
    const nextWd = { ...gitState.workingDirectory };
    nextWd[fileName] = {
      name: fileName,
      status: 'committed',
      content: resolvedContent,
      committedContent: resolvedContent
    };

    const newId = 'mrg' + Math.floor(Math.random() * 899 + 100);
    const newCommit: GitCommit = {
      id: newId,
      fullHash: newId + 'conflictfixed0000000000000000000',
      message: `Merge branch 'feature/red-button' into main (Resolved conflict in ${fileName})`,
      author: 'Alex Developer <alex@example.com>',
      timestamp: 'Just now',
      parentIds: [gitState.headCommitId || 'm400004'],
      branchName: 'main',
      files: { [fileName]: resolvedContent }
    };

    setGitState({
      ...gitState,
      workingDirectory: nextWd,
      stagingArea: {},
      mergeInProgress: null,
      headCommitId: newId,
      branches: { ...gitState.branches, 'main': newId },
      commits: { ...gitState.commits, [newId]: newCommit }
    });

    setRecentActionMessage(`🎉 Conflict resolved! Created merge checkpoint [main ${newId}]. Peace restored!`);
    setRecentCommand('git commit -m "Resolve conflict"');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-orange-500/30 selection:text-orange-200">
      {/* Top Friendly Navbar */}
      <CleanNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        completedStepsCount={completedStepIds.size}
        totalStepsCount={totalSteps}
        onResetAll={handleResetAll}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 lg:px-8 py-6 space-y-8">
        {/* Tab 1: Crystal Clear Lessons Journey */}
        {activeTab === 'journey' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Step Lesson Card */}
            <CleanLessonJourney
              onExecuteAction={handleExecuteAction}
              completedStepIds={completedStepIds}
              onMarkStepComplete={handleMarkStepComplete}
            />

            {/* The 4 Places Visualizer (Desk, Backpack, Album, Cloud) */}
            <KidFriendlyVisualizer
              state={gitState}
              onExecuteAction={handleExecuteAction}
              recentActionMessage={recentActionMessage}
              recentCommand={recentCommand}
            />
          </div>
        )}

        {/* Tab 2: Toy Sandbox Playground */}
        {activeTab === 'sandbox' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-gradient-to-r from-orange-950/30 via-slate-900 to-slate-950 rounded-3xl border border-orange-500/30 p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-100 flex items-center gap-2">
                  <span>🎮 The Toy Sandbox</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Click the buttons below to draw files, pack backpacks, take photo commits, and create branches freely!
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleExecuteAction('create_file', 'drawing_' + Math.floor(Math.random() * 89 + 10) + '.png')}
                  className="px-3.5 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-bold transition-all"
                >
                  + Add Random Drawing
                </button>
                <button
                  onClick={handleResetAll}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all"
                >
                  Reset Desk
                </button>
              </div>
            </div>

            <KidFriendlyVisualizer
              state={gitState}
              onExecuteAction={handleExecuteAction}
              recentActionMessage={recentActionMessage}
              recentCommand={recentCommand}
            />
          </div>
        )}

        {/* Tab 3: Conflict Lab */}
        {activeTab === 'conflict' && (
          <div className="animate-fadeIn">
            <ConflictSandbox
              state={gitState}
              onResolveConflict={handleResolveConflictCommit}
              onResetScenario={() => setGitState(PRESET_SCENARIOS[2].state)}
            />
          </div>
        )}

        {/* Tab 4: Plain English Dictionary */}
        {activeTab === 'dictionary' && (
          <div className="animate-fadeIn">
            <SimpleCheatSheet
              onRunInSimulator={(cmd) => {
                handleRunCommandString(cmd);
                setActiveTab('sandbox');
              }}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <p>GitAcademy — Designed so anyone from 5 to 95 can master Git without fear ❤️</p>
      </footer>
    </div>
  );
}

export default App;
