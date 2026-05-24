import { Flame, Star, TrendingUp, History, Search, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { MOCK_VOCABULARY } from '../constants';
import { cn } from '../lib/utils';
import React from 'react';

export default function DashboardView({ onStartReview }: { onStartReview: () => void }) {
  const recentMastery = MOCK_VOCABULARY.slice(0, 3);
  
  // Simulated heatmap data
  const heatmapData = Array.from({ length: 56 }, (_, i) => ({
    active: Math.random() > 0.4,
    level: Math.floor(Math.random() * 4)
  }));

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="font-label-caps text-xs font-bold uppercase tracking-widest text-secondary mb-1">Ahlan wa Sahlan, Professor</p>
          <h2 className="font-headline text-3xl font-bold text-primary">Your Learning Progress</h2>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors">
            <Search className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Streak Hero */}
        <section className="col-span-12 lg:col-span-8 relative overflow-hidden rounded-2xl bg-white border border-outline-variant p-10 flex flex-col md:flex-row items-center justify-between shadow-[0_4px_24px_rgba(15,76,92,0.04)]">
          <div className="z-10 relative space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-secondary-container/10 flex items-center justify-center text-secondary-container">
                <Flame className="h-8 w-8 fill-current" />
              </div>
              <h3 className="font-headline text-2xl font-bold text-primary">15 Day Streak!</h3>
            </div>
            <p className="max-w-md font-sans text-on-surface-variant leading-relaxed">
              You're in the top <span className="font-bold text-primary">5% of scholars</span> this week. Consistent study sessions are the foundation of Arabic mastery. Keep the momentum going!
            </p>
            <button 
              onClick={onStartReview}
              className="bg-secondary-container text-on-secondary px-8 py-3 rounded-xl font-bold shadow-lg shadow-secondary-container/25 transition-all hover:scale-105 active:scale-95"
            >
              Start Daily Review
            </button>
          </div>

          <div className="hidden lg:block absolute -right-4 -bottom-10 opacity-[0.05] pointer-events-none select-none">
            <span className="font-display-ar text-[260px] text-primary">العربية</span>
          </div>
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        </section>

        {/* Stats Column */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
          <StatCard 
            icon={<BookOpen className="h-5 w-5 text-primary" />} 
            label="Words to Review" 
            value="42" 
          />
          <StatCard 
            icon={<TrendingUp className="h-5 w-5 text-primary" />} 
            label="Accuracy Rate" 
            value="94%" 
          />
          <StatCard 
            icon={<Star className="h-5 w-5 text-tertiary-fixed-dim fill-current" />} 
            label="Achievements" 
            value="12" 
          />
        </div>

        {/* Heatmap Section */}
        <section className="col-span-12 bg-white border border-outline-variant rounded-2xl p-8 shadow-[0_4px_24px_rgba(15,76,92,0.04)]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-headline text-lg font-bold text-primary">Study Consistency</h3>
            <div className="flex items-center gap-3">
              <span className="font-label-caps text-[10px] text-on-surface-variant">Less</span>
              <div className="flex gap-1.5">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className={cn("w-3 h-3 rounded-sm", heatmapColors[i])} />
                ))}
              </div>
              <span className="font-label-caps text-[10px] text-on-surface-variant">More</span>
            </div>
          </div>
          
          <div className="grid grid-cols-7 sm:grid-cols-14 md:grid-cols-28 gap-2 pb-2">
            {heatmapData.map((d, i) => (
              <div 
                key={i} 
                className={cn(
                  "aspect-square w-full rounded-sm transition-colors cursor-help",
                  d.active ? heatmapColors[d.level] : "bg-surface-container"
                )}
                title={`Activity Level: ${d.active ? d.level + 1 : 0}`}
              />
            ))}
          </div>
          <div className="mt-4 flex justify-between text-[10px] font-label-caps text-on-surface-variant/60 uppercase tracking-widest">
            <span>Last 8 Weeks</span>
            <span>Today</span>
          </div>
        </section>

        {/* Recent Mastery Table */}
        <section className="col-span-12 bg-white border border-outline-variant rounded-2xl shadow-[0_4px_24px_rgba(15,76,92,0.04)] overflow-hidden">
          <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low/30">
            <h3 className="font-headline text-lg font-bold text-primary flex items-center gap-2">
              <History className="h-5 w-5" />
              Recent Mastery
            </h3>
            <button className="text-xs font-bold text-primary hover:underline font-label-caps tracking-wider">VIEW ALL LIBRARY</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-low font-label-caps text-[10px] text-primary uppercase tracking-widest">
                  <th className="px-6 py-4">Arabic Word</th>
                  <th className="px-6 py-4">Meaning</th>
                  <th className="px-6 py-4 text-right">Mastery</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {recentMastery.map((word) => (
                  <tr key={word.id} className="hover:bg-surface-container-low transition-colors group">
                    <td className="px-6 py-4 font-display-ar text-2xl text-primary text-right" dir="rtl">
                      {word.arabic}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-on-surface">{word.meaning}</div>
                      <div className="text-xs text-on-surface-variant italic opacity-60">‘{word.transliteration}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3">
                        <div className="w-24 h-1.5 bg-surface-container rounded-full overflow-hidden hidden sm:block">
                          <div 
                            className="h-full bg-tertiary-fixed-dim rounded-full transition-all duration-500" 
                            style={{ width: `${word.masteryPercent}%` }} 
                          />
                        </div>
                        <span className="text-sm font-bold text-primary">{word.masteryPercent}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Highlight Banner */}
        <section className="col-span-12 relative overflow-hidden rounded-3xl bg-primary p-12 text-on-primary">
          <div className="relative z-10 max-w-2xl space-y-6">
            <h3 className="font-headline text-3xl font-bold leading-tight">You're in the top 5% of learners this month.</h3>
            <p className="text-lg opacity-80 leading-relaxed">
              Your focus on <span className="font-bold text-on-tertiary-container">'Irregular Roots'</span> has significantly improved your overall reading comprehension score. Consider starting a deep dive into Classical Poetry next.
            </p>
            <button className="bg-on-tertiary-container text-tertiary px-8 py-3 rounded-xl font-bold transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-black/10">
              Explore Recommendations
            </button>
          </div>
          
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none overflow-hidden">
             <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display-ar text-[400px] leading-none mb-20 translate-x-20">العربية</span>
             </div>
          </div>
          
          <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-primary-container/20 blur-[100px]" />
        </section>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="bg-white border border-outline-variant rounded-xl p-6 flex items-center justify-between shadow-[0_2px_12px_rgba(15,76,92,0.02)] transition-all hover:shadow-lg hover:-translate-y-1 group">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-lg bg-surface-container flex items-center justify-center transition-colors group-hover:bg-primary-container">
          {icon}
        </div>
        <div>
          <p className="font-label-caps text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{label}</p>
          <p className="text-2xl font-bold text-primary leading-tight">{value}</p>
        </div>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <TrendingUp className="h-4 w-4 text-on-surface-variant/50" />
      </div>
    </div>
  );
}

const heatmapColors = [
  "bg-primary/20",
  "bg-primary/50",
  "bg-primary/80",
  "bg-primary"
];
