import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OpenErrorDialog, OpenSnackBar} from "../../../materials/feedback";
import {MatDialog} from "@angular/material/dialog";
import {TaskService} from "../../../services/task.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss']
})
export class TaskTableComponent implements OnInit {

  selectedTableOption: number = 1;
  isLoading: boolean = false;

  @Output() selectedTaskId = new EventEmitter<number>();

  constructor(private taskService: TaskService,
              private matDialog: MatDialog,
              private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  public onSelectedTaskId(event: number): void {
    this.selectedTaskId.emit(event);
  }

  public generateTasks(): void {
    this.isLoading = true;
    this.taskService.generateTasks().subscribe({
      next: (value) => OpenSnackBar(this.matSnackBar, value.msg ? value.msg : 'Successful without message.'),
      error: (error) => {
        console.log(error);
        OpenErrorDialog(this.matDialog, error.message);
      }
    }).add(() => this.isLoading = false);
  }
}
