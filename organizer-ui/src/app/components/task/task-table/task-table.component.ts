import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss']
})
export class TaskTableComponent implements OnInit {

  selectedOption: number = 1;

  constructor() {
  }

  ngOnInit(): void {
  }
}
