import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { map, flatMap} from 'rxjs/operators'
import {Producto} from '../../productos/producto';
import { FormControl } from '@angular/forms';
import { ProductoService } from 'src/app/productos/producto.service';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {

  autocompleteControl = new FormControl();
  productosFiltrados: Observable<Producto[]>;

  constructor(
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.productosFiltrados = this.autocompleteControl.valueChanges
    .pipe(
      map(value => typeof value === 'string'? value: value.nombre),
      flatMap(value => value ? this._filter(value): [])
    );

  }

  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();

    return this.productoService.filtrarProducto(filterValue);
  }

  mostrarNombre(producto?: Producto): string | undefined{
    return producto? producto.nombre : undefined;
  }

  seleccionarProducto(event: MatAutocompleteSelectedEvent): void{
    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

}
