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
  Tag as TagIcon,
  BookOpen
} from 'lucide-react';

interface CheatSheetModalProps {
  onClose: () => void;
  onRunInSimulator: (command: string) => void;
}

export const CheatSheetModal: React.FC<CheatSheetModalProps> = ({
  onClose,
  onRunInSimulator
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const categories = ['All', 'Essentials', 'Branching', 'Undoing', 'Remotes', 'Advanced', 'Emergency'];

  const filteredDocs = COMMAND_DICTIONARY.filter(doc => {
    const matchesSearch = 
      doc.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.simpleExplanation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.analogy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCat = categoryFilter === 'All' || doc.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleCopy = (syntax: string) => {
    navigator.clipboard.writeText(syntax);
    setCopiedCmd(syntax);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 lg:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header with Search */}
        <div className="p-4 lg:p-5 border-b border-slate-800 space-y-3 bg-slate-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-orange-500/20 text-orange-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-slate-100">
                  Git Command Reference Dictionary & Cheat Sheet
                </h2>
                <p className="text-xs text-slate-400">
                  Every essential Git command explained in plain English with everyday analogies
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800 text-xs font-semibold"
            >
              ✕ Esc
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by keyword, command, or concept (e.g. rebase, discard, conflict, undo)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
              autoFocus
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1 rounded-lg font-medium transition-all whitespace-nowrap ${
                  categoryFilter === cat
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Command Cards List */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-3 custom-scrollbar">
          {filteredDocs.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              No Git commands found matching "{searchTerm}". Try another search keyword.
            </div>
          ) : (
            filteredDocs.map((doc) => (
              <div 
                key={doc.command}
                className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2.5 hover:border-slate-700 transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-orange-400">
                      {doc.command}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-mono">
                      {doc.category}
                    </span>
                    {doc.danger === 'destructive' && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] uppercase font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3" /> Destructive
                      </span>
                    )}
                    {doc.danger === 'caution' && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] uppercase font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Caution
                      </span>
                    )}
                    {doc.danger === 'safe' && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] uppercase font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Safe
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy(doc.syntax)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="Copy syntax"
                    >
                      {copiedCmd === doc.syntax ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => {
                        onRunInSimulator(doc.example);
                        onClose();
                      }}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-600/20 hover:bg-orange-600/30 text-orange-300 border border-orange-500/40 text-xs font-semibold transition-colors"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Run Example</span>
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  {doc.simpleExplanation}
                </p>

                {/* Plain English Metaphor */}
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 text-xs text-amber-300/90 leading-relaxed">
                  <span className="font-bold text-amber-400 mr-1">🧸 Real-World Analogy:</span>
                  {doc.analogy}
                </div>

                {/* Syntax & Example */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="p-2 rounded bg-slate-900/60 border border-slate-800 text-slate-300">
                    <span className="text-slate-500 block text-[10px] uppercase font-sans">Syntax:</span>
                    {doc.syntax}
                  </div>
                  <div className="p-2 rounded bg-slate-900/60 border border-slate-800 text-slate-300">
                    <span className="text-slate-500 block text-[10px] uppercase font-sans">Example:</span>
                    <span className="text-orange-300">{doc.example}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

