import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable} from 'rxjs'
import { Compra} from '../models/compra'
import {URL_BACKEND} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private urlEndPonint: string = URL_BACKEND + '/api/compras';

  constructor(private http: HttpClient) { }

  getCompras(): Observable<any>{
    return this.http.get<Compra[]>(this.urlEndPonint);
  }

  getCompra(id: number): Observable<Compra>{
    return this.http.get<Compra>(`${this.urlEndPonint}/${id}`);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.urlEndPonint}/${id}`);
  }

  create(compra: Compra): Observable<Compra>{
    return this.http.post<Compra>(this.urlEndPonint, compra);
  }
}
