import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, Inject, Injector, signal } from '@angular/core';
import { Task } from '../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]>([]);

  filter = signal<'all' | 'pending' | 'completed'>('all')

  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();

    if(filter === 'pending'){
      return tasks.filter(task => !task.completed)
    }
    else if(filter === 'completed'){
      return tasks.filter(task => task.completed)
    }
    return tasks;
  })

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required
    ]
  })

  injector = inject(Injector);

  ngOnInit(){
    const storage = localStorage.getItem('tasks');
    if(storage){
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
    }
    this.trackTasks()
  }

  trackTasks(){
    effect(() => {
      const tasks = this.tasks();
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, {injector: this.injector})
  }

  changeHandler(){
    if(this.newTaskCtrl.valid && this.newTaskCtrl.value.trim().length !== 0){
      this.addTask(this.newTaskCtrl.value);
      this.newTaskCtrl.setValue('');
    }
  }

  addTask(title: string){
    const newTask: Task = {
      id: Date.now(),
      title: title,
      completed: false
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  deleteTask(index: number){
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index));
  }

  markTask(index: number){
    this.tasks.update((tasks) =>
      tasks.map((task, position) => index === position ? {...task, completed: !task.completed}: task)
    );
  }

  updateTaskEditingMode(index: number){
    this.tasks.update(prevstate => 
      prevstate.map((task, position) => index === position ? {...task, editing: true}: {...task, editing: false})
    );
  }

  updateTaskText(index: number, event: Event){
    const input = event.target as HTMLInputElement;
    this.tasks.update(prevState =>
      prevState.map((task, position) => index === position ? {...task, title: input.value, editing: false}: task)
    )
  }

  changeFilter(filter: 'all' | 'pending' | 'completed'){
    this.filter.set(filter);
  }
}
