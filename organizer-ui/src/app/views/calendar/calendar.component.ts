import {Component, OnInit} from '@angular/core';
import {Calendar, CalendarDayType} from "../../models/calendar";
import {CalendarType} from "../../enums/calendar-type";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendar: Calendar | undefined;

  id = 1;
  year: number | undefined = 2023;
  country: string | undefined;
  region: string | undefined;
  building: string | undefined;
  nameC: string | undefined;

  selectedDate: Date = new Date();

  calendarType: CalendarType | undefined;
  nameD: string | undefined;
  description: string | undefined;
  dayType: CalendarDayType | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }
}
