import { Component, OnInit } from '@angular/core';
import { Tarea } from 'src/app/models/tarea';

@Component({
  selector: 'iny-lista-simple',
  templateUrl: './lista-simple.component.html',
  styleUrls: ['./lista-simple.component.scss']
})
export class ListaSimpleComponent implements OnInit {
  tarea: Tarea
  tareas: Array<Tarea>
  private store: string;
  constructor() { }

  ngOnInit(): void {
    this.store = 'Tareas'
    this.tarea = new Tarea()
    this.tareas = localStorage.getItem(this.store) ? 
      JSON.parse(localStorage.getItem(this.store)) : []
  }

  onClickGuardar() {
    if(!this.tarea.nombre) {
      return
    }
    this.tareas.push(this.tarea)
    this.tarea = new Tarea()
    this.save()
  }

  onChangeCompleted() {
    this.save()
  }

  onClickBorrar(i: number) {
    this.tareas.splice(i,1)
    this.save()
  }

  private save() {
    localStorage.setItem(this.store, JSON.stringify(this.tareas))
    console.log(this.tareas)
  }

}
