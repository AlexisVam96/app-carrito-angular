import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CategoriaService } from '../categoria/categoria.service';
import { Categoria } from '../categoria/categoria';
import { AuthService } from '../usuarios/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MapsComponent } from '../maps/maps.component';
import { CarritoService } from '../compras/carrito.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  public categorias : Categoria[];

  constructor(private categoriaService: CategoriaService,
    public authService: AuthService,
    private dialog: MatDialog,
    public carritoService: CarritoService) {}

  ngOnInit(){
    this.categoriaService.getCategorias().subscribe(
      categorias => this.categorias = categorias
    )
  }

  logout(){
    this.authService.logout();
  }

  openDialogMaps(){
    let dialogRef;

    console.log(screen.width)

    if(screen.width < 400){
      dialogRef= this.dialog.open(MapsComponent,{
        maxWidth: '100vw',
        width: '100vw',
        height: '100%',
        panelClass: 'map-modal'
      })
    }else{
      dialogRef= this.dialog.open(MapsComponent,{
        width: '686px',
      })
    }
  }
}
