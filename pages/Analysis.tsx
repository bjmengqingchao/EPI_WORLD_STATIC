import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, CartesianGrid } from 'recharts';
import { Download, Filter, Map as MapIcon, BookOpen, Share2 } from 'lucide-react';
import { DENGUE_TREND_DATA } from '../constants';
import { getDiseaseKnowledge } from '../services/geminiService';

const Analysis: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'regions' | 'reports'>('overview');
  const [knowledge, setKnowledge] = useState<string>("");

  React.useEffect(() => {
    getDiseaseKnowledge("登革热").then(setKnowledge);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl text-red-500">🦟</span>
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">登革热 (Dengue)</h1>
                    <div className="flex gap-2 text-xs text-slate-500 mt-1">
                        <span className="bg-slate-100 px-2 py-0.5 rounded">病毒性</span>
                        <span className="bg-slate-100 px-2 py-0.5 rounded">虫媒传播</span>
                    </div>
                </div>
            </div>
            
            <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">
                    <Download className="w-4 h-4" /> 导出报告
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700">
                    <Filter className="w-4 h-4" /> 数据筛选
                </button>
            </div>
        </div>

        {/* Knowledge & AI Insight */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <MapIcon className="w-5 h-5 text-brand-500" />
                        各主要大洲登革热病例趋势
                    </h3>
                    <div className="flex gap-2">
                         <button className="text-xs bg-brand-50 text-brand-600 px-3 py-1 rounded">病例数</button>
                         <button className="text-xs bg-white text-slate-500 border border-slate-200 px-3 py-1 rounded">死亡数</button>
                         <button className="text-xs bg-white text-slate-500 border border-slate-200 px-3 py-1 rounded">报道数</button>
                    </div>
                </div>
                
                {/* Mock Chart Area for Trends per continent */}
                 <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={DENGUE_TREND_DATA}>
                            <defs>
                                <linearGradient id="colorAsia" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorAmerica" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} minTickGap={30} />
                            <YAxis fontSize={10} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{borderRadius: '8px'}} />
                            <Legend />
                            <Area type="monotone" dataKey="value" name="亚洲" stroke="#f43f5e" fillOpacity={0.6} fill="url(#colorAsia)" />
                            <Area type="monotone" dataKey="value2" name="美洲" stroke="#8b5cf6" fillOpacity={0.6} fill="url(#colorAmerica)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="lg:col-span-1 bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-xl shadow-sm p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-4 text-indigo-300">
                    <BookOpen className="w-5 h-5" />
                    <span className="font-semibold text-sm">登革热热点知识</span>
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">Dengue Virus</h4>
                    <p className="text-sm text-slate-300 leading-relaxed opacity-90 text-justify">
                        {knowledge || "正在加载疾病信息..."}
                    </p>
                    
                    <div className="mt-6 space-y-3">
                        <div className="bg-white/10 p-3 rounded-lg">
                            <span className="block text-xs text-indigo-300 uppercase">传播媒介</span>
                            <span className="font-medium">伊蚊 (Aedes)</span>
                        </div>
                        <div className="bg-white/10 p-3 rounded-lg">
                            <span className="block text-xs text-indigo-300 uppercase">风险等级</span>
                            <span className="font-medium text-red-400">高 (季节性)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Google Trends */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-slate-800">登革热谷歌搜索指数 (全球)</h3>
                    <div className="text-xs text-slate-400">2022-11-28 至 2025-11-28</div>
                </div>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={DENGUE_TREND_DATA}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} hide />
                            <YAxis fontSize={10} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{borderRadius: '8px'}} />
                            <Area type="monotone" dataKey="value" name="Search Index" stroke="#3b82f6" fillOpacity={0.1} fill="#3b82f6" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Top Countries Bar Chart */}
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-6">登革热疾病数量指标排名 TOP 10</h3>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart layout="vertical" data={[
                            { name: '巴西', count: 12400 },
                            { name: '阿根廷', count: 11000 },
                            { name: '墨西哥', count: 9500 },
                            { name: '印度尼西亚', count: 8500 },
                            { name: '印度', count: 7200 },
                            { name: '巴拉圭', count: 6200 },
                            { name: '秘鲁', count: 4100 },
                            { name: '越南', count: 3800 },
                        ]}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                            <XAxis type="number" fontSize={10} />
                            <YAxis dataKey="name" type="category" width={80} fontSize={12} fontWeight={500} />
                            <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '8px'}} />
                            <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={18} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>

        {/* Detailed List */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div className="flex gap-4">
                     <h3 className="font-bold text-slate-800">登革热事件</h3>
                     <span className="text-sm text-slate-500 mt-0.5">2025-08-28 至 2025-11-28</span>
                </div>
                <div className="flex gap-2 text-sm text-slate-500">
                    <span className="cursor-pointer hover:text-brand-600">全部地区</span>
                    <span className="cursor-pointer hover:text-brand-600">更多 &gt;</span>
                </div>
            </div>
            <div className="divide-y divide-slate-100">
                {[
                    { c: '孟加拉国', s: 'GPHIN / 根据卫生服务总局（DGHS）的每日更新，四名新受害者居住在...', count: 186 },
                    { c: '哥伦比亚', s: 'GPHIN / 该部门累计1,933例感染，其中58%的患者处于警戒状态...', count: 19 },
                    { c: '墨西哥', s: 'GPHIN / 州立媒介传播疾病报告确认今年累计五例死亡...', count: 82 },
                    { c: '巴基斯坦', s: 'GPHIN / 根据卫生总局的每日报告，信德省卫生当局今天确认在过去24...', count: 263 },
                ].map((item, i) => (
                    <div key={i} className="p-4 hover:bg-slate-50 transition-colors flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        <div className="flex items-start gap-3">
                            <img 
                                src={`https://flagcdn.com/24x18/${item.c === '孟加拉国' ? 'bd' : item.c === '哥伦比亚' ? 'co' : item.c === '墨西哥' ? 'mx' : 'pk'}.png`} 
                                className="mt-1 w-5 h-3.5 object-cover rounded shadow-sm"
                            />
                            <div>
                                <h4 className="text-sm font-bold text-slate-800 hover:text-brand-600 cursor-pointer flex items-center gap-2">
                                    {item.c}
                                    <span className="text-slate-400 font-normal text-xs">2025-11-27</span>
                                </h4>
                                <p className="text-xs text-slate-500 mt-1 line-clamp-1">{item.s}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 min-w-[120px] justify-end">
                            <span className="text-xs text-orange-500">共 {item.count} 个合并事件</span>
                            <span className="text-xs text-slate-400 cursor-pointer hover:text-brand-600">查看</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default Analysis;