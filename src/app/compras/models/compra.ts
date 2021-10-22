import { Usuario } from 'src/app/usuarios/usuario'
import {ItemCompra} from './item-compra';

export class Compra {
  id: number
  nombre: string
  apellido: string
  email: string
  dni: string
  movil: string
  direccion: string
  monto: number
  items : Array<ItemCompra>
  usuario: Usuario;
  total : any
  fecha : string

  calcularGranTotal(): number{
    this.total=0
    this.items.forEach( item => {
      this.total += item.calcularImport();
    })
    return this.total.toFixed(2);
  }
}
