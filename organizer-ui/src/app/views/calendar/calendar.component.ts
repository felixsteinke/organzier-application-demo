import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import * as moment from "moment";
import {Moment} from "moment";
import {MatDatepicker} from "@angular/material/datepicker";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {Calendar, CalendarDayType} from "../../models/calendar";
import {CalendarType} from "../../enums/calendar-type";

const YEAR_PICKER_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
    {provide: MAT_DATE_FORMATS, useValue: YEAR_PICKER_FORMATS}
  ]
})
export class CalendarComponent implements OnInit {

  yearPicker = new FormControl(moment());
  calendar: Calendar = {};

  selectedDate: Date = new Date();
  calendarType: CalendarType | undefined;
  name: string | undefined;
  description: string | undefined;
  dayType: CalendarDayType | undefined;

  constructor() {
  }

  ngOnInit(): void {
    this.initYearPickerValue();
  }

  public updateYearPickerValue(normalizedYear: Moment, datepicker: MatDatepicker<any>): void {
    this.yearPicker.setValue(normalizedYear);
    this.calendar.year = normalizedYear.year();
    datepicker.close();
  }

  private initYearPickerValue(): void {
    if (this.calendar.year) {
      this.yearPicker.setValue(moment().year(this.calendar.year));
    }
  }
}
