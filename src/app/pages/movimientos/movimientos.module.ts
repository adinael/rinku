import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { FormMovimientosComponent } from './form-movimientos/form-movimientos.component';
import { MovimientosRoutingModule } from './movimientos.routing';
import { MovimientosComponent } from './movimientos.component';

@NgModule({
  declarations: [MovimientosComponent, FormMovimientosComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    AutoCompleteModule,
    MovimientosRoutingModule
  ]
})
export class MovimientosModule { }
