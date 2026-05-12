/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  LayoutDashboard, 
  Library, 
  LineChart, 
  BookOpen, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Zap,
  GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { ViewType } from './types';

// Views
import DashboardView from './components/DashboardView';
import LibraryView from './components/LibraryView';
import AnalyticsView from './components/AnalyticsView';
import StudyView from './components/StudyView';

export default function App() {
  const [activeView, setActiveView] = useState<ViewType>('Dashboard');

  const navItems = [
    { id: 'Dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'Study', icon: BookOpen, label: 'Study Session' },
    { id: 'Library', icon: Library, label: 'Library' },
    { id: 'Analytics', icon: LineChart, label: 'Analytics' },
  ];

  return (
    <div className="flex min-h-screen bg-surface selection:bg-primary/20">
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-full w-64 flex-col border-r border-outline-variant bg-surface-container-lowest p-6 lg:flex z-50">
        <div className="mb-10 flex flex-col items-start gap-2 px-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-on-primary shadow-lg shadow-primary/20">
            <GraduationCap className="h-7 w-7" />
          </div>
          <h1 className="font-headline text-2xl font-bold tracking-tight text-primary">Academic Zen</h1>
          <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-on-surface-variant opacity-60">Modern Arabic Mastery</p>
        </div>

        <nav className="flex flex-grow flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as ViewType)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200",
                activeView === item.id 
                  ? "bg-primary-container text-on-primary-container font-semibold shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container-low"
              )}
            >
              <item.icon className={cn("h-5 w-5", activeView === item.id ? "text-primary" : "")} />
              <span className="font-label-caps text-xs uppercase tracking-wider">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-1 border-t border-outline-variant pt-4">
          <button className="mb-4 flex items-center justify-center gap-2 rounded-lg bg-secondary-container px-4 py-3 font-bold text-on-secondary shadow-lg shadow-secondary-container/20 transition-transform active:scale-95">
            <Zap className="h-4 w-4 fill-current" />
            <span>Start Review</span>
          </button>
          
          <button className="flex items-center gap-3 rounded-lg px-4 py-3 text-on-surface-variant transition-all hover:bg-surface-container-low">
            <HelpCircle className="h-5 w-5" />
            <span className="font-label-caps text-xs uppercase tracking-wider">Help</span>
          </button>
          
          <button className="flex items-center gap-3 rounded-lg px-4 py-3 text-on-surface-variant transition-all hover:bg-surface-container-low">
            <LogOut className="h-5 w-5" />
            <span className="font-label-caps text-xs uppercase tracking-wider">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-grow transition-all duration-300",
        "lg:ml-64", // Offset for fixed sidebar
        "pb-20 lg:pb-0" // Bottom margin for mobile nav
      )}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mx-auto max-w-7xl p-6 lg:p-12"
          >
            {activeView === 'Dashboard' && <DashboardView onStartReview={() => setActiveView('Study')} />}
            {activeView === 'Study' && <StudyView />}
            {activeView === 'Library' && <LibraryView />}
            {activeView === 'Analytics' && <AnalyticsView />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-outline-variant bg-surface-container-lowest px-4 lg:hidden shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id as ViewType)}
            className={cn(
              "flex flex-col items-center justify-center gap-1 transition-all rounded-xl px-3 py-1",
              activeView === item.id 
                ? "text-primary bg-primary/5" 
                : "text-on-surface-variant"
            )}
          >
            <item.icon className={cn("h-5 w-5", activeView === item.id ? "fill-primary/20" : "")} />
            <span className="font-label-caps text-[9px] uppercase tracking-tighter">{item.label.split(' ')[0]}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
