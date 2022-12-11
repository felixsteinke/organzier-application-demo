import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TaskService} from "../../../services/task.service";
import {Task} from "../../../models/task";

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

  constructor(private taskService: TaskService) {
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
      error: (error) => console.log(error)
    });
  }

  public getTask(): void {
    this.isLoading = true;
    this.taskService.getTask(this.taskId).subscribe({
      next: (value) => this.task = value,
      error: (error) => console.log(error)
    }).add(() => this.isLoading = false);
  }

  public addTask(): void {
    this.isLoading = true;
    this.taskService.addTask(this.task).subscribe({
      next: (value) => this.task = value,
      error: (error) => console.log(error)
    }).add(() => this.isLoading = false);
  }

  public updateTask(): void {
    this.isLoading = true;
    this.taskService.updateTask(this.task).subscribe({
      next: (value) => this.task = value,
      error: (error) => console.log(error)
    }).add(() => this.isLoading = false);
  }

  public deleteTask(): void {
    if (this.task.id) {
      this.isLoading = true;
      this.taskService.deleteTask(this.task.id).subscribe({
        next: (value) => this.task = value,
        error: (error) => console.log(error)
      }).add(() => this.isLoading = false);
    } else {
      console.log("User Error: task.id is undefined")
    }
  }
}
