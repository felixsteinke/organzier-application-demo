import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {FormControl} from "@angular/forms";
import * as moment from "moment/moment";
import {Moment} from "moment/moment";
import {MatDatepicker} from "@angular/material/datepicker";

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
  selector: 'app-calendar-select',
  templateUrl: './calendar-select.component.html',
  styleUrls: ['./calendar-select.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
    {provide: MAT_DATE_FORMATS, useValue: YEAR_PICKER_FORMATS}
  ]
})
export class CalendarSelectComponent implements OnInit, OnChanges {

  yearPicker = new FormControl();

  @Input() id: number | undefined;

  @Input() year: number | undefined;
  @Output() yearChange: EventEmitter<number> = new EventEmitter<number>();

  @Input() country: string | undefined;
  @Output() countryChange: EventEmitter<string> = new EventEmitter<string>();

  @Input() region: string | undefined;
  @Output() regionChange: EventEmitter<string> = new EventEmitter<string>();

  @Input() building: string | undefined;
  @Output() buildingChange: EventEmitter<string> = new EventEmitter<string>();

  @Input() name: string | undefined;
  @Output() nameChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
    this.updateYearPickerValue();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateYearPickerValue();
  }

  public emitCountry(): void {
    this.countryChange.emit(this.country);
  }

  public emitRegion(): void {
    this.regionChange.emit(this.region);
  }

  public emitBuilding(): void {
    this.buildingChange.emit(this.building);
  }

  public emitName(): void {
    this.nameChange.emit(this.name);
  }

  public emitYearValue(normalizedYear: Moment, datepicker: MatDatepicker<any>): void {
    this.yearPicker.setValue(normalizedYear);
    this.year = normalizedYear.year();
    this.yearChange.emit(this.year);
    datepicker.close();
  }

  private updateYearPickerValue(): void {
    if (this.year) {
      this.yearPicker.setValue(moment().year(this.year));
    }
  }
}
