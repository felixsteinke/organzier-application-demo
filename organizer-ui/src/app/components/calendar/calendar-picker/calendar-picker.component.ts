import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CalendarDay, DateRange} from "../../../models/calendar";

interface MonthItem {
  monthOfYear: number;
  name: string;
  calendarDays: number;
}

@Component({
  selector: 'app-calendar-picker[year]',
  templateUrl: './calendar-picker.component.html',
  styleUrls: ['./calendar-picker.component.scss']
})
export class CalendarPickerComponent implements OnInit, OnChanges {

  monthRow1: MonthItem[] = [
    {monthOfYear: 1, name: 'JAN', calendarDays: 1},
    {monthOfYear: 2, name: 'FEB', calendarDays: 2},
    {monthOfYear: 3, name: 'MAR', calendarDays: 3},
    {monthOfYear: 4, name: 'APR', calendarDays: 4},
    {monthOfYear: 5, name: 'MAY', calendarDays: 5},
    {monthOfYear: 6, name: 'JUN', calendarDays: 6},
  ];
  monthRow2: MonthItem[] = [
    {monthOfYear: 7, name: 'JUL', calendarDays: 7},
    {monthOfYear: 8, name: 'AUG', calendarDays: 8},
    {monthOfYear: 9, name: 'SEP', calendarDays: 9},
    {monthOfYear: 10, name: 'OCT', calendarDays: 10},
    {monthOfYear: 11, name: 'NOV', calendarDays: 11},
    {monthOfYear: 12, name: 'DEC', calendarDays: 12},
  ];

  @Input() year: number | undefined;
  minDate: Date | undefined;
  maxDate: Date | undefined;

  @Input() calendarDays: CalendarDay[] = [];
  @Output() selectedRange: EventEmitter<DateRange> = new EventEmitter<DateRange>();

  selected: Date | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.year) {
      this.minDate = new Date(this.year, 0, 1);
      this.maxDate = new Date(this.year, 11, 31);
    }

  }

  public emitCalendar(): void {
    this.selectedRange.emit({
      start: new Date(),
      end: new Date()
    });
  }
}
