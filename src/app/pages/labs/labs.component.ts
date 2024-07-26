import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Hola!!';
  tasks = [
    'Instalar Angular CLI',
    'Crear proyecto',
    'Crear componentes'
  ]
  name = 'Johjan';
  age = 25;
  disable = true;
  img = 'https://picsum.photos/200';

  person = {
    name: 'Johjan Stiven',
    age: 25,
    image: 'https://picsum.photos/200'
  }
}
