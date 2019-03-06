import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovimientosComponent } from './movimientos.component';
import { FormMovimientosComponent} from './form-movimientos/form-movimientos.component';

const routes: Routes = [
  {path: '', component: MovimientosComponent,
  children: [
    { path: 'nuevo', component: FormMovimientosComponent },
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimientosRoutingModule { }
