
import {Categoria} from '../categoria/categoria'
import { Usuario } from '../usuarios/usuario';

export class Producto {
  id: number;
  nombre: string;
  imagen: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: Categoria;
  usuario: Usuario;



}
