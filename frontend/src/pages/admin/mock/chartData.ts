export interface IChartPoint {
  month: string;
  value: number;
}

export interface ICategoryCount {
  name: string;
  count: number;
}

export const ENROLLMENT_TREND: IChartPoint[] = [
  { month: "Jan", value: 420 },
  { month: "Feb", value: 580 },
  { month: "Mar", value: 750 },
  { month: "Apr", value: 620 },
  { month: "May", value: 910 },
  { month: "Jun", value: 1100 },
  { month: "Jul", value: 980 },
  { month: "Aug", value: 1250 },
  { month: "Sep", value: 1400 },
  { month: "Oct", value: 1350 },
  { month: "Nov", value: 1600 },
  { month: "Dec", value: 1850 },
];

export const SPARKLINE_DATA: Record<string, IChartPoint[]> = {
  "Total Courses": [
    { month: "Jan", value: 12 }, { month: "Feb", value: 14 },
    { month: "Mar", value: 15 }, { month: "Apr", value: 17 },
    { month: "May", value: 18 }, { month: "Jun", value: 20 },
    { month: "Jul", value: 20 }, { month: "Aug", value: 21 },
    { month: "Sep", value: 22 }, { month: "Oct", value: 23 },
    { month: "Nov", value: 24 }, { month: "Dec", value: 24 },
  ],
  "Active Students": [
    { month: "Jan", value: 320 }, { month: "Feb", value: 450 },
    { month: "Mar", value: 520 }, { month: "Apr", value: 610 },
    { month: "May", value: 730 }, { month: "Jun", value: 850 },
    { month: "Jul", value: 920 }, { month: "Aug", value: 1050 },
    { month: "Sep", value: 1150 }, { month: "Oct", value: 1220 },
    { month: "Nov", value: 1320 }, { month: "Dec", value: 1402 },
  ],
  "Platform Revenue": [
    { month: "Jan", value: 2100 }, { month: "Feb", value: 3400 },
    { month: "Mar", value: 4500 }, { month: "Apr", value: 5200 },
    { month: "May", value: 6100 }, { month: "Jun", value: 7300 },
    { month: "Jul", value: 6900 }, { month: "Aug", value: 8200 },
    { month: "Sep", value: 9500 }, { month: "Oct", value: 10100 },
    { month: "Nov", value: 11200 }, { month: "Dec", value: 12450 },
  ],
  "Completion Rate": [
    { month: "Jan", value: 62 }, { month: "Feb", value: 65 },
    { month: "Mar", value: 68 }, { month: "Apr", value: 71 },
    { month: "May", value: 74 }, { month: "Jun", value: 76 },
    { month: "Jul", value: 78 }, { month: "Aug", value: 80 },
    { month: "Sep", value: 82 }, { month: "Oct", value: 84 },
    { month: "Nov", value: 85 }, { month: "Dec", value: 87 },
  ],
};

export const COURSES_BY_CATEGORY: ICategoryCount[] = [
  { name: "Technology", count: 8 },
  { name: "Design", count: 5 },
  { name: "Business", count: 4 },
  { name: "Science", count: 4 },
  { name: "University", count: 3 },
];
