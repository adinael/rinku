import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MessagesModule } from 'primeng/messages';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import { FormMovimientosComponent } from './form-movimientos/form-movimientos.component';
import { MovimientosRoutingModule } from './movimientos.routing';
import { MovimientosComponent } from './movimientos.component';
import { TablaMovimientosComponent } from './tabla-movimientos/tabla-movimientos.component';

@NgModule({
  declarations: [MovimientosComponent, FormMovimientosComponent, TablaMovimientosComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    CalendarModule,
    AutoCompleteModule,
    MessagesModule,
    MovimientosRoutingModule
  ]
})
export class MovimientosModule { }
