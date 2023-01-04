import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CalendarDay, CalendarDayType} from "../../../models/calendar";
import {DataMockService} from "../../../services/data-mock.service";
import {CalendarType} from "../../../views/calendar/calendar.component";

@Component({
  selector: 'app-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.scss']
})
export class CalendarItemComponent {

  calendarTypeOptions: CalendarType[] = [];
  dayTypeOptions: CalendarDayType[] = [];

  @Input() date: Date | undefined;
  @Input() enabled: boolean | undefined;

  @Input() calendarType: CalendarType | undefined;
  @Output() calendarTypeChange: EventEmitter<CalendarType> = new EventEmitter<CalendarType>();

  @Input() calendarDay: CalendarDay | undefined;
  @Output() calendarDayChange: EventEmitter<CalendarDay> = new EventEmitter<CalendarDay>();

  constructor(private dataService: DataMockService) {
    this.calendarTypeOptions = [
      CalendarType.COUNTRY,
      CalendarType.REGION,
      CalendarType.BUILDING,
    ]
    dataService.getDayTypes().subscribe({
      next: value => this.dayTypeOptions = value,
    });
  }

  public emitCalendarType(): void {
    this.calendarTypeChange.emit(this.calendarType);
  }

  public emitCalendarDay(): void {
    this.calendarDayChange.emit(this.calendarDay);
  }

  public transformDateTitle(date: Date): string {
    return this.getDayName(date) + " (" + date.getDate() + "." + (date.getMonth() + 1) + ")";
  }

  public getDayName(date: Date): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  }
}
