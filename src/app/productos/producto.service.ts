import { Injectable } from '@angular/core';
import {Producto} from './producto';
//import {PRODUCTOS} from './productos.json';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpRequest, HttpEvent} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  private urlEndPoint: string = 'http://localhost:8080/api/productos';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'})

  constructor(private http: HttpClient,
    private router: Router) { }

  getProductos(): Observable<Producto[]> {
    //return of(PRODUCTOS);
    return this.http.get<Producto[]>(this.urlEndPoint)
    //return this.http.get(this.urlEndPoint).pipe(
    //  map( response => response as Producto[])
    //);
  }

  /*
  create(producto: Producto) : Observable<any>{
    return this.http.post<any>(this.urlEndPoint, producto, {headers: this.httpHeaders}).pipe(
      catchError( e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }
    */
  create(producto: Producto) : Observable<Producto>{
    return this.http.post(this.urlEndPoint, producto, {headers: this.httpHeaders}).pipe(
      map( (response:any) => response.producto as Producto),
      catchError( e => {

        if(e.status == 400){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }

  getProducto(id: number): Observable<Producto>{
    return this.http.get<Producto>(`${this.urlEndPoint}/${id}`).pipe(
      catchError( e => {
        this.router.navigate(['/productos']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  update(producto: Producto): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${producto.id}`, producto, {headers: this.httpHeaders}).pipe(
      catchError( e => {

        if(e.status == 400){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }

  delete(id: number): Observable<Producto>{
    return this.http.delete<Producto>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError( e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>>{

    let formData = new FormData()
    formData.append("archivo", archivo)
    formData.append("id", id)

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`,formData, {
      reportProgress: true
    })

    return this.http.request(req)
  }
}
