import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CalendarDayType, DateRange} from "../../../models/calendar";
import {CalendarType} from "../../../enums/calendar-type";
import {DataMockService} from "../../../services/data-mock.service";

@Component({
  selector: 'app-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.scss']
})
export class CalendarItemComponent {

  calendarTypeOptions: CalendarType[] = [
    CalendarType.COUNTRY,
    CalendarType.REGION,
    CalendarType.BUILDING,
  ];
  dayTypeOptions: CalendarDayType[] = [];

  @Input() date: Date | undefined;
  @Input() dateRange: DateRange | undefined;

  @Input() calendarType: CalendarType | undefined = CalendarType.COUNTRY;
  @Output() calendarTypeChange: EventEmitter<CalendarType> = new EventEmitter<CalendarType>();

  @Input() name: string | undefined;
  @Output() nameChange: EventEmitter<string> = new EventEmitter<string>();

  @Input() description: string | undefined;
  @Output() descriptionChange: EventEmitter<string> = new EventEmitter<string>();

  @Input() dayType: CalendarDayType | undefined = this.dayTypeOptions[0];
  @Output() dayTypeChange: EventEmitter<CalendarDayType> = new EventEmitter<CalendarDayType>();

  constructor(private dataService: DataMockService) {
    dataService.getDayTypes().subscribe({
      next: value => this.dayTypeOptions = value,
      error: err => console.error(err)
    });
  }

  public emitCalendarType(): void {
    this.calendarTypeChange.emit(this.calendarType);
  }

  public emitName(): void {
    this.nameChange.emit(this.name);
  }

  public emitDescription(): void {
    this.descriptionChange.emit(this.description);
  }

  public emitDayType(): void {
    this.dayTypeChange.emit(this.dayType);
  }

  public getDayName(date: Date): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()] + " (" + date.getDate() + "." + (date.getMonth() + 1) + ")";
  }
}
