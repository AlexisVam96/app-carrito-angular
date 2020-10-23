import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent} from './header/header.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductoService} from './productos/producto.service';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { FormComponent } from './productos/form.component';
import { FormsModule} from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { DetalleComponent } from './productos/detalle/detalle.component'

const routes: Routes = [
  {path: '', redirectTo: '/productos', pathMatch: 'full'},
  {path: 'productos', component: ProductosComponent},
  {path: 'productos/form', component: FormComponent},
  {path: 'productos/form/:id', component: FormComponent},
  {path: 'productos/detalle/:id', component: DetalleComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductosComponent,
    FormComponent,
    FooterComponent,
    DetalleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ProductoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
