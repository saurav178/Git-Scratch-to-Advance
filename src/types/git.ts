export interface GitFile {
  name: string;
  status: 'untracked' | 'modified' | 'staged' | 'committed';
  content: string;
  stagedContent?: string;
  committedContent?: string;
}

export interface GitCommit {
  id: string; // e.g. "a1b2c3d"
  fullHash: string;
  message: string;
  author: string;
  timestamp: string;
  parentIds: string[];
  branchName?: string;
  files: Record<string, string>; // snapshot of files at this commit
  isMergeCommit?: boolean;
}

export interface GitBranch {
  name: string;
  targetCommitId: string;
  isCurrent?: boolean;
  isRemote?: boolean;
}

export interface GitTag {
  name: string;
  commitId: string;
  annotated?: boolean;
  message?: string;
}

export interface GitStashEntry {
  id: string; // e.g. "stash@{0}"
  message: string;
  timestamp: string;
  files: GitFile[];
  branch: string;
}

export interface GitReflogEntry {
  id: string;
  selector: string; // e.g. "HEAD@{0}"
  action: string;   // e.g. "commit: add login feature"
  commitId: string;
}

export interface GitRemote {
  name: string;
  url: string;
  branches: Record<string, string>; // branch name -> commitId
}

export interface GitRepositoryState {
  isInitialized: boolean;
  currentBranch: string;
  headDetached: boolean;
  headCommitId: string | null;
  branches: Record<string, string>; // branch name -> commitId
  commits: Record<string, GitCommit>;
  tags: Record<string, GitTag>;
  workingDirectory: Record<string, GitFile>;
  stagingArea: Record<string, GitFile>;
  stashes: GitStashEntry[];
  reflog: GitReflogEntry[];
  remotes: Record<string, GitRemote>;
  mergeInProgress?: {
    sourceBranch: string;
    conflictedFiles: string[];
  } | null;
}

export interface TerminalOutputLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'success' | 'info';
  text: string;
}

