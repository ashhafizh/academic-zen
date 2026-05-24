import { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Edit2, Trash2, CheckCircle2, BookOpen, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import { MOCK_VOCABULARY } from '../constants';
import { cn } from '../lib/utils';
import { VocabularyWord } from '../types';

export default function LibraryView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Noun', 'Verb', 'Adjective', 'Academic', 'Scholarly'];

  const filteredVocab = MOCK_VOCABULARY.filter(word => {
    const matchesSearch = word.meaning.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         word.arabic.includes(searchTerm) ||
                         word.transliteration.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || word.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header & Search */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="font-headline text-3xl font-bold text-primary">Vocabulary Library</h2>
          <p className="font-sans text-on-surface-variant text-sm mt-1">Manage and organize your curated Arabic lexicon.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-grow md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-outline" />
            <input 
              type="text"
              placeholder="Search vocabulary..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-outline-variant rounded-xl pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-shadow placeholder:text-outline-variant"
            />
          </div>
          <button className="bg-primary text-on-primary p-3 rounded-xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-transform">
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-5 py-2 rounded-full text-xs font-label-caps uppercase tracking-wider transition-all whitespace-nowrap",
              activeCategory === cat 
                ? "bg-primary text-on-primary font-bold shadow-md"
                : "bg-white border border-outline-variant text-on-surface-variant hover:bg-surface-container"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-outline-variant shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant font-label-caps text-[11px] text-primary uppercase tracking-widest">
                <th className="px-6 py-5">Meaning & Transliteration</th>
                <th className="px-6 py-5 text-center">Arabic Script</th>
                <th className="px-6 py-5 text-center">Category</th>
                <th className="px-6 py-5 text-center">Status</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {filteredVocab.map((word) => (
                <tr key={word.id} className="hover:bg-surface-container-low transition-colors group">
                  <td className="px-6 py-5">
                    <div className="font-bold text-on-surface">{word.meaning}</div>
                    <div className="text-xs text-on-surface-variant italic opacity-60 underline underline-offset-2 decoration-outline-variant/30">‘{word.transliteration}</div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="font-display-ar text-3xl text-primary" dir="rtl">{word.arabic}</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                      {word.category === 'Verb' ? <BookOpen className="h-3 w-3" /> : <GraduationCap className="h-3 w-3" />}
                      {word.category}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <StatusBadge status={word.status} />
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 text-outline group-hover:text-primary transition-colors">
                      <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 hover:bg-error/10 hover:text-error rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredVocab.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-surface-container-low/20">
            <Search className="h-12 w-12 text-outline-variant mb-4 animate-pulse" />
            <p className="font-headline text-lg font-bold text-on-surface-variant">No lexicon matches found</p>
            <p className="text-sm text-outline">Try adjusting your search or filters</p>
          </div>
        )}

        <div className="bg-surface-container-low px-6 py-4 flex justify-between items-center border-t border-outline-variant">
          <span className="text-[10px] font-label-caps text-outline uppercase tracking-[0.15em]">Showing {filteredVocab.length} of {MOCK_VOCABULARY.length} Entries</span>
          <div className="flex gap-2">
             <button className="px-4 py-2 bg-white border border-outline-variant rounded-lg text-xs font-bold text-primary shadow-sm hover:surface-container transition-all">Previous</button>
             <button className="px-4 py-2 bg-primary text-on-primary rounded-lg text-xs font-bold shadow-md">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: VocabularyWord['status'] }) {
  const styles = {
    Mastered: "bg-tertiary-fixed text-on-tertiary-fixed",
    Learning: "bg-primary-fixed text-on-primary-fixed-variant",
    New: "bg-secondary-fixed text-on-secondary-fixed-variant"
  };

  return (
    <span className={cn(
      "inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
      styles[status]
    )}>
      {status}
    </span>
  );
}
