import { Component, OnInit, OnChanges } from '@angular/core';
import {Categoria} from './categoria';
import {CategoriaService} from './categoria.service';
import {Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  public categoria: Categoria = new Categoria();
  public categorias: Categoria[];
  public titulo: string = "Crear Categoria";
  public errores: string[];

  constructor(private categoriaService: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params => {
      let id = params['id']
      if(id){
        this.categoriaService.getCategoria(id).subscribe(
          categoria => this.categoria = categoria
        )
      }
    })

    this.categoriaService.getCategorias().subscribe(
    categorias => this.categorias = categorias
    )
  }


  public create(): void{
    this.categoriaService.create(this.categoria)
      .subscribe(
        categoria =>{
          this.categoriaService.notificarCreate.emit(this.categoria);
          this.router.navigate(['/productos']);
          swal.fire('Nueva Categoria', `La categoria ${categoria.nombre} fue creada con éxito!`,'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('codigo del error desde el backend:' + err.status);
          console.error(err.error.errors);

        }
      )

  }

  public update(): void{
    this.categoriaService.update(this.categoria)
      .subscribe(
        _response =>{
          this.router.navigate(['/categorias/form']);
          swal.fire('Categoria actualizada', `La categoria ${this.categoria.nombre} fue actualizada con éxito!`,'success');

        /*
        json =>{
          this.router.navigate(['/categorias/form'])
          if(this.categoria.nombre == undefined){
            this.router.navigate(['/categorias/form'])
            swal.fire('Categoria Actualizada', `Categoria ${json.categoria.nombre} ha sido actualizada con éxito`, 'success')
          }*/
      },
      err => {
        this.errores = err.error.errors as string[]
        console.error('codigo del error desde el backend: ' + err.status)
        console.error(err.error.errors)
      }
    )
  }

  delete(categoria: Categoria): void{
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      text: `¿Seguro que desea eliminar la categoria ${categoria.nombre} `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.notificarDelete.emit(this.categoria);
        this.categoriaService.delete(categoria.id).subscribe(
          _response => {
            this.categorias = this.categorias.filter(cate => cate !== categoria)
            swalWithBootstrapButtons.fire(
              'Categoria Eliminada!',
              `Categoria ${categoria.nombre} elimanda con éxito!`,
              'success'
            )
          }
        )

        this.router.navigate(['/categorias/form'])
      }
    })
  }

}
