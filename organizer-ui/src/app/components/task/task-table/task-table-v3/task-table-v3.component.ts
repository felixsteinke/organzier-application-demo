import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Task} from "../../../../models/task";

@Component({
  selector: 'app-task-table-v3',
  templateUrl: './task-table-v3.component.html',
  styleUrls: ['./task-table-v3.component.scss']
})
export class TaskTableV3Component implements OnInit {

  @Output() selectedTaskId = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  public clickRow(row: Task) {
    this.selectedTaskId.emit(row.id);
  }
}
