import { Component, OnInit } from '@angular/core';

import { Task } from '../task';
import { TaskService } from '../task.service';

import * as moment from 'moment';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.get();
  }

  get(): void {
    this.taskService.getTasks()
    .subscribe(tasks => this.tasks = tasks.sort(
      (a, b) => {
        // var moment = require('moment');

        if (moment(a.date, "DD/MM/YYYY").isSame(moment(b.date, "DD/MM/YYYY"))){
          return 0;
        }
        if (moment(a.date, "DD/MM/YYYY").isBefore(moment(b.date, "DD/MM/YYYY"))){
          return -1;
        }
        return 1;
      }
    ));
  }

  getColor(task: Task): string {
    // var moment = require('moment');

    if(task.fulfill){
      return "vert";
    }

    if (moment(task.date, "DD/MM/YYYY").isBefore(moment())) {
      return "rouge";
    }

    return "bleu";
  }

  taskFulfill(task: Task): void {
    task.fulfill = !task.fulfill;
    this.taskService.updateTask(task).subscribe();
  }

  taskDelete(task: Task): void{
    this.taskService.deleteTask(task).subscribe();
    this.get();
  }
}
