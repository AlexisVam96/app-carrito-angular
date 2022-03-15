import { Component, Input, OnInit } from '@angular/core';
import { Producto} from '../producto'
import { ProductoService} from '../producto.service'
import { ModalService } from './modal.service'
import swal from 'sweetalert2'
import { HttpEventType} from '@angular/common/http'
import {AuthService} from '../../usuarios/auth.service'
import { URL_BACKEND } from 'src/app/config/config';
import { CarritoService } from 'src/app/compras/carrito.service';


@Component({
  selector: 'detalle-producto',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() producto: Producto
  productos: Producto[]

  titulo: string = "Detalle del producto"
  public fotoSeleccionada: File
  public progreso: number = 0
  urlBackend: string = URL_BACKEND

  constructor(private productoService: ProductoService,
    public modalService: ModalService,
    public authService: AuthService,
    private carritoService: CarritoService) { }

  ngOnInit(): void {
    if(this.producto){
      console.log('detalle.component: ',this.producto.categoria.nombre)
    this.productoService.getProductosPorCategoria(this.producto.categoria.nombre).subscribe(
      productos => {
        this.productos = productos;
        console.log(`detalle.component: `,this.productos);
      }
    )
    }else{
      console.log('no existe producto')
    }

  }

  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0]
    this.progreso = 0
    console.log(this.fotoSeleccionada)
    if(this.fotoSeleccionada.type.indexOf('image') < 0){
      swal.fire('Error seleccionar imagen: ','El archivo debe ser del tipo imagen', 'error')
      this.fotoSeleccionada = null
    }
  }

  subirFoto(){

    if(!this.fotoSeleccionada){
      swal.fire('Error Upload: ','Debe seleccionar una foto', 'error')
    }else{
      this.productoService.subirFoto(this.fotoSeleccionada, this.producto.id)
      .subscribe( event => {
        if(event.type === HttpEventType.UploadProgress){
          this.progreso = Math.round((event.loaded/event.total)*100)
        }else if(event.type === HttpEventType.Response){
          let response: any = event.body
          this.producto = response.producto as Producto
          console.log(response.producto)
          this.modalService.notificarUpload.emit(this.producto);
          swal.fire(
            'La foto se ha subido completamente',
            response.mensaje,
            'success')
        }

      })
    }


  }

  goToCar(producto: Producto){
    this.carritoService.addToList(producto)
  }

  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }
}
