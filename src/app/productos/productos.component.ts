import { Component, OnInit } from '@angular/core';
import {Producto} from './producto';
import { ProductoService} from './producto.service';
import swal from 'sweetalert2'


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Producto[];

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(
      productos => this.productos = productos //funcion anonima
    );

  }

  delete(producto: Producto): void{
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      text: `¿Seguro que desea eliminar el producto ${producto.nombre} - ${producto.descripcion}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.productoService.delete(producto.id).subscribe(
          response => {
            this.productos = this.productos.filter(pro => pro !== producto)
            swalWithBootstrapButtons.fire(
              'Producto Eliminado!',
              `Producto ${producto.nombre} elimando con éxito!`,
              'success'
            )
          }
        )
      }
    })
  }

}
