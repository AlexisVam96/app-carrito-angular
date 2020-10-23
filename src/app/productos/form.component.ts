import { Component, OnInit } from '@angular/core';
import {Producto} from './producto'
import {ProductoService} from './producto.service'
import { Router, ActivatedRoute} from '@angular/router'
import swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public producto: Producto = new Producto()
  public titulo: string = "Crear Producto"
  public errores: string[]

  constructor(private productoService: ProductoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente()
  }

  public cargarCliente(): void{
    this.activatedRoute.params.subscribe( params => {
      let id = params['id']
      if(id){
        this.productoService.getProducto(id).subscribe(
          producto => this.producto = producto
        )
      }
    })
  }

  public create(): void{
    this.productoService.create(this.producto)
      .subscribe(
        producto => {
          this.router.navigate(['/productos'])
          swal.fire('Nuevo Producto', `El producto ${producto.nombre} ha sido creado con éxito!`,'success')
        },
        err => {
          this.errores = err.error.errors as string[]
          console.error('codigo del error desde el backend: ' + err.status)
          console.error(err.error.errors)
        }
    )
  }

  public update(): void{
    this.productoService.update(this.producto)
      .subscribe(
        json =>{
          this.router.navigate(['/productos'])
          swal.fire('Producto Actualizado', `Producto ${json.producto.nombre} ha sido actualizado con éxito`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[]
        console.error('codigo del error desde el backend: ' + err.status)
        console.error(err.error.errors)
      }
    )
  }


}
