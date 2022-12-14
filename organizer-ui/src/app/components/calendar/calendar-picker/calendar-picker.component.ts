import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CalendarDay, DateRange} from "../../../models/calendar";


@Component({
  selector: 'app-calendar-picker[year]',
  templateUrl: './calendar-picker.component.html',
  styleUrls: ['./calendar-picker.component.scss']
})
export class CalendarPickerComponent implements OnInit, OnChanges {

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
