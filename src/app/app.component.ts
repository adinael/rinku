import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: MenuItem[];
  title = 'rinku';

  // <i class="fal fa-usd-circle"></i>
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.items = [
      {label: 'Nomina', icon: 'fa fa-money', routerLink: 'nomina'},
      {label: 'Movimientos', icon: 'fa fa-truck', routerLink: 'movimientos'},
      {label: 'Empleados', icon: 'fa fa-users', routerLink: 'empleados'},
    ];
  }
}
