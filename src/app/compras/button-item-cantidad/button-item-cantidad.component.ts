import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/productos/producto';
import { CarritoService } from '../carrito.service';
import { ItemCompra } from '../models/item-compra';

@Component({
  selector: 'app-button-item-cantidad',
  templateUrl: './button-item-cantidad.component.html',
  styleUrls: ['./button-item-cantidad.component.css']
})
export class ButtonItemCantidadComponent implements OnInit {

  @Input() producto: Producto;

  constructor(
    public carritoService:CarritoService
  ) { }

  ngOnInit(): void {
  }

  addToList(producto: Producto){
    this.carritoService.addToList(producto);
  }

}
