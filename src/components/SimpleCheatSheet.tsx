import React, { useState } from 'react';
import { COMMAND_DICTIONARY, CommandDoc } from '../data/commandDictionary';
import { 
  Search, 
  Copy, 
  Check, 
  Play, 
  HelpCircle, 
  ShieldAlert, 
  AlertTriangle, 
  ShieldCheck, 
  BookOpen,
  Sparkles
} from 'lucide-react';

interface SimpleCheatSheetProps {
  onRunInSimulator: (command: string) => void;
}

export const SimpleCheatSheet: React.FC<SimpleCheatSheetProps> = ({
  onRunInSimulator
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [copiedSyntax, setCopiedSyntax] = useState<string | null>(null);

  const categories = ['All', 'Essentials', 'Branching', 'Undoing', 'Remotes', 'Advanced', 'Emergency'];

  const filteredCommands = COMMAND_DICTIONARY.filter(doc => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      doc.command.toLowerCase().includes(term) ||
      doc.simpleExplanation.toLowerCase().includes(term) ||
      doc.analogy.toLowerCase().includes(term) ||
      doc.tags.some(t => t.toLowerCase().includes(term));
    const matchesCat = activeCategory === 'All' || doc.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const handleCopy = (syntax: string) => {
    navigator.clipboard.writeText(syntax);
    setCopiedSyntax(syntax);
    setTimeout(() => setCopiedSyntax(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-950/40 via-slate-900 to-slate-950 rounded-3xl border border-orange-500/30 p-6 lg:p-8 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-2xl shadow-lg">
            📖
          </div>
          <div>
            <h1 className="text-xl lg:text-2xl font-black text-slate-100">
              The Plain English Git Dictionary
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Every Git command translated into crystal clear language a 5-year-old can understand.
            </p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by what you want to do (e.g. undo, save, upload, branch, conflict)..."
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors shadow-inner"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30 scale-105'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Command Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCommands.length === 0 ? (
          <div className="col-span-full text-center py-12 text-slate-500 text-xs">
            No commands match "{searchTerm}". Try searching for words like "save", "branch", or "undo".
          </div>
        ) : (
          filteredCommands.map((doc) => (
            <div
              key={doc.command}
              className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-3.5 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                {/* Header: Command & Danger Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-bold text-orange-400 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-800">
                      {doc.command}
                    </span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {doc.category}
                    </span>
                  </div>

                  <div>
                    {doc.danger === 'destructive' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3" /> Danger
                      </span>
                    )}
                    {doc.danger === 'caution' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Caution
                      </span>
                    )}
                    {doc.danger === 'safe' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Safe
                      </span>
                    )}
                  </div>
                </div>

                {/* Plain English Explanation */}
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans font-medium">
                  {doc.simpleExplanation}
                </p>

                {/* Real-world Metaphor */}
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-amber-900/30 text-xs text-amber-200/90 leading-snug">
                  <span className="font-bold text-amber-300 mr-1">🧸 Real-World Story:</span>
                  {doc.analogy}
                </div>
              </div>

              {/* Action & Syntax Bar */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <code className="text-xs font-mono text-slate-400 truncate">
                    {doc.syntax}
                  </code>
                  <button
                    onClick={() => handleCopy(doc.syntax)}
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors flex-shrink-0"
                    title="Copy command"
                  >
                    {copiedSyntax === doc.syntax ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>

                <button
                  onClick={() => onRunInSimulator(doc.example)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-orange-600/20 hover:bg-orange-600/30 text-orange-300 border border-orange-500/40 text-xs font-bold transition-all whitespace-nowrap hover:scale-105"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Try It</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

