import React from 'react';
import { OutbreakEvent, ChartDataPoint, DiseaseCategory } from './types';
import { Bug, Droplet, Tent, Activity } from 'lucide-react';

export const RECENT_EVENTS: OutbreakEvent[] = [
  {
    id: '1',
    country: '埃塞俄比亚',
    countryCode: 'ET',
    disease: '马尔堡出血热',
    date: '2025-11-28',
    source: 'GPHIN',
    summary: '关于埃塞俄比亚马尔堡病毒（MVD）暴发的后续报道中，埃塞俄比亚卫生部报告了另外两例MVD病例和三例死亡病例。',
    cases: 35,
    deaths: 12,
    trend: 'up',
    lat: 9.145,
    lng: 40.489
  },
  {
    id: '2',
    country: '加拿大',
    countryCode: 'CA',
    disease: '人感染动物源性流感',
    date: '2025-11-28',
    source: 'GPHIN',
    summary: '安大略省的两家Strathroy-Caradoc商业家禽农场是CFIA确认的唯一活跃暴发地点，此前惠灵顿县的一个地点在周二解除其暴发状态。',
    cases: 4,
    deaths: 0,
    trend: 'stable',
    lat: 56.130,
    lng: -106.346
  },
  {
    id: '3',
    country: '美国',
    countryCode: 'US',
    disease: '麻疹',
    date: '2025-11-27',
    source: 'GPHIN',
    summary: '自八月以来，罗克兰县卫生官员报告称在罗克兰发现了九例确诊的麻疹病例。其中五例被认为与“暴发”有关。',
    cases: 45,
    deaths: 0,
    trend: 'up',
    lat: 37.090,
    lng: -95.712
  },
  {
    id: '4',
    country: '孟加拉国',
    countryCode: 'BD',
    disease: '登革热',
    date: '2025-11-27',
    source: 'GPHIN',
    summary: '根据卫生服务总局（DGHS）的每日更新，四名新受害者居住在首都达卡。该国已经在周三记录了三例死亡。',
    cases: 1205,
    deaths: 45,
    trend: 'up',
    lat: 23.685,
    lng: 90.356
  },
  {
    id: '5',
    country: '巴西',
    countryCode: 'BR',
    disease: '其他疾病',
    date: '2025-11-27',
    source: 'GPHIN',
    summary: '风信子金刚鹦鹉在巴伊亚被检测出感染了环状病毒，这一消息于周三（11月26日）由奇科·门德斯生物多样性保护研究所（ICMBio）确认。',
    cases: 11,
    deaths: 0,
    trend: 'stable',
    lat: -14.235,
    lng: -51.925
  },
  {
    id: '6',
    country: '未提及国家',
    countryCode: 'UN',
    disease: '麻疹',
    date: '2025-11-27',
    source: 'GPHIN',
    summary: '在过去的几个小时内，确认了四例麻疹病例，国家卫生当局已发布警告。前PAMI负责人卡洛斯·雷加佐尼分析了这一情况。',
    cases: 6,
    deaths: 0,
    trend: 'up',
    lat: 20.593,
    lng: 78.962
  },
    {
    id: '7',
    country: '印度',
    countryCode: 'IN',
    disease: '基孔肯雅热',
    date: '2025-11-27',
    source: 'GPHIN',
    summary: '桑格鲁尔/巴尔纳拉，11月28日——根据州卫生部门的数据，自今年7月以来，巴尔纳拉和桑格鲁尔是该州基孔肯雅热病例最严重的地区。',
    cases: 2,
    deaths: 0,
    trend: 'up',
    lat: 20.593,
    lng: 78.962
  }
];

export const TREND_DATA: ChartDataPoint[] = [
  { name: '11-21', value: 120 },
  { name: '11-22', value: 132 },
  { name: '11-23', value: 101 },
  { name: '11-24', value: 134 },
  { name: '11-25', value: 190 },
  { name: '11-26', value: 230 },
  { name: '11-27', value: 210 },
];

export const CATEGORIES: DiseaseCategory[] = [
  {
    name: '肠道传染病',
    icon: <Bug className="w-6 h-6 text-sky-500" />,
    diseases: ['霍乱', '伤寒', '轮状病毒', '阿米巴性痢疾']
  },
  {
    name: '自然疫源及虫媒传染病',
    icon: <Tent className="w-6 h-6 text-purple-500" />,
    diseases: ['登革热', '疟疾', '寨卡', '黄热病', '鼠疫', '莱姆病', '基孔肯雅热']
  },
  {
    name: '血源及性传播传染病',
    icon: <Activity className="w-6 h-6 text-orange-500" />,
    diseases: ['艾滋病', '乙肝', '丙肝', '梅毒', '猴痘']
  },
  {
    name: '呼吸道传染病',
    icon: <Droplet className="w-6 h-6 text-red-400" />,
    diseases: ['流感', '新冠病毒', '结核病', '麻疹', '白喉', '百日咳']
  }
];

export const DENGUE_TREND_DATA: ChartDataPoint[] = Array.from({ length: 30 }, (_, i) => ({
  name: `11-${i + 1}`,
  value: Math.floor(Math.random() * 500) + 100 + (i * 10), // Simulated rising trend
  value2: Math.floor(Math.random() * 200) + 50
}));