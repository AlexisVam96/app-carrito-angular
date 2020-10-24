import { Component, Input, OnInit } from '@angular/core';
import { Producto} from '../producto'
import { ProductoService} from '../producto.service'
import { ModalService } from './modal.service'
import swal from 'sweetalert2'
import { HttpEventType} from '@angular/common/http'


@Component({
  selector: 'detalle-producto',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() producto: Producto

  titulo: string = "Detalle del producto"
  public fotoSeleccionada: File
  public progreso: number = 0

  constructor(private productoService: ProductoService,
    public modalService: ModalService) { }

  ngOnInit(): void {

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
          swal.fire(
            'La foto se ha subido completamente',
            response.mensaje,
            'success')
        }

      })
    }


  }

  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }
}
