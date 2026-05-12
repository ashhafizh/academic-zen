import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Award, Lock, Milestone, Trophy, ArrowUpRight, Calendar, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { MOCK_ACHIEVEMENTS } from '../constants';
import { cn } from '../lib/utils';

const PROGRESS_DATA = [
  { name: 'Week 1', vocab: 20, grammar: 15 },
  { name: 'Week 2', vocab: 25, grammar: 18 },
  { name: 'Week 3', vocab: 45, grammar: 22 },
  { name: 'Week 4', vocab: 55, grammar: 35 },
  { name: 'Week 5', vocab: 62, grammar: 45 },
  { name: 'Week 6', vocab: 75, grammar: 50 },
];

const INTENSITY_DATA = [
  { name: 'Mon', value: 40 },
  { name: 'Tue', value: 65 },
  { name: 'Wed', value: 95 },
  { name: 'Thu', value: 30 },
  { name: 'Fri', value: 50 },
  { name: 'Sat', value: 80 },
  { name: 'Sun', value: 85 },
];

export default function AnalyticsView() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-headline text-3xl font-bold text-primary">Performance Analytics</h2>
          <p className="font-sans text-on-surface-variant text-sm mt-1">Deep insights into your linguistic development and scholarly habits.</p>
        </div>
        <div className="flex items-center gap-3 bg-surface-container-low px-4 py-2 rounded-xl border border-outline-variant/30">
          <Calendar className="h-4 w-4 text-primary" />
          <span className="font-label-caps text-xs font-bold text-primary uppercase tracking-widest">October 2023</span>
        </div>
      </header>

      {/* Main Charts Bento */}
      <div className="grid grid-cols-12 gap-6">
        {/* Line Chart: Mastery Progress */}
        <section className="col-span-12 lg:col-span-8 bg-white border border-outline-variant rounded-2xl p-8 shadow-[0_4px_24px_rgba(15,76,92,0.04)]">
          <div className="flex items-center justify-between mb-10">
            <h3 className="font-headline text-xl font-bold text-primary">Mastery Level Progress</h3>
            <div className="flex gap-4">
               <div className="flex items-center gap-2">
                 <div className="h-2 w-2 rounded-full bg-primary" />
                 <span className="font-label-caps text-[10px] text-outline uppercase tracking-wider">Vocabulary</span>
               </div>
               <div className="flex items-center gap-2 opacity-40">
                 <div className="h-2 w-2 rounded-full bg-primary-container" />
                 <span className="font-label-caps text-[10px] text-outline uppercase tracking-wider">Grammar</span>
               </div>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PROGRESS_DATA}>
                <defs>
                  <linearGradient id="colorVocab" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#003441" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#003441" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#94a3b8', fontFamily: 'Lexend' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#94a3b8', fontFamily: 'Lexend' }}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', fontStyle: 'normal' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="vocab" 
                  stroke="#003441" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorVocab)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-8 text-sm italic text-on-surface-variant font-sans flex items-center gap-2 leading-relaxed">
            <ArrowUpRight className="h-4 w-4 text-primary" />
            Study note: You've shown exceptional retention in <span className="font-bold text-primary">verbs of the 10th form</span> this month.
          </p>
        </section>

        {/* Bar Chart: Intensity */}
        <section className="col-span-12 lg:col-span-4 bg-white border border-outline-variant rounded-2xl p-8 shadow-[0_4px_24px_rgba(15,76,92,0.04)]">
          <h3 className="font-headline text-xl font-bold text-primary mb-10">Study Intensity</h3>
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={INTENSITY_DATA}>
                <XAxis 
                   dataKey="name" 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fontSize: 9, fill: '#94a3b8', fontFamily: 'Lexend' }}
                   dy={10}
                />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                <Bar 
                  dataKey="value" 
                  fill="#003441" 
                  radius={[4, 4, 0, 0]} 
                  animationDuration={2000}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-12 pt-8 border-t border-outline-variant/30 flex justify-between items-center">
             <div>
                <p className="font-label-caps text-[10px] text-outline uppercase tracking-[0.2em] mb-1">Daily Avg</p>
                <p className="text-3xl font-bold text-primary">42m</p>
             </div>
             <div className="h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                <TrendingUp className="h-5 w-5" />
             </div>
          </div>
        </section>

        {/* Milestones Grid */}
        <section className="col-span-12 bg-white border border-outline-variant rounded-2xl p-10 shadow-[0_4px_24px_rgba(15,76,92,0.04)]">
           <h3 className="font-headline text-2xl font-bold text-primary mb-10">Scholarly Milestones</h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {MOCK_ACHIEVEMENTS.map((ach) => (
                <div 
                  key={ach.id}
                  className={cn(
                    "flex flex-col items-center text-center p-6 rounded-2xl border border-outline-variant transition-all hover:shadow-lg group",
                    ach.status === 'locked' && "opacity-50 grayscale"
                  )}
                >
                  <div className={cn(
                    "h-16 w-16 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300",
                    ach.color
                  )}>
                    {ach.status === 'locked' ? (
                       <Lock className="h-8 w-8 text-outline" />
                    ) : (
                       <Award className="h-8 w-8 text-on-tertiary-fixed" />
                    )}
                  </div>
                  <h4 className="font-label-caps text-xs font-bold text-primary uppercase tracking-widest mb-1">{ach.title}</h4>
                  <p className="text-[10px] text-on-surface-variant leading-relaxed">{ach.description}</p>
                  
                  {ach.status === 'in-progress' && (
                    <div className="w-full mt-6 space-y-2">
                       <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${ach.progress}%` }} />
                       </div>
                       <span className="text-[9px] font-bold text-primary uppercase tracking-widest">{ach.progress}/100 Roots</span>
                    </div>
                  )}
                </div>
              ))}
           </div>
        </section>
      </div>
    </div>
  );
}
