import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Producto} from '../../productos/producto';
import { ProductoService} from '../../productos/producto.service'
import { ActivatedRoute} from '@angular/router';
import { CarritoService } from 'src/app/compras/carrito.service';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../categoria';
import { AuthService } from 'src/app/usuarios/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductComponent implements OnInit {

  productos: Producto[];
  categoria: Categoria;

  constructor(private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private carritoService: CarritoService,
    private categoriaService: CategoriaService,
    public authService: AuthService) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe( params => {
      let nombre = params.get('nombre') ;
      if(nombre){
        this.categoriaService.getCategoriaNombre(nombre).subscribe(
          categoria => this.categoria = categoria
        )

        this.productoService.getProductosPorCategoria(nombre).subscribe(
          productos => {
            this.productos = productos;
            console.log(`productos de ${this.categoria.nombre}`,this.productos)
          }
        )}
      }


    )


  }

  addToList(producto: Producto): void{
    this.carritoService.addToList(producto)
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
      500: {
        slidesPerView: 1,
        spaceBetween: 0
      }
    }
  }

}
