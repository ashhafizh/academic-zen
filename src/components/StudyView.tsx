import { useState } from 'react';
import { 
  ChevronLeft, 
  Settings2, 
  HelpCircle, 
  Eye, 
  RotateCcw, 
  Frown, 
  Smile, 
  Laugh,
  Lightbulb,
  Timer
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { MOCK_VOCABULARY } from '../constants';

export default function StudyView() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showSentence, setShowSentence] = useState(false);
  
  const currentWord = MOCK_VOCABULARY[currentIndex];
  const progress = ((currentIndex + 1) / MOCK_VOCABULARY.length) * 100;

  const nextCard = () => {
    setIsFlipped(false);
    setShowSentence(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % MOCK_VOCABULARY.length);
    }, 200);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-12 py-4">
      {/* Upper Navigation / Stats */}
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="font-headline text-2xl font-bold text-primary">Study Session</h2>
            <div className="h-6 w-px bg-outline-variant/50" />
            <div className="flex items-center gap-2 text-outline">
              <Timer className="h-4 w-4" />
              <span className="font-label-caps text-xs font-semibold tracking-wider">14:22 remaining</span>
            </div>
          </div>
          <div className="flex items-center gap-6 text-on-surface-variant">
             <div className="flex items-center gap-1.5 text-secondary font-bold font-label-caps text-xs">
                <span className="inline-block h-2 w-2 rounded-full bg-secondary animate-pulse" />
                12 Day Streak
             </div>
             <div className="flex items-center gap-2">
               <Settings2 className="h-5 w-5 cursor-pointer hover:text-primary transition-colors" />
               <HelpCircle className="h-5 w-5 cursor-pointer hover:text-primary transition-colors" />
             </div>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
             <span className="font-label-caps text-[10px] text-outline uppercase tracking-[0.2em]">Session Progress</span>
             <span className="font-label-caps text-xs font-bold text-primary">{currentIndex + 1} / {MOCK_VOCABULARY.length} Cards</span>
          </div>
          <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
            <motion.div 
               className="h-full bg-tertiary-fixed-dim" 
               initial={{ width: 0 }}
               animate={{ width: `${progress}%` }}
               transition={{ duration: 0.5, ease: "circOut" }}
            />
          </div>
        </div>
      </div>

      {/* Flashcard Component */}
      <div className="perspective-1000 relative">
        <motion.div
           className="relative min-h-[460px] w-full cursor-pointer touch-none"
           onClick={() => setIsFlipped(!isFlipped)}
           animate={{ rotateY: isFlipped ? 180 : 0 }}
           transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
           style={{ transformStyle: "preserve-3d" }}
        >
          {/* Card Front */}
          <div className="absolute inset-0 backface-hidden bg-white border border-outline-variant rounded-2xl p-12 flex flex-col items-center justify-center text-center shadow-[0_4px_24px_rgba(15,76,92,0.04)] overflow-hidden">
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none" style={{ backgroundImage: 'radial-gradient(#003441 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
             
             <span className="font-label-caps text-[10px] text-outline uppercase tracking-[0.3em] mb-8">Vocabulary Word</span>
             <h3 className="font-display-ar text-7xl text-primary mb-4 select-none" dir="rtl">{currentWord.arabic}</h3>
             <p className="font-sans text-xl text-on-surface-variant italic opacity-60">‘{currentWord.transliteration}</p>
             
             <div className="mt-16 flex items-center gap-2 text-secondary font-label-caps text-xs font-bold tracking-[0.2em] animate-bounce">
                <Eye className="h-4 w-4" />
                TAP TO REVEAL
             </div>
          </div>

          {/* Card Back */}
          <div 
             className="absolute inset-0 backface-hidden bg-white border border-outline-variant rounded-2xl p-12 flex flex-col items-center justify-center text-center shadow-[0_4px_24px_rgba(15,76,92,0.04)]"
             style={{ transform: 'rotateY(180deg)' }}
          >
             <span className="font-label-caps text-[10px] text-secondary uppercase tracking-[0.3em] mb-4">Translation</span>
             <p className="font-headline text-4xl font-bold text-on-surface mb-10">{currentWord.meaning}</p>
             
             <div className="w-24 h-px bg-outline-variant/30 mb-10" />

             <div className="w-full space-y-6">
                <div className="flex flex-col items-center gap-3">
                   <button 
                      onClick={(e) => { e.stopPropagation(); setShowSentence(!showSentence); }}
                      className="flex items-center gap-2 text-primary font-label-caps text-[10px] font-bold uppercase tracking-widest hover:opacity-70 transition-opacity"
                   >
                      <Lightbulb className="h-4 w-4" />
                      {showSentence ? 'Hide' : 'Show'} Example Sentence
                   </button>
                   
                   <AnimatePresence>
                     {showSentence && (
                       <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="bg-surface-container-low p-6 rounded-xl border-l-4 border-primary w-full max-w-sm text-right"
                       >
                          <p className="font-display-ar text-2xl text-primary mb-2" dir="rtl">ذهب الباحث إلى المكتبة كل صباح ليدرس علم اللغة.</p>
                          <p className="font-sans text-xs text-on-surface-variant italic leading-relaxed text-center">
                            "The researcher went to the library every morning to study linguistics."
                          </p>
                       </motion.div>
                     )}
                   </AnimatePresence>
                </div>
             </div>
          </div>
        </motion.div>
      </div>

      {/* Response Controls */}
      <AnimatePresence>
        {isFlipped && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-4 gap-4"
          >
            <ResponseButton 
               label="Again" 
               subLabel="< 1m" 
               icon={<RotateCcw className="h-5 w-5" />} 
               color="text-error" 
               hoverBg="hover:bg-error-container/30" 
               onClick={nextCard} 
            />
            <ResponseButton 
               label="Hard" 
               subLabel="2d" 
               icon={<Frown className="h-5 w-5" />} 
               color="text-secondary-container" 
               hoverBg="hover:bg-secondary-container/10" 
               onClick={nextCard} 
            />
            <ResponseButton 
               label="Good" 
               subLabel="4d" 
               icon={<Smile className="h-5 w-5" />} 
               color="text-tertiary-container" 
               hoverBg="hover:bg-tertiary-container/10" 
               isActive
               onClick={nextCard} 
            />
            <ResponseButton 
               label="Easy" 
               subLabel="7d" 
               icon={<Laugh className="h-5 w-5" />} 
               color="text-primary" 
               hoverBg="hover:bg-primary/5" 
               onClick={nextCard} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Shortcut Guide */}
      <div className="flex justify-center flex-wrap gap-8 text-[11px] font-label-caps text-outline uppercase tracking-[0.15em] pt-4">
        <div className="flex items-center gap-1.5"><kbd className="bg-surface-container-highest px-1.5 py-0.5 rounded border border-outline-variant text-[10px] text-on-surface">1</kbd> Again</div>
        <div className="flex items-center gap-1.5"><kbd className="bg-surface-container-highest px-1.5 py-0.5 rounded border border-outline-variant text-[10px] text-on-surface">2</kbd> Hard</div>
        <div className="flex items-center gap-1.5"><kbd className="bg-surface-container-highest px-1.5 py-0.5 rounded border border-outline-variant text-[10px] text-on-surface">3</kbd> Good</div>
        <div className="flex items-center gap-1.5"><kbd className="bg-surface-container-highest px-1.5 py-0.5 rounded border border-outline-variant text-[10px] text-on-surface">4</kbd> Easy</div>
        <div className="flex items-center gap-1.5"><kbd className="bg-surface-container-highest px-3 py-0.5 rounded border border-outline-variant text-[10px] text-on-surface">SPACE</kbd> Flip</div>
      </div>
    </div>
  );
}

function ResponseButton({ label, subLabel, icon, color, hoverBg, isActive, onClick }: any) {
  return (
    <button 
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className={cn(
        "flex flex-col items-center justify-center p-6 rounded-2xl bg-white border border-outline-variant/30 shadow-sm transition-all active:scale-95 group",
        hoverBg,
        isActive && "border-b-4 border-b-tertiary-container ring-1 ring-tertiary-container/20"
      )}
    >
       <span className={cn("font-label-caps text-[10px] font-bold uppercase tracking-widest mb-2 opacity-50 group-hover:opacity-100", isActive && "opacity-100", color)}>
          {label}
       </span>
       <span className="text-xl font-headline font-bold text-on-surface mb-2 tracking-tighter">{subLabel}</span>
       <div className={cn("h-10 w-10 flex items-center justify-center rounded-full bg-surface-container transition-transform group-hover:scale-110", color)}>
          {icon}
       </div>
    </button>
  );
}
