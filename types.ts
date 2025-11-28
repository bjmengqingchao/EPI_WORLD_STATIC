export interface OutbreakEvent {
  id: string;
  country: string;
  countryCode: string; // ISO 2-letter code for flags
  disease: string;
  date: string;
  source: string;
  summary: string;
  cases: number;
  deaths: number;
  trend: 'up' | 'down' | 'stable';
  lat: number;
  lng: number;
}

export interface DiseaseCategory {
  name: string;
  icon: React.ReactNode;
  diseases: string[];
}

export interface ChartDataPoint {
  name: string;
  value: number;
  value2?: number;
}

export enum ReportType {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  SPECIAL = 'SPECIAL'
}