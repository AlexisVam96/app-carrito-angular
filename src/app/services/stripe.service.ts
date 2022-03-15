import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../payment/payment'
import {URL_BACKEND} from '../config/config'

const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private stripeURL: string = URL_BACKEND + '/stripe/';

  constructor(private httpClient: HttpClient) {}

  public pagar(payment: Payment): Observable<string> {
    return this.httpClient.post<string>(this.stripeURL + 'paymentintent', payment, cabecera);
  }

  public confirmar(id: string): Observable<string> {
    return this.httpClient.post<string>(this.stripeURL + `confirm/${id}`, {}, cabecera);
  }

  public cancelar(id: string): Observable<string> {
    return this.httpClient.post<string>(this.stripeURL + `cancel/${id}`, {}, cabecera);
  }

}
