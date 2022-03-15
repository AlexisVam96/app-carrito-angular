import { Component, OnInit } from '@angular/core';
import {Producto} from '../producto'
import {Categoria} from '../../categoria/categoria'
import {ProductoService} from '../producto.service'
import {CategoriaService} from '../../categoria/categoria.service'
import { Router, ActivatedRoute} from '@angular/router'
import swal from 'sweetalert2'
import { HttpEventType} from '@angular/common/http'
import { AuthService } from 'src/app/usuarios/auth.service';
import { Usuario } from 'src/app/usuarios/usuario';

@Component({
  selector: 'app-save-product',
  templateUrl: './save-product.component.html',
  styleUrls: ['./save-product.component.css']
})
export class SaveProductComponent implements OnInit {

  public producto: Producto = new Producto()
  public categorias: Categoria[]
  public titulo: string = "Crear Producto"
  public errores: string[]
  public fotoSeleccionada: File
  usuario: Usuario

  constructor(private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.cargarCliente();
    let email = this.authService.usuario.email;
    this.authService.findByEmail(email).subscribe(
      usuario => {
        this.usuario = usuario
      console.log(usuario)
      this.producto.usuario = this.usuario;
    console.log(this.producto)
    })

  }

  files: File[] = []

onSelect(event) {
  console.log(event);
  this.files.push(...event.addedFiles);
  this.files.forEach( file =>{
    this.fotoSeleccionada = file
  })
}

onRemove(event) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);

}

  public cargarCliente(): void{
    this.activatedRoute.params.subscribe( params => {
      let id = params['id']
      if(id){
        this.productoService.getProducto(id).subscribe(
          producto => this.producto = producto
        )
      }
    });
    this.categoriaService.getCategorias().subscribe(categorias => this.categorias = categorias)
  }

  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0]

    console.log(this.fotoSeleccionada)
    if(this.fotoSeleccionada.type.indexOf('image') < 0){
      swal.fire('Error seleccionar imagen: ','El archivo debe ser del tipo imagen', 'error')
      this.fotoSeleccionada = null
    }
  }


  public create(): void{

    if(!this.fotoSeleccionada){
      swal.fire('Error Upload: ','Debe seleccionar una foto', 'error')
    }else{
      this.productoService.saveProductAndFile(this.fotoSeleccionada, this.producto)
      .subscribe( event => {
        if(event.type === HttpEventType.Response){
          let response: any = event.body
          this.producto = response.producto as Producto
          console.log(response.producto)
          swal.fire(
            'Succesefiel',
            response.mensaje,
            'success')
          this.router.navigate(['/productos']);
        }

      })
    }


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

  comprararCategoria(o1: Categoria, o2: Categoria): boolean{
    if( o1 === undefined && o2 === undefined){
      return true;
    }
    return o1===null || o2===null || o1===undefined || o2===undefined ? false : o1.id===o2.id;

  }

}
