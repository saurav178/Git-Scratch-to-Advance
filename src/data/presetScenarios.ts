import { GitRepositoryState } from '../types/git';

export interface PresetScenario {
  id: string;
  title: string;
  badge: string;
  description: string;
  state: GitRepositoryState;
}

export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'clean-slate',
    title: '1. Brand New Empty Project',
    badge: 'Beginner',
    description: 'A fresh repository just initialized with git init and a single README commit.',
    state: {
      isInitialized: true,
      currentBranch: 'main',
      headDetached: false,
      headCommitId: '101a001',
      branches: { 'main': '101a001' },
      commits: {
        '101a001': {
          id: '101a001',
          fullHash: '101a001000000000000000000000000000000000',
          message: 'Initial project setup & README',
          author: 'Alex Developer <alex@example.com>',
          timestamp: '1 hour ago',
          parentIds: [],
          branchName: 'main',
          files: { 'README.md': '# My New Git Project\nStarting from scratch!' }
        }
      },
      tags: {},
      workingDirectory: {
        'README.md': { name: 'README.md', status: 'committed', content: '# My New Git Project\nStarting from scratch!', committedContent: '# My New Git Project\nStarting from scratch!' },
        'index.html': { name: 'index.html', status: 'untracked', content: '<!DOCTYPE html>\n<html>\n<body><h1>Hello Git!</h1></body>\n</html>' }
      },
      stagingArea: {},
      stashes: [],
      reflog: [
        { id: '1', selector: 'HEAD@{0}', action: 'commit: Initial project setup & README', commitId: '101a001' }
      ],
      remotes: {}
    }
  },
  {
    id: 'branching-diverged',
    title: '2. Feature Branch Diverged from Main',
    badge: 'Intermediate',
    description: 'Both main and feature/checkout have added commits independently. Perfect for practicing 3-way merge or rebase!',
    state: {
      isInitialized: true,
      currentBranch: 'feature/checkout',
      headDetached: false,
      headCommitId: 'c300003',
      branches: {
        'main': 'b200002',
        'feature/checkout': 'c300003'
      },
      commits: {
        'a100001': {
          id: 'a100001',
          fullHash: 'a100001111111111111111111111111111111111',
          message: 'Base e-commerce skeleton',
          author: 'Alex Developer <alex@example.com>',
          timestamp: '3 days ago',
          parentIds: [],
          branchName: 'main',
          files: { 'app.js': 'console.log("Store loaded");' }
        },
        'b200002': {
          id: 'b200002',
          fullHash: 'b200002222222222222222222222222222222222',
          message: 'Add promo banner to homepage (on main)',
          author: 'Teammate Sam <sam@example.com>',
          timestamp: '1 day ago',
          parentIds: ['a100001'],
          branchName: 'main',
          files: { 'app.js': 'console.log("Store loaded");\nshowPromoBanner();' }
        },
        'c300003': {
          id: 'c300003',
          fullHash: 'c300003333333333333333333333333333333333',
          message: 'Implement Stripe credit card checkout',
          author: 'Alex Developer <alex@example.com>',
          timestamp: '12 hours ago',
          parentIds: ['a100001'],
          branchName: 'feature/checkout',
          files: { 'app.js': 'console.log("Store loaded");\nprocessStripePayment();' }
        }
      },
      tags: {},
      workingDirectory: {
        'app.js': {
          name: 'app.js',
          status: 'committed',
          content: 'console.log("Store loaded");\nprocessStripePayment();',
          committedContent: 'console.log("Store loaded");\nprocessStripePayment();'
        }
      },
      stagingArea: {},
      stashes: [],
      reflog: [
        { id: '1', selector: 'HEAD@{0}', action: 'commit: Implement Stripe credit card checkout', commitId: 'c300003' },
        { id: '2', selector: 'HEAD@{1}', action: 'checkout: moving from main to feature/checkout', commitId: 'a100001' }
      ],
      remotes: {
        'origin': {
          name: 'origin',
          url: 'https://github.com/myteam/ecommerce-shop.git',
          branches: { 'main': 'b200002' }
        }
      }
    }
  },
  {
    id: 'conflict-scenario',
    title: '3. Merge Conflict in Action',
    badge: 'Rescue Practice',
    description: 'A merge conflict in style.css! Practice inspecting conflict markers and resolving it.',
    state: {
      isInitialized: true,
      currentBranch: 'main',
      headDetached: false,
      headCommitId: 'm400004',
      branches: {
        'main': 'm400004',
        'feature/red-button': 'f500005'
      },
      commits: {
        'r100001': {
          id: 'r100001',
          fullHash: 'r1000010000000000000000000000000000000000',
          message: 'Initial button styles',
          author: 'Alex <alex@example.com>',
          timestamp: '2 days ago',
          parentIds: [],
          branchName: 'main',
          files: { 'button.css': '.btn { background: gray; }' }
        },
        'm400004': {
          id: 'm400004',
          fullHash: 'm4000040000000000000000000000000000000000',
          message: 'Change button to brand blue',
          author: 'Designer Dave <dave@example.com>',
          timestamp: '5 hours ago',
          parentIds: ['r100001'],
          branchName: 'main',
          files: { 'button.css': '.btn { background: #0066cc; }' }
        },
        'f500005': {
          id: 'f500005',
          fullHash: 'f500005000000000000000000000000000000000',
          message: 'Change button to alert red',
          author: 'Product Sarah <sarah@example.com>',
          timestamp: '3 hours ago',
          parentIds: ['r100001'],
          branchName: 'feature/red-button',
          files: { 'button.css': '.btn { background: #dc2626; }' }
        }
      },
      tags: {},
      workingDirectory: {
        'button.css': {
          name: 'button.css',
          status: 'modified',
          content: `<<<<<<< HEAD\n.btn { background: #0066cc; /* Brand Blue */ }\n=======\n.btn { background: #dc2626; /* Alert Red */ }\n>>>>>>> feature/red-button\n`,
          committedContent: '.btn { background: #0066cc; }'
        }
      },
      stagingArea: {},
      stashes: [],
      reflog: [
        { id: '1', selector: 'HEAD@{0}', action: 'merge feature/red-button: conflict in button.css', commitId: 'm400004' }
      ],
      remotes: {
        'origin': {
          name: 'origin',
          url: 'https://github.com/myteam/ui-library.git',
          branches: { 'main': 'm400004' }
        }
      },
      mergeInProgress: {
        sourceBranch: 'feature/red-button',
        conflictedFiles: ['button.css']
      }
    }
  },
  {
    id: 'stashed-and-reflog',
    title: '4. Active Stashes & Reflog Recovery',
    badge: 'Time Travel',
    description: 'A repository with 2 stashed drafts and recent head movements. Test git stash pop or git reflog.',
    state: {
      isInitialized: true,
      currentBranch: 'main',
      headDetached: false,
      headCommitId: '99aa88b',
      branches: { 'main': '99aa88b' },
      commits: {
        '11aa22b': {
          id: '11aa22b',
          fullHash: '11aa22b000000000000000000000000000000000',
          message: 'Setup project skeleton',
          author: 'Alex <alex@example.com>',
          timestamp: '3 days ago',
          parentIds: [],
          branchName: 'main',
          files: { 'index.js': '// app' }
        },
        '99aa88b': {
          id: '99aa88b',
          fullHash: '99aa88b000000000000000000000000000000000',
          message: 'Add analytics tracking',
          author: 'Alex <alex@example.com>',
          timestamp: '1 hour ago',
          parentIds: ['11aa22b'],
          branchName: 'main',
          files: { 'index.js': '// app\ntrackPageView();' }
        }
      },
      tags: {
        'v1.0.0': { name: 'v1.0.0', commitId: '99aa88b', annotated: true, message: 'Stable release' }
      },
      workingDirectory: {
        'index.js': {
          name: 'index.js',
          status: 'committed',
          content: '// app\ntrackPageView();',
          committedContent: '// app\ntrackPageView();'
        }
      },
      stagingArea: {},
      stashes: [
        {
          id: 'stash@{0}',
          message: 'WIP on experiment: custom theme picker',
          timestamp: '20 mins ago',
          branch: 'main',
          files: [
            { name: 'theme.js', status: 'modified', content: 'export const theme = "dark";' }
          ]
        }
      ],
      reflog: [
        { id: '1', selector: 'HEAD@{0}', action: 'commit: Add analytics tracking', commitId: '99aa88b' },
        { id: '2', selector: 'HEAD@{1}', action: 'reset: moving to 11aa22b', commitId: '11aa22b' },
        { id: '3', selector: 'HEAD@{2}', action: 'commit: Setup project skeleton', commitId: '11aa22b' }
      ],
      remotes: {
        'origin': {
          name: 'origin',
          url: 'https://github.com/alex/analytics-app.git',
          branches: { 'main': '99aa88b' }
        }
      }
    }
  }
];

