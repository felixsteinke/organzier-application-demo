import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {TaskService} from "../../../../services/task.service";
import {OpenErrorDialog} from "../../../../materials/feedback";
import {Task} from "../../../../models/task";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-task-table-v1',
  templateUrl: './task-table-v1.component.html',
  styleUrls: ['./task-table-v1.component.scss']
})
export class TaskTableV1Component implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['title', 'estimate', 'priority', 'due', 'done', 'description'];
  data: Task[] = [];
  resultsLength = 0;
  isLoading = true;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(private taskService: TaskService,
              private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.taskService.getAllTasks().subscribe({
      next: (value) => {
        this.resultsLength = value.length;
        this.data = value;
      },
      error: (error) => {
        console.log(error);
        OpenErrorDialog(this.matDialog, error.message);
      }
    }).add(() => this.isLoading = false);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
}
