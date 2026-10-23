export interface CommandDoc {
  command: string;
  category: 'Essentials' | 'Branching' | 'Undoing' | 'Remotes' | 'Advanced' | 'Emergency';
  simpleExplanation: string;
  syntax: string;
  example: string;
  danger: 'safe' | 'caution' | 'destructive';
  analogy: string;
  tags: string[];
}

export const COMMAND_DICTIONARY: CommandDoc[] = [
  {
    command: 'git init',
    category: 'Essentials',
    simpleExplanation: 'Turns your current folder into a new Git repository by creating a hidden .git directory.',
    syntax: 'git init',
    example: 'git init',
    danger: 'safe',
    analogy: 'Installing an invisible security vault inside your room.',
    tags: ['start', 'setup', 'new', 'repository']
  },
  {
    command: 'git clone',
    category: 'Essentials',
    simpleExplanation: 'Downloads a complete copy of an existing remote repository onto your computer.',
    syntax: 'git clone <url> [folder]',
    example: 'git clone https://github.com/facebook/react.git',
    danger: 'safe',
    analogy: 'Ordering a full duplicate of an entire library straight to your desk.',
    tags: ['download', 'github', 'copy', 'start']
  },
  {
    command: 'git status',
    category: 'Essentials',
    simpleExplanation: 'Shows which files were changed, which are staged, and which branch you are on.',
    syntax: 'git status',
    example: 'git status',
    danger: 'safe',
    analogy: 'Glancing at your project dashboard or radar.',
    tags: ['check', 'inspect', 'files', 'state']
  },
  {
    command: 'git add',
    category: 'Essentials',
    simpleExplanation: 'Puts modified or new files into the Staging Area, getting them ready to be committed.',
    syntax: 'git add <file> | git add .',
    example: 'git add .',
    danger: 'safe',
    analogy: 'Placing selected items into a shipping box before taping it shut.',
    tags: ['stage', 'pack', 'prepare']
  },
  {
    command: 'git commit',
    category: 'Essentials',
    simpleExplanation: 'Saves the staged snapshot permanently into your local repository with a message.',
    syntax: 'git commit -m "<message>"',
    example: 'git commit -m "Add responsive navigation bar"',
    danger: 'safe',
    analogy: 'Taking an instant Polaroid photograph of your room and writing a caption.',
    tags: ['save', 'checkpoint', 'snapshot', 'history']
  },
  {
    command: 'git log',
    category: 'Essentials',
    simpleExplanation: 'Displays a chronological timeline of all previous commits in the repository.',
    syntax: 'git log [--oneline] [--graph]',
    example: 'git log --oneline --graph',
    danger: 'safe',
    analogy: 'Flipping through the ship captain\'s log book.',
    tags: ['history', 'timeline', 'commits', 'inspect']
  },
  {
    command: 'git diff',
    category: 'Essentials',
    simpleExplanation: 'Shows line-by-line differences between your current files and the last checkpoint.',
    syntax: 'git diff [--staged]',
    example: 'git diff --staged',
    danger: 'safe',
    analogy: 'Comparing two manuscript drafts with red and green highlighters.',
    tags: ['changes', 'review', 'compare', 'lines']
  },
  {
    command: 'git branch',
    category: 'Branching',
    simpleExplanation: 'Lists all local branches or creates a new branch pointer.',
    syntax: 'git branch [<new-branch-name>]',
    example: 'git branch feature/payment',
    danger: 'safe',
    analogy: 'Planting a new branch on a tree to grow in parallel.',
    tags: ['branch', 'parallel', 'create', 'list']
  },
  {
    command: 'git switch',
    category: 'Branching',
    simpleExplanation: 'Modern way to switch to another branch or create one on the fly.',
    syntax: 'git switch <branch> | git switch -c <new-branch>',
    example: 'git switch -c feature/dark-mode',
    danger: 'safe',
    analogy: 'Walking into another themed room in your house.',
    tags: ['switch', 'checkout', 'navigate', 'branch']
  },
  {
    command: 'git checkout',
    category: 'Branching',
    simpleExplanation: 'Classic versatile command used to switch branches, check out commits, or restore files.',
    syntax: 'git checkout <branch> | git checkout -b <new-branch>',
    example: 'git checkout -b feature/auth',
    danger: 'safe',
    analogy: 'The legacy Swiss Army knife of Git navigation.',
    tags: ['branch', 'switch', 'legacy', 'navigate']
  },
  {
    command: 'git merge',
    category: 'Branching',
    simpleExplanation: 'Combines work from another branch into your current active branch.',
    syntax: 'git merge <source-branch>',
    example: 'git merge feature/auth',
    danger: 'caution',
    analogy: 'Connecting two hiking trails back together at the top of the mountain.',
    tags: ['combine', 'join', 'fast-forward', 'integrate']
  },
  {
    command: 'git restore',
    category: 'Undoing',
    simpleExplanation: 'Discards uncommitted changes in your working tree or unstages files.',
    syntax: 'git restore <file> | git restore --staged <file>',
    example: 'git restore --staged style.css',
    danger: 'caution',
    analogy: 'Wiping chalk off a whiteboard or removing an item from the shipping box.',
    tags: ['undo', 'discard', 'unstage', 'clean']
  },
  {
    command: 'git commit --amend',
    category: 'Undoing',
    simpleExplanation: 'Modifies the most recent commit by changing its message or adding forgotten staged files.',
    syntax: 'git commit --amend [-m "new message"]',
    example: 'git commit --amend --no-edit',
    danger: 'caution',
    analogy: 'Unsealing an envelope before shipping to slip in a forgotten birthday card.',
    tags: ['amend', 'fix', 'typo', 'update']
  },
  {
    command: 'git reset --soft',
    category: 'Undoing',
    simpleExplanation: 'Undoes the last commit(s), but keeps all your changed files staged in the index.',
    syntax: 'git reset --soft <target-commit>',
    example: 'git reset --soft HEAD~1',
    danger: 'safe',
    analogy: 'Unsealing the package but leaving all items neatly inside the shipping box.',
    tags: ['undo', 'commit', 'soft', 'keep']
  },
  {
    command: 'git reset --mixed',
    category: 'Undoing',
    simpleExplanation: 'Default reset: undoes commit(s) and unstages files, keeping changes modified on disk.',
    syntax: 'git reset <target-commit>',
    example: 'git reset HEAD~1',
    danger: 'safe',
    analogy: 'Unsealing the package and setting the items back on your desk.',
    tags: ['undo', 'unstage', 'default']
  },
  {
    command: 'git reset --hard',
    category: 'Emergency',
    simpleExplanation: 'DANGEROUS: Wipes away commit(s), staging, and all uncommitted modifications back to a target state.',
    syntax: 'git reset --hard <target-commit>',
    example: 'git reset --hard HEAD~1',
    danger: 'destructive',
    analogy: 'Throwing away the package, items, and resetting your desk completely.',
    tags: ['destructive', 'wipe', 'danger', 'rollback']
  },
  {
    command: 'git revert',
    category: 'Undoing',
    simpleExplanation: 'Safely undoes a commit on public/shared branches by creating a new inverse commit.',
    syntax: 'git revert <commit-hash>',
    example: 'git revert 4f8a2b1',
    danger: 'safe',
    analogy: 'Writing an accounting correction entry without tearing out any pages from the ledger.',
    tags: ['safe', 'public', 'undo', 'team']
  },
  {
    command: 'git reflog',
    category: 'Emergency',
    simpleExplanation: 'The ultimate safety net: records every single movement of HEAD so you can recover lost commits.',
    syntax: 'git reflog',
    example: 'git reflog',
    danger: 'safe',
    analogy: 'Reviewing 24/7 security camera footage to find where you misplaced a key.',
    tags: ['rescue', 'lost', 'recover', 'safety-net']
  },
  {
    command: 'git stash',
    category: 'Essentials',
    simpleExplanation: 'Temporarily shelves dirty working changes so you can switch branches without committing.',
    syntax: 'git stash [push -m "notes"]',
    example: 'git stash -u',
    danger: 'safe',
    analogy: 'Sliding a messy chopping board into a kitchen drawer for later.',
    tags: ['shelve', 'temporary', 'save', 'switch']
  },
  {
    command: 'git stash pop',
    category: 'Essentials',
    simpleExplanation: 'Restores the most recently stashed changes and deletes them from the stash list.',
    syntax: 'git stash pop',
    example: 'git stash pop',
    danger: 'safe',
    analogy: 'Pulling the chopping board back out of the drawer to finish cooking.',
    tags: ['restore', 'unstash', 'resume']
  },
  {
    command: 'git remote',
    category: 'Remotes',
    simpleExplanation: 'Manages connections to remote repositories like GitHub or GitLab.',
    syntax: 'git remote [-v] | git remote add <name> <url>',
    example: 'git remote add origin https://github.com/user/repo.git',
    danger: 'safe',
    analogy: 'Saving the telephone number of head office.',
    tags: ['cloud', 'github', 'link', 'upstream']
  },
  {
    command: 'git push',
    category: 'Remotes',
    simpleExplanation: 'Uploads your local commits to a remote repository.',
    syntax: 'git push [-u <remote> <branch>]',
    example: 'git push -u origin main',
    danger: 'safe',
    analogy: 'Launching finished cargo crates into orbit to synchronize with headquarters.',
    tags: ['upload', 'sync', 'cloud', 'publish']
  },
  {
    command: 'git fetch',
    category: 'Remotes',
    simpleExplanation: 'Downloads all new commits and branches from remote without touching your local working files.',
    syntax: 'git fetch [remote]',
    example: 'git fetch origin',
    danger: 'safe',
    analogy: 'Bringing mail inside the house to inspect on the table without opening it yet.',
    tags: ['download', 'inspect', 'safe-sync']
  },
  {
    command: 'git pull',
    category: 'Remotes',
    simpleExplanation: 'Downloads remote changes and immediately merges them into your current local branch.',
    syntax: 'git pull [--rebase]',
    example: 'git pull origin main',
    danger: 'caution',
    analogy: 'Grabbing mail from the box and immediately pasting it into your current book.',
    tags: ['download', 'merge', 'sync']
  },
  {
    command: 'git rebase',
    category: 'Advanced',
    simpleExplanation: 'Replays your branch commits on top of another base tip for a clean linear history.',
    syntax: 'git rebase <target-branch>',
    example: 'git rebase main',
    danger: 'caution',
    analogy: 'Pruning a branch and replanting it right at the tip of the tree trunk.',
    tags: ['linear', 'history', 'rebase', 'clean']
  },
  {
    command: 'git rebase -i',
    category: 'Advanced',
    simpleExplanation: 'Interactive rebase: lets you squash, reword, drop, or edit commits like a movie director.',
    syntax: 'git rebase -i HEAD~<n>',
    example: 'git rebase -i HEAD~3',
    danger: 'caution',
    analogy: 'A film director in the cutting room trimming bloopers before the movie release.',
    tags: ['squash', 'reword', 'interactive', 'polish']
  },
  {
    command: 'git cherry-pick',
    category: 'Advanced',
    simpleExplanation: 'Applies a single specific commit from another branch onto your active branch.',
    syntax: 'git cherry-pick <commit-hash>',
    example: 'git cherry-pick a1b2c3d',
    danger: 'safe',
    analogy: 'Plucking one specific ripe apple from an orchard tree.',
    tags: ['pluck', 'single-commit', 'port', 'hotfix']
  },
  {
    command: 'git tag',
    category: 'Advanced',
    simpleExplanation: 'Creates a permanent, immutable release milestone marker (e.g. v1.0.0).',
    syntax: 'git tag -a <tag-name> -m "<notes>"',
    example: 'git tag -a v1.0.0 -m "Production Launch"',
    danger: 'safe',
    analogy: 'Stamping an official wax seal on one specific page of a certificate.',
    tags: ['release', 'version', 'milestone', 'semver']
  },
  {
    command: 'git blame',
    category: 'Advanced',
    simpleExplanation: 'Shows author and commit hash for every line of code in a file.',
    syntax: 'git blame <file>',
    example: 'git blame src/App.tsx',
    danger: 'safe',
    analogy: 'Inspecting who signed their initials next to every sentence in an agreement.',
    tags: ['detective', 'author', 'forensics', 'inspect']
  },
  {
    command: 'git bisect',
    category: 'Advanced',
    simpleExplanation: 'Uses binary search to find which specific commit introduced a bug among hundreds of commits.',
    syntax: 'git bisect start | git bisect bad | git bisect good <commit>',
    example: 'git bisect start',
    danger: 'safe',
    analogy: 'Finding a word in a dictionary by flipping to the middle page repeatedly.',
    tags: ['debug', 'binary-search', 'hunt', 'bug']
  },
  {
    command: 'git worktree',
    category: 'Advanced',
    simpleExplanation: 'Checks out multiple branches simultaneously into separate directories without switching.',
    syntax: 'git worktree add <path> <branch>',
    example: 'git worktree add ../hotfix-folder main',
    danger: 'safe',
    analogy: 'Setting up a second desk in your office sharing the same filing cabinet.',
    tags: ['multitask', 'parallel', 'worktree', 'pro']
  },
  {
    command: 'git clean',
    category: 'Emergency',
    simpleExplanation: 'Deletes untracked temporary files and build artifacts from your working directory.',
    syntax: 'git clean -fd',
    example: 'git clean -fd',
    danger: 'destructive',
    analogy: 'Sweeping dust and scrap wood off the workshop floor into the bin.',
    tags: ['cleanup', 'delete', 'untracked', 'sweep']
  }
];

