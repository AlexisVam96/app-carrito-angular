import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { HeaderComponent} from './header/header.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductoService} from './productos/producto.service';
import { CategoriaService} from './categoria/categoria.service';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormComponent } from './productos/form.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DetalleComponent } from './productos/detalle/detalle.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { LoginComponent } from './usuarios/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material/core'
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon'
import { AuthGuard} from './usuarios/guards/auth.guard'
import {RoleGuard} from './usuarios/guards/role.guard'
import { TokenInterceptor} from './usuarios/interceptors/token.interceptor'
import { AuthInterceptor} from './usuarios/interceptors/auth.interceptor';
import { CarritoComponent } from './compras/carrito.component'
import { CompraComponent } from './compras/compra.component'
import { ComprasService } from './compras/services/compras.service';
import { ItemComponent } from './compras/items/item.component';
import { CarritoService } from './compras/carrito.service';
import { CkeckoutComponent } from './pagos/ckeckout.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ProductoComponent } from './productos/filtrar/producto.component';
import { ProductComponent } from './categoria/products/product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SliderComponent } from './sliders/slider.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { RegistroComponent } from './usuarios/registros/registro.component';
import { ComprasComponent } from './usuarios/compras/compras.component';
import { FooterComponent } from './footer/footer.component';
import { MatProgressBarModule } from '@angular/material/progress-bar'
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSidenavModule} from '@angular/material/sidenav';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { MapsComponent} from './maps/maps.component';
import { AgmCoreModule } from '@agm/core';
import { ListarCarritoComponent } from './compras/listar-carrito/listar-carrito.component';
import { SwiperModule } from 'swiper/angular';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { SearchProductComponent } from './header/search-product/search-product.component';
import { SearchNavComponent } from './search-nav/search-nav.component';
import { ButtonItemCantidadComponent } from './compras/button-item-cantidad/button-item-cantidad.component';
import { ListarProductoComponent } from './productos/listar-producto/listar-producto.component';
import { SaveProductComponent } from './productos/save-product/save-product.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxStripeModule } from 'ngx-stripe';
import { ProductosUsuariosComponent } from './productos/productos-usuarios/productos-usuarios.component';



const routes: Routes = [
  {path: '', redirectTo: '/productos', pathMatch: 'full'},
  {path: 'productos', component: ProductosComponent},
  {path: 'productos/save', component: SaveProductComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_USER'}},
  {path: 'productos/save/:id', component: SaveProductComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_USER'}},
  {path: 'productos/usuario/:user', component: ProductosUsuariosComponent},
  {path: 'productos/page/:page', component: ProductosComponent},
  {path: 'productos/form', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'productos/form/:id', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'categorias/form', component: CategoriaComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'categorias/form/:id', component: CategoriaComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  //{path: 'login', component: LoginComponent},
  {path: 'compras', component: CompraComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'compras/:id', component: ItemComponent , canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_USER'}},
  {path: 'carrito', component: CarritoComponent},
  {path: 'checkout', component: CkeckoutComponent},
  {path: 'checkout/:user', component: CkeckoutComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_USER'}},
  {path: 'producto/:nombre', component: ProductoComponent},
  {path: 'categoria/:nombre', component: ProductComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'mis-compras/:user', component: ComprasComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_USER'}}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductosComponent,
    FormComponent,
    DetalleComponent,
    PaginatorComponent,
    CategoriaComponent,
    LoginComponent,
    CarritoComponent,
    CompraComponent,
    ItemComponent,
    CkeckoutComponent,
    ProductoComponent,
    ProductComponent,
    SliderComponent,
    RegistroComponent,
    ComprasComponent,
    FooterComponent,
    MapsComponent,
    ListarCarritoComponent,
    MainNavComponent,
    SearchProductComponent,
    SearchNavComponent,
    ButtonItemCantidadComponent,
    ListarProductoComponent,
    SaveProductComponent,
    ProductosUsuariosComponent
  ],
  entryComponents: [
    MapsComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatBadgeModule,
    MatAutocompleteModule,
    NgbModule,
    SocialLoginModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSidenavModule,
    MatExpansionModule,
    MatSnackBarModule,
    GooglePlaceModule,
    SwiperModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBsdzrzWRJU5QvFYo3bA7H-SDSlecFdgFk',
      libraries: ['places']
    }),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    NgxDropzoneModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot('pk_test_51JVKQZLxrHzzhEPxCqdeoG77DA2cCpta5fS66V0FGZ66neDHS87AgiG1OGKUsoFaaSQWLdXleNHWfoRNGWPn4hxe00S0eu45Cu'),
  ],
  providers: [
    ProductoService,
    CategoriaService,
    ComprasService,
    CarritoService,
    {provide: MatDialogRef,
      useValue: {}},
    {provide:
      HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true },
    {provide:
        HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true },
    {provide:
      ErrorStateMatcher,
      useClass: ShowOnDirtyErrorStateMatcher},
    {
     provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
             provider: new GoogleLoginProvider(
               '314441536246-9l243g3387ok640db4d1sodmfbh1q402.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('452267509279159')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
