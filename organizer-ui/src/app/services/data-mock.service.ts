import {Injectable} from '@angular/core';
import {Calendar, CalendarDay, CalendarDayType} from "../models/calendar";
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataMockService {

  private calendarDB: Map<number, Calendar> = INIT_CalendarDB;
  private dayTypeDB: Map<number, CalendarDayType> = INIT_DayTypeDB;

  constructor() {
  }

  public getDayTypes(): Observable<CalendarDayType[]> {
    return of(Array.from(this.dayTypeDB.values()));
  }

  public getCalendarBy(id: number): Observable<Calendar> {
    const calendar = this.calendarDB.get(id);
    if (calendar) {
      return of(calendar);
    } else {
      return throwError(() => new Error('ID not found!'));
    }
  }

  public getCountryCalendar(): Observable<Calendar[]> {
    let rootNodes: Calendar[] = [];
    this.calendarDB.forEach((value: Calendar) => {
      if (!value.parentId) {
        rootNodes.push(value);
      }
    });
    return of(rootNodes);
  }

  public getChildCalendarOf(parentId: number): Observable<Calendar[]> {
    let childNotes: Calendar[] = [];
    this.calendarDB.forEach((value: Calendar) => {
      if (value.parentId === parentId) {
        childNotes.push(value);
      }
    });
    return of(childNotes);
  }
}

export const INIT_DayTypeDB: Map<number, CalendarDayType> = new Map([
  [1, {id: 1, name: 'Holiday', description: 'Great for everyone.', isBilling: false}],
  [2, {id: 2, name: 'Optional Closing Day', description: 'Not as great, but still good.', isBilling: true}]
]);


const CountryDays: CalendarDay[] = [
  {
    name: 'eg. monday',
    month: 1, day: 1,
    description: 'e.g. Must be a good day!',
    dayType: INIT_DayTypeDB.get(1)!
  },
  {
    name: 'eg. monday',
    month: 2, day: 2,
    description: 'e.g. Must be a good day!',
    dayType: INIT_DayTypeDB.get(1)!
  },
  {
    name: 'eg. monday',
    month: 3, day: 3,
    description: 'e.g. Must be a good day!',
    dayType: INIT_DayTypeDB.get(1)!
  },
  {
    name: 'eg. monday',
    month: 4, day: 4,
    description: 'e.g. Must be a good day!',
    dayType: INIT_DayTypeDB.get(1)!
  }
];

const RegionDays: CalendarDay[] = [
  {
    name: 'eg. monday',
    month: 5, day: 5,
    description: 'e.g. Must be a good day!',
    dayType: INIT_DayTypeDB.get(1)!
  },
  {
    name: 'eg. monday',
    month: 6, day: 6,
    description: 'e.g. Must be a good day!',
    dayType: INIT_DayTypeDB.get(2)!
  },
  {
    name: 'eg. monday',
    month: 7, day: 7,
    description: 'e.g. Must be a good day!',
    dayType: INIT_DayTypeDB.get(1)!
  },
  {
    name: 'eg. monday',
    month: 8, day: 8,
    description: 'e.g. Must be a good day!',
    dayType: INIT_DayTypeDB.get(2)!
  }
];

const BuildingDays: CalendarDay[] = [
  {
    name: 'eg. monday',
    month: 9, day: 9,
    description: 'e.g. Must be a good day!',
    dayType: INIT_DayTypeDB.get(1)!
  },
  {
    name: 'eg. monday',
    month: 10, day: 10,
    description: 'e.g. Must be a good day!',
    dayType: INIT_DayTypeDB.get(2)!
  },
  {
    name: 'eg. monday',
    month: 11, day: 11,
    description: 'e.g. Must be a good day!',
    dayType: INIT_DayTypeDB.get(1)!
  },
  {
    name: 'eg. monday',
    month: 11, day: 12,
    description: 'e.g. Must be a good day!',
    dayType: INIT_DayTypeDB.get(2)!
  },
  {
    name: 'eg. monday',
    month: 12, day: 11,
    description: 'e.g. Must be a good day!',
    dayType: INIT_DayTypeDB.get(1)!
  },
  {
    name: 'eg. monday',
    month: 12, day: 12,
    description: 'e.g. Must be a good day!',
    dayType: INIT_DayTypeDB.get(2)!
  },
  {
    name: 'eg. monday',
    month: 12, day: 31,
    description: 'Finally its over!!',
    dayType: INIT_DayTypeDB.get(1)!
  }
];

const INIT_CalendarDB: Map<number, Calendar> = new Map([
  [1, {
    id: 1,
    name: 'Calendar Germany 2023',
    locale: 'GER',
    year: 2023,
    days: CountryDays
  }],
  [2, {
    id: 2,
    locale: 'HUN',
    name: 'Calendar Hungary 2025',
    year: 2025,
    days: CountryDays
  }],
  [3, {
    id: 3,
    name: 'Calendar Germany 2025',
    locale: 'GER',
    year: 2025,
    days: CountryDays
  }],
  [4, {
    id: 4,
    parentId: 3,
    name: 'Calendar GER NRW 2025',
    locale: 'GER', region: 'NRW',
    year: 2025,
    days: RegionDays
  }],
  [5, {
    id: 5,
    parentId: 3,
    name: 'Calendar GER BW 2025',
    locale: 'GER', region: 'BW',
    year: 2025,
    days: RegionDays
  }],
  [6, {
    id: 6,
    parentId: 5,
    name: 'HFT Calendar 2025 (Default)',
    locale: 'GER', region: 'BW', building: 'HFT',
    year: 2025,
    days: BuildingDays
  }]
]);
