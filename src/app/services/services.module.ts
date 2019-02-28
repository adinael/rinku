import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadosService } from './empleados.service';
import { ConfigService } from './config.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ConfigService,
    EmpleadosService
  ]
})
export class ServicesModule {
}
