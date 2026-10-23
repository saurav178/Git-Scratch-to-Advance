export interface SimpleStep {
  id: string;
  title: string;
  tagline: string;
  story: string; // Plain English explanation like for a 5yo
  metaphor: {
    emoji: string;
    concept: string; // e.g. "The Backpack"
    explanation: string;
  };
  command: string;
  commandExplanation: string;
  interactiveAction: {
    buttonLabel: string;
    buttonIcon: string;
    actionType: 'create_file' | 'git_add' | 'git_commit' | 'git_branch' | 'git_switch' | 'git_merge' | 'git_restore' | 'git_push' | 'git_stash' | 'git_revert';
    payload?: string;
    successMessage: string;
  };
  proTip: string;
  quickQuestion?: {
    question: string;
    options: string[];
    correctIndex: number;
    celebrationText: string;
  };
}

export interface SimpleLevel {
  id: string;
  number: number;
  title: string;
  emoji: string;
  summary: string;
  color: string; // tailwind color theme e.g. "emerald", "blue", "purple", "amber", "rose"
  steps: SimpleStep[];
}

export const SIMPLE_CURRICULUM: SimpleLevel[] = [
  {
    id: 'level-1',
    number: 1,
    title: 'The Magic Camera (Save Points)',
    emoji: '📸',
    summary: 'Learn how Git saves your work like taking photos of your drawings, so you can never lose anything!',
    color: 'emerald',
    steps: [
      {
        id: '1-1',
        title: 'What is Git? (Your Forever Memory Box)',
        tagline: 'Never worry about losing your work or pressing Ctrl+Z again.',
        story: 'Imagine you are building an amazing castle out of LEGO bricks or drawing a superhero picture. Normally, if someone bumps the table, your castle breaks! Git is like a magic camera: every time you build something cool, you snap a photo. If your castle ever falls, you can instantly turn back time to any photo you took.',
        metaphor: {
          emoji: '🏰',
          concept: 'The Magic Camera',
          explanation: 'Your files are LEGO creations. Git is the camera that takes permanent snapshots so you can rebuild anything in 1 second.'
        },
        command: 'git init',
        commandExplanation: 'This sets up the magic camera box inside your project folder.',
        interactiveAction: {
          buttonLabel: 'Turn on the Magic Camera (git init)',
          buttonIcon: 'Sparkles',
          actionType: 'git_commit',
          payload: 'Initial Empty Project',
          successMessage: '🎉 Magic Camera activated! Git is now watching your folder and ready to protect your creations.'
        },
        proTip: 'You only ever run "git init" once when starting a brand new project!',
        quickQuestion: {
          question: 'What does Git do for your files?',
          options: [
            'It takes permanent memory photos so you can travel back in time whenever you want.',
            'It deletes all your files to make space.',
            'It only works when connected to the internet.'
          ],
          correctIndex: 0,
          celebrationText: 'Spot on! Git is your personal time machine and safety net!'
        }
      },
      {
        id: '1-2',
        title: 'Making a Drawing (Your Working Desk)',
        tagline: 'Your desk is where you create and change things.',
        story: 'Your computer folder is like your art desk. When you create a new drawing (like "superhero.png"), it sits on your desk. Git notices it sitting there, but it hasn\'t taken a photo of it yet!',
        metaphor: {
          emoji: '🎨',
          concept: 'The Art Desk (Working Directory)',
          explanation: 'Everything you are currently typing or drawing sits on your desk.'
        },
        command: 'git status',
        commandExplanation: 'Looks at your desk and tells you: "Hey, you have a new drawing sitting here!"',
        interactiveAction: {
          buttonLabel: 'Draw a New Picture (Create superhero.png)',
          buttonIcon: 'FilePlus',
          actionType: 'create_file',
          payload: 'superhero.png',
          successMessage: '🎨 You drew "superhero.png"! It is sitting on your desk. Run git status to see it!'
        },
        proTip: 'Whenever you feel confused, type "git status". It is your dashboard radar that tells you exactly what is happening.',
        quickQuestion: {
          question: 'What is your "Working Directory"?',
          options: [
            'Your actual desk/folder where you write code and edit files.',
            'A secret website on the moon.',
            'A broken hard drive.'
          ],
          correctIndex: 0,
          celebrationText: 'Exactly! It is simply the files right in front of you!'
        }
      },
      {
        id: '1-3',
        title: 'Packing the Backpack (git add)',
        tagline: 'Pick which drawings you want to show in your next photo.',
        story: 'You wouldn\'t take a photo of messy scrap paper on the floor. You choose the best drawings from your desk and put them into your school backpack! In Git, putting files into your backpack is called "staging" using the command "git add".',
        metaphor: {
          emoji: '🎒',
          concept: 'The School Backpack (Staging Area)',
          explanation: 'A clean pouch where you pack the files you want to include in your next permanent photo.'
        },
        command: 'git add .',
        commandExplanation: 'The dot "." means "take all the cool drawings on my desk and pack them into my backpack!"',
        interactiveAction: {
          buttonLabel: 'Pack Drawings into Backpack (git add .)',
          buttonIcon: 'Package',
          actionType: 'git_add',
          payload: '.',
          successMessage: '🎒 Packed! Your drawings are now sitting safely inside your backpack ready to be photographed!'
        },
        proTip: 'You can pack one specific file with "git add superhero.png" or everything at once with "git add .".',
        quickQuestion: {
          question: 'Why do we have a Backpack (Staging Area)?',
          options: [
            'So we can choose exactly which files get saved in the next photo checkpoint.',
            'Because computers get tired without bags.',
            'To automatically translate English to French.'
          ],
          correctIndex: 0,
          celebrationText: 'Bingo! It gives you total control over what you save!'
        }
      },
      {
        id: '1-4',
        title: 'Snap the Photo! (git commit)',
        tagline: 'Lock in a permanent checkpoint with a friendly title.',
        story: 'Now that your backpack is packed, you press the camera shutter: CLICK! 📸 Git takes a permanent photo, seals it in your photo album, and writes your caption under it (like "Draw superhero suit"). Even if you close your computer or change your mind later, that photo is locked in forever!',
        metaphor: {
          emoji: '📸',
          concept: 'The Photo Checkpoint (Commit)',
          explanation: 'A permanent snapshot glued into your timeline with a label describing what you made.'
        },
        command: 'git commit -m "Draw superhero suit"',
        commandExplanation: 'Snaps the photo, empties the backpack, and saves the checkpoint into your album with the label in quotes.',
        interactiveAction: {
          buttonLabel: 'Snap Photo Checkpoint (git commit)',
          buttonIcon: 'Camera',
          actionType: 'git_commit',
          payload: 'Draw superhero suit',
          successMessage: '📸 CLICK! Checkpoint saved! Your photo album now has a brand new permanent memory card.'
        },
        proTip: 'Always write simple, clear messages in your commits so your future self knows what you did!',
        quickQuestion: {
          question: 'What does "git commit -m" do?',
          options: [
            'Takes a permanent photo checkpoint with your description label.',
            'Sends an angry email to your friend.',
            'Turns off your computer screen.'
          ],
          correctIndex: 0,
          celebrationText: 'You nailed it! That is the core heart of Git: add, then commit!'
        }
      }
    ]
  },
  {
    id: 'level-2',
    number: 2,
    title: 'Parallel Realities (Branches)',
    emoji: '🌿',
    summary: 'Create parallel universes to test wild ideas without breaking your main working project!',
    color: 'blue',
    steps: [
      {
        id: '2-1',
        title: 'Why Branches? (The Magic Parallel Universe)',
        tagline: 'Test crazy new ideas with zero risk to your real project.',
        story: 'Imagine your video game hero is standing at a fork in the road. Path A is safe and sound. Path B leads into an experimental cave. In real life, you can only walk one path. But in Git, you can duplicate reality! You create a "Branch" to test a crazy new design. If the design turns out ugly, your main path was never touched!',
        metaphor: {
          emoji: '🚪',
          concept: 'The Multiverse Door (Branch)',
          explanation: 'A separate timeline where you can paint with wild colors without touching your original masterpiece.'
        },
        command: 'git branch feature/laser-eyes',
        commandExplanation: 'Plants a new branch path named "feature/laser-eyes" pointing right where you are standing.',
        interactiveAction: {
          buttonLabel: 'Create New Path (git branch feature/laser-eyes)',
          buttonIcon: 'GitBranch',
          actionType: 'git_branch',
          payload: 'feature/laser-eyes',
          successMessage: '🌿 New path created: "feature/laser-eyes"! It exists in parallel with main.'
        },
        proTip: 'Creating a branch in Git takes less than 1 millisecond because it is just a tiny bookmark pointer!',
        quickQuestion: {
          question: 'Why do developers use branches?',
          options: [
            'To experiment and build new features safely without breaking the working main app.',
            'Because trees look pretty.',
            'To slow down the computer.'
          ],
          correctIndex: 0,
          celebrationText: 'Exactly! Total freedom to experiment without fear!'
        }
      },
      {
        id: '2-2',
        title: 'Stepping Through the Portal (git switch)',
        tagline: 'Teleport your desk into another parallel timeline.',
        story: 'Creating a branch is like opening a door, but you still have to step through it! When you run "git switch", your desk instantly rearranges itself to show the files from that timeline.',
        metaphor: {
          emoji: '🚪',
          concept: 'The Teleport Door (git switch)',
          explanation: 'Instantly swaps the drawings on your desk to match the branch you jumped into.'
        },
        command: 'git switch feature/laser-eyes',
        commandExplanation: 'Switches your active workspace into the "feature/laser-eyes" timeline.',
        interactiveAction: {
          buttonLabel: 'Step into Feature Path (git switch)',
          buttonIcon: 'Repeat',
          actionType: 'git_switch',
          payload: 'feature/laser-eyes',
          successMessage: '🚀 Teleported! You are now standing on "feature/laser-eyes". Any new drawings stay here!'
        },
        proTip: 'You can create AND switch in one step using: git switch -c new-feature (or the classic git checkout -b new-feature).',
        quickQuestion: {
          question: 'What is HEAD in Git?',
          options: [
            'A glowing sticker that says "You are standing right HERE right now".',
            'A special robot that types code for you.',
            'The power button on your monitor.'
          ],
          correctIndex: 0,
          celebrationText: 'Yes! HEAD is simply a badge showing which branch or commit you are viewing!'
        }
      }
    ]
  },
  {
    id: 'level-3',
    number: 3,
    title: 'Joining Forces (Merging)',
    emoji: '🤝',
    summary: 'Bring the cool things you built in your parallel branch back into your main project highway!',
    color: 'purple',
    steps: [
      {
        id: '3-1',
        title: 'Bringing the Fruit Home (git merge)',
        tagline: 'Combine two timelines into one glorious finished version.',
        story: 'You spent 3 hours in your parallel timeline drawing awesome laser eyes for your superhero. Now you want those laser eyes in your main official drawing! You switch back to your main highway and say: "Git, merge my laser-eyes into main!" Git combines the two timelines together like magic.',
        metaphor: {
          emoji: '🌉',
          concept: 'The Bridge of Friendship (Merge)',
          explanation: 'Connecting the experimental side trail back to the main highway so everyone gets the new feature.'
        },
        command: 'git merge feature/laser-eyes',
        commandExplanation: 'Pulls the completed commits from the feature branch into your active branch.',
        interactiveAction: {
          buttonLabel: 'Merge Laser Eyes into Main (git merge)',
          buttonIcon: 'GitMerge',
          actionType: 'git_merge',
          payload: 'feature/laser-eyes',
          successMessage: '🤝 Merged! The laser eyes are now officially part of main. Both paths are united!'
        },
        proTip: 'Always stand on the branch you want to receive the changes (like main) before running git merge!',
        quickQuestion: {
          question: 'Before merging "my-feature" into "main", what must you do first?',
          options: [
            'Switch to "main" first, because you merge INTO the branch you are standing on.',
            'Delete all your files.',
            'Restart your computer 3 times.'
          ],
          correctIndex: 0,
          celebrationText: 'Golden rule of merging: Stand where you want the code to land!'
        }
      }
    ]
  },
  {
    id: 'level-4',
    number: 4,
    title: 'Oops, I Made a Mistake! (Time Travel & Undo)',
    emoji: '⏰',
    summary: 'Never panic again! Learn the magic eraser, the safe undo, and the secret safety net.',
    color: 'amber',
    steps: [
      {
        id: '4-1',
        title: 'The Magic Eraser (git restore)',
        tagline: 'Spilled juice on your desk? Wipe it clean back to your last saved photo.',
        story: 'You scribbled silly red lines all over your drawing by accident. You haven\'t committed it yet. Instead of crying or trying to erase it line by line, you grab the Magic Eraser: "git restore superhero.png"! It instantly wipes away your messy scribbles and restores the pristine drawing from your last photo checkpoint.',
        metaphor: {
          emoji: '🧽',
          concept: 'The Magic Sponge (git restore)',
          explanation: 'Wipes away uncommitted messy scribbles from your desk in 1 second.'
        },
        command: 'git restore .',
        commandExplanation: 'Wipes away all uncommitted modifications on your desk and reverts to your last clean commit.',
        interactiveAction: {
          buttonLabel: 'Use Magic Eraser (git restore .)',
          buttonIcon: 'RotateCcw',
          actionType: 'git_restore',
          payload: '.',
          successMessage: '🧽 Squeaky clean! All messy uncommitted edits were erased. Desk is back to the last safe photo.'
        },
        proTip: 'If you packed a file into your backpack by mistake, "git restore --staged <file>" gently takes it out without deleting your work!',
        quickQuestion: {
          question: 'What does "git restore filename" do?',
          options: [
            'Discards recent unstaged edits and returns the file to its last committed state.',
            'Uploads the file to the dark web.',
            'Changes the font to Comic Sans.'
          ],
          correctIndex: 0,
          celebrationText: 'That is the beauty of Git: mistakes are instantly reversible!'
        }
      },
      {
        id: '4-2',
        title: 'The Holy Grail Safety Net (git reflog)',
        tagline: 'Did you accidentally delete a branch or commit? You can ALWAYS get it back.',
        story: 'Imagine your computer has an invisible 24/7 security camera watching every step you take. Even if you run a "dangerous" command and think your work vanished, "git reflog" lists every single step in order. You just look at the list, find the minute before the mistake, and jump right back!',
        metaphor: {
          emoji: '📼',
          concept: 'The CCTV Security Camera (git reflog)',
          explanation: 'A secret black box recorder that logs every move of HEAD, so nothing is ever truly lost.'
        },
        command: 'git reflog',
        commandExplanation: 'Shows the history of everywhere your camera has been, even deleted branches!',
        interactiveAction: {
          buttonLabel: 'Check Security Tape (git reflog)',
          buttonIcon: 'Eye',
          actionType: 'git_commit',
          payload: 'Reviewing reflog history',
          successMessage: '📼 Security footage checked! Every commit and step is safely recorded.'
        },
        proTip: 'Whenever a colleague says "Help, I destroyed my Git repo!", type "git reflog". You will look like a wizard when you recover their code in 10 seconds.',
        quickQuestion: {
          question: 'Is a commit really gone forever if you delete a branch?',
          options: [
            'No! It remains safely in Git\'s reflog memory and can be revived easily.',
            'Yes, it is erased into pure space dust immediately.',
            'Only if your laptop is unplugged.'
          ],
          correctIndex: 0,
          celebrationText: 'Git virtually never destroys your data unless you try very hard!'
        }
      }
    ]
  },
  {
    id: 'level-5',
    number: 5,
    title: 'The Secret Pocket (Stashing)',
    emoji: '🎒',
    summary: 'Tuck half-finished work into a secret drawer when someone interrupts you!',
    color: 'teal',
    steps: [
      {
        id: '5-1',
        title: 'Dinner is Ready! (git stash)',
        tagline: 'Quickly hide your messy toys so your desk looks clean.',
        story: 'You are right in the middle of painting a complex cape on your hero. Suddenly, Mom calls: "Emergency! Fix this other thing right now!" You don\'t want to commit a half-painted cape with messy colors. "git stash" sweeps the messy half-finished cape into a secret drawer. Your desk is 100% clean! When you are ready, "git stash pop" pulls it right back onto your desk.',
        metaphor: {
          emoji: '🗄️',
          concept: 'The Secret Under-Desk Drawer (Stash)',
          explanation: 'Temporarily holds messy half-done work without needing a permanent photo commit.'
        },
        command: 'git stash',
        commandExplanation: 'Saves your dirty working edits into a temporary drawer and resets your desk to clean.',
        interactiveAction: {
          buttonLabel: 'Tuck into Secret Drawer (git stash)',
          buttonIcon: 'Archive',
          actionType: 'git_stash',
          payload: 'Temporary cape draft',
          successMessage: '🗄️ Tucked away! Desk is sparkling clean. Run "git stash pop" whenever you want it back.'
        },
        proTip: 'When you want your work back out of the drawer, simply type "git stash pop"!',
        quickQuestion: {
          question: 'When should you use "git stash"?',
          options: [
            'When you have unfinished work and need to switch branches quickly without committing messy code.',
            'Only on Fridays.',
            'To turn off your Wi-Fi.'
          ],
          correctIndex: 0,
          celebrationText: 'Super handy tool every developer uses daily!'
        }
      }
    ]
  },
  {
    id: 'level-6',
    number: 6,
    title: 'The Cloud Castle (GitHub & Collaboration)',
    emoji: '☁️',
    summary: 'Share your photo albums with friends across the world using GitHub!',
    color: 'cyan',
    steps: [
      {
        id: '6-1',
        title: 'Sending to the Cloud (git push)',
        tagline: 'Upload your photo album so your friends can see it.',
        story: 'Your photo album is currently sitting on your bedroom shelf. If your computer gets dropped in a swimming pool, that would be sad! "git push" launches a satellite rocket carrying your photo album up into GitHub\'s Cloud Castle. Now, your photos are backed up safely forever, and your friends can see your progress!',
        metaphor: {
          emoji: '🚀',
          concept: 'The Rocket Launcher (git push)',
          explanation: 'Sends your local commits up into the cloud on GitHub so teammates can see them.'
        },
        command: 'git push -u origin main',
        commandExplanation: 'Uploads your local commits to the remote "origin" repository on the "main" branch.',
        interactiveAction: {
          buttonLabel: 'Launch Rocket to Cloud (git push)',
          buttonIcon: 'UploadCloud',
          actionType: 'git_push',
          payload: 'origin main',
          successMessage: '🚀 WHOOSH! Your commits are now live on GitHub in the Cloud Castle!'
        },
        proTip: 'After running "git push -u origin main" the first time, you only need to type "git push" for all future updates!',
        quickQuestion: {
          question: 'What is GitHub compared to Git?',
          options: [
            'Git is the camera engine on your computer; GitHub is the cloud website that hosts your albums.',
            'They are two different brand names for Microsoft Word.',
            'GitHub is only for music videos.'
          ],
          correctIndex: 0,
          celebrationText: 'You got it! Git = local tool, GitHub = online home!'
        }
      }
    ]
  },
  {
    id: 'level-7',
    number: 7,
    title: 'Resolving Disagreements (Merge Conflicts)',
    emoji: '🧩',
    summary: 'Two people colored the same spot differently. Learn how to solve it in 5 seconds!',
    color: 'rose',
    steps: [
      {
        id: '7-1',
        title: 'Two Painters, One Canvas',
        tagline: 'Why conflicts happen and how Git politely asks you to choose.',
        story: 'Imagine you and your friend are both coloring a superhero. You colored the cape Bright Blue. At the same time on their computer, your friend colored the cape Crimson Red. When you merge, Git says: "Whoa! I don\'t know whose favorite color is right! You choose: Blue, Red, or Both?" That\'s all a merge conflict is: a polite question from Git asking you to pick!',
        metaphor: {
          emoji: '🎨',
          concept: 'The Polite Arbiter (Merge Conflict)',
          explanation: 'Git pauses when two people edit the exact same sentence, so you can pick the winning version.'
        },
        command: 'git status',
        commandExplanation: 'Shows you which file has a question waiting for you.',
        interactiveAction: {
          buttonLabel: 'Open Conflict Resolver Tool',
          buttonIcon: 'ShieldAlert',
          actionType: 'git_merge',
          payload: 'conflict_demo',
          successMessage: '🧩 Conflict identified! Jump into the Conflict Lab to click "Accept Blue" or "Accept Red"!'
        },
        proTip: 'If you ever panic during a conflict, type "git merge --abort". It instantly resets everything back to how it was before the merge!',
        quickQuestion: {
          question: 'What should you do if a merge conflict feels overwhelming?',
          options: [
            'Type "git merge --abort" to safely cancel the merge and return to peace.',
            'Throw your computer out the window.',
            'Delete the whole operating system.'
          ],
          correctIndex: 0,
          celebrationText: 'The emergency abort button is your best friend!'
        }
      }
    ]
  },
  {
    id: 'level-8',
    number: 8,
    title: 'The Movie Director (Rebase & Cherry-Pick)',
    emoji: '🎬',
    summary: 'Cut out bloopers, squash messy retakes, and pluck single ripe apples!',
    color: 'indigo',
    steps: [
      {
        id: '8-1',
        title: 'Trimming Bloopers (Interactive Rebase)',
        tagline: 'Turn 10 messy "oops" commits into 1 spotless professional masterpiece.',
        story: 'When filming a movie, actors make 20 silly mistakes. The director doesn\'t show all 20 bloopers in the movie theater! They edit them out and publish one polished movie. With "git rebase -i", you can squash 5 messy commits ("fixed typo", "oops typo again", "really fixed now") into one single proud commit: "Add superhero cape"!',
        metaphor: {
          emoji: '✂️',
          concept: 'The Director\'s Cutting Room (Rebase -i)',
          explanation: 'Melts multiple clumsy draft checkpoints into one beautiful, clean commit.'
        },
        command: 'git rebase -i HEAD~3',
        commandExplanation: 'Opens the editor to squash or rename the last 3 commits.',
        interactiveAction: {
          buttonLabel: 'Squash Bloopers into 1 Clean Commit',
          buttonIcon: 'Sliders',
          actionType: 'git_commit',
          payload: 'Add superhero cape (Cleaned up)',
          successMessage: '🎬 Polished! 3 messy draft commits were melted into 1 clean masterpiece.'
        },
        proTip: '"fixup" is a magic rebase trick: it melts a commit into the one above it and throws away the silly commit message automatically!',
        quickQuestion: {
          question: 'What does "squashing" commits mean?',
          options: [
            'Combining multiple small commits into a single clean commit.',
            'Compressing files into a ZIP folder.',
            'Deleting all your code.'
          ],
          correctIndex: 0,
          celebrationText: 'Senior engineers do this before sending code for review!'
        }
      },
      {
        id: '8-2',
        title: 'Plucking One Apple (git cherry-pick)',
        tagline: 'Grab a single good fix from another branch without taking the whole tree.',
        story: 'Your friend has an orchard with 50 trees. 49 trees have sour apples, but one tree has a single, delicious ripe red apple. You don\'t want to chop down the whole orchard! You just reach in, pluck that one apple, and put it in your basket. That is "git cherry-pick"!',
        metaphor: {
          emoji: '🍒',
          concept: 'Plucking the Golden Apple (Cherry-Pick)',
          explanation: 'Copies just one specific commit from another branch into your current branch.'
        },
        command: 'git cherry-pick <commit-hash>',
        commandExplanation: 'Applies only that one single commit onto your current branch.',
        interactiveAction: {
          buttonLabel: 'Pluck the Bugfix (git cherry-pick)',
          buttonIcon: 'Sparkles',
          actionType: 'git_commit',
          payload: 'Cherry-picked security bugfix',
          successMessage: '🍒 Plucked! The bugfix was applied cleanly onto your branch without any extra clutter.'
        },
        proTip: 'Cherry-picking is ideal when someone fixed a critical bug on an unfinished branch and you need that fix right now!',
        quickQuestion: {
          question: 'When should you use git cherry-pick?',
          options: [
            'When you want just one specific commit from another branch instead of merging everything.',
            'When you are hungry for fruit.',
            'To format your hard drive.'
          ],
          correctIndex: 0,
          celebrationText: 'Spot on! Pluck only what you need!'
        }
      }
    ]
  },
  {
    id: 'level-9',
    number: 9,
    title: 'The Detective (Blame, Bisect & Tags)',
    emoji: '🔍',
    summary: 'Hunt down mystery bugs with binary search and stamp official release medals!',
    color: 'teal',
    steps: [
      {
        id: '9-1',
        title: 'Who Changed This Line? (git blame)',
        tagline: 'See who wrote every sentence and why.',
        story: 'You open a drawing and notice someone painted a mustache on your superhero! You don\'t have to guess who did it. "git blame" looks at every single pixel and stamps the author\'s name, date, and commit message right next to it.',
        metaphor: {
          emoji: '🕵️',
          concept: 'The Signature Stamp (git blame)',
          explanation: 'Shows who authored and last touched every single line of code in a file.'
        },
        command: 'git blame superhero.png',
        commandExplanation: 'Displays author initials and timestamp beside each line.',
        interactiveAction: {
          buttonLabel: 'Investigate File (git blame)',
          buttonIcon: 'Search',
          actionType: 'git_commit',
          payload: 'Inspecting blame audit',
          successMessage: '🔍 Detective report: Line 14 was drawn by Alex 2 hours ago with message "Add mustache".'
        },
        proTip: 'In VS Code, install the "GitLens" extension to see who wrote each line right inline in your editor as you code!',
        quickQuestion: {
          question: 'Is "git blame" meant for punishing people?',
          options: [
            'No! It is for understanding context, finding who to ask questions to, and knowing why a line was written.',
            'Yes, to send people to jail.',
            'It is only used on birthdays.'
          ],
          correctIndex: 0,
          celebrationText: 'Exactly! It is a tool for context and collaboration, not blame!'
        }
      },
      {
        id: '9-2',
        title: 'Golden Medals for Releases (git tag)',
        tagline: 'Stamp version 1.0 on a special moment in time.',
        story: 'Branches are bookmarks that keep moving forward as you read new pages. But a Tag is a golden wax seal glued to one specific page forever. When your game is officially finished and ready for the world, you stamp a medal: "v1.0.0"!',
        metaphor: {
          emoji: '🎖️',
          concept: 'The Golden Wax Seal (git tag)',
          explanation: 'An unmovable milestone marker marking an official release (like v1.0.0 or v2.0.0).'
        },
        command: 'git tag -a v1.0.0 -m "Official Release 1.0"',
        commandExplanation: 'Creates a permanent release medal pointing to this exact moment.',
        interactiveAction: {
          buttonLabel: 'Stamp Golden Release Medal (git tag)',
          buttonIcon: 'Award',
          actionType: 'git_commit',
          payload: 'Tagged v1.0.0 release',
          successMessage: '🎖️ STAMPED! Version v1.0.0 is officially sealed in history. It will never move!'
        },
        proTip: 'Remember: git push does not push tags by default! Always run: git push origin --tags to send medals to GitHub.',
        quickQuestion: {
          question: 'What is the difference between a Branch and a Tag?',
          options: [
            'A branch moves forward as you make new commits; a tag stays glued to one specific commit forever.',
            'A tag is for dogs, a branch is for trees.',
            'There is no difference.'
          ],
          correctIndex: 0,
          celebrationText: 'Perfect! Tags are frozen milestones in time!'
        }
      }
    ]
  },
  {
    id: 'level-10',
    number: 10,
    title: 'Git Superhero Superpowers (Worktrees & Internals)',
    emoji: '⚡',
    summary: 'Master multiple desks at once with worktrees and peek inside the engine!',
    color: 'amber',
    steps: [
      {
        id: '10-1',
        title: 'Two Desks in One Office (git worktree)',
        tagline: 'Work on two branches at the exact same second without switching or stashing!',
        story: 'Normally, when you switch branches, all your papers on your desk get packed away. But what if you have a massive dual-desk setup? Desk 1 is running a heavy 30-minute test. Desk 2 is where you fix an urgent bug. Both desks share the exact same filing cabinet! That is "git worktree".',
        metaphor: {
          emoji: '🪑',
          concept: 'The Second Desk (git worktree)',
          explanation: 'Opens a second folder on another branch linked to the same Git repository.'
        },
        command: 'git worktree add ../hotfix main',
        commandExplanation: 'Creates a second working directory on disk pointing to the main branch.',
        interactiveAction: {
          buttonLabel: 'Set Up Second Desk (git worktree add)',
          buttonIcon: 'Laptop',
          actionType: 'git_commit',
          payload: 'Added linked worktree',
          successMessage: '⚡ Superpower unlocked! A second desk is now open in ../hotfix. You can code on both simultaneously!'
        },
        proTip: 'Pro developers use worktrees when doing long npm builds on one branch while continuing to code on another.',
        quickQuestion: {
          question: 'What is the superpower of "git worktree"?',
          options: [
            'You can check out multiple branches at the same time in separate folders without stashing.',
            'It makes your computer run at the speed of light.',
            'It automatically writes all your homework.'
          ],
          correctIndex: 0,
          celebrationText: 'You have reached the elite top 5% of Git knowledge worldwide!'
        }
      }
    ]
  }
];

