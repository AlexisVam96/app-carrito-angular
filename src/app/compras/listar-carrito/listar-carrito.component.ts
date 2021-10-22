import { Component, OnInit } from '@angular/core';
import { CarritoService} from '../carrito.service';
import { ItemCompra } from '../models/item-compra';
import { URL_BACKEND } from 'src/app/config/config';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-listar-carrito',
  templateUrl: './listar-carrito.component.html',
  styleUrls: ['./listar-carrito.component.css']
})
export class ListarCarritoComponent implements OnInit {

  items: ItemCompra[]
  urlBackend: string = URL_BACKEND

  constructor(public carritoService: CarritoService,
    private _snackBar: MatSnackBar
    ) {}

  ngOnInit(): void {
  }


  eliminarItemCompra(id: number){
    this.carritoService.eliminarItemCompra(id);
    this._snackBar.open('Has eliminado un producto de tu carrito','',{
      duration: 2500
    });
  }


}

