import { Component, OnInit, Input } from '@angular/core';
import { Compra } from './models/compra';
import { ItemCompra } from './models/item-compra';
import { CarritoService} from './carrito.service';
import { ComprasService} from './services/compras.service'
import swal from 'sweetalert2'
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { URL_BACKEND } from '../config/config';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {


  titulo: string = "Mi carrito"
  urlBackend: string = URL_BACKEND;

  constructor(public carritoService: CarritoService,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {

  }

  calcularGranTotal(){
    return this.carritoService.calcularGranTotal();
  }


  routerCompra(){
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/checkout', this.authService.usuario.username]);
    }else{
      this.router.navigate(['/checkout']);
    }

  }

}
