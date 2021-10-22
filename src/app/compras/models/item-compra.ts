import {Producto} from '../../productos/producto'

export class ItemCompra {
  id: number
  producto: Producto
  cantidad: number = 1
  importe: number

  public calcularImport(): number{
    
    return this.cantidad * this.producto.precio
  }
}
