import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovimientosComponent } from './movimientos.component';
import { FormMovimientosComponent} from './form-movimientos/form-movimientos.component';
import { TablaMovimientosComponent } from './tabla-movimientos/tabla-movimientos.component';

const routes: Routes = [
  {path: '', component: MovimientosComponent,
  children: [
    { path: '', component: TablaMovimientosComponent },
    { path: 'abcmovimientos', component: FormMovimientosComponent }
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimientosRoutingModule { }
