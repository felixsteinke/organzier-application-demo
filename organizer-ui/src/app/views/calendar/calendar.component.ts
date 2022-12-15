import {Component, OnInit} from '@angular/core';
import {Calendar, CalendarDay} from "../../models/calendar";
import {CalendarType} from "../../enums/calendar-type";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendarDB: Calendar[] = INIT_DB;

  calendar: Calendar = this.calendarDB[0];
  calendarType: CalendarType | undefined = this.getCalendarType(this.calendar.locale, this.calendar.region, this.calendar.building);

  selectedDate: Date = new Date();
  calendarDay: CalendarDay = {};

  constructor() {
  }

  ngOnInit(): void {
  }

  public onSelectedDate(event: Date): void {
    this.selectedDate = event;
    const existingDay = this.filterCalendarDays(event);
    this.calendarDay = existingDay ? existingDay : {};
  }

  private filterCalendarDays(date: Date): CalendarDay | undefined {
    return this.calendar.days.find(cDay => cDay.month === date.getMonth() + 1 && cDay.dayMonth === date.getDate());
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

const INIT_DB: Calendar[] = [
  {
    id: 1,
    locale: 'DE', region: 'BW', building: 'HFT 1',
    name: 'HFT Calendar 2025 (Default)',
    year: 2025,
    days: [
      {
        month: 1, dayMonth: 1,
        description: 'Must be a good day!',
        dayType: {
          name: 'Holiday',
          description: 'Great for everyone.',
          isBilling: false
        }
      },
      {
        month: 2, dayMonth: 2,
        description: 'Must be a good day!',
        dayType: {
          name: 'Holiday',
          description: 'Great for everyone.',
          isBilling: false
        }
      },
      {
        month: 3, dayMonth: 3,
        description: 'Must be a good day!',
        dayType: {
          name: 'Holiday',
          description: 'Great for everyone.',
          isBilling: false
        }
      },
      {
        month: 4, dayMonth: 4,
        description: 'Must be a good day!',
        dayType: {
          name: 'Holiday',
          description: 'Great for everyone.',
          isBilling: false
        }
      },
      {
        month: 5, dayMonth: 5,
        description: 'Must be a good day!',
        dayType: {
          name: 'Holiday',
          description: 'Great for everyone.',
          isBilling: false
        }
      },
      {
        month: 6, dayMonth: 6,
        description: 'Must be a good day!',
        dayType: {
          name: 'Holiday',
          description: 'Great for everyone.',
          isBilling: false
        }
      },
      {
        month: 7, dayMonth: 7,
        description: 'Must be a good day!',
        dayType: {
          name: 'Holiday',
          description: 'Great for everyone.',
          isBilling: false
        }
      },
      {
        month: 8, dayMonth: 8,
        description: 'Must be a good day!',
        dayType: {
          name: 'Holiday',
          description: 'Great for everyone.',
          isBilling: false
        }
      },
      {
        month: 9, dayMonth: 9,
        description: 'Must be a good day!',
        dayType: {
          name: 'Holiday',
          description: 'Great for everyone.',
          isBilling: false
        }
      },
      {
        month: 10, dayMonth: 10,
        description: 'Must be a good day!',
        dayType: {
          name: 'Holiday',
          description: 'Great for everyone.',
          isBilling: false
        }
      },
      {
        month: 11, dayMonth: 11,
        description: 'Must be a good day!',
        dayType: {
          name: 'Holiday',
          description: 'Great for everyone.',
          isBilling: false
        }
      },
      {
        month: 11, dayMonth: 12,
        description: 'Must be a good day!',
        dayType: {
          name: 'Holiday',
          description: 'Great for everyone.',
          isBilling: false
        }
      },
      {
        month: 12, dayMonth: 11,
        description: 'Must be a good day!',
        dayType: {
          name: 'Holiday',
          description: 'Great for everyone.',
          isBilling: false
        }
      },
      {
        month: 12, dayMonth: 12,
        description: 'Must be a good day!',
        dayType: {
          name: 'Holiday',
          description: 'Great for everyone.',
          isBilling: false
        }
      },
      {
        month: 12, dayMonth: 31,
        description: 'Finally its over!!',
        dayType: {
          name: 'Holiday',
          description: 'Great for everyone.',
          isBilling: false
        }
      }
    ]
  }
];
