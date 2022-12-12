import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  selectedTaskId: number | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

  public onSelectedTaskId(event: number): void {
    this.selectedTaskId = event;
  }
}
