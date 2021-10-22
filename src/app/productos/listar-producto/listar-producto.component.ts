import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/usuarios/auth.service';
import SwiperCore, { Navigation,Pagination, Scrollbar, A11y } from 'swiper/core';
import { ModalService } from '../detalle/modal.service';
import { Producto } from '../producto';
import {URL_BACKEND} from '../../config/config'

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
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
  }

  swiperConfig: any = {
    navigation: true,
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

}
