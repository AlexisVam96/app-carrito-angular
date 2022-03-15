import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/usuarios/auth.service';
import SwiperCore, { Navigation,Pagination, Scrollbar, A11y } from 'swiper/core';
import { ModalService } from '../detalle/modal.service';
import { Producto } from '../producto';
import {URL_BACKEND} from '../../config/config'
import { ProductoService } from '../producto.service';
import swal from 'sweetalert2'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ListarProductoComponent implements OnInit {

  @Input() productos: Producto[];
  urlBackend: string = URL_BACKEND;


  productoSeleccionado: Producto;

  constructor(
    public authService: AuthService,
    private productoService: ProductoService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
  }

  swiperConfig: any = {
    pagination: {
      clickable: true
    },
    breakpoints: {
      1500: {
        slidesPerView: 4,
        spaceBetween: 0,
      },
      1000: {
        slidesPerView: 4,
        spaceBetween: 0,
      },
      850: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
      600: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
      450: {
        slidesPerView: 1.5,
        spaceBetween: 0
      },
      3500: {
        slidesPerView: 1.8,
        spaceBetween: 0
      }
    }
  }

  abrirModal(producto: Producto){
    this.productoSeleccionado = producto;
    this.modalService.abrirModal()
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
          _response => {
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
