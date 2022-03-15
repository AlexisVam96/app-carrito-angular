import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router'
import {Producto} from '../producto';
import {ProductoService} from '../producto.service';
import {CarritoService} from '../../compras/carrito.service';
import { URL_BACKEND } from 'src/app/config/config';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  producto : Producto;
  urlBackend: string = URL_BACKEND;

  constructor(private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private carritoService: CarritoService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params => {
      let nombre = params['nombre']
      if(nombre){
        this.productoService.buscarProducto(nombre).subscribe(
          producto => this.producto = producto
        )
      }
    });

  }

  addToList(producto: Producto){
    this.carritoService.addToList(producto);
  }

}
