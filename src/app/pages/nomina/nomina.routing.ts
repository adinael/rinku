import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NominaComponent } from './nomina.component';

const routes: Routes = [
  {path: '', component: NominaComponent,
  children: [
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NominaRoutingModule { }
