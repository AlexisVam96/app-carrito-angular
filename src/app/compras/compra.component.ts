import { Component, OnInit } from '@angular/core';
import { ComprasService} from './services/compras.service'
import { Compra} from './models/compra'
import { ActivatedRoute} from '@angular/router'
import { ItemService} from './items/item.service'
import swal from 'sweetalert2'

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  compras: Compra[]
  compra: Compra = new Compra()
  compraSeleccionada: Compra
  titulo: string = "Compras"

  constructor(private comprasService: ComprasService,
    private activatedRoute: ActivatedRoute,
    private itemService: ItemService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>{
      let id = +params.get('id');
      this.comprasService.getCompra(id).subscribe(
        compra => this.compra = compra
      )
    })

    this.comprasService.getCompras().subscribe(
      compras => {
        this.compras = compras
        console.log(compras)
      })

  }

  abrirModal(compra: Compra){
    this.compraSeleccionada = compra
    this.itemService.abrirModal()
  }

  delete(compra: Compra): void{
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      text: `¿Seguro que desea eliminar la compra de ${compra.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.comprasService.delete(compra.id).subscribe(
          () => {
            this.compras = this.compras.filter(pro => pro !== compra)
            swalWithBootstrapButtons.fire(
              'Compra Eliminada!',
              `La compra ${compra.nombre} fue eliminada con éxito!`,
              'success'
            )
          }
        )
      }
    })
  }

}
