import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MessagesModule } from 'primeng/messages';

import { NominaComponent } from './nomina.component';
import { NominaRoutingModule } from './nomina.routing';

@NgModule({
  declarations: [NominaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    AutoCompleteModule,
    MessagesModule,
    NominaRoutingModule
  ]
})
export class NominaModule { }
