import {Component} from '@angular/core';
import {Calendar, CalendarDay} from "../../models/calendar";
import {CalendarType} from "../../enums/calendar-type";
import {DataMockService, INIT_DayTypeDB} from "../../services/data-mock.service";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  calendar: Calendar = {
    id: 0,
    name: '',
    locale: '',
    year: 2023,
    days: []
  };
  calendarType: CalendarType | undefined;

  selectedDate: Date = new Date();
  calendarDay: CalendarDay = {
    month: 0,
    day: 0,
    name: '',
    dayType: INIT_DayTypeDB.get(1)!
  };

  constructor(private dataService: DataMockService) {
  }

  public onSelectedDate(event: Date): void {
    this.selectedDate = event;
    const existingDay = this.filterCalendarDays(event);
    this.calendarDay = existingDay ? existingDay : {
      month: 0,
      day: 0,
      name: '',
      dayType: INIT_DayTypeDB.get(1)!
    };
  }

  private filterCalendarDays(date: Date): CalendarDay | undefined {
    if (this.calendar) {
      return this.calendar.days.find(cDay => cDay.month === date.getMonth() + 1 && cDay.day === date.getDate());
    } else {
      return undefined;
    }
  }

  private getCalendarType(c1: string | undefined, c2: string | undefined, c3: string | undefined): CalendarType | undefined {
    if (c3) {
      return CalendarType.BUILDING;
    } else if (c2) {
      return CalendarType.REGION;
    } else if (c1) {
      return CalendarType.COUNTRY;
    } else {
      return undefined;
    }
  }
}
