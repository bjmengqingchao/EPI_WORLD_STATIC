import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Analysis from './pages/Analysis';

// A placeholder for the events list page, reusing dashboard components for simplicity in this demo
const EventsPlaceholder = () => (
    <div className="p-8 text-center bg-slate-50 min-h-screen">
        <h2 className="text-2xl font-bold text-slate-700">疫情事件归档</h2>
        <p className="text-slate-500 mt-2">详细列表视图将在此处展示。</p>
        <div className="mt-8 opacity-50 pointer-events-none">
            {/* Reusing Analysis content visually just to fill space */}
            <Analysis /> 
        </div>
    </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/events" element={<EventsPlaceholder />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        {/* Simple Footer */}
        <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm border-t border-slate-800 mt-auto">
             <div className="max-w-[1600px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <p>&copy; 2025 EpiWorld 全球疫情平台. All rights reserved.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white">隐私政策</a>
                    <a href="#" className="hover:text-white">服务条款</a>
                    <a href="#" className="hover:text-white">联系我们</a>
                </div>
             </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;