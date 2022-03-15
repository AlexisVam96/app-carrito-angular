import { Component, Input, OnInit } from '@angular/core';
import {AuthService} from '../usuarios/auth.service';
import { Router} from '@angular/router';
import swal from 'sweetalert2';
import { CarritoService } from '../compras/carrito.service';
import {CategoriaService} from '../categoria/categoria.service'
import {Categoria} from '../categoria/categoria'
import { MatDialog } from '@angular/material/dialog';
import { MapsComponent } from '../maps/maps.component';
import { LoginComponent } from '../usuarios/login.component';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  @Input() car:boolean = true;

  titulo: string = "ETRUEGAME"
  categorias : Categoria[]


  constructor(public authService: AuthService,
    public carritoService: CarritoService,
    private categoriaService: CategoriaService,
    private router: Router,
    private dialog: MatDialog,
    ) { }

  ngOnInit() {
    this.categoriaService.getCategorias().subscribe(
      categorias => this.categorias = categorias
    )
  }

  logout(): void{
    swal.fire('Logout', `Hola ${this.authService.usuario.nombre} has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/productos'])
    this.authService.logout();
  }

  abrirModalLogin():void{
    let dialogRef;

    console.log(screen.width)

    if(screen.width < 450){
      dialogRef= this.dialog.open(LoginComponent,{
        maxWidth: '100%',
        width: '100%',
        height: '100%',
        panelClass: 'login-modal'
      })
    }else{
      dialogRef= this.dialog.open(LoginComponent,{
        width: '350px'
      })
    }
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
