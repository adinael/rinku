import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpleadosComponent } from './empleados.component';
import { FormEmpleadoComponent } from './form-empleado/form-empleado.component';

const routes: Routes = [
  {path: '',
  component: EmpleadosComponent,
  children: [
      {path: 'nuevo', component: FormEmpleadoComponent}

  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
