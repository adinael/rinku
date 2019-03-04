import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadosComponent } from './empleados.component';
import { EmpleadosRoutingModule } from './empleados.routing';
import { FormEmpleadoComponent } from './form-empleado/form-empleado.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TablaEmpleadosComponent } from './tabla-empleados/tabla-empleados.component';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [EmpleadosComponent, FormEmpleadoComponent, TablaEmpleadosComponent],
  imports: [
    EmpleadosRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    AngularFontAwesomeModule,
    NgSelectModule

  ]
})
export class EmpleadosModule { }
