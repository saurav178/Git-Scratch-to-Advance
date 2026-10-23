import { LessonModule } from '../types/lesson';

export const LESSON_MODULES: LessonModule[] = [
  {
    id: 'module-1',
    number: 1,
    title: 'The Mental Model & Architecture',
    description: 'Understand how Git thinks before typing a single command. Master the 3 trees and non-tech analogies.',
    icon: 'Brain',
    difficulty: 'beginner',
    lessons: [
      {
        id: '1-1',
        title: 'What is Git? The Ultimate Time-Machine',
        slug: 'what-is-git',
        shortDesc: 'Why standard Ctrl+Z is not enough and how Git saves every moment of your project safely.',
        moduleIndex: 1,
        difficulty: 'beginner',
        estimatedMinutes: 5,
        metaphor: {
          title: 'The Video Game Checkpoint Analogy',
          analogy: 'Imagine playing an adventurous video game before a difficult boss fight. You do not just rely on a single autosave that might trap you forever. You make manual Save Slots! If you make a mistake, you can reload slot #3 or branch off into an alternate quest.',
          illustrationIcon: 'Gamepad2',
          realWorldScenario: 'You are writing an important business proposal. You save file_v1.docx, file_v1_final.docx, file_v1_final_ACTUAL_FINAL.docx. Git replaces this chaos with a clean, invisible, cryptographic history log.',
          comparisonTable: [
            { nonTech: 'Multiple folders named "backup_v1", "backup_final"', gitConcept: 'Git commits & branches' },
            { nonTech: 'Game Save Point Slot', gitConcept: 'A Git Commit (SHA hash checkpoint)' },
            { nonTech: 'Reloading an older save file', gitConcept: 'git checkout / git restore' },
            { nonTech: 'Playing two different storylines', gitConcept: 'Git branches (main vs feature)' }
          ]
        },
        technicalExplanation: [
          'Git is a distributed version control system (DVCS) designed by Linus Torvalds in 2005.',
          'Unlike older centralized systems (SVN, CVS), every collaborator possesses a full, independent copy of the entire repository history locally on their machine.',
          'Git records changes as a Directed Acyclic Graph (DAG) of immutable snapshots, not simple file diffs.',
          'Every commit is addressed by a cryptographically secure 40-character SHA-1 (or SHA-256) hash based on author, timestamp, parent commit, and tree content.'
        ],
        commands: [
          {
            command: 'git --version',
            explanation: 'Checks the version of Git installed on your system to verify it works.',
            syntax: 'git --version',
            dangerLevel: 'safe',
            exampleOutput: 'git version 2.44.0'
          }
        ],
        proTips: [
          'Git runs completely offline! You do not need internet or a GitHub account to track files on your computer.',
          'Everything in Git is checksummed before it is stored. It is impossible to change file content without Git noticing.'
        ],
        commonGotchas: [
          'Confusing Git with GitHub. Git is the local version control software; GitHub is a cloud hosting platform for Git repositories.'
        ],
        challenge: {
          id: 'chal-1-1',
          title: 'Verify Git installation',
          instruction: 'Type "git --version" in the terminal below to confirm Git is running.',
          hint: 'Just type: git --version',
          expectedCommands: ['git --version', 'git version'],
          solutionCommand: 'git --version'
        },
        quiz: [
          {
            id: 'q1-1-1',
            question: 'What is the main difference between Git and GitHub?',
            options: [
              'Git is the command-line version control engine, while GitHub is a cloud service that hosts Git repositories online.',
              'Git is for Windows and GitHub is for Mac and Linux.',
              'They are the exact same thing created by the same company.',
              'Git only stores code, while GitHub only stores documents.'
            ],
            correctIndex: 0,
            explanation: 'Git is the distributed version control tool that runs on your local machine. GitHub is a web-based hosting platform where teams share Git repositories.'
          }
        ]
      },
      {
        id: '1-2',
        title: 'The 3 Trees: Working Directory, Staging, & Repo',
        slug: 'three-trees-architecture',
        shortDesc: 'The secret architecture that unlocks all Git concepts: Working Directory, Staging Area, and Repository.',
        moduleIndex: 1,
        difficulty: 'beginner',
        estimatedMinutes: 7,
        metaphor: {
          title: 'The Parcel Delivery & Shopping Cart Analogy',
          analogy: 'Imagine shopping online. The items in your house are your Working Directory. When you pick items and place them into your shopping cart, that is the Staging Area. Clicking "Buy & Place Order" creates a permanent tracking receipt in the Local Repository.',
          illustrationIcon: 'Package',
          realWorldScenario: 'You are working on three documents at once. You only want to submit Document A and B for your client review, but keep Document C as a draft. Staging lets you selectively choose which edits get sealed into the next package.',
          comparisonTable: [
            { nonTech: 'Items lying on your work desk', gitConcept: 'Working Directory (Unstaged edits)' },
            { nonTech: 'Placing items inside a shipping box', gitConcept: 'Staging Area (git add / Index)' },
            { nonTech: 'Taping the box shut & printing tracking number', gitConcept: 'Commit in Local Repo (git commit)' },
            { nonTech: 'Loading onto cargo plane to head office', gitConcept: 'Remote Repo (git push to GitHub)' }
          ]
        },
        technicalExplanation: [
          'Git organizes your workflow into 3 primary zones on your local computer:',
          '1. Working Directory (Worktree): The actual files you see and edit in VS Code or your file explorer.',
          '2. Staging Area (Index): A binary file (`.git/index`) that prepares the exact snapshot that will go into the next commit.',
          '3. Repository (`.git` directory): The permanent database containing commits, compressed objects (blobs, trees), refs, and branch pointers.',
          '4. Remote: The cloud replica (e.g. GitHub or GitLab) where teammates synchronize work.'
        ],
        flowStep: {
          from: 'Working Directory',
          to: 'Staging Area',
          label: 'git add',
          description: 'Moves modified files from your desk into the staging box.'
        },
        commands: [
          {
            command: 'git status',
            explanation: 'Shows exactly which files are untracked, modified, or staged ready for commit.',
            syntax: 'git status',
            dangerLevel: 'safe',
            exampleOutput: 'On branch main\nChanges not staged for commit:\n  modified: app.js'
          }
        ],
        proTips: [
          'Always run "git status" before and after adding or committing files. It is your dashboard radar.',
          'You never have to guess what Git is doing: "git status" prints helpful instructions inside its own output.'
        ],
        commonGotchas: [
          'Forgetting to stage: If you edit a file and immediately run "git commit", Git will tell you "nothing added to commit". You must "git add" first!'
        ],
        challenge: {
          id: 'chal-1-2',
          title: 'Check your repository status',
          instruction: 'Run "git status" to inspect the state of your working directory and staging area.',
          hint: 'Type: git status',
          expectedCommands: ['git status'],
          solutionCommand: 'git status'
        },
        quiz: [
          {
            id: 'q1-2-1',
            question: 'Why does Git have a Staging Area instead of committing directly from your working folder?',
            options: [
              'It allows you to selectively choose and group related edits into clean, focused commits.',
              'Because Git cannot read files directly from the hard drive.',
              'To automatically scan code for syntax errors.',
              'It is only used when you do not have an internet connection.'
            ],
            correctIndex: 0,
            explanation: 'The Staging Area (Index) gives you total control over what goes into each commit, so your commit history stays clean, atomic, and easy to review.'
          }
        ]
      },
      {
        id: '1-3',
        title: 'Identity & Configuration: git config',
        slug: 'git-config-setup',
        shortDesc: 'Set your name, email, and preferences so your commits have proper credit.',
        moduleIndex: 1,
        difficulty: 'beginner',
        estimatedMinutes: 4,
        metaphor: {
          title: 'The Digital Passport Stamp Analogy',
          analogy: 'Whenever an artist signs a painting, they write their signature in the corner. "git config" is your digital pen: it guarantees every commit you create is signed with your name and email.',
          illustrationIcon: 'UserCheck',
          realWorldScenario: 'When collaborating on a team, anyone reviewing the history can see who introduced a feature or who to ask questions about a specific change.',
          comparisonTable: [
            { nonTech: 'Writing your author signature', gitConcept: 'git config --global user.name' },
            { nonTech: 'Your contact business card', gitConcept: 'git config --global user.email' },
            { nonTech: 'Default notebook style', gitConcept: 'git config --global init.defaultBranch main' }
          ]
        },
        technicalExplanation: [
          'Git stores settings in three different levels of configuration files:',
          '1. System level (`/etc/gitconfig`): Applies to every user on the operating system.',
          '2. Global level (`~/.gitconfig`): Applies to all repositories under your user account.',
          '3. Local level (`.git/config`): Applies exclusively to the current repository directory.'
        ],
        commands: [
          {
            command: 'git config --global user.name "Your Name"',
            explanation: 'Sets your human-readable author name across all repositories.',
            syntax: 'git config --global user.name "<name>"',
            dangerLevel: 'safe'
          },
          {
            command: 'git config --global user.email "you@example.com"',
            explanation: 'Sets your email address linked to your commits and GitHub profile.',
            syntax: 'git config --global user.email "<email>"',
            dangerLevel: 'safe'
          },
          {
            command: 'git config --list',
            explanation: 'Lists all current active Git settings and environment variables.',
            syntax: 'git config --list',
            dangerLevel: 'safe'
          }
        ],
        proTips: [
          'Always use the exact same email address you use on GitHub so your contribution graph lights up green!',
          'Set your default branch name to "main" with `git config --global init.defaultBranch main`.'
        ],
        commonGotchas: [
          'Setting local configs without knowing it: Local settings always override global ones.'
        ],
        challenge: {
          id: 'chal-1-3',
          title: 'List your Git configuration',
          instruction: 'Run "git config --list" to view all configured settings.',
          hint: 'Type: git config --list',
          expectedCommands: ['git config --list'],
          solutionCommand: 'git config --list'
        }
      }
    ]
  },
  {
    id: 'module-2',
    number: 2,
    title: 'Daily Rhythm & Essential Commands',
    description: 'Master the day-to-day cycle: init, stage, commit, diff, and inspect history like a seasoned pro.',
    icon: 'Terminal',
    difficulty: 'beginner',
    lessons: [
      {
        id: '2-1',
        title: 'Starting Fresh: git init & git clone',
        slug: 'init-and-clone',
        shortDesc: 'Turn any ordinary folder into a supercharged Git repository, or download an existing project.',
        moduleIndex: 2,
        difficulty: 'beginner',
        estimatedMinutes: 5,
        metaphor: {
          title: 'Building a Vault or Duplicating a Library',
          analogy: '"git init" builds a secret invisible safe inside your folder (the hidden .git directory). "git clone" is like ordering a full copy of an entire library, including all historical editions, straight to your room.',
          illustrationIcon: 'FolderPlus',
          realWorldScenario: 'You are starting a brand new website from scratch, or you joined an open-source project on GitHub and want a full working copy.',
          comparisonTable: [
            { nonTech: 'Installing a security vault in your room', gitConcept: 'git init (.git directory created)' },
            { nonTech: 'Copying someone\'s complete photo album', gitConcept: 'git clone <url>' }
          ]
        },
        technicalExplanation: [
          '`git init` creates a hidden `.git` directory containing `objects/`, `refs/`, `HEAD`, `config`, and `hooks/`.',
          '`git clone <repo-url>` performs three actions automatically: creates a directory, initializes git, downloads all objects and branches, and checks out the default branch (usually `main`).'
        ],
        commands: [
          {
            command: 'git init',
            explanation: 'Initializes a new Git repository in the current folder.',
            syntax: 'git init',
            dangerLevel: 'safe'
          },
          {
            command: 'git clone <url>',
            explanation: 'Clones an entire remote repository along with its commit history onto your machine.',
            syntax: 'git clone <url> [directory-name]',
            dangerLevel: 'safe'
          }
        ],
        proTips: [
          'Never run `git init` inside a folder that is already inside another Git repository (nested repos cause confusion unless intended as submodules).'
        ],
        commonGotchas: [
          'Deleting the hidden `.git` directory deletes all your Git history! The files on your desktop remain, but all checkpoints are gone.'
        ],
        challenge: {
          id: 'chal-2-1',
          title: 'Initialize a new repository',
          instruction: 'Type "git init" to create a fresh Git repository in the workspace.',
          hint: 'Type: git init',
          expectedCommands: ['git init'],
          solutionCommand: 'git init'
        }
      },
      {
        id: '2-2',
        title: 'Staging Edits: git add & Staging Area',
        slug: 'staging-with-git-add',
        shortDesc: 'Learn how to pack your changes into the staging area with laser precision.',
        moduleIndex: 2,
        difficulty: 'beginner',
        estimatedMinutes: 6,
        metaphor: {
          title: 'Packing the Moving Box',
          analogy: 'You are moving apartments. You do not throw everything you own into one giant pile. You take specific items from your desk and put them into a labeled box. "git add" selects which items go into the box.',
          illustrationIcon: 'Layers',
          realWorldScenario: 'You modified 5 files: 3 are for the new navbar, and 2 are random experiments. You only want to stage the 3 navbar files so your commit is focused and easy to read.',
          comparisonTable: [
            { nonTech: 'Picking up a specific item to pack', gitConcept: 'git add <filename>' },
            { nonTech: 'Packing everything in the room at once', gitConcept: 'git add .' },
            { nonTech: 'Checking what is currently inside the box', gitConcept: 'git status' }
          ]
        },
        technicalExplanation: [
          'When you run `git add <file>`, Git compresses the file content into a SHA-1 blob in `.git/objects` and records the file path, permissions, and hash inside `.git/index`.',
          '`git add .` stages all modifications, additions, and deletions in the current working directory and subdirectories.'
        ],
        flowStep: {
          from: 'Working Directory',
          to: 'Staging Area',
          label: 'git add .',
          description: 'Indexes all changes into the staging staging area.'
        },
        commands: [
          {
            command: 'git add <file>',
            explanation: 'Stages a specific file ready for the next commit.',
            syntax: 'git add <filename>',
            dangerLevel: 'safe'
          },
          {
            command: 'git add .',
            explanation: 'Stages all new, modified, and deleted files in the current folder.',
            syntax: 'git add .',
            dangerLevel: 'safe'
          },
          {
            command: 'git add -p',
            explanation: 'Interactive patch mode: lets you review and stage individual line chunks within a single file!',
            syntax: 'git add -p',
            dangerLevel: 'safe'
          }
        ],
        proTips: [
          '`git add -p` (patch mode) is a superpower used by senior engineers to craft spotless commits even when they modified multiple unrelated lines in one file.'
        ],
        commonGotchas: [
          'If you edit a file AFTER running `git add`, the newer edits will NOT be in the staging area! You must run `git add` again to stage the latest changes.'
        ],
        challenge: {
          id: 'chal-2-2',
          title: 'Stage all modified files',
          instruction: 'Type "git add ." to stage all pending files into the staging area.',
          hint: 'Type: git add .',
          expectedCommands: ['git add .', 'git add -A', 'git add --all'],
          solutionCommand: 'git add .'
        }
      },
      {
        id: '2-3',
        title: 'Sealing the Checkpoint: git commit',
        slug: 'committing-changes',
        shortDesc: 'Create permanent, timestamped snapshots of your project with meaningful messages.',
        moduleIndex: 2,
        difficulty: 'beginner',
        estimatedMinutes: 7,
        metaphor: {
          title: 'Taking a Polaroid Photo & Writing a Caption',
          analogy: 'A commit is like taking an instant Polaroid photograph of your entire room. On the bottom of the photo, you write a short caption describing what changed. You can never accidentally erase the past; every photo gets pinned to your timeline.',
          illustrationIcon: 'Camera',
          realWorldScenario: 'You finished adding the "Forgot Password" link. You commit with a clear message: "Add forgot password link to login form". Two months later, anyone can find exactly when that button appeared.',
          comparisonTable: [
            { nonTech: 'Taking the snapshot & sealing the box', gitConcept: 'git commit' },
            { nonTech: 'The label written on the box', gitConcept: 'Commit message (-m "...")' },
            { nonTech: 'The barcode on the box', gitConcept: 'Commit SHA Hash (e.g. 7f9a1b2)' }
          ]
        },
        technicalExplanation: [
          'A commit object in Git consists of:',
          '1. A pointer to a Tree object representing the root directory snapshot.',
          '2. Parent commit pointer(s) (empty for root, 1 for regular, 2+ for merges).',
          '3. Author (who wrote the code) and Committer (who applied the commit).',
          '4. Timestamp and commit message string.',
          '5. SHA-1 hash of the commit metadata.'
        ],
        flowStep: {
          from: 'Staging Area',
          to: 'Local Repo',
          label: 'git commit -m "..."',
          description: 'Saves the staged snapshot permanently into the local repository.'
        },
        commands: [
          {
            command: 'git commit -m "Your clear message"',
            explanation: 'Records the staged files as a new permanent commit with an inline message.',
            syntax: 'git commit -m "<message>"',
            dangerLevel: 'safe'
          },
          {
            command: 'git commit -am "message"',
            explanation: 'Shortcut: automatically stages tracked modified files and commits them in one command (does not stage brand new untracked files).',
            syntax: 'git commit -am "<message>"',
            dangerLevel: 'safe'
          }
        ],
        proTips: [
          'Write commit messages in the imperative mood: "Add login feature", not "Added login feature" or "Adding login feature".',
          'Keep the first line under 50 characters. If you need more details, leave a blank line and write a paragraph below.'
        ],
        commonGotchas: [
          'Vague messages like "fixes", "updates", "changes". When you search history 6 months later, you will have no idea what those commits did!'
        ],
        challenge: {
          id: 'chal-2-3',
          title: 'Create your first commit',
          instruction: 'Type `git commit -m "Add core project files"` to save the staged snapshot.',
          hint: 'Type: git commit -m "Add core project files"',
          expectedCommands: ['git commit -m "Add core project files"', 'git commit -m \'Add core project files\''],
          solutionCommand: 'git commit -m "Add core project files"'
        }
      },
      {
        id: '2-4',
        title: 'Reviewing the Past: git log & git diff',
        slug: 'inspecting-history-and-diff',
        shortDesc: 'Inspect your project timeline and see line-by-line differences before and after changes.',
        moduleIndex: 2,
        difficulty: 'beginner',
        estimatedMinutes: 6,
        metaphor: {
          title: 'The Time-Travel Diary & Highlighter',
          analogy: '"git log" is your ship captain\'s log book, reading every entry recorded over time. "git diff" is a digital highlighter that shows old deleted lines in red and new added lines in green.',
          illustrationIcon: 'FileText',
          realWorldScenario: 'A teammate asks: "When did we change the button color to blue?" You run `git log` and `git diff` to see the exact commit and line of CSS that changed.',
          comparisonTable: [
            { nonTech: 'Flipping through your journal entries', gitConcept: 'git log --oneline' },
            { nonTech: 'Comparing two manuscript drafts with red pen', gitConcept: 'git diff' },
            { nonTech: 'Checking what will be committed vs already committed', gitConcept: 'git diff --staged' }
          ]
        },
        technicalExplanation: [
          '`git log` walks backward along parent commit pointers from current HEAD.',
          '`git diff` computes Myers diff algorithm differences between the Working Directory and the Index.',
          '`git diff --staged` (or `--cached`) compares the Index against HEAD (what will go into the next commit).'
        ],
        commands: [
          {
            command: 'git log',
            explanation: 'Shows detailed commit history (author, date, full message, hash).',
            syntax: 'git log',
            dangerLevel: 'safe'
          },
          {
            command: 'git log --oneline',
            explanation: 'Shows a clean, condensed single-line view of commits with short hashes.',
            syntax: 'git log --oneline',
            dangerLevel: 'safe'
          },
          {
            command: 'git diff',
            explanation: 'Shows unstaged differences in your working directory compared to index.',
            syntax: 'git diff',
            dangerLevel: 'safe'
          },
          {
            command: 'git diff --staged',
            explanation: 'Shows differences between what is currently staged and the latest commit.',
            syntax: 'git diff --staged',
            dangerLevel: 'safe'
          }
        ],
        proTips: [
          'Create a favorite alias: `git config --global alias.lg "log --color --graph --pretty=format:\'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset\' --abbrev-commit"` for gorgeous ASCII branch graphs!'
        ],
        commonGotchas: [
          'Running `git diff` and seeing nothing: If you already ran `git add`, `git diff` will be empty! You need `git diff --staged` to see staged changes.'
        ],
        challenge: {
          id: 'chal-2-4',
          title: 'View your condensed commit log',
          instruction: 'Type "git log --oneline" to inspect the commit history in single-line format.',
          hint: 'Type: git log --oneline',
          expectedCommands: ['git log --oneline', 'git log'],
          solutionCommand: 'git log --oneline'
        }
      }
    ]
  },
  {
    id: 'module-3',
    number: 3,
    title: 'Branching & Merging: Parallel Universes',
    description: 'Work on new features in complete safety without touching production code. Understand HEAD and merges.',
    icon: 'GitBranch',
    difficulty: 'intermediate',
    lessons: [
      {
        id: '3-1',
        title: 'Why Branches? Parallel Realities',
        slug: 'understanding-branches',
        shortDesc: 'How branches let you experiment fearlessly without risking working production software.',
        moduleIndex: 3,
        difficulty: 'intermediate',
        estimatedMinutes: 6,
        metaphor: {
          title: 'The Parallel Sci-Fi Multiverse Analogy',
          analogy: 'Imagine entering a portal to a parallel timeline. In that timeline, you can build a wild, experimental robot. If it explodes, your original home timeline is untouched! If the robot is amazing, you open a dimensional portal and bring it back home (merging).',
          illustrationIcon: 'Split',
          realWorldScenario: 'Your main website is working in production. You want to rebuild the payment system which takes 2 weeks. If you work directly on main, your site is broken for 2 weeks. On a "feature/payment" branch, main stays 100% operational!',
          comparisonTable: [
            { nonTech: 'The original safe timeline', gitConcept: 'main branch (production)' },
            { nonTech: 'A new experimental timeline', gitConcept: 'feature branch' },
            { nonTech: 'A marker showing where you are currently standing', gitConcept: 'HEAD pointer' },
            { nonTech: 'Combining the two timelines back together', gitConcept: 'git merge' }
          ]
        },
        technicalExplanation: [
          'In Git, a branch is NOT a heavy copy of all your files! It is merely a tiny, 41-byte text file inside `.git/refs/heads/` that stores a 40-character commit hash pointer.',
          'Because branches are just pointers, creating or switching a branch in Git is virtually instantaneous (O(1) complexity), whether your repository is 5 KB or 50 GB.',
          '`HEAD` is a special reference pointing to the currently checked-out branch or commit.'
        ],
        commands: [
          {
            command: 'git branch',
            explanation: 'Lists all local branches. The active branch is marked with an asterisk (*).',
            syntax: 'git branch',
            dangerLevel: 'safe'
          },
          {
            command: 'git branch <new-branch-name>',
            explanation: 'Creates a new branch pointer pointing at current HEAD without switching to it.',
            syntax: 'git branch <branch-name>',
            dangerLevel: 'safe'
          }
        ],
        proTips: [
          'Adopt standard branch naming conventions: `feature/login-form`, `bugfix/cart-crash`, `hotfix/security-patch`, `docs/readme-update`.'
        ],
        commonGotchas: [
          'Running `git branch new-feature` creates the branch, but keeps you on your old branch! Use `git switch -c` or `git checkout -b` to create AND switch in one step.'
        ],
        challenge: {
          id: 'chal-3-1',
          title: 'List existing branches',
          instruction: 'Type "git branch" to see all available branches in your repository.',
          hint: 'Type: git branch',
          expectedCommands: ['git branch'],
          solutionCommand: 'git branch'
        }
      },
      {
        id: '3-2',
        title: 'Switching Branches: git switch & checkout',
        slug: 'switching-branches',
        shortDesc: 'Travel between branches cleanly and understand what modern "git switch" does.',
        moduleIndex: 3,
        difficulty: 'intermediate',
        estimatedMinutes: 6,
        metaphor: {
          title: 'Stepping Through the Teleport Door',
          analogy: 'When you step from the "Kitchen" room into the "Workshop" room, everything on your work table magically swaps to tools for the workshop. Switching branches swaps the files in your folder to match that branch instantly.',
          illustrationIcon: 'Repeat',
          realWorldScenario: 'You are working on a new design on branch "feature/redesign". Your boss rushes in: "Production has a bug on main!" You switch back to main, fix the bug in 5 minutes, deploy it, and switch back to redesign.',
          comparisonTable: [
            { nonTech: 'Walking into another room', gitConcept: 'git switch <branch>' },
            { nonTech: 'Creating a new room and walking in immediately', gitConcept: 'git switch -c <branch>' },
            { nonTech: 'Legacy multi-purpose key (did 10 different things)', gitConcept: 'git checkout' }
          ]
        },
        technicalExplanation: [
          'Historically, `git checkout` was overloaded: it was used for switching branches, creating branches, checking out commits, and discarding file changes.',
          'In Git 2.23+, Git split this into two clearer, dedicated commands: `git switch` (for branches) and `git restore` (for files).',
          '`git switch <branch>` updates `HEAD` to point to `refs/heads/<branch>` and updates your Working Directory to match that commit snapshot.'
        ],
        commands: [
          {
            command: 'git switch <branch-name>',
            explanation: 'Switches your working tree to an existing branch (modern syntax).',
            syntax: 'git switch <branch>',
            dangerLevel: 'safe'
          },
          {
            command: 'git switch -c <new-branch-name>',
            explanation: 'Creates a brand new branch and switches to it in a single command.',
            syntax: 'git switch -c <branch>',
            dangerLevel: 'safe'
          },
          {
            command: 'git checkout -b <new-branch-name>',
            explanation: 'The classic legacy equivalent of `git switch -c`. Still widely used in tutorials.',
            syntax: 'git checkout -b <branch>',
            dangerLevel: 'safe'
          }
        ],
        proTips: [
          'Prefer `git switch` over `git checkout` for branch navigation. It gives clearer error messages if you misspell a branch name.'
        ],
        commonGotchas: [
          'Detached HEAD state: If you check out a specific commit hash instead of a branch name, you enter "detached HEAD". Commits made here can become orphaned unless you create a branch!'
        ],
        challenge: {
          id: 'chal-3-2',
          title: 'Create and switch to a feature branch',
          instruction: 'Type `git checkout -b feature/login` or `git switch -c feature/login` to start a new feature.',
          hint: 'Type: git checkout -b feature/login',
          expectedCommands: ['git checkout -b feature/login', 'git switch -c feature/login'],
          solutionCommand: 'git checkout -b feature/login'
        }
      },
      {
        id: '3-3',
        title: 'Merging: Fast-Forward vs 3-Way Merge',
        slug: 'merging-branches',
        shortDesc: 'Unite parallel timelines back into one cohesive project. Master fast-forward and merge commits.',
        moduleIndex: 3,
        difficulty: 'intermediate',
        estimatedMinutes: 8,
        metaphor: {
          title: 'The River Confluence & Joining Paths',
          analogy: 'Two hiking trails split around a mountain. When both trails reach the summit, they reconnect. Merging brings the code written on your feature trail back onto the main highway.',
          illustrationIcon: 'GitMerge',
          realWorldScenario: 'You tested your new login feature thoroughly on `feature/login`. Now you switch back to `main` and merge your feature in so all customers get the new feature.',
          comparisonTable: [
            { nonTech: 'The highway stayed straight, just moved forward', gitConcept: 'Fast-Forward merge' },
            { nonTech: 'Two separate roads joined with a highway bridge', gitConcept: '3-Way Merge Commit (has 2 parents)' },
            { nonTech: 'Safely deleting the completed side-trail', gitConcept: 'git branch -d <branch>' }
          ]
        },
        technicalExplanation: [
          'There are two primary merge types in Git:',
          '1. Fast-Forward Merge: If `main` has not added any new commits since `feature` branched off, Git simply moves the `main` pointer forward to match `feature`. No new commit node is created.',
          '2. 3-Way Merge (True Merge): If both `main` and `feature` received new commits independently (diverged), Git looks at three snapshots (Commit A, Commit B, and their Common Ancestor) and creates a special Merge Commit with two parents.'
        ],
        commands: [
          {
            command: 'git merge <branch-to-merge>',
            explanation: 'Merges changes from the specified branch into your currently checked-out branch.',
            syntax: 'git merge <source-branch>',
            dangerLevel: 'caution'
          },
          {
            command: 'git merge --no-ff <branch>',
            explanation: 'Forces Git to create a merge commit even if a fast-forward was possible (great for documenting releases).',
            syntax: 'git merge --no-ff <branch>',
            dangerLevel: 'safe'
          },
          {
            command: 'git branch -d <branch-name>',
            explanation: 'Safely deletes a branch after its changes have been merged.',
            syntax: 'git branch -d <branch>',
            dangerLevel: 'safe'
          }
        ],
        proTips: [
          'Always run `git checkout main` (or switch) BEFORE running `git merge feature`. You merge INTO the branch you are standing on!'
        ],
        commonGotchas: [
          'Accidentally merging backwards: Standing on `feature` and merging `main` is useful for syncing, but remember to merge `feature` into `main` when shipping.'
        ],
        challenge: {
          id: 'chal-3-3',
          title: 'Merge a feature branch',
          instruction: 'Type "git merge feature/login" to incorporate the login feature into your active branch.',
          hint: 'Type: git merge feature/login',
          expectedCommands: ['git merge feature/login'],
          solutionCommand: 'git merge feature/login'
        }
      }
    ]
  },
  {
    id: 'module-4',
    number: 4,
    title: 'Time Travel & Undoing Mistakes',
    description: 'Never panic again. Master git restore, reset (--soft, --mixed, --hard), revert, and the magic reflog safety net.',
    icon: 'History',
    difficulty: 'intermediate',
    lessons: [
      {
        id: '4-1',
        title: 'Discarding Uncommitted Edits: git restore',
        slug: 'undoing-with-restore',
        shortDesc: 'Quickly discard accidental changes or unstage files without touching your commit history.',
        moduleIndex: 4,
        difficulty: 'intermediate',
        estimatedMinutes: 5,
        metaphor: {
          title: 'The Magic Whiteboard Eraser',
          analogy: 'You were drafting a quick sketch on a whiteboard. You dislike it. You take the eraser and wipe it clean. The whiteboard reverts back to the permanent ink that was there before.',
          illustrationIcon: 'Eraser',
          realWorldScenario: 'You tested some crazy debug console logs across 3 files. You do not want them anymore. Instead of manually hitting Ctrl+Z 50 times, `git restore .` reverts everything back to your last clean commit in 1 second.',
          comparisonTable: [
            { nonTech: 'Erasing messy chalk marks', gitConcept: 'git restore <file>' },
            { nonTech: 'Taking an item back out of the shipping box', gitConcept: 'git restore --staged <file>' },
            { nonTech: 'The old confusing syntax', gitConcept: 'git checkout -- <file>' }
          ]
        },
        technicalExplanation: [
          '`git restore <file>` copies the file content from the index into your working directory, throwing away unstaged changes.',
          '`git restore --staged <file>` removes the file from the staging area (index) without altering the file content in your working tree.'
        ],
        commands: [
          {
            command: 'git restore <filename>',
            explanation: 'Discards uncommitted changes in a specific file in your working directory.',
            syntax: 'git restore <file>',
            dangerLevel: 'caution'
          },
          {
            command: 'git restore --staged <filename>',
            explanation: 'Unstages a file from the staging area so it won\'t be committed, keeping your local edits safe.',
            syntax: 'git restore --staged <file>',
            dangerLevel: 'safe'
          },
          {
            command: 'git restore .',
            explanation: 'Discards all uncommitted changes across your entire project.',
            syntax: 'git restore .',
            dangerLevel: 'caution'
          }
        ],
        proTips: [
          'Be careful with `git restore <file>` because uncommitted changes are not in Git\'s database yet. Once discarded, Git cannot recover them unless your IDE has local file history.'
        ],
        commonGotchas: [
          'Attempting `git restore` on an untracked brand-new file: Untracked files are not known to Git yet. Use `git clean` or delete them manually.'
        ],
        challenge: {
          id: 'chal-4-1',
          title: 'Unstage a staged file safely',
          instruction: 'Type "git restore --staged index.html" to remove it from staging without losing work.',
          hint: 'Type: git restore --staged index.html',
          expectedCommands: ['git restore --staged index.html'],
          solutionCommand: 'git restore --staged index.html'
        }
      },
      {
        id: '4-2',
        title: 'Fixing the Last Commit: git commit --amend',
        slug: 'commit-amend',
        shortDesc: 'Forgot a file or made a typo in your commit message? Fix it seamlessly.',
        moduleIndex: 4,
        difficulty: 'intermediate',
        estimatedMinutes: 5,
        metaphor: {
          title: 'Opening the Envelope Before It Ships',
          analogy: 'You just sealed a letter inside an envelope, and suddenly remember you forgot to include the birthday check! You gently unseal the envelope, slide the check inside, write the address cleanly, and seal it back up.',
          illustrationIcon: 'Edit3',
          realWorldScenario: 'You made a commit "Add login form", and immediately realize you forgot to stage the CSS file. Instead of creating an ugly second commit named "oops forgot CSS", you amend the first commit.',
          comparisonTable: [
            { nonTech: 'Sliding an extra item into the envelope', gitConcept: 'git add <forgotten-file> + git commit --amend' },
            { nonTech: 'Correcting a typo on the envelope label', gitConcept: 'git commit --amend -m "New message"' }
          ]
        },
        technicalExplanation: [
          '`git commit --amend` replaces the tip of the current branch with a new commit object that incorporates current staging changes and/or updated message.',
          'Technically, the old commit hash is abandoned and a brand new commit with a new SHA hash takes its place.'
        ],
        commands: [
          {
            command: 'git commit --amend -m "Updated message"',
            explanation: 'Replaces the latest commit with an updated message and any newly staged changes.',
            syntax: 'git commit --amend -m "<new-message>"',
            dangerLevel: 'caution'
          },
          {
            command: 'git commit --amend --no-edit',
            explanation: 'Incorporates newly staged files into the previous commit without changing the message.',
            syntax: 'git commit --amend --no-edit',
            dangerLevel: 'caution'
          }
        ],
        proTips: [
          'NEVER amend commits that have already been pushed to a shared remote repository branch! Amending rewrites history, which causes sync conflicts for teammates.'
        ],
        commonGotchas: [
          'Amending when you wanted to create a new commit. Always check `git status` first.'
        ],
        challenge: {
          id: 'chal-4-2',
          title: 'Amend the latest commit message',
          instruction: 'Type `git commit --amend -m "Add core project files and documentation"` to update the last commit.',
          hint: 'Type: git commit --amend -m "Add core project files and documentation"',
          expectedCommands: ['git commit --amend -m "Add core project files and documentation"'],
          solutionCommand: 'git commit --amend -m "Add core project files and documentation"'
        }
      },
      {
        id: '4-3',
        title: 'The Reset Spectrum: --soft, --mixed, & --hard',
        slug: 'git-reset-explained',
        shortDesc: 'Demystifying the most feared command in Git. Learn exactly where your files go in all 3 modes.',
        moduleIndex: 4,
        difficulty: 'intermediate',
        estimatedMinutes: 9,
        metaphor: {
          title: 'The 3 Levels of Rewinding a Tape',
          analogy: 'Level 1 (--soft): Rewinds the tape, but leaves all the groceries in your shopping cart. Level 2 (--mixed): Rewinds the tape and puts the groceries back on your kitchen counter. Level 3 (--hard): Rewinds the tape and throws away all newly bought groceries entirely.',
          illustrationIcon: 'Rewind',
          realWorldScenario: 'You committed something you were not supposed to commit yet. `--soft` unwinds the commit but keeps all your code ready to be recommitted cleanly.',
          comparisonTable: [
            { nonTech: 'Unseal the box, keep contents ready to ship', gitConcept: 'git reset --soft (HEAD moves, Staging intact)' },
            { nonTech: 'Unseal the box, put contents back on desk', gitConcept: 'git reset --mixed (Default: HEAD moves, files unstaged)' },
            { nonTech: 'Throw the box and contents in the trash', gitConcept: 'git reset --hard (HEAD moves, all edits deleted)' }
          ]
        },
        technicalExplanation: [
          '`git reset` operates on the 3 trees in order:',
          '1. `git reset --soft <commit>`: Moves HEAD pointer only. Leaves Index and Working Directory untouched.',
          '2. `git reset --mixed <commit>`: Moves HEAD and updates Index to match <commit>. Working directory files keep your changes, but as unstaged.',
          '3. `git reset --hard <commit>`: Moves HEAD, updates Index, AND overwrites Working Directory to match the target commit snapshot. Any uncommitted work is destroyed.'
        ],
        commands: [
          {
            command: 'git reset --soft HEAD~1',
            explanation: 'Undoes the last commit. All changed files remain staged ready for immediate recommit.',
            syntax: 'git reset --soft <target-commit>',
            dangerLevel: 'safe'
          },
          {
            command: 'git reset --mixed HEAD~1',
            explanation: 'Default reset: undoes the commit and unstages changes, keeping files modified on disk.',
            syntax: 'git reset --mixed <target-commit>',
            dangerLevel: 'safe'
          },
          {
            command: 'git reset --hard HEAD~1',
            explanation: 'Completely wipes the last commit and all uncommitted modifications back to the target commit state.',
            syntax: 'git reset --hard <target-commit>',
            dangerLevel: 'destructive'
          }
        ],
        proTips: [
          'If you just want to combine the last 3 commits into 1, run `git reset --soft HEAD~3` followed by a single clean `git commit -m "All changes combined"`!'
        ],
        commonGotchas: [
          'Using `git reset --hard` when you had uncommitted edits. Always run `git stash` before doing hard resets if you have unfinished work.'
        ],
        challenge: {
          id: 'chal-4-3',
          title: 'Soft reset the last commit',
          instruction: 'Type "git reset --soft HEAD~1" to undo the last commit while keeping your work staged.',
          hint: 'Type: git reset --soft HEAD~1',
          expectedCommands: ['git reset --soft HEAD~1'],
          solutionCommand: 'git reset --soft HEAD~1'
        }
      },
      {
        id: '4-4',
        title: 'Safe Team Undo: git revert',
        slug: 'safe-undo-git-revert',
        shortDesc: 'How to undo a mistake on shared public branches without destroying history.',
        moduleIndex: 4,
        difficulty: 'intermediate',
        estimatedMinutes: 6,
        metaphor: {
          title: 'Writing an Anti-Dote or Counter-Entry',
          analogy: 'In official accounting, you never rip out a page from the ledger book when an error happens. You write a new compensatory transaction: "+$500 correction for error on line 4". `git revert` is an accounting correction.',
          illustrationIcon: 'ShieldCheck',
          realWorldScenario: 'You deployed commit `3b9f1d2` to production on `main` and it broke customer logins. Because teammates already pulled `main`, you cannot `git reset`. You run `git revert 3b9f1d2` to cleanly undo the bug.',
          comparisonTable: [
            { nonTech: 'Ripping out a ledger page (illegal for teams)', gitConcept: 'git reset (rewrites history)' },
            { nonTech: 'Adding a compensating correction entry', gitConcept: 'git revert (creates a new inverse commit)' }
          ]
        },
        technicalExplanation: [
          '`git revert <commit-hash>` computes the inverse diff of the target commit and records it as a brand-new commit at the tip of the current branch.',
          'Because history is never rewritten or deleted, `git revert` is 100% safe to run on shared production and remote branches.'
        ],
        commands: [
          {
            command: 'git revert <commit-hash>',
            explanation: 'Creates a new commit that inverts all the changes made by the specified commit.',
            syntax: 'git revert <commit-id>',
            dangerLevel: 'safe'
          },
          {
            command: 'git revert --no-commit <commit-hash>',
            explanation: 'Applies the inverse changes to staging without auto-creating a commit, letting you batch multiple reverts.',
            syntax: 'git revert -n <commit-id>',
            dangerLevel: 'safe'
          }
        ],
        proTips: [
          'Golden Rule of Git: Use `git reset` for private local commits you have not pushed yet. Use `git revert` for commits you have already pushed to GitHub.'
        ],
        commonGotchas: [
          'Reverting a merge commit: Git requires the `-m parent-number` flag when reverting merge commits because it needs to know which parent branch to keep.'
        ],
        challenge: {
          id: 'chal-4-4',
          title: 'Revert a faulty commit safely',
          instruction: 'Type "git revert 3b9f1d2" to produce an inverse commit that cancels out commit 3b9f1d2.',
          hint: 'Type: git revert 3b9f1d2',
          expectedCommands: ['git revert 3b9f1d2'],
          solutionCommand: 'git revert 3b9f1d2'
        }
      },
      {
        id: '4-5',
        title: 'The Ultimate Safety Net: git reflog',
        slug: 'git-reflog-magic',
        shortDesc: 'Lost a commit? Deleted a branch? `git reflog` records every step so you can rescue anything.',
        moduleIndex: 4,
        difficulty: 'intermediate',
        estimatedMinutes: 6,
        metaphor: {
          title: 'The Security Camera Footage',
          analogy: 'Imagine your house has 24/7 CCTV surveillance recording every time anyone touches the safe. Even if someone hides the jewelry or throws a key away, you check the CCTV log, find the exact minute, and recover it.',
          illustrationIcon: 'LifeBuoy',
          realWorldScenario: 'You ran `git reset --hard` by accident and your important commit disappeared from `git log`! Don\'t panic: `git reflog` logged the exact commit hash before reset moved HEAD. You can get it back in 5 seconds.',
          comparisonTable: [
            { nonTech: 'The public timeline of events', gitConcept: 'git log' },
            { nonTech: 'The security camera recording every action you took', gitConcept: 'git reflog (Reference Log)' },
            { nonTech: 'Traveling back to any recorded moment', gitConcept: 'git reset --hard HEAD@{n}' }
          ]
        },
        technicalExplanation: [
          'Git maintains a Reference Log (reflog) in `.git/logs/HEAD` and `.git/logs/refs/`.',
          'Every time HEAD updates (commit, checkout, reset, merge, pull, rebase), an entry is appended with the previous and new SHA-1.',
          'Commits that lose branch pointers become "dangling commits", but Git\'s garbage collector does not delete them for at least 30 to 90 days.'
        ],
        commands: [
          {
            command: 'git reflog',
            explanation: 'Displays the chronological audit log of all HEAD pointer movements in your local repository.',
            syntax: 'git reflog',
            dangerLevel: 'safe'
          },
          {
            command: 'git reset --hard HEAD@{1}',
            explanation: 'Instantly rolls back your last destructive Git command to the exact state before it was run.',
            syntax: 'git reset --hard <reflog-selector>',
            dangerLevel: 'caution'
          }
        ],
        proTips: [
          'If you ever accidentally delete a branch with `git branch -D my-feature`, run `git reflog`, find the commit where the branch tip was, and run `git branch my-feature <commit-hash>`. Your entire branch is revived!'
        ],
        commonGotchas: [
          'Reflog is purely local to your machine. Teammates cannot see your reflog, and cloning a repo starts with a fresh empty reflog.'
        ],
        challenge: {
          id: 'chal-4-5',
          title: 'Inspect your local reference log',
          instruction: 'Type "git reflog" to view the recent movements of HEAD.',
          hint: 'Type: git reflog',
          expectedCommands: ['git reflog'],
          solutionCommand: 'git reflog'
        }
      }
    ]
  },
  {
    id: 'module-5',
    number: 5,
    title: 'Stashing: The Temporary Secret Drawer',
    description: 'Save half-finished work without creating messy WIP commits. Switch contexts instantly.',
    icon: 'Archive',
    difficulty: 'intermediate',
    lessons: [
      {
        id: '5-1',
        title: 'Shelving Work: git stash & git stash pop',
        slug: 'git-stash-basics',
        shortDesc: 'Put dirty working changes into a temporary drawer so you can switch branches cleanly.',
        moduleIndex: 5,
        difficulty: 'intermediate',
        estimatedMinutes: 6,
        metaphor: {
          title: 'The Kitchen Cutting Board Drawer',
          analogy: 'You are half-way through chopping onions for dinner when someone rings the doorbell asking for emergency help. You do not leave onions rotting on the counter. You slide the whole cutting board into a side drawer, close it, and the kitchen is sparkling clean. When they leave, you pull the drawer out and continue chopping.',
          illustrationIcon: 'FolderDown',
          realWorldScenario: 'You are in the middle of refactoring a 300-line function. A critical production bug occurs. Git will not let you switch branches with uncommitted conflicts. You run `git stash`, fix the bug on `main`, switch back, and run `git stash pop`.',
          comparisonTable: [
            { nonTech: 'Sliding messy tools into the drawer', gitConcept: 'git stash' },
            { nonTech: 'Taking items back out and removing them from drawer', gitConcept: 'git stash pop' },
            { nonTech: 'Taking items out but keeping a copy in the drawer', gitConcept: 'git stash apply' },
            { nonTech: 'Looking through all the saved items in the drawer', gitConcept: 'git stash list' }
          ]
        },
        technicalExplanation: [
          '`git stash` creates two or three special commits under `.git/refs/stash`: one for the working directory changes, one for the index, and optionally one for untracked files.',
          'It then executes a hard reset to HEAD, leaving your working directory and staging area clean.'
        ],
        commands: [
          {
            command: 'git stash',
            explanation: 'Saves your uncommitted modifications to the stash stack and resets working directory to HEAD.',
            syntax: 'git stash [push -m "description"]',
            dangerLevel: 'safe'
          },
          {
            command: 'git stash pop',
            explanation: 'Restores the most recently stashed changes and drops them from the stash stack.',
            syntax: 'git stash pop',
            dangerLevel: 'safe'
          },
          {
            command: 'git stash list',
            explanation: 'Lists all stashed snapshots stored in the stash stack (e.g. stash@{0}, stash@{1}).',
            syntax: 'git stash list',
            dangerLevel: 'safe'
          },
          {
            command: 'git stash -u',
            explanation: 'Stashes untracked brand-new files along with modified files.',
            syntax: 'git stash -u',
            dangerLevel: 'safe'
          }
        ],
        proTips: [
          'Always give your stashes descriptive names: `git stash push -m "wip: navbar animation logic"`. Stashes named "WIP on main" get confusing when you have 5 of them.'
        ],
        commonGotchas: [
          '`git stash` ignores untracked files by default! If you added a new file and did not stage it, `git stash` will leave it sitting on your disk. Use `git stash -u` (include untracked).'
        ],
        challenge: {
          id: 'chal-5-1',
          title: 'Stash your current uncommitted changes',
          instruction: 'Type "git stash" to clean your working tree and store changes on the stack.',
          hint: 'Type: git stash',
          expectedCommands: ['git stash', 'git stash push'],
          solutionCommand: 'git stash'
        }
      }
    ]
  },
  {
    id: 'module-6',
    number: 6,
    title: 'Remote Collaboration & GitHub Sync',
    description: 'Connect your local repository to the cloud. Master remotes, fetch, pull, and push.',
    icon: 'Cloud',
    difficulty: 'intermediate',
    lessons: [
      {
        id: '6-1',
        title: 'Connecting to Cloud: git remote & push',
        slug: 'remotes-and-pushing',
        shortDesc: 'Link your computer to GitHub or GitLab and upload your commits to the world.',
        moduleIndex: 6,
        difficulty: 'intermediate',
        estimatedMinutes: 7,
        metaphor: {
          title: 'The Satellite Uplink & Cargo Launch',
          analogy: '"git remote add origin" saves the phone number or web address of your team\'s headquarters. "git push" launches your completed cargo packages into orbit to synchronize with headquarters.',
          illustrationIcon: 'UploadCloud',
          realWorldScenario: 'You finished writing your code locally. Now you push your commits to GitHub so your teammates can review your pull request or build the app on CI/CD servers.',
          comparisonTable: [
            { nonTech: 'Saving headquarters telephone contact', gitConcept: 'git remote add origin <url>' },
            { nonTech: 'Checking saved contacts list', gitConcept: 'git remote -v' },
            { nonTech: 'Shipping all completed packages to HQ', gitConcept: 'git push -u origin main' }
          ]
        },
        technicalExplanation: [
          'A remote is a named shortcut for a repository URL (conventionally named `origin`).',
          '`git push <remote> <branch>` transfers local commit objects and tree blobs to the remote repository and updates remote tracking refs (`origin/main`).',
          'The `-u` (or `--set-upstream`) flag links the current local branch to the remote branch so future commands only need `git push` or `git pull`.'
        ],
        flowStep: {
          from: 'Local Repo',
          to: 'Remote',
          label: 'git push -u origin main',
          description: 'Uploads commits to the remote cloud repository.'
        },
        commands: [
          {
            command: 'git remote add origin <url>',
            explanation: 'Associates a remote URL with the nickname "origin".',
            syntax: 'git remote add <name> <url>',
            dangerLevel: 'safe'
          },
          {
            command: 'git remote -v',
            explanation: 'Lists all configured remotes with their fetch and push web addresses.',
            syntax: 'git remote -v',
            dangerLevel: 'safe'
          },
          {
            command: 'git push -u origin <branch>',
            explanation: 'Pushes local commits to the remote branch and establishes tracking.',
            syntax: 'git push -u <remote> <branch>',
            dangerLevel: 'safe'
          }
        ],
        proTips: [
          'Never use `--force` on shared branches! If you must rewrite a branch you pushed, use `--force-with-lease`. It verifies no one else pushed new work before overwriting.'
        ],
        commonGotchas: [
          'Push rejected error: If someone else pushed commits to the remote while you were working, Git rejects your push. You must `git pull` first to integrate their changes.'
        ],
        challenge: {
          id: 'chal-6-1',
          title: 'Inspect configured remote repositories',
          instruction: 'Type "git remote -v" to check the configured remote repository endpoints.',
          hint: 'Type: git remote -v',
          expectedCommands: ['git remote -v'],
          solutionCommand: 'git remote -v'
        }
      },
      {
        id: '6-2',
        title: 'Downloading Updates: git fetch vs git pull',
        slug: 'fetch-vs-pull',
        shortDesc: 'Why senior developers fetch before pulling. Avoid unexpected merge surprises.',
        moduleIndex: 6,
        difficulty: 'intermediate',
        estimatedMinutes: 6,
        metaphor: {
          title: 'Checking the Mailbox vs Opening Letters Immediately',
          analogy: '"git fetch" walks to the mailbox, brings the letters inside, and sets them on the table so you can inspect who wrote them without altering your current book. "git pull" grabs the mail, rips open the letters, and tries to tape the contents into whatever page you are reading!',
          illustrationIcon: 'DownloadCloud',
          realWorldScenario: 'Your teammate merged 10 new commits. You want to see what they did before mixing it into your working code. Running `git fetch` downloads their commits safely without touching your active files.',
          comparisonTable: [
            { nonTech: 'Bring mail into the house to inspect first', gitConcept: 'git fetch (updates origin/main only)' },
            { nonTech: 'Mix mail directly into current notebook', gitConcept: 'git pull (fetch + merge)' }
          ]
        },
        technicalExplanation: [
          '`git fetch` downloads remote objects and updates remote-tracking branches (e.g. `refs/remotes/origin/main`). It does NOT touch your local branch or working directory.',
          '`git pull` is a composite command: it runs `git fetch` followed immediately by `git merge FETCH_HEAD` (or `git rebase` if configured).',
          'Running fetch first allows you to run `git log main..origin/main` to inspect incoming commits safely.'
        ],
        flowStep: {
          from: 'Remote',
          to: 'Local Repo',
          label: 'git fetch / git pull',
          description: 'Downloads objects and merges them into your local branch.'
        },
        commands: [
          {
            command: 'git fetch origin',
            explanation: 'Downloads all new commits and branches from remote without touching your local working files.',
            syntax: 'git fetch [remote]',
            dangerLevel: 'safe'
          },
          {
            command: 'git pull',
            explanation: 'Fetches changes and immediately merges them into your current local branch.',
            syntax: 'git pull [remote] [branch]',
            dangerLevel: 'caution'
          },
          {
            command: 'git pull --rebase',
            explanation: 'Fetches changes and rebases your local commits on top of incoming commits for a cleaner linear history.',
            syntax: 'git pull --rebase',
            dangerLevel: 'caution'
          }
        ],
        proTips: [
          'Configure Git to always pull with rebase: `git config --global pull.rebase true`. This eliminates unnecessary "Merge branch \'main\' of github.com" clutter commits.'
        ],
        commonGotchas: [
          'Running `git pull` with dirty unstaged work: If incoming changes conflict with files you have modified locally, Git will halt with an error.'
        ],
        challenge: {
          id: 'chal-6-2',
          title: 'Fetch remote updates safely',
          instruction: 'Type "git fetch" to check for incoming remote commits without changing your files.',
          hint: 'Type: git fetch',
          expectedCommands: ['git fetch', 'git fetch origin'],
          solutionCommand: 'git fetch'
        }
      }
    ]
  },
  {
    id: 'module-7',
    number: 7,
    title: 'Taming Merge Conflicts with Confidence',
    description: 'Demystify merge conflicts. Learn why they happen, how to read conflict markers, and how to resolve them cleanly.',
    icon: 'AlertTriangle',
    difficulty: 'intermediate',
    lessons: [
      {
        id: '7-1',
        title: 'Why Conflicts Happen & Reading Markers',
        slug: 'merge-conflicts-explained',
        shortDesc: 'Understand the math behind conflicts and master <<<<<<< HEAD, =======, and >>>>>>> markers.',
        moduleIndex: 7,
        difficulty: 'intermediate',
        estimatedMinutes: 8,
        metaphor: {
          title: 'Two Editors Writing on the Same Paragraph',
          analogy: 'Imagine two people editing a physical magazine article at the same time. Person A changes the headline to "Tech Advances in 2026". Person B changes the headline to "Future of AI in 2026". The printer robot does not know which human is right, so it holds up both drafts with red brackets and asks you: "Which one do you want?"',
          illustrationIcon: 'GitPullRequest',
          realWorldScenario: 'You changed line 14 of `style.css` to background: blue. Your teammate changed line 14 to background: red. Git cannot guess your company brand color, so it marks line 14 as a conflict.',
          comparisonTable: [
            { nonTech: 'Your original version before the conflict', gitConcept: '<<<<<<< HEAD' },
            { nonTech: 'The dividing boundary line', gitConcept: '=======' },
            { nonTech: 'The incoming version from the other branch', gitConcept: '>>>>>>> incoming_branch' }
          ]
        },
        technicalExplanation: [
          'Git can automatically merge changes in different files, or even different lines in the same file.',
          'A conflict occurs ONLY when both branches modified the EXACT same lines since their common ancestor, or one branch modified a file that the other deleted.',
          'Git inserts three distinct text markers into the affected files:',
          '1. `<<<<<<< HEAD`: The start of your current branch\'s changes.',
          '2. `=======`: The separator dividing the competing versions.',
          '3. `>>>>>>> <branch>`: The end of the incoming branch\'s changes.'
        ],
        commands: [
          {
            command: 'git status',
            explanation: 'Lists all files currently in conflict under "Unmerged paths".',
            syntax: 'git status',
            dangerLevel: 'safe'
          },
          {
            command: 'git merge --abort',
            explanation: 'The emergency abort button: completely stops the merge and restores your branch to exactly how it was before you ran git merge.',
            syntax: 'git merge --abort',
            dangerLevel: 'safe'
          }
        ],
        proTips: [
          'Remember the panic button: `git merge --abort`! If a merge conflict looks overwhelming and you need time to consult a colleague, run this to reset back to peace.',
          'Modern editors like VS Code have built-in "Accept Current", "Accept Incoming", or "Accept Both" buttons directly above conflict markers.'
        ],
        commonGotchas: [
          'Accidentally committing conflict markers: If you leave `<<<<<<< HEAD` or `=======` in your file and run `git add`, it will commit the raw marker text into production code!'
        ],
        challenge: {
          id: 'chal-7-1',
          title: 'Check repository status during a conflict',
          instruction: 'Type "git status" to inspect unmerged paths and see conflicted files.',
          hint: 'Type: git status',
          expectedCommands: ['git status'],
          solutionCommand: 'git status'
        }
      }
    ]
  },
  {
    id: 'module-8',
    number: 8,
    title: 'Advanced Branch Crafting: Rebase & Cherry-Pick',
    description: 'Transform messy commit spaghetti into clean, linear works of art. Master interactive rebase and cherry-picking.',
    icon: 'Shuffle',
    difficulty: 'advanced',
    lessons: [
      {
        id: '8-1',
        title: 'Rebase vs Merge: The Linear History Art',
        slug: 'rebase-vs-merge',
        shortDesc: 'Replay your commits on top of another branch for a pure, unbroken linear project timeline.',
        moduleIndex: 8,
        difficulty: 'advanced',
        estimatedMinutes: 8,
        metaphor: {
          title: 'Lifting and Replanting the Tree Branch',
          analogy: 'Imagine you pruned a healthy rose branch from a bush. Instead of letting it grow crookedly outward with a tangled criss-cross bridge, you gently replant its base right at the newest tip of the main trunk. It now grows forward in a straight, beautiful line.',
          illustrationIcon: 'GitCommit',
          realWorldScenario: 'You branched off `main` two weeks ago. Meanwhile, `main` received 20 commits. A merge creates a tangled knot in `git log`. A `git rebase main` lifts your 3 commits and replays them cleanly on top of `main`\'s latest commit.',
          comparisonTable: [
            { nonTech: 'Building a bridge between two historical points', gitConcept: 'git merge (preserves historical timeline)' },
            { nonTech: 'Re-basing your foundation on the latest ground', gitConcept: 'git rebase (creates linear spotless history)' }
          ]
        },
        technicalExplanation: [
          '`git rebase <base>` finds the common ancestor between the current branch and `<base>`.',
          'It saves each commit on the current branch as a temporary patch in `.git/rebase-apply/`.',
          'It resets the current branch to `<base>`, then applies each patch one-by-one, generating brand new commit SHA hashes with updated parent IDs.'
        ],
        commands: [
          {
            command: 'git rebase <upstream-branch>',
            explanation: 'Replays commits from your current branch onto the tip of the upstream branch.',
            syntax: 'git rebase <target-branch>',
            dangerLevel: 'caution'
          },
          {
            command: 'git rebase --continue',
            explanation: 'Resumes rebasing after resolving a conflict during one of the replayed commits.',
            syntax: 'git rebase --continue',
            dangerLevel: 'safe'
          },
          {
            command: 'git rebase --abort',
            explanation: 'Cancels the rebase operation entirely and restores your original branch state.',
            syntax: 'git rebase --abort',
            dangerLevel: 'safe'
          }
        ],
        proTips: [
          'The Golden Rule of Rebasing: Never rebase a public branch that other people have cloned or branched off of. Only rebase your own local private feature branches before merging!'
        ],
        commonGotchas: [
          'Resolving conflicts during rebase: Unlike merge (which has 1 conflict resolution), rebase can prompt you to resolve conflicts for EACH commit being replayed. Keep feature branches short to prevent this.'
        ],
        challenge: {
          id: 'chal-8-1',
          title: 'Rebase your feature branch on main',
          instruction: 'Type "git rebase main" to replay your feature commits cleanly onto the tip of main.',
          hint: 'Type: git rebase main',
          expectedCommands: ['git rebase main'],
          solutionCommand: 'git rebase main'
        }
      },
      {
        id: '8-2',
        title: 'Interactive Rebase: Squash, Reword, & Clean',
        slug: 'interactive-rebase-squash',
        shortDesc: 'The secret weapon of senior engineers: turn 10 messy WIP commits into 1 glorious masterpiece.',
        moduleIndex: 8,
        difficulty: 'advanced',
        estimatedMinutes: 9,
        metaphor: {
          title: 'The Film Director\'s Editing Studio',
          analogy: 'While shooting a movie, actors make 20 bloopers, retakes, and half-finished lines. The director does not put all 20 bloopers into the cinema release! In the editing room, they cut out the bad takes, blend scenes together, and publish one polished, seamless movie.',
          illustrationIcon: 'Sliders',
          realWorldScenario: 'You created commits: "wip", "fixed typo", "fix again", "damn semicolon", "finally works". Before submitting your pull request for code review, you interactive rebase to squash those 5 embarrassing commits into one: "Implement user authentication with JWT".',
          comparisonTable: [
            { nonTech: 'Keep this scene unchanged', gitConcept: 'pick' },
            { nonTech: 'Change the title / dialogue', gitConcept: 'reword' },
            { nonTech: 'Melt this scene into the previous one', gitConcept: 'squash / fixup' },
            { nonTech: 'Delete this blooper from the movie', gitConcept: 'drop' }
          ]
        },
        technicalExplanation: [
          '`git rebase -i <base>` opens an interactive script editor with a list of commits starting from `<base>` to `HEAD`.',
          'Common commands available in interactive rebase:',
          '- `pick`: Use commit as is.',
          '- `reword`: Keep commit content, but pause to edit the commit message.',
          '- `squash`: Melt commit into previous commit and combine messages.',
          '- `fixup`: Melt commit into previous commit, discarding this commit\'s message.',
          '- `drop`: Completely discard this commit.',
          '- `edit`: Pause execution at this commit to amend files or split into smaller commits.'
        ],
        commands: [
          {
            command: 'git rebase -i HEAD~3',
            explanation: 'Opens the interactive rebase editor for the last 3 commits.',
            syntax: 'git rebase -i HEAD~<n>',
            dangerLevel: 'caution'
          }
        ],
        proTips: [
          '`fixup` is often faster than `squash` because it automatically discards the commit message, leaving only the clean message of the base commit.'
        ],
        commonGotchas: [
          'Accidentally deleting the first line in the rebase script: Git interprets a missing line as `drop` and will delete that commit!'
        ],
        challenge: {
          id: 'chal-8-2',
          title: 'Launch interactive rebase',
          instruction: 'Type "git rebase -i HEAD~2" to open interactive rebase for the last 2 commits.',
          hint: 'Type: git rebase -i HEAD~2',
          expectedCommands: ['git rebase -i HEAD~2', 'git rebase -i HEAD~3'],
          solutionCommand: 'git rebase -i HEAD~2'
        }
      },
      {
        id: '8-3',
        title: 'Cherry-Picking: Plucking a Single Commit',
        slug: 'git-cherry-pick',
        shortDesc: 'Need a bugfix from another branch without merging the whole thing? Cherry-pick it!',
        moduleIndex: 8,
        difficulty: 'advanced',
        estimatedMinutes: 6,
        metaphor: {
          title: 'Plucking One Ripe Apple from a Tree',
          analogy: 'You visit an orchard with 50 apple trees. You do not want to cut down and buy an entire tree with unripe fruit. You reach up, pluck one perfectly ripe red apple, and put it in your basket.',
          illustrationIcon: 'Cherry',
          realWorldScenario: 'A teammate is working on a massive experimental branch with 40 unfinished features. Hidden inside is a 2-line critical security fix. You do not want their 40 broken features. You cherry-pick only that one security commit into `main`.',
          comparisonTable: [
            { nonTech: 'Taking the entire tree and everything on it', gitConcept: 'git merge <branch>' },
            { nonTech: 'Plucking only one specific apple', gitConcept: 'git cherry-pick <commit-hash>' }
          ]
        },
        technicalExplanation: [
          '`git cherry-pick <commit-hash>` calculates the diff introduced by `<commit-hash>` relative to its parent, and attempts to apply that exact patch onto the current HEAD commit.',
          'It creates a brand new commit on the active branch with the same message and code changes, but with a new SHA hash and new parent pointer.'
        ],
        commands: [
          {
            command: 'git cherry-pick <commit-hash>',
            explanation: 'Copies and applies a specific commit from any branch onto your active branch.',
            syntax: 'git cherry-pick <hash>',
            dangerLevel: 'safe'
          },
          {
            command: 'git cherry-pick -n <commit-hash>',
            explanation: 'Applies the changes to staging without auto-committing, letting you inspect or tweak them.',
            syntax: 'git cherry-pick -n <hash>',
            dangerLevel: 'safe'
          }
        ],
        proTips: [
          'Cherry-picking is fantastic for backporting critical bugfixes from your development branch into older LTS maintenance release branches.'
        ],
        commonGotchas: [
          'Duplicate commits: Cherry-picking creates duplicate commit changes with different hashes. If you later merge the source branch, Git is usually smart enough to resolve it, but it can cause conflicts if lines were modified since.'
        ],
        challenge: {
          id: 'chal-8-3',
          title: 'Cherry pick a bugfix',
          instruction: 'Type "git cherry-pick 3b9f1d2" to pluck that commit onto your current branch.',
          hint: 'Type: git cherry-pick 3b9f1d2',
          expectedCommands: ['git cherry-pick 3b9f1d2'],
          solutionCommand: 'git cherry-pick 3b9f1d2'
        }
      }
    ]
  },
  {
    id: 'module-9',
    number: 9,
    title: 'Forensics, Investigation & Tagging',
    description: 'Find bugs with binary search, inspect who changed what with blame, and mark production releases with tags.',
    icon: 'Search',
    difficulty: 'advanced',
    lessons: [
      {
        id: '9-1',
        title: 'Marking Milestones: git tag',
        slug: 'git-tags-and-releases',
        shortDesc: 'Mark specific moments in history as official software releases (e.g., v1.0.0).',
        moduleIndex: 9,
        difficulty: 'advanced',
        estimatedMinutes: 5,
        metaphor: {
          title: 'The Golden Seal & Ribbon on a Diploma',
          analogy: 'While branches are bookmarks that keep moving forward as you write new pages, a Tag is a permanent golden seal glued to one specific page. It never moves.',
          illustrationIcon: 'Tag',
          realWorldScenario: 'You are deploying your software to production. You create a tag `v1.0.0`. Months later, you can instantly jump back to exactly what code was running in version 1.0.0.',
          comparisonTable: [
            { nonTech: 'A bookmark that shifts as you read new pages', gitConcept: 'Git Branch (moving pointer)' },
            { nonTech: 'A permanent wax seal on one specific page', gitConcept: 'Git Tag (static immutable pointer)' }
          ]
        },
        technicalExplanation: [
          'Git supports two types of tags:',
          '1. Lightweight Tag: Simply a pointer to a specific commit (stored in `.git/refs/tags/`).',
          '2. Annotated Tag: A full Git object stored in the object database with its own tagger name, email, date, GPG signature, and descriptive release notes.'
        ],
        commands: [
          {
            command: 'git tag -a v1.0.0 -m "Release version 1.0.0"',
            explanation: 'Creates an annotated release tag with a descriptive message.',
            syntax: 'git tag -a <version> -m "<notes>"',
            dangerLevel: 'safe'
          },
          {
            command: 'git tag',
            explanation: 'Lists all tags created in the repository in alphabetical order.',
            syntax: 'git tag',
            dangerLevel: 'safe'
          },
          {
            command: 'git push origin --tags',
            explanation: 'Git does not push tags to remotes by default! This pushes all local tags to GitHub.',
            syntax: 'git push origin --tags',
            dangerLevel: 'safe'
          }
        ],
        proTips: [
          'Follow Semantic Versioning (SemVer): `vMAJOR.MINOR.PATCH` (e.g. `v2.4.1`). Increment MAJOR for breaking changes, MINOR for new features, PATCH for bug fixes.'
        ],
        commonGotchas: [
          'Forgetting to push tags: Running `git push` does NOT push tags to GitHub. You must specify `git push origin v1.0.0` or `git push --tags`.'
        ],
        challenge: {
          id: 'chal-9-1',
          title: 'Create an annotated release tag',
          instruction: 'Type `git tag -a v1.0.0 -m "First official production release"` to tag current HEAD.',
          hint: 'Type: git tag -a v1.0.0 -m "First official production release"',
          expectedCommands: ['git tag -a v1.0.0 -m "First official production release"', 'git tag v1.0.0'],
          solutionCommand: 'git tag -a v1.0.0 -m "First official production release"'
        }
      },
      {
        id: '9-2',
        title: 'Detective Work: git blame & git bisect',
        slug: 'forensics-blame-and-bisect',
        shortDesc: 'Find the author of any line of code, and use binary search to locate which commit introduced a bug.',
        moduleIndex: 9,
        difficulty: 'advanced',
        estimatedMinutes: 7,
        metaphor: {
          title: 'The Crime Scene Investigation & Binary Guessing Game',
          analogy: '"git blame" looks at every single sentence in a book and stamps the author\'s name and date next to it. "git bisect" is like the "Guess the number between 1 and 1000" game: by testing the halfway point repeatedly, it pinpoints a broken commit in just 10 steps instead of checking 1,000 commits!',
          illustrationIcon: 'UserCheck',
          realWorldScenario: 'A function that worked last month is crashing today. You don\'t know which of the 500 commits broke it. `git bisect` automatically checks out the middle commit, asks "does it work?", and finds the offending commit in seconds.',
          comparisonTable: [
            { nonTech: 'Checking author signatures on each line', gitConcept: 'git blame <file>' },
            { nonTech: 'Splitting search area in half repeatedly', gitConcept: 'git bisect (O(log n) debugging)' }
          ]
        },
        technicalExplanation: [
          '`git blame <file>` displays the commit hash, author, and timestamp for every single line of a file.',
          '`git bisect` uses a binary search algorithm: you designate a known `bad` commit (e.g. HEAD) and a known `good` commit (e.g. v1.0). Git bisects between them until the exact culprit commit is isolated.'
        ],
        commands: [
          {
            command: 'git blame <filename>',
            explanation: 'Shows who authored and modified each line of a file.',
            syntax: 'git blame <file>',
            dangerLevel: 'safe'
          },
          {
            command: 'git bisect start',
            explanation: 'Initializes a binary search session across commits to locate a regression bug.',
            syntax: 'git bisect start',
            dangerLevel: 'safe'
          },
          {
            command: 'git bisect bad',
            explanation: 'Marks the current checked-out commit as broken / containing the bug.',
            syntax: 'git bisect bad',
            dangerLevel: 'safe'
          },
          {
            command: 'git bisect good <commit-or-tag>',
            explanation: 'Marks an older commit where the bug was definitely not present.',
            syntax: 'git bisect good <commit>',
            dangerLevel: 'safe'
          }
        ],
        proTips: [
          'You can fully automate `git bisect` with an automated test script: `git bisect run npm test`! Git will test all commits automatically while you grab a coffee.'
        ],
        commonGotchas: [
          'Forgetting to reset bisect: When finished finding the bug, run `git bisect reset` to return your working tree to normal.'
        ],
        challenge: {
          id: 'chal-9-2',
          title: 'Start a bisect session',
          instruction: 'Type "git bisect start" to begin hunting for a bug.',
          hint: 'Type: git bisect start',
          expectedCommands: ['git bisect start'],
          solutionCommand: 'git bisect start'
        }
      }
    ]
  },
  {
    id: 'module-10',
    number: 10,
    title: 'Elite Git Mastery: Worktrees, Hooks & Plumbing',
    description: 'Work on multiple branches simultaneously with worktrees, automate quality with hooks, and peek inside .git internals.',
    icon: 'Cpu',
    difficulty: 'expert',
    lessons: [
      {
        id: '10-1',
        title: 'Multi-Tasking Superpower: git worktree',
        slug: 'git-worktrees',
        shortDesc: 'Work on multiple branches at the exact same time in separate folders without switching or stashing!',
        moduleIndex: 10,
        difficulty: 'expert',
        estimatedMinutes: 7,
        metaphor: {
          title: 'Having Two Desks in the Same Office',
          analogy: 'Instead of clearing all your papers off Desk A every time you need to look at Desk B, you simply walk over to Desk B where the second project is already spread out waiting for you. Both desks share the exact same filing cabinet (the .git directory).',
          illustrationIcon: 'Laptop',
          realWorldScenario: 'You are running a 30-minute test suite on your branch. An urgent hotfix is needed. Instead of stopping the test or stashing, you run `git worktree add ../hotfix main`. A second directory opens with `main` checked out immediately!',
          comparisonTable: [
            { nonTech: 'Packing everything away to switch rooms', gitConcept: 'git switch / stash' },
            { nonTech: 'Opening a second desk sharing the same filing cabinet', gitConcept: 'git worktree add' }
          ]
        },
        technicalExplanation: [
          'A Git Worktree allows multiple working trees to be linked to a single Git repository.',
          'Each linked worktree has its own checked-out branch, staging index, and working tree, but they all share the exact same `.git/objects` database and refs.',
          'This eliminates the need to clone a repo multiple times or wait for heavy node_modules installs when switching branches.'
        ],
        commands: [
          {
            command: 'git worktree add <path> <branch>',
            explanation: 'Creates a new directory checked out to a specific branch linked to this repository.',
            syntax: 'git worktree add <path> <branch>',
            dangerLevel: 'safe'
          },
          {
            command: 'git worktree list',
            explanation: 'Lists all active linked worktrees and their paths.',
            syntax: 'git worktree list',
            dangerLevel: 'safe'
          },
          {
            command: 'git worktree remove <path>',
            explanation: 'Safely removes a linked worktree directory when you are finished.',
            syntax: 'git worktree remove <path>',
            dangerLevel: 'safe'
          }
        ],
        proTips: [
          'Senior full-stack developers use worktrees constantly when doing long-running docker builds or AI training runs on one branch while continuing coding on another.'
        ],
        commonGotchas: [
          'Two worktrees cannot check out the same branch at the same time. Git prevents this to avoid corrupting branch pointers.'
        ],
        challenge: {
          id: 'chal-10-1',
          title: 'List linked worktrees',
          instruction: 'Type "git worktree list" to view registered worktrees.',
          hint: 'Type: git worktree list',
          expectedCommands: ['git worktree list'],
          solutionCommand: 'git worktree list'
        }
      },
      {
        id: '10-2',
        title: 'Git Internals & Plumbing: Blobs, Trees, & Refs',
        slug: 'git-internals-plumbing',
        shortDesc: 'Peek behind the curtain into the .git folder. Understand how Git compresses and stores your data.',
        moduleIndex: 10,
        difficulty: 'expert',
        estimatedMinutes: 8,
        metaphor: {
          title: 'Looking Inside the Engine of an Exotic Sports Car',
          analogy: 'Most drivers only touch the steering wheel and pedals (Porcelain commands: add, commit, push). But mechanics know about the pistons, crankshaft, and fuel injectors (Plumbing objects: Blobs, Trees, Commits). Once you understand the engine, nothing in Git feels mysterious anymore.',
          illustrationIcon: 'Key',
          realWorldScenario: 'Ever wonder why Git repositories are so tiny and fast? Git breaks every file down into compressed zlib content-addressable blobs. If two files have identical content, Git only stores one blob!',
          comparisonTable: [
            { nonTech: 'The raw file content', gitConcept: 'Blob (Binary Large Object)' },
            { nonTech: 'The directory folder containing files & filenames', gitConcept: 'Tree object' },
            { nonTech: 'The snapshot receipt with author & message', gitConcept: 'Commit object' },
            { nonTech: 'Sticky note pointing to a commit hash', gitConcept: 'Reference (Ref / Branch pointer)' }
          ]
        },
        technicalExplanation: [
          'Git\'s object store (`.git/objects/`) is a simple content-addressable key-value database:',
          '- Key: 40-character SHA-1 checksum.',
          '- Value: Compressed zlib data with a header (type + size + null byte + content).',
          'The 4 core object types are:',
          '1. Blob: Stores pure file content without filenames or permissions.',
          '2. Tree: Represents a directory folder. Maps filenames and file modes to blob or sub-tree hashes.',
          '3. Commit: Points to a root Tree, parent commit(s), author, and commit message.',
          '4. Tag: Points to an object with human release metadata and signature.'
        ],
        commands: [
          {
            command: 'git cat-file -p <hash>',
            explanation: 'Plumbing command: pretty-prints the raw contents of any object in the Git database.',
            syntax: 'git cat-file -p <object-hash>',
            dangerLevel: 'safe'
          },
          {
            command: 'git cat-file -t <hash>',
            explanation: 'Plumbing command: returns the type of the object (blob, tree, commit, or tag).',
            syntax: 'git cat-file -t <object-hash>',
            dangerLevel: 'safe'
          },
          {
            command: 'git count-objects -v',
            explanation: 'Reports the number of loose objects and packfile disk space consumption.',
            syntax: 'git count-objects -v',
            dangerLevel: 'safe'
          }
        ],
        proTips: [
          'Knowing that branches are just text files in `.git/refs/heads/` gives you confidence: a branch is literally just a 40-byte text file containing a SHA hash!'
        ],
        commonGotchas: [
          'Trying to manually edit files in `.git/objects` with a text editor: They are binary zlib compressed, so editing them will corrupt the checksum.'
        ],
        challenge: {
          id: 'chal-10-2',
          title: 'Inspect an internal object',
          instruction: 'Type "git count-objects -v" to inspect your repository\'s object database statistics.',
          hint: 'Type: git count-objects -v',
          expectedCommands: ['git count-objects -v'],
          solutionCommand: 'git count-objects -v'
        }
      }
    ]
  }
];

