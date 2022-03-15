import { Injectable } from '@angular/core';
import {Producto} from './producto';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';
import {tap, map, catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {URL_BACKEND} from '../config/config';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  private urlEndPoint: string = URL_BACKEND + '/api/productos';

  constructor(private http: HttpClient,
    ) { }

  getProductos():Observable<Producto[]>{
    return this.http.get<Producto[]>(this.urlEndPoint);
  }

  getProductosPage(page: number): Observable<any> {
    //return of(PRODUCTOS);
    //return this.http.get<Producto[]>(this.urlEndPoint)


    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      map( ( response:any ) => {
        (response.content as Producto[]).map( producto =>{
          producto.nombre = producto.nombre.toUpperCase();
          return producto;
        })
        return response;
      })
    );
  }

  create(producto: Producto) : Observable<Producto>{
    return this.http.post(this.urlEndPoint, producto).pipe(
      map( (response:any) => response.producto as Producto),
      catchError( e => {

        if(e.status == 400){
          return throwError(e);
        }

        if( e.error.mensaje){
        console.error(e.error.mensaje);
        }

        return throwError(e);
      })
    )
  }

  getProducto(id: number): Observable<Producto>{
    return this.http.get<Producto>(`${this.urlEndPoint}/${id}`).pipe(
      catchError( e => {
        if(e.status != 401 && e.error.mensaje){
          console.error(e.error.mensaje);
        }

        return throwError(e);
      })
    )
  }

  update(producto: Producto): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${producto.id}`, producto).pipe(
      catchError( e => {

        if(e.status == 400){
          return throwError(e);
        }

        if( e.error.mensaje){
          console.error(e.error.mensaje);
        }

        return throwError(e);
      })
    )
  }

  delete(id: number): Observable<Producto>{
    return this.http.delete<Producto>(`${this.urlEndPoint}/${id}`).pipe(
      catchError( e => {

        if( e.error.mensaje){
          console.error(e.error.mensaje);
        }

        return throwError(e);
      })
    )
  }

  saveProductAndFile(archivo: File, producto: Producto): Observable<HttpEvent<{}>>{
    let formData = new FormData()
    formData.append("archivo", archivo)
    formData.append("producto", JSON.stringify(producto))

    const req = new HttpRequest('POST', `${this.urlEndPoint}/file`, formData, {
      reportProgress: true
    })

    return this.http.request(req)
  }

  subirFoto(archivo: File, id: any): Observable<HttpEvent<{}>>{

    let formData = new FormData()
    formData.append("archivo", archivo)
    formData.append("id", id)

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`,formData, {
      reportProgress: true
    });

    return this.http.request(req)
  }

  filtrarProducto(nombre: string): Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.urlEndPoint}/buscar/${nombre}`);
  }

  buscarProducto(nombre: string): Observable<Producto>{
    return this.http.get<Producto>(`${this.urlEndPoint}/filtrar/${nombre}`)
  }

  getProductosPorCategoria(nombre: String): Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.urlEndPoint}/categoria/${nombre}`);
  }

}
