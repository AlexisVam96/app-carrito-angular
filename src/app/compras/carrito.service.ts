import { Injectable } from '@angular/core';
import { Producto} from '../productos/producto';
import { ItemCompra} from './models/item-compra';
import { Compra} from './models/compra';

@Injectable({
  providedIn: 'root'
})
export class  CarritoService {

  compra : Compra = new Compra;
  modal: boolean = false;


  constructor() { }

  public get ubicacion(): string{
    if(this.compra.direccion != null){
      return this.compra.direccion;
    }else if(this.compra.direccion == null && localStorage.getItem('ubicacion')!=null){
      this.compra.direccion = localStorage.getItem('ubicacion')
      return this.compra.direccion;
    }
    return null;
  }

  public get items(): ItemCompra[]{
    if(this.compra.items != null){
      return this.compra.items;
    }else if(this.compra.items == null && localStorage.getItem('items') != null){
      this.compra.items = JSON.parse(localStorage.getItem('items')) as ItemCompra[];
      return this.compra.items;
    }
    return new Array<ItemCompra>();
  }

  public get cantidad(): number{
    return this.items.length;
  }

  carNew(){
    this.compra.items = new Array<ItemCompra>();
    localStorage.setItem('items', JSON.stringify(this.compra.items))
  }

  addToList(producto: Producto):void {

    if(this.existeItem(producto.id)){
      this.incrementaCantidad(producto.id);
    }else{
      let nuevoItem = new ItemCompra();
      nuevoItem.producto = producto;
      console.log(producto)
      this.compra.items = this.items;
      this.compra.items.push(nuevoItem)
    }
    localStorage.setItem('items',JSON.stringify(this.compra.items))

  }


  calcularGranTotal(){
    let granTotal = 0
    this.compra.items.forEach( (item: ItemCompra) =>{
      granTotal += item.cantidad*item.producto.precio
    })
    return granTotal;
  }

  getCantidadItem(id:number){
    let cantidad
    this.compra.items.forEach( (item:ItemCompra)=>{
      if(id == item.producto.id){
        cantidad= item.cantidad
      }
    })
    return cantidad
  }

  existeItem(id: number): boolean{
    let existe = false;

    this.items.forEach( (item: ItemCompra) =>{
      if(id === item.producto.id){
        existe = true;
      }
    })
    return existe;
  }

  incrementaCantidad(id: number):void{
    this.compra.items = this.compra.items.map( (item: ItemCompra) =>{
      if( id === item.producto.id){
        ++item.cantidad;
      }
      return item;
    });

    localStorage.setItem('items',JSON.stringify(this.compra.items));
  }

  eliminarItemCompra(id:number): void{
    this.compra.items = this.compra.items.filter( (item: ItemCompra) => id !== item.producto.id);
    localStorage.setItem('items',JSON.stringify(this.compra.items));
  }



  disminuirCantidad(id:number ,item): void{


    this.compra.items = this.compra.items.map( (item: ItemCompra) =>{
      if( id === item.producto.id){
        --item.cantidad;
      }
      return item;
    });

    localStorage.setItem('items',JSON.stringify(this.compra.items));

  }

  guardarUbicacion(direccion: string){
    this.compra.direccion = direccion;
    console.log('direccion desde carrito service',direccion)
    localStorage.setItem('ubicacion', this.compra.direccion)
  }

  existeDireccion():boolean{
    if(this.ubicacion && this.ubicacion !==null){
      return true
    }
    return false
  }


}
