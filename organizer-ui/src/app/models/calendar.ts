export interface Calendar {
  building: string;

  id: number;

  name: string; // 2022 DE BW Building 1
  locale: string; // DE BW
  year: number; // 2022
  days: CalendarDay[];
}

export interface CalendarDay {
  dayMonth: number; // 14
  name: string; // Wednesday
  description: string;
  dayType: CalendarDayType;
}

export interface CalendarDayType {
  name: string;       // Christmas
  description: string; // building is closed
  isBilling: boolean; // false
}

