import { Injectable,EventEmitter } from '@angular/core';

import {Categoria} from '../categoria/categoria'
import {Observable, of, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import swal from 'sweetalert2';
import {AuthService} from '../usuarios/auth.service';
import {Router} from '@angular/router';
import {URL_BACKEND} from '../config/config';

@Injectable({
  providedIn: 'root'
})

export class CategoriaService {

  private urlEndPoint: string = URL_BACKEND + '/api/categorias';
  private _notificarCreate = new EventEmitter<any>();

  constructor(private http: HttpClient,
    private router: Router,
    private authService: AuthService) { }


  get notificarCreate(): EventEmitter<any>{
    return this._notificarCreate
  }

  get notificarDelete(): EventEmitter<any>{
    return this._notificarCreate
  }

  private isNoAutorizado(e: any): boolean{
    if(e.status == 401){
      this.router.navigate(['/login']);
      return true;
    }
    if(e.status == 403){
      swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning')
      this.router.navigate(['/productos']);
      return true;
    }
    return false;
  }


  getCategorias(): Observable<any> {
    //return of(PRODUCTOS);
    return this.http.get<Categoria[]>(this.urlEndPoint).pipe(
      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  create(categoria: Categoria) : Observable<Categoria>{
    return this.http.post(this.urlEndPoint, categoria ).pipe(
      map( (response:any) => response.categoria as Categoria),
      catchError( e=> {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        if(e.status == 400){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }

  getCategoria(id: number): Observable<Categoria>{
    return this.http.get<Categoria>(`${this.urlEndPoint}/${id}`).pipe(
      catchError( e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        this.router.navigate(['/categorias'])
        console.error(e.error.mensaje)
        swal.fire('Error al edita', e.error.mensaje, 'error')
        return throwError(e)
      })
    )
  }

  getCategoriaNombre(nombre: string): Observable<Categoria>{
    return this.http.get<Categoria>(`${this.urlEndPoint}/buscar/${nombre}`);
  }

  update(categoria: Categoria): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${categoria.id}`, categoria).pipe(
      catchError( e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        if(e.status == 400){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }

  delete(id: number): Observable<Categoria>{
    return this.http.delete<Categoria>(`${this.urlEndPoint}/${id}`).pipe(
      catchError( e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }

}
