import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  constructor(private taskService: TaskService, private location: Location) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

  add(name: string, description: string, date: string): void {
    name = name.trim();
    description = description.trim();

    let fulfill: boolean;
    fulfill = false;

    if (!name) { return; }
    if (!date) { return; }

    console.log(date)
    this.taskService.addTask({ name, description, date, fulfill } as Task).subscribe(() => this.goBack());
  }
}
