import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
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
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Crear proyecto',
      completed: false
    },
    {
      id: Date.now(),
      title: 'Crear componentes',
      completed: false
    }
  ]);

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required
    ]
  })

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
}
