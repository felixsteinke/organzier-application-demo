import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {CalendarDay} from "../../../models/calendar";
import {MatCalendar, MatCalendarCellClassFunction, MatCalendarCellCssClasses} from "@angular/material/datepicker";

interface MonthItem {
  month: number;
  name: string;
}

const MonthRow1: MonthItem[] = [
  {month: 1, name: 'JAN'},
  {month: 2, name: 'FEB'},
  {month: 3, name: 'MAR'},
  {month: 4, name: 'APR'},
  {month: 5, name: 'MAY'},
  {month: 6, name: 'JUN'},
];

const MonthRow2: MonthItem[] = [
  {month: 7, name: 'JUL'},
  {month: 8, name: 'AUG'},
  {month: 9, name: 'SEP'},
  {month: 10, name: 'OCT'},
  {month: 11, name: 'NOV'},
  {month: 12, name: 'DEC'},
];

@Component({
  selector: 'app-calendar-picker[year]',
  templateUrl: './calendar-picker.component.html',
  styleUrls: ['./calendar-picker.component.scss']
})
export class CalendarPickerComponent implements OnChanges, AfterViewInit {

  monthRow1 = MonthRow1;
  monthRow2 = MonthRow2;

  viewMonth: number = 6;
  @Input('year') viewYear: number | undefined;
  viewDate: Date = this.getViewDate();
  @ViewChild(MatCalendar) calendar: MatCalendar<Date> | undefined;

  @Input() calendarDays: CalendarDay[] = [];

  selectedDate: Date | undefined;
  @Output('selectedDate') selectedDateChange: EventEmitter<Date> = new EventEmitter<Date>();

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.resetSelectedDate();
    this.updateCalendarView();
  }

  ngAfterViewInit(): void {
    this.updateCalendarView();
  }

  public emitSelectedDate(): void {
    this.selectedDateChange.emit(this.selectedDate);
  }

  public clickMonth(month: number) {
    this.viewMonth = month;
    this.updateCalendarView();
  }

  public getCalendarDaysCount(month: number, calendarDays: CalendarDay[]): number {
    return calendarDays.filter((day) => day.month === month).length;
  }

  public highlightDates(): MatCalendarCellClassFunction<any> {
    const highlightedDates = this.calendarDays.map((cDay) => {
      if (this.viewYear && cDay.month && cDay.day) {
        return new Date(this.viewYear, cDay.month - 1, cDay.day);
      } else {
        return undefined;
      }
    }).filter((date) => date !== undefined);
    return (date: Date): MatCalendarCellCssClasses => {
      const highlightDate = highlightedDates
        .some((d) => d !== undefined && d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());
      // if (highlightDate) console.log(date + ' sollte rot sein')
      return highlightDate ? 'highlight-calendar-date' : '';
    };
  }

  private resetSelectedDate(): void {
    this.selectedDate = undefined;
    this.emitSelectedDate();
  }

  private updateCalendarView(): void {
    this.viewDate = this.getViewDate();
    if (this.calendar) {
      this.calendar.minDate = null;
      this.calendar.maxDate = null;
      //this.calendar.updateTodaysDate();
      this.calendar._goToDateInView(this.viewDate, "month");
      this.calendar.minDate = this.viewYear ? new Date(this.viewYear, 0, 1) : null;
      this.calendar.maxDate = this.viewYear ? new Date(this.viewYear, 11, 31) : null;
    }
    // console.log(this.calendar);
  }

  private getViewDate(): Date {
    if (this.viewYear && this.viewMonth) {
      return new Date(this.viewYear, this.viewMonth - 1);
    } else if (this.viewYear) {
      return new Date(this.viewYear);
    } else {
      return new Date();
    }
  }
}
