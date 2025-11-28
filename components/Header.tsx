import React from 'react';
import { Globe2, Bell, Search, Menu, UserCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: '首页', path: '/' },
    { name: '传染病事件', path: '/events' },
    { name: '传染病专题', path: '/analysis' }, // Linking analysis here for demo
    { name: '国别研究', path: '#' },
    { name: '研究文献', path: '#' },
    { name: '最新资讯', path: '#' },
    { name: '航班', path: '#' },
    { name: '分析报告', path: '#' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-lg border-b border-slate-700">
      <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3 min-w-[250px]">
          <Globe2 className="w-8 h-8 text-sky-400" />
          <div className="leading-tight">
            <h1 className="font-bold text-lg tracking-wide">EpiWorld</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">全球疫情数据分析和风险评估平台</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden xl:flex items-center gap-1 h-full">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`h-10 px-3 flex items-center text-sm font-medium rounded-md transition-colors whitespace-nowrap
                  ${isActive 
                    ? 'bg-brand-600 text-white' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <input 
              type="text" 
              placeholder="搜索数据..." 
              className="bg-slate-800 border border-slate-700 rounded-full pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-sky-500 w-48 transition-all focus:w-64 text-slate-200 placeholder-slate-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2" />
          </div>
          
          <button className="relative p-2 hover:bg-slate-800 rounded-full transition-colors">
            <Bell className="w-5 h-5 text-slate-300" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-slate-900"></span>
          </button>
          
          <button className="flex items-center gap-2 p-1 hover:bg-slate-800 rounded-full pr-3 transition-colors">
            <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-xs font-bold text-white">
              C
            </div>
            <span className="hidden lg:block text-sm font-medium text-slate-300">分析师</span>
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;