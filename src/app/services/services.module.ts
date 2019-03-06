import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadosService } from './empleados.service';
import { ConfigService } from './config.service';
import { MovimientosService } from './movimientos.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ConfigService,
    EmpleadosService,
    MovimientosService
  ]
})
export class ServicesModule {
}
