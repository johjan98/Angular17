import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Hola!!';
  tasks = signal([
    'Instalar Angular CLI',
    'Crear proyecto',
    'Crear componentes'
  ]);
  name = signal('Johjan');
  age = 25;
  disable = true;
  img = 'https://picsum.photos/200';

  person = signal({
    name: 'Juan',
    age: 17,
    image: 'https://picsum.photos/200'
  });

  colorCtrl = new FormControl();
  widthCtrl = new FormControl(50, {
    nonNullable: true
  });
  nameCtrl = new FormControl('johjan', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3)
    ]
  })

  constructor(){
    this.colorCtrl.valueChanges.subscribe(value =>{
      console.log(value);
    })
  }

  clickHandler(){
    alert('Hola');
  }

  changeHandler(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  }

  keyDownHandler(event: KeyboardEvent){
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }

  changeAgeHandler(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(person => {
      return {
        ...person, 
        age: parseInt(newValue, 10)
      }
    });
  }

  changeNameHandler(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(person =>{
      return {
        ...person,
        name: newValue
      }
    })
  }
}
