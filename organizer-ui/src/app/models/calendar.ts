export interface Calendar {
  id: number; // (generated PK)
  parentId?: number;

  name: string; // 2022 DE BW Building 1

  locale: string; // DE
  region?: string; // BW
  building?: string; // HFT 1

  year: number; // 2022
  days: CalendarDay[];
}

export interface CalendarDay {
  month: number; // 3
  day: number; // 14
  name: string; // Wednesday
  description?: string;
  dayType: CalendarDayType;
}

export interface CalendarDayType {
  id: number
  name: string;       // Christmas
  description?: string; // building is closed
  isBilling: boolean; // false
}

export interface DateRange {
  start: Date;
  end: Date;
}
