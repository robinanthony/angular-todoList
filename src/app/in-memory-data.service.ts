import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks = [
      { id: 0, name: 'Task 0', description: 'ceci est une première tâche', date: "15/09/2019", fulfill: false },
      { id: 1, name: 'Task 1', description: 'ceci est ma magnifique deuxième tâche', date: "15/12/2019", fulfill: true },
      { id: 3, name: 'Task 3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nisi tellus, egestas et eros nec, sodales aliquet mi. Mauris tempus urna erat, sed rutrum dui vehicula eu. Curabitur at arcu diam. Phasellus augue ipsum, rutrum vitae pretium a, gravida id dui. Nunc semper in ex sed aliquam. Donec vitae accumsan lorem. Fusce egestas dolor a risus scelerisque, quis consectetur neque aliquet. Nunc quis massa tincidunt, aliquet ex id, vestibulum lectus. Sed auctor ultrices dolor, ac gravida tortor ultrices ut. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce ipsum lorem, blandit non tortor nec, consectetur eleifend lorem. Donec mattis ipsum eu euismod convallis. Quisque malesuada massa sit amet tincidunt aliquet. Etiam rutrum, ligula at ultricies mattis, libero ante rutrum sem, at mollis nunc odio non nulla. Donec tristique venenatis purus eget dapibus. Morbi at placerat ante.', date: "16/11/2019", fulfill: true },
      { id: 4, name: 'Naaaan !', description: "j'ai oublié !", date: "05/05/2019", fulfill: false}
    ];
    return {tasks};
  }

  genId(tasks: Task[]): number {
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 0;
  }
}
