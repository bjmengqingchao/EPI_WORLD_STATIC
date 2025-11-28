import React, { useEffect, useState } from 'react';
import { ArrowRight, ExternalLink, MapPin, Activity, AlertTriangle, CloudSun } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import WorldMap from '../components/WorldMap';
import { RECENT_EVENTS, TREND_DATA, CATEGORIES } from '../constants';
import { analyzeRisk } from '../services/geminiService';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [aiSummary, setAiSummary] = useState<string>('正在生成 AI 分析报告...');

  useEffect(() => {
    // Simulate AI loading for effect
    const loadAi = async () => {
      try {
        const summary = await analyzeRisk(RECENT_EVENTS);
        setAiSummary(summary);
      } catch (e) {
        setAiSummary("当前无法获取分析数据。");
      }
    };
    loadAi();
  }, []);

  return (
    <div className="min-h-screen pb-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white pt-8 pb-16 px-4">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Text & Stats */}
          <div className="lg:col-span-1 flex flex-col justify-center space-y-6">
            <div>
              <h1 className="text-4xl font-bold leading-tight mb-4 text-white">
                全球疫情<br/>
                <span className="text-sky-400">数据分析和风险评估平台</span>
              </h1>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                以全球视野，聚焦传染病对我国的影响。平台整合多源数据，利用大模型技术，实现了从风险事件监测、国别研究、专题数据分析到文献检索、资讯发布、分析报告和知识科普的全方位功能，助力全球传染病的防控与研究。
              </p>
              
              <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg backdrop-blur-sm">
                 <div className="flex items-start gap-3">
                    <div className="mt-1"><Activity className="w-5 h-5 text-brand-500" /></div>
                    <div>
                        <h3 className="font-semibold text-sky-400 text-sm mb-1">AI 风险评估 (Gemini 驱动)</h3>
                        <p className="text-xs text-slate-300 leading-relaxed italic">
                            "{aiSummary}"
                        </p>
                    </div>
                 </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button className="px-6 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-md font-medium text-sm transition-colors shadow-lg shadow-brand-900/20">
                    最新报告
                </button>
                <button className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md font-medium text-sm transition-colors border border-slate-600">
                    数据来源
                </button>
              </div>
            </div>
          </div>

          {/* Map Visualization */}
          <div className="lg:col-span-2 h-[400px] lg:h-[500px]">
            <WorldMap />
            <div className="flex justify-center gap-4 mt-4">
               <button className="px-3 py-1 bg-white text-slate-700 text-xs rounded border border-slate-200 shadow-sm">近三月</button>
               <button className="px-3 py-1 bg-brand-50 text-brand-600 text-xs rounded border border-brand-200 font-medium">近一周</button>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Grid */}
      <main className="max-w-[1600px] mx-auto px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-12 gap-6">
          
          {/* Left Column: Recent Events */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            
            {/* Recent Events Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-brand-600 p-1 rounded-full"><AlertTriangle className="w-3 h-3 text-white" /></div>
                    <h2 className="font-bold text-slate-800 text-lg">全球传染病最新事件</h2>
                    <span className="text-xs text-slate-400 ml-2">近一周来自 Promed-Mail / GPHIN / WHO DON / ReliefWeb 等监测来源</span>
                </div>
                <Link to="/events" className="px-3 py-1 border border-brand-200 text-brand-600 rounded text-xs hover:bg-brand-50 transition-colors flex items-center gap-1">
                    查看更多 <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              
              <div className="p-5 flex gap-6">
                {/* Mini Chart */}
                <div className="w-1/3 hidden md:block">
                    <div className="flex justify-between items-center mb-4">
                         <h3 className="text-sm font-semibold text-slate-700">事件时间分布</h3>
                         <div className="flex gap-2">
                            <span className="w-3 h-3 text-slate-300"><Activity className="w-full h-full" /></span>
                         </div>
                    </div>
                    
                    <div className="h-[200px] w-full bg-slate-50/50 rounded-lg p-2 border border-slate-100">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={TREND_DATA}>
                                <defs>
                                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.6}/>
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" tick={{fontSize: 10}} tickLine={false} axisLine={false} interval={1} />
                                <YAxis hide />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ fontSize: '12px' }}
                                />
                                <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorVal)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-between text-xs text-slate-400 mt-2 px-1">
                        <span>2025-11-21</span>
                        <span>2025-11-27</span>
                    </div>
                </div>

                {/* Event List */}
                <div className="flex-1 space-y-4">
                    {RECENT_EVENTS.map((event) => (
                        <div key={event.id} className="group p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 cursor-pointer">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <img 
                                        src={`https://flagcdn.com/24x18/${(event.countryCode === 'UN' ? 'un' : event.countryCode.toLowerCase())}.png`} 
                                        alt={event.country}
                                        className="w-5 h-3.5 object-cover rounded-sm shadow-sm" 
                                    />
                                    <span className="font-bold text-slate-800 text-sm">{event.country}</span>
                                    <span className="font-semibold text-slate-700 text-sm ml-2">{event.disease}</span>
                                    {event.countryCode === 'UN' && <span className="text-xs bg-slate-100 text-slate-500 px-1 rounded">事件涉及人</span>}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <span className="text-slate-500 font-bold">{event.source}</span>
                                    <ExternalLink className="w-3 h-3" />
                                    <span>{event.date}</span>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed text-justify">
                                {event.summary}
                            </p>
                            <div className="flex gap-4 mt-2 text-xs">
                                <span className="text-orange-500">共 {event.cases} 个合并事件</span>
                                <span className="text-slate-400">|</span>
                                <span className="text-slate-400 cursor-pointer hover:text-brand-600">展开</span>
                            </div>
                        </div>
                    ))}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Topics & Rankings */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            
            {/* Disease Categories (Right Side per screenshot) */}
            <div className="bg-brand-50/30 p-5 rounded-xl border border-brand-100/50">
               <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                   <div className="p-1 bg-indigo-100 rounded text-indigo-600"><CloudSun className="w-4 h-4" /></div>
                   传染病专题
               </h3>
               
               <div className="space-y-4">
                 {CATEGORIES.map((cat, idx) => (
                     <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-all">
                         <div className="flex items-center gap-3 mb-2">
                             <div className="p-2 bg-slate-50 rounded-full">{cat.icon}</div>
                             <h4 className="font-bold text-slate-700 text-sm">{cat.name}</h4>
                         </div>
                         <div className="flex flex-wrap gap-2 pl-11">
                             {cat.diseases.map(d => (
                                 <Link to="/analysis" key={d} className="text-xs text-slate-500 hover:text-brand-600 hover:bg-slate-50 px-1.5 py-0.5 rounded transition-colors">
                                     {d}
                                 </Link>
                             ))}
                         </div>
                     </div>
                 ))}
               </div>
            </div>

            {/* Regional Research */}
            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                      <div className="bg-brand-600 w-1 h-4 rounded-full"></div>
                      国别研究
                  </h3>
               </div>
               
               <div className="flex gap-4 border-l-2 border-slate-100 pl-4">
                   <div className="flex flex-col gap-2">
                       <span className="text-brand-600 font-medium text-sm">亚洲</span>
                       <span className="text-slate-500 text-sm">非洲</span>
                       <span className="text-slate-500 text-sm">欧洲</span>
                       <span className="text-slate-500 text-sm">北美洲</span>
                       <span className="text-slate-500 text-sm">南美洲</span>
                       <span className="text-slate-500 text-sm">大洋洲</span>
                   </div>
                   <div className="flex-1 grid grid-cols-2 gap-2 text-xs text-slate-600">
                       <div className="bg-slate-50 p-2 rounded text-center">巴基斯坦</div>
                       <div className="bg-slate-50 p-2 rounded text-center">哈萨克斯坦</div>
                       <div className="bg-slate-50 p-2 rounded text-center">韩国</div>
                       <div className="bg-slate-50 p-2 rounded text-center">吉尔吉斯斯坦</div>
                       <div className="bg-slate-50 p-2 rounded text-center">老挝</div>
                       <div className="bg-slate-50 p-2 rounded text-center">缅甸</div>
                   </div>
               </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;