import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormMovimientosComponent } from './form-movimientos/form-movimientos.component';
import { MovimientosRoutingModule } from './movimientos.routing';
import { MovimientosComponent } from './movimientos.component';

@NgModule({
  declarations: [MovimientosComponent, FormMovimientosComponent],
  imports: [
    CommonModule,
    MovimientosRoutingModule
  ]
})
export class MovimientosModule { }
