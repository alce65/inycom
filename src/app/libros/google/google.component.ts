import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/models/libro';
import { environment } from 'src/environments/environment';
import { map } from "rxjs/operators";

@Component({
  selector: 'iny-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.scss']
})
export class GoogleComponent implements OnInit {
  urlBase: string;
  clave: string
  message: string
  libros: Array<Libro>
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.message = 'De que quieres buscar los libros?'
    this.libros = []
    this.urlBase = environment.urlGoogle
  }

  onClickBuscar() {
    if(!this.clave) {
      return
    }
    this.libros = []
    this.http.get(this.urlBase+this.clave).toPromise().then(
      (resp: any ) => {
        console.log(resp)
        this.libros =  resp.items.map(
          item => {
            return {
              id: item.id,
              titulo: item.volumeInfo.title,
              autor: item.volumeInfo.authors,
              fecha: item.volumeInfo.publishedDate
            }
          }
        )
      }
    )

    this.clave = ''
  }

  onClickBuscarRx() {
    if(!this.clave) {
      return
    }
    this.libros = []
    this.http.get(this.urlBase+this.clave)
    .pipe(
      map( (resp: any) => {
        return resp.items.map(
          item => {
            return {
              id: item.id,
              titulo: item.volumeInfo.title,
              autor: item.volumeInfo.authors,
              fecha: item.volumeInfo.publishedDate
            }
          }
        )
      })
    ).subscribe(
      (resp: Array<Libro>) => { 
        this.libros = resp
      }
    )

    this.clave = '' 
  }

}
