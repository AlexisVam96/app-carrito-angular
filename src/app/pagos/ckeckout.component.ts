import { Component, ElementRef, OnInit, ViewChild, AfterViewChecked} from '@angular/core';
import { CarritoService} from '../compras/carrito.service'
import { ComprasService} from '../compras/services/compras.service'
import { Compra} from '../compras/models/compra'
import swal from 'sweetalert2'
import {ActivatedRoute, Router} from '@angular/router'
import { AuthService } from '../usuarios/auth.service';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { Usuario } from '../usuarios/usuario';
import { MapsComponent } from '../maps/maps.component';
import { MatDialog } from '@angular/material/dialog';
import {URL_BACKEND} from '../config/config'


declare var paypal;

@Component({
  selector: 'app-ckeckout',
  templateUrl: './ckeckout.component.html',
  styleUrls: ['./ckeckout.component.css']
})
export class CkeckoutComponent implements OnInit , AfterViewChecked{

  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;

  compra: Compra = new Compra();
  check: boolean = false
  checkPaypal: boolean = false;
  panelOpenState = false;
  urlBackend: string = URL_BACKEND

  isOn:boolean=true;

  constructor( public carritoService: CarritoService,
    private comprasService: ComprasService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    private dialog: MatDialog
    ) { }

  ngAfterViewChecked(): void{}

  ngOnInit(): void {


    this.isOn= false;

    if(this.authService.isAuthenticated() ){
      this.activatedRoute.paramMap.subscribe(params =>{
        let username = params.get('user');

        if(username){
          this.authService.findByUser(username).subscribe(
            usuario =>{
              this.compra.usuario = usuario;
              this.compra.nombre = usuario.nombre;
              this.compra.apellido = usuario.apellido;
              this.compra.email = usuario.email;
              this.compra.movil = usuario.movil;
              this.compra.dni = usuario.documento;
              console.log('usuario compra', usuario)
            })
        }
      })


    }

    this.compra = this.carritoService.compra;

    /* paypal
    .Buttons({
      style: {
        layout:  'vertical',
        color:   'blue',
        shape:   'rect',
        label:   'paypal'
      },
      createOrder: (_data, actions) =>{
        return actions.order.create({
          purchase_units: [
            {
              description: 'Compras en carrito app',
              amount: {
                currency_code: 'USD',
                value: `${this.getSubtotal()}.00`
              }
            }
          ]
        })
      },
      onApprove: async ( data , actions) =>{
        const order = await actions.order.capture();
        console.log(order);
        this.create();

      },
      onError: err => {
        console.log(err);
      }
    })
    .render( this.paypalElement.nativeElement);* */


  }




  getSubtotal(){
    return this.carritoService.calcularGranTotal() ;
  }

  create(): void{
      console.log(this.carritoService.compra)
      this.comprasService.create(this.carritoService.compra).subscribe(
        compra =>{
          swal.fire('Compra', `Tu compra ${compra.nombre} fue creada con éxito!`, 'success' )
          this.router.navigate(['/productos']);
          this.carritoService.carNew();
        })
  }

  abrirModalMaps():void{
    //this.authService.abrirModal();
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
        panelClass: 'map-modal'
      })
    }
  }

  openCheck(){
    this.check =true;
    this.checkPaypal=false;
  }

  openCheckPaypal(){
    this.checkPaypal = true;
    this.check=false;
  }
}
