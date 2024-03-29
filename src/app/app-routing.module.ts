import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/empleados', pathMatch: 'full' },
  { path: 'empleados', loadChildren: 'src/app/pages/empleados/empleados.module#EmpleadosModule' },
  { path: 'movimientos', loadChildren: 'src/app/pages/movimientos/movimientos.module#MovimientosModule' },
  { path: 'nomina', loadChildren: 'src/app/pages/nomina/nomina.module#NominaModule' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
