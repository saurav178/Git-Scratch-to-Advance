import { GitRepositoryState, GitCommit, GitFile, GitStashEntry, GitReflogEntry } from '../types/git';

export function createInitialGitState(): GitRepositoryState {
  const initialCommitId = 'e4a89c1';
  const initialCommit: GitCommit = {
    id: initialCommitId,
    fullHash: 'e4a89c1f72b904d6e902b3c1a84f5018e69c27d8',
    message: 'Initial project setup & README',
    author: 'Alex Developer <alex@example.com>',
    timestamp: '2 hours ago',
    parentIds: [],
    branchName: 'main',
    files: {
      'README.md': '# Welcome to My Project\nThis is a sample project managed with Git.',
      'index.html': '<!DOCTYPE html>\n<html>\n  <head><title>App</title></head>\n  <body><h1>Hello World</h1></body>\n</html>'
    }
  };

  const c2Id = '3b9f1d2';
  const c2: GitCommit = {
    id: c2Id,
    fullHash: '3b9f1d2a456c78e901f23456789abcdef0123456',
    message: 'Add styling and base layout',
    author: 'Alex Developer <alex@example.com>',
    timestamp: '1 hour ago',
    parentIds: [initialCommitId],
    branchName: 'main',
    files: {
      'README.md': '# Welcome to My Project\nThis is a sample project managed with Git.',
      'index.html': '<!DOCTYPE html>\n<html>\n  <head><title>App</title><link rel="stylesheet" href="style.css"></head>\n  <body><h1>Hello World</h1></body>\n</html>',
      'style.css': 'body { font-family: sans-serif; background: #0f172a; color: #fff; }'
    }
  };

  return {
    isInitialized: true,
    currentBranch: 'main',
    headDetached: false,
    headCommitId: c2Id,
    branches: {
      'main': c2Id,
      'feature/login': c2Id
    },
    commits: {
      [initialCommitId]: initialCommit,
      [c2Id]: c2
    },
    tags: {
      'v0.1.0': {
        name: 'v0.1.0',
        commitId: initialCommitId,
        annotated: true,
        message: 'First alpha release'
      }
    },
    workingDirectory: {
      'README.md': {
        name: 'README.md',
        status: 'committed',
        content: '# Welcome to My Project\nThis is a sample project managed with Git.',
        committedContent: '# Welcome to My Project\nThis is a sample project managed with Git.'
      },
      'index.html': {
        name: 'index.html',
        status: 'committed',
        content: '<!DOCTYPE html>\n<html>\n  <head><title>App</title><link rel="stylesheet" href="style.css"></head>\n  <body><h1>Hello World</h1></body>\n</html>',
        committedContent: '<!DOCTYPE html>\n<html>\n  <head><title>App</title><link rel="stylesheet" href="style.css"></head>\n  <body><h1>Hello World</h1></body>\n</html>'
      },
      'style.css': {
        name: 'style.css',
        status: 'committed',
        content: 'body { font-family: sans-serif; background: #0f172a; color: #fff; }',
        committedContent: 'body { font-family: sans-serif; background: #0f172a; color: #fff; }'
      },
      'app.js': {
        name: 'app.js',
        status: 'untracked',
        content: '// New javascript logic\nconsole.log("App ready!");'
      }
    },
    stagingArea: {},
    stashes: [],
    reflog: [
      { id: '1', selector: 'HEAD@{0}', action: 'commit: Add styling and base layout', commitId: c2Id },
      { id: '2', selector: 'HEAD@{1}', action: 'commit (initial): Initial project setup & README', commitId: initialCommitId }
    ],
    remotes: {
      'origin': {
        name: 'origin',
        url: 'https://github.com/alex/git-demo.git',
        branches: {
          'main': c2Id
        }
      }
    },
    mergeInProgress: null
  };
}

export function generateRandomHash(): string {
  const chars = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < 7; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export interface ExecutionResult {
  nextState: GitRepositoryState;
  output: string;
  type: 'output' | 'error' | 'success' | 'info';
}

export function executeGitCommand(
  rawCommand: string,
  state: GitRepositoryState
): ExecutionResult {
  const trimmed = rawCommand.trim();
  if (!trimmed) {
    return { nextState: state, output: '', type: 'output' };
  }

  // Handle shell helpers like 'clear', 'ls', 'pwd', 'touch', 'cat'
  if (trimmed === 'clear') {
    return { nextState: state, output: '__CLEAR__', type: 'output' };
  }

  if (trimmed === 'pwd') {
    return { nextState: state, output: '/Users/student/projects/my-git-app', type: 'output' };
  }

  if (trimmed === 'ls') {
    const files = Object.keys(state.workingDirectory).join('   ');
    return { nextState: state, output: files || '(empty directory)', type: 'output' };
  }

  if (trimmed.startsWith('cat ')) {
    const fileName = trimmed.substring(4).trim();
    const file = state.workingDirectory[fileName];
    if (!file) {
      return { nextState: state, output: `cat: ${fileName}: No such file or directory`, type: 'error' };
    }
    return { nextState: state, output: file.content, type: 'output' };
  }

  if (trimmed.startsWith('touch ')) {
    const fileName = trimmed.substring(6).trim();
    if (!fileName) {
      return { nextState: state, output: 'usage: touch <filename>', type: 'error' };
    }
    const nextWd = { ...state.workingDirectory };
    if (!nextWd[fileName]) {
      nextWd[fileName] = {
        name: fileName,
        status: 'untracked',
        content: `// New file: ${fileName}\n`
      };
    }
    return {
      nextState: { ...state, workingDirectory: nextWd },
      output: `Created new file: ${fileName}`,
      type: 'success'
    };
  }

  if (trimmed.startsWith('echo ')) {
    // support `echo "hello" > file.txt` or `echo "hello"`
    const match = trimmed.match(/^echo\s+["']?(.*?)["']?\s*>\s*([a-zA-Z0-9_.-]+)$/);
    if (match) {
      const content = match[1];
      const fileName = match[2];
      const nextWd = { ...state.workingDirectory };
      const existing = nextWd[fileName];
      const isCommitted = existing && existing.committedContent !== undefined;
      nextWd[fileName] = {
        name: fileName,
        status: isCommitted ? 'modified' : 'untracked',
        content: content + '\n',
        committedContent: existing?.committedContent
      };
      return {
        nextState: { ...state, workingDirectory: nextWd },
        output: `Wrote to ${fileName}`,
        type: 'success'
      };
    }
    return { nextState: state, output: trimmed.substring(5).replace(/^["']|["']$/g, ''), type: 'output' };
  }

  // Not a git command check
  if (!trimmed.startsWith('git')) {
    return {
      nextState: state,
      output: `command not recognized: '${trimmed}'. Did you mean a Git command? Try 'git status', 'git add', or 'git commit'.`,
      type: 'error'
    };
  }

  const parts = trimmed.split(/\s+/);
  const subCommand = parts[1];

  // If not initialized yet and command is not 'git init'
  if (!state.isInitialized && subCommand !== 'init' && subCommand !== 'clone' && subCommand !== 'help' && subCommand !== '--version') {
    return {
      nextState: state,
      output: 'fatal: not a git repository (or any of the parent directories): .git\nRun "git init" to initialize a repository.',
      type: 'error'
    };
  }

  switch (subCommand) {
    case '--version':
    case 'version': {
      return {
        nextState: state,
        output: 'git version 2.44.0 (GitFlow Interactive Academy Engine)',
        type: 'output'
      };
    }

    case 'help': {
      return {
        nextState: state,
        output: `Common Git commands:
  start a working area:
     init        Create an empty Git repository or reinitialize an existing one
     clone       Clone a repository into a new directory

  work on current change:
     status      Show the working tree status
     diff        Show changes between commits, commit and working tree
     add         Add file contents to the staging area
     restore     Restore working tree files or unstage

  grow, mark and tweak your common history:
     commit      Record changes to the repository
     branch      List, create, or delete branches
     switch      Switch branches (modern)
     checkout    Switch branches or restore files
     merge       Join two or more development histories together
     rebase      Reapply commits on top of another base tip
     reset       Reset current HEAD to the specified state (--soft/--mixed/--hard)
     revert      Revert some existing commits safely
     tag         Create, list, delete or verify a tag object signed with GPG
     log         Show commit logs

  collaborate and sync:
     fetch       Download objects and refs from another repository
     pull        Fetch from and integrate with another repository or local branch
     push        Update remote refs along with associated objects
     remote      Manage set of tracked repositories
     stash       Stash the changes in a dirty working directory away`,
        type: 'info'
      };
    }

    case 'init': {
      const isAlready = state.isInitialized;
      const initialCommitId = generateRandomHash();
      const initialCommit: GitCommit = {
        id: initialCommitId,
        fullHash: initialCommitId + '000000000000000000000000000000000',
        message: 'Initial empty repository setup',
        author: 'User <user@example.com>',
        timestamp: 'Just now',
        parentIds: [],
        branchName: 'main',
        files: {}
      };

      const newState: GitRepositoryState = {
        ...state,
        isInitialized: true,
        currentBranch: 'main',
        headDetached: false,
        headCommitId: initialCommitId,
        branches: { 'main': initialCommitId },
        commits: { [initialCommitId]: initialCommit },
        tags: {},
        workingDirectory: isAlready ? state.workingDirectory : {
          'index.js': { name: 'index.js', status: 'untracked', content: 'console.log("Hello Git!");' }
        },
        stagingArea: {},
        stashes: [],
        reflog: [
          { id: '1', selector: 'HEAD@{0}', action: 'init: Initialized empty Git repository', commitId: initialCommitId }
        ],
        remotes: {}
      };

      return {
        nextState: newState,
        output: isAlready
          ? 'Reinitialized existing Git repository in /Users/student/projects/my-git-app/.git/'
          : 'Initialized empty Git repository in /Users/student/projects/my-git-app/.git/\nCreated default branch "main"',
        type: 'success'
      };
    }

    case 'config': {
      if (trimmed.includes('user.name')) {
        const name = trimmed.split('user.name')[1]?.trim()?.replace(/["']/g, '');
        return {
          nextState: state,
          output: name ? `Configured user.name = "${name}"` : 'user.name=Alex Developer',
          type: 'success'
        };
      }
      if (trimmed.includes('user.email')) {
        const email = trimmed.split('user.email')[1]?.trim()?.replace(/["']/g, '');
        return {
          nextState: state,
          output: email ? `Configured user.email = "${email}"` : 'user.email=alex@example.com',
          type: 'success'
        };
      }
      if (trimmed.includes('--list')) {
        return {
          nextState: state,
          output: `user.name=Alex Developer\nuser.email=alex@example.com\ninit.defaultBranch=main\ncore.editor=code\ncore.autocrlf=input`,
          type: 'output'
        };
      }
      return {
        nextState: state,
        output: 'git config: configure repository or global options (e.g. git config --global user.name "Your Name")',
        type: 'info'
      };
    }

    case 'status': {
      const branch = state.currentBranch;
      const headDetached = state.headDetached;
      let out = headDetached
        ? `HEAD detached at ${state.headCommitId?.substring(0, 7)}\n`
        : `On branch ${branch}\n`;

      // Check remote sync
      const remoteCommit = state.remotes['origin']?.branches[branch];
      const localCommit = state.branches[branch];
      if (remoteCommit && localCommit) {
        if (remoteCommit === localCommit) {
          out += `Your branch is up to date with 'origin/${branch}'.\n`;
        } else {
          out += `Your branch is ahead of 'origin/${branch}' by 1 commit. (use "git push" to publish your local commits)\n`;
        }
      }

      out += '\n';

      const stagedFiles = Object.values(state.stagingArea);
      const modifiedFiles = Object.values(state.workingDirectory).filter(f => f.status === 'modified');
      const untrackedFiles = Object.values(state.workingDirectory).filter(f => f.status === 'untracked');

      if (stagedFiles.length > 0) {
        out += 'Changes to be committed:\n  (use "git restore --staged <file>..." to unstage)\n';
        for (const f of stagedFiles) {
          out += `\x1b[32m\tnew file/modified:   ${f.name}\x1b[0m\n`;
        }
        out += '\n';
      }

      if (modifiedFiles.length > 0) {
        out += 'Changes not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n  (use "git restore <file>..." to discard changes in working directory)\n';
        for (const f of modifiedFiles) {
          out += `\x1b[31m\tmodified:   ${f.name}\x1b[0m\n`;
        }
        out += '\n';
      }

      if (untrackedFiles.length > 0) {
        out += 'Untracked files:\n  (use "git add <file>..." to include in what will be committed)\n';
        for (const f of untrackedFiles) {
          out += `\x1b[31m\t${f.name}\x1b[0m\n`;
        }
        out += '\n';
      }

      if (stagedFiles.length === 0 && modifiedFiles.length === 0 && untrackedFiles.length === 0) {
        out += 'nothing to commit, working tree clean';
      }

      return {
        nextState: state,
        output: out.trim(),
        type: 'output'
      };
    }

    case 'add': {
      const target = parts[2];
      if (!target) {
        return { nextState: state, output: 'Nothing specified, nothing added. Maybe you wanted to say "git add ."?', type: 'error' };
      }

      const nextWd = { ...state.workingDirectory };
      const nextStaging = { ...state.stagingArea };

      if (target === '.' || target === '-A' || target === '--all') {
        const addedCount = Object.keys(nextWd).length;
        if (addedCount === 0) {
          return { nextState: state, output: 'No files to add.', type: 'info' };
        }
        for (const [name, file] of Object.entries(nextWd)) {
          nextStaging[name] = { ...file, status: 'staged', stagedContent: file.content };
          nextWd[name] = { ...file, status: 'staged', stagedContent: file.content };
        }
        return {
          nextState: { ...state, workingDirectory: nextWd, stagingArea: nextStaging },
          output: `Staged ${Object.keys(nextStaging).length} file(s) for commit.`,
          type: 'success'
        };
      }

      // Specific file
      const file = nextWd[target];
      if (!file) {
        return {
          nextState: state,
          output: `fatal: pathspec '${target}' did not match any files`,
          type: 'error'
        };
      }

      nextStaging[target] = { ...file, status: 'staged', stagedContent: file.content };
      nextWd[target] = { ...file, status: 'staged', stagedContent: file.content };

      return {
        nextState: { ...state, workingDirectory: nextWd, stagingArea: nextStaging },
        output: `Staged '${target}' for commit.`,
        type: 'success'
      };
    }

    case 'commit': {
      const hasStaged = Object.keys(state.stagingArea).length > 0;
      const isAmend = parts.includes('--amend');
      const msgMatch = trimmed.match(/-m\s+["'](.*?)["']/);
      let message = msgMatch ? msgMatch[1] : '';

      if (!hasStaged && !isAmend) {
        return {
          nextState: state,
          output: 'On branch ' + state.currentBranch + '\nnothing added to commit but untracked/modified files present (use "git add" to stage)',
          type: 'error'
        };
      }

      if (!message && !isAmend) {
        message = 'Commit without message';
      }

      if (isAmend) {
        const headCommitId = state.headCommitId;
        if (!headCommitId || !state.commits[headCommitId]) {
          return { nextState: state, output: 'fatal: No commit to amend.', type: 'error' };
        }
        const oldCommit = state.commits[headCommitId];
        const newMsg = message || oldCommit.message;
        const amendedCommit: GitCommit = {
          ...oldCommit,
          message: newMsg,
          timestamp: 'Just now (amended)'
        };
        const nextCommits = { ...state.commits, [headCommitId]: amendedCommit };
        return {
          nextState: { ...state, commits: nextCommits, stagingArea: {} },
          output: `[${state.currentBranch} ${headCommitId}] ${newMsg}\n Date: amended\n 1 file changed, amended successfully.`,
          type: 'success'
        };
      }

      const newId = generateRandomHash();
      const parentId = state.headCommitId;
      const parentSnapshot = parentId && state.commits[parentId] ? state.commits[parentId].files : {};
      
      const newSnapshot: Record<string, string> = { ...parentSnapshot };
      for (const [name, file] of Object.entries(state.stagingArea)) {
        newSnapshot[name] = file.stagedContent || file.content;
      }

      const newCommit: GitCommit = {
        id: newId,
        fullHash: newId + '98a72b156f4d3c2e10a9b8c7d6e5f4a3b2c1',
        message,
        author: 'Alex Developer <alex@example.com>',
        timestamp: 'Just now',
        parentIds: parentId ? [parentId] : [],
        branchName: state.currentBranch,
        files: newSnapshot
      };

      const nextCommits = { ...state.commits, [newId]: newCommit };
      const nextBranches = { ...state.branches, [state.currentBranch]: newId };
      const nextWd = { ...state.workingDirectory };
      for (const name of Object.keys(state.stagingArea)) {
        if (nextWd[name]) {
          nextWd[name] = {
            ...nextWd[name],
            status: 'committed',
            committedContent: nextWd[name].content
          };
        }
      }

      const nextReflog: GitReflogEntry[] = [
        { id: String(state.reflog.length + 1), selector: `HEAD@{0}`, action: `commit: ${message}`, commitId: newId },
        ...state.reflog.map((r, idx) => ({ ...r, selector: `HEAD@{${idx + 1}}` }))
      ];

      return {
        nextState: {
          ...state,
          headCommitId: newId,
          branches: nextBranches,
          commits: nextCommits,
          workingDirectory: nextWd,
          stagingArea: {},
          reflog: nextReflog
        },
        output: `[${state.currentBranch} ${newId}] ${message}\n ${Object.keys(state.stagingArea).length} file(s) changed, commit saved!`,
        type: 'success'
      };
    }

    case 'branch': {
      const flagD = parts.includes('-d') || parts.includes('-D');
      if (flagD) {
        const branchIndex = parts.findIndex(p => p === '-d' || p === '-D');
        const branchToDelete = parts[branchIndex + 1];
        if (!branchToDelete) {
          return { nextState: state, output: 'fatal: branch name required', type: 'error' };
        }
        if (branchToDelete === state.currentBranch) {
          return { nextState: state, output: `error: Cannot delete branch '${branchToDelete}' checked out at current directory`, type: 'error' };
        }
        if (!state.branches[branchToDelete]) {
          return { nextState: state, output: `error: branch '${branchToDelete}' not found.`, type: 'error' };
        }
        const nextBranches = { ...state.branches };
        delete nextBranches[branchToDelete];
        return {
          nextState: { ...state, branches: nextBranches },
          output: `Deleted branch ${branchToDelete} (was ${state.branches[branchToDelete]}).`,
          type: 'success'
        };
      }

      // Check if listing branches
      if (parts.length === 2 || (parts.length === 3 && parts[2] === '-a')) {
        let out = '';
        for (const [name, hash] of Object.entries(state.branches)) {
          if (name === state.currentBranch && !state.headDetached) {
            out += `* \x1b[32m${name}\x1b[0m  ${hash}\n`;
          } else {
            out += `  ${name}  ${hash}\n`;
          }
        }
        if (parts.includes('-a')) {
          for (const remote of Object.values(state.remotes)) {
            for (const [remBranch, remHash] of Object.entries(remote.branches)) {
              out += `  \x1b[31mremotes/${remote.name}/${remBranch}\x1b[0m  ${remHash}\n`;
            }
          }
        }
        return {
          nextState: state,
          output: out.trim(),
          type: 'output'
        };
      }

      // Creating a new branch
      const newBranchName = parts[2];
      if (state.branches[newBranchName]) {
        return {
          nextState: state,
          output: `fatal: A branch named '${newBranchName}' already exists.`,
          type: 'error'
        };
      }

      const currentHead = state.headCommitId;
      if (!currentHead) {
        return { nextState: state, output: 'fatal: Not a valid object name: \'master\'.', type: 'error' };
      }

      const nextBranches = { ...state.branches, [newBranchName]: currentHead };
      return {
        nextState: { ...state, branches: nextBranches },
        output: `Created branch '${newBranchName}' pointing at commit ${currentHead.substring(0, 7)}`,
        type: 'success'
      };
    }

    case 'switch':
    case 'checkout': {
      const isCreateAndSwitch = parts.includes('-b') || parts.includes('-c');
      if (isCreateAndSwitch) {
        const flagIndex = parts.findIndex(p => p === '-b' || p === '-c');
        const targetBranch = parts[flagIndex + 1];
        if (!targetBranch) {
          return { nextState: state, output: 'fatal: Missing branch name', type: 'error' };
        }
        if (state.branches[targetBranch]) {
          return { nextState: state, output: `fatal: A branch named '${targetBranch}' already exists.`, type: 'error' };
        }
        const currentHead = state.headCommitId!;
        const nextBranches = { ...state.branches, [targetBranch]: currentHead };
        const nextReflog: GitReflogEntry[] = [
          { id: String(state.reflog.length + 1), selector: 'HEAD@{0}', action: `checkout: moving from ${state.currentBranch} to ${targetBranch}`, commitId: currentHead },
          ...state.reflog.map((r, idx) => ({ ...r, selector: `HEAD@{${idx + 1}}` }))
        ];

        return {
          nextState: {
            ...state,
            branches: nextBranches,
            currentBranch: targetBranch,
            headDetached: false,
            reflog: nextReflog
          },
          output: `Switched to a new branch '${targetBranch}'`,
          type: 'success'
        };
      }

      const target = parts[2];
      if (!target) {
        return { nextState: state, output: 'fatal: Please specify a branch or commit to switch to.', type: 'error' };
      }

      // Restoring a file using checkout -- <file>
      if (target === '--' && parts[3]) {
        const fileName = parts[3];
        const file = state.workingDirectory[fileName];
        if (!file) {
          return { nextState: state, output: `error: pathspec '${fileName}' did not match any file(s) known to git`, type: 'error' };
        }
        const nextWd = { ...state.workingDirectory };
        nextWd[fileName] = {
          ...file,
          status: 'committed',
          content: file.committedContent || file.content
        };
        return {
          nextState: { ...state, workingDirectory: nextWd },
          output: `Updated 1 path from the index`,
          type: 'success'
        };
      }

      // Branch checkout
      if (state.branches[target]) {
        const targetCommitId = state.branches[target];
        const nextReflog: GitReflogEntry[] = [
          { id: String(state.reflog.length + 1), selector: 'HEAD@{0}', action: `checkout: moving from ${state.currentBranch} to ${target}`, commitId: targetCommitId },
          ...state.reflog.map((r, idx) => ({ ...r, selector: `HEAD@{${idx + 1}}` }))
        ];

        return {
          nextState: {
            ...state,
            currentBranch: target,
            headDetached: false,
            headCommitId: targetCommitId,
            reflog: nextReflog
          },
          output: `Switched to branch '${target}'`,
          type: 'success'
        };
      }

      // Detached HEAD checkout (by commit hash)
      if (state.commits[target]) {
        const nextReflog: GitReflogEntry[] = [
          { id: String(state.reflog.length + 1), selector: 'HEAD@{0}', action: `checkout: moving from ${state.currentBranch} to ${target}`, commitId: target },
          ...state.reflog.map((r, idx) => ({ ...r, selector: `HEAD@{${idx + 1}}` }))
        ];
        return {
          nextState: {
            ...state,
            headDetached: true,
            headCommitId: target,
            reflog: nextReflog
          },
          output: `Note: switching to '${target}'.\nYou are in 'detached HEAD' state. You can look around, make experimental changes and commit them without impacting any branches.`,
          type: 'caution' as any
        };
      }

      return {
        nextState: state,
        output: `error: pathspec '${target}' did not match any file(s) or branch known to git`,
        type: 'error'
      };
    }

    case 'merge': {
      const sourceBranch = parts[2];
      if (!sourceBranch) {
        return { nextState: state, output: 'fatal: No commit/branch specified for merge.', type: 'error' };
      }
      if (sourceBranch === state.currentBranch) {
        return { nextState: state, output: 'Already up to date.', type: 'info' };
      }
      const sourceCommitId = state.branches[sourceBranch];
      if (!sourceCommitId) {
        return { nextState: state, output: `merge: ${sourceBranch} - not something we can merge`, type: 'error' };
      }

      const currentHeadId = state.headCommitId;
      if (!currentHeadId) {
        return { nextState: state, output: 'fatal: No current commit.', type: 'error' };
      }

      if (sourceCommitId === currentHeadId) {
        return { nextState: state, output: 'Already up to date.', type: 'info' };
      }

      // Fast-forward check: is current HEAD an ancestor of source?
      // In our graph simulator, if current branch can fast-forward:
      const newMergeCommitId = generateRandomHash();
      const newCommit: GitCommit = {
        id: newMergeCommitId,
        fullHash: newMergeCommitId + '11223344556677889900aabbccddeeff',
        message: `Merge branch '${sourceBranch}' into ${state.currentBranch}`,
        author: 'Alex Developer <alex@example.com>',
        timestamp: 'Just now',
        parentIds: [currentHeadId, sourceCommitId],
        branchName: state.currentBranch,
        isMergeCommit: true,
        files: {
          ...state.commits[currentHeadId].files,
          ...state.commits[sourceCommitId].files
        }
      };

      const nextCommits = { ...state.commits, [newMergeCommitId]: newCommit };
      const nextBranches = { ...state.branches, [state.currentBranch]: newMergeCommitId };
      const nextReflog: GitReflogEntry[] = [
        { id: String(state.reflog.length + 1), selector: 'HEAD@{0}', action: `merge ${sourceBranch}: Fast-forward / merge made by the 'ort' strategy.`, commitId: newMergeCommitId },
        ...state.reflog.map((r, idx) => ({ ...r, selector: `HEAD@{${idx + 1}}` }))
      ];

      return {
        nextState: {
          ...state,
          headCommitId: newMergeCommitId,
          branches: nextBranches,
          commits: nextCommits,
          reflog: nextReflog
        },
        output: `Merge made by the 'ort' strategy.\nMerged branch '${sourceBranch}' into ${state.currentBranch} (new commit ${newMergeCommitId}).`,
        type: 'success'
      };
    }

    case 'rebase': {
      const ontoBranch = parts[2];
      if (!ontoBranch) {
        return { nextState: state, output: 'fatal: specify branch to rebase onto (e.g. git rebase main)', type: 'error' };
      }
      if (!state.branches[ontoBranch]) {
        return { nextState: state, output: `fatal: invalid upstream '${ontoBranch}'`, type: 'error' };
      }
      const targetBase = state.branches[ontoBranch];
      const rebasedCommitId = generateRandomHash();
      const currentCommit = state.headCommitId ? state.commits[state.headCommitId] : null;
      const rebasedCommit: GitCommit = {
        id: rebasedCommitId,
        fullHash: rebasedCommitId + 'rebase000000000000000000000000000',
        message: currentCommit ? `${currentCommit.message} (rebased)` : 'Rebased commit',
        author: 'Alex Developer <alex@example.com>',
        timestamp: 'Just now',
        parentIds: [targetBase],
        branchName: state.currentBranch,
        files: currentCommit ? { ...currentCommit.files } : {}
      };

      const nextCommits = { ...state.commits, [rebasedCommitId]: rebasedCommit };
      const nextBranches = { ...state.branches, [state.currentBranch]: rebasedCommitId };
      return {
        nextState: {
          ...state,
          headCommitId: rebasedCommitId,
          branches: nextBranches,
          commits: nextCommits
        },
        output: `Successfully rebased and updated refs/heads/${state.currentBranch} onto ${ontoBranch} (${rebasedCommitId}).`,
        type: 'success'
      };
    }

    case 'cherry-pick': {
      const commitHash = parts[2];
      if (!commitHash || !state.commits[commitHash]) {
        return { nextState: state, output: `fatal: bad revision '${commitHash || ''}'`, type: 'error' };
      }
      const source = state.commits[commitHash];
      const newId = generateRandomHash();
      const newCommit: GitCommit = {
        id: newId,
        fullHash: newId + 'cherry00000000000000000000000000',
        message: `[cherry-pick] ${source.message}`,
        author: source.author,
        timestamp: 'Just now',
        parentIds: state.headCommitId ? [state.headCommitId] : [],
        branchName: state.currentBranch,
        files: { ...source.files }
      };

      const nextCommits = { ...state.commits, [newId]: newCommit };
      const nextBranches = { ...state.branches, [state.currentBranch]: newId };
      return {
        nextState: {
          ...state,
          headCommitId: newId,
          branches: nextBranches,
          commits: nextCommits
        },
        output: `[${state.currentBranch} ${newId}] ${source.message}\n Cherry-picked successfully from ${commitHash}!`,
        type: 'success'
      };
    }

    case 'stash': {
      const stashAction = parts[2];
      if (stashAction === 'pop') {
        if (state.stashes.length === 0) {
          return { nextState: state, output: 'error: No stash entries found.', type: 'error' };
        }
        const [popped, ...rest] = state.stashes;
        const nextWd = { ...state.workingDirectory };
        for (const file of popped.files) {
          nextWd[file.name] = file;
        }
        return {
          nextState: { ...state, stashes: rest, workingDirectory: nextWd },
          output: `On branch ${state.currentBranch}\nRestored changes from ${popped.id} ("${popped.message}")\nDropped ${popped.id}`,
          type: 'success'
        };
      }

      if (stashAction === 'list') {
        if (state.stashes.length === 0) {
          return { nextState: state, output: '(no stashes found)', type: 'output' };
        }
        const out = state.stashes.map(s => `${s.id}: WIP on ${s.branch}: ${s.message} (${s.timestamp})`).join('\n');
        return { nextState: state, output: out, type: 'output' };
      }

      // Default `git stash` save
      const dirtyFiles = Object.values(state.workingDirectory).filter(f => f.status === 'modified' || f.status === 'staged');
      if (dirtyFiles.length === 0) {
        return { nextState: state, output: 'No local changes to save', type: 'info' };
      }

      const newStash: GitStashEntry = {
        id: `stash@{${state.stashes.length}}`,
        message: parts[3] ? parts.slice(3).join(' ') : 'WIP on ' + state.currentBranch,
        timestamp: 'Just now',
        files: dirtyFiles,
        branch: state.currentBranch
      };

      const cleanWd = { ...state.workingDirectory };
      for (const f of dirtyFiles) {
        if (f.committedContent) {
          cleanWd[f.name] = { ...f, status: 'committed', content: f.committedContent };
        } else {
          delete cleanWd[f.name];
        }
      }

      return {
        nextState: {
          ...state,
          stashes: [newStash, ...state.stashes],
          workingDirectory: cleanWd,
          stagingArea: {}
        },
        output: `Saved working directory and index state WIP on ${state.currentBranch}: ${newStash.message}`,
        type: 'success'
      };
    }

    case 'reset': {
      const mode = parts.includes('--hard') ? '--hard' : parts.includes('--soft') ? '--soft' : '--mixed';
      const targetHash = parts.find(p => p !== 'git' && p !== 'reset' && p !== '--hard' && p !== '--soft' && p !== '--mixed') || 'HEAD~1';
      
      let targetCommitId = targetHash;
      if (targetHash === 'HEAD~1') {
        const head = state.headCommitId ? state.commits[state.headCommitId] : null;
        if (!head || head.parentIds.length === 0) {
          return { nextState: state, output: 'fatal: Cannot do HEAD~1, current commit has no parents', type: 'error' };
        }
        targetCommitId = head.parentIds[0];
      }

      if (!state.commits[targetCommitId]) {
        return { nextState: state, output: `fatal: ambiguous argument '${targetCommitId}': unknown revision`, type: 'error' };
      }

      const targetCommit = state.commits[targetCommitId];
      const nextBranches = { ...state.branches, [state.currentBranch]: targetCommitId };
      const nextReflog: GitReflogEntry[] = [
        { id: String(state.reflog.length + 1), selector: 'HEAD@{0}', action: `reset: moving to ${targetCommitId} (${mode})`, commitId: targetCommitId },
        ...state.reflog.map((r, idx) => ({ ...r, selector: `HEAD@{${idx + 1}}` }))
      ];

      if (mode === '--soft') {
        // Keep files in staging
        return {
          nextState: {
            ...state,
            headCommitId: targetCommitId,
            branches: nextBranches,
            reflog: nextReflog
          },
          output: `HEAD is now at ${targetCommitId.substring(0, 7)} ${targetCommit.message} (changes kept in Staging Area)`,
          type: 'success'
        };
      }

      if (mode === '--hard') {
        // Discard all changes in staging and working directory!
        const restoredWd: Record<string, GitFile> = {};
        for (const [name, content] of Object.entries(targetCommit.files)) {
          restoredWd[name] = {
            name,
            status: 'committed',
            content,
            committedContent: content
          };
        }
        return {
          nextState: {
            ...state,
            headCommitId: targetCommitId,
            branches: nextBranches,
            workingDirectory: restoredWd,
            stagingArea: {},
            reflog: nextReflog
          },
          output: `HEAD is now at ${targetCommitId.substring(0, 7)} ${targetCommit.message}\nHard reset: working tree and staging area cleared.`,
          type: 'caution' as any
        };
      }

      // --mixed (default): unstage changes, keep files in working directory as modified
      return {
        nextState: {
          ...state,
          headCommitId: targetCommitId,
          branches: nextBranches,
          stagingArea: {},
          reflog: nextReflog
        },
        output: `Unstaged changes after reset:\nM   (files kept in working directory, un-staged)`,
        type: 'info'
      };
    }

    case 'revert': {
      const commitHash = parts[2];
      if (!commitHash || !state.commits[commitHash]) {
        return { nextState: state, output: `fatal: bad revision '${commitHash || ''}'`, type: 'error' };
      }
      const target = state.commits[commitHash];
      const newId = generateRandomHash();
      const newCommit: GitCommit = {
        id: newId,
        fullHash: newId + 'revert00000000000000000000000000',
        message: `Revert "${target.message}"`,
        author: 'Alex Developer <alex@example.com>',
        timestamp: 'Just now',
        parentIds: state.headCommitId ? [state.headCommitId] : [],
        branchName: state.currentBranch,
        files: target.parentIds[0] && state.commits[target.parentIds[0]] ? state.commits[target.parentIds[0]].files : {}
      };

      const nextCommits = { ...state.commits, [newId]: newCommit };
      const nextBranches = { ...state.branches, [state.currentBranch]: newId };
      return {
        nextState: {
          ...state,
          headCommitId: newId,
          branches: nextBranches,
          commits: nextCommits
        },
        output: `[${state.currentBranch} ${newId}] Revert "${target.message}"\n 1 commit cleanly reverted without rewriting history.`,
        type: 'success'
      };
    }

    case 'remote': {
      if (parts[2] === 'add') {
        const name = parts[3];
        const url = parts[4];
        if (!name || !url) {
          return { nextState: state, output: 'usage: git remote add <name> <url>', type: 'error' };
        }
        const nextRemotes = {
          ...state.remotes,
          [name]: { name, url, branches: {} }
        };
        return {
          nextState: { ...state, remotes: nextRemotes },
          output: `Added remote repository '${name}' pointing to ${url}`,
          type: 'success'
        };
      }
      if (parts[2] === '-v') {
        let out = '';
        for (const [name, remote] of Object.entries(state.remotes)) {
          out += `${name}\t${remote.url} (fetch)\n${name}\t${remote.url} (push)\n`;
        }
        return {
          nextState: state,
          output: out.trim() || '(no remotes configured)',
          type: 'output'
        };
      }
      return {
        nextState: state,
        output: Object.keys(state.remotes).join('\n') || '(no remotes configured)',
        type: 'output'
      };
    }

    case 'push': {
      const hasOrigin = !!state.remotes['origin'];
      if (!hasOrigin) {
        return { nextState: state, output: 'fatal: No configured push destination. Use "git remote add origin <url>" first.', type: 'error' };
      }
      const currentBranch = state.currentBranch;
      const currentCommit = state.headCommitId;
      if (!currentCommit) {
        return { nextState: state, output: 'error: src refspec matches no commits', type: 'error' };
      }

      const nextRemotes = { ...state.remotes };
      nextRemotes['origin'] = {
        ...nextRemotes['origin'],
        branches: {
          ...nextRemotes['origin'].branches,
          [currentBranch]: currentCommit
        }
      };

      return {
        nextState: { ...state, remotes: nextRemotes },
        output: `Enumerating objects: 5, done.\nWriting objects: 100% (5/5), done.\nTo ${state.remotes['origin'].url}\n * [new branch]      ${currentBranch} -> ${currentBranch}\nBranch '${currentBranch}' set up to track remote branch '${currentBranch}' from 'origin'.`,
        type: 'success'
      };
    }

    case 'fetch': {
      return {
        nextState: state,
        output: `From https://github.com/alex/git-demo\n * branch            main       -> FETCH_HEAD\nEverything up-to-date with remote.`,
        type: 'output'
      };
    }

    case 'pull': {
      const remoteMain = state.remotes['origin']?.branches[state.currentBranch];
      return {
        nextState: state,
        output: `Already up to date.\nFast-forwarded with origin/${state.currentBranch}.`,
        type: 'success'
      };
    }

    case 'log': {
      const isOneline = parts.includes('--oneline');
      let currentId: string | null = state.headCommitId;
      const history: GitCommit[] = [];
      const visited = new Set<string>();

      while (currentId && !visited.has(currentId)) {
        visited.add(currentId);
        const commit = state.commits[currentId];
        if (!commit) break;
        history.push(commit);
        currentId = commit.parentIds[0] || null;
      }

      if (history.length === 0) {
        return { nextState: state, output: 'fatal: your current branch does not have any commits yet', type: 'error' };
      }

      if (isOneline) {
        const out = history.map(c => {
          const tags = Object.values(state.tags).filter(t => t.commitId === c.id).map(t => `tag: ${t.name}`);
          const branches = Object.entries(state.branches).filter(([_, hash]) => hash === c.id).map(([b]) => b);
          let decorators = [...branches, ...tags];
          if (c.id === state.headCommitId) {
            decorators = ['HEAD -> ' + state.currentBranch, ...decorators.filter(b => b !== state.currentBranch)];
          }
          const decStr = decorators.length > 0 ? ` (\x1b[33m${decorators.join(', ')}\x1b[0m)` : '';
          return `\x1b[33m${c.id.substring(0, 7)}\x1b[0m${decStr} ${c.message}`;
        }).join('\n');
        return { nextState: state, output: out, type: 'output' };
      }

      const out = history.map(c => {
        return `commit ${c.fullHash} (\x1b[33mHEAD -> ${state.currentBranch}\x1b[0m)\nAuthor: ${c.author}\nDate:   ${c.timestamp}\n\n    ${c.message}\n`;
      }).join('\n');

      return { nextState: state, output: out.trim(), type: 'output' };
    }

    case 'reflog': {
      const out = state.reflog.map(entry => {
        return `\x1b[33m${entry.commitId.substring(0, 7)}\x1b[0m ${entry.selector}: ${entry.action}`;
      }).join('\n');
      return { nextState: state, output: out || '(empty reflog)', type: 'output' };
    }

    case 'tag': {
      if (parts.length === 2) {
        // list tags
        const out = Object.keys(state.tags).join('\n');
        return { nextState: state, output: out || '(no tags created)', type: 'output' };
      }

      const tagName = parts[2] === '-a' ? parts[3] : parts[2];
      const currentCommit = state.headCommitId;
      if (!currentCommit) {
        return { nextState: state, output: 'fatal: cannot create tag without commits', type: 'error' };
      }

      const nextTags = {
        ...state.tags,
        [tagName]: {
          name: tagName,
          commitId: currentCommit,
          annotated: parts.includes('-a'),
          message: parts.includes('-m') ? parts.slice(parts.indexOf('-m') + 1).join(' ') : undefined
        }
      };

      return {
        nextState: { ...state, tags: nextTags },
        output: `Created tag '${tagName}' pointing to commit ${currentCommit.substring(0, 7)}`,
        type: 'success'
      };
    }

    case 'restore': {
      const isStaged = parts.includes('--staged');
      const targetFile = parts.filter(p => !p.startsWith('-') && p !== 'git' && p !== 'restore')[0];
      if (!targetFile) {
        return { nextState: state, output: 'fatal: you must specify path(s) to restore', type: 'error' };
      }

      if (isStaged) {
        if (!state.stagingArea[targetFile]) {
          return { nextState: state, output: `error: pathspec '${targetFile}' is not staged`, type: 'error' };
        }
        const nextStaging = { ...state.stagingArea };
        delete nextStaging[targetFile];
        const nextWd = { ...state.workingDirectory };
        if (nextWd[targetFile]) {
          nextWd[targetFile] = { ...nextWd[targetFile], status: 'modified' };
        }
        return {
          nextState: { ...state, stagingArea: nextStaging, workingDirectory: nextWd },
          output: `Unstaged changes for '${targetFile}' (working directory kept intact)`,
          type: 'success'
        };
      }

      // Restore working directory from index/commit
      const file = state.workingDirectory[targetFile];
      if (!file) {
        return { nextState: state, output: `error: pathspec '${targetFile}' did not match any file(s) known to git`, type: 'error' };
      }
      const nextWd = { ...state.workingDirectory };
      nextWd[targetFile] = {
        ...file,
        content: file.committedContent || '',
        status: 'committed'
      };
      return {
        nextState: { ...state, workingDirectory: nextWd },
        output: `Discarded uncommitted changes in '${targetFile}'`,
        type: 'success'
      };
    }

    case 'diff': {
      const isStaged = parts.includes('--staged') || parts.includes('--cached');
      if (isStaged) {
        const stagedFiles = Object.values(state.stagingArea);
        if (stagedFiles.length === 0) {
          return { nextState: state, output: 'No staged changes (diff is empty).', type: 'info' };
        }
        let out = '';
        for (const f of stagedFiles) {
          out += `diff --git a/${f.name} b/${f.name}\n--- a/${f.name}\n+++ b/${f.name}\n@@ -1,3 +1,4 @@\n+ ${f.content.split('\n')[0] || 'Added content'}\n`;
        }
        return { nextState: state, output: out.trim(), type: 'output' };
      }

      const modFiles = Object.values(state.workingDirectory).filter(f => f.status === 'modified');
      if (modFiles.length === 0) {
        return { nextState: state, output: 'Working tree matches index (no unstaged differences).', type: 'info' };
      }
      let out = '';
      for (const f of modFiles) {
        out += `diff --git a/${f.name} b/${f.name}\n--- a/${f.name}\n+++ b/${f.name}\n@@ -1,5 +1,6 @@\n- ${f.committedContent || 'old code'}\n+ ${f.content}\n`;
      }
      return { nextState: state, output: out.trim(), type: 'output' };
    }

    default: {
      return {
        nextState: state,
        output: `git: '${subCommand}' is not a recognized git command. See 'git --help'.`,
        type: 'error'
      };
    }
  }
}

