import {Component} from '@angular/core';
import {Calendar, CalendarDay} from "../../models/calendar";
import {DataMockService} from "../../services/data-mock.service";
import {DynamicFlatNode} from "../../components/calendar/calendar-select/dynamic-tree-data-source";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  year: number = new Date().getFullYear();
  calendars: Map<number, Calendar> = new Map();
  selectedDate: Date | undefined = new Date();
  calendarItemEnabled = false;
  calendarItemType: CalendarType = CalendarType.NONE;
  calendarItemDay: CalendarDay = new CalendarDay();

  calendarDays(): CalendarDay [] {
    let days: CalendarDay[] = [];
    this.calendars.forEach((calendar) => days = [...calendar.days])
    return days;
  }

  constructor(private dataService: DataMockService) {
  }

  public transformCalendarTitle(calendars: Map<number, Calendar>): string {
    const sortedArray = [...calendars].sort(([key1, value1], [key2, value2]) => key1 - key2);
    let title: string = '';
    for (let i = 0; i < sortedArray.length; i++) {
      title += sortedArray[i][1].name;
      if (i < sortedArray.length - 1) {
        title += ' > '
      }
    }
    return title;
  }

  public onSelectedDate(event: Date): void {
    this.selectedDate = event;
    this.updateCalendarItemData(event);
  }

  public onNewDay(): void {
    if (this.selectedDate && this.calendars) {
      this.calendars.forEach((calendar, level) => {
        if (level > this.calendarItemType) {
          this.calendarItemType = level;
        }
      });
      this.calendarItemDay = new CalendarDay();
      this.calendarItemDay.setDate(this.selectedDate);
      this.calendarItemEnabled = true;
    }
  }

  private onCalendarSelect(calendarNodes: DynamicFlatNode[]): void {
    this.calendars.clear();
    for (let i = 0; i < calendarNodes.length; i++) {
      this.calendars.set(calendarNodes[i].level, calendarNodes[i].item);
    }
  }

  private updateCalendarItemData(date: Date): void {
    this.calendarItemEnabled = false;
    this.calendars.forEach((calendar, level) => {
      const day = calendar.days.find(cDay => cDay.month === date.getMonth() + 1 && cDay.day === date.getDate());
      if (day) {
        this.calendarItemType = level;
        this.calendarItemDay = day;
        return;
      }
    });
    this.calendarItemType = CalendarType.NONE;
    this.calendarItemDay = new CalendarDay();
  }
}

export enum CalendarType {
  NONE,
  COUNTRY,
  REGION,
  BUILDING
}
