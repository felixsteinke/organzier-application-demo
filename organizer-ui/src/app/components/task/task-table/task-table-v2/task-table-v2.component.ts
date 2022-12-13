import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {Task} from "../../../../models/task";
import {CellClickedEvent, ColDef, GridReadyEvent} from "ag-grid-community";
import {Observable} from "rxjs";
import {AgGridAngular} from "ag-grid-angular";
import {TaskService} from "../../../../services/task.service";

@Component({
  selector: 'app-task-table-v2',
  templateUrl: './task-table-v2.component.html',
  styleUrls: ['./task-table-v2.component.scss']
})
export class TaskTableV2Component {
  // Each Column Definition results in one Column.
  columnDefs: ColDef[] = [
    {field: 'title'},
    {field: 'estimate'},
    {field: 'priority'},
    {field: 'dueDate'},
    {field: 'done'},
    {field: 'description'},
  ];
  // DefaultColDef sets props common to all Columns
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };
  rowData$!: Observable<Task[]>; // Data that gets displayed in the grid

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular; // For accessing the Grid's API

  @Output() selectedTaskId = new EventEmitter<number>();

  constructor(private taskService: TaskService) {
  }

  // Example load data from sever
  public onGridReady(params: GridReadyEvent): void {
    this.rowData$ = this.taskService.getAllTasks();
  }

  // Example of consuming Grid Event
  public onCellClicked(e: CellClickedEvent): void {
    this.selectedTaskId.emit(e.data.id);
  }

  // Example using Grid's API
  public clearSelection(): void {
    this.agGrid.api.deselectAll();
  }


  public clickRow(row: Task) {
    this.selectedTaskId.emit(row.id);
  }
}
