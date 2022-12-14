export interface Calendar {
  id?: number;
  locale?: string; // DE
  region?: string; // BW
  building?: string; // HFT 1

  name?: string; // 2022 DE BW Building 1

  year?: number; // 2022
  days?: CalendarDay[];
  extendedDays?: CalendarDay[]; // used for UI
}

export interface CalendarDay {
  dayMonth?: number; // 14
  name?: string; // Wednesday
  description?: string;
  dayType?: CalendarDayType;
}

export interface CalendarDayType {
  name?: string;       // Christmas
  description?: string; // building is closed
  isBilling?: boolean; // false
}

export interface DateRange {
  start: Date;
  end: Date;
}
