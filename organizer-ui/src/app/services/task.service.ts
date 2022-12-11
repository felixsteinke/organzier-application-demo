import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {Task} from "../models/task";
import {Message} from "../models/message";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() {
  }

  public getPriorityOptions(): Observable<string[]> {
    return of(['High', 'Medium', 'Low']);
  }

  public getTask(id: number): Observable<Task> {
    return of({
      id: 1,
      title: 'Test Get',
      entryDate: new Date(2022, 10, 16),
      estimate: 6,
      priority: 'High',
      dueDate: new Date(2023, 5, 16),
      done: false,
      description: 'Test Get'
    });
  }

  public getAllTasks(): Observable<Task[]> {
    return of([
      {
        id: 1,
        title: 'Test GetAll',
        entryDate: new Date(2022, 10, 16),
        estimate: 6,
        priority: 'High',
        dueDate: new Date(2023, 5, 16),
        done: false,
        description: 'Test GetAll'
      }
    ]);
  }

  public addTask(task: Task): Observable<Task> {
    return of(task);
  }

  public updateTask(task: Task): Observable<Task> {
    return of(task);
  }

  public deleteTask(id: number): Observable<Task> {
    return of({
      id: 1,
      title: 'Test Inserted',
      entryDate: new Date(2022, 10, 16),
      estimate: 6,
      priority: 'High',
      dueDate: new Date(2023, 5, 16),
      done: false,
      description: 'Test Inserted'
    });
  }

  public generateTasks(): Observable<Message> {
    return of({
      msg: 'Not generated anything.'
    });
  }
}
