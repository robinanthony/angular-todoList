import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Task } from './task'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskUrl = 'api/tasks'; // URL de l'API web

  constructor( private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskUrl)
      .pipe(
        catchError(this.handleError<Task[]>('getTasks', []))
      );
  }

    getTask(id: number): Observable<Task> {
      const url = `${this.taskUrl}/${id}`;
      return this.http.get<Task>(url).pipe(
        catchError(this.handleError<Task>(`getTask id=${id}`))
      );
    }

    //////////////////////// REST methods //////////////////////////

    /** POST: add a new task to the server */
    addTask (task: Task): Observable<Task> {

      return this.http.post<Task>(this.taskUrl, task, httpOptions).pipe(
        catchError(this.handleError<Task>('addTask'))
      );
    }

    /** DELETE: delete the task from the server */
    deleteTask (task: Task | number): Observable<Task> {
      const id = typeof task === 'number' ? task : task.id;
      const url = `${this.taskUrl}/${id}`;

      return this.http.delete<Task>(url, httpOptions).pipe(
        catchError(this.handleError<Task>('deleteTask'))
      );
    }

    /** PUT: update the task on the server */
    updateTask (task: Task): Observable<any> {
      return this.http.put(this.taskUrl, task, httpOptions).pipe(
        catchError(this.handleError<any>('updateTask'))
      );
    }
}
