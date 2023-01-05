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

export class CalendarDay {
  month?: number; // 3
  day?: number; // 14
  name?: string; // Wednesday
  description?: string;
  dayType?: CalendarDayType;

  public constructor(init?: Partial<CalendarDay>) {
    Object.assign(this, init);
  }

  public setDate(date: Date): void {
    this.month = date.getMonth() + 1;
    this.day = date.getDate();
  }

  public isUndefined(): boolean {
    return !this.month || !this.day;
  }
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
