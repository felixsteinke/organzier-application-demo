import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TaskService} from "../../../services/task.service";
import {Task} from "../../../models/task";
import {MatDialog} from "@angular/material/dialog";
import {OpenErrorDialog, OpenWarnSnackBar} from "../../../materials/feedback";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit, OnChanges {

  @Input() taskId = 1;

  task: Task = {};
  priorityOptions: string[] = [];
  isLoading: boolean = false;

  constructor(private taskService: TaskService,
              private matDialog: MatDialog,
              private matSnackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getPriorityOptions();
    this.getTask();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Change object:" + changes + "; Input value: " + this.taskId);
    this.getTask();
  }

  public getPriorityOptions(): void {
    this.taskService.getPriorityOptions().subscribe({
      next: (value) => this.priorityOptions = value,
      error: (error) => {
        console.log(error);
        OpenWarnSnackBar(this.matSnackbar, error.message);
      }
    });
  }

  public getTask(): void {
    this.isLoading = true;
    this.taskService.getTask(this.taskId).subscribe({
      next: (value) => this.task = value,
      error: (error) => {
        console.log(error);
        OpenErrorDialog(this.matDialog, error.message);
      }
    }).add(() => this.isLoading = false);
  }

  public addTask(): void {
    this.isLoading = true;
    this.taskService.addTask(this.task).subscribe({
      next: (value) => this.task = value,
      error: (error) => {
        console.log(error);
        OpenErrorDialog(this.matDialog, error.message);
      }
    }).add(() => this.isLoading = false);
  }

  public updateTask(): void {
    this.isLoading = true;
    this.taskService.updateTask(this.task).subscribe({
      next: (value) => this.task = value,
      error: (error) => {
        console.log(error);
        OpenErrorDialog(this.matDialog, error.message);
      }
    }).add(() => this.isLoading = false);
  }

  public deleteTask(): void {
    if (this.task.id) {
      this.isLoading = true;
      this.taskService.deleteTask(this.task.id).subscribe({
        next: (value) => this.task = value,
        error: (error) => {
          console.log(error);
          OpenErrorDialog(this.matDialog, error.message);
        }
      }).add(() => this.isLoading = false);
    } else {
      console.log("User Error: task.id is undefined");
      OpenErrorDialog(this.matDialog, "task.id is undefined");
    }
  }
}
