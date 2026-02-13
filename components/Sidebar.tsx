import React, { useMemo } from 'react';
import { LESSONS, CATEGORY_LABELS } from '../constants';
import { ViewState, Lesson } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, isOpen, setIsOpen }) => {
  
  const groupedLessons = useMemo(() => {
    const groups: Record<string, Lesson[]> = {};
    LESSONS.forEach(lesson => {
      if (!groups[lesson.category]) groups[lesson.category] = [];
      groups[lesson.category].push(lesson);
    });
    return groups;
  }, []);

  const categoryOrder = ['intro', 'logic', 'math', 'structure', 'advanced'];

  const NavItem = ({ id, title, active, onClick }: any) => (
    <button
      onClick={onClick}
      className={`w-full text-left py-2 px-4 transition-all duration-300 text-sm border-l-2 ${
        active 
          ? 'border-p5-blue text-p5-blue font-bold bg-blue-50/50' 
          : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
      }`}
    >
      {title}
    </button>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-white/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}>
        <div className="p-8 pb-4">
          <h1 
            className="text-xl font-bold text-gray-900 cursor-pointer tracking-tighter"
            onClick={() => { onNavigate('home'); setIsOpen(false); }}
          >
            Processing Note<span className="text-p5-blue">.</span>
          </h1>
          <p className="text-[10px] text-gray-400 mt-2 font-mono uppercase tracking-widest">
            Interactive Guide v2.0
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto px-0 py-4 space-y-8 scrollbar-thin">
          <div className="space-y-1">
             <NavItem 
              id="home"
              title="Overview"
              active={currentView === 'home'}
              onClick={() => { onNavigate('home'); setIsOpen(false); }}
            />
          </div>

          {categoryOrder.map((catKey, idx) => {
            const categoryLessons = groupedLessons[catKey];
            if (!categoryLessons) return null;

            return (
              <div key={catKey} className="space-y-1">
                <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-widest px-4 py-2 flex items-center gap-2">
                  <span className="w-4 h-[1px] bg-gray-300"></span>
                  {idx + 1}. {CATEGORY_LABELS[catKey].split(':')[1]}
                </h3>
                <div className="space-y-0">
                  {categoryLessons.map((lesson) => (
                    <NavItem 
                      key={lesson.id}
                      id={lesson.id}
                      title={lesson.title}
                      active={currentView === lesson.id}
                      onClick={() => { onNavigate(lesson.id); setIsOpen(false); }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </nav>
        
        <div className="p-8 border-t border-gray-50">
           <a href="https://processing.org" target="_blank" className="text-xs text-gray-400 hover:text-p5-blue transition-colors font-mono block">
             {'-> processing.org'}
           </a>
        </div>
      </div>
    </>
  );
};

export default Sidebar;