import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpleadosComponent } from './empleados.component';
import { FormEmpleadoComponent } from './form-empleado/form-empleado.component';
import { TablaEmpleadosComponent } from './tabla-empleados/tabla-empleados.component';

const routes: Routes = [
  {path: '',
  component: EmpleadosComponent,
  children: [
      {path: '', component: TablaEmpleadosComponent},
      {path: 'nuevo', component: FormEmpleadoComponent},
      {path: 'editar/:id', component: FormEmpleadoComponent},


  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
