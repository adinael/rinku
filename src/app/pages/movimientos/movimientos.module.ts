import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';

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
    CalendarModule,
    AutoCompleteModule,
    MessagesModule,
    MessageModule,
    MovimientosRoutingModule
  ]
})
export class MovimientosModule { }
