import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/usuarios/auth.service';
import { Producto } from '../producto';

@Component({
  selector: 'app-productos-usuarios',
  templateUrl: './productos-usuarios.component.html',
  styleUrls: ['./productos-usuarios.component.css']
})
export class ProductosUsuariosComponent implements OnInit {

  productos: Producto[]

  constructor(private activatedRoute: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      let user = params['user']
      if(user){
        this.authService.findByUser(user).subscribe(
          (response:any) => {
            this.productos = response.productos
            console.log("usuario",response)
          })
      }
    })

  }

}
