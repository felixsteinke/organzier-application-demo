import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {Task} from "../models/task";
import {Message} from "../models/message";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private controllerUrl = environment.backendApiHost + '/api/task';
  private defaultHeaders = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) {
  }

  public getPriorityOptions(): Observable<string[]> {
    // TODO implement priority options endpoint
    return of(['NONE', 'LOW', 'MEDIUM', 'HIGH']);
  }

  public getTask(id: number): Observable<Task> {
    const endpointUrl = this.controllerUrl + '/' + id;
    return this.httpClient.get <Task>(endpointUrl, this.defaultHeaders);
  }

  public getAllTasks(): Observable<Task[]> {
    const endpointUrl = this.controllerUrl + '/all';
    return this.httpClient.get <Task[]>(endpointUrl, this.defaultHeaders);
  }

  public addTask(task: Task): Observable<Task> {
    const endpointUrl = this.controllerUrl;
    return this.httpClient.post <Task>(endpointUrl, task, this.defaultHeaders);
  }

  public updateTask(task: Task): Observable<Task> {
    const endpointUrl = this.controllerUrl;
    return this.httpClient.put <Task>(endpointUrl, task, this.defaultHeaders);
  }

  public deleteTask(id: number): Observable<Task> {
    const endpointUrl = this.controllerUrl + '/' + id;
    return this.httpClient.delete <Task>(endpointUrl, this.defaultHeaders);
  }

  public generateTasks(): Observable<Message> {
    const endpointUrl = this.controllerUrl + '/generate';
    return this.httpClient.post <Message>(endpointUrl, this.defaultHeaders);
  }
}
