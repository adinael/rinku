import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadosComponent } from './empleados.component';
import { EmpleadosRoutingModule } from './empleados.routing';
import { FormEmpleadoComponent } from './form-empleado/form-empleado.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [EmpleadosComponent, FormEmpleadoComponent],
  imports: [
    EmpleadosRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmpleadosModule { }
