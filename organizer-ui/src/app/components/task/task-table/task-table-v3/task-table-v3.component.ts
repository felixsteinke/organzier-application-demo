import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {Task} from "../../../../models/task";
import {CellClickedEvent, ColDef, GridReadyEvent} from "ag-grid-community";
import {AgGridAngular} from "ag-grid-angular";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-task-table-v3',
  templateUrl: './task-table-v3.component.html',
  styleUrls: ['./task-table-v3.component.scss']
})
export class TaskTableV3Component {
  // Each Column Definition results in one Column.
  columnDefs: ColDef[] = [
    {field: 'make'},
    {field: 'model'},
    {field: 'price'}
  ];
  // DefaultColDef sets props common to all Columns
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };
  rowData$!: Observable<any[]>; // Data that gets displayed in the grid
  isLoading = true;

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular; // For accessing the Grid's API

  @Output() selectedTaskId = new EventEmitter<number>();

  constructor(private http: HttpClient) {
  }

  // Example load data from sever
  public onGridReady(params: GridReadyEvent): void {
    this.rowData$ = this.http.get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
  }

  // Example of consuming Grid Event
  public onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

  public clickRow(row: Task) {
    this.selectedTaskId.emit(row.id);
  }
}
