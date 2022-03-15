import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import {Producto} from './producto';
import {Categoria} from '../categoria/categoria'
import { ProductoService} from './producto.service';
import { CategoriaService} from '../categoria/categoria.service'
import { ModalService} from './detalle/modal.service'
import swal from 'sweetalert2'
import {tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import { AuthService } from '../usuarios/auth.service';
import {Compra} from '../compras/models/compra'
import {ItemCompra} from '../compras/models/item-compra'
import { CarritoService} from '../compras/carrito.service';
import { SocialAuthService } from 'angularx-social-login';
import SwiperCore, { Navigation,Pagination, Scrollbar, A11y } from 'swiper/core';
import {URL_BACKEND} from '../config/config'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductosComponent implements OnInit {

  productosCar: Producto[];
  productos: Producto[];
  productosBebes: Producto[];
  paginador: any
  public categorias: Categoria[];
  compra: Compra
  urlBackend: string = URL_BACKEND;

  constructor(private productoService: ProductoService,
            private categoriaService: CategoriaService,
            private modalService: ModalService,
            public authService: AuthService,
            public carritoService: CarritoService,
            ) { }

  ngOnInit(): void {


    //SIN PAGINACION
    //this.productoService.getProductos(page).subscribe(
    //  productos => this.productos = productos //funcion anonima
    //);

    /** LISTAR PRODUCTOS CON PAGINACIÓN
      this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page') ;

      if(!page){
        page = 0;
      }
      this.productoService.getProductosPage(page).subscribe(response =>{
        this.productos = response.content as Producto[]
        this.paginador = response;
      });


    });*/

    this.productoService.getProductosPorCategoria('bebes y niños').subscribe( productosBebes =>{
      this.productosBebes = productosBebes;
    })


    this.productoService.getProductos().subscribe( productos =>{
      this.productos = productos;
      console.log('productos.component: ',this.productos)
    })

    this.categoriaService.getCategorias().subscribe(categorias =>{
      this.categorias = categorias
      console.log('productos.component: ',this.categorias)
    })


    this.modalService.notificarUpload.subscribe( (producto: Producto) => {
      this.productos = this.productos.map(productoOriginal =>{
        if(producto.id == productoOriginal.id){
          productoOriginal.imagen = producto.imagen;
        }
        return productoOriginal
      })
    })
  }



}
