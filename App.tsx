import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import CodeBlock from './components/CodeBlock';
import { LESSONS, CATEGORY_LABELS } from './constants';
import { ViewState } from './types';
import { Menu, ArrowRight, ExternalLink, ChevronRight, Book, Command, Code, Terminal, Cpu } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
  };

  const getNextLessonId = (currentId: string) => {
    const idx = LESSONS.findIndex(l => l.id === currentId);
    if (idx !== -1 && idx < LESSONS.length - 1) return LESSONS[idx + 1].id;
    return null;
  };
  
  const getPrevLessonId = (currentId: string) => {
    const idx = LESSONS.findIndex(l => l.id === currentId);
    if (idx > 0) return LESSONS[idx - 1].id;
    return 'home';
  };

  const renderContent = () => {
    if (currentView === 'home') {
      return (
        <div className="max-w-5xl mx-auto space-y-24 animate-fadeIn pb-32">
          {/* Hero Section */}
          <section className="pt-24 pb-12">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                 <span className="h-[1px] w-12 bg-gray-300"></span>
                 <span className="text-xs font-mono tracking-widest text-gray-400 uppercase">Interactive Guide v2.0</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter text-gray-900 leading-[0.9]">
                Creative<br/>
                Coding<br/>
                <span className="text-p5-blue">Logic.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-500 leading-relaxed mb-12 max-w-2xl font-light">
                Processingを通じて、アルゴリズムによる視覚表現を体系的に学ぶためのエンジニアリング・ノート。
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setCurrentView('setup-draw')}
                  className="bg-gray-900 text-white hover:bg-black px-10 py-4 font-bold transition-all flex items-center justify-center gap-3 text-sm tracking-widest uppercase shadow-xl shadow-gray-200 hover:shadow-2xl hover:-translate-y-1"
                >
                  Start Learning <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="grid md:grid-cols-3 gap-8 border-t border-gray-100 pt-16">
             <div className="group">
                <div className="w-12 h-12 bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-900 mb-6 group-hover:bg-p5-blue group-hover:text-white transition-colors duration-300">
                  <Terminal size={24} strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-p5-blue transition-colors">Algorithmic Thinking</h3>
                <p className="text-sm text-gray-500 leading-relaxed">感覚的なデザインではなく、論理と計算に基づいた構造的なアプローチを習得します。</p>
             </div>
             <div className="group">
                <div className="w-12 h-12 bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-900 mb-6 group-hover:bg-p5-blue group-hover:text-white transition-colors duration-300">
                  <Cpu size={24} strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-p5-blue transition-colors">Visual Computing</h3>
                <p className="text-sm text-gray-500 leading-relaxed">座標変換、ピクセル操作、物理演算など、コンピュータグラフィックスの基礎原理を深掘りします。</p>
             </div>
             <div className="group">
                <div className="w-12 h-12 bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-900 mb-6 group-hover:bg-p5-blue group-hover:text-white transition-colors duration-300">
                  <Code size={24} strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-p5-blue transition-colors">Modern Syntax</h3>
                <p className="text-sm text-gray-500 leading-relaxed">可読性が高く、メンテナンスしやすいモダンなコーディングスタイルと設計パターンを学びます。</p>
             </div>
          </section>

          {/* Curriculum List */}
          <section>
             <div className="flex items-end justify-between mb-12 border-b border-gray-900 pb-4">
               <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Curriculum</h2>
               <span className="text-xs font-mono text-gray-400">INDEX</span>
             </div>
             
             <div className="space-y-16">
                {['intro', 'logic', 'math', 'structure', 'advanced'].map((catKey, idx) => {
                   const catLessons = LESSONS.filter(l => l.category === catKey);
                   return (
                     <div key={catKey} className="grid md:grid-cols-[120px_1fr] gap-8">
                        <div className="text-xs font-bold text-gray-400 font-mono pt-1">0{idx + 1} / {CATEGORY_LABELS[catKey].split(':')[1]}</div>
                        <div className="grid grid-cols-1 gap-1">
                           {catLessons.map(lesson => (
                             <button 
                               key={lesson.id}
                               onClick={() => setCurrentView(lesson.id)}
                               className="group flex items-center justify-between border-b border-gray-100 py-4 hover:pl-4 transition-all duration-300"
                             >
                               <div className="flex items-center gap-4">
                                 <span className="text-gray-300 group-hover:text-p5-blue transition-colors"><ArrowRight size={16} /></span>
                                 <span className="text-lg font-medium text-gray-800 group-hover:text-gray-900">{lesson.title}</span>
                               </div>
                               <span className="text-xs text-gray-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity">READ -></span>
                             </button>
                           ))}
                        </div>
                     </div>
                   );
                })}
             </div>
          </section>

          {/* Footer Links */}
          <section className="grid md:grid-cols-3 gap-0 border border-gray-100 divide-y md:divide-y-0 md:divide-x divide-gray-100">
             <a href="https://processing.org/reference/" target="_blank" rel="noopener noreferrer" className="p-8 hover:bg-gray-50 transition-colors group">
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-p5-blue flex items-center gap-2">Reference <ExternalLink size={14} /></h3>
                <p className="text-xs text-gray-500 leading-relaxed">Processing公式リファレンス。関数の仕様確認はこちら。</p>
             </a>
             <a href="https://natureofcode.com/" target="_blank" rel="noopener noreferrer" className="p-8 hover:bg-gray-50 transition-colors group">
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-p5-blue flex items-center gap-2">Nature of Code <ExternalLink size={14} /></h3>
                <p className="text-xs text-gray-500 leading-relaxed">Daniel Shiffmanによる物理・数学シミュレーションの聖書。</p>
             </a>
             <a href="https://openprocessing.org/" target="_blank" rel="noopener noreferrer" className="p-8 hover:bg-gray-50 transition-colors group">
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-p5-blue flex items-center gap-2">OpenProcessing <ExternalLink size={14} /></h3>
                <p className="text-xs text-gray-500 leading-relaxed">世界中のクリエイターのスケッチが集まるギャラリーサイト。</p>
             </a>
          </section>
        </div>
      );
    }

    // --- Lesson View ---
    const lesson = LESSONS.find(l => l.id === currentView);
    const nextLessonId = lesson ? getNextLessonId(lesson.id) : null;
    const prevLessonId = lesson ? getPrevLessonId(lesson.id) : null;

    if (lesson) {
      return (
        <div className="max-w-4xl mx-auto animate-fadeIn pb-32">
          {/* Header */}
          <div className="mb-16 pt-8">
            <div className="flex items-center gap-3 text-xs text-gray-400 mb-8 font-mono uppercase tracking-widest">
               <span className="cursor-pointer hover:text-gray-900 transition-colors" onClick={() => setCurrentView('home')}>Home</span>
               <ChevronRight size={10} />
               <span>{CATEGORY_LABELS[lesson.category].split(':')[1]}</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">{lesson.title}</h2>
            <div className="bg-gray-50 border-l-4 border-gray-900 p-6">
               <p className="text-lg text-gray-600 leading-relaxed font-light">{lesson.description}</p>
            </div>
          </div>
          
          {/* Content */}
          <div className="prose-content text-gray-700">
            {lesson.content}
          </div>

          {/* Navigation Footer */}
          <div className="mt-24 pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between gap-6">
            {prevLessonId ? (
               <button 
                onClick={() => handleNavigate(prevLessonId)}
                className="group flex-1 text-left p-6 border border-gray-200 hover:border-gray-900 transition-all duration-300"
               >
                 <span className="block text-xs text-gray-400 mb-2 font-mono uppercase tracking-wider">Previous</span>
                 <span className="text-lg font-bold text-gray-900 group-hover:translate-x-1 transition-transform inline-block">
                   {prevLessonId === 'home' ? 'Overview' : LESSONS.find(l => l.id === prevLessonId)?.title}
                 </span>
               </button>
            ) : <div className="flex-1"></div>}
            
            {nextLessonId && (
               <button 
                onClick={() => handleNavigate(nextLessonId)}
                className="group flex-1 text-right p-6 border border-gray-200 hover:border-p5-blue hover:bg-blue-50/10 transition-all duration-300"
               >
                 <span className="block text-xs text-gray-400 mb-2 font-mono uppercase tracking-wider group-hover:text-p5-blue">Next Lesson</span>
                 <span className="text-lg font-bold text-gray-900 group-hover:text-p5-blue group-hover:-translate-x-1 transition-transform inline-block">
                   {LESSONS.find(l => l.id === nextLessonId)?.title}
                 </span>
               </button>
            )}
          </div>
        </div>
      );
    }

    return <div>Not Found</div>;
  };

  return (
    <div className="flex h-screen bg-white text-gray-900 font-sans overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        onNavigate={handleNavigate}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <main className="flex-1 overflow-y-auto relative w-full scroll-smooth bg-white">
        {/* Mobile Header */}
        <div className="md:hidden sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-100 p-4 flex items-center justify-between">
          <span className="font-bold text-gray-900 tracking-tight">Processing Note.</span>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-900 p-2"
          >
            <Menu size={24} />
          </button>
        </div>

        <div className="p-6 md:p-12 lg:px-20 lg:py-16 max-w-[1400px] mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;