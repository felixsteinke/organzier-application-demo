import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {FormControl} from "@angular/forms";
import * as moment from "moment/moment";
import {Moment} from "moment/moment";
import {MatDatepicker} from "@angular/material/datepicker";
import {FlatTreeControl} from "@angular/cdk/tree";
import {DataMockService} from "../../../services/data-mock.service";
import {DynamicDataSource, DynamicFlatNode} from "./dynamic-tree-data-source";

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

  @Input() year: number | undefined;
  @Output() yearChange: EventEmitter<number> = new EventEmitter<number>();

  treeControl: FlatTreeControl<DynamicFlatNode>;
  dataSource: DynamicDataSource;

  constructor(dataService: DataMockService) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(
      (node: DynamicFlatNode) => node.level,
      (node: DynamicFlatNode) => node.expandable
    );
    this.dataSource = new DynamicDataSource(this.treeControl, dataService);
    dataService.getRootCalendars().subscribe({
      // TODO do not set all to expandable!
      next: value => this.dataSource.data = value.map(calendar => new DynamicFlatNode(calendar, 0, true))
    })
  }

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;

  ngOnInit(): void {
    this.updateYearPickerValue();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateYearPickerValue();
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
